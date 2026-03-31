# FlyNerd Agency — The Face

## Project role
Marketing site + outbound agent pipeline for FlyNerd Tech (flynerd.tech).
Deployed to Vercel. Next.js 15 + Tailwind + TypeScript.

## Related repos
- **Brain:** flynerdtech (client demo site template)
- **Agent Core:** sonata-stack (MCP server on Railway)

## Architecture
- app/page.tsx — homepage (ChatScenario NOT yet imported — fix is pending)
- app/api/chat-demo/route.ts — demo chat endpoint (currently Groq, migrating to Claude)
- app/api/agents/* — outbound pipeline: scout, intel, builder, outreach, closer, growth, expire
- lib/prompts.ts — versioned prompt registry (ALWAYS update version on changes)
- lib/activecampaign.ts, lib/vercel.ts, lib/heygen.ts — external integrations
- components/home/ChatScenario.tsx — live chat widget (complete, needs import in page.tsx)
- prisma/schema.prisma — AgencyLead model, status FSM: PROSPECT→AUDITED→BUILT→OUTREACH_SENT→ACTIVE→EXPIRED

## LLM migration status
- chat-demo/route.ts: MIGRATE Groq → claude-haiku-4-5-20251001
- agents/intel: MIGRATE Groq → claude-haiku-4-5-20251001
- agents/closer: MIGRATE Groq → claude-sonnet-4-6
- agents/growth: MIGRATE Groq → claude-haiku-4-5-20251001

## Critical rules
- NEVER delete or modify lib/prompts.ts without bumping the version number
- NEVER deploy prompt changes without running e2e-live-test.mjs first
- ALWAYS use streaming responses for chat endpoints
- ALWAYS add ANTHROPIC_API_KEY to Vercel env vars before deploying Claude routes
- NEVER add agent logic here — it belongs in sonata-stack
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

---

## Development Standards

### Plan First
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately
- Write detailed specs upfront to reduce ambiguity

### Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- One task per subagent for focused execution

### Self-Improvement Loop
- After ANY correction from the user: update tasks/lessons.md with the pattern
- Write rules for yourself that prevent the same mistake
- Review lessons at session start for relevant project

### Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- Skip this for simple, obvious fixes — don't over-engineer

### Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests then resolve them

## Task Management
1. Write plan to tasks/todo.md with checkable items
2. Check in before starting implementation
3. Mark items complete as you go
4. High-level summary at each step
5. Add review section to tasks/todo.md
6. Update tasks/lessons.md after corrections

## Core Principles
- **Simplicity First:** Make every change as simple as possible. Impact minimal code.
- **No Laziness:** Find root causes. No temporary fixes. Senior developer standards.

---

## Change Logging

After completing any task that modifies files, create or append to:
`C:/Users/Mother/Vault/command-center/00-Inbox/changelog-sonata.md`

Format each entry as:

```
### YYYY-MM-DD — [brief title]
**Repo:** flynerd-agency

**Files changed:**
- path/to/file.ts — what changed and why

**Decisions made:**
- any choices or tradeoffs

**Notes:**
- anything the owner should know

---
```

Always append to the end of the file. Never overwrite previous entries.