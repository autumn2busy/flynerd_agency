"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/app/pricing/services-data";

// Alias table matches /api/apply/route.ts so legacy ?package=build deep
// links still resolve to a services-data slug for the checkout-mode branch.
const PACKAGE_ALIASES: Record<string, string> = {
  build: "ai-website-quickstart-ul",
  quickstart: "ai-website-quickstart-ul",
  concierge: "ai-website-concierge-tp",
  agent: "ai-concierge-launch",
  audit: "automation-audit",
  sprint: "automation-sprint-build",
  "care-plan": "automation-care-plan",
  "growth-partner": "growth-ops-partner",
  "scale-ops": "scale-ops-partner",
  "email-migration": "email-migration",
};

function resolveServiceFromQuery(packageParam: string | null) {
  if (!packageParam) return null;
  const direct = SERVICES.find((s) => s.slug === packageParam);
  if (direct) return direct;
  const aliased = PACKAGE_ALIASES[packageParam];
  if (!aliased) return null;
  return SERVICES.find((s) => s.slug === aliased) ?? null;
}

// Cal.com booking URL. Env var falls back to the committed canonical link
// so the page still works if env isn't wired in this environment. The iframe
// embed takes prefill query params to pre-populate name/email/notes.
const CAL_BOOKING_URL =
  process.env.NEXT_PUBLIC_CAL_COM_KICKOFF_LINK ??
  "https://cal.com/flynerdtech/strategy-call";

// ─────────────────────────────────────────────────────────────
// Qualification form — minimum 3-5 minutes of real effort to
// complete. Designed as the commitment gate that filters tire-
// kickers BEFORE we spend Dre compute on a demo build.
// ─────────────────────────────────────────────────────────────

const NICHE_OPTIONS = [
  "Med Spa / Aesthetics",
  "HVAC / Plumbing / Home Services",
  "Legal / Law Firm",
  "Dental / Healthcare",
  "Beauty / Salon / Barber",
  "Restoration / Cleaning",
  "Solar / Roofing",
  "Concierge / Premium Services",
  "SaaS / Digital",
  "Other",
];

const LEAD_VOLUME_OPTIONS = [
  "Under 5 per week",
  "5 to 20 per week",
  "20 to 50 per week",
  "50 or more per week",
];

const TIMELINE_OPTIONS = [
  "Within 30 days",
  "1 to 3 months",
  "Just exploring",
];

interface QualForm {
  name: string;
  email: string;
  business_name: string;
  website_url: string;
  niche: string;
  niche_other: string;
  services: string;
  pain_point: string;
  lead_volume: string;
  timeline: string;
  tools: string;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const packageParam = searchParams.get("package");
  const urlParam = searchParams.get("url");
  const selectedService = resolveServiceFromQuery(packageParam);

  // Three modes based on query params:
  //   "checkout" — explicit package selection from /pricing, route to Stripe on submit
  //   "demo"     — URL capture from hero, qualification form + Cal.com step
  //   "intake"   — neither; same qualification flow as demo
  const mode: "checkout" | "demo" | "intake" = selectedService
    ? "checkout"
    : urlParam
      ? "demo"
      : "intake";

