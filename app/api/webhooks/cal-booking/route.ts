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
      case "MEETING_ENDED":
        await handleMeetingEnded(attendeeEmail, payload);
        break;
      case "BOOKING_NO_SHOW_UPDATED":
        // Fires when someone manually marks a booking as no-show in the
        // Cal.com dashboard (Autumn's primary path for Google Meet).
        await handleBookingNoShow(attendeeEmail, payload);
        break;
      case "AFTER_GUESTS_CAL_VIDEO_NO_SHOW":
        // Fires automatically when Cal Video detects no guest joined
        // within the configured window. Only works with Cal Video
        // (NOT Google Meet). Safe to have registered either way — if
        // using Google Meet, Cal.com simply never fires it.
        await handleBookingNoShow(attendeeEmail, payload);
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

  // Safety-net Dre dispatch. Only fires when the booking did NOT come
  // through /api/apply (i.e. the booker used a direct Cal.com link).
  //
  // When /api/apply runs first it embeds "Apply ID: <uuid>" in the
  // Cal.com notes via ?notes= prefill. We detect that here and skip
  // the dispatch to prevent a second AgencyLead row being created for
  // the same person. If "Apply ID:" is absent, this is a direct
  // Cal.com booking and we still build a sparse demo as a fallback.
  const notes = payload.additionalNotes ?? "";
  const cameFromApplyForm = /^Apply ID:/im.test(notes);
  if (cameFromApplyForm) {
    console.log(
      `[cal-webhook] skipping safety-net Dre dispatch — booking came through /apply (Apply ID found in notes) for email=${email}`,
    );
  } else {
    dispatchWarmApplyFromBooking(email, name, contactId, payload);
  }
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

// Cal.com fires BOOKING_NO_SHOW_UPDATED when a host manually flips the
// no-show flag on a booking (dashboard or API). Also called from the
// AFTER_GUESTS_CAL_VIDEO_NO_SHOW handler above for the auto-detection
// path when using Cal Video.
//
// Flow: abort the post-call automation mid-grace-period by stripping
// CALL_COMPLETED (which triggers automation 502). Also strip CALL_BOOKED
// since they effectively didn't have a call. Then apply WARM_LEAD_NO_SHOW
// so a re-engagement automation can fire.
//
// Payload caveat: Cal.com sends BOOKING_NO_SHOW_UPDATED for both
// marking AND unmarking (rare — someone flips back to "attended" after a
// typo). We check the payload's noShow field when present; if missing or
// falsy, we skip the state change.
async function handleBookingNoShow(
  email: string,
  payload: CalBookingPayload["payload"],
): Promise<void> {
  const apiUrl = process.env.ACTIVECAMPAIGN_URL;
  const apiKey = process.env.ACTIVECAMPAIGN_KEY;
  if (!apiUrl || !apiKey) {
    console.warn(
      `[cal-webhook] AC creds missing — can't process no-show for email=${email}`,
    );
    return;
  }

  // Cal.com payload may include a `noShow` boolean or an attendee-level
  // noShow flag. Check both shapes. If explicitly false, this is an
  // unmark action — don't apply the no-show tag.
  const payloadAny = payload as unknown as Record<string, unknown>;
  const topLevelNoShow =
    typeof payloadAny.noShow === "boolean" ? payloadAny.noShow : null;
  const attendeeNoShow =
    (payload.attendees?.[0] as unknown as Record<string, unknown> | undefined)
      ?.noShow;
  const isMarkedNoShow =
    topLevelNoShow === true ||
    attendeeNoShow === true ||
    // Fallback: if no explicit flag, treat the event as a no-show signal
    // (AFTER_GUESTS_CAL_VIDEO_NO_SHOW sometimes omits the flag in payload).
    (topLevelNoShow === null && attendeeNoShow === undefined);

  if (!isMarkedNoShow) {
    console.log(
      `[cal-webhook] BOOKING_NO_SHOW_UPDATED for ${email} but noShow=false — skipping (unmark action)`,
    );
    return;
  }

  const contactId = await findContactIdByEmail(apiUrl, apiKey, email);
  if (!contactId) {
    console.error(
      `[cal-webhook] no-show fired but no AC contact found for email=${email} uid=${payload.uid}`,
    );
    return;
  }

  // Abort automation 502 mid-wait: remove CALL_COMPLETED. Also clear
  // CALL_BOOKED since effectively they didn't have a call. Order matters:
  // remove before applying WARM_LEAD_NO_SHOW so no race with a tag-add
  // trigger on the new tag checking for CALL_COMPLETED absence.
  await Promise.all([
    removeTag(apiUrl, apiKey, contactId, "CALL_COMPLETED"),
    removeTag(apiUrl, apiKey, contactId, "CALL_BOOKED"),
  ]);

  await applyTag(apiUrl, apiKey, contactId, "WARM_LEAD_NO_SHOW");
  console.log(
    `[cal-webhook] no-show processed: removed CALL_COMPLETED + CALL_BOOKED, applied WARM_LEAD_NO_SHOW for contactId=${contactId} (uid=${payload.uid})`,
  );
}

