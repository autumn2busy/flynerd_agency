import { ShieldCheck, Lock, Eye, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TrustPage() {
    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Security & Trust
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            We govern your data with the same rigor we govern your operations.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 mb-16">
                        <div className="flex gap-4 p-6 border rounded-xl bg-card">
                            <ShieldCheck className="h-10 w-10 text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Enterprise Grade Security</h3>
                                <p className="text-muted-foreground">
                                    We use industry-standard encryption for data in transit (TLS 1.2+) and at rest (AES-256). Your operational data is isolated and protected.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 border rounded-xl bg-card">
                            <Lock className="h-10 w-10 text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Role-Based Access</h3>
                                <p className="text-muted-foreground">
                                    Granular permission controls ensure franchisees only see their locations, and corporate sees the aggregate.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 border rounded-xl bg-card">
                            <Eye className="h-10 w-10 text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Privacy First</h3>
                                <p className="text-muted-foreground">
                                    We are compliant with GDPR and CCPA standards. We process your data; we do not sell it.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 p-6 border rounded-xl bg-card">
                            <FileCheck className="h-10 w-10 text-primary shrink-0" />
                            <div>
                                <h3 className="text-xl font-bold mb-2">Audit Trails</h3>
                                <p className="text-muted-foreground">
                                    Available for Enterprise plans: Detailed logs of every action taken within the OS for accountability and compliance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/30 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold mb-4">Uptime & Reliability</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Our systems are built on resilient cloud infrastructure with 99.9% uptime targets. We verify our stability continuously.
                        </p>
                        <Button asChild>
                            <Link href="mailto:security@flynerd.tech">Contact Security Team</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
