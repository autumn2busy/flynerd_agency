# Knowledge Base (Supabase Vector) Setup

This module adds a multi-niche KB backed by Supabase Postgres + pgvector.

## Included niches
- `water_damage_restoration`
- `senior_home_care`
- `personal_injury_law`
- `hvac`
- `plumbing`

## Files
- Migration: `supabase/migrations/20260325_kb_vector.sql`
- Edge function: `supabase/functions/embed/index.ts`
- Niche metadata: `kb/niches.json`
- Seed templates: `kb/seeds/*.json`
- Generated KB examples: `kb/generated/*_kb_items.json`
- Generator script: `scripts/kb_generate.ts`
- Loader script: `scripts/kb_load.ts`
- Optional admin SQL: `scripts/kb_admin_seed_niches.sql`

## Security notes
- `kb_items` has RLS enabled with authenticated read access only.
- Inserts/updates should be done with `service_role` credentials (server-side only).
- Never expose `SUPABASE_SERVICE_ROLE_KEY` in browser code.

## Run steps

1. **Apply database migration**
   ```bash
   supabase db push
   ```

2. **Deploy embed edge function**
   ```bash
   supabase functions deploy embed
   ```

3. **Generate KB content from seeds**
   ```bash
   npx tsx scripts/kb_generate.ts
   ```

4. **Load generated KB content into Supabase**
   ```bash
   SUPABASE_URL="https://<project-ref>.supabase.co" \
   SUPABASE_SERVICE_ROLE_KEY="<service-role-key>" \
   npx tsx scripts/kb_load.ts
   ```

## Retrieval RPC usage
Use `public.match_kb_items(niche_in, query_embedding, org_id_in, match_count)`.
- Filters by niche (and optional org_id)
- Uses cosine distance ordering (`embedding <=> query_embedding`)
- Returns score = `1 - distance`
