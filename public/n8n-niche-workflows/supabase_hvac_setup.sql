-- ============================================================
-- HVAC Chat Agent — Supabase Setup
-- Run this entire script in Supabase SQL Editor
-- ============================================================

-- 1. CREATE lead_messages TABLE
-- Stores chat conversation history per session
-- ============================================================

CREATE TABLE IF NOT EXISTS lead_messages (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_key TEXT NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content     TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_lead_messages_session_key
  ON lead_messages (session_key);

CREATE INDEX IF NOT EXISTS idx_lead_messages_created_at
  ON lead_messages (created_at);

ALTER TABLE lead_messages ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (n8n connects with service_role key)
CREATE POLICY "Service role full access on lead_messages"
  ON lead_messages FOR ALL
  USING (true) WITH CHECK (true);


-- 2. CREATE upsert_lead FUNCTION
-- Atomic insert-or-update on AgencyLead keyed by session_key
-- Called via Supabase RPC from n8n
-- ============================================================

CREATE OR REPLACE FUNCTION upsert_lead(
  p_session_key          TEXT,
  p_business_name        TEXT DEFAULT NULL,
  p_niche                TEXT DEFAULT 'HVAC',
  p_stage                TEXT DEFAULT 'New',
  p_lead_type            TEXT DEFAULT 'inbound_chat',
  p_issue_type           TEXT DEFAULT NULL,
  p_equipment_type       TEXT DEFAULT NULL,
  p_urgency              TEXT DEFAULT NULL,
  p_system_down          BOOLEAN DEFAULT FALSE,
  p_name                 TEXT DEFAULT NULL,
  p_phone                TEXT DEFAULT NULL,
  p_email                TEXT DEFAULT NULL,
  p_service_address      TEXT DEFAULT NULL,
  p_zip                  TEXT DEFAULT NULL,
  p_preferred_time_window TEXT DEFAULT NULL,
  p_priority             TEXT DEFAULT NULL,
  p_consent_to_contact   BOOLEAN DEFAULT FALSE,
  p_chat_summary         TEXT DEFAULT NULL,
  p_place_id             TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB;
BEGIN
  INSERT INTO "AgencyLead" (
    id,
    session_key,
    "businessName",
    niche,
    stage,
    lead_type,
    issue_type,
    equipment_type,
    urgency,
    system_down,
    name,
    phone,
    email,
    service_address,
    zip,
    preferred_time_window,
    priority,
    consent_to_contact,
    chat_summary,
    "placeId",
    "leadSource",
    "updatedAt",
    updated_at
  ) VALUES (
    gen_random_uuid()::text,
    p_session_key,
    COALESCE(p_business_name, 'Unknown'),
    p_niche,
    p_stage,
    p_lead_type,
    p_issue_type,
    p_equipment_type,
    p_urgency,
    p_system_down,
    p_name,
    p_phone,
    p_email,
    p_service_address,
    p_zip,
    p_preferred_time_window,
    p_priority,
    p_consent_to_contact,
    p_chat_summary,
    p_place_id,
    'INBOUND',
    now(),
    now()
  )
  ON CONFLICT (session_key) DO UPDATE SET
    "businessName"        = COALESCE(NULLIF(EXCLUDED."businessName", 'Unknown'), "AgencyLead"."businessName"),
    stage                 = COALESCE(EXCLUDED.stage, "AgencyLead".stage),
    issue_type            = COALESCE(EXCLUDED.issue_type, "AgencyLead".issue_type),
    equipment_type        = COALESCE(EXCLUDED.equipment_type, "AgencyLead".equipment_type),
    urgency               = COALESCE(EXCLUDED.urgency, "AgencyLead".urgency),
    system_down           = COALESCE(EXCLUDED.system_down, "AgencyLead".system_down),
    name                  = COALESCE(EXCLUDED.name, "AgencyLead".name),
    phone                 = COALESCE(EXCLUDED.phone, "AgencyLead".phone),
    email                 = COALESCE(EXCLUDED.email, "AgencyLead".email),
    service_address       = COALESCE(EXCLUDED.service_address, "AgencyLead".service_address),
    zip                   = COALESCE(EXCLUDED.zip, "AgencyLead".zip),
    preferred_time_window = COALESCE(EXCLUDED.preferred_time_window, "AgencyLead".preferred_time_window),
    priority              = COALESCE(EXCLUDED.priority, "AgencyLead".priority),
    consent_to_contact    = COALESCE(EXCLUDED.consent_to_contact, "AgencyLead".consent_to_contact),
    chat_summary          = COALESCE(EXCLUDED.chat_summary, "AgencyLead".chat_summary),
    "updatedAt"           = now(),
    updated_at            = now()
  RETURNING to_jsonb("AgencyLead".*) INTO result;

  RETURN result;
END;
$$;


-- 3. VERIFY
-- ============================================================
-- Test the lead_messages table:
--   SELECT * FROM lead_messages LIMIT 1;
--
-- Test the upsert function:
--   SELECT upsert_lead('test_session_123', 'Test HVAC Co');
--   SELECT upsert_lead('test_session_123', NULL, 'HVAC', 'Qualified');
--   -- ^ second call should UPDATE, not create duplicate
--
-- Clean up test data:
--   DELETE FROM "AgencyLead" WHERE session_key = 'test_session_123';
