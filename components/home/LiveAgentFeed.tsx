"use client";

import { useEffect, useState } from "react";
import { Terminal, Crosshair, Sparkles, CheckCircle2 } from "lucide-react";

interface AgentEvent {
  id: string;
  agent: "Simon" | "Yoncé" | "Dre";
  action: string;
  detail: string;
  icon: any;
}

const FEED_EVENTS: Omit<AgentEvent, "id">[] = [
  { agent: "Simon", action: "Discovered Prospect", detail: "MedSpa in Atlanta, GA", icon: Crosshair },
  { agent: "Yoncé", action: "Scored Opportunity", detail: "Grade A (92/100)", icon: Sparkles },
  { agent: "Dre", action: "Deployed Demo Site", detail: "https://demo.flynerd.tech/4819", icon: Terminal },
  { agent: "Simon", action: "Scanned Territory", detail: "HVAC in Austin, TX", icon: Crosshair },
  { agent: "Dre", action: "Provisioned Database", detail: "Supabase instances active", icon: CheckCircle2 },
  { agent: "Yoncé", action: "Analyzed Competitors", detail: "Found 3 SEO gaps", icon: Sparkles },
];

export function LiveAgentFeed() {
  const [currentEvent, setCurrentEvent] = useState<AgentEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    
    // Start loop
    const cycleEvent = () => {
      // 1. Set data but keep invisible momentarily if needed, 
      // but actually we'll just snap data, pop in, wait, pop out.
      const event = { ...FEED_EVENTS[currentIndex], id: Date.now().toString() };
      setCurrentEvent(event);
      setIsVisible(true);

      // 2. Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);

      // 3. Move to next event after 6 seconds (2s gap)
      currentIndex = (currentIndex + 1) % FEED_EVENTS.length;
    };

    // Initial delay before starting feed
    const initialTimer = setTimeout(cycleEvent, 2000);
    const intervalTimer = setInterval(cycleEvent, 6000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <div
        className={`bg-[var(--bg-dark)]/80 backdrop-blur-md border border-[var(--text-primary)]/10 rounded-full px-4 py-2.5 flex items-center gap-3 shadow-2xl transition-all duration-500 transform ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {currentEvent && (
          <>
            <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shrink-0 text-[var(--accent)]">
              <currentEvent.icon size={12} strokeWidth={3} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[var(--text-muted)]">
                  {currentEvent.agent}
                </span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {currentEvent.action}
                </span>
              </div>
              <span className="text-xs text-[var(--text-secondary)] truncate max-w-[200px]">
                {currentEvent.detail}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
