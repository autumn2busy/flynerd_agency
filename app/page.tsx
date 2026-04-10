import Link from "next/link";
import type { Metadata } from "next";
import SearchNiche from "@/components/home/SearchNiche";
import { ScrollReveal } from "@/components/home/ScrollReveal";
import PhoneChatWidget from "@/components/home/PhoneChatWidget";
import {
  Zap,
  MessageSquare,
  CalendarCheck,
  PhoneOff,
  TrendingUp,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Service Businesses",
  description:
    "FlyNerd Tech builds AI-powered websites for local service businesses — HVAC, plumbing, roofing, med spas, and more. Custom AI chatbot included. 24/7 lead capture.",
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
    icon: Zap,
    number: "01",
    title: "Your site goes live. Fast.",
    body: "We pull your real business data from Google, Yelp, and social profiles to build a fully personalized site — no templates, no lengthy back-and-forth.",
  },
  {
    icon: MessageSquare,
    number: "02",
    title: "Your AI agent answers every lead.",
    body: "Every visitor gets instant, personalized responses from an AI trained on your exact services, pricing, and availability. Around the clock. No extra staff.",
  },
  {
    icon: CalendarCheck,
    number: "03",
    title: "Jobs book while you're on-site.",
    body: "Leads are captured, qualified, and routed to your calendar automatically. No more missed calls. No more chasing. Revenue comes to you.",
  },
];

const PROCESS = [
  {
    day: "DAY 0",
    title: "Discovery + Data Scan",
    body: "We scan your Google Business profile, Yelp, social pages, and competitors. Zero work from you.",
  },
  {
    day: "DAY 1",
    title: "Custom Build",
    body: "Your AI-powered site is designed and built with your real reviews, services, and brand — not generic placeholder copy.",
  },
  {
    day: "DAY 2",
    title: "Live Demo Delivered",
    body: "You receive a live, functional demo URL. Review it. Request tweaks. Approve. We handle the rest.",
  },
  {
    day: "ONGOING",
    title: "AI Agent Works 24/7",
    body: "Your custom chatbot fields questions, qualifies leads, and books appointments — even at 2am on a Sunday.",
  },
];

