import Link from "next/link"
import { Shield, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex flex-col gap-8 py-12 md:py-16 lg:py-24">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Shield className="h-6 w-6" />
                            <span className="font-bold">FlyNerd Tech</span>
                        </Link>
                        <p className="text-sm text-balance leading-relaxed text-muted-foreground">
                            The Franchise Automation OS.
                            Built for operators who demand control, governance, and scale.
                        </p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold">Solutions</h3>
                        <Link href="/solutions#growth" className="text-sm text-muted-foreground hover:text-foreground">
                            Growth OS
                        </Link>
                        <Link href="/solutions#ops" className="text-sm text-muted-foreground hover:text-foreground">
                            Ops OS
                        </Link>
                        <Link href="/solutions#reputation" className="text-sm text-muted-foreground hover:text-foreground">
                            Reputation OS
                        </Link>
                        <Link href="/solutions#training" className="text-sm text-muted-foreground hover:text-foreground">
                            Training OS
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold">Company</h3>
                        <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
                            Services
                        </Link>
                        <Link href="/case-studies" className="text-sm text-muted-foreground hover:text-foreground">
                            Case Studies
                        </Link>
                        <Link href="/trust" className="text-sm text-muted-foreground hover:text-foreground">
                            Trust Center
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                            Contact
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold">Legal</h3>
                        <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                            Terms of Service
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t pt-8">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} FlyNerd Tech. All rights reserved.
                        <br />
                        Independent agency. Not affiliated with any franchise platforms.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
