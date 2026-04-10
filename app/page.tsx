import Link from "next/link";
import type { Metadata } from "next";
import SearchNiche from "@/components/home/SearchNiche";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import PhoneChatWidget from "@/components/home/PhoneChatWidget";
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
            style={{ mixBlendMode: "screen" }}
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ── Text content — centered, dominates viewport ── */}
        <div
          className="relative z-10 section-container flex flex-col justify-center items-center text-center min-h-screen pb-16 reveal visible"
          style={{ paddingTop: "80px" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            <span className="block" style={{ fontFamily: "Array, sans-serif", fontWeight: 400 }}>We build the internet</span>
            <span className="block">
              <span style={{ fontFamily: "Array, sans-serif", fontWeight: 400 }}>for the</span> <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 600 }}>overlooked.</span>
            </span>
          </h1>

          <p
            className="text-lg lg:text-xl mb-10 text-[var(--text-secondary)]"
            style={monoStyle}
          >
            // AI-powered websites for local service businesses.
          </p>

          <div className="w-full max-w-xl mx-auto">
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
              className="px-6 text-sm text-[var(--text-primary)] whitespace-nowrap"
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
      <section className="py-32 bg-[#050505] border-y border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <p
              className="text-sm text-[var(--text-muted)] mb-5"
              style={monoStyle}
            >
              // process
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginBottom: "4rem",
                maxWidth: "24ch",
                color: "var(--text-primary)",
              }}
            >
              From invisible to unforgettable in 48 hours.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[var(--text-primary)]/10">
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80} className="h-full">
                <div className="h-full border-r border-b border-[var(--text-primary)]/10 p-10 bg-transparent hover:bg-[var(--bg-dark)] hover:text-[var(--text-inverse)] cursor-default">
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
      <section className="py-32 bg-black border-b border-[#222] relative">
        <div className="section-container relative z-10">
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
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                  maxWidth: "18ch",
                }}
              >
                Your demo. Live in minutes.
              </h2>
              <p
                className="text-base mb-10 max-w-md leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                We pull your real business data — reviews, services, location —
                and deploy a personalized site before you finish your coffee.
              </p>
              <div className="flex flex-wrap gap-0 border border-[var(--text-primary)]/10 rounded-lg overflow-hidden glass-panel-dark">
                <Link
                  href="/ai-website"
                  className="px-6 py-4 text-[var(--text-primary)] text-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg-dark)] border-r border-[var(--text-primary)]/10 transition-colors"
                  style={monoStyle}
                >
                  See example demo
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-4 bg-[var(--accent)] text-[#fff] text-sm font-semibold hover:opacity-80 transition-opacity"
                  style={monoStyle}
                >
                  Run your pipeline
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: Interactive phone chat widget */}
            <ScrollReveal delay={120}>
              <PhoneChatWidget />
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
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: 700,
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
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h2
                style={{
                  fontFamily: "Array, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                }}
              >
                Stop losing leads<br />
                <span style={{ color: "var(--accent)" }}>after hours.</span>
              </h2>
              <p
                className="text-base mb-10 max-w-xl mx-auto"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                Every unanswered call is money your competitor just pocketed. Let's fix that.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/apply?package=build"
                  className="px-8 py-4 text-sm font-bold text-black"
                  style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
                >
                  Get My AI Website →
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 text-sm border border-[var(--text-primary)]/30 text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Book Strategy Call
                </Link>
              </div>
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
                className="text-xs hover:text-[#fff]"
                style={{ ...monoStyle, color: "var(--text-secondary)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
