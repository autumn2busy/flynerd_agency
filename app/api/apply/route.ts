import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, business_name, packageName } = data;

    const apiUrl = process.env.ACTIVECAMPAIGN_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_KEY;

    if (!apiUrl || !apiKey) {
      console.warn("Missing ActiveCampaign Credentials. Proceeding to Stripe anyway.");
    } else {
      const headers = {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
      };

      // 1. Create or Update Contact
      let firstName = name;
      let lastName = "";
      if (name && name.includes(" ")) {
        const parts = name.split(" ");
        firstName = parts[0];
        lastName = parts.slice(1).join(" ");
      }

      const contactRes = await fetch(`${apiUrl}/api/3/contact/sync`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          contact: { email, firstName, lastName },
        }),
      });

      if (contactRes.ok) {
        const contactData = await contactRes.json();
        const contactId = contactData.contact.id;

        // 2. Handle Tagging (Checkout Initiated)
        const tagName = "CHECKOUT-INITIATED";
        const tagQuery = await fetch(`${apiUrl}/api/3/tags?search=${tagName}`, { headers });
        const tagQueryData = await tagQuery.json();

        let tagId;
        if (tagQueryData.tags && tagQueryData.tags.length > 0) {
          tagId = tagQueryData.tags[0].id;
        } else {
          const createTagRes = await fetch(`${apiUrl}/api/3/tags`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              tag: { tag: tagName, tagType: "contact", description: "Started checkout but hasn't paid" },
            }),
          });
          const createTagData = await createTagRes.json();
          tagId = createTagData.tag.id;
        }

        await fetch(`${apiUrl}/api/3/contactTags`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: tagId },
          }),
        });
      }
    }

    // Resolve Stripe URL based on package
    let stripeUrl = "/contact"; // Fallback
    
    // You should ensure these exact names match what you pass in from the frontend
    if (packageName === "build") {
      stripeUrl = process.env.STRIPE_LINK_BUILD_DEPOSIT || "/contact";
    } else if (packageName === "agent") {
      stripeUrl = process.env.STRIPE_LINK_AGENT_DEPOSIT || "/contact";
    } else if (packageName === "care-plan") {
      stripeUrl = process.env.STRIPE_LINK_CARE_PLAN || "/contact";
    } else if (packageName === "growth-partner") {
      stripeUrl = process.env.STRIPE_LINK_GROWTH_PARTNER || "/contact";
    } else if (packageName === "audit") {
      stripeUrl = process.env.STRIPE_LINK_AUDIT || "/contact";
    }

    // If Stripe Links are missing in ENV, alert the frontend
    if (!stripeUrl || stripeUrl === "/contact") {
      return NextResponse.json({ success: true, stripeUrl: null, message: "Missing Stripe Link" });
    }

    return NextResponse.json({ success: true, stripeUrl });
  } catch (error) {
    console.error("Apply API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
