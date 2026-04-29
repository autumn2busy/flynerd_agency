import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { AGENCY_LEAD_STATUSES, CLIENT_STATUSES } from "@/lib/status-contract";

// POST /api/webhooks/ac-upsell
// ActiveCampaign webhook for "Client Retainer" upsell (MAINTENANCE -> GROWTH)
export async function POST(req: Request) {
  try {
    // ActiveCampaign webhooks send form-urlencoded data by default
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    
    // Extract contact email from AC payload (e.g., contact[email]=...)
    const email = params.get("contact[email]");

    if (!email) {
      return NextResponse.json({ error: "No email provided in webhook payload" }, { status: 400 });
    }

    // Find the matching client natively in the FlyNerd DB
    const client = await prisma.client.findFirst({
      where: { contactEmail: email }
    });

    if (!client) {
      console.log(`[AC Webhook] Upsell skipped — no client found matching email: ${email}`);
      return NextResponse.json({ message: "Client not found, ignoring webhook" });
    }

    if (!client.originLeadId) {
      return NextResponse.json(
        { error: "Client is missing originLeadId; cannot update linked AgencyLead status" },
        { status: 409 }
      );
    }

    // Keep raw status literals centralized in lib/status-contract.ts.
    const activeClientStatus = CLIENT_STATUSES[2];
    const convertedLeadStatus = AGENCY_LEAD_STATUSES[12];
    const now = new Date();

    // Upgrade both lifecycle records atomically so Client and AgencyLead cannot drift.
    const [updatedClient, updatedLead] = await prisma.$transaction([
      prisma.client.update({
        where: { id: client.id },
        data: {
          plan: "GROWTH",
          status: activeClientStatus,
          updatedAt: now,
        }
      }),
      prisma.agencyLead.update({
        where: { id: client.originLeadId },
        data: {
          status: convertedLeadStatus,
          updatedAt: now,
        }
      })
    ]);

    console.log(`[AC Webhook] Client retained! Upgraded ${client.businessName} to GROWTH sequences.`);

    return NextResponse.json({ success: true, client: updatedClient, agencyLead: updatedLead });
  } catch (error: any) {
    console.error("[AC Webhook] Error processing upsell:", error);
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
  }
}
