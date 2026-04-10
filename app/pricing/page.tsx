import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "./services-data";

export const metadata: Metadata = {
  title: "Services & Pricing | FlyNerd Tech",
  description:
    "AI-powered websites, automation builds, and growth retainers for local service businesses. Fixed-scope, clear pricing, measurable outcomes.",
};

const monoStyle = { fontFamily: "var(--font-mono)" } as const;

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 lg:pt-44 lg:pb-20 border-b border-white/8">
        <div className="section-container">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] mb-5" style={monoStyle}>
            // services + pricing
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <h1
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.95,
                color: "var(--text-primary)",
                maxWidth: "18ch",
              }}
            >
              What we build.<br />
              <span style={{ color: "var(--accent)" }}>What it costs.</span>
            </h1>
            <p
              className="text-base text-[var(--text-secondary)] max-w-sm leading-relaxed lg:text-right"
              style={{ lineHeight: 1.7 }}
            >
              Fixed scopes. Clear outcomes. No surprise invoices. Click any service to see exactly what you get.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category: AI Websites ─────────────────────────────── */}
      <section className="py-16 border-b border-white/8">
        <div className="section-container">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border"
              style={{ ...monoStyle, color: "var(--accent)", borderColor: "var(--accent)" }}
            >
              AI Websites
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
            {SERVICES.filter((s) => s.category.startsWith("AI")).map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Category: Automation ─────────────────────────────── */}
      <section className="py-16 border-b border-white/8">
        <div className="section-container">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border border-zinc-600"
              style={{ ...monoStyle, color: "#a1a1aa" }}
            >
              Automation
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
            {SERVICES.filter((s) => s.category === "Automation").map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Category: Retainers ──────────────────────────────── */}
      <section className="py-16 border-b border-white/8">
        <div className="section-container">
          <div className="flex items-center gap-4 mb-8">
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border border-zinc-700"
              style={{ ...monoStyle, color: "#71717a" }}
            >
              Retainers
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
            {SERVICES.filter((s) => s.category === "Retainer").map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-black">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)] mb-5" style={monoStyle}>
              // not sure where to start?
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.0,
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              Start with the Audit.<br />
              <span style={{ color: "var(--accent)" }}>Credit it toward any build.</span>
            </h2>
            <p className="text-base text-[var(--text-secondary)] mb-10 max-w-xl" style={{ lineHeight: 1.7 }}>
              The Automation Audit gives you a 30-day roadmap and ROI-ranked priorities — whether you build with us or not. The $495 fee is credited toward any Build or Bundle package.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?package=starter"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black accent-glow"
                style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
              >
                Book Audit — $495 <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm border border-white/20 text-[var(--text-primary)] hover:border-white/50 transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Book Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const isRight = index % 2 === 1;
  return (
    <Link
      href={`/pricing/${service.slug}`}
      className={`group block p-8 lg:p-10 border-b lg:border-b-0 border-white/10 hover:bg-[#0f0f0f] transition-colors duration-200 relative ${
        isRight ? "lg:border-l border-white/10" : ""
      }`}
    >
      {service.featured && (
        <span
          className="absolute top-6 right-6 text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 text-black"
          style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Most Popular
        </span>
      )}

      {/* Category */}
      <p
        className="text-[10px] uppercase tracking-[0.2em] mb-4 font-bold"
        style={{ ...monoStyle, color: service.categoryColor }}
      >
        {service.category}
      </p>

      {/* Name */}
      <h2
        className="text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200"
        style={{
          fontSize: "clamp(1.3rem, 2.5vw, 1.75rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        {service.name}
      </h2>

      {/* Tagline */}
      <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed max-w-sm">
        {service.tagline}
      </p>

      {/* Price + CTA row */}
      <div className="flex items-end justify-between">
        <div>
          <div
            className="text-[var(--text-primary)] font-bold"
            style={{ fontSize: "1.6rem", letterSpacing: "-0.04em" }}
          >
            {service.priceDisplay}
          </div>
          <div className="text-xs text-[var(--text-muted)] mt-0.5" style={monoStyle}>
            {service.priceSub}
          </div>
        </div>
        <div
          className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200"
          style={monoStyle}
        >
          View Service <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}
