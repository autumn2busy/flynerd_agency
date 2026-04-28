import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";

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
            <Link href="/" className="inline-flex items-center mb-6">
              <BrandLogo size="lg" />
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
