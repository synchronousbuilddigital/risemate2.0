import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.SARVAM_API_KEY || process.env.SARVAM_AI_API_KEY;

    if (!apiKey) {
      console.warn("SARVAM_API_KEY is not defined in environment variables.");
      return NextResponse.json(
        { error: "Sarvam AI API key is not configured. Please add SARVAM_API_KEY to your environment." },
        { status: 500 }
      );
    }

    // System prompt detailing RiseMates Ventures
    const systemPrompt = `You are the official AI Assistant for RiseMates Ventures. 
Your goal is to answer queries from prospective founders, enterprises, and partners about RiseMates Ventures and guide them toward booking a consultation.

Core Info about RiseMates Ventures:
- A premium Global Business Growth & Venture Ecosystem that helps startups, enterprises, and investors scale execution and unlock funding.
- Tagline: "One Vision. Four Empires."
- The Four Ecosystem/Portfolio Companies:
  1. Bworth (Corporate advisory, branding systems, scaling consultant)
  2. VegaVrudhi (Managed sales force, field force execution, retail scaling)
  3. RYM Grenergy (Clean energy, IoT engineering, circular economy architecture)
  4. Synchronous Digital Build (Custom software development, tech engineering, autonomous AI tools)
- Key Partners: Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava.
- Funding Scoping: Direct capital and partner network facilitation from ₹1 Crore to ₹50 Crores+.
- Process/Timeline: Initial pitch deck review takes 48 hours. Scoping, verification, and facilitation takes 4 to 6 weeks.
- Corporate Headquarters: 7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69, Gurugram, India.
- Contact/Support Email: info@bworth.co.in or saurabh@vegavruddhi.com.
- Phone Contacts: +91-91166-16636 (Sales) or +91-88266-68050 (Support).

Rules for Responses:
1. Be extremely professional, concise, encouraging, and clear.
2. Keep responses brief (under 3 sentences where possible) to keep the chat interface clean.
3. If they ask about funding, eligibility, or partnerships, encourage them to click "Book Consultation" or email biz@RiseMatesventures.com.
4. Keep the tone premium and enterprise-grade.`;

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
          { role: "user", content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sarvam AI completions API failed:", errorText);
      return NextResponse.json({ error: "Sarvam AI API request failed" }, { status: response.status });
    }

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content || "I couldn't process that question. Please try again.";

    return NextResponse.json({ response: botReply });
  } catch (error) {
    console.error("Error in chat route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