// Cal.com fires MEETING_ENDED when a scheduled meeting's end time passes.
// Fires based on calendar time, NOT actual attendance — so no-shows still
// trigger this. For v1 that's acceptable: Autumn can manually remove the
// CALL_COMPLETED tag for no-shows to stop the Kris automation from sending
// a payment link to someone who didn't attend.
//
// Upgrade path (later): cross-reference Google Meet attendance via the
// Google Calendar API before tagging. Out of scope right now.
//
// Tagging CALL_COMPLETED here is the trigger for AC automation 502
// ("FlyNerd — Call Completed Post-Call Close") which fires the Kris
// webhook. Do not tag both CALL_COMPLETED and CALL_COMPLETED_PROCESSED
// from this handler — the AC automation itself handles the transition
// between those two as part of its internal idempotency bookkeeping.
async function handleMeetingEnded(
  email: string,
  payload: CalBookingPayload["payload"],
): Promise<void> {
  const apiUrl = process.env.ACTIVECAMPAIGN_URL;
  const apiKey = process.env.ACTIVECAMPAIGN_KEY;
  if (!apiUrl || !apiKey) {
    console.warn(
      `[cal-webhook] AC creds missing — can't apply CALL_COMPLETED tag for email=${email}`,
    );
    return;
  }

  const contactId = await findContactIdByEmail(apiUrl, apiKey, email);
  if (!contactId) {
    console.error(
      `[cal-webhook] meeting ended but no AC contact found for email=${email} uid=${payload.uid}`,
    );
    return;
  }

  // Guard against double-processing. If the contact already has the
  // CALL_COMPLETED_PROCESSED tag from a prior meeting, don't re-fire the
  // post-call automation. This matters when a lead has multiple bookings
  // over time (e.g. discovery call + separate kickoff call).
  const alreadyProcessed = await hasTag(
    apiUrl,
    apiKey,
    contactId,
    "CALL_COMPLETED_PROCESSED",
  );
  if (alreadyProcessed) {
    console.log(
      `[cal-webhook] skipping CALL_COMPLETED: contactId=${contactId} already has CALL_COMPLETED_PROCESSED`,
    );
    return;
  }

  await applyTag(apiUrl, apiKey, contactId, "CALL_COMPLETED");
  console.log(
    `[cal-webhook] applied CALL_COMPLETED tag to contactId=${contactId} after MEETING_ENDED (uid=${payload.uid}, endTime=${payload.endTime}). AC automation 502 should fire next.`,
  );
}

