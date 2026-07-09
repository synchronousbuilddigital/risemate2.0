import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { sendEmail } from '../../../lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Basic validation
        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required.' },
                { status: 400 }
            );
        }

        // 1. Store in MongoDB
        let dbError = null;
        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('subscribers');

            // Check if already subscribed to prevent duplicates
            const existing = await collection.findOne({ email });
            if (!existing) {
                await collection.insertOne({
                    email,
                    createdAt: new Date()
                });
            }
        } catch (err) {
            console.error('Failed to store subscriber in MongoDB:', err);
            dbError = err.message;
        }

        // 2. Prepare Emails
        const adminEmail = process.env.ADMIN_EMAIL || 'biz@RiseMatessventures.com';

        // 2.1 Send email to Admin
        const adminSubject = `[Newsletter] New Subscriber: ${email}`;
        const adminHtml = `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; borderRadius: 10px;">
                <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 10px; color: #000;">New Newsletter Subscriber</h2>
                <p>A new user has subscribed to the RiseMatess Ventures newsletter.</p>
                <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
                <hr style="border: 0; border-top: 1px solid #eee; margin-top: 30px;" />
                <p style="font-size: 11px; color: #999; text-align: center;">RiseMatess Ventures Conglomerate Portal</p>
            </div>
        `;

        // 2.2 Send Thank You email to User
        const userSubject = `Welcome to RiseMatess Ventures Ecosystem Intelligence`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #000000; font-size: 24px; font-weight: 800; letter-spacing: -0.05em; margin: 0;">
                        RiseMatesS <span style="color: #C9A84C;">VENTURES</span>
                    </h1>
                </div>
                
                <h3 style="font-size: 18px; font-weight: 700; color: #000; margin-bottom: 15px;">Welcome to Our Network</h3>
                
                <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
                    Thank you for subscribing to <strong>RiseMatess Ventures Ecosystem Intelligence</strong>.
                </p>

                <p style="font-size: 14px; color: #4b5563; margin-bottom: 20px;">
                    You will now receive periodic market insights, ecosystem reports, and priority updates regarding our conglomerate verticals, including:
                </p>

                <ul style="font-size: 13px; color: #4b5563; padding-left: 20px; margin-bottom: 25px;">
                    <li style="margin-bottom: 6px;">Circular Supply Chains & Zero-Landfill Fashion (BWorth)</li>
                    <li style="margin-bottom: 6px;">Managed Sales Force Infrastructure (Vega Vrudhi)</li>
                    <li style="margin-bottom: 6px;">Deep-Tech Hardware & Clean IoT Energy (RYM Grenergy)</li>
                    <li style="margin-bottom: 6px;">Enterprise Digital Transformation & Autonomous AI Agents (Synchronous)</li>
                </ul>

                <p style="font-size: 14px; color: #4b5563; margin-bottom: 30px;">
                    We are excited to have you in our ecosystem.
                </p>

                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 25px 0;" />

                <div style="font-size: 12px; color: #9ca3af; text-align: center;">
                    <p style="margin: 0; font-weight: bold; color: #6b7280;">RiseMatess Ventures</p>
                    <p style="margin: 4px 0;">Gurugram, India</p>
                    <p style="margin: 0;"><a href="mailto:${adminEmail}" style="color: #C9A84C; text-decoration: none;">biz@RiseMatessventures.com</a></p>
                </div>
            </div>
        `;

        // Send mails
        const [adminMailResult, userMailResult] = await Promise.all([
            sendEmail({
                to: adminEmail,
                subject: adminSubject,
                text: `New Newsletter Subscriber: ${email}`,
                html: adminHtml
            }),
            sendEmail({
                to: email,
                subject: userSubject,
                text: `Welcome to RiseMatess Ventures Ecosystem Intelligence.\n\nThank you for subscribing to our newsletter. You will receive periodic insights from our ecosystem.\n\nBest regards,\nRiseMatess Ventures`,
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
        console.error('Error in /api/subscribe handler:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error: ' + error.message },
            { status: 500 }
        );
    }
}
