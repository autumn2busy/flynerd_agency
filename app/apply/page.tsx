"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CheckCircle, ShieldCircle, Loader2 } from "lucide-react";

function ApplyForm() {
    const searchParams = useSearchParams();
    const pkg = searchParams.get("package") || "build";
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        business_name: "",
        packageName: pkg,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const packageDisplayNames: Record<string, string> = {
        "build": "Quickstart Build ($1,250 Setup)",
        "agent": "AI Concierge Bundle ($2,400 Setup)",
        "care-plan": "Monthly Care Plan ($750/mo)",
        "growth-partner": "Growth Ops Partner ($1,800/mo)",
        "audit": "Automation Audit ($495)",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!formData.email || !formData.name || !formData.business_name) {
            setError("Please fill out all fields.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.stripeUrl) {
                // Redirect straight to Stripe!
                window.location.href = data.stripeUrl;
            } else {
                setError("Stripe links are not configured yet, or an error occurred.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            setError("Error joining pipeline. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass-card rounded-3xl p-8 lg:p-12 border border-[var(--glass-border)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(232,185,35,0.08)_0%,transparent_70%)]" />
            
            <h2 className="text-2xl font-semibold mb-2">Let's get started</h2>
            <p className="text-[var(--text-secondary)] mb-8">
                You've selected the <strong className="text-white">{packageDisplayNames[pkg] || "Package"}</strong>. Complete this quick form to reserve your spot and proceed to payment.
            </p>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                        placeholder="Sarah Connor"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">Work Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                        placeholder="sarah@example.com"
                    />
                </div>
                <div>
                    <label htmlFor="business_name" className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">Business Name</label>
                    <input
                        type="text"
                        name="business_name"
                        id="business_name"
                        required
                        value={formData.business_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                        placeholder="Acme Home Services"
                    />
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 relative overflow-hidden group"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Securing spot...
                            </>
                        ) : (
                            <>
                                Continue to Payment
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </>
                        )}
                    </button>
                    <p className="flex items-center justify-center gap-1.5 mt-4 text-xs text-[var(--text-muted)]">
                        <ShieldCircle size={14} /> Safely redirected to Stripe Checkout
                    </p>
                </div>
            </form>
        </div>
    );
}

export default function ApplyPage() {
    return (
        <section className="min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24">
            <div className="section-container">
                <div className="max-w-2xl mx-auto">
                    <Suspense fallback={<div className="text-center py-20"><Loader2 className="animate-spin text-[var(--gold-400)] mx-auto" size={40} /></div>}>
                        <ApplyForm />
                    </Suspense>
                </div>
            </div>
        </section>
    );
}
