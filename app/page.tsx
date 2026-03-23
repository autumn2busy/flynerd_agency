import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, ChevronRight } from "lucide-react";
import KineticHero from "@/components/home/KineticHero";
import PipelinePulse from "@/components/home/PipelinePulse";
import ChatScenario from "@/components/home/ChatScenario";
import FlyNerdAcronym from "@/components/home/FlyNerdAcronym";
import CoreFiveCards from "@/components/home/CoreFiveCards";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
  description: "FlyNerd Tech builds AI-powered websites for local businesses that book appointments, answer questions, and qualify leads 24/7. Atlanta-based. Live in 7 days.",
};

const differentiators = [
  { feature: "Philosophy", generic: "Digital Brochure", flynerd: "Digital Employee", highlight: true },
  { feature: "Onboarding", generic: "You write all the copy", flynerd: "AI scours Yelp for you", highlight: false },
  { feature: "Functionality", generic: "Static contact form", flynerd: "AI books + qualifies 24/7", highlight: false },
  { feature: "Launch speed", generic: "4–6 weeks", flynerd: "7-day guarantee", highlight: false },
  { feature: "Focus", generic: "How it looks", flynerd: "How it converts", highlight: false },
];

const packages = [
  {
    name: "Quickstart Build",
    price: "$1,250",
    monthly: "+ $197/mo",
    target: "Local service businesses",
    description: "A high-conversion AI site built from your real reputation, live in 7 days.",
    features: [
      "Custom niche design from your brand palette",
      "AI booking agent (trained on your services)",
      "Local SEO architecture",
      "High-speed Vercel hosting",
      "Monthly maintenance included",
    ],
    href: "/apply?package=build",
    cta: "Start Build",
    accent: "#E8B923",
  },
  {
    name: "AI Concierge Bundle",
    price: "$2,400",
    monthly: "+ $750/mo",
    target: "High lead volume businesses",
    description: "The full system — website, AI agents, CRM automation, ongoing optimization.",
    features: [
      "Everything in Quickstart Build",
      "Advanced AI agents (custom knowledge base)",
      "CRM automation via ActiveCampaign",
      "Lead qualification + smart routing",
      "Monthly iterative improvements",
    ],
    href: "/apply?package=agent",
    cta: "Launch Concierge",
    featured: true,
    accent: "#10b981",
  },
];



export default function HomePage() {
  return (
    <>
      {/* ── 1. Kinetic Hero ───────────────────────────────────────────────── */}
      <KineticHero />

      {/* ── 2. The Gap — comparison table ────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#0d0d10] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8B923]/15 to-transparent" />
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#E8B923] mb-4">The Gap</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
                Wix sends you an email.<br />
                <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                  We book the appointment.
                </span>
              </h2>
            </div>

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
          </div>
        </div>
      </section>

      {/* ── 3. Pipeline Pulse ─────────────────────────────────────────────── */}
      <PipelinePulse />

      {/* ── 4. Chat Scenario (2 AM HVAC) ──────────────────────────────────── */}
      <ChatScenario />

      {/* ── 5. Core Five */}
      <CoreFiveCards />


      {/* ── 6. Pricing Preview ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative" style={{ background: "#0d0d10" }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/15 to-transparent" />
        {/* Atlanta red + teal orbs */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#dc2626] mb-4">Pricing</span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
              Two systems.{" "}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                One goal.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className="relative flex flex-col p-8 rounded-2xl"
                style={{
                  background: pkg.featured ? `${pkg.accent}08` : "rgba(255,255,255,0.025)",
                  border: `1.5px solid ${pkg.featured ? `${pkg.accent}35` : "rgba(255,255,255,0.07)"}`,
                }}
              >
                {pkg.featured && (
                  <span
                    className="absolute -top-3 left-6 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider"
                    style={{ background: pkg.accent, color: "#000" }}
                  >
                    Most Popular
                  </span>
                )}
                <div className="mb-3">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: pkg.accent }}>
                    {pkg.target}
                  </p>
                  <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                </div>
                <div className="mb-5 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-white/30 text-sm">setup {pkg.monthly}</span>
                </div>
                <p className="text-sm text-white/45 mb-6">{pkg.description}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: pkg.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.href}
                  className="w-full py-3.5 rounded-full text-sm font-black text-center flex items-center justify-center gap-2 transition-all hover:brightness-110"
                  style={
                    pkg.featured
                      ? { background: pkg.accent, color: "#000" }
                      : { background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }
                  }
                >
                  {pkg.cta} <ArrowUpRight size={15} />
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center mt-8 text-white/25 text-sm">
            <Link href="/pricing" className="hover:text-[#E8B923] transition-colors">
              Full pricing including retainers →
            </Link>
          </p>
        </div>
      </section>

      {/* ── 7. For Growth-Minded Businesses ───────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#0a0a0c] relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div
              className="p-10 lg:p-14 rounded-3xl relative overflow-hidden"
              style={{ background: "rgba(232,185,35,0.04)", border: "1px solid rgba(232,185,35,0.15)" }}
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[radial-gradient(circle,rgba(220,38,38,0.06)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#E8B923] mb-5">
                  For Growth-Minded Businesses
                </span>
                <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-white mb-4 leading-tight">
                  Want this system<br />for your own business?
                </h2>
                <p className="text-white/50 mb-8 max-w-2xl leading-relaxed">
                  The same Scout → Intel → Builder pipeline we use to deliver client sites can be deployed
                  for your business — finding your own leads, building personalized demos, and closing automatically.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Your own Scout agent (finds leads matching your ICP)",
                    "Your own Intel agent (analyzes and scores prospects)",
                    "Automated personalized outreach at scale",
                    "Built on n8n, ActiveCampaign, and Vercel",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <CheckCircle size={15} className="text-[#E8B923] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?package=agent"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black text-black"
                    style={{ background: "linear-gradient(135deg, #B8860B, #E8B923, #FFD93D)" }}
                  >
                    Book a Strategy Call <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/15 hover:border-white/30 transition-colors"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. FLYNERD Acronym ────────────────────────────────────────────── */}
      <FlyNerdAcronym />

      {/* ── 9. Final CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#070709] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,185,35,0.07)_0%,transparent_70%)] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.05)_0%,transparent_70%)] -translate-y-1/2" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-white mb-6 leading-[1.05]">
              Ready for a site that{" "}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                works while you sleep?
              </span>
            </h2>
            <p className="text-lg text-white/40 mb-10 leading-relaxed">
              Free 20-minute strategy call. We'll show you exactly what your AI-powered
              site would look like — no templates, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-black"
                style={{ background: "linear-gradient(135deg, #B8860B, #E8B923, #FFD93D)", boxShadow: "0 0 40px rgba(232,185,35,0.25)" }}
              >
                Book a Free Call <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/ai-website"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold text-white border border-white/12 hover:border-white/25 transition-colors"
              >
                See the Product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}