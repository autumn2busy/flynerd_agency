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
      <section className="py-20 bg-amber-50/60">
        <div className="container">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">Where systems break</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Human work gets lost in noisy pipelines.
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              We diagnose the real operational friction before we automate. These are the patterns we see in multi-location teams.
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
                <Zap className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Speed-to-Lead Failure</h3>
              <p className="text-slate-600">
                50% of your leads go cold in 5 minutes. If you aren&apos;t responding instantly, you are burning marketing dollars.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
                <Users className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Location Anarchy</h3>
              <p className="text-slate-600">
                Every franchisee runs a different playbook. Without governance, you can&apos;t scale quality or compliance.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center border border-amber-200">
                <BarChart3 className="h-5 w-5 text-amber-700" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Data Black Holes</h3>
              <p className="text-slate-600">
                You have reports, but no answers. You need real-time clarity on what is actually happening in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">How we work</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                Process-first storytelling, backed by proof.
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                We build credibility by showing the work. Every engagement starts with observing your team, mapping the
                reality, and aligning on measurable outcomes before a single automation goes live.
              </p>
              <Button size="lg" className="mt-8 bg-amber-700 text-white hover:bg-amber-800" asChild>
                <Link href="/contact">
                  Start the Blueprint
                </Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-amber-100 bg-amber-50/60 p-8">
              <div className="space-y-6">
                {[
                  {
                    title: "Listen",
                    description: "Interview operators, franchisees, and corporate stakeholders."
                  },
                  {
                    title: "Map",
                    description: "Document every handoff, tool, and friction point."
                  },
                  {
                    title: "Automate",
                    description: "Ship automation with governance and human oversight built in."
                  }
                ].map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 font-semibold">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{step.title}</p>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-white p-4 text-sm text-slate-600">
                Every automation is paired with governance checks, consent rules, and performance dashboards.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section (The OS) */}
      <section className="py-20 lg:py-32 border-t">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900">
              The Franchise Automation OS
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl">
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
                className="group relative overflow-hidden rounded-xl border border-amber-100 bg-white p-6 transition-colors hover:bg-amber-50/60"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-medium text-amber-700 opacity-0 transition-opacity group-hover:opacity-100">
                    Explore Module <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 bg-amber-50/40">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-slate-900">
              Calculate the cost of chaos.
            </h2>
            <p className="text-lg text-slate-600 w-full max-w-2xl mx-auto">
              Use our estimator to see how much revenue you are losing to slow response times and manual dispatching errors.
            </p>
          </div>
          <ROIEstimator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t bg-white">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-amber-50/50 px-6 py-16 text-center md:px-12 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f59e0b1f,transparent_60%)]"></div>
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
              <Shield className="h-12 w-12 text-amber-700 mb-4" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                Ready to govern your growth?
              </h2>
              <p className="text-lg text-slate-600">
                Book an Automation Blueprint today. In 10 days, we&apos;ll map your chaos and design your cure.
              </p>
              <Button size="lg" className="mt-4 h-12 px-8 text-base bg-amber-700 text-white shadow-lg shadow-amber-500/20 hover:bg-amber-800" asChild>
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
