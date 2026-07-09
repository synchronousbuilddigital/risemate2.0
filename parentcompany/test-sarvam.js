const topic = 'Seed Funding';
const apiKey = 'sk_b46gl2ai_R3JBGrozjGfBSf2aSUoSABqx'; // from .env
const modelName = 'sarvam-30b';
const systemPrompt = `You are a professional venture capital and business scaling blog writer for RiseMate Ventures.
Your task is to generate a highly detailed, comprehensive, and authoritative article (at least 800-1200 words, minimum 5-8 minutes read time) about the user's requested topic. The blog MUST NOT be a short snippet. It should include deep insights, actionable strategies, industry examples, and a strong conclusion.

CRITICAL INSTRUCTION: You MUST format your response using standard XML tags. Do not use JSON. Do not output markdown code blocks.
You must wrap your content exactly in these tags:
<title>The article headline</title>
<description>A short summary of 2-3 sentences.</description>
<category>Must be one of: Startup Funding, Business Growth, Investment Tips, Founder Stories, Market Insights</category>
<readtime>Estimated read time (e.g. 7 min read)</readtime>
<content>The highly detailed, lengthy article content in properly formatted HTML (use <h2>, <h3>, <p>, <strong>, <ul>, <li>).</content>`;

fetch('https://api.sarvam.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
        model: modelName,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Write an article on the topic: ${topic}. Remember to use the XML tags.` }
        ]
    })
}).then(r => r.json()).then(d => {
    const text = d.choices?.[0]?.message?.content || "";
    console.log("Raw Output:");
    console.log(text);
    
    // Simulate fallback parser
    let extTitle = null;
    let extContent = null;
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length > 0) {
        extTitle = lines[0].replace(/^#+\s*/, '').replace(/<[^>]*>?/gm, '');
        let rawContent = text.replace(lines[0], '').trim();
        if (!/<[a-z][\s\S]*>/i.test(rawContent)) {
            rawContent = rawContent.split(/\n\s*\n/).map(p => `<p>${p.replace(/\n/g, '<br />')}</p>`).join('\n');
        }
        extContent = rawContent;
    }
    console.log("\n\nExtracted Title:");
    console.log(extTitle);
    console.log("\nExtracted Content:");
    console.log(extContent.substring(0, 500) + "...");

}).catch(console.error);
