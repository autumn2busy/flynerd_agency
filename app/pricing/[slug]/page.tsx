import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SERVICES } from "../services-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | FlyNerd Tech`,
    description: service.tagline,
  };
}

const monoStyle = { fontFamily: "var(--font-mono)" } as const;

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">

      {/* ── Back nav ─────────────────────────────────────────── */}
      <div className="border-b border-white/8 pt-24">
        <div className="section-container py-4">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            style={monoStyle}
          >
            <ArrowLeft size={13} />
            All Services
          </Link>
        </div>
      </div>

      {/* ── Service header ───────────────────────────────────── */}
      <section className="py-12 lg:py-16 border-b border-white/8">
        <div className="section-container">
          <p
            className="text-[10px] uppercase tracking-[0.25em] font-bold mb-4"
            style={{ ...monoStyle, color: service.categoryColor }}
          >
            {service.category}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              color: "var(--text-primary)",
              maxWidth: "22ch",
              marginBottom: "1rem",
            }}
          >
            {service.name}
          </h1>
          <p className="text-base text-[var(--text-secondary)] max-w-xl" style={{ lineHeight: 1.7 }}>
            {service.tagline}
          </p>
        </div>
      </section>

      {/* ── Main two-column layout ───────────────────────────── */}
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-16 py-16">

          {/* ── Left column: About + Package + Process ───────── */}
          <div className="flex-1 max-w-2xl">

            {/* About */}
            <section className="mb-14">
              <h2
                className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] mb-6"
                style={monoStyle}
              >
                About this Service
              </h2>
              <div className="space-y-4">
                {service.about.map((para, i) => (
                  <p key={i} className="text-base text-[var(--text-secondary)] leading-[1.75]">
                    {para}
                  </p>
                ))}
              </div>
            </section>

            {/* In the Package */}
            <section className="mb-14">
              <h2
                className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] mb-6"
                style={monoStyle}
              >
                In the Package
              </h2>
              <ol className="space-y-5">
                {service.inThePackage.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--accent)]/40 flex items-center justify-center text-[10px] font-bold mt-0.5"
                      style={{ ...monoStyle, color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <span className="font-bold text-[var(--text-primary)] text-sm">{item.bold}</span>
                      <span className="text-sm text-[var(--text-secondary)]"> — {item.detail}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Process & Communication */}
            <section className="mb-14">
              <h2
                className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] mb-6"
                style={monoStyle}
              >
                Process &amp; Communication
              </h2>
              <ol className="space-y-0">
                {service.process.map((step, i) => (
                  <li key={i} className="flex gap-4 pb-8 relative">
                    {/* Vertical line */}
                    {i < service.process.length - 1 && (
                      <div
                        className="absolute left-[11px] top-6 bottom-0 w-px"
                        style={{ background: "linear-gradient(to bottom, rgba(0,212,255,0.3), transparent)" }}
                        aria-hidden="true"
                      />
                    )}
                    {/* Step number */}
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--accent)]/50 flex items-center justify-center text-[10px] font-bold relative z-10 bg-[var(--bg-base)]"
                      style={{ ...monoStyle, color: "var(--accent)" }}
                    >
                      {i + 1}
                    </span>
                    <div className="pt-0.5">
                      <h3 className="font-bold text-sm text-[var(--text-primary)] mb-1">{step.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          {/* ── Right column: Pricing panel ──────────────────── */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0">
            <div
              className="sticky top-28 border border-white/10 bg-[#0f0f0f]"
            >
              {/* Price header */}
              <div className="p-6 border-b border-white/8">
                <div
                  className="font-bold text-[var(--text-primary)] leading-none mb-1"
                  style={{ fontSize: "2rem", letterSpacing: "-0.04em" }}
                >
                  {service.priceDisplay}
                </div>
                <p className="text-xs text-[var(--text-muted)]" style={monoStyle}>
                  {service.priceSub}
                </p>
              </div>

              {/* Milestones */}
              <div className="p-6 border-b border-white/8">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] mb-4" style={monoStyle}>
                  Payment Schedule
                </p>
                <div className="space-y-3">
                  {service.milestones.map((m, i) => (
                    <div key={i} className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-2">
                        <span
                          className="text-[10px] text-[var(--text-muted)] font-bold w-4 mt-0.5 flex-shrink-0"
                          style={monoStyle}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">{m.label}</p>
                          <p className="text-[10px] text-[var(--text-muted)]" style={monoStyle}>{m.dueAt}</p>
                        </div>
                      </div>
                      <span
                        className="text-sm font-bold text-[var(--text-primary)] flex-shrink-0"
                        style={monoStyle}
                      >
                        {m.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="p-6 border-b border-white/8 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-muted)]" style={monoStyle}>Project Duration</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]" style={monoStyle}>{service.projectDuration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[var(--text-muted)]" style={monoStyle}>Revisions</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]" style={monoStyle}>1 included</span>
                </div>
              </div>

              {/* CTA */}
              <div className="p-6">
                <Link
                  href={service.ctaHref}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-bold text-black accent-glow"
                  style={{ background: "var(--accent)", fontFamily: "var(--font-mono)" }}
                >
                  {service.ctaLabel} <ArrowUpRight size={15} />
                </Link>
                <p className="text-center text-[10px] text-[var(--text-muted)] mt-3" style={monoStyle}>
                  or{" "}
                  <Link href="/contact" className="text-[var(--accent)] hover:underline">
                    book a free 20-min call first
                  </Link>
                </p>
              </div>

              {/* Agency badge */}
              <div className="px-6 pb-6">
                <div className="border border-white/8 p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <span className="text-black font-black text-sm">FN</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)]">FlyNerd Tech</p>
                    <p className="text-[10px] text-[var(--text-muted)]" style={monoStyle}>
                      Atlanta, GA · Responds within 1 business day
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Related services ─────────────────────────────────── */}
      <section className="py-16 border-t border-white/8 bg-[#050505]">
        <div className="section-container">
          <p
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text-muted)] mb-8"
            style={monoStyle}
          >
            // Other Services
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
            {SERVICES.filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/pricing/${s.slug}`}
                  className={`group block p-6 hover:bg-[#0f0f0f] transition-colors border-b md:border-b-0 border-white/10 ${i > 0 ? "md:border-l" : ""}`}
                >
                  <p
                    className="text-[9px] uppercase tracking-[0.2em] font-bold mb-2"
                    style={{ ...monoStyle, color: s.categoryColor }}
                  >
                    {s.category}
                  </p>
                  <h3
                    className="text-sm font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {s.name}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]" style={monoStyle}>
                    {s.priceDisplay}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

    </div>
  );
}
