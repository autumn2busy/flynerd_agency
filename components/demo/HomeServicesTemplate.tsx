import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { CheckCircle2, MoveRight, ShieldCheck, Star, Phone } from "lucide-react";
import PhoneChatWidget from "./PhoneChatWidget";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], display: "swap" });

function getNicheServices(niche: string): { title: string; desc: string }[] {
  const lower = niche.toLowerCase();
  if (lower.includes("hvac") || lower.includes("heating") || lower.includes("cooling") || lower.includes("air condition")) {
    return [
      { title: "AC Installation", desc: "High-efficiency systems sized for your home" },
      { title: "Heating Repair", desc: "Same-day diagnosis for all furnace types" },
      { title: "Duct Cleaning", desc: "Remove allergens and improve airflow" },
      { title: "Maintenance Plans", desc: "Seasonal tune-ups to prevent costly breakdowns" },
    ];
  }
  if (lower.includes("plumb")) {
    return [
      { title: "Emergency Repairs", desc: "24/7 response for leaks and flooding" },
      { title: "Drain Cleaning", desc: "Camera inspection and hydro-jetting" },
      { title: "Water Heater", desc: "Installation, repair and tankless upgrades" },
      { title: "Pipe Replacement", desc: "Full repiping with minimal disruption" },
    ];
  }
  if (lower.includes("water damage") || lower.includes("restoration")) {
    return [
      { title: "Emergency Response", desc: "On-site within 60 minutes, 24/7" },
      { title: "Water Extraction", desc: "Industrial-grade pumping and drying" },
      { title: "Mold Remediation", desc: "Safe removal and prevention treatment" },
      { title: "Full Restoration", desc: "Rebuild to pre-loss condition" },
    ];
  }
  if (lower.includes("senior") || lower.includes("home care")) {
    return [
      { title: "Personal Care", desc: "Compassionate daily living assistance" },
      { title: "Medication Mgmt", desc: "Safe, accurate medication reminders" },
      { title: "Companionship", desc: "Meaningful connection and engagement" },
      { title: "Transportation", desc: "Safe rides to appointments and errands" },
    ];
  }
  return [
    { title: "Free Estimate", desc: "No-obligation assessment for your project" },
    { title: "Licensed & Insured", desc: "Fully certified for your protection" },
    { title: "Same-Day Service", desc: "Fast response when you need it most" },
    { title: "Satisfaction Guarantee", desc: "We make it right or it's free" },
  ];
}

interface Props {
  businessName: string;
  niche: string;
  painPoints: string[];
  socialProofPoints: string[];
  rating: number;
  reviewCount: number;
  bookingLink: string;
}

