import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─────────────────────────────────────────────────────────────────────────────
// Rate limiting: 20 messages per IP per hour (in-memory)
// ─────────────────────────────────────────────────────────────────────────────
const ipRateMap = new Map<string, { count: number; resetAt: number }>();

const bypassIps = new Set([
    "127.0.0.1",
    "::1",
    ...(process.env.RATE_LIMIT_BYPASS_IPS?.split(",").map((s) => s.trim()) || []),
]);

function isRateLimited(ip: string): boolean {
    if (bypassIps.has(ip)) return false;

    const now = Date.now();
    const entry = ipRateMap.get(ip);

    if (!entry || now > entry.resetAt) {
        ipRateMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
        return false;
    }

    if (entry.count >= 20) return true;

    entry.count++;
    return false;
}

// Cleanup stale entries every 10 minutes
setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of ipRateMap.entries()) {
        if (now > entry.resetAt) ipRateMap.delete(ip);
    }
}, 10 * 60 * 1000);

// ─────────────────────────────────────────────────────────────────────────────
// Homepage System Prompt
// ─────────────────────────────────────────────────────────────────────────────
const DEMO_SYSTEM_PROMPT = `You are the FlyNerd AI assistant. FlyNerd builds AI-powered websites for local service businesses — fast, personalized, and with a built-in AI chatbot trained on the client's specific services. Help visitors understand what FlyNerd does, what niches we serve, and guide them toward booking a strategy call. Be sharp, direct, and confident — not salesy. Keep responses under 3 sentences. Do not make specific claims about how quickly a site will be deployed.

Niches we serve: HVAC, plumbing, barbershops, med spas, roofing, electricians, weight loss clinics, pest control, law firms, dental, real estate, and more.

Never use markdown formatting. Plain text only.`;

// ─────────────────────────────────────────────────────────────────────────────
// POST handler
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";

        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: "Rate limit reached. Book a strategy call to see more!" },
                { status: 429 }
            );
        }

        const { messages, sessionId } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "Messages required" }, { status: 400 });
        }

        // Enforce 5 messages per session (client-side sessionId check)
        if (messages.filter((m: any) => m.role === "user").length > 5) {
            return NextResponse.json(
                { error: "Session limit reached. Impressed? Book a strategy call!" },
                { status: 429 }
            );
        }

        const completion = await anthropic.messages.create({
            model: "claude-haiku-4-5-20251001",
            system: DEMO_SYSTEM_PROMPT,
            messages: messages.slice(-10).map((m: any) => ({
                role: m.role as "user" | "assistant",
                content: m.content,
            })),
            temperature: 0.6,
            max_tokens: 250,
        });

        const reply =
            completion.content[0]?.type === "text"
                ? completion.content[0].text.trim()
                : "";

        return NextResponse.json({ reply });
    } catch (error: any) {
        console.error("[Chat Demo] Error:", error.message);
        return NextResponse.json(
            { error: "Something went wrong. Try again." },
            { status: 500 }
        );
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/chat-demo — Reset rate limits (admin only)
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
    const secret = req.headers.get("x-admin-secret");
    if (!secret || secret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    ipRateMap.clear();
    return NextResponse.json({ success: true, message: "Rate limits cleared" });
}
