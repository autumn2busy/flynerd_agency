import { Playfair_Display } from "next/font/google";
import Link from "next/link";
import { CheckCircle2, MoveRight, Star } from "lucide-react";
import PhoneChatWidget from "./PhoneChatWidget";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });

interface Props {
  businessName: string;
  niche: string;
  painPoints: string[];
  socialProofPoints: string[];
  rating: number;
  reviewCount: number;
  bookingLink: string;
}

export default function MedSpaTemplate({
  businessName,
  niche,
  painPoints,
  socialProofPoints,
  rating,
  reviewCount,
  bookingLink,
}: Props) {
  const mailtoHref = `mailto:hello@flynerd.tech?subject=${encodeURIComponent(`Launch ${businessName} Website`)}`;

  return (
    <div className="min-h-screen text-neutral-900" style={{ background: "#faf9f7" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 w-full z-50 px-8 lg:px-12 py-5 flex justify-between items-center"
        style={{
          background: "rgba(250,249,247,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            FN
          </div>
          <span className="font-bold text-lg tracking-tight text-neutral-800">
            FLYNERD <span style={{ color: "var(--color-primary)" }}>DEMO</span>
          </span>
        </div>
        <Link
          href={mailtoHref}
          className="font-bold px-6 py-3 rounded-full text-sm flex items-center gap-2 text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          CLAIM THIS SITE <MoveRight size={16} />
        </Link>
      </nav>

      {/* Hero — full bleed */}
      <section className="min-h-screen flex items-center pt-28 pb-20 px-8 lg:px-12">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-16">
          {/* Left */}
          <div className="flex-1 space-y-8">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: "color-mix(in srgb, var(--color-primary) 10%, transparent)",
                color: "var(--color-primary)",
                border: "1px solid color-mix(in srgb, var(--color-primary) 25%, transparent)",
              }}
            >
              ✦ Exclusive Preview for {businessName}
            </div>

            <h1
              className={`text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 ${playfair.className}`}
            >
              Elevate {businessName}
              <br />
              <span style={{ color: "var(--color-primary)" }}>to Its Full Potential</span>
            </h1>

            <p className="text-lg text-neutral-500 max-w-lg leading-relaxed">
              A bespoke digital experience crafted for discerning {niche} clients. Where luxury
              meets conversion.
            </p>

            {rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.round(rating) ? "var(--color-primary)" : "none"}
                      style={{ color: "var(--color-primary)" }}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-neutral-700">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <span className="text-sm text-neutral-400">({reviewCount} reviews)</span>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={mailtoHref}
                className="font-bold px-8 py-4 rounded-full text-white text-base flex items-center gap-2 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Launch This Site <MoveRight size={18} />
              </Link>
              <Link
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold px-8 py-4 rounded-full text-base border-2 transition-colors hover:bg-neutral-100"
                style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>

          {/* Right — phone widget */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-25"
                style={{ background: "var(--color-primary)", transform: "scale(0.85)" }}
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

      {/* Testimonials */}
      {socialProofPoints.length > 0 && (
        <section
          className="py-24 px-8 lg:px-12"
          style={{
            background: "color-mix(in srgb, var(--color-primary) 5%, #fff)",
          }}
        >
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <h2
                className={`text-4xl font-bold text-neutral-900 ${playfair.className}`}
              >
                What Clients Are Saying
              </h2>
              <p className="text-neutral-500">Real experiences from real clients</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {socialProofPoints.map((point, i) => (
                <div
                  key={i}
                  className="p-8 rounded-3xl bg-white shadow-sm border"
                  style={{
                    borderColor: "color-mix(in srgb, var(--color-primary) 15%, transparent)",
                  }}
                >
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        fill="var(--color-primary)"
                        style={{ color: "var(--color-primary)" }}
                      />
                    ))}
                  </div>
                  <p
                    className={`text-neutral-600 leading-relaxed italic text-sm ${playfair.className}`}
                  >
                    &ldquo;{point}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Audit Gaps */}
      <section className="py-24 px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-12 text-center">
          <div className="space-y-4">
            <h2 className={`text-4xl font-bold text-neutral-900 ${playfair.className}`}>
              Current Audit Gaps
            </h2>
            <p className="text-neutral-500">
              Areas where your new site creates an immediate advantage
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {painPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-white border shadow-sm"
                style={{
                  borderColor: "color-mix(in srgb, var(--color-primary) 25%, transparent)",
                }}
              >
                <CheckCircle2 size={18} style={{ color: "var(--color-primary)" }} />
                <span className="font-medium text-neutral-700 text-sm uppercase tracking-wide">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-8 lg:px-12 text-center max-w-4xl mx-auto space-y-10">
        <h2 className={`text-5xl lg:text-6xl font-bold leading-tight text-neutral-900 ${playfair.className}`}>
          Ready to attract your
          <br />
          <span style={{ color: "var(--color-primary)" }}>ideal clientele?</span>
        </h2>
        <p className="text-lg text-neutral-500 leading-relaxed">
          This demo is live and ready to be customized with your actual brand, testimonials, and
          booking system. Launched in as little as 48 hours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href={mailtoHref}
            className="font-bold px-10 py-4 rounded-full text-white text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            LAUNCH THIS SITE
          </Link>
          <Link
            href={bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold px-10 py-4 rounded-full text-lg border-2 transition-colors hover:bg-neutral-100"
            style={{ borderColor: "var(--color-primary)", color: "var(--color-primary)" }}
          >
            BOOK STRATEGY CALL
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t py-10 px-12 text-center text-neutral-400 text-sm tracking-widest uppercase"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        © 2026 Flynerd Tech AI Automation. All rights reserved.
      </footer>
    </div>
  );
}
