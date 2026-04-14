import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const { message, businessName, niche } = await req.json();

  if (!message || !businessName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const systemPrompt = `You are a helpful assistant giving ${businessName} a preview of what FlyNerd can build for them. Be concise and specific to their ${niche} niche. Keep your response under 100 words. Be warm, confident, and close with one clear takeaway that makes them want to book a strategy call. Do not use markdown formatting — plain text only.`;

  try {
    const completion = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    });

    const rawReply =
      completion.content[0]?.type === "text" ? completion.content[0].text.trim() : "";

    // Sanitize: strip em dashes
    const reply = rawReply.replace(/\u2014/g, ",").replace(/\u2013/g, "-");

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error("[DemoChat] Error:", err.message);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
