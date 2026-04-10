"use client";

import { useState } from "react";

interface Props {
  businessName: string;
  niche: string;
  bookingLink: string;
}

export default function PhoneChatWidget({ businessName, niche, bookingLink }: Props) {
  const [messages, setMessages] = useState([
    {
      role: "assistant" as const,
      content: `Hi! I'm the AI concierge for ${businessName}. Ask me anything about growing your ${niche} business online.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);

  async function send() {
    if (!input.trim() || loading || locked) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user" as const, content: userMessage }]);
    setLoading(true);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, businessName, niche }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: data.reply || "Something went wrong." },
      ]);
      setLocked(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: "Something went wrong — try refreshing." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const mailtoHref = `mailto:hello@flynerd.tech?subject=${encodeURIComponent(`Launch ${businessName} Website`)}`;

  return (
    <div className="relative w-[280px] mx-auto">
      {/* Phone shell */}
      <div
        className="relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{ background: "#111", border: "6px solid #2a2a2a", height: 560 }}
      >
        {/* Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-2xl z-10"
          style={{ background: "#000" }}
        />

        <div className="flex flex-col h-full pt-6">
          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-2 flex-shrink-0"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <div className="w-7 h-7 rounded-full bg-black/25 flex items-center justify-center text-[10px] font-bold text-white">
              FN
            </div>
            <div>
              <p className="text-[11px] font-bold text-black leading-none">FlyNerd AI</p>
              <p className="text-[9px] text-black/60 mt-0.5">Personalized for {businessName}</p>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-green-400" />
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 space-y-2"
            style={{ background: "#0a0a0a" }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] px-3 py-2 rounded-2xl text-[11px] leading-relaxed"
                  style={
                    m.role === "user"
                      ? {
                          backgroundColor: "var(--color-primary)",
                          color: "#000",
                          fontWeight: 600,
                        }
                      : { background: "rgba(255,255,255,0.08)", color: "#e5e5e5" }
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-2xl text-[11px]"
                  style={{ background: "rgba(255,255,255,0.08)", color: "#888" }}
                >
                  Thinking…
                </div>
              </div>
            )}
          </div>

          {/* Input / locked CTAs */}
          <div
            className="p-2.5 flex-shrink-0"
            style={{
              background: "#111",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {locked ? (
              <div className="space-y-1.5">
                <a
                  href={bookingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center text-[11px] font-bold text-black py-2.5 rounded-xl transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  Book a Strategy Call
                </a>
                <a
                  href={mailtoHref}
                  className="block w-full text-center text-[11px] font-semibold py-2.5 rounded-xl transition-opacity hover:opacity-80"
                  style={{
                    border: "1px solid var(--color-accent)",
                    color: "var(--color-accent)",
                  }}
                >
                  Launch This Site
                </a>
              </div>
            ) : (
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about your demo…"
                  disabled={loading}
                  className="flex-1 rounded-xl px-3 py-2 text-[11px] text-white placeholder:text-neutral-500 outline-none disabled:opacity-50"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full"
        style={{ background: "#444" }}
      />
    </div>
  );
}
