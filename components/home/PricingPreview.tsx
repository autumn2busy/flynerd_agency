"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/home/ScrollReveal";
import { SERVICES } from "@/app/pricing/services-data";

// Homepage pricing preview. Price points pulled from the canonical catalog
// so this card never drifts from app/pricing. Copy + visual styling (target
// audience, CTA label, accent color, feature bullets) are page-specific and
// stay local.
const ulCore = SERVICES.find((s) => s.slug === "ai-website-quickstart-ul")!;
const tpCore = SERVICES.find((s) => s.slug === "ai-website-concierge-tp")!;

const packages = [
  {
    name: "Quickstart Build",
    price: ulCore.priceDisplay,
    monthly: "+ Care Plan $997/mo (optional)",
    target: "Underserved local service",
    description: "A high-conversion AI site built from your real reputation, live in 7 days.",
    features: [
      "Custom AI-informed design from your reputation",
      "24/7 AI booking agent on your services",
      "Local SEO foundation + schema",
      "High-speed Vercel hosting",
      "Lead capture wired to your CRM",
    ],
    href: "/pricing/ai-website-quickstart-ul",
    cta: "Start Build",
    accent: "#E8B923",
    featured: false,
  },
  {
    name: "AI Concierge Bundle",
    price: tpCore.priceDisplay,
    monthly: "+ Growth Ops $1,997/mo (optional)",
    target: "Tech-enabled premium",
    description: "Premium AI website for med spas, solar, and high-ticket services.",
    features: [
      "Everything in Quickstart Build",
      "Treatment/service detail pages",
      "Booking integration (Zenoti, Vagaro, Cal.com)",
      "CRM deep wire + lead scoring",
      "Concierge project management",
    ],
    href: "/pricing/ai-website-concierge-tp",
    cta: "Launch Concierge",
    featured: true,
    accent: "#10b981",
  },
];

export default function PricingPreview() {
  return (
    <section className="py-24 lg:py-32 relative" style={{ background: "#0d0d10" }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#dc2626]/15 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#dc2626] mb-4">Pricing</span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-white">
              Two systems.{" "}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                One goal.
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, idx) => (
            <ScrollReveal key={pkg.name} delay={idx * 0.12}>
              <div
                className="relative flex flex-col p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 interactive-glow overflow-hidden"
                style={{
                  background: pkg.featured ? `${pkg.accent}08` : "rgba(255,255,255,0.025)",
                  border: `1.5px solid ${pkg.featured ? `${pkg.accent}35` : "rgba(255,255,255,0.07)"}`,
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                  e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
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
                <div className="mb-3 relative z-10">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: pkg.accent }}>
                    {pkg.target}
                  </p>
                  <h3 className="text-xl font-black text-white">{pkg.name}</h3>
                </div>
                <div className="mb-5 flex items-baseline gap-2 relative z-10">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-white/30 text-sm">setup {pkg.monthly}</span>
                </div>
                <p className="text-sm text-white/45 mb-6 relative z-10">{pkg.description}</p>
                <ul className="space-y-2.5 mb-8 flex-1 relative z-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/55">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: pkg.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.href}
                  className="w-full py-3.5 rounded-full text-sm font-black text-center flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-[0.97] relative z-10"
                  style={
                    pkg.featured
                      ? { background: pkg.accent, color: "#000" }
                      : { background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)" }
                  }
                >
                  {pkg.cta} <ArrowUpRight size={15} />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="text-center mt-8 text-white/25 text-sm">
          <Link href="/pricing" className="hover:text-[#E8B923] transition-colors">
            Full pricing including retainers →
          </Link>
        </p>
      </div>
    </section>
  );
}
