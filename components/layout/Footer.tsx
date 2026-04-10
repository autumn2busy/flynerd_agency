import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  services: [
    { href: "/ai-website", label: "AI-Powered Websites" },
    { href: "/ai-website#pricing", label: "Quickstart Build" },
    { href: "/ai-website#pricing", label: "AI Concierge Bundle" },
    { href: "/services", label: "Automation Services" },
    { href: "/pricing", label: "All Pricing" },
  ],
  company: [
    { href: "/work", label: "Case Studies" },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Nerd News" },
    { href: "/contact", label: "Contact" },
  ],
  connect: [
    { href: "https://linkedin.com/company/flynerdtech", label: "LinkedIn", external: true },
    { href: "https://twitter.com/flynerdtech", label: "X (Twitter)", external: true },
    { href: "https://instagram.com/flynerdofficial", label: "Instagram", external: true },
    { href: "https://flynerdofficial.com", label: "FlyNerd Official", external: true },
  ],
};

const monoStyle = { fontFamily: "var(--font-mono)" } as const;

export function Footer() {
  return (
    <footer className="border-t border-[var(--text-primary)] bg-[var(--bg-base)]">
      {/* Main footer */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <svg
                className="w-20 h-8"
                viewBox="0 0 120 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="12" width="40" height="25" rx="4" stroke="#0D0D0D" strokeWidth="2.5" fill="none" />
                <rect x="75" y="12" width="40" height="25" rx="4" stroke="#0D0D0D" strokeWidth="2.5" fill="none" />
                <path d="M45 24 Q60 18 75 24" stroke="#0D0D0D" strokeWidth="2.5" fill="none" />
              </svg>
              <span
                className="text-xl font-bold tracking-wider text-[var(--text-primary)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                FLYNERD<span className="text-[var(--accent)]">TECH</span>
              </span>
            </Link>

            <div className="max-w-md">
              <p className="text-[var(--text-secondary)] mb-2 leading-relaxed text-sm">
                Atlanta-based. Global energy.
              </p>
              <p
                className="text-sm text-[var(--text-muted)] italic"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                &ldquo;Brilliance deserves style. Unapologetically.&rdquo;
              </p>
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {(["services", "company", "connect"] as const).map((section) => (
              <div key={section}>
                <h4
                  className="text-[11px] font-medium mb-4 uppercase tracking-[0.2em] text-[var(--text-muted)]"
                  style={monoStyle}
                >
                  {section}
                </h4>
                <ul className="space-y-3">
                  {footerLinks[section].map((link) => (
                    <li key={link.href + link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                          style={monoStyle}
                        >
                          {link.label}
                          <ArrowUpRight size={11} />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                          style={monoStyle}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--text-primary)]/10">
        <div className="section-container py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[var(--text-muted)]" style={monoStyle}>
            © {new Date().getFullYear()} FlyNerd Tech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              style={monoStyle}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              style={monoStyle}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