// Lightweight check: does the given contact have the specified tag?
// Used to skip CALL_COMPLETED re-application when the post-call automation
// has already run once.
async function hasTag(
  apiUrl: string,
  apiKey: string,
  contactId: string,
  tagName: string,
): Promise<boolean> {
  const headers = { "Api-Token": apiKey };
  // Look up the tag's numeric ID first
  const tagLookup = await fetch(
    `${apiUrl}/api/3/tags?search=${encodeURIComponent(tagName)}`,
    { headers },
  );
  if (!tagLookup.ok) return false;
  const tagData = await tagLookup.json();
  const tagId = tagData?.tags?.[0]?.id;
  if (!tagId) return false;

  // Then check if this contact has that tag ID applied
  const contactTagsRes = await fetch(
    `${apiUrl}/api/3/contacts/${contactId}/contactTags`,
    { headers },
  );
  if (!contactTagsRes.ok) return false;
  const contactTagsData = await contactTagsRes.json();
  const contactTags: Array<{ tag: string | number }> =
    contactTagsData?.contactTags ?? [];
  return contactTags.some((ct) => String(ct.tag) === String(tagId));
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

// ─────────────────────────────────────────────────────────────
// Sonata-stack warm-apply safety-net dispatch.
//
// Parses Cal.com's booking notes (we set these via the Cal.com embed's
// ?notes= prefill param) to reconstruct a minimum viable warm-apply
// payload. If the notes are missing the expected fields (because the
// booker came via a direct Cal.com link, not through /apply), we fall
// back to placeholder strings — Dre will produce a sparse demo, but a
// demo nonetheless.
//
// Fire-and-forget: we do not await.
// ─────────────────────────────────────────────────────────────
function dispatchWarmApplyFromBooking(
  email: string,
  name: string,
  _contactId: string,
  payload: CalBookingPayload["payload"],
): void {
  const sonataUrl = process.env.SONATA_STACK_URL;
  const sonataSecret = process.env.SONATA_WEBHOOK_SECRET;

  if (!sonataUrl || !sonataSecret) {
    console.warn(
      `[cal-webhook] SONATA_STACK_URL or SONATA_WEBHOOK_SECRET missing — skipping safety-net Dre dispatch for email=${email}`,
    );
    return;
  }

  // Parse notes block. /api/apply sets notes to:
  //   Business: Acme Aesthetics
  //   Website: https://acme.com
  //   Niche: Med Spa / Aesthetics
  //   Apply ID: <uuid>
  const notes = payload.additionalNotes ?? "";
  const pick = (label: string): string => {
    const re = new RegExp(`^${label}:\\s*(.+)$`, "im");
    const m = notes.match(re);
    return m ? m[1].trim() : "";
  };

  const businessName = pick("Business") || name || "Unknown business";
  const websiteUrl = pick("Website") || "(no website provided)";
  const niche = pick("Niche") || "Unknown";

  // Normalize: trim, drop trailing slash, prepend https:// if missing.
  // Without the scheme check, fetch() throws ERR_INVALID_URL which caused
  // 100% of 2026-04-22 warm-apply dispatches to fail silently.
  const trimmed = sonataUrl.trim().replace(/\/+$/, "");
  const base = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const target = `${base}/webhooks/warm-apply`;

  const body = {
    email,
    name: name || "Unknown",
    businessName,
    websiteUrl,
    niche,
    // Sparse defaults when we came from a direct Cal.com booking (no /apply)
    services: "(to be determined on call)",
    painPoint:
      "Direct Cal.com booking — qualification info will be collected on the strategy call.",
    leadVolume: "Unknown",
    timeline: "Unknown",
    tools: "",
    applyId: payload.uid ?? "",
    contactId: _contactId,
  };

  void fetch(target, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-secret": sonataSecret,
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      if (res.ok) {
        console.log(
          `[cal-webhook] warm-apply safety-net dispatched email=${email} bookingUid=${payload.uid} status=${res.status}`,
        );
      } else {
        const preview = (await res.text().catch(() => "")).slice(0, 200);
        console.error(
          `[cal-webhook] warm-apply dispatch FAILED email=${email} status=${res.status} body=${preview}`,
        );
      }
    })
    .catch((err) => {
      console.error(
        `[cal-webhook] warm-apply dispatch threw for email=${email}:`,
        err,
      );
    });
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

// Remove a tag from a contact. Tolerant of the tag not being applied
// (the tag-lookup-then-contactTag-find resolves to a no-op) and of
// arbitrary AC quirks by swallowing errors with logging.
async function removeTag(
  apiUrl: string,
  apiKey: string,
  contactId: string,
  tagName: string,
): Promise<void> {
  try {
    const headers = { "Api-Token": apiKey };

    // 1. Find the tag's numeric ID
    const tagQuery = await fetch(
      `${apiUrl}/api/3/tags?search=${encodeURIComponent(tagName)}`,
      { headers },
    );
    if (!tagQuery.ok) return;
    const tagData = await tagQuery.json();
    const tagId = tagData?.tags?.[0]?.id;
    if (!tagId) return; // Tag doesn't exist in AC; nothing to remove

    // 2. Find the contactTag join record that links contact + tag
    const ctRes = await fetch(
      `${apiUrl}/api/3/contacts/${contactId}/contactTags`,
      { headers },
    );
    if (!ctRes.ok) return;
    const ctData = await ctRes.json();
    const join = (ctData?.contactTags ?? []).find(
      (row: { id?: string | number; tag?: string | number }) =>
        String(row.tag) === String(tagId),
    );
    if (!join?.id) return; // Tag isn't currently applied

    // 3. Delete the join record
    await fetch(`${apiUrl}/api/3/contactTags/${join.id}`, {
      method: "DELETE",
      headers,
    });
  } catch (err) {
    console.error(
      `[cal-webhook] removeTag failed for contactId=${contactId} tag=${tagName}:`,
      err,
    );
  }
}
