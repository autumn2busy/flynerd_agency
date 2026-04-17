"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";

interface Props {
  businessName: string;
  niche: string;
  primaryColor: string;
  starterPrompts: string[];
  initialPrompt?: string;
  onMessageSent?: (messageCount: number) => void;
  onStarterClicked?: (prompt: string) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Medspa-native embedded chat widget. Light theme, branded header that uses the
 * lead's palette, framed as the client's own AI booking assistant.
 * See docs/medspa-demo-template-spec.md Section C.
 */
export default function MedspaChatWidget({
  businessName,
  niche,
  primaryColor,
  starterPrompts,
  initialPrompt,
  onMessageSent,
  onStarterClicked,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [locked, setLocked] = useState(false);
  const userMessageCountRef = useRef(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const primedRef = useRef(false);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: `Hi, I'm the booking assistant for ${businessName}. Ask me about any treatment, pricing, or availability.`,
        },
      ]);
    }
  }, [businessName, messages.length]);

  // Handle prompt injected from a service card click
  useEffect(() => {
    if (initialPrompt && !primedRef.current && !loading && !locked) {
      primedRef.current = true;
      setInput(initialPrompt);
    }
  }, [initialPrompt, loading, locked]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(messageOverride?: string) {
    const message = (messageOverride ?? input).trim();
    if (!message || loading || locked) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    userMessageCountRef.current += 1;
    onMessageSent?.(userMessageCountRef.current);
    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, businessName, niche }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Something went wrong." },
      ]);
      setLocked(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Refresh to try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onStarterClick(prompt: string) {
    onStarterClicked?.(prompt);
    send(prompt);
  }

  return (
    <div
      className="relative w-full rounded-2xl border bg-white shadow-xl flex flex-col overflow-hidden"
      style={{ borderColor: "#E8E5DF", height: "560px" }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={16} color="white" />
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">
              {businessName} booking assistant
            </p>
            <p className="text-white/80 text-xs">Available 24/7</p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest font-semibold text-white/80 border border-white/40 rounded-full px-2 py-0.5">
          Demo preview
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#FAF9F6]">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                m.role === "user" ? "text-white font-medium" : "bg-white border text-neutral-800"
              }`}
              style={
                m.role === "user"
                  ? { backgroundColor: primaryColor }
                  : { borderColor: "#E8E5DF" }
              }
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border px-4 py-2.5 rounded-2xl text-sm text-neutral-500" style={{ borderColor: "#E8E5DF" }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Starter prompts (only when no user messages yet) */}
      {userMessageCountRef.current === 0 && !loading && !locked && (
        <div className="px-5 pt-2 pb-1 flex flex-wrap gap-2 bg-[#FAF9F6]">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onStarterClick(prompt)}
              className="text-xs px-3 py-1.5 rounded-full border hover:bg-white transition-colors"
              style={{ borderColor: "#E8E5DF", color: "#555555" }}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input / locked state */}
      <div className="p-4 border-t bg-white" style={{ borderColor: "#E8E5DF" }}>
        {locked ? (
          <div className="text-center text-sm text-neutral-600 py-2 px-3">
            Ready to get this AI assistant live on your site? Scroll down to reserve your build.
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about treatments, pricing, or availability..."
              disabled={loading}
              className="flex-1 bg-[#FAF9F6] border rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-neutral-400 disabled:opacity-50"
              style={{ borderColor: "#E8E5DF" }}
            />
            <button
              onClick={() => send()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              <Send size={15} color="white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