  const [form, setForm] = useState<QualForm>({
    name: "",
    email: "",
    business_name: "",
    website_url: urlParam ?? "",
    niche: "",
    niche_other: "",
    services: "",
    pain_point: "",
    lead_volume: "",
    timeline: "",
    tools: "",
  });
  const [step, setStep] = useState<"form" | "booking">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [applyId, setApplyId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validate(): string | null {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim() || !form.email.includes("@"))
      return "Please enter a valid email address.";
    if (!form.business_name.trim()) return "Please enter your business name.";
    if (mode === "checkout") return null; // Checkout mode uses fewer fields
    if (!form.website_url.trim()) return "Please enter your website URL.";
    if (!form.niche) return "Please pick a niche.";
    if (form.niche === "Other" && !form.niche_other.trim())
      return "Please describe your niche.";
    if (form.services.trim().length < 10)
      return "Please list your top 3 services (at least 10 characters).";
    if (form.pain_point.trim().length < 50)
      return "Tell us a bit more about what's costing you revenue (at least 50 characters — specific answers = better demo).";
    if (!form.lead_volume) return "Please pick your inquiry volume.";
    if (!form.timeline) return "Please pick a timeline.";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        // Collapse Other niche into the actual niche field before send
        niche:
          form.niche === "Other" && form.niche_other.trim()
            ? form.niche_other.trim()
            : form.niche,
        packageName: selectedService?.slug ?? null,
      };

      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.mode === "checkout" && data.stripeUrl) {
        window.location.href = data.stripeUrl;
        return;
      }

      if (res.ok && (data.mode === "demo-pending" || data.mode === "demo")) {
        setApplyId(data.applyId ?? null);
        setStep("booking");
        setIsSubmitting(false);
        // Scroll to top of Cal.com iframe
        setTimeout(() => {
          document
            .getElementById("cal-embed-wrapper")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return;
      }

      setError(
        data.error ??
          "We captured your info but couldn't finalize the next step. We'll reach out within 24 hours.",
      );
      setIsSubmitting(false);
    } catch (err) {
      console.error(err);
      setError("Error submitting your info. Please try again.");
      setIsSubmitting(false);
    }
  };

  // ─── Cal.com embed URL with prefill params ───────────────
  const calEmbedUrl = new URL(CAL_BOOKING_URL);
  if (form.name) calEmbedUrl.searchParams.set("name", form.name);
  if (form.email) calEmbedUrl.searchParams.set("email", form.email);
  // Cal.com's "notes" field flows into the booking notes / calendar event
  const calNotes = [
    form.business_name && `Business: ${form.business_name}`,
    form.website_url && `Website: ${form.website_url}`,
    form.niche && `Niche: ${form.niche === "Other" ? form.niche_other : form.niche}`,
    applyId && `Apply ID: ${applyId}`,
  ]
    .filter(Boolean)
    .join("\n");
  if (calNotes) calEmbedUrl.searchParams.set("notes", calNotes);
  calEmbedUrl.searchParams.set("embed", "1");

  // ─────────────────────────────────────────────────────────
  // STEP 2: Cal.com booking embed
  // ─────────────────────────────────────────────────────────
  if (step === "booking") {
    return (
      <div className="space-y-8">
        <div className="glass-card rounded-3xl p-8 lg:p-10 border border-[var(--glass-border)]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 className="text-green-400" size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                You&apos;re qualified. Now pick a time.
              </h2>
              <p className="text-[var(--text-secondary)]">
                Your personalized demo is being built right now and will land
                in your inbox within 15 minutes. Meanwhile, lock in a 20-minute
                strategy call below so we can review it together.
              </p>
            </div>
          </div>
        </div>

        <div
          id="cal-embed-wrapper"
          className="glass-card rounded-3xl overflow-hidden border border-[var(--glass-border)]"
        >
          <iframe
            src={calEmbedUrl.toString()}
            title="Book your strategy call"
            className="w-full"
            style={{ height: "760px", border: "0" }}
            loading="lazy"
            allow="payment; clipboard-read; clipboard-write"
          />
        </div>

        <p className="text-center text-sm text-[var(--text-muted)]">
          Can&apos;t find a slot that works? Reply to the confirmation email and
          we&apos;ll make it work.
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  // STEP 1: Qualification form
  // ─────────────────────────────────────────────────────────
  return (
    <div className="glass-card rounded-3xl p-8 lg:p-12 border border-[var(--glass-border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />

      {mode === "checkout" && selectedService ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">Let&apos;s get started</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            You&apos;ve selected{" "}
            <strong className="text-white">{selectedService.name}</strong> —{" "}
            <span className="text-white">{selectedService.priceDisplay}</span>
            . Complete this quick form to reserve your spot and proceed to
            secure Stripe checkout.
          </p>
        </>
      ) : mode === "demo" ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">
            Let&apos;s build your custom demo.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            We&apos;ll analyze{" "}
            <strong className="text-white">{urlParam}</strong> and hand-build a
            personalized preview of your AI website + concierge. Share a few
            details so we know what to build, then lock in a strategy call
            slot. Your demo arrives within 15 minutes of submitting.
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">
            Let&apos;s build your custom demo.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Share a few details about your business and we&apos;ll hand-build a
            personalized preview of your AI website + concierge. Then pick a
            strategy call slot. Your demo arrives within 15 minutes.
          </p>
        </>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="Sarah Connor"
            autoComplete="name"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Work Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="sarah@example.com"
            autoComplete="email"
          />
        </div>

        {/* Business Name */}
        <div>
          <label
            htmlFor="business_name"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Business Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="business_name"
            id="business_name"
            required
            value={form.business_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="Acme Aesthetics"
            autoComplete="organization"
          />
        </div>

        {mode !== "checkout" && (
          <>
            {/* Website URL */}
            <div>
              <label
                htmlFor="website_url"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Website URL <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="website_url"
                id="website_url"
                required
                value={form.website_url}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                placeholder="yourbusiness.com"
                autoComplete="url"
                spellCheck={false}
              />
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                We&apos;ll analyze your live site to build your demo. Enter
                &quot;none&quot; if you don&apos;t have one yet.
              </p>
            </div>

            {/* Niche */}
            <div>
              <label
                htmlFor="niche"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Niche <span className="text-red-400">*</span>
              </label>
              <select
                name="niche"
                id="niche"
                required
                value={form.niche}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
              >
                <option value="">Pick one…</option>
                {NICHE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {form.niche === "Other" && (
                <input
                  type="text"
                  name="niche_other"
                  value={form.niche_other}
                  onChange={handleChange}
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                  placeholder="Describe your niche"
                />
              )}
            </div>

            {/* Services */}
            <div>
              <label
                htmlFor="services"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Top 3 services you offer{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="services"
                id="services"
                required
                minLength={10}
                value={form.services}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                placeholder="Botox, laser hair removal, hydrafacial"
              />
            </div>

            {/* Pain Point */}
            <div>
              <label
                htmlFor="pain_point"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                What&apos;s costing you revenue right now?{" "}
                <span className="text-red-400">*</span>
              </label>
              <textarea
                name="pain_point"
                id="pain_point"
                required
                minLength={50}
                rows={4}
                value={form.pain_point}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                placeholder="After-hours calls going unanswered, missed booking opportunities, outdated website, no lead qualification..."
              />
              <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                Specific answers make for a better demo.{" "}
                {form.pain_point.length < 50 ? (
                  <span className="text-red-400">
                    {50 - form.pain_point.length} more characters needed.
                  </span>
                ) : (
                  <span className="text-green-400">Good detail.</span>
                )}
              </p>
            </div>

            {/* Lead Volume */}
            <div>
              <label
                htmlFor="lead_volume"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Roughly how many customer inquiries per week?{" "}
                <span className="text-red-400">*</span>
              </label>
              <select
                name="lead_volume"
                id="lead_volume"
                required
                value={form.lead_volume}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
              >
                <option value="">Pick one…</option>
                {LEAD_VOLUME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Target timeline <span className="text-red-400">*</span>
              </label>
              <select
                name="timeline"
                id="timeline"
                required
                value={form.timeline}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
              >
                <option value="">Pick one…</option>
                {TIMELINE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Tools (optional) */}
            <div>
              <label
                htmlFor="tools"
                className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
              >
                Tools you&apos;re currently using{" "}
                <span className="text-[var(--text-muted)] text-xs">(optional)</span>
              </label>
              <input
                type="text"
                name="tools"
                id="tools"
                value={form.tools}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                placeholder="Zenoti, Square, Mailchimp, Google Calendar"
              />
            </div>
          </>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 relative overflow-hidden group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                {mode === "checkout" ? "Securing spot..." : "Submitting..."}
              </>
            ) : (
              <>
                {mode === "checkout"
                  ? "Continue to Payment"
                  : "Continue to scheduling"}
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </>
            )}
          </button>
          <p className="text-center mt-4 text-xs text-[var(--text-muted)]">
            {mode === "checkout"
              ? "Safely redirected to Stripe Checkout"
              : "No payment at this step. Your demo will be emailed within 15 minutes."}
          </p>
        </div>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <section className="min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <Suspense
            fallback={
              <div className="text-center py-20">
                <Loader2
                  className="animate-spin text-[var(--gold-400)] mx-auto"
                  size={40}
                />
              </div>
            }
          >
            <ApplyForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
