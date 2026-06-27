import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getAdminUserFromRequest } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';

export async function POST(request) {
    try {
        const user = getAdminUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const { id, name, role, tier, philosophy, vision, focus, logo, image } = data;

        if (!name) {
            return NextResponse.json({ success: false, error: 'Leader name is required' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('leaders');

        const updateDoc = { name };
        if (role !== undefined) updateDoc.role = role;
        if (tier !== undefined) updateDoc.tier = tier;
        if (philosophy !== undefined) updateDoc.philosophy = philosophy;
        if (vision !== undefined) updateDoc.vision = vision;
        if (focus !== undefined) updateDoc.focus = focus;
        if (logo !== undefined) updateDoc.logo = logo;
        if (image !== undefined) updateDoc.image = image;

        let targetId = id;
        if (!targetId || targetId === '__new__') {
            // Find highest leader_XX id to increment
            const latestLeaders = await collection.find({ id: /^leader_\d+$/ }).toArray();
            let maxNum = 0;
            latestLeaders.forEach(l => {
                const match = l.id.match(/leader_(\d+)/);
                if (match) {
                    const num = parseInt(match[1], 10);
                    if (num > maxNum) maxNum = num;
                }
            });
            targetId = `leader_${String(maxNum + 1).padStart(2, '0')}`;
        }
        updateDoc.id = targetId;

        await collection.updateOne(
            { id: targetId },
            { $set: updateDoc },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: `Leader ${name} updated successfully in MongoDB`,
            id: targetId
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
