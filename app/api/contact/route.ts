import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      business_name, 
      industry, 
      revenue, 
      challenge, 
      tools, 
      ai_experience, 
      timeline, 
      budget 
    } = body;

    // Validate required fields (optional, but good practice)
    if (!business_name || !industry) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'FlyNerd Contact Form <info@flynerdtech.com>',
      to: ['hello@flynerd.tech'],
      subject: `New Inquiry from ${business_name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Business Name:</strong> ${business_name}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Revenue Range:</strong> ${revenue}</p>
        <p><strong>Biggest Challenge:</strong> ${challenge}</p>
        <p><strong>Current Tools:</strong> ${tools}</p>
        <p><strong>AI Experience:</strong> ${ai_experience}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <hr />
        <p>This email was sent from the FlyNerd Tech contact form.</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
