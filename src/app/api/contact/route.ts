import { NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, program, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    // 1. Store lead in Firebase Firestore
    try {
      await addDoc(collection(db, 'inquiries'), {
        name,
        phone,
        email: email || '',
        program: program || 'General',
        message: message || '',
        status: 'new',
        createdAt: serverTimestamp(),
      });
    } catch (dbErr) {
      console.warn('Firestore write warning:', dbErr);
    }

    // 2. Dispatch email via Resend API
    const adminEmail = process.env.ADMIN_EMAIL || 'shanmugam01212@gmail.com';
    try {
      await resend.emails.send({
        from: 'Isha Gym Website <onboarding@resend.dev>',
        to: adminEmail,
        subject: `🏆 New Athlete Enquiry: ${name} (${program})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background: #fafafa;">
            <h2 style="color: #091626; border-bottom: 2px solid #eab52c; padding-bottom: 10px;">New Inquiry Received - Isha Gym</h2>
            <p><strong>Athlete Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Selected Program:</strong> ${program}</p>
            <p><strong>Message / Notes:</strong></p>
            <blockquote style="background: #ffffff; padding: 12px; border-left: 4px solid #eab52c; margin: 10px 0;">
              ${message || 'No additional message.'}
            </blockquote>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">This email was sent automatically from your Isha Gym Next.js website.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.warn('Resend email warning:', emailErr);
    }

    return NextResponse.json({ success: true, message: 'Enquiry submitted successfully' });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
