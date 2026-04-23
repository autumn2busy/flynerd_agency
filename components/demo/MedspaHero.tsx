"use client";

import { MoveRight } from "lucide-react";

interface Props {
  businessName: string;
  heroHook: string;
  primaryColor: string;
  walkthroughVideoUrl: string | null;
  /**
   * Optional hero image URL. When absent, the component renders only the
   * gradient fallback so there is no broken-image flash.
   */
  heroImageUrl?: string | null;
  onPrimaryClick: () => void;
  onSecondaryClick: () => void;
}

/**
 * Profile 2 medspa hero. Light cream background, split 60/40 layout,
 * right column carries the hero image (or gradient fallback when the
 * default image file is absent from /public).
 * See docs/medspa-demo-template-spec.md Section A.
 */
export default function MedspaHero({
  businessName,
  heroHook,
  primaryColor,
  walkthroughVideoUrl,
  heroImageUrl,
  onPrimaryClick,
  onSecondaryClick,
}: Props) {
  return (
    <section className="pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-10 max-w-[1200px] mx-auto">
      <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-center">
        {/* Copy column — 60% on desktop */}
        <div className="md:col-span-3 space-y-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium"
            style={{
              backgroundColor: `${primaryColor}14`,
              color: primaryColor,
              border: `1px solid ${primaryColor}33`,
            }}
          >
            Preview built for {businessName}
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.08] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            {heroHook}
          </h1>

          <p className="text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "#555555" }}>
            Meet the AI receptionist we built for {businessName}. Ready to book consultations, answer treatment questions, and handle every after-hours inquiry around the clock.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={onPrimaryClick}
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full text-sm text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: primaryColor }}
            >
              Try the AI Booking Assistant <MoveRight size={16} />
            </button>
            <button
              onClick={onSecondaryClick}
              className="text-sm underline underline-offset-4"
              style={{ color: "#555555" }}
            >
              Explore Treatments ↓
            </button>
          </div>
        </div>

        {/* Image column — 40% on desktop */}
        <div className="md:col-span-2 relative">
          <div
            className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}22 0%, #FAF9F6 60%, ${primaryColor}14 100%)`,
              border: "1px solid #E8E5DF",
            }}
          >
            {heroImageUrl && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={heroImageUrl}
                alt="Medspa treatment room"
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Subtle overlay to soften either image or gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, transparent 60%, rgba(250,249,246,0.3) 100%)",
              }}
            />

            {/* Walkthrough video card (bottom-left floating) — only if video exists.
                 Uses controls (not autoplay-muted) so the prospect can actually
                 hear the personalized pitch. Sized to be a real video, not a
                 decorative thumbnail. */}
            {walkthroughVideoUrl && (
              <div
                className="absolute bottom-4 left-4 w-64 md:w-80 rounded-xl overflow-hidden shadow-2xl border bg-black"
                style={{ borderColor: "rgba(255,255,255,0.6)" }}
              >
                {walkthroughVideoUrl.includes(".mp4") ? (
                  <video
                    src={walkthroughVideoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto"
                  />
                ) : (
                  <iframe
                    src={walkthroughVideoUrl.replace("/share/", "/embed/")}
                    className="w-full aspect-video border-0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
