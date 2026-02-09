"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calendar } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="py-20 lg:py-32">
            <div className="container">
                <div className="grid gap-12 lg:grid-cols-2">

                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                            Let&apos;s Map Your Automation.
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Ready to replace chaos with control? Book an Automation Blueprint or start a conversation.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">7-Day Blueprint</h3>
                                    <p className="text-muted-foreground">Get a full implementation roadmap before you commit to a build.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Enterprise Governance</h3>
                                    <p className="text-muted-foreground">Discuss multi-location rollout strategies for 50+ units.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 border rounded-xl bg-muted/50">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                <Calendar className="h-5 w-5 text-primary" /> Direct Booking
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Skip the form and find a time on our calendar.
                            </p>
                            <Button variant="outline" className="w-full">
                                View Calendar Availability
                            </Button>
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Inquiry Form</CardTitle>
                            <CardDescription>Tell us about your operations.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="Jane" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Work Email</Label>
                                    <Input id="email" type="email" placeholder="jane@company.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company / Franchise Name</Label>
                                    <Input id="company" placeholder="Acme Inc." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="locations">Number of Locations</Label>
                                    <select
                                        id="locations"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select range...</option>
                                        <option value="1-10">1-10</option>
                                        <option value="11-50">11-50</option>
                                        <option value="51-100">51-100</option>
                                        <option value="100+">100+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">How can we help?</Label>
                                    <Textarea id="message" placeholder="We are struggling with speed-to-lead..." />
                                </div>
                                <Button type="submit" className="w-full">Send Inquiry</Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
}
