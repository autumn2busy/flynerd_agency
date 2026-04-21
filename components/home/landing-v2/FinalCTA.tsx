import Link from "next/link";

// Landing-v2 closer. Replaces the prior "Your field of dreams, built" copy
// with a conversion-focused, price-anchored ask. Primary CTA routes to the
// UL Quickstart detail page where the live Stripe deposit link is one click
// away; secondary CTA routes to the contact form with a topic param so the
// inbound form can segment strategy-call requests from other inquiries.
export default function FinalCTA() {
  return (
    <section className="lv2-cta" id="lv2-cta" aria-label="Start your build">
      <div
        className="lv2-sec-kicker"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        chapter 06 · your move
      </div>

      <h2>Ready when you are.</h2>

      <p>
        Paste your URL. Pay the $750 deposit. Seven days later your concierge
        is live on your site.
      </p>

      <div className="lv2-cta-row">
        <Link
          className="lv2-btn lv2-primary"
          href="/pricing/ai-website-quickstart-ul"
        >
          Start my build — $750 deposit →
        </Link>
        <Link className="lv2-btn lv2-ghost" href="/contact?topic=strategy">
          Book a strategy call
        </Link>
      </div>

      <p className="lv2-cta-trust" aria-label="Trust signals">
        <span>Fixed scope</span>
        <span aria-hidden="true">·</span>
        <span>Fair rates</span>
        <span aria-hidden="true">·</span>
        <span>7-day launch guarantee</span>
      </p>
    </section>
  );
}
