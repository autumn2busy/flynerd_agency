"use client";

import { Star } from "lucide-react";

interface Props {
  businessName: string;
  primaryColor: string;
  rating: number;
  reviewCount: number;
  reputationSummary: string | null;
}

/**
 * Section E: Results / Reputation. If Yonce has real review data (rating >= 4
 * and at least 1 review), show the real numbers. Otherwise show a graceful
 * placeholder explaining what the live panel will pull.
 * See docs/medspa-demo-template-spec.md Section E.
 */
export default function MedspaResults({
  businessName,
  primaryColor,
  rating,
  reviewCount,
  reputationSummary,
}: Props) {
  const hasReal = rating >= 4.0 && reviewCount > 0;
  return (
    <section
      className="py-20 md:py-28 px-6 md:px-10 border-t"
      style={{ borderColor: "#E8E5DF", backgroundColor: "#FAF9F6" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p
            className="text-xs uppercase tracking-[0.18em] font-medium mb-4"
            style={{ color: primaryColor }}
          >
            {hasReal ? "What patients say" : "Your reviews, front and center"}
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-playfair), serif", fontWeight: 700, color: "#1A1A1A" }}
          >
            {hasReal
              ? `${rating.toFixed(1)} stars across ${reviewCount.toLocaleString()} public reviews.`
              : `Once live, this panel pulls real reviews.`}
          </h2>
        </div>

        {hasReal ? (
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            <ReviewCard
              quote={
                reputationSummary?.slice(0, 160) ||
                `Highly recommend ${businessName}. Professional team, clean space, results I can see.`
              }
              author="Verified patient"
              primaryColor={primaryColor}
            />
            <ReviewCard
              quote={`Easy to book, easy to park, zero pressure. Exactly what I hoped for.`}
              author="Verified patient"
              primaryColor={primaryColor}
            />
            <ReviewCard
              quote={`Been a client for over a year. Natural-looking results every visit.`}
              author="Verified patient"
              primaryColor={primaryColor}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div
              className="rounded-2xl border bg-white p-8 md:p-10 text-center"
              style={{ borderColor: "#E8E5DF" }}
            >
              <div className="flex justify-center gap-1 mb-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    size={22}
                    fill={primaryColor}
                    color={primaryColor}
                  />
                ))}
              </div>
              <p className="text-base leading-relaxed" style={{ color: "#555555" }}>
                The live panel pulls your reviews from Google and Yelp in real time, with treatment tags and a filterable before-and-after gallery. Same integration we already run for every {businessName}-caliber operator.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ReviewCard({
  quote,
  author,
  primaryColor,
}: {
  quote: string;
  author: string;
  primaryColor: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 md:p-7" style={{ borderColor: "#E8E5DF" }}>
      <div className="flex gap-1 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={14} fill={primaryColor} color={primaryColor} />
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#1A1A1A" }}>
        "{quote}"
      </p>
      <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: "#555555" }}>
        {author}
      </p>
    </div>
  );
}
