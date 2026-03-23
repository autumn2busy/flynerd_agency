"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "@/components/home/ScrollReveal";

export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 bg-[#070709] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] bg-[radial-gradient(ellipse,rgba(232,185,35,0.07)_0%,transparent_70%)] -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(220,38,38,0.05)_0%,transparent_70%)] -translate-y-1/2" />
      </div>
      <div className="section-container relative z-10">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-white mb-6 leading-[1.05]">
              Ready for a site that{" "}
              <span className="bg-gradient-to-r from-[#B8860B] via-[#E8B923] to-[#FFD93D] bg-clip-text text-transparent">
                works while you sleep?
              </span>
            </h2>
            <p className="text-lg text-white/40 mb-10 leading-relaxed">
              Free 20-minute strategy call. We&apos;ll show you exactly what your AI-powered
              site would look like — no templates, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-black text-black transition-all active:scale-[0.97] hover:shadow-[0_20px_60px_rgba(232,185,35,0.3)]"
                style={{ background: "linear-gradient(135deg, #B8860B, #E8B923, #FFD93D)", boxShadow: "0 0 40px rgba(232,185,35,0.25)" }}
              >
                Book a Free Call <ArrowUpRight size={18} />
              </Link>
              <Link
                href="/ai-website"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold text-white border border-white/12 hover:border-white/25 transition-all active:scale-[0.97]"
              >
                See the Product
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
