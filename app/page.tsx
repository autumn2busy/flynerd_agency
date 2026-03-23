import Link from "next/link";
import { ArrowUpRight, Zap, Cpu, BarChart3, Clock, Globe, ChevronRight, CheckCircle, Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlyNerd Tech | AI-Powered Websites for Local Businesses",
  description: "FlyNerd Tech builds AI-powered websites that work as digital employees — 24/7 booking, lead qualification, and local SEO. Atlanta-based, deployed in 7 days.",
};

const differentiators = [
  {
    feature: "Philosophy",
    generic: "Digital Brochure",
    flynerd: "Digital Employee",
    highlight: true,
  },
  {
    feature: "Onboarding",
    generic: "You write all the copy",
    flynerd: "AI scours Yelp & reviews for you",
    highlight: false,
  },
  {
    feature: "Functionality",
    generic: "Static contact form",
    flynerd: "AI books, answers, qualifies 24/7",
    highlight: false,
  },
  {
    feature: "Launch speed",
    generic: "4–6 weeks",
    flynerd: "7-day guarantee",
    highlight: false,
  },
  {
    feature: "Focus",
    generic: "How it looks",
    flynerd: "How it converts",
    highlight: false,
  },
];

const coreFive = [
  {
    icon: Cpu,
    title: "AI Booking & Support Agent",
    description: "Not a contact form. A 24/7 front-desk agent that knows your pricing, services, and availability — and books appointments while you sleep.",
  },
  {
    icon: Globe,
    title: "AI-Generated Personalization",
    description: "Every design is informed by your real reputation. Our Intel Agent reads your reviews and selects brand palettes and copy based on what customers actually say about you.",
  },
  {
    icon: Clock,
    title: "7-Day Launch Guarantee",
    description: "We leverage AI builders and automated deployment pipelines to go from zero to live site in days, not months.",
  },
  {
    icon: BarChart3,
    title: "Local SEO & Speed",
    description: "Headless Next.js architecture means sub-second load times and optimized schema markup for local search — the two factors that matter most for local rankings.",
  },
  {
    icon: Zap,
    title: "Managed Growth",
    description: "Hosting, security, and continuous AI improvements are bundled into the monthly subscription. Your site gets smarter over time.",
  },
];

const packages = [
  {
    name: "Quickstart Build",
    price: "$1,250",
    monthly: "+ $197/mo",
    target: "Local service businesses",
    description: "A high-conversion site built from your real reputation, live in 7 days.",
    features: [
      "Custom niche design from your brand palette",
      "AI booking agent (trained on your services)",
      "Local SEO architecture",
      "High-speed Vercel hosting",
      "Monthly maintenance included",
    ],
    href: process.env.STRIPE_LINK_BUILD_DEPOSIT || "/contact?package=build",
    cta: "Start Build",
  },
  {
    name: "AI Concierge Bundle",
    price: "$2,400",
    monthly: "+ $750/mo",
    target: "High lead volume businesses",
    description: "The full system — website plus advanced AI agents, CRM automation, and ongoing optimization.",
    features: [
      "Everything in Quickstart Build",
      "Advanced AI support agents (custom knowledge base)",
      "CRM automation (ActiveCampaign)",
      "Lead qualification + routing",
      "Monthly iterative improvements",
    ],
    href: process.env.STRIPE_LINK_AGENT_DEPOSIT || "/contact?package=agent",
    cta: "Launch Concierge",
    featured: true,
  },
];

const useCases = [
  {
    niche: "HVAC & Home Services",
    scenario: "It's 2 AM. A customer's AC breaks. They Google 'emergency HVAC Atlanta.' Your AI agent answers their 'Emergency surcharge?' question and books an 8 AM slot. You wake up to a confirmed appointment.",
    icon: "🔧",
  },
  {
    niche: "Salons & Med Spas",
    scenario: "A client wants to book a specific stylist for Saturday. Your AI agent checks availability, confirms the slot, and sends a reminder — without your receptionist touching a single thing.",
    icon: "✂️",
  },
  {
    niche: "Law Firms",
    scenario: "A potential client finds your site at 10 PM after a stressful day. Your AI agent qualifies their case type, answers basic process questions, and books a consultation for Monday morning.",
    icon: "⚖️",
  },
];

