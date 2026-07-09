import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '465', 10);
const secure = process.env.SMTP_SECURE !== 'false'; // Default to true (for port 465)
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/"/g, '') : '';

export async function sendEmail({ to, subject, text, html }) {
    if (!user || !pass) {
        console.error('SMTP configuration missing in environment variables.');
        return { success: false, error: 'SMTP config missing' };
    }

    try {
        const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
                user,
                pass,
            },
        });

        const mailOptions = {
            from: `"RiseMates Ventures" <${user}>`,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, info };
    } catch (error) {
        console.error('Failed to send email:', error);
        return { success: false, error };
    }
}
