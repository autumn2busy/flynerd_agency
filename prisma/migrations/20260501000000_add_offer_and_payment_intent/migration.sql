CREATE TABLE "Offer" (
  "id"                 UUID         NOT NULL DEFAULT gen_random_uuid(),
  "lead_id"            TEXT         NOT NULL,
  "profile"            TEXT         NOT NULL,
  "amount_cents"       INTEGER      NOT NULL,
  "product_name"       TEXT         NOT NULL,
  "stripe_session_id"  TEXT         NOT NULL,
  "stripe_session_url" TEXT         NOT NULL,
  "status"             TEXT         NOT NULL DEFAULT 'created',
  "metadata"           JSONB        NOT NULL DEFAULT '{}',
  "created_at"         TIMESTAMPTZ(6) NOT NULL DEFAULT now(),
  "updated_at"         TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

  CONSTRAINT "Offer_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Offer_stripe_session_id_key" UNIQUE ("stripe_session_id")
);

CREATE INDEX "idx_offer_lead_id" ON "Offer"("lead_id");
CREATE INDEX "idx_offer_status"  ON "Offer"("status");

CREATE TABLE "PaymentIntent" (
  "id"                       UUID           NOT NULL DEFAULT gen_random_uuid(),
  "offer_id"                 UUID,
  "lead_id"                  TEXT           NOT NULL,
  "stripe_payment_intent_id" TEXT,
  "stripe_event_id"          TEXT           NOT NULL,
  "stripe_event_type"        TEXT           NOT NULL,
  "amount_cents"             INTEGER,
  "currency"                 TEXT,
  "status"                   TEXT           NOT NULL,
  "raw_event"                JSONB          NOT NULL,
  "created_at"               TIMESTAMPTZ(6) NOT NULL DEFAULT now(),

  CONSTRAINT "PaymentIntent_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "PaymentIntent_stripe_event_id_key" UNIQUE ("stripe_event_id")
);

CREATE INDEX "idx_payment_intent_lead_id"    ON "PaymentIntent"("lead_id");
CREATE INDEX "idx_payment_intent_offer_id"   ON "PaymentIntent"("offer_id");
CREATE INDEX "idx_payment_intent_event_type" ON "PaymentIntent"("stripe_event_type");
