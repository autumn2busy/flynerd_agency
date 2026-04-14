import posthog from "posthog-js";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let clientInitialized = false;

export function initPostHogClient(): typeof posthog | null {
  if (typeof window === "undefined") return null;
  if (!KEY) return null;
  if (clientInitialized) return posthog;
  posthog.init(KEY, {
    api_host: HOST,
    capture_pageview: false,
    capture_pageleave: true,
    persistence: "localStorage+cookie",
  });
  clientInitialized = true;
  return posthog;
}

export function capture(
  event: string,
  properties: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  if (!KEY) return;
  const ph = initPostHogClient();
  ph?.capture(event, properties);
}

export function identifyLead(leadId: string, traits: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  if (!KEY) return;
  const ph = initPostHogClient();
  ph?.identify(leadId, traits);
}

