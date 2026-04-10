import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import SearchNiche from "@/components/home/SearchNiche";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import HomeChatWidget from "@/components/home/HomeChatWidget";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
  description:
    "We build the internet for the overlooked. FlyNerd Tech builds AI-powered websites for local service businesses in 48 hours.",
};

const NICHES = [
  "HVAC",
  "PLUMBING",
  "BARBERSHOP",
  "MEDSPA",
  "ROOFING",
  "ELECTRICIAN",
  "WEIGHT LOSS",
  "PEST CONTROL",
];

const STEPS = [
  {
    number: "01",
    title: "Simon finds weak-presence businesses.",
    body: "Our scout agent scans local search results, Google Business profiles, and competitor gaps to surface businesses that need us most.",
  },
  {
    number: "02",
    title: "Yoncé scores the opportunity.",
    body: "Each prospect gets an opportunity score based on search volume, online presence grade, and revenue potential. Only the best make the cut.",
  },
  {
    number: "03",
    title: "Dre builds and deploys the demo.",
    body: "A fully functional, personalized demo site goes live within 48 hours — pulling real data from Yelp, Google, and social profiles.",
  },
];

const STATS = [
  { value: "20+", label: "businesses scouted per run" },
  { value: "48hr", label: "average build time" },
  { value: "7 day", label: "demo window" },
];

const monoStyle = { fontFamily: "var(--font-mono)" } as const;

