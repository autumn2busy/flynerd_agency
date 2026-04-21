"use client";

import { useEffect, useRef, useState } from "react";

type Stage = {
  id: string;
  title: string;
  sub: string;
  branch: string;
  // seconds from the first reveal until this row "starts building"
  d: number;
};

const STAGES: Stage[] = [
  { id: "Stage 01", title: "Discovery · We learn your practice", sub: "services · clientele · voice · point of view", branch: "no calls", d: 0 },
  { id: "Stage 02", title: "Craft · Site + digital employee", sub: "design · copy · trained on your practice", branch: "hand built", d: 1.4 },
  { id: "Stage 03", title: "Preview · A private link, just for you", sub: "review · refine · approve", branch: "your eyes only", d: 2.8 },
  { id: "Stage 04", title: "Launch · Site and concierge go live", sub: "domain · calendar · phone coverage", branch: "go live", d: 4.2 },
  { id: "Stage 05", title: "Engage · First client conversation", sub: "question asked · intent understood", branch: "live", d: 5.6 },
  { id: "Stage 06", title: "Book · Appointment confirmed", sub: "calendar · confirmation · reminders", branch: "on your calendar", d: 7.0 },
  { id: "Stage 07", title: "Retain · Gentle follow-up", sub: "reviews · re-engagement · loyalty", branch: "ongoing", d: 8.4 },
];

const WHEN_COPY = ["2m ago", "90s ago", "74s ago", "58s ago", "41s ago", "22s ago", "just now"];
const DUR_COPY = ["3.2s", "8.7s", "2.1s", "14s", "0.9s", "1.4s", "—"];

type RowState = {
  state: "queued" | "building" | "ready";
  label: string;
  dur: string;
  when: string;
  revealed: boolean;
};

const INITIAL_ROW: RowState = {
  state: "queued",
  label: "Queued",
  dur: "—",
  when: "—",
  revealed: false,
};

export default function LifecycleTable() {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const [rowStates, setRowStates] = useState<RowState[]>(() =>
    STAGES.map(() => ({ ...INITIAL_ROW })),
  );

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let played = false;
    const timers: number[] = [];

    function play() {
      if (played) return;
      played = true;

      if (reduced) {
        // Instantly mark everything ready for reduced motion.
        setRowStates(
          STAGES.map((_, i) => ({
            state: "ready" as const,
            label: "Ready",
            dur: DUR_COPY[i] ?? "—",
            when: WHEN_COPY[i] ?? "just now",
            revealed: true,
          })),
        );
        return;
      }

      STAGES.forEach((stage, i) => {
        const delay = stage.d * 1000;
        // Reveal the row (fade in) and begin "building".
        timers.push(
          window.setTimeout(() => {
            setRowStates((prev) => {
              const next = prev.slice();
              next[i] = { ...next[i], revealed: true, state: "building", label: "Building", dur: "…" };
              return next;
            });
          }, delay),
        );
        // Transition to "ready" shortly after.
        timers.push(
          window.setTimeout(() => {
            setRowStates((prev) => {
              const next = prev.slice();
              next[i] = {
                ...next[i],
                state: "ready",
                label: "Ready",
                dur: DUR_COPY[i] ?? "—",
                when: WHEN_COPY[i] ?? "just now",
              };
              return next;
            });
          }, delay + 900),
        );
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            play();
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <section className="lv2-lifecycle" id="lv2-lifecycle" aria-label="Lifecycle">
      <div className="lv2-stage-inner">
        <div className="lv2-sec-kicker">chapter 04 · how we deliver</div>
        <h2 className="lv2-sec-title">
          Every stage, <span className="lv2-italic">in the open</span>.
        </h2>
        <p className="lv2-lifecycle-lede">
          From first discovery to your clients booking themselves in, each step of the build
          is timestamped and visible. No black box. No agency mystery. Just a calm,
          transparent launch.
        </p>

        <div
          className="lv2-deploy-table"
          role="table"
          aria-label="How we deliver"
          ref={tableRef}
        >
          <div className="lv2-deploy-head" role="row">
            <div role="columnheader">Stage</div>
            <div role="columnheader">Status</div>
            <div role="columnheader">Duration</div>
            <div role="columnheader">Detail</div>
            <div role="columnheader">When</div>
          </div>

          {STAGES.map((stage, i) => {
            const rs = rowStates[i];
            return (
              <div
                className={`lv2-deploy-row${rs.revealed ? " lv2-in-view" : ""}`}
                data-state={rs.state === "queued" ? undefined : rs.state}
                role="row"
                key={stage.id}
              >
                <div className="lv2-cell lv2-cell-stage">
                  <div className="lv2-d-id">{stage.id}</div>
                  <div className="lv2-d-title">{stage.title}</div>
                  <div className="lv2-d-sub">{stage.sub}</div>
                </div>
                {/* Desktop cells */}
                <div className="lv2-cell lv2-cell-status">
                  <span className="lv2-dot" />
                  <span className="lv2-label">{rs.label}</span>
                </div>
                <div className="lv2-cell lv2-cell-dur">{rs.dur}</div>
                <div className="lv2-cell lv2-cell-src">
                  <span className="lv2-branch">{stage.branch}</span>
                </div>
                <div className="lv2-cell lv2-cell-when">{rs.when}</div>
                {/* Mobile stacked meta */}
                <div className="lv2-cell-meta-wrap">
                  <div className="lv2-meta-pair">
                    <span className="lv2-meta-label">Status</span>
                    <span className="lv2-meta-value">
                      <span
                        className="lv2-dot"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background:
                            rs.state === "ready"
                              ? "oklch(78% 0.2 142)"
                              : rs.state === "building"
                              ? "oklch(78% 0.18 65)"
                              : "#3a3a42",
                          boxShadow:
                            rs.state === "ready"
                              ? "0 0 10px oklch(78% 0.2 142 / 0.85)"
                              : rs.state === "building"
                              ? "0 0 10px oklch(78% 0.18 65 / 0.8)"
                              : "none",
                        }}
                      />
                      {rs.label}
                    </span>
                  </div>
                  <div className="lv2-meta-pair">
                    <span className="lv2-meta-label">Duration</span>
                    <span className="lv2-meta-value">{rs.dur}</span>
                  </div>
                  <div className="lv2-meta-pair">
                    <span className="lv2-meta-label">Detail</span>
                    <span className="lv2-meta-value">{stage.branch}</span>
                  </div>
                  <div className="lv2-meta-pair">
                    <span className="lv2-meta-label">When</span>
                    <span className="lv2-meta-value">{rs.when}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lv2-deploy-foot">
          <span className="lv2-deploy-foot-live">
            <span className="lv2-pulse" />
            Launch live
          </span>
          <span className="lv2-deploy-foot-meta">
            7 stages · 7 days to launch · fully transparent
          </span>
        </div>
      </div>
    </section>
  );
}
