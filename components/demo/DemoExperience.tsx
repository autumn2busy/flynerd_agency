"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MoveRight, Star, Zap, Shield, Sparkles, ArrowRight, MessageCircle, Calendar } from "lucide-react";
import DemoChatWidget from "./DemoChatWidget";
import SitePreview from "./SitePreview";
import { capture, identifyLead } from "@/lib/posthog";
import type { NicheBullet } from "./nicheConfig";

export interface DemoService {
  slug: string;
  name: string;
  tagline: string;
  priceDisplay: string;
  priceSub: string;
  ctaLabel: string;
  stripeDepositLink?: string;
  featured?: boolean;
}

interface Props {
  leadId: string;
  businessName: string;
  niche: string;
  intelScore: number | null;
  painPoints: string[];
  reputationSummary: string | null;
  rating: number;
  reviewCount: number;
  walkthroughVideoUrl: string | null;
  nicheBullets: NicheBullet[];
  expiresLabel: string | null;
  rawServices?: string;
  heroHook?: string | null;
  heroSubline?: string | null;
  noticedLine?: string | null;
  tagline?: string | null;
  serviceCards?: NicheBullet[] | null;
  services: {
    audit: DemoService;
    quickstart: DemoService;
    concierge: DemoService;
  };
}

function sanitize(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ", ");
}

function sanitizeCta(text: string): string {
  return text.replace(/\s*[—–]\s*/g, ": ");
}

function sanitizePriceSub(text: string): string {
  return text.replace(/\s*·\s*/g, ", ").replace(/\s*[—–]\s*/g, ", ");
}

