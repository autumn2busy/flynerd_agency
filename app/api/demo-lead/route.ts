import { NextResponse } from "next/server";
import {
  upsertContact,
  addTagToContact,
  createDeal,
  updateDealField,
} from "@/lib/activecampaign";

// ActiveCampaign IDs — FlyNerd Inbound pipeline
const AC_PIPELINE_INBOUND = "4";
const AC_STAGE_DEMO_COMPLETED = "17";
const AC_FIELD_LEADNICHE = "18";

export async function POST(req: Request) {
  try {
    const { email, niche, sessionId } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 },
      );
    }

    const nicheLabel = niche || "General";

    // a. Upsert contact
    const contactRes = await upsertContact(email, "", "");
    const contactId = contactRes.contact?.id;

    if (contactId) {
      // b + c. Apply tags (parallel)
      await Promise.all([
        addTagToContact(contactId, "demo_completed"),
        addTagToContact(contactId, "inbound_demo"),
      ]);

      // d. Create deal — value in cents ($1,250 = 125000)
      const dealRes = await createDeal(
        contactId,
        `Demo Lead - ${nicheLabel}`,
        125000,
        AC_PIPELINE_INBOUND,
        AC_STAGE_DEMO_COMPLETED,
      );

      // e. Set DEAL_LEADNICHE custom field
      const dealId = dealRes.deal?.id;
      if (dealId) {
        await updateDealField(dealId, AC_FIELD_LEADNICHE, nicheLabel);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[demo-lead] CRM write failed:", error.message);
    return NextResponse.json({ success: false });
  }
}