export default function HomeServicesTemplate({
  businessName,
  niche,
  painPoints,
  socialProofPoints,
  rating,
  reviewCount,
  bookingLink,
}: Props) {
  const services = getNicheServices(niche);
  const mailtoHref = `mailto:hello@flynerd.tech?subject=${encodeURIComponent(`Launch ${businessName} Website`)}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Emergency CTA banner */}
      <div
        className="w-full py-2.5 px-4 text-center text-sm font-bold"
        style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
      >
        <Phone size={14} className="inline mr-2 mb-0.5" />
        Available 24/7 for Emergency Service — Don&apos;t Wait, Call Now
      </div>

      {/* Nav */}
      <nav className="sticky top-0 w-full z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl px-8 lg:px-12 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-black text-sm"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            FN
          </div>
          <span
            className={`text-2xl font-black tracking-widest ${bebasNeue.className}`}
            style={{ color: "var(--color-primary)" }}
          >
            FLYNERD DEMO
          </span>
        </div>
        <Link
          href={mailtoHref}
          className="font-black px-6 py-3 rounded-full text-sm flex items-center gap-2 text-black uppercase tracking-wide transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          CLAIM THIS SITE <MoveRight size={16} />
        </Link>
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen flex items-center py-16 px-8 lg:px-12"
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 60%, color-mix(in srgb, var(--color-accent) 8%, #0a0a0a))",
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 space-y-8">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
            >
              ⚡ Exclusive Preview
            </div>

            <h1
              className={`text-7xl lg:text-9xl font-black leading-none uppercase ${bebasNeue.className}`}
            >
              <span style={{ color: "var(--color-primary)" }}>{businessName}</span>
              <br />
              <span className="text-white">Dominates</span>
              <br />
              <span className="text-white/50">Your Market</span>
            </h1>

            <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
              Stop losing jobs to competitors. This site is engineered to convert every click into
              a booked call for your {niche} business.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {rating > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        fill={i < Math.round(rating) ? "var(--color-primary)" : "none"}
                        style={{ color: "var(--color-primary)" }}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-sm">{rating.toFixed(1)}</span>
                  {reviewCount > 0 && (
                    <span className="text-neutral-500 text-xs">({reviewCount})</span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
                <ShieldCheck size={15} style={{ color: "var(--color-primary)" }} />
                <span className="font-bold text-sm">Licensed &amp; Insured</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10">
                <CheckCircle2 size={15} style={{ color: "var(--color-primary)" }} />
                <span className="font-bold text-sm">Background Checked</span>
              </div>
            </div>
          </div>

          {/* Right — phone widget */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-[2.5rem] blur-2xl opacity-20"
                style={{ background: "var(--color-primary)", transform: "scale(0.9)" }}
              />
              <div className="relative">
                <PhoneChatWidget
                  businessName={businessName}
                  niche={niche}
                  bookingLink={bookingLink}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-24 px-8 lg:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <h2
            className={`text-5xl font-black text-center uppercase ${bebasNeue.className}`}
            style={{ color: "var(--color-primary)" }}
          >
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                  }}
                >
                  <CheckCircle2 size={20} style={{ color: "var(--color-primary)" }} />
                </div>
                <h3
                  className={`text-xl font-black uppercase mb-2 ${bebasNeue.className}`}
                >
                  {svc.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review carousel */}
      {socialProofPoints.length > 0 && (
        <section className="py-24 px-8 lg:px-12">
          <div className="max-w-7xl mx-auto space-y-12">
            <h2
              className={`text-5xl font-black text-center uppercase ${bebasNeue.className}`}
              style={{ color: "var(--color-primary)" }}
            >
              Customer Reviews
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {socialProofPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-72 snap-start p-6 rounded-2xl bg-white/[0.04] border border-white/10"
                >
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={13}
                        fill="var(--color-primary)"
                        style={{ color: "var(--color-primary)" }}
                      />
                    ))}
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">&ldquo;{point}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audit Gaps */}
      <section className="py-24 px-8 lg:px-12 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className={`text-5xl font-black uppercase ${bebasNeue.className}`}>
              Current Audit Gaps
            </h2>
            <p className="text-neutral-500">
              Critical issues we identified — your competition is already exploiting these
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 border border-white/5 hover:border-white/20 transition-colors"
              >
                <CheckCircle2 size={18} style={{ color: "var(--color-primary)" }} />
                <span className={`font-black uppercase tracking-widest text-sm ${bebasNeue.className}`}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA section */}
      <section
        className="py-20 px-8 lg:px-12 text-center"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2
            className={`text-5xl font-black uppercase text-white ${bebasNeue.className}`}
          >
            Don&apos;t Lose Another Job to the Competition
          </h2>
          <p className="text-white/75 text-lg">
            This demo site is ready to launch for {businessName} in as little as 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href={mailtoHref}
              className="font-black px-10 py-4 rounded-full text-base uppercase tracking-wide text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              LAUNCH THIS SITE
            </Link>
            <Link
              href={bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black px-10 py-4 rounded-full text-base uppercase tracking-wide text-white border-2 border-white/40 hover:border-white transition-colors"
            >
              BOOK STRATEGY CALL
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-12 text-center text-neutral-600 text-sm tracking-widest uppercase">
        © 2026 Flynerd Tech AI Automation. All rights reserved.
      </footer>
    </div>
  );
}
