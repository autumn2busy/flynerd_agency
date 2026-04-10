"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BOOKING_LINK =
  process.env.NEXT_PUBLIC_GOOGLE_MEET_BOOKING_LINK ?? "/contact";

const MAX_USER_MESSAGES = 5;

export default function PhoneChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Tell me your niche and city — I'll show you exactly what we'd build for you.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const userCount = messages.filter((m) => m.role === "user").length;
  const locked = userCount >= MAX_USER_MESSAGES;

  // Scroll the messages container internally — never scrolls the page
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading || locked) return;
    const text = input.trim();
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          sessionId,
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply ?? data.error ?? "Something went wrong.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error — try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    /* Phone frame — larger on desktop via CSS custom property */
    <div
      className="relative flex flex-col overflow-hidden accent-glow"
      style={{
        width: "clamp(300px, 38vw, 420px)",
        height: "clamp(580px, 70vh, 760px)",
        border: "10px solid #1a1a1a",
        borderRadius: "52px",
        boxShadow: "inset 0 0 0 1px #444, 0 40px 80px -12px rgba(0,0,0,1), 0 0 0 1px #333",
        background: "#0A0A0A",
        flexShrink: 0,
      }}
    >
      {/* Dynamic Island */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-20"
        aria-hidden="true"
      />

      {/* Header */}
      <div className="pt-12 pb-4 px-5 border-b border-white/5 bg-black flex flex-col items-center relative z-10 shrink-0">
        <span className="text-sm font-bold text-white">FlyNerd AI</span>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span
            className="text-[9px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            Agent Online
          </span>
        </div>
      </div>

      {/* Messages — scrolls internally, never moves the page */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0A0A0A]"
        style={{ overscrollBehavior: "contain" }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] px-3 py-2.5 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "bg-[#e8e8e8] text-black rounded-[16px] rounded-br-[4px]"
                  : "bg-[#1C1C1E] text-gray-100 rounded-[16px] rounded-tl-[4px] border border-white/5"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1C1C1E] rounded-[16px] rounded-tl-[4px] px-4 py-3 flex gap-1.5 border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Locked CTA */}
      {locked && (
        <div className="px-4 py-4 bg-[#0A0A0A] border-t border-white/5 shrink-0">
          <p className="text-[10px] text-gray-500 text-center mb-3 uppercase tracking-wider">
            Ready to see the real thing?
          </p>
          <a
            href={BOOKING_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-[12px] font-bold text-black rounded-2xl"
            style={{ background: "var(--accent)" }}
          >
            Book a Strategy Call <ArrowRight size={13} />
          </a>
        </div>
      )}

      {/* Input */}
      {!locked && (
        <div className="px-4 pb-6 pt-3 bg-[#0A0A0A] shrink-0">
          <div className="relative flex items-center bg-[#1C1C1E] rounded-full border border-gray-800 pr-1.5 pl-4 py-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={`Message (${MAX_USER_MESSAGES - userCount} left)`}
              disabled={loading}
              className="w-full bg-transparent text-white text-[12px] outline-none placeholder:text-gray-600 py-1.5 disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send"
              className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-white text-black disabled:opacity-30 shrink-0"
            >
              <ArrowRight size={13} strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-center text-[9px] text-gray-700 mt-2">
            {MAX_USER_MESSAGES - userCount} of {MAX_USER_MESSAGES} messages remaining
          </p>
        </div>
      )}

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/20 rounded-full" />
    </div>
  );
}
