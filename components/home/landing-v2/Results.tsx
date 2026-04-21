"use client";

import { useEffect, useRef, useState } from "react";

type Metric = {
  id: string;
  target: number;
  prefix?: string;        // rendered literally before the counter
  suffix?: string;        // rendered literally after the counter
  italicPrefix?: string;  // rendered in italic serif before the counter (e.g. "~")
  label: React.ReactNode;
};

// Note: the "URL to live" metric is intentionally "~7 days" here — never 48h.
const METRICS: Metric[] = [
  {
    id: "m1",
    target: 42,
    prefix: "+",
    suffix: "%",
    label: (
      <>
        Bookings captured
        <br />
        after hours
      </>
    ),
  },
  {
    id: "m2",
    target: 3840,
    prefix: "$",
    label: (
      <>
        Avg monthly revenue
        <br />
        recovered
      </>
    ),
  },
  {
    id: "m3",
    target: 7,
    italicPrefix: "~",
    suffix: " days",
    label: (
      <>
        From URL to
        <br />
        live AI site
      </>
    ),
  },
  {
    id: "m4",
    target: 24,
    suffix: "/7",
    label: (
      <>
        Your agent
        <br />
        on the clock
      </>
    ),
  },
];

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export default function Results() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(METRICS.map((m) => [m.id, 0])),
  );
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setValues(Object.fromEntries(METRICS.map((m) => [m.id, m.target])));
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setValues(
        Object.fromEntries(METRICS.map((m) => [m.id, Math.round(m.target * eased)])),
      );
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section
      className="lv2-proof-results"
      ref={sectionRef}
      aria-label="Results"
    >
      <div className="lv2-proof-header">
        <div className="lv2-sec-kicker">chapter 05 · what you get</div>
        <h2 className="lv2-sec-title">
          Measurable lift. <span className="lv2-italic">Week one.</span>
        </h2>
      </div>
      <div className="lv2-proof-grid">
        {METRICS.map((m) => (
          <div className="lv2-metric lv2-up" key={m.id}>
            <div className="lv2-val">
              {m.italicPrefix ? <span className="lv2-italic">{m.italicPrefix}</span> : null}
              {m.prefix ?? ""}
              <span>{values[m.id]}</span>
              {m.suffix ?? ""}
            </div>
            <div className="lv2-lbl">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
