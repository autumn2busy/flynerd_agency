import { NextResponse } from "next/server";
import {
  upsertContact,
  addTagToContact,
  createDeal,
  updateContactField,
} from "@/lib/activecampaign";

// ActiveCampaign IDs — FlyNerd Inbound pipeline
const AC_PIPELINE_INBOUND = 4;
const AC_STAGE_DEMO_COMPLETED = 17;

// Contact custom field IDs (Option A — niche/demo_url live on the contact so
// they survive across add-on deals without needing to be copied forward.)
const CONTACT_FIELD_NICHE = 167;
const CONTACT_FIELD_DEMO_URL = 168;

// Deal custom field IDs (still deal-scoped)
const FIELD_BUSINESS_NAME = 21;

const VALID_NICHES = [
  "HVAC",
  "Plumbing",
  "Water Damage Restoration",
  "Personal Injury Law",
  "Senior Home Care",
  "Other",
];

const isDev = process.env.NODE_ENV === "development";

export async function POST(req: Request) {
  const debugLog: string[] = [];

  try {
    const body = await req.json();
    console.log("[demo-lead] Received:", JSON.stringify(body, null, 2));
    const { firstName, businessName, websiteUrl, email, niche, sessionId } = body;

    // Validate required fields
    if (!firstName?.trim()) {
      return NextResponse.json(
        { success: false, error: "First name is required" },
        { status: 400 },
      );
    }
    if (!businessName?.trim()) {
      return NextResponse.json(
        { success: false, error: "Business name is required" },
        { status: 400 },
      );
    }
    if (!websiteUrl?.trim()) {
      return NextResponse.json(
        { success: false, error: "Website URL is required" },
        { status: 400 },
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400 },
      );
    }
    if (!niche || !VALID_NICHES.includes(niche)) {
      return NextResponse.json(
        { success: false, error: "Valid industry is required" },
        { status: 400 },
      );
    }

    // a. Upsert contact with first name
    debugLog.push(`Upserting contact: ${email}`);
    const contactRes = await upsertContact(email, firstName.trim(), "");
    const contactId = contactRes.contact?.id;
    debugLog.push(`Contact ID: ${contactId ?? "MISSING"}`);

    if (!contactId) {
      console.error("[demo-lead] Contact upsert returned no ID:", JSON.stringify(contactRes));
      return NextResponse.json({
        success: false,
        error: "Contact creation failed",
        ...(isDev && { debug: debugLog, acResponse: contactRes }),
      });
    }

    // b + c. Apply tags and write contact-level custom fields (parallel)
    debugLog.push("Applying tags and contact custom fields...");
    await Promise.all([
      addTagToContact(contactId, "demo_completed"),
      addTagToContact(contactId, "inbound_demo"),
      updateContactField(contactId, String(CONTACT_FIELD_NICHE), niche),
      updateContactField(
        contactId,
        String(CONTACT_FIELD_DEMO_URL),
        websiteUrl.trim(),
      ),
    ]);
    debugLog.push("Tags and contact custom fields applied");

    // d. Create deal with business name on the deal (niche + demo_url now
    // live on the contact and do not need to be copied forward per add-on).
    const dealFields = [
      { customFieldId: FIELD_BUSINESS_NAME, fieldValue: businessName.trim() },
    ];

    debugLog.push("Creating deal...");
    const dealRes = await createDeal(
      contactId,
      `${businessName.trim()} — ${niche}`,
      125000,
      AC_PIPELINE_INBOUND,
      AC_STAGE_DEMO_COMPLETED,
      dealFields,
      `Website: ${websiteUrl.trim()} | Session: ${sessionId || "unknown"}`,
      4,
    );

    if (dealRes.error) {
      console.error("[demo-lead] Deal creation failed:", dealRes.error);
      debugLog.push(`Deal creation failed: ${dealRes.error}`);
      return NextResponse.json({
        success: false,
        error: "Deal creation failed",
        ...(isDev && { debug: debugLog, acResponse: dealRes }),
      });
    }

    debugLog.push(`Deal created: ${dealRes.deal?.id}`);

    return NextResponse.json({
      success: true,
      ...(isDev && { debug: debugLog }),
    });
  } catch (error: any) {
    console.error("[demo-lead] CRM write failed:", error.message);
    return NextResponse.json({
      success: false,
      ...(isDev && { debug: debugLog, error: error.message }),
    });
  }
}
