"use client";

import { Star } from "lucide-react";
import type { NicheBullet } from "./nicheConfig";
import { getNicheColors } from "./nicheConfig";

interface Props {
  businessName: string;
  niche: string;
  nicheBullets: NicheBullet[];
  painPoints: string[];
  rating: number;
  reviewCount: number;
  rawServices?: string;
  tagline?: string | null;
  serviceCards?: NicheBullet[] | null;
  bookCtaHref: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function SitePreview({
  businessName,
  niche,
  nicheBullets,
  painPoints,
  rating,
  reviewCount,
  rawServices,
  tagline,
  serviceCards,
  bookCtaHref,
}: Props) {
  const colors = getNicheColors(niche);

  const services = serviceCards && serviceCards.length > 0
    ? serviceCards.slice(0, 3)
    : nicheBullets.slice(0, 3);

  const heroTagline = tagline
    || (rawServices
      ? `${rawServices.split(/[,\n]/)[0].trim()} and more, delivered right.`
      : painPoints[0]
      ? `No more ${painPoints[0].toLowerCase()}. Just results.`
      : `Built for ${niche} businesses that are serious about growth.`);

  const bookLabel =
    niche.toLowerCase().includes("cleaning") ||
    niche.toLowerCase().includes("hvac") ||
    niche.toLowerCase().includes("plumb") ||
    niche.toLowerCase().includes("roofing") ||
    niche.toLowerCase().includes("landscap")
      ? "Get a Free Estimate"
      : "Book a Consultation";

  const fakeHost = businessName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com";
  const businessInitials = initials(businessName);

  return (
    <section className="py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">
          A preview of your new site
        </h2>
        <p className="text-center text-neutral-400 mb-10">
          Built from your actual business. Your real site would be fully custom.
        </p>

        {/* Browser chrome wrapper */}
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Chrome bar */}
          <div className="bg-[#1c1c1e] border-b border-white/10 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-[#2c2c2e] rounded-md px-3 py-1.5 text-xs text-neutral-500 font-mono text-center truncate">
              {fakeHost}
            </div>
          </div>

          {/* Simulated website — light theme */}
          <div className="bg-white text-neutral-900 font-sans">
            {/* Site header */}
            <header
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ borderColor: `${colors.accent}44` }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black text-white"
                  style={{ background: colors.primary }}
                >
                  {businessInitials}
                </span>
                <span
                  className="font-black text-sm tracking-tight hidden sm:inline"
                  style={{ color: colors.primary }}
                >
                  {businessName.toUpperCase()}
                </span>
              </div>
              <nav className="hidden md:flex gap-6 text-xs text-neutral-500 font-medium">
                <span>Services</span>
                <span>About</span>
                <span>Reviews</span>
                <span>Contact</span>
              </nav>
              <button
                className="text-xs font-bold px-4 py-2 rounded-full text-white"
                style={{ background: colors.primary }}
              >
                Book Now
              </button>
            </header>

            {/* Hero with gradient mesh + decorative shapes */}
            <div
              className="relative px-6 py-16 md:py-24 text-center overflow-hidden"
              style={{ background: colors.bg }}
            >
              {/* Gradient mesh backdrop */}
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  background: `
                    radial-gradient(at 18% 22%, ${colors.primary}33 0%, transparent 55%),
                    radial-gradient(at 82% 30%, ${colors.accent}55 0%, transparent 55%),
                    radial-gradient(at 50% 85%, ${colors.primary}22 0%, transparent 60%)
                  `,
                }}
                aria-hidden
              />
              {/* Decorative blurred orb — top right */}
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-25 blur-3xl"
                style={{ background: colors.primary }}
                aria-hidden
              />
              {/* Decorative blurred orb — bottom left */}
              <div
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-20 blur-3xl"
                style={{ background: colors.accent }}
                aria-hidden
              />

              <div className="relative z-10">
                {/* Initials badge — stands in for a hero logo/image */}
                <div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 text-2xl font-black text-white shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}dd 100%)`,
                    boxShadow: `0 10px 40px -10px ${colors.primary}66`,
                  }}
                >
                  {businessInitials}
                </div>

                <h1
                  className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight"
                  style={{ color: colors.text }}
                >
                  {businessName}
                </h1>
                <p className="text-sm md:text-lg text-neutral-600 mb-7 max-w-xl mx-auto leading-relaxed">
                  {heroTagline}
                </p>

                {rating > 0 && (
                  <div className="flex items-center justify-center gap-1.5 mb-7">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(rating) ? colors.primary : "transparent"}
                        stroke={colors.primary}
                      />
                    ))}
                    <span className="text-xs text-neutral-500 ml-1">
                      {rating.toFixed(1)}{reviewCount > 0 ? ` · ${reviewCount} reviews` : ""}
                    </span>
                  </div>
                )}

                <button
                  className="text-sm font-bold px-7 py-3.5 rounded-full text-white shadow-xl"
                  style={{
                    background: colors.primary,
                    boxShadow: `0 8px 24px -6px ${colors.primary}80`,
                  }}
                >
                  {bookLabel}
                </button>
              </div>
            </div>

            {/* Services grid */}
            <div
              className="px-6 py-12 border-t"
              style={{ borderColor: `${colors.accent}33` }}
            >
              <h2
                className="text-xs font-bold text-center mb-8 uppercase tracking-[0.2em]"
                style={{ color: colors.primary }}
              >
                What We Do
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {services.map((card, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border text-left relative overflow-hidden"
                    style={{
                      borderColor: `${colors.primary}22`,
                      background: colors.bg,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white mb-3"
                      style={{ background: colors.primary }}
                    >
                      {i + 1}
                    </div>
                    <p
                      className="text-sm font-bold mb-2"
                      style={{ color: colors.text }}
                    >
                      {card.title}
                    </p>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial strip */}
            <div
              className="px-6 py-10 text-center border-t relative overflow-hidden"
              style={{
                background: `${colors.primary}0d`,
                borderColor: `${colors.accent}33`,
              }}
            >
              <div className="text-4xl leading-none mb-3 opacity-40" style={{ color: colors.primary }}>
                &ldquo;
              </div>
              <p className="text-sm italic text-neutral-600 max-w-md mx-auto mb-3 leading-relaxed">
                {`Best experience I've had. Booked same day and they showed up on time. Highly recommend ${businessName}.`}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.primary }}>
                Verified Customer
              </p>
            </div>

            {/* Sticky CTA bar */}
            <div
              className="px-6 py-5 flex items-center justify-between border-t bg-white gap-4"
              style={{ borderColor: `${colors.accent}33` }}
            >
              <div>
                <p className="text-xs font-black text-neutral-800">Ready to go live?</p>
                <p className="text-xs text-neutral-400">Full custom site delivered in 7 days.</p>
              </div>
              <a
                href={bookCtaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold px-5 py-2.5 rounded-full text-white whitespace-nowrap"
                style={{ background: colors.primary }}
              >
                Book Your Build
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
