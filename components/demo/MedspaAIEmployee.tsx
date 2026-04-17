"use client";

import MedspaChatWidget from "./MedspaChatWidget";

interface Props {
  businessName: string;
  niche: string;
  primaryColor: string;
  starterPrompts: string[];
  initialPrompt?: string;
  onMessageSent: (count: number) => void;
  onStarterClicked: (prompt: string) => void;
}

/**
 * Section C: THE CENTERPIECE. Embedded AI booking employee. Visually framed
 * as the business's own AI, with a small "Demo preview" badge on the widget.
 * See docs/medspa-demo-template-spec.md Section C.
 */
export default function MedspaAIEmployee({
  businessName,
  niche,
  primaryColor,
  starterPrompts,
  initialPrompt,
  onMessageSent,
  onStarterClicked,
}: Props) {
  return (
    <section
      id="ai-employee"
      className="py-20 md:py-28 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FAF9F6" }}
    >
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
        {/* Left column: framing copy */}
        <div className="lg:col-span-2 lg:sticky lg:top-28">
          <p
            className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: primaryColor }}
          >
            Your 24/7 booking employee
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            Ask anything a new patient would.
          </h2>
          <p className="text-base leading-relaxed mb-5" style={{ color: "#555555" }}>
            This is the same AI we'd install into your site: trained on your treatments, your pricing, your availability windows, and the objections your front desk hears every week.
          </p>
          <ul className="space-y-3 text-sm" style={{ color: "#555555" }}>
            <li className="flex gap-2">
              <span style={{ color: primaryColor }}>•</span>
              Handles pricing, treatment, and availability questions in natural conversation.
            </li>
            <li className="flex gap-2">
              <span style={{ color: primaryColor }}>•</span>
              Hands off to your booking platform when a patient is ready to schedule.
            </li>
            <li className="flex gap-2">
              <span style={{ color: primaryColor }}>•</span>
              Escalates the nuanced cases your team wants to answer personally.
            </li>
          </ul>
        </div>

        {/* Right column: embedded chat */}
        <div className="lg:col-span-3">
          <MedspaChatWidget
            businessName={businessName}
            niche={niche}
            primaryColor={primaryColor}
            starterPrompts={starterPrompts}
            initialPrompt={initialPrompt}
            onMessageSent={onMessageSent}
            onStarterClicked={onStarterClicked}
          />
        </div>
      </div>
    </section>
  );
}
