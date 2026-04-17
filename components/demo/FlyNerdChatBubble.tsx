"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Props {
  leadId: string;
  businessName: string;
  onOpen: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Floating FlyNerd-branded chat bubble, bottom-right. Separate from the
 * Section C medspa-native chat. Purpose: let the prospect ask about FlyNerd
 * services while they explore the demo.
 * See docs/medspa-demo-template-spec.md Section "Floating FlyNerd Chat Bubble".
 */
export default function FlyNerdChatBubble({ leadId, businessName, onOpen }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hey, I'm FlyNerd. Ask anything about how we'd build this for ${businessName}.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  function handleOpen() {
    setOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      onOpen();
    }
  }

  async function send() {
    const message = input.trim();
    if (!message || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Leave niche blank so the endpoint treats this as a FlyNerd-services question.
        body: JSON.stringify({ message, businessName: "FlyNerd", niche: "agency", leadId }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        aria-label={open ? "Close FlyNerd chat" : "Open FlyNerd chat"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 bg-[#1A1A1A] text-white"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-[360px] rounded-2xl bg-white border flex flex-col overflow-hidden shadow-2xl"
          style={{ borderColor: "#E8E5DF", height: "440px" }}
        >
          <div className="px-4 py-3 border-b bg-[#1A1A1A] flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div>
              <p className="font-bold text-sm text-white leading-tight">Questions about FlyNerd?</p>
              <p className="text-white/60 text-xs">Ask here.</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF9F6]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#1A1A1A] text-white font-medium"
                      : "bg-white border text-neutral-800"
                  }`}
                  style={m.role === "assistant" ? { borderColor: "#E8E5DF" } : {}}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border px-3.5 py-2 rounded-2xl text-sm text-neutral-500" style={{ borderColor: "#E8E5DF" }}>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t bg-white" style={{ borderColor: "#E8E5DF" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about pricing, timeline, integrations..."
                disabled={loading}
                className="flex-1 bg-[#FAF9F6] border rounded-xl px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-neutral-400 disabled:opacity-50"
                style={{ borderColor: "#E8E5DF" }}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-9 h-9 rounded-xl flex items-center justify-center disabled:opacity-40 bg-[#1A1A1A] text-white"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
