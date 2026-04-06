import Link from "next/link";
import { prisma } from "@/lib/db";
import { CheckCircle, ArrowRight, Zap, Target, TrendingUp, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ niche: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheKey } = await params;
  
  const nicheData = await prisma.niche_config.findUnique({
    where: { niche_key: nicheKey },
  });

  if (!nicheData) {
    return {
      title: "Custom AI Business Automation | FlyNerd Tech",
      description: "Scale your business with a custom AI employee. Live in 7 days.",
    };
  }

  return {
    title: `${nicheData.display_name} AI Sales Funnels | FlyNerd Tech`,
    description: `Automate your ${nicheData.display_name.toLowerCase()} business with a 24/7 AI employee that qualifies leads and books appointments.`,
  };
}

export default async function NichePage({ params }: Props) {
  const { niche: nicheSlug } = await params;

  const nicheData = await prisma.niche_config.findUnique({
    where: { niche_key: nicheSlug },
  });

  // Category-specific value propositions
  const categoryBenefits = {
    medical: [
      "HIPAA-compliant lead qualification",
      "24/7 patient consultation booking",
      "Automated procedure-type screening",
      "Seamless patient intake automation",
    ],
    legal: [
      "Strict case-type qualification",
      "After-hours intake for high-intent leads",
      "Conflict-of-interest screening triage",
      "Immediate consultation scheduling",
    ],
    home_high_ticket: [
      "24/7 estimate scheduling",
      "Project scope & photo capture",
      "Emergency service triage after hours",
      "Automated follow-up for high-value quotes",
    ],
    default: [
      "24/7 lead capture and qualification",
      "Direct CRM (ActiveCampaign) integration",
      "Custom brand reputation data seeding",
      "Live in 7 days with a performance guarantee",
    ],
  };

  const benefits = nicheData 
    ? (categoryBenefits[nicheData.category as keyof typeof categoryBenefits] || categoryBenefits.default)
    : categoryBenefits.default;

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-white font-sans selection:bg-[var(--amber-500)] selection:text-black">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(232,185,35,0.06)_0%,transparent_70%)]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(43,90,106,0.05)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pt-32 pb-24">
        {/* Navigation / Back to Home */}
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white transition-colors mb-16 group">
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} />
          <span className="text-xs uppercase tracking-widest font-bold">Back to Search</span>
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
           <div className="flex items-center gap-3 mb-6">
              <Zap className="text-[var(--gold-400)]" size={24} />
              <span className="text-xs font-bold tracking-[0.4em] uppercase text-[var(--amber-400)]">
                {nicheData?.category?.replace(/_/g, ' ') || "Custom Solution"}
              </span>
           </div>
           
           <h1 className="text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.1] mb-8">
              The Digital <span className="gradient-text">{nicheData?.display_name || nicheSlug.replace(/-/g, ' ')}</span> Employee.
           </h1>

           <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-12 max-w-2xl">
              Stop losing high-intent {nicheData?.display_name?.toLowerCase() || nicheSlug.replace(/-/g, ' ')} leads to slow responses. Our AI systems qualify your visitors and book them into your calendar before your competitors even see the notification.
           </p>

           {/* Core Value Props Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-4 bg-[var(--bg-elevated)] p-5 rounded-2xl border border-[var(--glass-border)] shadow-xl">
                   <div className="w-8 h-8 rounded-lg bg-[var(--amber-500)]/10 flex items-center justify-center">
                      <CheckCircle className="text-[var(--amber-400)]" size={18} />
                   </div>
                   <span className="text-sm font-semibold text-[var(--text-primary)]">{benefit}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-stretch">
           <div className="lg:col-span-2 glass-card rounded-3xl p-10 flex flex-col justify-between border border-[var(--amber-500)]/20 bg-gradient-to-br from-[var(--amber-500)]/10 to-transparent">
              <div>
                 <h2 className="text-2xl font-bold mb-4">Ready to launch in 7 days?</h2>
                 <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
                   Select the build package that fits your volume, or book a free strategy call to see exactly how our {nicheData?.display_name || nicheSlug.replace(/-/g, ' ')} automation works.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-5">
                 <Link href="/pricing" className="btn btn-primary px-8 py-4 text-base">
                    View Build Pricing <ArrowRight size={20} />
                 </Link>
                 <Link href="/contact" className="btn btn-ghost px-8 py-4 text-base">
                    Book a Strategy Call <Target size={20} />
                 </Link>
              </div>
           </div>

           <div className="glass-card rounded-3xl p-10 flex flex-col gap-8 justify-center border border-[var(--glass-border)]">
              <div className="space-y-2">
                 <div className="flex items-center gap-3 text-[var(--gold-400)]">
                    <ShieldCheck size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Guaranteed</span>
                 </div>
                 <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                   Launch your 24/7 sales agent within 1 week of your kickoff call, or your first month of management is on us.
                 </p>
              </div>
              <div className="space-y-2">
                 <div className="flex items-center gap-3 text-[var(--teal-400)]">
                    <TrendingUp size={20} />
                    <span className="text-sm font-bold uppercase tracking-widest">Scalable</span>
                 </div>
                 <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                   Built on the Sonata Stack (n8n + Supabase) to grow with your lead volume.
                 </p>
              </div>
           </div>
        </div>

        {/* SEO Bottom Footer (Dynamic) */}
        {!nicheData && (
          <div className="text-center p-12 border-2 border-dashed border-[var(--glass-border)] rounded-3xl">
             <p className="text-[var(--text-muted)] text-sm mb-4 italic font-medium">
                Note: "{nicheSlug.replace(/-/g, ' ')}" is a high-intent custom niche. We can definitely automate your funnel.
             </p>
             <Link href="/contact" className="text-[var(--amber-400)] text-sm font-bold hover:underline">
                Contact us to seed this niche into our platform →
             </Link>
          </div>
        )}
      </div>
    </main>
  );
}
