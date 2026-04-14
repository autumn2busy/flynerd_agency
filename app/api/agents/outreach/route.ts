import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { upsertContact, addTagToContact, subscribeContactToList, createDeal, updateDealField, normalizeNiche } from "@/lib/activecampaign";

// POST /api/agents/outreach
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { leadId, businessName, contactEmail, demoSiteUrl, walkthroughVideoUrl, niche } = body;

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
        data: { status: "OUTREACH_SENT" },
      });
      return NextResponse.json({ message: "No email, marked as pitched." });
    }

    // Use ActiveCampaign to trigger outreach
    // Fetch lead record to get real data (phone, niche, etc.)
    const lead = await prisma.agencyLead.findUnique({ where: { id: leadId } });
    
    // 1. Create or Update Contact
    const contactRes = await upsertContact(contactEmail, businessName, "Business", lead?.contactPhone || undefined);
    const contactId = contactRes.contact?.id;

    console.log(`[Outreach Agent] Contact Sync Result:`, JSON.stringify(contactRes, null, 2));

    if (!contactId) {
      console.error("[Outreach Agent] FAILED to get contactId. Response:", contactRes);
      return NextResponse.json({ 
        error: "Failed to sync contact to ActiveCampaign",
        details: contactRes 
      }, { status: 500 });
    }

    // 2. Subscription
    const subRes = await subscribeContactToList(contactId, "29");
    console.log(`[Outreach Agent] Subscription Result for List 29:`, JSON.stringify(subRes, null, 2));

    // 3. CREATE DEAL
    const dealTitle = `AI Web Demo - ${businessName}`;
    const dealValue = 250000; // $2,500.00
    
    // Using Flynerd Outbound/Cold Pipeline (ID: 3) and 'Outreach Pitched' Stage (ID: 11)
    console.log(`[Outreach Agent] Attempting to create deal in Pipeline 3, Stage 11...`);
    const dealRes = await createDeal(contactId, dealTitle, dealValue, 3, 11);
    
    if (dealRes.error) {
      console.error("[Outreach Agent] Deal Creation FAILED:", dealRes.error);
      return NextResponse.json({ 
        error: "ActiveCampaign Deal Creation Failed", 
        details: dealRes.error 
      }, { status: 500 });
    }

    const dealId = dealRes.deal?.id;
    console.log(`[Outreach Agent] Created Deal ID: ${dealId}`);

    if (dealId && lead) {
      // 4. Map the Deal Custom Fields (Matches definitive AC Audit)
      console.log(`[Outreach Agent] Updating custom fields for Deal ${dealId}...`);
      if (demoSiteUrl) await updateDealField(dealId, "16", demoSiteUrl);
      if (walkthroughVideoUrl) await updateDealField(dealId, "17", walkthroughVideoUrl);
      const finalNiche = normalizeNiche(niche || lead?.niche || "");
      console.log(`[Outreach Agent] Setting Niche (18): ${finalNiche}`);
      if (finalNiche) await updateDealField(dealId, "18", finalNiche);
      
      if (businessName) await updateDealField(dealId, "40", businessName);
      if (lead.intelScore !== null) await updateDealField(dealId, "19", lead.intelScore.toString());
      
      const pptList = (lead.intelData as any)?.painPoints;
      const painPointsStr = Array.isArray(pptList) && pptList.length > 0
        ? pptList.join(", ")
        : "attracting high-quality and consistent clients online";
        
      await updateDealField(dealId, "20", painPointsStr);
    }

    await addTagToContact(contactId, "FLYNERD_OUTREACH_PENDING");
    await addTagToContact(contactId, "COLD_OUTREACH");

    const updatedLead = await prisma.agencyLead.update({
      where: { id: leadId },
      data: {
        status: "OUTREACH_SENT",
        outreachHistory: [
          {
            type: "activecampaign",
            contactId,
            timestamp: new Date(),
          },
        ],
      },
    });

    return NextResponse.json({
      message: "Lead pushed to ActiveCampaign for outreach automation.",
      contactId,
      dealId,
      lead: updatedLead,
    });
  } catch (error: any) {
    console.error("Outreach Agent Fatal Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

