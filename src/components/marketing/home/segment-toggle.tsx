"use client";

import { Segment } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

const options: { label: string; value: Segment }[] = [
  { label: "Franchise", value: "franchise" },
  { label: "Member Hub", value: "memberhub" },
  { label: "Enterprise Ops", value: "enterprise" },
];

export function SegmentToggle({ value, onChange }: { value: Segment; onChange: (next: Segment) => void }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-1" role="tablist" aria-label="Audience segment selector">
      <div className="grid grid-cols-3 gap-1 text-xs">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={value === option.value}
            className={cn(
              "rounded-lg px-2 py-2 font-medium transition-colors",
              value === option.value
                ? "bg-blue-500/20 text-blue-100"
                : "text-slate-300 hover:bg-slate-800 hover:text-slate-100"
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
