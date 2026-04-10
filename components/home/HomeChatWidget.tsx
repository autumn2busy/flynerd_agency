"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Requires NEXT_PUBLIC_GOOGLE_MEET_BOOKING_LINK in .env
const BOOKING_LINK = process.env.NEXT_PUBLIC_GOOGLE_MEET_BOOKING_LINK ?? "/contact";
const DEMO_LINK = process.env.NEXT_PUBLIC_DEMO_URL ?? "/ai-website";

const monoStyle = { fontFamily: "var(--font-mono)" } as const;
const displayStyle = { fontFamily: "var(--font-display)" } as const;

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
            "What local service business are you trying to grow? Tell me your niche.",
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
          content: data.reply ?? data.error ?? "Something went wrong.",
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
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-dark)] text-[var(--text-inverse)] hover:opacity-90 transition-opacity shadow-lg"
        style={monoStyle}
      >
        {open ? (
          <>
            <X size={14} />
            <span className="text-[0.8rem]">close</span>
          </>
        ) : (
          <span className="text-[0.8rem] cursor-blink">// ask anything</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed bottom-20 right-6 z-50 w-[340px] flex flex-col border border-[var(--text-primary)] bg-[var(--bg-base)] shadow-2xl"
          style={{ height: "460px" }}
        >
          {/* Header bar — black */}
          <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-dark)] text-[var(--text-inverse)]">
            <span className="text-sm font-semibold" style={displayStyle}>
              FlyNerd AI
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={13} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i}>
                {m.role === "assistant" ? (
                  <p className="text-sm leading-relaxed text-[var(--text-primary)]" style={displayStyle}>
                    <span
                      className="mr-1.5 font-medium"
                      style={{ ...monoStyle, color: "var(--accent)", fontSize: "0.72rem" }}
                    >
                      FN ›
                    </span>
                    {m.content}
                  </p>
                ) : (
                  <p
                    className="text-right text-[0.78rem] text-[var(--text-secondary)]"
                    style={monoStyle}
                  >
                    {m.content}
                  </p>
                )}
              </div>
            ))}

            {loading && (
              <p className="text-sm text-[var(--text-muted)]" style={displayStyle}>
                <span
                  className="mr-1.5"
                  style={{ ...monoStyle, color: "var(--accent)", fontSize: "0.72rem" }}
                >
                  FN ›
                </span>
                ...
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* CTA row — appears after 3 exchanges */}
          {showCTA && (
            <div
              className="px-4 py-3 flex gap-2 border-t border-[var(--text-primary)]"
              role="region"
              aria-label="Next steps"
            >
              <a
                href={BOOKING_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2 border border-[var(--text-primary)] text-[0.72rem] hover:bg-[var(--bg-dark)] hover:text-[var(--text-inverse)] transition-colors"
                style={monoStyle}
              >
                Book a Call
              </a>
              <Link
                href={DEMO_LINK}
                className="flex-1 text-center py-2 bg-[var(--bg-dark)] text-[var(--text-inverse)] text-[0.72rem] hover:opacity-80 transition-opacity"
                style={monoStyle}
              >
                See a Demo
              </Link>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-[var(--text-primary)]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="ask about your niche..."
                disabled={loading}
                className="flex-1 bg-transparent text-[var(--text-primary)] text-sm outline-none placeholder:text-[var(--text-muted)] disabled:opacity-50 border-b border-[var(--text-primary)] pb-1"
                style={monoStyle}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="w-8 h-8 flex items-center justify-center bg-[var(--bg-dark)] text-[var(--text-inverse)] disabled:opacity-30 flex-shrink-0"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
