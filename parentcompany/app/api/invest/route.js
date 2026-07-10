import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';
import { sendEmail } from '../../../lib/mail';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { identity, email, category, summary } = body;

        // Basic validation
        if (!identity || !email || !category || !summary) {
            return NextResponse.json(
                { success: false, error: 'Identity, email, category, and summary are required fields.' },
                { status: 400 }
            );
        }

        // 1. Store in MongoDB
        let dbError = null;
        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('proposals');
            await collection.insertOne({
                identity,
                email,
                category,
                summary,
                createdAt: new Date()
            });
        } catch (err) {
            console.error('Failed to store proposal in MongoDB:', err);
            dbError = err.message;
        }

        // 2. Prepare Emails
        const adminEmail = process.env.ADMIN_EMAIL || 'biz@RiseMatesventures.com';

        // 2.1 Send email to Admin
        const adminSubject = `[Proposal] New Investment Proposal from ${identity}`;
        const adminHtml = `
            <div style="font-family: sans-serif; line-height: 1.6; color: #eee; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #333; borderRadius: 10px; background-color: #0c0c0c;">
                <h2 style="border-bottom: 2px solid #C9A84C; padding-bottom: 10px; color: #C9A84C;">Investment Proposal Submitted</h2>
                <p style="color: #bbb;"><strong>Identity/Group:</strong> ${identity}</p>
                <p style="color: #bbb;"><strong>Secure Channel:</strong> <a href="mailto:${email}" style="color: #C9A84C;">${email}</a></p>
                <p style="color: #bbb;"><strong>Selection Category:</strong> ${category}</p>
                <div style="background-color: #1a1a1a; padding: 15px; border-left: 4px solid #C9A84C; margin-top: 20px;">
                    <p style="margin-top: 0; font-weight: bold; color: #C9A84C;">Proposal Summary:</p>
                    <p style="margin-bottom: 0; white-space: pre-wrap; color: #fff;">${summary}</p>
                </div>
                <hr style="border: 0; border-top: 1px solid #333; margin-top: 30px;" />
                <p style="font-size: 11px; color: #666; text-align: center;">RiseMates Ventures · Capital & Incubation</p>
            </div>
        `;

        // 2.2 Send Thank You email to User
        const userSubject = `Submission of Intent Received - RiseMates Ventures`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #ddd; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #222; border-radius: 12px; background-color: #0c0c0c;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 0.1em; margin: 0;">
                        RiseMates <span style="color: #C9A84C;">VENTURES</span>
                    </h1>
                    <p style="color: #C9A84C; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; margin: 5px 0 0 0;">Capital Markets & Incubation</p>
                </div>
                
                <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 15px;">Submission of Intent</h3>
                
                <p style="font-size: 14px; color: #bbb; margin-bottom: 20px;">
                    We have successfully received your proposal summary. Our Investment Committee is reviewing your submission under the category: <strong>${category}</strong>.
                </p>

                <div style="background-color: #141414; border: 1px solid #222; padding: 20px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; color: #ccc;">
                    <h4 style="margin-top: 0; margin-bottom: 10px; color: #C9A84C; font-weight: 700; text-transform: uppercase;">Submission Details:</h4>
                    <p style="margin: 4px 0;"><strong>Identity / Group:</strong> ${identity}</p>
                    <p style="margin: 4px 0;"><strong>Secure Channel:</strong> ${email}</p>
                    <p style="margin: 4px 0;"><strong>Category:</strong> ${category}</p>
                </div>

                <p style="font-size: 14px; color: #bbb; margin-bottom: 30px;">
                    If your proposal aligns with our investment thesis and strategic goals, one of our venture associates will connect with you via this secure channel.
                </p>

                <hr style="border: 0; border-top: 1px solid #222; margin: 25px 0;" />

                <div style="font-size: 12px; color: #666; text-align: center;">
                    <p style="margin: 0; font-weight: bold; color: #bbb;">RiseMates Ventures</p>
                    <p style="margin: 4px 0;">Gurugram, India</p>
                    <p style="margin: 0;"><a href="mailto:${adminEmail}" style="color: #C9A84C; text-decoration: none;">biz@RiseMatesventures.com</a></p>
                </div>
            </div>
        `;

        // Send mails
        const [adminMailResult, userMailResult] = await Promise.all([
            sendEmail({
                to: adminEmail,
                subject: adminSubject,
                text: `New Investment Proposal from ${identity} (${email}). Category: ${category}. Summary: ${summary}`,
                html: adminHtml
            }),
            sendEmail({
                to: email,
                subject: userSubject,
                text: `Submission of Intent Received.\n\nIdentity/Group: ${identity}\nCategory: ${category}\n\nOur committee is reviewing your submission and will get in touch if there is alignment.\n\nBest regards,\nRiseMates Ventures`,
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
        console.error('Error in /api/invest handler:', error);
        return NextResponse.json(
            { success: false, error: 'Internal Server Error: ' + error.message },
            { status: 500 }
        );
    }
}
