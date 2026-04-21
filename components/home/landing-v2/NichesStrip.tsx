const NICHES = [
  "Med Spa",
  "Estate Law",
  "Wellness",
  "Private Dental",
  "Aesthetics",
  "Concierge Health",
  "Home Services",
  "Bespoke Trades",
];

export default function NichesStrip() {
  return (
    <section className="lv2-niches" aria-label="Industries we serve">
      <div className="lv2-niches-inner">
        <span className="lv2-niches-label">Built for premium service practices</span>
        <div className="lv2-niches-row">
          {NICHES.map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
