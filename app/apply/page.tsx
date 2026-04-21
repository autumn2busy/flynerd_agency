"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Loader2 } from "lucide-react";
import { SERVICES } from "@/app/pricing/services-data";

// Alias table mirrors the one in /api/apply/route.ts so legacy deep links
// like ?package=build still resolve to the right services-data slug for
// display purposes on this page.
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

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const packageParam = searchParams.get("package");
  const urlParam = searchParams.get("url");
  const selectedService = resolveServiceFromQuery(packageParam);

  // Three modes based on query params:
  //   "checkout" — explicit package selection, route to Stripe on submit
  //   "demo"     — URL capture from hero, no package chosen, route to
  //                /thanks?flow=demo-pending on submit
  //   "intake"   — neither; generic intake
  const mode: "checkout" | "demo" | "intake" = selectedService
    ? "checkout"
    : urlParam
      ? "demo"
      : "intake";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business_name: "",
    website_url: urlParam ?? "",
    packageName: selectedService?.slug ?? "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // If URL changes after first render (rare but possible on SPA nav), sync.
  useEffect(() => {
    if (urlParam && !formData.website_url) {
      setFormData((prev) => ({ ...prev, website_url: urlParam }));
    }
  }, [urlParam, formData.website_url]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.name || !formData.business_name) {
      setError("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.mode === "checkout" && data.stripeUrl) {
        window.location.href = data.stripeUrl;
        return;
      }

      if (res.ok && data.mode === "demo-pending") {
        router.push(data.redirect ?? "/thanks?flow=demo-pending");
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

  return (
    <div className="glass-card rounded-3xl p-8 lg:p-12 border border-[var(--glass-border)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />

      {mode === "checkout" && selectedService ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">Let&apos;s get started</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            You&apos;ve selected{" "}
            <strong className="text-white">{selectedService.name}</strong> —{" "}
            <span className="text-white">{selectedService.priceDisplay}</span>{" "}
            <span className="text-xs text-[var(--text-muted)]">
              ({selectedService.priceSub})
            </span>
            . Complete this quick form to reserve your spot and proceed to
            secure Stripe checkout.
          </p>
        </>
      ) : mode === "demo" ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">
            We&apos;ll build your preview.
          </h2>
          <p className="text-[var(--text-secondary)] mb-8">
            We&apos;ll analyze <strong className="text-white">{urlParam}</strong> and
            hand-build a personalized site + concierge demo from your real
            reputation data. Tell us how to reach you and we&apos;ll email the
            demo as soon as it&apos;s ready (usually within one business day).
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">Tell us about your business</h2>
          <p className="text-[var(--text-secondary)] mb-8">
            Share a few details and we&apos;ll recommend the best next step —
            demo build, audit, or a strategy call.
          </p>
        </>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="Sarah Connor"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Work Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="sarah@example.com"
            autoComplete="email"
          />
        </div>
        <div>
          <label
            htmlFor="business_name"
            className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
          >
            Business Name
          </label>
          <input
            type="text"
            name="business_name"
            id="business_name"
            required
            value={formData.business_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
            placeholder="Acme Home Services"
            autoComplete="organization"
          />
        </div>

        {/* Website URL — shown only in demo + intake modes. In checkout mode
            the URL isn't required because the prospect is paying first. */}
        {mode !== "checkout" && (
          <div>
            <label
              htmlFor="website_url"
              className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]"
            >
              Website URL {mode === "intake" && (
                <span className="text-[var(--text-muted)] text-xs">(optional)</span>
              )}
            </label>
            <input
              type="text"
              name="website_url"
              id="website_url"
              value={formData.website_url}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
              placeholder="yourbusiness.com"
              autoComplete="url"
              spellCheck={false}
            />
          </div>
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
                  : mode === "demo"
                    ? "Build my demo"
                    : "Send"}
                <ArrowUpRight
                  size={20}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </>
            )}
          </button>
          {mode === "checkout" && (
            <p className="flex items-center justify-center gap-1.5 mt-4 text-xs text-[var(--text-muted)]">
              <ShieldCheck size={14} /> Safely redirected to Stripe Checkout
            </p>
          )}
          {mode !== "checkout" && (
            <p className="text-center mt-4 text-xs text-[var(--text-muted)]">
              We&apos;ll email your demo link once it&apos;s ready. No payment
              required at this step.
            </p>
          )}
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
