"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Props {
  businessName: string;
  niche: string;
  bookingLink: string;
  inline?: boolean;
  onOpen?: () => void;
  onMessageSent?: (messageCount: number) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function DemoChatWidget({ businessName, niche, bookingLink, inline = false, onOpen, onMessageSent }: Props) {
  const [open, setOpen] = useState(inline);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const hasOpenedRef = useRef(false);
  const userMessageCountRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      onOpen?.();
    }
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hey! I'm your FlyNerd AI preview. Ask me anything about what we could build for ${businessName}.`,
        },
      ]);
    }
  }, [open, businessName, messages.length, onOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    if (!input.trim() || loading || locked) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    userMessageCountRef.current += 1;
    onMessageSent?.(userMessageCountRef.current);
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
        { role: "assistant", content: data.reply || "Something went wrong." },
      ]);
      // Lock after one full exchange
      setLocked(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong — try refreshing." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const panelClass = inline
    ? "relative w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl flex flex-col overflow-hidden"
    : "fixed bottom-24 right-6 z-50 w-80 rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl flex flex-col overflow-hidden";
  const panelStyle: React.CSSProperties = { height: inline ? "520px" : "420px" };

  return (
    <>
      {!inline && (
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105"
          style={{ backgroundColor: "var(--color-primary, #D4AF37)" }}
        >
          {open ? <X size={22} color="black" /> : <MessageCircle size={22} color="black" />}
        </button>
      )}

      {open && (
        <div
          className={panelClass}
          style={panelStyle}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b border-black/10 flex items-center justify-between"
            style={{ backgroundColor: "var(--color-primary, #D4AF37)" }}
          >
            <div>
              <p className="font-bold text-black text-sm">FlyNerd AI Preview</p>
              <p className="text-black/60 text-xs">Personalized for {businessName}</p>
            </div>
            {!inline && (
              <button
                onClick={() => setOpen(false)}
                className="text-black/50 hover:text-black transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "text-black font-medium"
                      : "bg-white/5 border border-white/10 text-neutral-200"
                  }`}
                  style={
                    m.role === "user"
                      ? { backgroundColor: "var(--color-primary, #D4AF37)" }
                      : {}
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-sm text-neutral-500">
                  Thinking…
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input / locked CTA */}
          <div className="p-3 border-t border-white/10">
            {locked ? (
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center font-bold text-black py-3 rounded-xl text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary, #D4AF37)" }}
              >
                Book a Strategy Call →
              </a>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about your demo…"
                  disabled={loading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-white/30 disabled:opacity-50"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
                  style={{ backgroundColor: "var(--color-primary, #D4AF37)" }}
                >
                  <Send size={14} color="black" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
