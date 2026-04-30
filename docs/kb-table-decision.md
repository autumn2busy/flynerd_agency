# KB Table Decision

Date: 2026-04-30

## Decision

`kb_source` is the current production source of truth for the text knowledge base served by `/api/kb`.

`kb_items` is the future vector/RAG table. Keep it for semantic retrieval work, but do not route production reads to it until the switch checklist below is complete.

## Live Supabase State

Verified on 2026-04-30:

| Table | Rows | Current role |
|---|---:|---|
| `kb_source` | 34 | Populated text FAQ table used by `/api/kb` |
| `kb_items` | 0 | Empty vector table for future semantic search |

## Schema Direction

`kb_source` fields in use: `id`, `niche`, `question`, `answer`, `topic`, `tags`, `business_key`, `is_active`, `created_at`, `updated_at`.

`kb_items` target fields: `id`, `niche`, `question`, `answer`, `topic`, `tags`, `content`, `embedding`, `business_key`, `is_active`, `updated_at`, `created_at`.

Key difference: `kb_items` adds `content` and `embedding` for vector search. It also needs `is_active` and `updated_at` for production parity with `kb_source`.

## Switch Checklist

1. **Reconcile `kb_items` schema for production readiness.**
   - Add `is_active` (bool, default true) and `updated_at`.
   - Prisma model and migration file are ready.
   - Apply the migration SQL manually in Supabase SQL Editor.

2. **Populate `kb_items` with production KB rows.**
   - Map `niche`, `question`, `answer`, `topic`, `tags`, `business_key` 1:1 from `kb_source`.
   - Import only `WHERE is_active = true`.
   - Generate `content` from niche/question/answer/topic/tags.
   - Leave `embedding` null until the embed script runs.

3. **Generate embeddings.**
   - Use Voyage AI `voyage-3`.
   - Do not fake embedding values. If the API fails, log the failure and leave the row unembedded.

4. **Add and pass parity checks.**
   - `scripts/kb-parity-check.mjs --niche hvac` must confirm 8/8 active HVAC rows match between `kb_source` and `kb_items`.

5. **Only then switch `/api/kb` to read `kb_items`.**
   - Do not change `app/api/kb/route.ts` before parity passes.

## RAG Preparation Scripts

Preparation scripts have been run successfully:

- `scripts/kb-import.mjs` copies active `kb_source` rows into `kb_items` and generates `content`.
- `scripts/kb-embed.mjs` embeds active `kb_items` rows with null `embedding` via Voyage AI.
- `scripts/kb-parity-check.mjs --niche hvac` compares `kb_source` and `kb_items`.

Applied manually in Supabase SQL Editor on 2026-04-30:

```sql
ALTER TABLE "kb_items" ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "kb_items" ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now();

INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES (gen_random_uuid()::text, 'manual', now(), '20260430000001_kb_items_add_active_updated', NULL, NULL, now(), 1);
```

Then run:

```powershell
node --env-file=.env scripts/kb-import.mjs
node --env-file=.env scripts/kb-embed.mjs
node --env-file=.env scripts/kb-parity-check.mjs --niche hvac
```

Verified results:

- Import: 34 rows read from `kb_source`, 34 rows upserted to `kb_items`.
- Embedding: 34 rows embedded, 0 failures.
- Active `kb_items`: 34 rows.
- Active `kb_items` with null `embedding`: 0 rows.
- HVAC parity: 8/8 rows matched.
- `/api/kb?niche=hvac` still returns 8 rows from `kb_source`.
