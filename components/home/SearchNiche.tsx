"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, TrendingUp } from "lucide-react";

const popularNiches = [
  { label: "HVAC", key: "hvac" },
  { label: "Family Law", key: "divorce_law" },
  { label: "Fertility Clinics", key: "fertility" },
  { label: "Solar Installers", key: "solar" },
  { label: "Workers Comp", key: "workers_comp" },
  { label: "Orthodontics", key: "orthodontics" },
];

export default function SearchNiche() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    const nicheKey = query.toLowerCase().trim().replace(/\s+/g, "_").replace(/&/g, "and");
    router.push(`/niche/${nicheKey}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative group">
        {/* Ambient glow behind bar — intensifies on focus */}
        <div
          className="absolute -inset-px rounded-md transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(135deg, var(--amber-500), var(--teal-500))",
            opacity: focused ? 0.4 : 0.15,
            filter: "blur(8px)",
          }}
        />

        {/* Search bar */}
        <div
          className="relative flex items-center rounded-md overflow-hidden top-light"
          style={{
            background: "rgba(10,10,12,0.85)",
            border: "1px solid rgba(232,185,35,0.25)",
            backdropFilter: "blur(20px)",
            boxShadow: focused
              ? "0 0 0 1px rgba(232,185,35,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
              : "inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Bracket corner decorations — technical feel */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[rgba(232,185,35,0.5)] rounded-none pointer-events-none"
          />
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[rgba(232,185,35,0.5)] rounded-none pointer-events-none"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[rgba(232,185,35,0.5)] rounded-none pointer-events-none"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[rgba(232,185,35,0.5)] rounded-none pointer-events-none"
          />

          <div className="pl-5 text-[var(--text-muted)]">
            <Search size={19} strokeWidth={1.5} />
          </div>

          <input
            id="niche-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your business niche..."
            autoComplete="off"
            className="flex-1 bg-transparent border-none outline-none px-4 py-5 text-lg text-white placeholder-[var(--text-muted)] font-medium tracking-tight"
          />

          {/* Mono label inside bar */}
          <span className="mono-label text-[var(--text-muted)] pr-4 hidden sm:block">
            SEARCH_NICHE
          </span>

          <button
            type="submit"
            className="relative m-1.5 px-5 py-3.5 rounded-sm bg-[var(--amber-500)] hover:bg-[var(--amber-400)] text-[var(--bg-base)] font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-2 top-light"
          >
            Run
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </form>

      {/* Trending chips */}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-[var(--text-muted)] mr-1">
          <TrendingUp size={13} strokeWidth={2} />
          <span className="mono-label">TRENDING</span>
        </div>
        {popularNiches.map((niche) => (
          <button
            key={niche.key}
            onClick={() => router.push(`/niche/${niche.key}`)}
            className="px-3 py-1.5 rounded-sm border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.025)] text-[var(--text-secondary)] hover:text-[var(--amber-400)] hover:border-[rgba(232,185,35,0.3)] hover:bg-[rgba(232,185,35,0.04)] transition-all duration-200 mono-label"
          >
            {niche.label}
          </button>
        ))}
      </div>
    </div>
  );
}
