"use client";

import { ArrowRight } from "lucide-react";
import type { Treatment } from "./medspaDefaults";

interface Props {
  businessName: string;
  treatments: Treatment[];
  primaryColor: string;
  onCardClick: (treatmentName: string, position: number) => void;
}

/**
 * 6-card treatment grid. Each card's CTA pipes a prompt into the AI booking
 * employee in Section C. See docs/medspa-demo-template-spec.md Section B.
 */
export default function MedspaServices({
  businessName,
  treatments,
  primaryColor,
  onCardClick,
}: Props) {
  const cards = treatments.slice(0, 6);
  return (
    <section
      id="treatments"
      className="py-20 md:py-28 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12 md:mb-16">
          <p
            className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: primaryColor }}
          >
            Treatments
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            What {businessName} offers.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#555555" }}>
            Tap any treatment to ask the booking assistant about pricing, downtime, or next availability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {cards.map((t, i) => (
            <TreatmentCard
              key={`${t.name}-${i}`}
              treatment={t}
              primaryColor={primaryColor}
              onClick={() => onCardClick(t.name, i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TreatmentCard({
  treatment,
  primaryColor,
  onClick,
}: {
  treatment: Treatment;
  primaryColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border bg-[#FAF9F6] p-6 md:p-7 flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all"
      style={{ borderColor: "#E8E5DF" }}
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: `${primaryColor}1A` }}
      >
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: primaryColor }}
        />
      </div>
      <h3
        className="text-lg md:text-xl leading-tight mb-2"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
      >
        {treatment.name}
      </h3>
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#555555" }}>
        {treatment.description}
      </p>
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
        style={{ color: primaryColor }}
      >
        Ask about this
        <ArrowRight
          size={13}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </span>
    </button>
  );
}
