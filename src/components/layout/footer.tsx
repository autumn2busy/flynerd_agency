import Link from "next/link"

export function Footer() {
    return (
        <footer className="border-t bg-slate-50">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div className="flex flex-col gap-3">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-lg font-heading font-bold tracking-tight">
                                FlyNerd<span className="text-primary">Tech</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                            Websites, automation, and lead systems for businesses ready to grow.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-heading font-semibold text-sm">Navigation</h3>
                        {[
                            { href: "/", label: "Home" },
                            { href: "/solutions", label: "Solutions" },
                            { href: "/industries", label: "Industries" },
                            { href: "/pricing", label: "Pricing" },
                            { href: "/case-studies", label: "Case Studies" },
                            { href: "/trust", label: "About" },
                            { href: "/contact", label: "Contact" },
                        ].map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="font-heading font-semibold text-sm">Contact</h3>
                        <a href="mailto:hello@flynerdtech.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            hello@flynerdtech.com
                        </a>
                        <p className="text-sm text-muted-foreground">Atlanta, GA</p>
                    </div>
                </div>
                <div className="mt-12 border-t pt-8">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} FlyNerd Tech. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
