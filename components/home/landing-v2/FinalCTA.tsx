import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="lv2-cta" id="lv2-cta" aria-label="Call to action">
      <div
        className="lv2-sec-kicker"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        chapter 06 · ship it
      </div>
      <h2>
        Your field of <span className="lv2-italic">dreams,</span> built.
      </h2>
      <p>
        Share your URL. In 7 days you have a site you love and a concierge that
        answers every inquiry for you.
      </p>
      <div className="lv2-cta-row">
        <Link className="lv2-btn lv2-primary" href="/apply?package=build">
          Start my build →
        </Link>
        <Link className="lv2-btn lv2-ghost" href="/contact">
          Talk with a strategist
        </Link>
      </div>
    </section>
  );
}
