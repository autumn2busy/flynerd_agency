"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchNiche() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    const nicheKey = query
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/&/g, "and");
    router.push(`/niche/${nicheKey}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div
        className="relative flex items-center"
        style={{
          border: focused
            ? "1px solid var(--accent)"
            : "1px solid var(--text-primary)",
          borderRadius: "4px",
          backgroundColor: "var(--bg-base)",
          transition: "border-color 0.15s ease",
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder='enter niche, e.g. "hvac atlanta"'
          autoComplete="off"
          className="flex-1 bg-transparent outline-none px-5 py-4 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
          style={{ fontFamily: "var(--font-mono)" }}
        />
        <button
          type="submit"
          aria-label="Search niche"
          className="pr-5 pl-3 flex-shrink-0 text-[var(--accent)] hover:opacity-70 transition-opacity"
        >
          <Search size={18} strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
