"use client";

import { Segment } from "@/lib/design-tokens";
import { segmentContent } from "./data/segment-content";
import { Button } from "@/components/ui/button";

export function HeroWithAmbientVideo({ segment }: { segment: Segment }) {
  const content = segmentContent[segment];

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-slate-700/60 bg-slate-950/55 p-6 sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/images/ambient-poster.svg"
          aria-hidden
        >
          <source src="/video/ambient-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(110,168,255,0.30),transparent_45%),radial-gradient(circle_at_85%_15%,rgba(52,211,153,0.20),transparent_40%)]" />
      </div>

      <div className="relative grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="max-w-2xl space-y-6">
          <p className="inline-flex rounded-full border border-slate-600/70 bg-slate-950/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
            Fly Nerd Tech · AI Automation Agency
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
            Authenticity is the new Authority.
          </h1>
          <p className="text-lg text-slate-200">{content.heroSubline}</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-500 text-white hover:bg-blue-400">{content.ctaLabel}</Button>
            <Button variant="outline" className="border-slate-500 bg-slate-950/70 text-slate-100 hover:bg-slate-800">
              {content.blueprintLabel}
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-500/50 bg-[#0a1124]/85 p-3 shadow-2xl shadow-blue-500/20">
          <div className="rounded-xl border border-slate-700 bg-slate-950/90 p-4">
            <p className="rounded-xl bg-slate-800/80 px-3 py-2 text-sm text-slate-100">
              Create a {segment === "franchise" ? "franchise" : segment === "memberhub" ? "member hub" : "cross-team"} follow-up automation.
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p><span className="text-slate-100">Workflow:</span> ingest lead signal → classify intent → route within SLA.</p>
              <p><span className="text-slate-100">KPI Watch:</span> response-time, qualified rate, assist-to-close velocity.</p>
              <p><span className="text-slate-100">Governance:</span> opt-in guardrails, role approvals, complete audit log.</p>
            </div>
            <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/80 p-3 text-xs text-slate-400">
              Status: live in sandbox · Observability enabled · Measured weekly.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
