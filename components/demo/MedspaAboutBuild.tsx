"use client";

interface Props {
  businessName: string;
  painPoints: string[];
  primaryColor: string;
}

const GENERIC_PAIN_FALLBACKS = [
  "After-hours conversion, locked down.",
  "Missed-call recovery with an AI that books the slot.",
  "Review aggregation that updates on its own.",
];

/**
 * Section F: "What we built for you" — three personalized tiles, one per
 * detected pain point. Falls back to generic medspa improvements when Yonce
 * intel is thin. No CTAs on the tiles (CTAs live in Section G).
 * See docs/medspa-demo-template-spec.md Section F.
 */
export default function MedspaAboutBuild({ businessName, painPoints, primaryColor }: Props) {
  const tiles = [0, 1, 2].map((i) => {
    const pain = painPoints[i];
    if (pain) return pain;
    return GENERIC_PAIN_FALLBACKS[i];
  });

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FFFFFF" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mb-12">
          <p
            className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: primaryColor }}
          >
            What we built for you
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            Three fixes for {businessName}.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: "#555555" }}>
            Based on what we read from your reviews, your website, and what comparable operators in your market already ship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {tiles.map((tile, i) => (
            <Tile
              key={i}
              index={i + 1}
              headline={toHeadline(tile)}
              body={toBody(tile)}
              primaryColor={primaryColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function toHeadline(pain: string): string {
  // Pain points often come as lowercase phrases from Yonce. Title-case the first word.
  const trimmed = pain.trim().replace(/\.$/, "");
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1) + ".";
}

function toBody(pain: string): string {
  const lower = pain.toLowerCase();
  if (lower.includes("after-hours") || lower.includes("after hours")) {
    return "The AI booking assistant handles inquiries overnight and reserves the slot for morning confirmation.";
  }
  if (lower.includes("missed") && lower.includes("call")) {
    return "Missed calls auto-fire a text back with a booking link and an AI conversation that gets the appointment.";
  }
  if (lower.includes("review")) {
    return "Reviews pull live from Google and Yelp, with pre-approved highlights rotating through the hero.";
  }
  if (lower.includes("booking") || lower.includes("book")) {
    return "The AI answers common objections, quotes typical ranges, and hands the confirmed slot to your booking platform.";
  }
  return "We wired the AI layer to remove this friction while keeping your booking platform as the system of record.";
}

function Tile({
  index,
  headline,
  body,
  primaryColor,
}: {
  index: number;
  headline: string;
  body: string;
  primaryColor: string;
}) {
  return (
    <div className="rounded-2xl border bg-[#FAF9F6] p-7 md:p-8" style={{ borderColor: "#E8E5DF" }}>
      <div
        className="text-xs uppercase tracking-[0.18em] font-semibold mb-4"
        style={{ color: primaryColor }}
      >
        0{index}
      </div>
      <h3
        className="text-xl md:text-2xl leading-tight mb-3"
        style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
      >
        {headline}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#555555" }}>
        {body}
      </p>
    </div>
  );
}
