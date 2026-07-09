import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { sendEmail } from '../../../lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, interest, message } = body;

        // Basic validation
        if (!name || !email || !interest || !message) {
            return NextResponse.json(
                { success: false, error: 'Name, email, interest, and message are required fields.' },
                { status: 400 }
            );
        }

        // 1. Store in MongoDB
        let dbError = null;
        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('contacts');
            await collection.insertOne({
                name,
                email,
                phone: phone || '',
                interest,
                message,
                createdAt: new Date()
            });
        } catch (err) {
            console.error('Failed to store contact in MongoDB:', err);
            dbError = err.message;
        }

        // 2. Prepare Emails
        const adminEmail = process.env.ADMIN_EMAIL || 'biz@risematesventures.com';

        // 2.1 Send email to Admin
        const adminSubject = `[Inquiry] New Contact from ${name} - ${interest}`;
        const adminHtml = `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; borderRadius: 10px;">
                <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 10px; color: #000;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Area of Interest:</strong> ${interest}</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #C9A84C; margin-top: 20px;">
                    <p style="margin-top: 0; font-weight: bold;">Message:</p>
                    <p style="margin-bottom: 0; white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
                <p style="font-size: 11px; color: #999; text-align: center;">RiseMates Ventures Conglomerate Portal</p>
            </div>
        `;

        // 2.2 Send Thank You email to User
        const userSubject = `Thank you for contacting RiseMates Ventures`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #000000; font-size: 24px; font-weight: 800; letter-spacing: -0.05em; margin: 0;">
                        RISEMATES <span style="color: #C9A84C;">VENTURES</span>
                    </h1>
                </div>
                
                <h3 style="font-size: 18px; font-weight: 700; color: #000; margin-bottom: 15px;">Hello ${name},</h3>
                
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
                    Thank you for reaching out to us. We have received your inquiry regarding <strong>${interest}</strong>, and our team is already reviewing the details.
                </p>

                <div style="background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; color: #374151;">
                    <h4 style="margin-top: 0; margin-bottom: 10px; color: #000; font-weight: 700;">Submission Summary:</h4>
                    <p style="margin: 4px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
                    ${phone ? `<p style="margin: 4px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
                    <p style="margin: 4px 0;"><strong>Interest:</strong> ${interest}</p>
                </div>

                <p style="font-size: 14px; color: #4b5563; margin-bottom: 30px;">
                    One of our managing partners will connect with you within 24 hours to address your requirements and discuss next steps.
                </p>

                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

                <div style="font-size: 12px; color: #9ca3af; text-align: center;">
                    <p style="margin: 0; font-weight: bold; color: #6b7280;">RiseMates Ventures</p>
                    <p style="margin: 4px 0;">Gurugram, India</p>
                    <p style="margin: 0;"><a href="mailto:${adminEmail}" style="color: #C9A84C; text-decoration: none;">biz@risematesventures.com</a> | <a href="tel:+918239660777" style="color: #6b7280; text-decoration: none;">+91 82396 60777</a></p>
                </div>
            </div>
        `;

        // Run mail sends in parallel (or sequentially, handling failures gracefully)
        const [adminMailResult, userMailResult] = await Promise.all([
            sendEmail({
                to: adminEmail,
                subject: adminSubject,
                text: `New Contact Submission from ${name} (${email}). Interest: ${interest}. Message: ${message}`,
                html: adminHtml
            }),
            sendEmail({
                to: email,
                subject: userSubject,
                text: `Hello ${name},\n\nThank you for contacting RiseMates Ventures. We have received your inquiry regarding ${interest}.\n\nOur team will connect with you within 24 hours.\n\nBest regards,\nRiseMates Ventures`,
                html: userHtml
            })
        ]);

        return NextResponse.json({
            success: true,
            storedInDb: dbError === null,
            adminEmailSent: adminMailResult.success,
            userEmailSent: userMailResult.success,
            dbError
        });

    } catch (error) {
        console.error('Error in /api/contact handler:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error: ' + error.message },
            { status: 500 }
        );
    }
}
