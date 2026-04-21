import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle, Mail, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Payment received — FlyNerd Tech",
  description:
    "Payment confirmed. Book your kickoff call and check your email for a Stripe receipt.",
  robots: { index: false, follow: false },
};

// Friendly copy keyed on lookup_key so purchases can show product-specific
// next steps. Unknown keys get the generic fallback.
const PRODUCT_COPY: Record<string, { title: string; bullets: string[] }> = {
  flynerd_website_ul_deposit_v1: {
    title: "Your AI Website Quickstart build is greenlit.",
    bullets: [
      "Book your 20-minute kickoff call to lock in your 7-day build timeline.",
      "You will receive your Stripe receipt by email. The final 50% is due at launch.",
      "Within 1 business day we will send an intake email confirming your brand colors, services, and reputation data.",
    ],
  },
  flynerd_website_tp_deposit_v1: {
    title: "Your AI Website Concierge build is greenlit.",
    bullets: [
      "Book your concierge kickoff to align on scope and integrations.",
      "You will receive your Stripe receipt by email. The final 50% is due at launch.",
      "We will send a concierge intake within 24 hours covering integrations, content, and custom logic.",
    ],
  },
  flynerd_audit_deposit_v1: {
    title: "Your Automation Audit is booked.",
    bullets: [
      "Book your 60-90 minute strategy session.",
      "A pre-call intake form arrives by email within an hour.",
      "Your written roadmap is delivered within a few business days of the session.",
    ],
  },
  flynerd_email_migration_onetime_v1: {
    title: "Email Migration is locked in.",
    bullets: [
      "Book your kickoff call to confirm source provider and mailbox list.",
      "You will receive your Stripe receipt by email.",
      "Full delivery within 7 days of kickoff: Google Workspace setup, mailbox migration, DNS cutover, and incoming/outgoing verification.",
    ],
  },
};

const DEFAULT_COPY = {
  title: "Payment received. Welcome to FlyNerd.",
  bullets: [
    "Book your kickoff call using the link below.",
    "You will receive your Stripe receipt by email within a few minutes.",
    "We will follow up within 24 hours with next-step details and any intake info we need.",
  ],
};

interface ThanksPageProps {
  searchParams: Promise<{ session_id?: string; lookup_key?: string }>;
}

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const { session_id, lookup_key } = await searchParams;

  const copy =
    (lookup_key ? PRODUCT_COPY[lookup_key] : undefined) ?? DEFAULT_COPY;

  // Server component — reads non-public env directly. Matches the var
  // name convention used in app/demo/[leadId]/page.tsx. Hardcoded final
  // fallback so the page works even if env isn't wired in Vercel yet.
  const bookingUrl =
    process.env.CAL_COM_KICKOFF_LINK ??
    "https://calendar.app.google/ZPyA64TEyjD7E99P8";
  const bookingIsExternal = bookingUrl.startsWith("http");

  return (
    <section className="pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--gold-500)]/15 flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={32} className="text-[var(--gold-400)]" />
          </div>

          <span className="section-label">Payment received</span>
          <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight mt-4 mb-6 leading-[1.15]">
            {copy.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-12">
            Thanks for choosing FlyNerd Tech. Your payment is confirmed and a
            receipt is on its way.
          </p>

          <div className="glass-card rounded-2xl p-8 text-left mb-10">
            <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <Calendar size={18} className="text-[var(--gold-400)]" />
              What happens next
            </h2>
            <ul className="space-y-3">
              {copy.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--gold-400)] flex-shrink-0" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {bookingIsExternal ? (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-base px-8 py-3.5"
              >
                Book kickoff call <ArrowUpRight size={18} />
              </a>
            ) : (
              <Link href={bookingUrl} className="btn btn-primary text-base px-8 py-3.5">
                Book kickoff call <ArrowUpRight size={18} />
              </Link>
            )}
            <Link href="/" className="btn btn-ghost text-base px-8 py-3.5">
              Back to homepage
            </Link>
          </div>

          <div className="text-xs text-[var(--text-muted)] space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Mail size={12} />
              Receipt sent to your email. Check spam if you don't see it within
              5 minutes.
            </p>
            {session_id && (
              <p>
                Reference:{" "}
                <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                  {session_id.slice(0, 20)}...
                </code>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
