"use client";

import { useState } from "react";
import { ChevronDown, Menu, Plus, Radio } from "lucide-react";
import { Segment } from "@/lib/design-tokens";
import { SegmentToggle } from "./segment-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Automations",
    items: ["Franchise Growth Engine", "Multi-Location Attribution", "Lifecycle Nurture + Re-activation"],
  },
  {
    label: "Member Hubs",
    items: ["Onboarding + Gating", "Retention Loops", "AI Resume/Match Workflows"],
  },
];

const links = ["Proof", "Resources", "About"];

export function SidebarShell({
  segment,
  onSegmentChange,
}: {
  segment: Segment;
  onSegmentChange: (next: Segment) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["Automations", "Member Hubs"]);

  const toggleGroup = (group: string) => {
    setOpenGroups((prev) => (prev.includes(group) ? prev.filter((item) => item !== group) : [...prev, group]));
  };

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-700 bg-slate-950/90 p-2 text-slate-100 lg:hidden"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        <Menu className="h-5 w-5" />
      </button>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 border-r border-slate-800/80 bg-[#090d1a]/95 p-4 backdrop-blur xl:w-[21rem]",
          "transition-transform duration-300 ease-out lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-100">Fly Nerd Tech</p>
                <p className="text-xs text-slate-400">Authenticity is the new Authority.</p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/35 px-2 py-1 text-[11px] text-emerald-300">
                <Radio className="h-3 w-3" /> Available
              </span>
            </div>
          </div>

          <Button className="mb-5 w-full justify-start gap-2 bg-slate-100 text-slate-900 hover:bg-white" size="sm">
            <Plus className="h-4 w-4" /> Start an Automation Audit
          </Button>

          <nav className="flex-1 space-y-2 overflow-y-auto pr-1" aria-label="Primary">
            {navGroups.map((group) => {
              const open = openGroups.includes(group.label);
              return (
                <div key={group.label} className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-2">
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.label)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm text-slate-200 hover:bg-slate-800/70"
                    aria-expanded={open}
                  >
                    {group.label}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                  </button>
                  {open && (
                    <ul className="mt-2 space-y-1 px-2 pb-1">
                      {group.items.map((item) => (
                        <li key={item}>
                          <a href="#services" className="block rounded-md px-2 py-1 text-sm text-slate-400 hover:bg-slate-800/70 hover:text-slate-100">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}

            <ul className="space-y-1 pt-2">
              {links.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/70 hover:text-slate-100"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 space-y-3 border-t border-slate-800/70 pt-4">
            <Button className="w-full bg-blue-500 text-white hover:bg-blue-400">Book a Strategy Call</Button>
            <SegmentToggle value={segment} onChange={onSegmentChange} />
          </div>
        </div>
      </aside>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}
    </>
  );
}
