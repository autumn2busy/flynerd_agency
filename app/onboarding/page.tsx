"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowUpRight, Loader2, Link as LinkIcon, Briefcase } from "lucide-react";

export default function OnboardingPage() {
    const [formData, setFormData] = useState({
        businessName: "",
        niche: "",
        yelpUrl: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        if (!formData.businessName || !formData.yelpUrl) {
            setError("Please provide your business name and a review link.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Ideally, this pings standard onboarding API or the builder agent directly
            // For now, we simulate success for the agency owner to review
            await new Promise((resolve) => setTimeout(resolve, 2000));
            
            setIsSuccess(true);
        } catch (err: any) {
            console.error(err);
            setError("Something went wrong saving your details. Please try again.");
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="min-h-screen pt-32 pb-16 lg:pt-40 flex items-center justify-center">
                <div className="section-container">
                    <div className="max-w-xl mx-auto text-center glass-card rounded-3xl p-12">
                        <div className="w-20 h-20 rounded-full bg-[var(--gold-500)]/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={40} className="text-[var(--gold-400)]" />
                        </div>
                        <h1 className="text-3xl font-semibold mb-4">You're in the queue!</h1>
                        <p className="text-lg text-[var(--text-secondary)] mb-8 leading-relaxed">
                            Our Intel Agent is now analyzing your reviews and brand footprint. 
                            We will reach out within 24 hours with your first progress update.
                        </p>
                        <Link href="/" className="btn btn-ghost">
                            Return to Homepage
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24">
            <div className="section-container">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="section-label">Step 2: Onboarding</span>
                        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold mt-4 mb-4">
                            Payment <span className="gradient-text">Successful</span>
                        </h1>
                        <p className="text-lg text-[var(--text-secondary)]">
                            Welcome to FlyNerd Tech. To instruct our AI Builder agents, we need your public reputation data. Give us your best profile and we'll do the rest.
                        </p>
                    </div>

                    <div className="glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,185,35,0.05)_0%,transparent_70%)]" />

                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)] flex items-center gap-2">
                                    <Briefcase size={16} /> Official Business Name
                                </label>
                                <input
                                    type="text"
                                    name="businessName"
                                    required
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                                    placeholder="e.g. Acme Plumbing & Heating"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)] flex items-center gap-2">
                                    <LinkIcon size={16} /> Yelp or Google Maps Profile Link
                                </label>
                                <p className="text-xs text-[var(--text-muted)] mb-3">Our Intel Agent reads your reviews to determine your brand tone, pain points you solve, and to extract conversion copy.</p>
                                <input
                                    type="url"
                                    name="yelpUrl"
                                    required
                                    value={formData.yelpUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                                    placeholder="https://www.yelp.com/biz/acme-plumbing"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[var(--text-secondary)]">
                                    Primary Niche / Services
                                </label>
                                <input
                                    type="text"
                                    name="niche"
                                    value={formData.niche}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--gold-500)] focus:ring-1 focus:ring-[var(--gold-500)]"
                                    placeholder="e.g. Residential HVAC Repairs, Drain Cleaning"
                                />
                            </div>

                            <div className="pt-6">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Initializing Builder Agent...
                                        </>
                                    ) : (
                                        <>
                                            Submit & Start Build
                                            <ArrowUpRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
