"use client";

import Link from "next/link";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/home/ScrollReveal";

export default function GrowthCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#0a0a0c] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div
              className="p-10 lg:p-14 rounded-3xl relative overflow-hidden interactive-glow"
              style={{ background: "rgba(232,185,35,0.04)", border: "1px solid rgba(232,185,35,0.15)" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
                e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
              }}
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[radial-gradient(circle,rgba(220,38,38,0.06)_0%,transparent_70%)]" />
              <div className="relative z-10">
                <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-[#E8B923] mb-5">
                  For Growth-Minded Businesses
                </span>
                <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black text-white mb-4 leading-tight">
                  Want this system<br />for your own business?
                </h2>
                <p className="text-white/50 mb-8 max-w-2xl leading-relaxed">
                  The same Scout → Intel → Builder pipeline we use to deliver client sites can be deployed
                  for your business — finding your own leads, building personalized demos, and closing automatically.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Your own Scout agent (finds leads matching your ICP)",
                    "Your own Intel agent (analyzes and scores prospects)",
                    "Automated personalized outreach at scale",
                    "Built on n8n, ActiveCampaign, and Vercel",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                      <CheckCircle size={15} className="text-[#E8B923] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact?package=agent"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-black text-black transition-all active:scale-[0.97] hover:shadow-[0_20px_60px_rgba(232,185,35,0.3)]"
                    style={{ background: "linear-gradient(135deg, #B8860B, #E8B923, #FFD93D)" }}
                  >
                    Book a Strategy Call <ArrowUpRight size={16} />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/15 hover:border-white/30 transition-all active:scale-[0.97]"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
