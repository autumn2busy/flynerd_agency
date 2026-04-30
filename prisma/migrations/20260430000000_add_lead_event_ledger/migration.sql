CREATE TYPE "LeadEventType" AS ENUM (
  'LEAD_CREATED',
  'LEAD_DISCOVERED',
  'LEAD_AUDITED',
  'DEMO_BUILT',
  'OUTREACH_SENT',
  'LEAD_REPLIED',
  'CALL_BOOKED',
  'CLOSED_WON',
  'CLOSED_LOST',
  'OUTREACH_EXHAUSTED',
  'DEMO_EXPIRED',
  'INBOUND_CREATED',
  'CLIENT_ACTIVATED',
  'STATUS_SET'
);

CREATE TYPE "LeadEventSource" AS ENUM ('sonata', 'n8n');

CREATE TABLE "LeadEvent" (
  "id" TEXT NOT NULL,
  "lead_id" TEXT NOT NULL,
  "event_type" "LeadEventType" NOT NULL,
  "payload" JSONB NOT NULL DEFAULT '{}',
  "source" "LeadEventSource" NOT NULL,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

  CONSTRAINT "LeadEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "idx_lead_event_event_type" ON "LeadEvent"("event_type");
CREATE INDEX "idx_lead_event_lead_created_at" ON "LeadEvent"("lead_id", "created_at");
