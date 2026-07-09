import { NextResponse } from 'next/server';
import { getAdminUserFromRequest } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request) {
    try {
        // Validate admin session
        const user = getAdminUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { db } = await connectToDatabase();

        // 1. Fetch count stats
        const subscribersCount = await db.collection('subscribers').countDocuments();
        const contactsCount = await db.collection('contacts').countDocuments();
        const sessionsCount = await db.collection('sessions').countDocuments();

        // Active users inside the last 5 minutes
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const activeUsersCount = await db.collection('sessions').countDocuments({
            lastActive: { $gt: fiveMinutesAgo }
        });

        // 2. Fetch recent contact form submissions (limit to last 10)
        const recentContacts = await db.collection('contacts')
            .find({})
            .sort({ createdAt: -1 })
            .limit(10)
            .toArray();

        return NextResponse.json({
            success: true,
            stats: {
                subscribersCount,
                contactsCount,
                sessionsCount,
                activeUsersCount: Math.max(activeUsersCount, 1), // ensure at least 1 (the current user) is shown
                recentContacts
            }
        });
    } catch (error) {
        console.error('Error in /api/admin/stats handler:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