export default function HomePage() {
  return (
    <div className="bg-[var(--bg-base)]">

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section className="min-h-screen flex items-center pt-24 pb-16">
        <div className="section-container w-full">
          <div className="flex items-center justify-between gap-12 lg:gap-20">

            {/* Left: headline + mono subtitle + search */}
            <div className="flex-1 min-w-0">
              <h1
                className="font-bold leading-[0.93] tracking-tight mb-6"
                style={{ fontSize: "clamp(3rem, 9vw, 118px)", fontWeight: 800 }}
              >
                <span className="block text-[var(--text-primary)]">
                  We build the internet
                </span>
                <span className="block text-[var(--text-primary)]">
                  for the{" "}
                  <span style={{ color: "var(--accent)" }}>overlooked.</span>
                </span>
              </h1>

              <p
                className="text-base text-[var(--text-secondary)] mb-10"
                style={monoStyle}
              >
                // AI-powered websites for local service businesses.
              </p>

              <div className="max-w-xl">
                <SearchNiche />
              </div>
            </div>

            {/* Right: lightbulb — floats + flickers */}
            <div
              className="hidden lg:block shrink-0"
              style={{ animation: "hero-float 5s ease-in-out infinite" }}
            >
              <Image
                src="/hero-lightbulb.jpg"
                alt="FlyNerd — light up your business"
                width={460}
                height={460}
                priority
                className="object-contain"
                style={{ animation: "bulb-flicker 2.8s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TICKER STRIP
      ───────────────────────────────────────── */}
      <div
        className="overflow-hidden bg-[var(--bg-dark)] py-4"
        aria-hidden="true"
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "ticker-scroll 30s linear infinite",
          }}
        >
          {[...NICHES, ...NICHES].map((niche, i) => (
            <span
              key={i}
              className="px-6 text-sm text-[var(--text-inverse)] whitespace-nowrap"
              style={monoStyle}
            >
              {niche}{" "}
              <span className="opacity-40 mx-1" style={{ color: "var(--accent)" }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          HOW IT WORKS
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-base)]">
        <div className="section-container">
          <ScrollReveal>
            <p
              className="text-sm text-[var(--text-muted)] mb-4"
              style={monoStyle}
            >
              // process
            </p>
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-primary)] mb-16 max-w-2xl"
            >
              From invisible to unforgettable in 48 hours.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-[var(--text-primary)]">
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                {/* No transition-* class = instant color swap on hover */}
                <div
                  className="border-r border-b border-[var(--text-primary)] p-10 bg-[var(--bg-base)] text-[var(--text-primary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-inverse)] cursor-default"
                >
                  <span
                    className="block font-bold mb-6 opacity-25"
                    style={{ ...monoStyle, fontSize: "3rem" }}
                  >
                    {step.number}
                  </span>
                  <h3 className="text-lg font-bold mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-70">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DEMO SHOWCASE
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-dark)]">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left: copy */}
            <ScrollReveal className="flex-1">
              <p
                className="text-sm text-[var(--text-inverse)]/40 mb-4"
                style={monoStyle}
              >
                // demo
              </p>
              <h2
                className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-[var(--text-inverse)] mb-6 max-w-lg"
              >
                Your demo. Live in minutes.
              </h2>
              <p
                className="text-base text-[var(--text-inverse)]/60 mb-10 max-w-md leading-relaxed"
              >
                We pull your real business data — reviews, services, location —
                and deploy a personalized site before you finish your coffee.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/ai-website"
                  className="px-6 py-3 border border-[var(--text-inverse)] text-[var(--text-inverse)] text-sm hover:bg-[var(--text-inverse)] hover:text-[var(--bg-dark)] transition-colors"
                  style={monoStyle}
                >
                  See example demo
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[var(--accent)] text-[var(--text-inverse)] text-sm hover:opacity-90 transition-opacity"
                  style={monoStyle}
                >
                  Run your pipeline
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: CSS phone mockup */}
            <ScrollReveal delay={150}>
              <div
                style={{ animation: "hero-float 5s ease-in-out infinite" }}
              >
                {/* Phone frame */}
                <div
                  style={{
                    width: "280px",
                    height: "540px",
                    border: "3px solid var(--text-inverse)",
                    borderRadius: "44px",
                    position: "relative",
                    overflow: "hidden",
                    background: "var(--bg-base)",
                  }}
                >
                  {/* Notch */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80px",
                      height: "24px",
                      background: "#0D0D0D",
                      borderRadius: "12px",
                      zIndex: 2,
                    }}
                    aria-hidden="true"
                  />

                  {/* Fake demo site content */}
                  <div className="pt-16 px-5 pb-5">
                    {/* Accent bar */}
                    <div
                      className="h-1 w-12 mb-4 rounded-sm"
                      style={{ background: "var(--accent)" }}
                    />
                    {/* Business name */}
                    <div
                      className="h-7 rounded-sm mb-2"
                      style={{ background: "var(--bg-dark)", width: "80%" }}
                    />
                    {/* Subtitle */}
                    <div
                      className="h-3 rounded-sm mb-1"
                      style={{ background: "rgba(13,13,13,0.12)", width: "65%" }}
                    />
                    <div
                      className="h-3 rounded-sm mb-6"
                      style={{ background: "rgba(13,13,13,0.08)", width: "45%" }}
                    />
                    {/* CTA button */}
                    <div
                      className="h-10 rounded-sm flex items-center justify-center mb-5"
                      style={{ background: "var(--bg-dark)" }}
                    >
                      <span
                        className="text-[var(--text-inverse)] text-xs"
                        style={monoStyle}
                      >
                        Book Now →
                      </span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-sm"
                          style={{ background: "var(--accent)" }}
                        />
                      ))}
                    </div>
                    <div
                      className="h-3 rounded-sm mb-1"
                      style={{ background: "rgba(13,13,13,0.1)", width: "70%" }}
                    />
                    <div
                      className="h-3 rounded-sm"
                      style={{ background: "rgba(13,13,13,0.07)", width: "55%" }}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          STATS STRIP
      ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-[var(--bg-base)] border-b border-[var(--text-primary)]">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--text-primary)]">
            {STATS.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 80} className="px-8 py-8 md:py-0 text-center first:pl-0 last:pr-0">
                <div
                  className="font-bold leading-none mb-3 text-[var(--text-primary)]"
                  style={{
                    fontSize: "clamp(3rem, 7vw, 5.5rem)",
                    fontWeight: 800,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest text-[var(--text-muted)]"
                  style={monoStyle}
                >
                  {stat.label}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOOTER CTA
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-dark)]">
        <div className="section-container">
          <ScrollReveal>
            <h2
              className="font-bold text-[var(--text-inverse)] mb-10 max-w-3xl"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                fontWeight: 800,
                lineHeight: 0.95,
              }}
            >
              Ready to{" "}
              <span style={{ color: "var(--accent)" }}>dominate</span>
              <br />
              your market?
            </h2>
            <div className="max-w-xl">
              <SearchNiche />
            </div>
          </ScrollReveal>

          {/* Footer nav */}
          <div className="mt-20 pt-8 border-t border-[var(--text-inverse)]/10 flex flex-wrap gap-x-8 gap-y-3">
            {[
              { href: "/ai-website", label: "AI Websites" },
              { href: "/pricing", label: "Pricing" },
              { href: "/work", label: "Work" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Nerd News" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--text-inverse)]/40 hover:text-[var(--text-inverse)]/80 transition-colors"
                style={monoStyle}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Chat widget */}
      <HomeChatWidget />
    </div>
  );
}
