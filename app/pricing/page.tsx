import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, SERVICE_CATEGORIES } from "./services-data";
import type { Service } from "./services-data";

export const metadata: Metadata = {
  title: "Services & Pricing | FlyNerd Tech",
  description:
    "AI agents, automation builds, SEO, email marketing, and website maintenance for local service businesses. Fixed-scope, clear pricing, measurable outcomes.",
};

const monoStyle = { fontFamily: "var(--font-mono)" } as const;

export default function ServicesPage() {
  const auditPrice = SERVICES.find((s) => s.slug === "automation-audit")?.priceDisplay || "$495";

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
              className="text-base text-[var(--text-secondary)] max-w-sm leading-relaxed"
              style={{ lineHeight: 1.7 }}
            >
              Fixed scopes. Clear outcomes. No surprise invoices.
              Click any service to see exactly what you get, how we work, and the payment schedule.
            </p>
          </div>
        </div>
      </section>

      {/* ── Service Categories ────────────────────────────────── */}
      {SERVICE_CATEGORIES.map((cat) => {
        const services = SERVICES.filter(cat.filter);
        if (services.length === 0) return null;
        return (
          <section key={cat.label} className="py-16 border-b border-white/8">
            <div className="section-container">
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-[10px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 border whitespace-nowrap"
                  style={{ ...monoStyle, color: cat.tagColor, borderColor: cat.tagBorder }}
                >
                  {cat.tag}
                </span>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{cat.label}</p>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              {/* Card grid — auto-fit columns */}
              <div
                className={`border border-white/10 grid ${
                  services.length === 1
                    ? "grid-cols-1 lg:grid-cols-1 max-w-2xl"
                    : services.length === 2
                    ? "grid-cols-1 lg:grid-cols-2"
                    : services.length >= 4
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
                    : "grid-cols-1 lg:grid-cols-3"
                }`}
              >
                {services.map((service, i) => (
                  <ServiceCard
                    key={service.slug}
                    service={service}
                    index={i}
                    total={services.length}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
              The Automation Audit gives you a 30-day roadmap and ROI-ranked priorities.
              The {auditPrice} fee is credited toward any Quickstart Workflow Build or AI Concierge Launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact?package=audit"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black accent-glow"
                style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
              >
                Book Audit — {auditPrice} <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-sm border border-white/20 text-[var(--text-primary)] hover:border-white/50 transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Book Free Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ServiceCard({
  service,
  index,
  total,
}: {
  service: Service;
  index: number;
  total: number;
}) {
  // Add right border between cards in the same row
  const cols = total <= 1 ? 1 : total === 2 ? 2 : total >= 4 ? 2 : 3;
  const isLastInRow = (index + 1) % cols === 0;
  const isLastRow = index >= total - cols;

  return (
    <Link
      href={`/pricing/${service.slug}`}
      className={`group block p-8 lg:p-10 hover:bg-[#0f0f0f] transition-colors duration-200 relative
        ${!isLastInRow ? "border-r border-white/10" : ""}
        ${!isLastRow ? "border-b border-white/10" : ""}
      `}
    >
      {service.featured && (
        <span
          className="absolute top-6 right-6 text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1 text-black"
          style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
        >
          Recommended
        </span>
      )}

      {/* Category tag */}
      <p
        className="text-[10px] uppercase tracking-[0.2em] mb-4 font-bold"
        style={{ ...monoStyle, color: service.categoryColor }}
      >
        {service.category}
      </p>

      {/* Service name */}
      <h2
        className="text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.15,
        }}
      >
        {service.name}
      </h2>

      {/* Tagline */}
      <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed" style={{ maxWidth: "36ch" }}>
        {service.tagline}
      </p>

      {/* Price + CTA */}
      <div className="flex items-end justify-between">
        <div>
          <div
            className="text-[var(--text-primary)] font-bold"
            style={{ fontSize: "1.5rem", letterSpacing: "-0.04em" }}
          >
            {service.priceDisplay}
          </div>
          <div className="text-[10px] text-[var(--text-muted)] mt-0.5" style={monoStyle}>
            {service.priceSub}
          </div>
        </div>
        <div
          className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-200"
          style={monoStyle}
        >
          View Service{" "}
          <ArrowUpRight
            size={13}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </div>
      </div>
    </Link>
  );
}
