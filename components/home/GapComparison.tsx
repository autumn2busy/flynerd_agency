"use client";

import ScrollReveal from "@/components/home/ScrollReveal";

const differentiators = [
  { feature: "Philosophy", generic: "Digital Brochure", flynerd: "Digital Employee", highlight: true },
  { feature: "Onboarding", generic: "You write all the copy", flynerd: "AI scours Yelp for you", highlight: false },
  { feature: "Functionality", generic: "Static contact form", flynerd: "AI books + qualifies 24/7", highlight: false },
  { feature: "Launch speed", generic: "4–6 weeks", flynerd: "7-day guarantee", highlight: false },
  { feature: "Focus", generic: "How it looks", flynerd: "How it converts", highlight: false },
];

export default function GapComparison() {
  return (
    <section className="py-24 lg:py-32 bg-[#0d0d10] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/15 to-transparent" />
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#E8B923] mb-4">The Gap</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
                Wix sends you an email.<br />
                <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                  We book the appointment.
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(232,185,35,0.12)", background: "rgba(255,255,255,0.02)" }}>
              <div className="grid grid-cols-3 px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div className="text-xs font-bold text-white/30 uppercase tracking-wider">Feature</div>
                <div className="text-xs font-bold text-white/30 uppercase tracking-wider text-center">Wix / Generic</div>
                <div className="text-xs font-bold text-[#E8B923] uppercase tracking-wider text-center">FlyNerd Tech</div>
              </div>
              {differentiators.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-6 py-4 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < differentiators.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                >
                  <div className="text-sm font-semibold text-white">{row.feature}</div>
                  <div className="text-sm text-white/30 text-center">{row.generic}</div>
                  <div className={`text-sm font-bold text-center ${row.highlight ? "text-[#E8B923]" : "text-[#10b981]"}`}>
                    {row.flynerd}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
