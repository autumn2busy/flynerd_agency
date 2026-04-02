import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { upsertContact, addTagToContact, subscribeContactToList, createDeal, updateDealField } from "@/lib/activecampaign";

// POST /api/agents/outreach
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, businessName, contactEmail, demoSiteUrl, walkthroughVideoUrl } = body;

    if (!leadId || !businessName || !demoSiteUrl) {
      return NextResponse.json(
        { error: "Missing required fields: leadId, businessName, demoSiteUrl" },
        { status: 400 }
      );
    }

    if (!contactEmail) {
      console.log(`[Outreach Agent] No email for ${businessName}. Skipping.`);
      await prisma.agencyLead.update({
        where: { id: leadId },
        data: { status: "PITCHED" },
      });
      return NextResponse.json({ message: "No email, marked as pitched." });
    }

    // Use ActiveCampaign to trigger outreach
    // Fetch lead record to get real data (phone, niche, etc.)
    const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
    
    const contactRes = await upsertContact(contactEmail, businessName, "Business", lead?.contactPhone || undefined);
    const contactId = contactRes.contact?.id;

    if (!contactId) {
      return NextResponse.json({ error: "Failed to sync contact to ActiveCampaign" }, { status: 500 });
    }

    // Subscription
    await subscribeContactToList(contactId, "29");
    console.log(`[Outreach Agent] Subscribed Contact ${contactId} to List 29.`);

    // 1. CREATE DEAL TO TRIGGER 1:1 AUTOMATION
    const dealTitle = `AI Web Demo - ${businessName}`;
    const dealValue = 250000; // $2,500.00
    
    // Using Flynerd Auto-Pilot Pipeline (ID: 1) and 'Negotiating' Stage (ID: 12)
    const dealRes = await createDeal(contactId, dealTitle, dealValue, 1, 12);
    const dealId = dealRes.deal?.id;
    console.log(`[Outreach Agent] Created Deal '${dealTitle}' (ID: ${dealId}) for Contact ${contactId}.`);

    if (dealId && lead) {
      // 2. Map the Deal Custom Fields (IDs based on AC Audit)
      // 34: DEMO_SITE_URL, 35: DEMO_VIDEO_URL, 33: LEAD_NICHE, 36: LEAD_PAINPOINT, 37: DEAL_ORGANIZATION_NAME
      if (demoSiteUrl) await updateDealField(dealId, "34", demoSiteUrl);
      if (walkthroughVideoUrl) await updateDealField(dealId, "35", walkthroughVideoUrl);
      if (lead.niche) await updateDealField(dealId, "33", lead.niche);
      if (businessName) await updateDealField(dealId, "37", businessName);
      if (lead.intelScore !== null) await updateDealField(dealId, "19", lead.intelScore.toString());
      
      const pptList = (lead.intelData as any)?.painPoints;
      const painPointsStr = Array.isArray(pptList) && pptList.length > 0
        ? pptList.join(", ")
        : "attracting high-quality and consistent clients online";
        
      await updateDealField(dealId, "36", painPointsStr);
      console.log(`[Outreach Agent] Pushed Deal custom fields for ${businessName}.`);
    }

    await addTagToContact(contactId, "FLYNERD_OUTREACH_PENDING");

    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "PITCHED",
        outreachHistory: [
          {
            type: "activecampaign",
            status: "deal_created_and_tagged",
            contactId,
            timestamp: new Date(),
          },
        ],
      },
    });

    return NextResponse.json({
      message: "Lead pushed to ActiveCampaign for outreach automation.",
      contactId,
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error("Outreach Agent Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

