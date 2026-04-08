import SearchNiche from "@/components/home/SearchNiche";
import ChatScenario from "@/components/home/ChatScenario";
import { Cpu, Globe, Clock, BarChart3, Zap, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
  description:
    "FlyNerd Tech builds AI-powered websites that work as digital employees. Search your niche to see how we automate your business today.",
};

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[var(--bg-base)] text-white overflow-hidden">

      {/* ── Vertical Server-Rack Bars (trycook.ai-style depth) ── */}
      <div className="vertical-bars" aria-hidden="true" />

      {/* ── Ambient radial glows ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Primary amber glow — center */}
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(232,185,35,0.07)_0%,transparent_70%)]" />
        {/* Secondary teal glow — bottom-left */}
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(43,90,106,0.09)_0%,transparent_70%)]" />
      </div>

      {/* ── Dot grid overlay ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(232,185,35,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-screen pt-20 pb-16">

        {/* Online Status Badge */}
        <div className="mb-12 flex items-center gap-3 px-4 py-2 rounded-sm border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.04)] backdrop-blur-sm">
          <span className="status-dot" />
          <span className="mono-label text-[var(--status-green)]">
            NETWORK STATUS: OPERATIONAL
          </span>
          <span className="mono-label text-[var(--text-muted)] border-l border-[rgba(255,255,255,0.08)] pl-3">
            3 AGENTS ACTIVE
          </span>
        </div>

        {/* Hero headlines */}
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-5">
          <h1 className="text-[clamp(2.6rem,7.5vw,5.5rem)] font-extrabold leading-[1.06] tracking-tight">
            <span className="block text-[var(--text-primary)]">
              Your Website Should Be
            </span>
            <span className="block">
              {/* Sans word + serif italic "Digital Employee" like trycook.ai */}
              A{" "}
              <span className="serif-em gradient-text">Digital Employee.</span>
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-[clamp(1rem,1.8vw,1.3rem)] text-[var(--text-secondary)] leading-relaxed">
            AI-powered websites that capture, qualify, and book leads 24/7.
            Search your niche below — see how the system works for your industry.
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-3xl mx-auto">
          <SearchNiche />
        </div>

        {/* Divider + meta stats */}
        <div className="mt-16 flex flex-col items-center gap-5">
          {/* Thin horizontal rule flanked by corner marks */}
          <div className="flex items-center gap-4 w-full max-w-xs">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(232,185,35,0.25)]" />
            <span className="mono-label text-[var(--text-muted)]">v2.0</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(232,185,35,0.25)]" />
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { value: "7-Day", label: "Launch Guarantee" },
              { value: "$1,250", label: "Starting Price" },
              { value: "24/7", label: "AI Lead Capture" },
              { value: "14+", label: "Active Niches" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-0.5 px-5 py-3 rounded-sm border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] backdrop-blur-sm"
              >
                <span className="text-base font-bold text-[var(--amber-400)]">
                  {stat.value}
                </span>
                <span className="mono-label text-[var(--text-muted)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chat Scenario Demo ── */}
      <ChatScenario />

      {/* ── Core Five Section ── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="section-container relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="mono-label text-[var(--amber-400)] tracking-[0.3em] uppercase block mb-4">
              CAPABILITIES
            </span>
            <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-bold tracking-tight text-white leading-[1.1]">
              Every FlyNerd site includes <br />
              <span className="gradient-text serif-em italic font-normal">the Core Five.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Cpu,
                title: "AI Booking Agent",
                description: "24/7 lead capture and qualification. A missed-call replacement for your website that books, qualifies, and follows up.",
              },
              {
                icon: Globe,
                title: "AI Personalization",
                description: "Your brand palette, copy, and layout come from your real reputation and reviews — never a generic template.",
              },
              {
                icon: Clock,
                title: "7-Day Launch",
                description: "Our proprietary pipeline extracts data and deploys your site in one week. No months-long development cycles.",
              },
              {
                icon: BarChart3,
                title: "Local SEO Stack",
                description: "Next.js performance with structured schema markup — the technical foundation Google and AI-search reward.",
              },
              {
                icon: Zap,
                title: "Managed Monthly",
                description: "Hosting, security, and minor updates included. Your site stays fast, secure, and technologically current.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative flex flex-col p-8 rounded-sm border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(232,185,35,0.2)] transition-all duration-300 backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-sm border border-[rgba(232,185,35,0.2)] bg-[rgba(232,185,35,0.05)] flex items-center justify-center text-[var(--amber-400)] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}

            {/* Final CTA Card */}
            <div className="flex flex-col p-8 rounded-sm border border-dashed border-[rgba(232,185,35,0.3)] bg-[rgba(232,185,35,0.02)] items-center justify-center text-center">
              <p className="text-white/60 text-sm mb-6 max-w-[200px]">
                Ready to see what an AI-powered site looks like for you?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mono-label text-[var(--amber-400)] hover:text-white transition-colors"
              >
                BOOK A STRATEGY CALL <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
