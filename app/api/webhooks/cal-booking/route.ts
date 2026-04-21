import { NextResponse } from "next/server";
import crypto from "node:crypto";

// Cal.com Booking Webhook
// =======================
//
// Receives booking events from Cal.com when a prospect books/reschedules/
// cancels a strategy call. Verifies the HMAC-SHA256 signature in the
// X-Cal-Signature-256 header against the CAL_WEBHOOK_SECRET env var, then
// updates the AC contact's tags + notes accordingly.
//
// Configure in Cal.com:
//   Settings → Developer → Webhooks → Add
//     Subscriber URL: https://flynerd.tech/api/webhooks/cal-booking
//     Triggers: BOOKING_CREATED, BOOKING_RESCHEDULED, BOOKING_CANCELLED
//     Secret: <the 64-char hex you generated>
//
// Signature verification:
//   Cal.com computes HMAC-SHA256(secret, raw_body) and sends it as
//   hex in the X-Cal-Signature-256 header. We reject mismatches with 401.
//
// Response contract:
//   Always returns 200 on valid signatures so Cal.com doesn't retry.
//   AC write failures are logged but don't fail the webhook.
//
// TODO (next turn): on BOOKING_CREATED also trigger Dre demo build via
// sonata-stack MCP so the demo is ready before the scheduled call.

interface CalBookingPayload {
  triggerEvent: string;
  createdAt?: string;
  payload: {
    bookingId?: number;
    uid?: string;
    title?: string;
    startTime?: string;
    endTime?: string;
    type?: string;
    // The attendee(s) — we care about the first one (the prospect)
    attendees?: Array<{
      email: string;
      name: string;
      timeZone?: string;
    }>;
    organizer?: {
      email: string;
      name: string;
    };
    // Prefill/custom questions we set on the event type
    responses?: Record<string, { label?: string; value?: string } | string>;
    // Free-text booking notes (where we pass business + URL + niche via prefill)
    additionalNotes?: string;
    // Meeting link (Google Meet / Zoom / etc)
    location?: string;
    metadata?: Record<string, unknown>;
  };
}

