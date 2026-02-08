import { CTASection } from "@/components/sections/cta-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { Building2, Utensils, Stethoscope, Wrench } from "lucide-react";

export const metadata: Metadata = {
    title: "Industries | FlyNerd Tech",
    description: "Specialized automation for Hospitality, Field Services, Real Estate, and Healthcare.",
};

const industries = [
    {
        title: "Hospitality Services",
        icon: Utensils,
        description: "For QSR groups, cleaning franchises, and concierge networks. We automate dispatch, reviews, and shift coverage.",
    },
    {
        title: "Field Services",
        icon: Wrench,
        description: "Plumbing, HVAC, and landscaping franchises. We enforce proof-of-work, route optimization, and invoicing speed.",
    },
    {
        title: "Proptech & Real Estate",
        icon: Building2,
        description: "Property management groups and leasing agents. We automate lead qualification, tour booking, and tenant comms.",
    },
    {
        title: "Healthcare",
        icon: Stethoscope,
        description: "Multi-location clinics and senior care. We handle patient intake, appointment reminders, and compliance logging.",
    },
];

export default function IndustriesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-muted/10 py-20 text-center">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">Industries We Serve</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Our Automation OS is adapted for specific vertical requirements.
                </p>
            </div>

            <section className="container py-24">
                <div className="grid gap-8 md:grid-cols-2">
                    {industries.map((ind) => (
                        <Card key={ind.title} className="hover:border-primary/50 transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                    <ind.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{ind.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{ind.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <CTASection />
        </div>
    );
}
