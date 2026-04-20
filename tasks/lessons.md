# Lessons — flynerd-agency

Append new lessons below. Load these at session start per project CLAUDE.md.
Sister document: `sonata-stack/docs/lessons.md` — cross-reference for
lessons that apply to both codebases.

---

## Secrets Handling

### 2026-04-18 — Never grep `.env` with `output_mode: "content"`

- **What happened:** A session working on sonata-stack's Kris Jenner
  webhook needed to confirm which env var name flynerd-agency used for the
  Stripe secret. It grepped `flynerd-agency/.env` with pattern
  `^(STRIPE_[A-Z_]+)=` and `output_mode: "content"`. Grep returns full
  matching LINES in content mode, not just capture groups. The live
  `STRIPE_API_KEY=sk_live_...` landed in the conversation transcript.
- **Cost:** Rotated the live Stripe secret and updated both
  `flynerd-agency/.env` and Vercel. Low operational cost because the key
  was only seen in a single private session, but a leaked live secret is
  the kind of thing that ends careers if the transcript escapes.
- **Rule:** Never grep `.env`, `.env.local`, `.env.production`, or any
  file likely to contain secrets with `output_mode: "content"`. Accepted
  alternatives, in order of preference:
  1. Ask the user: "What's the env var name you use for X?"
  2. `output_mode: "count"` to check existence without surfacing values.
  3. `output_mode: "files_with_matches"` to confirm presence.
  4. If you must read names, pipe through a one-shot script that strips
     values BEFORE the tool returns.
- **Prevention:** This lessons file now carries the rule. Project
  CLAUDE.md instructs agents to read it at session start.
