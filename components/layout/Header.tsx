"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinksLeft = [
    { href: "/ai-website", label: "AI Websites" },
    { href: "/services", label: "Automation" },
    { href: "/work", label: "Work" },
];

const navLinksRight = [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
];

function GlassesLogo() {
    return (
        <svg
            className="w-[108px] h-10 transition-transform duration-300 group-hover:scale-[1.02]"
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
                stroke="url(#glasses-grad)"
                strokeWidth="2.25"
                fill="none"
            />
            <rect
                x="75"
                y="12"
                width="40"
                height="25"
                rx="4"
                stroke="url(#glasses-grad)"
                strokeWidth="2.25"
                fill="none"
            />
            <path
                d="M45 24 Q60 18 75 24"
                stroke="url(#glasses-grad)"
                strokeWidth="2.25"
                fill="none"
            />
            <path
                d="M5 20 L-5 15"
                stroke="url(#glasses-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M115 20 L125 15"
                stroke="url(#glasses-grad)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <defs>
                <linearGradient id="glasses-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#B8860B" />
                    <stop offset="50%" stopColor="#E8B923" />
                    <stop offset="100%" stopColor="#FFD93D" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 36);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const navLinkBase =
        "relative text-[13px] font-medium tracking-[0.02em] transition-colors duration-300";
    const navUnderline =
        "after:absolute after:left-0 after:-bottom-[0.45rem] after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[linear-gradient(90deg,var(--amber-500),var(--amber-400))] after:transition-transform after:duration-300 hover:after:scale-x-100";

    const getNavLinkClass = (href: string) => {
        const isActive = pathname === href;
        return `${navLinkBase} ${navUnderline} ${isActive
                ? "text-[var(--text-primary)] after:scale-x-100"
                : "text-[rgba(245,245,247,0.72)] hover:text-[var(--text-primary)]"
            }`;
    };

    const allMobileLinks = [...navLinksLeft, ...navLinksRight, { href: "/blog", label: "Nerd News" }];

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${isScrolled
                        ? "border-white/10 bg-[rgba(10,10,12,0.90)] backdrop-blur-xl py-3"
                        : "border-white/6 bg-[rgba(10,10,12,0.58)] backdrop-blur-lg py-4"
                    }`}
            >
                <div className="section-container">
                    <nav className="flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                        <div className="hidden lg:flex items-center gap-8 justify-self-start">
                            {navLinksLeft.map((link) => (
                                <Link key={link.href} href={link.href} className={getNavLinkClass(link.href)}>
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href="/"
                            aria-label="FlyNerd home"
                            className="group inline-flex items-center justify-center justify-self-center"
                        >
                            <div className="rounded-full px-2 py-1 transition-all duration-300 group-hover:bg-white/[0.03]">
                                <GlassesLogo />
                            </div>
                        </Link>

                        <div className="hidden lg:flex items-center gap-8 justify-self-end">
                            {navLinksRight.map((link) => (
                                <Link key={link.href} href={link.href} className={getNavLinkClass(link.href)}>
                                    {link.label}
                                </Link>
                            ))}

                            <Link href="/contact" className="btn btn-primary ml-2 px-5 py-3 text-[13px]">
                                Book a Strategy Call
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-white/[0.04] text-[var(--text-primary)] backdrop-blur-md transition-colors hover:bg-white/[0.08]"
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </nav>
                </div>
            </header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[60] lg:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 240 }}
                            className="absolute right-0 top-0 h-full w-[88vw] max-w-[360px] border-l border-white/10 bg-[rgba(10,10,12,0.96)] backdrop-blur-2xl"
                        >
                            <div className="flex h-full flex-col px-6 pb-8 pt-6">
                                <div className="mb-10 flex items-center justify-between">
                                    <Link
                                        href="/"
                                        aria-label="FlyNerd home"
                                        className="group inline-flex items-center"
                                    >
                                        <GlassesLogo />
                                    </Link>

                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] text-[var(--text-primary)]"
                                        aria-label="Close menu"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {allMobileLinks.map((link) => {
                                        const isActive = pathname === link.href;

                                        return (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`rounded-2xl px-4 py-3 text-base transition-colors ${isActive
                                                        ? "bg-[rgba(232,185,35,0.08)] text-[var(--amber-400)]"
                                                        : "text-[rgba(245,245,247,0.82)] hover:bg-white/[0.04] hover:text-white"
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto pt-8">
                                    <div className="glass-card rounded-3xl p-5">
                                        <p className="text-xs uppercase tracking-[0.16em] text-[var(--amber-400)] mb-3">
                                            FlyNerd Tech
                                        </p>
                                        <p className="text-sm leading-relaxed text-[rgba(245,245,247,0.72)] mb-5">
                                            AI-powered websites for local businesses that capture, qualify, and turn visitors into booked appointments 24/7.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="btn btn-primary w-full justify-center px-5 py-3 text-[13px]"
                                        >
                                            Book a Strategy Call
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}