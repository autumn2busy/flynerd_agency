"use client";

import { useEffect, useState } from "react";
import { Search, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

const MENU_ITEMS = [
  { id: "audit", title: "Book a Systems Audit", url: "/contact?package=starter", type: "Action" },
  { id: "build", title: "Quickstart Workflow Build", url: "/contact?package=build", type: "Pricing" },
  { id: "retainer", title: "Apply for Growth Retainer", url: "/contact?package=scale", type: "Pricing" },
  { id: "demo", title: "View Example Demo", url: "/ai-website", type: "Product" },
  { id: "work", title: "See Our Work", url: "/work", type: "Company" },
  { id: "blog", title: "Read Nerd News", url: "/blog", type: "Blog" },
];

export function CommandMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[10vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal / Palette */}
      <div className="relative w-full max-w-2xl bg-[var(--bg-dark)] border border-[var(--text-primary)]/10 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--text-primary)]/10">
          <Search size={18} className="text-[var(--text-muted)] mr-3" />
          <input
            autoFocus
            type="text"
            className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 bg-[var(--text-primary)]/5 rounded-md text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-[var(--text-muted)] text-sm">
              No results found.
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-mono">
                Suggestions
              </div>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    router.push(item.url);
                  }}
                  className="w-full flex items-center justify-between px-3 py-3 rounded-lg hover:bg-[var(--text-primary)]/5 transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--text-muted)] font-mono w-16">{item.type}</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{item.title}</span>
                  </div>
                  <ArrowRight size={14} className="text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="h-10 border-t border-[var(--text-primary)]/10 flex items-center px-4 bg-black/40">
            <span className="text-[10px] text-[var(--text-muted)]">
                Search powered by <span className="text-[var(--accent)] font-semibold">Turing</span>
            </span>
        </div>
      </div>
    </div>
  );
}
