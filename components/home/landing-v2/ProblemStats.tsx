"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  id: string;
  target: number;
  prefix?: string;
  suffix?: string;
  // The width percent to fill the bar to. Matches source data.
  barPct: number;
  label: string;
};

const STATS: Stat[] = [
  { id: "p1", target: 62, suffix: "%", barPct: 62, label: "of inquiries arrive outside business hours" },
  { id: "p2", target: 284, prefix: "$", barPct: 78, label: "average value of a new client relationship" },
  { id: "p3", target: 38, suffix: "%", barPct: 48, label: "of local searches happen after business hours" },
];

function easeOutCubic(p: number) {
  return 1 - Math.pow(1 - p, 3);
}

export default function ProblemStats() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(STATS.map((s) => [s.id, 0])),
  );
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.3 },
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
      setValues(Object.fromEntries(STATS.map((s) => [s.id, s.target])));
      return;
    }

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(p);
      setValues(
        Object.fromEntries(STATS.map((s) => [s.id, Math.round(s.target * eased)])),
      );
      if (p < 1) {
        frame = requestAnimationFrame(step);
      }
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section
      className="lv2-problem"
      ref={sectionRef}
      aria-label="The cost of missed inquiries"
    >
      <div className="lv2-problem-inner">
        <div className="lv2-problem-copy">
          <div className="lv2-sec-kicker warn">chapter 02 · the bleed</div>
          <h2 className="lv2-sec-title">
            Every unanswered inquiry is a <span className="lv2-italic">client</span>
            <br />
            choosing someone else.
          </h2>
        </div>
        <div className="lv2-problem-stats">
          {STATS.map((s) => (
            <div className="lv2-pstat" key={s.id}>
              <div className="lv2-p-bar">
                <span
                  style={{
                    width: inView ? `${s.barPct}%` : "0%",
                  }}
                />
              </div>
              <div className="lv2-p-val">
                {s.prefix ?? ""}
                <span>{values[s.id]}</span>
                {s.suffix ?? ""}
              </div>
              <div className="lv2-p-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
