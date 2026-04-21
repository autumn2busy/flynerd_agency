const STEPS = [
  {
    num: "STEP 01",
    title: "We learn your practice.",
    body:
      "Your services, pricing, voice, and point of view. Quietly sourced from what's already out there. No forms, no calls, no fuss.",
    glyph: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    num: "STEP 02",
    title: "We craft your site + digital employee.",
    body:
      "A bespoke site and an always-on concierge trained on your practice. Hand-finished. Polished. Fully yours.",
    glyph: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    num: "STEP 03",
    title: "Clients book themselves.",
    body:
      "Visitors get elegant, accurate answers. Qualified appointments land on your calendar while you're with clients, asleep, or simply living your life.",
    glyph: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="lv2-stage" id="lv2-how" aria-label="How it works">
      <div className="lv2-stage-inner">
        <div className="lv2-sec-kicker">chapter 03 · the fix</div>
        <h2 className="lv2-sec-title">
          From a single URL to a working revenue engine in{" "}
          <span className="lv2-italic">7 days.</span>
        </h2>

        <div className="lv2-flow">
          {STEPS.map((s) => (
            <div className="lv2-flow-cell" key={s.num}>
              <div className="lv2-step-num">{s.num}</div>
              <div className="lv2-step-glyph">{s.glyph}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
