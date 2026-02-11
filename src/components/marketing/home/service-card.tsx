"use client";

import { useState } from "react";
import { ServiceItem } from "./data/segment-content";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="group rounded-2xl border border-slate-700/70 bg-slate-950/80 p-5 text-left transition duration-300 ease-out hover:-translate-y-1 hover:border-blue-400/70 hover:shadow-[0_16px_36px_rgba(79,124,255,0.25)]"
          style={{ animationDelay: `${index * 90}ms` }}
        >
          <p className="text-lg font-semibold text-slate-100">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.signals.map((signal) => (
              <span key={signal} className="rounded-full border border-slate-600/70 bg-slate-900 px-2 py-1 text-[11px] text-slate-300">
                {signal}
              </span>
            ))}
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="border-slate-700 bg-[#080d1a] text-slate-100 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{item.title}</DialogTitle>
        </DialogHeader>
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-slate-400">What it does</dt>
            <dd>{item.details.what}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Typical timeline</dt>
            <dd>{item.details.timeline}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Inputs needed</dt>
            <dd>{item.details.inputs}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Example outcomes</dt>
            <dd>{item.details.outcomes}</dd>
          </div>
        </dl>
      </DialogContent>
    </Dialog>
  );
}
