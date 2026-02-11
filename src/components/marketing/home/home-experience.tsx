"use client";

import { useEffect, useMemo, useState } from "react";
import { Segment } from "@/lib/design-tokens";
import { getOrderedServices, segmentContent } from "./data/segment-content";
import { HeroWithAmbientVideo } from "./hero-with-ambient-video";
import { SidebarShell } from "./sidebar-shell";
import { ServiceCard } from "./service-card";

const STORAGE_KEY = "flynerd-segment";

export function HomeExperience({ initialSegment }: { initialSegment: Segment }) {
  const [segment, setSegment] = useState<Segment>(initialSegment);
  const orderedServices = useMemo(() => getOrderedServices(segment), [segment]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Segment | null;
    if (stored) {
      setSegment(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, segment);
    document.cookie = `flynerd_segment=${segment}; path=/; max-age=${60 * 60 * 24 * 120}`;
  }, [segment]);

  return (
    <div className="relative min-h-screen bg-[#050811] text-slate-100">
      <SidebarShell segment={segment} onSegmentChange={setSegment} />

      <div className="relative ml-0 p-4 pt-16 lg:ml-80 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-12">
          <HeroWithAmbientVideo segment={segment} />

          <section id="services" className="space-y-5">
            <div>
              <h2 className="text-3xl font-semibold">Automation services, tuned to your segment</h2>
              <p className="mt-2 max-w-3xl text-slate-300">
                Interactive solution cards modeled like product modules—clear value, transparent inputs, and measurable outcomes.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {orderedServices.map((item, index) => (
                <ServiceCard key={item.title} item={item} index={index} />
              ))}
            </div>
          </section>

          <section id="proof" className="grid gap-6 rounded-3xl border border-slate-700/60 bg-slate-950/70 p-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold">How we work</h2>
              <ol className="mt-4 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                {[
                  ["01", "Discover", "Truth over hype. We map what is actually happening across channels and teams."],
                  ["02", "Design", "Human-first journeys with clear conversion checkpoints and fallback logic."],
                  ["03", "Build", "Enterprise guardrails from day one: consent, policy checks, and role access."],
                  ["04", "Optimize", "Measured iteration loops backed by leading indicators and revenue outcomes."],
                ].map(([num, title, description]) => (
                  <li key={title} className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-xs text-blue-300">{num}</p>
                    <p className="mt-1 font-semibold text-white">{title}</p>
                    <p className="mt-1 text-slate-300">{description}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Proof with methodology</h3>
              {segmentContent[segment].proofRow.map((tile) => (
                <div key={tile.label} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
                  <div className="flex items-end justify-between">
                    <p className="text-sm text-slate-300">{tile.label}</p>
                    <p className="text-2xl font-semibold text-white">{tile.value}</p>
                  </div>
                  <details className="mt-2 text-xs text-slate-400">
                    <summary className="cursor-pointer">Measurement methodology</summary>
                    <p className="mt-1">{tile.method}</p>
                  </details>
                </div>
              ))}
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 text-sm text-slate-300">
                <p className="font-semibold text-slate-100">Case snippet</p>
                <p className="mt-1">Problem: inconsistent follow-up between teams. Intervention: unified automation + approval gates. Result: higher conversion and fewer compliance exceptions.</p>
              </div>
            </div>
          </section>

          <section id="resources" className="rounded-3xl border border-slate-700/60 bg-slate-950/70 p-6">
            <h2 className="text-2xl font-semibold">Conversion paths that stay visible</h2>
            <p className="mt-2 text-slate-300">Primary CTA: {segmentContent[segment].ctaLabel}. Secondary CTA: {segmentContent[segment].blueprintLabel}.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
