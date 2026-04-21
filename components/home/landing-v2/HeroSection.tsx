"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Headline: "If we build it they will come" — "build" in italic serif.
const HEADLINE_PARTS: Array<{ text: string; italic?: boolean }> = [
  { text: "If we" },
  { text: "build", italic: true },
  { text: "it they will come" },
];

// Build per-word spans with staggered animation delays so the headline
// reveals one word at a time, mirroring the source HTML behavior.
function renderHeadline() {
  const out: React.ReactNode[] = [];
  let wordIdx = 0;

  HEADLINE_PARTS.forEach((part, pi) => {
    const words = part.text.split(" ");
    const isLastPart = pi === HEADLINE_PARTS.length - 1;

    const wordNodes = words.map((w, wi) => {
      const isLastWordOfPart = wi === words.length - 1;
      const trailingSpace = !isLastWordOfPart || !isLastPart ? " " : "";
      const style: React.CSSProperties = {
        animationDelay: `${(0.15 + wordIdx * 0.06).toFixed(2)}s`,
      };
      if (part.italic && isLastWordOfPart && !isLastPart) {
        // Italic glyphs overhang right — add spacing before the next word.
        style.marginRight = "0.22em";
      }
      const node = (
        <span className="lv2-word" style={style} key={`${pi}-${wi}`}>
          {w + trailingSpace}
        </span>
      );
      wordIdx += 1;
      return node;
    });

    if (part.italic) {
      out.push(
        <span className="lv2-italic" key={`p-${pi}`}>
          {wordNodes}
        </span>,
      );
    } else {
      out.push(
        <span key={`p-${pi}`}>{wordNodes}</span>,
      );
    }
  });

  return out;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export default function HeroSection() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const cleaned = normalizeUrl(url);
    if (!cleaned) {
      setError("Please enter your website URL");
      return;
    }
    setError(null);
    setSubmitting(true);
    // Hand off to /apply with the URL as a query param so the application
    // form can pre-fill or log it. /apply is an existing route in the app.
    const target = `/apply?url=${encodeURIComponent(cleaned)}`;
    router.push(target);
  }

  return (
    <section className="lv2-hero" aria-label="Hero">
      <div className="lv2-hero-inner">
        <span className="lv2-eyebrow" aria-hidden="true">
          <span className="lv2-dot" />
          <span>
            <strong>Live</strong>&nbsp;·&nbsp;AI websites for premium service practices
          </span>
        </span>

        <h1 className="lv2-headline">{renderHeadline()}</h1>

        <p className="lv2-sub">
          Share your URL. We hand-build a site and an always-on concierge that answers every
          inquiry, books real appointments, and sounds unmistakably like you.
        </p>

        <form className="lv2-input-shell" onSubmit={onSubmit} noValidate>
          <span className="lv2-input-glow" aria-hidden="true" />
          <div className="lv2-input-row">
            <svg
              className="lv2-prefix"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <label htmlFor="lv2-url-input" className="sr-only" style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
              Your website URL
            </label>
            <input
              id="lv2-url-input"
              className="lv2-url-input"
              type="text"
              inputMode="url"
              placeholder="yourbusiness.com"
              autoComplete="off"
              spellCheck={false}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Your website URL"
              aria-invalid={error ? true : undefined}
              disabled={submitting}
            />
            <button
              className="lv2-submit-btn"
              type="submit"
              aria-label="Build my site"
              disabled={submitting}
            >
              <span className="lv2-submit-label">
                {submitting ? "Queued…" : "Build my site"}
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          {error ? (
            <div role="alert" className="lv2-input-error">
              {error}
            </div>
          ) : null}
        </form>

        <div className="lv2-alt-cta">
          No website yet? <a href="/contact">Start from scratch →</a>
        </div>

        <a className="lv2-scroll-hint" href="#lv2-how" aria-label="Scroll to learn more">
          <span>Scroll</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