export async function POST(req: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error(
      "[cal-webhook] CAL_WEBHOOK_SECRET env var missing — refusing request",
    );
    return NextResponse.json(
      { error: "Webhook secret not configured on server" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("x-cal-signature-256");
  if (!signature) {
    console.error("[cal-webhook] missing X-Cal-Signature-256 header");
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 401 },
    );
  }

  // Read body as raw text so HMAC can be computed over the exact bytes
  // Cal.com signed. Parsing JSON first would break the signature.
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error("[cal-webhook] failed to read body:", err);
    return NextResponse.json({ error: "Malformed body" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  // timingSafeEqual to avoid timing oracles. Both buffers must be same length.
  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expected, "hex");
  if (
    sigBuf.length !== expBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expBuf)
  ) {
    console.error(
      `[cal-webhook] signature mismatch. got=${signature.slice(0, 10)}... expected=${expected.slice(0, 10)}...`,
    );
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let parsed: CalBookingPayload;
  try {
    parsed = JSON.parse(rawBody) as CalBookingPayload;
  } catch (err) {
    console.error("[cal-webhook] JSON parse failed:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { triggerEvent, payload } = parsed;
  const attendeeEmail = payload?.attendees?.[0]?.email;
  const attendeeName = payload?.attendees?.[0]?.name ?? "";

  console.log(
    `[cal-webhook] event=${triggerEvent} attendee=${attendeeEmail} startTime=${payload?.startTime}`,
  );

  if (!attendeeEmail) {
    console.error("[cal-webhook] no attendee email in payload");
    return NextResponse.json({ ok: true, skipped: "no-attendee" });
  }

  // Event-type dispatch. All of these are best-effort; we always return 200
  // so Cal.com doesn't retry. Logs are the forensic trail.
  try {
    switch (triggerEvent) {
      case "BOOKING_CREATED":
      case "BOOKING_CONFIRMED":
        await handleBookingCreated(attendeeEmail, attendeeName, payload);
        break;
      case "BOOKING_RESCHEDULED":
        await handleBookingRescheduled(attendeeEmail, payload);
        break;
      case "BOOKING_CANCELLED":
        await handleBookingCancelled(attendeeEmail, payload);
        break;
      default:
        console.log(
          `[cal-webhook] ignoring unhandled event: ${triggerEvent}`,
        );
    }
  } catch (err) {
    console.error(`[cal-webhook] handler for ${triggerEvent} failed:`, err);
  }

  return NextResponse.json({ ok: true });
}

// ─────────────────────────────────────────────────────────────
// Handlers
// ─────────────────────────────────────────────────────────────

async function handleBookingCreated(
  email: string,
  name: string,
  payload: CalBookingPayload["payload"],
): Promise<void> {
  const apiUrl = process.env.ACTIVECAMPAIGN_URL;
  const apiKey = process.env.ACTIVECAMPAIGN_KEY;
  if (!apiUrl || !apiKey) {
    console.warn(
      "[cal-webhook] AC creds missing, can't tag contact — booking was accepted but CRM is out of sync",
    );
    return;
  }

  const contactId = await syncContactId(apiUrl, apiKey, email, name);
  if (!contactId) {
    console.error(
      `[cal-webhook] failed to resolve AC contactId for email=${email}`,
    );
    return;
  }

  await applyTag(apiUrl, apiKey, contactId, "CALL_BOOKED");
  console.log(
    `[cal-webhook] applied CALL_BOOKED tag to contactId=${contactId} for email=${email}`,
  );

  // TODO (next turn): fire Dre demo build for this lead.
  //
  // Call sonata-stack's warm-lead builder endpoint (or MCP tool) with
  // the payload we captured. sonata-stack creates the AgencyLead row,
  // runs Simon+Yoncé+Dre, writes %DEMOURL% to AC contact field 168.
  //
  // Dispatch pattern (fire-and-forget, don't block the webhook response):
  //   const sonataUrl = process.env.SONATA_STACK_URL;
  //   const sonataSecret = process.env.SONATA_WEBHOOK_SECRET;
  //   if (sonataUrl && sonataSecret) {
  //     void fetch(`${sonataUrl}/webhooks/warm-apply`, {
  //       method: "POST",
  //       headers: { "x-webhook-secret": sonataSecret },
  //       body: JSON.stringify({ email, name, contactId, startTime: payload.startTime, ... }),
  //     }).catch(err => console.error("[cal-webhook] Dre dispatch failed:", err));
  //   }

  console.log(
    `[cal-webhook] TODO trigger Dre for email=${email} startTime=${payload.startTime}`,
  );
}

async function handleBookingRescheduled(
  email: string,
  payload: CalBookingPayload["payload"],
): Promise<void> {
  console.log(
    `[cal-webhook] booking rescheduled for email=${email} to startTime=${payload.startTime}`,
  );
  // No CRM write needed right now; call is still booked, just at a new time.
}

async function handleBookingCancelled(
  email: string,
  payload: CalBookingPayload["payload"],
): Promise<void> {
  const apiUrl = process.env.ACTIVECAMPAIGN_URL;
  const apiKey = process.env.ACTIVECAMPAIGN_KEY;
  if (!apiUrl || !apiKey) return;

  const contactId = await findContactIdByEmail(apiUrl, apiKey, email);
  if (!contactId) return;

  await applyTag(apiUrl, apiKey, contactId, "CALL_CANCELLED");
  console.log(
    `[cal-webhook] applied CALL_CANCELLED tag to contactId=${contactId} uid=${payload.uid}`,
  );
}

// ─────────────────────────────────────────────────────────────
// AC helpers
// ─────────────────────────────────────────────────────────────

async function syncContactId(
  apiUrl: string,
  apiKey: string,
  email: string,
  name: string,
): Promise<string | null> {
  let firstName = name;
  let lastName = "";
  if (name && name.includes(" ")) {
    const parts = name.split(" ");
    firstName = parts[0];
    lastName = parts.slice(1).join(" ");
  }

  const res = await fetch(`${apiUrl}/api/3/contact/sync`, {
    method: "POST",
    headers: { "Api-Token": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ contact: { email, firstName, lastName } }),
  });
  if (!res.ok) {
    console.error(
      `[cal-webhook] contact/sync failed status=${res.status} body=${await res.text()}`,
    );
    return null;
  }
  const data = await res.json();
  return data?.contact?.id ?? null;
}

async function findContactIdByEmail(
  apiUrl: string,
  apiKey: string,
  email: string,
): Promise<string | null> {
  const res = await fetch(
    `${apiUrl}/api/3/contacts?email=${encodeURIComponent(email)}`,
    { headers: { "Api-Token": apiKey } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data?.contacts?.[0]?.id ?? null;
}

async function applyTag(
  apiUrl: string,
  apiKey: string,
  contactId: string,
  tagName: string,
): Promise<void> {
  const headers = {
    "Api-Token": apiKey,
    "Content-Type": "application/json",
  };

  const tagQuery = await fetch(`${apiUrl}/api/3/tags?search=${tagName}`, {
    headers,
  });
  const tagData = await tagQuery.json();

  let tagId;
  if (tagData.tags && tagData.tags.length > 0) {
    tagId = tagData.tags[0].id;
  } else {
    const createRes = await fetch(`${apiUrl}/api/3/tags`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        tag: {
          tag: tagName,
          tagType: "contact",
          description: `Auto-created by /api/webhooks/cal-booking (${new Date().toISOString()})`,
        },
      }),
    });
    const createData = await createRes.json();
    tagId = createData.tag.id;
  }

  await fetch(`${apiUrl}/api/3/contactTags`, {
    method: "POST",
    headers,
    body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }),
  });
}