const automationService = {
  title: "Want this system for your own business?",
  description: "The same Scout → Intel → Builder pipeline we use to deliver client sites can be deployed for your business to automate your own lead generation. This is a custom implementation starting with the AI Concierge Bundle.",
  items: [
    "Your own Scout agent (finds leads matching your ICP)",
    "Your own Intel agent (analyzes and scores prospects)",
    "Automated personalized outreach at scale",
    "Built on n8n, ActiveCampaign, and Vercel",
  ],
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-lightbulb.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18191D] via-[#18191D]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#18191D]/85 via-transparent to-[#18191D]" />
        <div className="absolute inset-0 opacity-30">
          <div className="grid-lines" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 pt-24">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--amber-500)]" />
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-[var(--amber-400)]">
              AI-Powered Websites · Atlanta
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--amber-500)]" />
          </div>

          <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-bold leading-[1.0] tracking-tight mb-6">
            <span className="block text-[var(--text-primary)]">Your Website Should Be</span>
            <span className="block gradient-text">A Digital Employee.</span>
          </h1>

          <p className="text-[clamp(1rem,2.2vw,1.35rem)] text-[var(--text-secondary)] leading-relaxed mb-4 max-w-3xl mx-auto">
            We build AI-powered websites for local businesses that book appointments, answer questions, and qualify leads — 24 hours a day, without you lifting a finger.
          </p>

          <p className="text-sm text-[var(--text-muted)] mb-10 tracking-wide">
            Live in <span className="text-[var(--amber-400)] font-semibold">7 days</span> · Starting at <span className="text-[var(--amber-400)] font-semibold">$1,250</span> · Managed monthly
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/ai-website" className="btn btn-primary px-8 py-4 pulse-glow text-base">
              See How It Works
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/pricing" className="btn btn-ghost px-8 py-4 bg-[rgba(24,25,29,0.8)] backdrop-blur-sm border border-[var(--glass-border)] text-base">
              View Pricing
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)] z-10">
          <div className="w-5 h-8 border border-[var(--amber-500)]/40 flex items-start justify-center p-1 bg-[rgba(24,25,29,0.6)] backdrop-blur-sm">
            <div className="w-0.5 h-2 bg-[var(--amber-400)] animate-bounce" />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        </div>
      </section>

      {/* ── The Problem ───────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="section-label">The Gap</span>
              <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4 mb-6">
                Wix sends you an email.<br />
                <span className="gradient-text">We book the appointment.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                At 2 AM when a customer's AC breaks and they find your site — a static form loses the job. An AI agent books it.
              </p>
            </div>

            {/* Comparison table */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-[var(--bg-elevated)] px-6 py-4 border-b border-[var(--glass-border)]">
                <div className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider">Feature</div>
                <div className="text-sm font-semibold text-[var(--text-muted)] uppercase tracking-wider text-center">Wix / Generic</div>
                <div className="text-sm font-semibold text-[var(--amber-400)] uppercase tracking-wider text-center">FlyNerd Tech</div>
              </div>
              {differentiators.map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 px-6 py-4 border-b border-[var(--glass-border)] last:border-0 ${row.highlight ? "bg-[var(--gold-500)]/5" : ""}`}
                >
                  <div className="text-sm font-medium text-white">{row.feature}</div>
                  <div className="text-sm text-[var(--text-muted)] text-center">{row.generic}</div>
                  <div className={`text-sm font-semibold text-center ${row.highlight ? "text-[var(--amber-400)]" : "text-[var(--teal-400)]"}`}>
                    {row.flynerd}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Use Cases ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">In Practice</span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
              What <span className="gradient-text">"Digital Employee"</span> actually means
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {useCases.map((uc, i) => (
              <div key={i} className="glass-card rounded-2xl p-8 space-y-4">
                <div className="text-4xl">{uc.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--amber-400)]">{uc.niche}</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{uc.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Five ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">What's Included</span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
              Every FlyNerd site includes <span className="gradient-text">the Core Five</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFive.map((item, i) => (
              <div key={i} className={`glass-card rounded-2xl p-8 group ${i === 0 ? "lg:col-span-1 ring-1 ring-[var(--gold-500)]/30" : ""}`}>
                <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 flex items-center justify-center text-[var(--gold-400)] mb-5 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-[var(--gold-400)] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/ai-website" className="btn btn-ghost">
              Full product details <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ───────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[var(--bg-elevated)]">
        <div className="section-container">
          <div className="text-center mb-16">
            <span className="section-label">Pricing</span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-semibold mt-4">
              Two systems. One goal: <span className="gradient-text">more customers.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`glass-card rounded-2xl p-8 relative flex flex-col ${pkg.featured ? "ring-2 ring-[var(--gold-500)]" : ""}`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-[var(--bg-base)] bg-[var(--gold-400)] px-4 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{pkg.target}</p>
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-[var(--text-muted)] ml-2 text-sm">setup {pkg.monthly}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle size={15} className="text-[var(--gold-400)] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.href}
                  className={`btn w-full ${pkg.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {pkg.cta} <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-[var(--text-muted)] hover:text-[var(--gold-400)] transition-colors">
              View full pricing including automation retainers →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Automation as a Service (for premium clients) ─────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <span className="section-label mb-4 block">For Growth-Minded Businesses</span>
                <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-semibold mb-4">
                  {automationService.title}
                </h2>
                <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl">
                  {automationService.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {automationService.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <CheckCircle size={16} className="text-[var(--gold-400)] flex-shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?package=agent" className="btn btn-primary px-8 py-4">
                    Book a Strategy Call <ArrowUpRight size={18} />
                  </Link>
                  <Link href="/services" className="btn btn-ghost px-8 py-4">
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden bg-[var(--bg-elevated)]">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,185,35,0.10)_0%,transparent_70%)] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(43,90,106,0.12)_0%,transparent_70%)] -translate-y-1/2" />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold mb-6">
              Ready for a website that <span className="gradient-text">works while you sleep?</span>
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-10">
              Book a free 20-minute strategy call. We'll show you exactly what an AI-powered site would look like for your business — no pressure, no templates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-primary text-lg px-10 py-4">
                Book a Free Call <ArrowUpRight size={20} />
              </Link>
              <Link href="/ai-website" className="btn btn-ghost text-lg px-8 py-4">
                See the Product
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}