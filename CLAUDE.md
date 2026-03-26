# FlyNerd Agency — The Face
## Local paths
- This repo: /flynerd-agency
- Brain repo: /flynerdtech (FN-real-estate)

## Project role
Marketing site + outbound agent pipeline for FlyNerd Tech (flynerd.tech).
Deployed to Vercel. Next.js 15 + Tailwind + TypeScript.

## Architecture
- app/page.tsx — homepage (ChatScenario NOT yet imported — fix is pending)
- app/api/chat-demo/route.ts — demo chat endpoint (currently Groq, migrating to Claude)
- app/api/agents/* — outbound pipeline: scout, intel, builder, outreach, closer, growth, expire
- lib/prompts.ts — versioned prompt registry (ALWAYS update version on changes)
- lib/activecampaign.ts, lib/vercel.ts, lib/heygen.ts — external integrations
- components/home/ChatScenario.tsx — live chat widget (complete, needs import in page.tsx)
- prisma/schema.prisma — AgencyLead model, status FSM: PROSPECT→AUDITED→BUILT→OUTREACH_SENT→ACTIVE→EXPIRED

## LLM migration status
- chat-demo/route.ts: MIGRATE Groq → @anthropic-ai/sdk claude-haiku-4-5-20251001
- agents/intel: MIGRATE Groq → claude-haiku-4-5-20251001
- agents/closer: MIGRATE Groq → claude-sonnet-4-6
- agents/growth: MIGRATE Groq → claude-haiku-4-5-20251001

## Critical rules
- NEVER delete or modify lib/prompts.ts without bumping the version number
- NEVER deploy prompt changes without running e2e-live-test.mjs first
- ALWAYS use streaming responses for chat endpoints
- ALWAYS add ANTHROPIC_API_KEY to Vercel env vars before deploying Claude routes
- Package manager: npm (never yarn or pnpm)
- Commits: conventional commits format (feat:, fix:, chore:)

## Environment variables needed
ANTHROPIC_API_KEY, GROQ_API_KEY, SUPABASE_PROJECT_REF, SUPABASE_SERVICE_ROLE_KEY,
DATABASE_URL, VERCEL_API_TOKEN, HEYGEN_API_KEY, GOOGLE_PLACES_API_KEY, YELP_API_KEY,
IS_MAIN_SITE=true, NEXT_PUBLIC_BASE_URL

## Pending fixes (priority order)
1. Import ChatScenario in app/page.tsx before Core Five section
2. Swap chat-demo route from Groq to Claude Haiku
3. Add /api/demo-lead route for email capture on demo limit
4. Wire expire agent to ActiveCampaign on demo expiry
5. Add Cal.com booking link to HVAC agent handoff