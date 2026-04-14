import "server-only";
import { PostHog as PostHogNode } from "posthog-node";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let serverClient: PostHogNode | null = null;

export function getServerPostHog(): PostHogNode | null {
  if (!KEY) return null;
  if (serverClient) return serverClient;
  serverClient = new PostHogNode(KEY, { host: HOST });
  return serverClient;
}
