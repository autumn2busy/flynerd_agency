import Link from "next/link";
import type { Metadata } from "next";
import SearchNiche from "@/components/home/SearchNiche";
import { ScrollReveal } from "@/components/home/ScrollReveal";
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

            {/* Right: Actual High-Fidelity Phone Mockup */}
            <ScrollReveal delay={120}>
              <div
                className="relative overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                style={{
                  width: "280px",
                  height: "580px",
                  border: "8px solid #222",
                  borderRadius: "44px",
                  boxShadow: "inset 0 0 0 1px #444, 0 30px 60px -12px rgba(0,0,0,1)",
                  background: "#0A0A0A",
                  flexShrink: 0,
                }}
              >
                {/* Dynamic Island / Notch */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20 shadow-inner"
                  aria-hidden="true"
                />

                {/* Header inside screen */}
                <div className="pt-12 pb-4 px-6 border-b border-white/5 bg-[#000] text-gray-100 relative z-10 flex flex-col items-center">
                  <span className="text-sm font-bold font-sans">FlyNerd AI</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] text-[var(--accent)] font-semibold uppercase tracking-[0.2em]">Agent Online</span>
                  </div>
                </div>

                {/* Demo screen content */}
                <div className="flex-1 p-4 space-y-4 bg-gradient-to-b from-[#0A0A0A] to-[#121212] overflow-hidden">
                  {/* Fake chat bubble 1 */}
                  <div className="flex justify-start">
                    <div className="max-w-[90%] px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm bg-[#1C1C1E] text-gray-100 rounded-[20px] rounded-tl-[4px] border border-white/5">
                      Tell me your niche, and I will build you an entire demo system right now.
                    </div>
                  </div>
                  {/* Fake chat bubble 2 */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm bg-[#e8e8e8] text-black rounded-[20px] rounded-br-[4px]">
                      Roofing business in Austin, TX
                    </div>
                  </div>
                  {/* Fake chat bubble 3 */}
                  <div className="flex justify-start">
                    <div className="max-w-[95%] px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm bg-[#1C1C1E] text-gray-100 rounded-[20px] rounded-tl-[4px] border border-white/5">
                      Great. Extracting local data...<br />
                      <div className="mt-3 space-y-1.5">
                        <span className="text-gray-400 font-mono text-[10px] block">✓ Found 146 reviews</span>
                        <span className="text-gray-400 font-mono text-[10px] block">✓ Generating copy</span>
                        <span className="text-[var(--accent)] font-mono font-bold text-[10px] mt-2 block animate-pulse">DEPLOYING PREVIEW...</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Bar (Home Indicator) mask */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/30 rounded-full"></div>
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
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 700,
                letterSpacing: "-0.05em",
                lineHeight: 1.0,
                color: "var(--text-primary)",
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
