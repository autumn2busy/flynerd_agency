"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, X, Send } from "lucide-react"

export function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="h-14 w-14 rounded-full shadow-xl shadow-primary/20"
                >
                    <MessageSquare className="h-6 w-6" />
                </Button>
            )}

            {isOpen && (
                <Card className="w-[350px] shadow-2xl border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted/50 rounded-t-xl">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Concierge (Demo)
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-[300px] overflow-y-auto p-4 space-y-4">
                        <div className="flex gap-2 max-w-[80%]">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">
                                Hello. I am the FlyNerd Concierge. I can help explain our Automation OS or guide you to the right service package.
                            </div>
                        </div>
                        <div className="flex gap-2 max-w-[80%]">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <MessageSquare className="h-4 w-4 text-primary" />
                            </div>
                            <div className="bg-muted p-3 rounded-2xl rounded-tl-none text-sm">
                                Are you looking to improve speed-to-lead or operational governance?
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full h-10 pl-3 pr-10 rounded-md border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                disabled
                            />
                            <Button size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10 text-muted-foreground" disabled>
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}
