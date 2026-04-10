"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/ai-website", label: "AI Websites" },
  { href: "/services", label: "Automation" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

function Logo() {
  return (
    <svg
      className="w-[100px] h-9"
      viewBox="0 0 120 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="12"
        width="40"
        height="25"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.25"
        fill="none"
      />
      <rect
        x="75"
        y="12"
        width="40"
        height="25"
        rx="4"
        stroke="currentColor"
        strokeWidth="2.25"
        fill="none"
      />
      <path
        d="M45 24 Q60 18 75 24"
        stroke="currentColor"
        strokeWidth="2.25"
        fill="none"
      />
      <path
        d="M5 20 L-5 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M115 20 L125 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 bg-[var(--bg-base)] border-b border-[var(--text-primary)]"
      >
        <div className="section-container">
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" aria-label="FlyNerd home" className="shrink-0">
              <Logo />
            </Link>

            {/* Center nav links — Space Mono */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[15px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA pill — accent bg, white text */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-[var(--accent)] text-black text-[15px] font-semibold hover:opacity-90 transition-opacity accent-glow"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Get Started
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden w-10 h-10 flex items-center justify-center border border-[var(--text-primary)]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="absolute right-0 top-0 h-full w-[80vw] max-w-[320px] bg-[var(--bg-base)] border-l border-[var(--text-primary)] flex flex-col p-8"
            >
              <div className="flex items-center justify-between mb-10">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center border border-[var(--text-primary)]"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="py-3 px-1 text-base text-[var(--text-primary)] hover:text-[var(--accent)] border-b border-[var(--text-primary)]/10 transition-colors"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8">
                <Link
                  href="/contact"
                  className="block w-full text-center py-3 bg-[var(--accent)] text-black rounded-full text-sm font-semibold"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Get Started
                </Link>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
