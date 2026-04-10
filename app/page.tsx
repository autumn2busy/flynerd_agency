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
          HERO — full viewport, media behind text
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen overflow-hidden bg-[var(--bg-base)]">

        {/* ── Background media slot ── */}
        <div className="hero-media">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Gradient: solid cream left (text zone) → transparent right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, var(--bg-base) 28%, rgba(242,237,228,0.75) 55%, rgba(242,237,228,0.05) 100%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ── Text content — left-aligned, dominates viewport ── */}
        <div
          className="relative z-10 section-container flex flex-col justify-end min-h-screen pb-16"
          style={{ paddingTop: "140px" }}
        >
          <h1
            style={{
              fontSize: "clamp(4rem, 13vw, 160px)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            <span className="block">We build the internet</span>
            <span className="block">
              for the{" "}
              <span style={{ color: "var(--accent)" }}>overlooked.</span>
            </span>
          </h1>

          <p
            className="text-base mb-10 text-[var(--text-secondary)]"
            style={monoStyle}
          >
            // AI-powered websites for local service businesses.
          </p>

          <div className="max-w-xl">
            <SearchNiche />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TICKER STRIP
      ───────────────────────────────────────── */}
      <div
        className="overflow-hidden bg-[var(--bg-dark)] py-4 border-y border-[var(--bg-dark)]"
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
              <span style={{ color: "var(--accent)", opacity: 0.5, margin: "0 4px" }}>
                ·
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────
          HOW IT WORKS
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-base)] border-b border-[var(--text-primary)]">
        <div className="section-container">
          <ScrollReveal>
            <p
              className="text-sm text-[var(--text-muted)] mb-5"
              style={monoStyle}
            >
              // process
            </p>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
                marginBottom: "4rem",
                maxWidth: "24ch",
                color: "var(--text-primary)",
              }}
            >
              From invisible to unforgettable in 48 hours.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[var(--text-primary)]">
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                {/* No transition-* class — hover snaps instantly (brutalist) */}
                <div
                  className="border-r border-b border-[var(--text-primary)] p-10 bg-[var(--bg-base)] text-[var(--text-primary)] hover:bg-[var(--bg-dark)] hover:text-[var(--text-inverse)] cursor-default h-full"
                >
                  <span
                    className="block font-bold mb-8 opacity-20"
                    style={{ ...monoStyle, fontSize: "3.5rem" }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="font-bold mb-4"
                    style={{
                      fontSize: "1.1rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed opacity-65"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
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
      <section className="py-24 lg:py-32 bg-[var(--bg-dark)] border-b border-[var(--text-inverse)]/10">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">

            {/* Left: copy */}
            <ScrollReveal className="flex-1">
              <p
                className="text-sm mb-5"
                style={{ ...monoStyle, color: "rgba(242,237,228,0.35)" }}
              >
                // demo
              </p>
              <h2
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                  color: "var(--text-inverse)",
                  marginBottom: "1.5rem",
                  maxWidth: "18ch",
                }}
              >
                Your demo. Live in minutes.
              </h2>
              <p
                className="text-base mb-10 max-w-md leading-relaxed"
                style={{ color: "rgba(242,237,228,0.55)" }}
              >
                We pull your real business data — reviews, services, location —
                and deploy a personalized site before you finish your coffee.
              </p>
              <div className="flex flex-wrap gap-0 border border-[var(--text-inverse)]">
                {/* No transition — instant hover snap */}
                <Link
                  href="/ai-website"
                  className="px-6 py-3 text-[var(--text-inverse)] text-sm hover:bg-[var(--text-inverse)] hover:text-[var(--bg-dark)] border-r border-[var(--text-inverse)]"
                  style={monoStyle}
                >
                  See example demo
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-[var(--accent)] text-[var(--text-inverse)] text-sm hover:opacity-80"
                  style={monoStyle}
                >
                  Run your pipeline
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: brutalist phone mockup — sharp corners, stark border */}
            <ScrollReveal delay={120}>
              <div
                style={{
                  width: "260px",
                  height: "520px",
                  border: "2px solid var(--text-inverse)",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--bg-base)",
                  flexShrink: 0,
                }}
              >
                {/* Notch — square */}
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "72px",
                    height: "20px",
                    background: "var(--bg-dark)",
                    zIndex: 2,
                  }}
                  aria-hidden="true"
                />

                {/* Demo site skeleton */}
                <div className="pt-10 px-5 pb-5">
                  <div
                    className="h-1 w-10 mb-5"
                    style={{ background: "var(--accent)" }}
                  />
                  <div
                    className="h-7 mb-2"
                    style={{ background: "var(--bg-dark)", width: "80%" }}
                  />
                  <div
                    className="h-3 mb-1"
                    style={{ background: "rgba(13,13,13,0.12)", width: "65%" }}
                  />
                  <div
                    className="h-3 mb-7"
                    style={{ background: "rgba(13,13,13,0.08)", width: "45%" }}
                  />
                  <div
                    className="h-10 flex items-center justify-center mb-6 border border-[var(--bg-dark)]"
                    style={{ background: "var(--bg-dark)" }}
                  >
                    <span
                      className="text-[var(--text-inverse)] text-xs"
                      style={monoStyle}
                    >
                      Book Now →
                    </span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="w-3 h-3"
                        style={{ background: "var(--accent)" }}
                      />
                    ))}
                  </div>
                  <div
                    className="h-3 mb-1"
                    style={{ background: "rgba(13,13,13,0.1)", width: "70%" }}
                  />
                  <div
                    className="h-3 mb-6"
                    style={{ background: "rgba(13,13,13,0.07)", width: "55%" }}
                  />
                  <div
                    className="h-px mb-5"
                    style={{ background: "rgba(13,13,13,0.12)" }}
                  />
                  <div
                    className="h-3 mb-1"
                    style={{ background: "rgba(13,13,13,0.08)", width: "80%" }}
                  />
                  <div
                    className="h-3"
                    style={{ background: "rgba(13,13,13,0.06)", width: "60%" }}
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          STATS STRIP
      ───────────────────────────────────────── */}
      <section className="bg-[var(--bg-base)] border-b border-[var(--text-primary)]">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--text-primary)]">
            {STATS.map((stat, i) => (
              <ScrollReveal
                key={i}
                delay={i * 80}
                className="px-8 py-16 md:py-20 text-center"
              >
                <div
                  className="font-bold leading-none mb-3 text-[var(--text-primary)]"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
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
      <section className="py-24 lg:py-36 bg-[var(--bg-dark)]">
        <div className="section-container">
          <ScrollReveal>
            <h2
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.88,
                color: "var(--text-inverse)",
                marginBottom: "2.5rem",
                maxWidth: "18ch",
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
          <div
            className="mt-20 pt-8 flex flex-wrap gap-x-8 gap-y-3"
            style={{ borderTop: "1px solid rgba(242,237,228,0.08)" }}
          >
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
                className="text-xs hover:text-[var(--text-inverse)]"
                style={{ ...monoStyle, color: "rgba(242,237,228,0.35)" }}
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
