import { NextResponse } from "next/server";
import {
  upsertContact,
  addTagToContact,
  createDeal,
} from "@/lib/activecampaign";

// ActiveCampaign IDs — FlyNerd Inbound pipeline
const AC_PIPELINE_INBOUND = "4";
const AC_STAGE_DEMO_COMPLETED = "17";

// Deal custom field IDs
const FIELD_DEMOSITEURL = 16;
const FIELD_LEADNICHE = 18;
const FIELD_BUSINESS_NAME = 21;

const VALID_NICHES = [
  "HVAC",
  "Plumbing",
  "Water Damage Restoration",
  "Personal Injury Law",
  "Senior Home Care",
];

const isDev = process.env.NODE_ENV === "development";

export async function POST(req: Request) {
  const debugLog: string[] = [];

  try {
    const { firstName, businessName, websiteUrl, email, niche, sessionId } =
      await req.json();

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

    // b + c. Apply tags (parallel)
    debugLog.push("Applying tags...");
    await Promise.all([
      addTagToContact(contactId, "demo_completed"),
      addTagToContact(contactId, "inbound_demo"),
    ]);
    debugLog.push("Tags applied");

    // d. Create deal with custom fields inline
    const dealFields = [
      { customFieldId: FIELD_LEADNICHE, fieldValue: niche },
      { customFieldId: FIELD_DEMOSITEURL, fieldValue: websiteUrl.trim() },
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
