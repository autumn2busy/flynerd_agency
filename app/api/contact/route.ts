import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
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
          title: "AI Web Demo - Booking form",
          contact: contactId,
          value: 0,
          currency: "usd",
          group: "3",
          stage: "8",
          status: 0, // 0 = Open
        },
      }),
    });

    if (!dealRes.ok) {
      console.error("Failed to create deal", await dealRes.text());
      return NextResponse.json(
        { error: "Failed to create deal" },
        { status: 400 }
      );
    }

    const dealData = await dealRes.json();
    const dealId = dealData.deal.id;

    // 4. Sync Custom Fields to Deal
    const customFields = [
      { id: 21, value: business_name },
      { id: 22, value: industry },
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

    return NextResponse.json({ success: true, dealId });
  } catch (error) {
    console.error("Contact API Route Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
