"use client";

import { useEffect, useRef, useState } from "react";

type Message =
  | { id: string; who: "user"; text: string }
  | { id: string; who: "bot"; text: string }
  | { id: string; who: "typing" };

// Mock transcript for the Solène Aesthetics concierge preview.
// Timings mirror the original HTML source.
const SCRIPT: Array<{
  who: "user" | "bot";
  text: string;
  delay: number;        // ms after the previous step
  typing?: number;      // for bot messages: ms to show typing bubble first
}> = [
  { who: "user", text: "Hi — looking for a consultation about lip filler next week.", delay: 400 },
  {
    who: "bot",
    text:
      "Lovely. We have Dr. Aveline available Tuesday at 2:30pm or Thursday morning at 10am for a 30-minute consult. Both include a complimentary skin assessment. Which works better?",
    delay: 1400,
    typing: 900,
  },
  { who: "user", text: "Thursday please. Is there anything I should do beforehand?", delay: 1500 },
  {
    who: "bot",
    text:
      "Thursday at 10am, booked. We'll send a short intake form and gentle prep notes by text. Looking forward to having you.",
    delay: 1400,
    typing: 700,
  },
];

export default function AgentPreview() {
  const [messages, setMessages] = useState<Message[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const loopRef = useRef<number>(0);

  useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    let messageCounter = 0;

    const uid = () => {
      messageCounter += 1;
      return `m-${loopRef.current}-${messageCounter}`;
    };

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scheduleStep(stepIdx: number, atMs: number) {
      const step = SCRIPT[stepIdx];
      if (!step) return;

      if (step.who === "bot" && step.typing && !reduced) {
        const typingId = uid();
        const showTypingAt = atMs - step.typing;
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setMessages((m) => [...m, { id: typingId, who: "typing" }]);
          }, Math.max(0, showTypingAt)),
        );
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setMessages((m) => {
              const next = m.filter((msg) => msg.who !== "typing");
              return [...next, { id: uid(), who: "bot", text: step.text }];
            });
          }, atMs),
        );
      } else {
        timers.push(
          window.setTimeout(() => {
            if (cancelled) return;
            setMessages((m) => [
              ...m.filter((msg) => msg.who !== "typing"),
              step.who === "bot"
                ? { id: uid(), who: "bot", text: step.text }
                : { id: uid(), who: "user", text: step.text },
            ]);
          }, atMs),
        );
      }
    }

    function play() {
      if (cancelled) return;
      setMessages([]);
      loopRef.current += 1;
      messageCounter = 0;
      let t = 0;
      SCRIPT.forEach((step, i) => {
        t += step.delay;
        scheduleStep(i, t);
      });
      // Loop after a pause.
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) play();
        }, t + 3500),
      );
    }

    // Small boot delay, matching source.
    timers.push(window.setTimeout(play, 600));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Auto-scroll chat body as messages arrive.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <section className="lv2-agent" id="lv2-agent" aria-label="Agent preview">
      <div className="lv2-agent-inner">
        <div className="lv2-agent-copy">
          <div className="lv2-sec-kicker">chapter 01 · your digital employee</div>
          <h2 className="lv2-sec-title" style={{ marginBottom: 24 }}>
            Your digital employee. <span className="lv2-italic">Not</span> a chatbot.
          </h2>
          <p className="lv2-lede">
            An always-on concierge trained on your practice — your services, your pricing,
            your policies, your voice. It greets clients, answers thoughtfully, and books
            real appointments on your calendar. Around the clock. On brand. Without
            compromise.
          </p>
          <ul>
            <li>
              <span>
                <strong>Speaks in your voice</strong> — polished, warm, unmistakably yours.
              </span>
            </li>
            <li>
              <span>
                <strong>Books qualified clients</strong> straight onto your calendar.
              </span>
            </li>
            <li>
              <span>
                <strong>Knows when to hand off</strong> to you or your team — with full context.
              </span>
            </li>
          </ul>
        </div>

        <div className="lv2-chat-card" aria-hidden="true">
          <div className="lv2-chat-head">
            <span className="lv2-live" />
            <span className="lv2-title">Solène Aesthetics · Concierge</span>
            <span className="lv2-model">Live</span>
          </div>
          <div className="lv2-chat-body" ref={bodyRef}>
            {messages.map((m) => {
              if (m.who === "typing") {
                return (
                  <div className="lv2-msg lv2-bot" key={m.id}>
                    <span className="lv2-typing">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                );
              }
              return (
                <div
                  className={`lv2-msg ${m.who === "user" ? "lv2-user" : "lv2-bot"}`}
                  key={m.id}
                >
                  {m.text}
                </div>
              );
            })}
          </div>
          <div className="lv2-chat-foot">
            <span className="lv2-ghost">Type a message…</span>
            <span>↵</span>
          </div>
        </div>
      </div>
    </section>
  );
}
