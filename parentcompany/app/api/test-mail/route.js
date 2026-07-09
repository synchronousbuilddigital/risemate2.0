import { NextResponse } from 'next/server';
import { sendEmail } from '../../../lib/mail';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const result = await sendEmail({
            to: 'biz@risematesventures.com',
            subject: 'RiseMates Ventures - SMTP Verification Test',
            text: 'Congratulations! The Google App Password SMTP mail configuration works perfectly.',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; padding: 20px; border: 1px solid #C9A84C; border-radius: 8px;">
                    <h2 style="color: #C9A84C; margin-top: 0;">SMTP Connection Verified</h2>
                    <p>This is a successful test email verifying that the <strong>Google App Password</strong> mail system is active and connected correctly.</p>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">RiseMates Ventures Mail System</p>
                </div>
            `
        });
        
        return NextResponse.json({
            message: 'SMTP Test Email Sent',
            success: result.success,
            details: result.info || result.error
        });
    } catch (error) {
        return NextResponse.json({
            message: 'SMTP Verification Failed',
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
