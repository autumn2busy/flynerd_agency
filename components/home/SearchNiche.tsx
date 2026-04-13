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
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div
        className="relative flex items-center bg-white text-black transition-shadow duration-300 rounded-full"
        style={{
          boxShadow: focused
            ? "0 4px 30px rgba(255, 255, 255, 0.15)"
            : "0 2px 10px rgba(0, 0, 0, 0.4)",
          border: focused ? "2px solid var(--accent)" : "2px solid transparent",
        }}
      >
        <div className="pl-6 pr-3 text-gray-400">
          <Search size={22} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder='hvac or med spa'
          autoComplete="off"
          className="flex-1 bg-transparent outline-none py-5 text-lg font-sans placeholder:text-gray-400"
        />
        <div className="pr-2">
          <button
            type="submit"
            aria-label="Search niche"
            className="flex-shrink-0 bg-[var(--accent)] hover:bg-[#ff5500] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-colors shadow-sm"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
