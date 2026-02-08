import { Hero } from "@/components/marketing/hero"
import { Shield, Zap, BarChart3, Users, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ROIEstimator } from "@/components/tools/roi-estimator"

export default function Home() {
  return (
    <>
      <Hero />

      {/* Problem Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold">Speed-to-Lead Failure</h3>
              <p className="text-muted-foreground">
                50% of your leads go cold in 5 minutes. If you aren&apos;t responding instantly, you are burning marketing dollars.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Users className="h-5 w-5 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold">Location Anarchy</h3>
              <p className="text-muted-foreground">
                Every franchisee runs a different playbook. Without governance, you can&apos;t scale quality or compliance.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <BarChart3 className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold">Data Black Holes</h3>
              <p className="text-muted-foreground">
                You have reports, but no answers. You need real-time clarity on what is actually happening in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section (The OS) */}
      <section className="py-20 lg:py-32 border-t">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              The Franchise Automation OS
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A modular system designed to govern and grow multi-location operations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Growth OS",
                description: "Lead capture, speed-to-lead, lifecycle sequences, and attribution hygiene.",
                href: "/solutions#growth"
              },
              {
                title: "Ops OS",
                description: "Intake, triage, dispatch, SLA monitoring, and proof-of-work validation.",
                href: "/solutions#ops"
              },
              {
                title: "Reputation OS",
                description: "Review generation, issue capture, response drafts, and location scorecards.",
                href: "/solutions#reputation"
              },
              {
                title: "Training OS",
                description: "SOPs, role-based enablement, knowledge base, and compliance checklists.",
                href: "/solutions#training"
              }
            ].map((feature, i) => (
              <Link
                key={i}
                href={feature.href}
                className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Explore Module <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-muted/10">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Calculate the cost of chaos.
            </h2>
            <p className="text-lg text-muted-foreground w-full max-w-2xl mx-auto">
              Use our estimator to see how much revenue you are losing to slow response times and manual dispatching errors.
            </p>
          </div>
          <ROIEstimator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border bg-background px-6 py-16 text-center md:px-12 lg:py-24">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to govern your growth?
              </h2>
              <p className="text-lg text-muted-foreground">
                Book an Automation Blueprint today. In 10 days, we&apos;ll map your chaos and design your cure.
              </p>
              <Button size="lg" className="mt-4 h-12 px-8 text-base shadow-lg shadow-primary/20" asChild>
                <Link href="/contact">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
