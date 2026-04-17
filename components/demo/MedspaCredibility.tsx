"use client";

import { useEffect, useRef } from "react";
import type { BookingPlatform } from "./medspaDefaults";
import { CREDIBILITY_COPY, PLATFORM_LABEL } from "./medspaDefaults";

interface Props {
  platform: BookingPlatform;
  primaryColor: string;
  onViewed: (platform: BookingPlatform) => void;
}

/**
 * Section D: platform-aware credibility block. Copy swaps per detected booking
 * platform. Logo strip highlights the detected one. No AC mention anywhere.
 * See docs/medspa-demo-template-spec.md Section D.
 */
export default function MedspaCredibility({ platform, primaryColor, onViewed }: Props) {
  const copy = CREDIBILITY_COPY[platform];
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !firedRef.current) {
            firedRef.current = true;
            onViewed(platform);
          }
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [platform, onViewed]);

  const visiblePlatforms: BookingPlatform[] = [
    "mindbody",
    "boulevard",
    "vagaro",
    "aesthetic-record",
    "zenoti",
  ];

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p
            className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: primaryColor }}
          >
            Built with your stack in mind
          </p>
          <h2
            className="text-3xl md:text-4xl leading-[1.1] tracking-tight mb-5"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            {copy.headline}
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "#555555" }}>
            {copy.body}
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
          {visiblePlatforms.map((p) => {
            const highlighted = p === platform;
            return (
              <div
                key={p}
                className="rounded-xl p-4 flex items-center justify-center text-center text-xs font-semibold transition-all"
                style={{
                  border: highlighted
                    ? `1.5px solid ${primaryColor}`
                    : "1px solid #E8E5DF",
                  backgroundColor: highlighted ? `${primaryColor}10` : "#FAF9F6",
                  color: highlighted ? primaryColor : "#555555",
                  minHeight: "72px",
                }}
              >
                {PLATFORM_LABEL[p]}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