export default function DemoExperience(p: Props) {
  const ctaClickedRef = useRef(false);
  const mountTimeRef = useRef(Date.now());
  const pricingFiredRef = useRef(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [chatEnabled, setChatEnabled] = useState(false);

  const bookCallHref =
    "https://calendar.app.google/LJAyZTGZShyjP8QB6";

  const baseProps = { leadId: p.leadId, niche: p.niche };

  useEffect(() => {
    identifyLead(p.leadId, { niche: p.niche, businessName: p.businessName });
    capture("demo_page_view", {
      ...baseProps,
      businessName: p.businessName,
      intelScore: p.intelScore,
      hasVideo: Boolean(p.walkthroughVideoUrl),
    });
    const onBeforeUnload = () => {
      const elapsed = (Date.now() - mountTimeRef.current) / 1000;
      if (elapsed < 10 && !ctaClickedRef.current) {
        capture("demo_bounced", { ...baseProps, time_on_page: elapsed });
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);

  }, []);

  useEffect(() => {
    const node = pricingRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !pricingFiredRef.current) {
            pricingFiredRef.current = true;
            capture("demo_scrolled_to_pricing", baseProps);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();

  }, []);

  function scrollToInteractive() {
    document.getElementById("interactive")?.scrollIntoView({ behavior: "smooth" });
  }

  function onCta(event: string, props: Record<string, unknown> = {}) {
    ctaClickedRef.current = true;
    capture(event, { ...baseProps, ...props });
  }

  const hookLine = p.heroHook
    || (p.painPoints[0]
      ? `${p.businessName}, you're missing ${p.painPoints[0].toLowerCase()}. Here's the fix.`
      : `${p.businessName}, here's what a conversion-first build looks like for ${p.niche}.`);

  const sublineCopy = p.heroSubline
    || `A conversion-focused site and AI concierge, tuned to how your local customers actually search and buy.`;

  const noticedLine = p.noticedLine || p.painPoints[1] || p.painPoints[0] || null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Top strip */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/5 bg-black/60 backdrop-blur-xl px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-widest text-sm">
          FLYNERD
        </Link>
        {p.expiresLabel && (
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-white/70"
          >
            {p.expiresLabel}
          </span>
        )}
      </div>

      {/* HERO */}
      <section className="pt-32 md:pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs uppercase tracking-widest text-white/60">
              <Sparkles size={12} /> Exclusive preview for {p.businessName}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05]">
              {hookLine}
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-xl">
              {sanitize(sublineCopy)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={p.services.audit.stripeDepositLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCta("demo_cta_audit_clicked", { location: "hero" })}
                className="inline-flex items-center justify-center gap-2 font-extrabold px-8 py-4 rounded-full text-base bg-[var(--color-primary,#D4AF37)] text-black hover:opacity-90 transition-opacity"
              >
                {sanitizeCta(p.services.audit.ctaLabel)} <MoveRight size={18} />
              </a>
              <button
                onClick={scrollToInteractive}
                className="text-sm text-white/60 hover:text-white underline underline-offset-4"
              >
                Not ready? See it in action ↓
              </button>
            </div>
            <p className="text-xs text-white/40">
              Fee credited toward any build within 30 days.
            </p>
          </div>

          {/* Video / placeholder */}
          <div className="relative rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden aspect-video">
            {p.walkthroughVideoUrl ? (
              p.walkthroughVideoUrl.includes(".mp4") ? (
                <video
                  src={p.walkthroughVideoUrl}
                  controls
                  className="w-full h-full object-cover"
                  onPlay={() => capture("demo_video_played", baseProps)}
                />
              ) : (
                <iframe
                  src={p.walkthroughVideoUrl.replace("/share/", "/embed/")}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay"
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full p-8 text-center">
                <div>
                  <Zap className="mx-auto mb-3 text-[var(--color-primary,#D4AF37)]" size={28} />
                  <p className="text-sm text-neutral-400">
                    Your walkthrough video is rendering. Refresh in a minute.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className="py-20 px-6 md:px-12 border-t border-white/5 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary,#D4AF37)]">
              <Star size={18} fill="currentColor" />
              <span className="text-xs uppercase tracking-widest">Reputation</span>
            </div>
            <p className="text-neutral-200 leading-relaxed">
              {p.reputationSummary
                ? sanitize(p.reputationSummary)
                : p.rating > 0
                ? `${p.rating.toFixed(1)} stars across ${p.reviewCount} public reviews.`
                : `Your reputation is an asset we'll put to work above the fold.`}
            </p>
          </div>

          {noticedLine && (
            <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3 text-[var(--color-primary,#D4AF37)]">
                <Shield size={18} />
                <span className="text-xs uppercase tracking-widest">What we noticed</span>
              </div>
              <p className="text-neutral-200 leading-relaxed">{sanitize(noticedLine)}</p>
            </div>
          )}

          <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] md:col-span-1">
            <div className="flex items-center gap-2 mb-3 text-[var(--color-primary,#D4AF37)]">
              <Zap size={18} />
              <span className="text-xs uppercase tracking-widest">What we'd build for you</span>
            </div>
            <ul className="space-y-3">
              {p.nicheBullets.slice(0, 4).map((b, i) => (
                <li key={i} className="text-sm text-neutral-300">
                  <span className="font-semibold text-white">{b.title}.</span>{" "}
                  <span className="text-neutral-400">{b.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* INTERACTIVE */}
      <section id="interactive" className="py-24 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-3">
          Ask our AI anything about {p.businessName}
        </h2>
        <p className="text-center text-neutral-400 mb-10">
          The same AI we'd wire into your site. Try one real question.
        </p>

        {!chatEnabled ? (
          <div className="flex flex-col items-center gap-5 py-8">
            <button
              onClick={() => {
                setChatEnabled(true);
                capture("demo_chat_opened", baseProps);
              }}
              className="inline-flex items-center justify-center gap-3 font-extrabold px-10 py-5 rounded-full text-lg bg-[var(--color-primary,#D4AF37)] text-black hover:opacity-90 transition-opacity shadow-2xl"
            >
              <MessageCircle size={22} /> Start the demo chat
            </button>
            <p className="text-xs text-neutral-500">
              One click. Runs in your browser. No signup.
            </p>
          </div>
        ) : (
          <DemoChatWidget
            inline
            businessName={p.businessName}
            niche={p.niche}
            bookingLink={p.services.audit.stripeDepositLink || "#"}
            onMessageSent={(messageCount) =>
              capture("demo_chat_message_sent", { ...baseProps, messageCount })
            }
          />
        )}

        <div className="flex justify-center mt-10">
          <a
            href={bookCallHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onCta("demo_cta_book_call_clicked")}
            className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-base border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/5 transition-colors"
          >
            <Calendar size={18} /> Book a 15-min strategy call
          </a>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" ref={pricingRef} className="py-24 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-12">
            Three ways to start
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PricingCard
              service={p.services.audit}
              eyebrow="Start here"
              highlight
              event="demo_cta_audit_clicked"
              onCta={onCta}
            />
            <PricingCard
              service={p.services.quickstart}
              event="demo_cta_quickstart_clicked"
              onCta={onCta}
            />
            <PricingCard
              service={p.services.concierge}
              featured
              event="demo_cta_concierge_clicked"
              onCta={onCta}
            />
          </div>
          <p className="text-center mt-12 text-sm text-neutral-400">
            <Link
              href="/pricing"
              onClick={() => onCta("demo_cta_see_all_services_clicked")}
              className="hover:text-white underline underline-offset-4"
            >
              Need ongoing SEO, retainers, or maintenance? See all services <ArrowRight size={14} className="inline align-text-top" />
            </Link>
          </p>
        </div>
      </section>

      {/* SITE PREVIEW */}
      <SitePreview
        businessName={p.businessName}
        niche={p.niche}
        nicheBullets={p.nicheBullets}
        painPoints={p.painPoints}
        rating={p.rating}
        reviewCount={p.reviewCount}
        rawServices={p.rawServices}
        tagline={p.tagline}
        serviceCards={p.serviceCards}
        bookCtaHref={p.services.audit.stripeDepositLink || bookCallHref}
      />

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-12 text-center text-sm text-neutral-500 space-y-2">
        <p>Built in Atlanta. Every demo is a real build in 7 days.</p>
        <p>
          <Link href="/" className="hover:text-white underline underline-offset-4">
            flynerd.tech
          </Link>
        </p>
        <p className="text-xs text-neutral-600 tracking-widest uppercase pt-2">
          © 2026 FlyNerd Tech
        </p>
      </footer>
    </div>
  );
}

function PricingCard({
  service,
  eyebrow,
  highlight,
  featured,
  event,
  onCta,
}: {
  service: DemoService;
  eyebrow?: string;
  highlight?: boolean;
  featured?: boolean;
  event: string;
  onCta: (event: string, props?: Record<string, unknown>) => void;
}) {
  const borderClass = featured
    ? "border-[var(--color-primary,#D4AF37)]"
    : highlight
    ? "border-white/20 ring-1 ring-[var(--color-primary,#D4AF37)]/40"
    : "border-white/10";

  return (
    <div className={`rounded-2xl border ${borderClass} bg-white/[0.02] p-8 flex flex-col`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-widest text-[var(--color-primary,#D4AF37)] mb-3">
          {eyebrow}
        </div>
      )}
      {featured && (
        <div className="text-xs uppercase tracking-widest text-[var(--color-primary,#D4AF37)] mb-3">
          Most popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-1">{service.name}</h3>
      <div className="text-3xl font-black mb-1">{service.priceDisplay}</div>
      <p className="text-xs text-neutral-500 mb-4">{sanitizePriceSub(service.priceSub)}</p>
      <p className="text-sm text-neutral-400 leading-relaxed mb-6 flex-1">
        {sanitize(service.tagline)}
      </p>
      <a
        href={service.stripeDepositLink || "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onCta(event, { location: "pricing_card" })}
        className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3 rounded-full text-sm bg-[var(--color-primary,#D4AF37)] text-black hover:opacity-90 transition-opacity"
      >
        {sanitizeCta(service.ctaLabel)} <MoveRight size={16} />
      </a>
    </div>
  );
}
