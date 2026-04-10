"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BOOKING_LINK = process.env.NEXT_PUBLIC_GOOGLE_MEET_BOOKING_LINK ?? "/contact";
const DEMO_LINK = process.env.NEXT_PUBLIC_DEMO_URL ?? "/ai-website";

export default function HomeChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState<string>(
    () => Math.random().toString(36).slice(2)
  );
  const bottomRef = useRef<HTMLDivElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showCTA = userMessageCount >= 3;

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content:
            "I'm Simon. Tell me your niche, and I will build you an entire demo system right now.",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading) return;
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
          content: data.reply ?? data.error ?? "Hmm, I couldn't reach the server.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong — try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-full bg-[#111111] text-[#f2ede4] border border-white/10 hover:border-white/20 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.8)]"
      >
        {open ? (
          <>
            <X size={18} className="text-gray-400" />
            <span className="text-sm font-semibold font-sans">Close</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center w-2.5 h-2.5">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <Sparkles size={16} className="text-[var(--accent)]" />
            <span className="text-sm font-bold tracking-wide font-sans">Tell me your niche</span>
          </>
        )}
      </button>

      {/* iPhone Chat Mockup */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ 
            width: "320px", 
            height: "600px",
            backgroundColor: "#0A0A0A",
            border: "8px solid #222", // bezel
            borderRadius: "44px", // iphone curve
            boxShadow: "inset 0 0 0 1px #444, 0 30px 60px -12px rgba(0,0,0,1)",
          }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 shadow-inner"
            aria-hidden="true"
          />

          {/* Header */}
          <div className="pt-12 pb-4 px-6 border-b border-white/5 bg-[#000] text-gray-100 relative z-10 flex flex-col items-center">
            <span className="text-base font-bold font-sans">FlyNerd Support</span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Agent Simon</span>
            </div>
          </div>

          {/* Messaging Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#0A0A0A]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`max-w-[85%] px-4 py-3 text-[14px] font-sans leading-relaxed shadow-sm ${
                    m.role === "user" 
                      ? "bg-[#2563EB] text-white rounded-[20px] rounded-br-[4px]" 
                      : "bg-[#1C1C1E] text-gray-100 rounded-[20px] rounded-tl-[4px]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#1C1C1E] rounded-[20px] rounded-tl-[4px] px-4 py-4 flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* CTA row — appears after 3 exchanges */}
          {showCTA && (
            <div className="px-5 py-3 bg-[#0A0A0A] flex gap-2 border-t border-white/5">
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex justify-center items-center py-3 rounded-2xl border border-gray-700 text-gray-300 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Book Call
              </a>
              <Link
                href={DEMO_LINK}
                className="flex-1 flex justify-center items-center gap-1 py-3 rounded-2xl bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Get Demo <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-[#0A0A0A] pb-6">
            <div className="relative flex items-center bg-[#1C1C1E] rounded-full border border-gray-800 pr-1.5 pl-4 py-1.5">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="iMessage"
                disabled={loading}
                className="w-full bg-transparent text-white text-sm font-sans outline-none placeholder:text-gray-500 py-1.5"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-[#2563EB] text-white disabled:opacity-40 disabled:bg-gray-700 flex-shrink-0 transition-colors shadow-sm"
              >
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          {/* Bottom Bar (Home Indicator) mask */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/30 rounded-full"></div>
        </div>
      )}
    </>
  );
}
