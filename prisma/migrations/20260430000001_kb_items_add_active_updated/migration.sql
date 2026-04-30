ALTER TABLE "kb_items" ADD COLUMN "is_active" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "kb_items" ADD COLUMN "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now();

INSERT INTO "_prisma_migrations" (
  id,
  checksum,
  finished_at,
  migration_name,
  logs,
  rolled_back_at,
  started_at,
  applied_steps_count
)
VALUES (
  gen_random_uuid()::text,
  'manual',
  now(),
  '20260430000001_kb_items_add_active_updated',
  NULL,
  NULL,
  now(),
  1
);
