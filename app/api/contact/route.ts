import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const TARGET_NICHES = [
  "Water Damage Restoration",
  "Senior Home Care",
  "Personal Injury Law",
  "HVAC",
  "Plumbing"
];

function normalizeNiche(input: string): string {
  if (!input) return "";
  const normalizedInput = input.trim().toLowerCase();
  
  if (normalizedInput.includes("water damage") || normalizedInput.includes("restoration")) return "Water Damage Restoration";
  if (normalizedInput.includes("senior care") || normalizedInput.includes("home care") || normalizedInput.includes("elderly")) return "Senior Home Care";
  if (normalizedInput.includes("personal injury") || normalizedInput.includes("pi law") || normalizedInput.includes("accident attorney")) return "Personal Injury Law";
  if (normalizedInput.includes("hvac") || normalizedInput.includes("heating") || normalizedInput.includes("air conditioning")) return "HVAC";
  if (normalizedInput.includes("plumber") || normalizedInput.includes("plumbing")) return "Plumbing";
  
  return input;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    let {
      name,
      email,
      business_name,
      industry,
      revenue,
      challenge,
      tools,
      ai_experience,
      timeline,
      budget,
    } = data;

    industry = normalizeNiche(industry);

    const apiUrl = process.env.ACTIVECAMPAIGN_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_KEY;

    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: "Missing ActiveCampaign Credentials" },
        { status: 500 }
      );
    }

    const headers = {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
    };

    // 1. Create or Update Contact in ActiveCampaign
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
        contact: {
          email,
          firstName,
          lastName,
        },
      }),
    });

    if (!contactRes.ok) {
      console.error("Failed to sync contact", await contactRes.text());
      return NextResponse.json(
        { error: "Failed to sync contact" },
        { status: 400 }
      );
    }

    const contactData = await contactRes.json();
    const contactId = contactData.contact.id;

    // 2. Handle Tagging
    const tagName = "FLYNERD-FORM-PENDING";
    const tagQuery = await fetch(`${apiUrl}/api/3/tags?search=${tagName}`, {
      headers,
    });
    const tagQueryData = await tagQuery.json();

    let tagId;
    if (tagQueryData.tags && tagQueryData.tags.length > 0) {
      tagId = tagQueryData.tags[0].id;
    } else {
      const createTagRes = await fetch(`${apiUrl}/api/3/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          tag: { tag: tagName, tagType: "contact", description: "Form Pending" },
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

    // 3. Create Deal
    // Pipeline ID: 3, Stage ID: 8 (To Contact)
    const dealRes = await fetch(`${apiUrl}/api/3/deals`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        deal: {
          title: `Inquiry: ${business_name} (${name})`,
          contact: contactId,
          value: 0,
          currency: "usd",
          group: "3",
          stage: "8",
          status: 0, // 0 = Open
        },
      }),
    });

    let dealId;
    if (dealRes.ok) {
      const dealData = await dealRes.json();
      dealId = dealData.deal.id;

      // 4. Sync Custom Fields to Deal
      const customFields = [
        { id: 21, value: business_name },
        { id: 37, value: business_name }, // Organization Name for outreach
        { id: 22, value: industry },      // Legacy Industry field
        { id: 33, value: industry },      // LEAD_NICHE for outreach
        { id: 23, value: revenue },
        { id: 24, value: challenge },
        { id: 25, value: tools },
        { id: 26, value: ai_experience },
        { id: 27, value: timeline },
        { id: 28, value: budget },
      ];

      for (const field of customFields) {
        if (field.value) {
          await fetch(`${apiUrl}/api/3/dealCustomFieldData`, {
            method: "POST",
            headers,
            body: JSON.stringify({
              dealCustomFieldDatum: {
                dealId: dealId,
                customFieldId: field.id,
                fieldValue: field.value,
              },
            }),
          });
        }
      }
    }

    // 5. Send Notification Email via Resend
    try {
      await resend.emails.send({
        from: 'FlyNerd Contact Form <info@flynerdtech.com>',
        to: ['hello@flynerd.tech'],
        subject: `New Inquiry from ${business_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Name:</strong> ${business_name}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Revenue Range:</strong> ${revenue}</p>
          <p><strong>Biggest Challenge:</strong> ${challenge}</p>
          <p><strong>Current Tools:</strong> ${tools}</p>
          <p><strong>AI Experience:</strong> ${ai_experience}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>Budget:</strong> ${budget}</p>
          <hr />
          <p>Lead synced to ActiveCampaign Deal ID: ${dealId || 'Failed to create deal'}</p>
        `,
      });
    } catch (emailError) {
      console.error("Resend Email Notification failed (non-blocking):", emailError);
    }

    return NextResponse.json({ success: true, dealId });
  } catch (error: any) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
