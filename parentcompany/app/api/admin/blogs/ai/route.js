import { NextResponse } from 'next/server';
import { getAdminUserFromRequest } from '../../../../../lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        // Validate admin session
        const user = getAdminUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { topic } = body;

        if (!topic || !topic.trim()) {
            return NextResponse.json({ success: false, error: 'Topic prompt is required' }, { status: 400 });
        }

        const apiKey = process.env.SARVAM_API_KEY || process.env.SARVAM_AI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { success: false, error: 'Sarvam AI API key is not configured. Please add SARVAM_API_KEY to your environment.' },
                { status: 500 }
            );
        }

        const systemPrompt = `You are a professional venture capital and business scaling blog writer for RiseMate Ventures.
Your task is to generate a highly detailed, comprehensive, and authoritative article (at least 800-1200 words, minimum 5-8 minutes read time) about the user's requested topic. The blog MUST NOT be a short snippet. It should include deep insights, actionable strategies, industry examples, and a strong conclusion.

CRITICAL INSTRUCTION: You MUST format your response using standard XML tags. Do not use JSON. Do not output markdown code blocks.
You must wrap your content exactly in these tags:
<title>The article headline</title>
<description>A short summary of 2-3 sentences.</description>
<category>Must be one of: Startup Funding, Business Growth, Investment Tips, Founder Stories, Market Insights</category>
<readtime>Estimated read time (e.g. 7 min read)</readtime>
<content>The highly detailed, lengthy article content in properly formatted HTML (use <h2>, <h3>, <p>, <strong>, <ul>, <li>).</content>`;

        const modelName = process.env.SARVAM_MODEL || "sarvam-30b";

        const response = await fetch("https://api.sarvam.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: `Write an article on the topic: ${topic}. Remember to use the XML tags.` }
            ],
          }),
        });

        let text = "";
        let usedFallback = false;

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Sarvam AI completions API failed in blog writer:", errorText);
            usedFallback = true;
        } else {
            const data = await response.json();
            text = data.choices?.[0]?.message?.content || "";
        }

        if (!text || text.trim() === '') {
            return NextResponse.json({ success: false, error: "The AI returned an empty response. Please try again." }, { status: 500 });
        }

        let parsedData = null;
        if (!usedFallback) {
            try {
                // Strip possible markdown blocks
                text = text.replace(/```xml/i, '').replace(/```html/i, '').replace(/```json/i, '').replace(/```/g, '').trim();

                const extractTag = (tag) => {
                    const regex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i');
                    const match = text.match(regex);
                    return match ? match[1].trim() : null;
                };

                let extTitle = extractTag('title');
                let extContent = extractTag('content');

                if (!extContent) {
                    console.warn("Model missed <content> tag. Extracting remaining text.");
                    let remainingText = text
                        .replace(/<title>[\s\S]*?<\/title>/gi, '')
                        .replace(/<description>[\s\S]*?<\/description>/gi, '')
                        .replace(/<category>[\s\S]*?<\/category>/gi, '')
                        .replace(/<readtime>[\s\S]*?<\/readtime>/gi, '')
                        .trim();
                    if (remainingText) {
                        extContent = remainingText;
                    }
                }

                if (!extTitle || !extContent) {
                    console.warn("Model missed XML tags. Using raw text fallback.");
                    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
                    if (lines.length > 0) {
                        extTitle = extTitle || lines[0].replace(/^#+\s*/, '').replace(/<[^>]*>?/gm, '');
                        if (!extContent) {
                            let rawContent = text.replace(lines[0], '').trim();
                            if (!/<[a-z][\s\S]*>/i.test(rawContent)) {
                                rawContent = rawContent.split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`).join('\n');
                            }
                            extContent = rawContent;
                        }
                    } else {
                        extTitle = "Untitled AI Article";
                        extContent = "<p>No content generated.</p>";
                    }
                }

                parsedData = {
                    title: extTitle,
                    description: extractTag('description') || "An insightful venture scaling and business growth review.",
                    category: extractTag('category') || "Startup Funding",
                    readTime: extractTag('readtime') || "5 min read",
                    content: extContent
                };
                
                console.log("---- RAW AI TEXT ----");
                console.log(text);
                console.log("---- EXTRACTED PARSED DATA ----");
                console.log(parsedData);
            } catch (err) {
                console.warn("Failed to parse Sarvam AI XML output. Error:", err);
                usedFallback = true;
            }
        }

        if (usedFallback) {
            return NextResponse.json({ success: false, error: "Sarvam AI failed to generate properly formatted tags." }, { status: 500 });
        }

        let title = "Untitled AI Article";
        let description = "An insightful venture scaling and business growth review.";
        let category = "Startup Funding";
        let readTime = "5 min read";
        let content = "<p>Failed to parse AI content.</p>";

        if (parsedData) {
            title = parsedData.title;
            description = parsedData.description;
            category = parsedData.category;
            readTime = parsedData.readTime;
            content = parsedData.content;
        }

        const blogData = {
            title,
            description,
            category,
            readTime,
            content
        };

        return NextResponse.json({
            success: true,
            blog: blogData
        });

    } catch (error) {
        console.error('Error in AI blog writer API:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
