import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

    // Upgrade client sequence internally mapping AC logic directly into Database state
    const updatedClient = await prisma.client.update({
      where: { id: client.id },
      data: {
        plan: "GROWTH",
        status: "ONBOARDING",
      }
    });

    console.log(`[AC Webhook] Client retained! Upgraded ${client.businessName} to GROWTH sequences.`);

    return NextResponse.json({ success: true, client: updatedClient });
  } catch (error: any) {
    console.error("[AC Webhook] Error processing upsell:", error);
    return NextResponse.json({ error: "Internal server error", message: error.message }, { status: 500 });
  }
}
