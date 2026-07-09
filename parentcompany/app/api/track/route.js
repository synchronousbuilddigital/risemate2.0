import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request) {
    try {
        const body = await request.json();
        const { sessionId } = body;

        if (!sessionId) {
            return NextResponse.json({ success: false, error: 'Session ID is required' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('sessions');

        await collection.updateOne(
            { sessionId },
            { 
                $set: { lastActive: new Date() },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in /api/track handler:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
