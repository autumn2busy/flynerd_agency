"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export function ROIEstimator() {
    const [locations, setLocations] = useState(10)
    const [leadsPerLocation, setLeadsPerLocation] = useState(50)
    const [avgTicket, setAvgTicket] = useState(250)
    const [conversionRate, setConversionRate] = useState(15) // Current conversion rate

    const [projectedRevenue, setProjectedRevenue] = useState(0)

    // Assumptions
    // Automated speed-to-lead increases conversion by ~30% relative (e.g. 15% -> 19.5%)
    // Automated dispatch saves ~10 hours/week per dispatcher (assuming 1 dispatcher per 10 locations)

    useEffect(() => {
        const totalLeads = locations * leadsPerLocation
        const currentRevenue = totalLeads * (conversionRate / 100) * avgTicket

        // Improvement factor of 1.35x (35% lift)
        const newConversionRate = conversionRate * 1.35
        const newRevenue = totalLeads * (newConversionRate / 100) * avgTicket

        const lift = newRevenue - currentRevenue

        setProjectedRevenue(lift)
    }, [locations, leadsPerLocation, avgTicket, conversionRate])

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
    }

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-primary/20 bg-background/50 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Automation ROI Estimator</CardTitle>
                <CardDescription className="text-center">See how much revenue you&apos;re leaving on the table due to slow response times.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>Number of Locations: <span className="font-bold text-primary">{locations}</span></Label>
                        <Slider
                            value={[locations]}
                            min={1} max={500} step={1}
                            onValueChange={(vals) => setLocations(vals[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Monthly Leads per Location: <span className="font-bold text-primary">{leadsPerLocation}</span></Label>
                        <Slider
                            value={[leadsPerLocation]}
                            min={10} max={1000} step={10}
                            onValueChange={(vals) => setLeadsPerLocation(vals[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Average Ticket Value ($): <span className="font-bold text-primary">${avgTicket}</span></Label>
                        <Slider
                            value={[avgTicket]}
                            min={50} max={5000} step={50}
                            onValueChange={(vals) => setAvgTicket(vals[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Current Conversion Rate (%): <span className="font-bold text-primary">{conversionRate}%</span></Label>
                        <Slider
                            value={[conversionRate]}
                            min={1} max={50} step={1}
                            onValueChange={(vals) => setConversionRate(vals[0])}
                        />
                    </div>
                </div>

                <div className="flex flex-col justify-center space-y-6 bg-muted/30 p-6 rounded-xl border border-primary/10">
                    <div className="text-center">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Monthly Revenue Lift</h3>
                        <div className="text-4xl font-extrabold text-primary flex items-center justify-center gap-2">
                            <TrendingUp className="h-8 w-8" />
                            {formatCurrency(projectedRevenue)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">Projection based on 35% improvement in conversion via Speed-to-Lead.</p>
                    </div>

                    <div className="pt-6 border-t border-dashed border-muted-foreground/20">
                        <div className="text-center">
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Potential Annual Upside</h3>
                            <div className="text-3xl font-bold text-foreground">
                                {formatCurrency(projectedRevenue * 12)}
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-center pb-8">
                <Button size="lg" className="w-full md:w-auto" variant="default" onClick={() => window.location.href = '/contact'}>
                    Claim This Revenue (Book Audit)
                </Button>
            </CardFooter>
        </Card>
    )
}