const STATS = [
  { value: "20+", label: "businesses scouted per run" },
  { value: "Fast", label: "personalized build, no templates" },
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

        {/* ── Dark overlay so text always reads over video ── */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.75) 100%)" }}
          aria-hidden="true"
        />

        {/* ── Text content — centered, dominates viewport ── */}
        <div
          className="relative z-10 section-container flex flex-col justify-center items-center text-center min-h-screen pb-16 reveal visible"
          style={{ paddingTop: "80px" }}
        >
          <p
            className="text-xs uppercase tracking-[0.25em] mb-6 text-[var(--accent)]"
            style={monoStyle}
          >
            AI-Powered Websites · Local Service Businesses
          </p>

          <h1
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.92,
              marginBottom: "1.75rem",
              color: "var(--text-primary)",
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
            }}
          >
            <span className="block" style={{ fontFamily: "Array, sans-serif", fontWeight: 400 }}>
              We build the internet
            </span>
            <span className="block">
              <span style={{ fontFamily: "Array, sans-serif", fontWeight: 400 }}>for the</span>{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 600, color: "var(--accent)" }}>
                overlooked.
              </span>
            </span>
          </h1>

          <p
            className="text-xl lg:text-2xl mb-4 text-[var(--text-primary)]"
            style={{ maxWidth: "34ch", lineHeight: 1.4, textShadow: "0 1px 20px rgba(0,0,0,0.9)" }}
          >
            AI websites for HVAC, plumbing, roofing, med spas, and every local business losing leads after hours.
          </p>

          <p
            className="text-sm mb-10 text-[var(--text-secondary)]"
            style={monoStyle}
          >
            // Built for your niche. Leads captured 24/7.
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
          AFTER-HOURS REVENUE — The real problem
      ───────────────────────────────────────── */}
      <section className="py-24 lg:py-36 bg-black border-b border-white/5">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <p className="text-sm text-[var(--accent)] mb-5" style={monoStyle}>
                // the real problem
              </p>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                  lineHeight: 0.95,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                }}
              >
                Every call you miss after 5pm<br />
                <span style={{ color: "var(--accent)" }}>is money your competitor just pocketed.</span>
              </h2>
              <p
                className="text-lg text-[var(--text-secondary)] max-w-2xl mb-12"
                style={{ lineHeight: 1.7 }}
              >
                Wix, Squarespace, and GoDaddy give you a digital brochure. It looks decent. It does nothing. Your phone rings — nobody answers — the lead moves on. <strong className="text-white">That's not a website problem. That's a revenue problem.</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                {[
                  { icon: PhoneOff, stat: "62%", label: "of service calls go unanswered after 5pm", accent: false },
                  { icon: TrendingUp, stat: "$240–$800", label: "average revenue lost per missed inbound lead", accent: true },
                  { icon: Clock, stat: "24/7", label: "your FlyNerd AI agent is always on the clock", accent: false },
                ].map((item, i) => (
                  <div key={i} className={`p-10 border-r border-white/10 last:border-r-0 ${item.accent ? "bg-[var(--accent)]/5" : ""}`}>
                    <item.icon
                      size={28}
                      style={{ color: item.accent ? "var(--accent)" : "var(--text-muted)" }}
                      className="mb-6"
                    />
                    <div
                      className="font-bold leading-none mb-3"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        letterSpacing: "-0.04em",
                        color: item.accent ? "var(--accent)" : "var(--text-primary)",
                      }}
                    >
                      {item.stat}
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed" style={monoStyle}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          HOW IT WORKS — Client-facing outcomes
      ───────────────────────────────────────── */}
      <section className="py-32 bg-[#050505] border-y border-white/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <p
              className="text-sm text-[var(--text-muted)] mb-5"
              style={monoStyle}
            >
              // what you get
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
              From invisible to unforgettable.
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[var(--text-primary)]/10">
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 80} className="h-full">
                <div className="h-full border-r border-b border-[var(--text-primary)]/10 p-10 bg-transparent hover:bg-[var(--bg-elevated)] transition-colors duration-300 cursor-default group">
                  <div className="flex items-start justify-between mb-8">
                    <span
                      className="block font-bold opacity-15"
                      style={{ ...monoStyle, fontSize: "2.5rem" }}
                    >
                      {step.number}
                    </span>
                    <step.icon
                      size={32}
                      className="text-[var(--accent)] opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <h3
                    className="font-bold mb-4 text-[var(--text-primary)]"
                    style={{
                      fontSize: "1.15rem",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-[var(--text-secondary)]"
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
          PROCESS TIMELINE — How we execute
      ───────────────────────────────────────── */}
      <section className="py-32 bg-[var(--bg-base)] border-b border-white/10">
        <div className="section-container">
          <ScrollReveal>
            <p className="text-sm text-[var(--text-muted)] mb-5" style={monoStyle}>
              // process + communication
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                marginBottom: "4rem",
                maxWidth: "28ch",
                color: "var(--text-primary)",
              }}
            >
              Here&apos;s exactly what happens<br />
              <span style={{ color: "var(--accent)" }}>from day zero.</span>
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-[3.5rem] top-0 bottom-0 w-px hidden lg:block"
              style={{ background: "linear-gradient(to bottom, var(--accent), transparent)" }}
              aria-hidden="true"
            />

            <div className="space-y-0">
              {PROCESS.map((step, i) => (
                <ScrollReveal key={i} delay={i * 100}>
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12 py-10 border-b border-white/8 group">
                    {/* Day label */}
                    <div className="flex-shrink-0 lg:w-28 text-left">
                      <span
                        className="text-xs font-bold tracking-[0.2em] uppercase"
                        style={{ ...monoStyle, color: "var(--accent)" }}
                      >
                        {step.day}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] flex-shrink-0 mt-0.5 group-hover:bg-[var(--accent)] transition-colors duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:bg-black transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 max-w-xl">
                      <h3
                        className="font-bold mb-2 text-[var(--text-primary)]"
                        style={{ fontSize: "1.15rem", letterSpacing: "-0.02em" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DEMO SHOWCASE — Centered, copy above phone
      ───────────────────────────────────────── */}
      <section className="py-32 bg-black border-b border-[#222] relative">
        <div className="section-container relative z-10">
          <div className="flex flex-col items-center text-center">

            {/* Copy above phone */}
            <ScrollReveal className="max-w-2xl mb-12">
              <p
                className="text-sm mb-5"
                style={{ ...monoStyle, color: "rgba(242,237,228,0.35)" }}
              >
                // demo
              </p>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "var(--text-primary)",
                  marginBottom: "1.25rem",
                }}
              >
                Your demo. Live in minutes.
              </h2>
              <p
                className="text-lg mb-10 leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                We pull your real business data — reviews, services, location — and deploy a personalized site before you finish your coffee.
              </p>
              <div className="flex flex-wrap justify-center gap-0 border border-[var(--text-primary)]/10 rounded-lg overflow-hidden glass-panel-dark">
                <Link
                  href="/ai-website"
                  className="px-6 py-4 text-[var(--text-primary)] text-sm hover:bg-[var(--text-primary)] hover:text-[var(--bg-dark)] border-r border-[var(--text-primary)]/10 transition-colors"
                  style={monoStyle}
                >
                  See example demo
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-4 bg-[var(--accent)] text-black text-sm font-bold hover:opacity-80 transition-opacity"
                  style={monoStyle}
                >
                  Run your pipeline
                </Link>
              </div>
            </ScrollReveal>

            {/* Phone — centered, dominant */}
            <ScrollReveal delay={100} className="flex justify-center">
              <PhoneChatWidget />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          AI CHATWIDGET FEATURE — Every site ships with one
      ───────────────────────────────────────── */}
      <section className="py-32 bg-[#050505] border-b border-white/10">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <p className="text-sm text-[var(--text-muted)] mb-5" style={monoStyle}>
                // included with every site
              </p>
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  color: "var(--text-primary)",
                  marginBottom: "1.5rem",
                  maxWidth: "28ch",
                }}
              >
                Every FlyNerd site ships with a custom AI chatbot —<br />
                <span style={{ color: "var(--accent)" }}>trained on your specific business.</span>
              </h2>
              <p
                className="text-base text-[var(--text-secondary)] max-w-2xl mb-16 leading-relaxed"
              >
                Not a generic chatbot. Not a FAQ widget. A fully personalized AI agent that knows your pricing, services, service area, and team — and speaks to your customers like a knowledgeable employee would.
              </p>

              {/* Two example chat snippets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Example 1: HVAC */}
                <div className="border border-white/10 bg-[#0A0A0A] rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-white" style={monoStyle}>Martinez HVAC · AI Agent</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-[#e8e8e8] text-black px-3 py-2 rounded-[14px] rounded-br-[4px] text-xs max-w-[80%]">
                        Do you offer same-day AC repair in Phoenix?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#1C1C1E] text-gray-100 border border-white/5 px-3 py-2 rounded-[14px] rounded-tl-[4px] text-xs max-w-[85%] leading-relaxed">
                        Yes! Martinez HVAC offers same-day AC repair across Phoenix, Scottsdale, and Tempe. Our techs are available 7 days a week — want me to check availability for today?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#e8e8e8] text-black px-3 py-2 rounded-[14px] rounded-br-[4px] text-xs max-w-[80%]">
                        Yes please, this afternoon
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#1C1C1E] text-gray-100 border border-white/5 px-3 py-2 rounded-[14px] rounded-tl-[4px] text-xs max-w-[85%] leading-relaxed">
                        I've got a 2pm and 4pm slot available. What's your address and best number to confirm?
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example 2: MedSpa */}
                <div className="border border-white/10 bg-[#0A0A0A] rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-white" style={monoStyle}>Glow MedSpa · AI Agent</span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex justify-end">
                      <div className="bg-[#e8e8e8] text-black px-3 py-2 rounded-[14px] rounded-br-[4px] text-xs max-w-[80%]">
                        How much does Botox cost at your location?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#1C1C1E] text-gray-100 border border-white/5 px-3 py-2 rounded-[14px] rounded-tl-[4px] text-xs max-w-[85%] leading-relaxed">
                        At Glow MedSpa, Botox starts at $12/unit with a typical treatment using 20–40 units. We also offer a first-visit discount for new clients. Want to book a free consultation?
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#e8e8e8] text-black px-3 py-2 rounded-[14px] rounded-br-[4px] text-xs max-w-[80%]">
                        Yes, what times do you have this week?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-[#1C1C1E] text-gray-100 border border-white/5 px-3 py-2 rounded-[14px] rounded-tl-[4px] text-xs max-w-[85%] leading-relaxed">
                        Tuesday at 11am or Thursday at 3pm are open. I can book you now — what's your name and email?
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p
                className="text-center text-xs text-[var(--text-muted)] mt-6"
                style={monoStyle}
              >
                // responses are trained on YOUR business data — not generic templates
              </p>
            </div>
          </ScrollReveal>
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
                  className="px-8 py-4 text-sm font-bold text-black accent-glow"
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
