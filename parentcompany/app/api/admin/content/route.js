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
        const { key, title, tagline, tag, desc, img, logo, link, sector } = data;

        if (!title) {
            return NextResponse.json({ success: false, error: 'Entity title identifier is required' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('portfolio_items');

        const updateDoc = { title };
        if (tagline !== undefined) updateDoc.tagline = tagline;
        if (tag !== undefined) updateDoc.tag = tag;
        if (desc !== undefined) updateDoc.desc = desc;
        if (img !== undefined) updateDoc.img = img;
        if (logo !== undefined) updateDoc.logo = logo;
        if (link !== undefined) updateDoc.link = link;
        if (sector !== undefined) updateDoc.sector = sector;

        let targetKey = key;
        if (!targetKey || targetKey === '__new__') {
            targetKey = `entity_${Date.now()}`;
        }
        updateDoc.key = targetKey;

        await collection.updateOne(
            { key: targetKey },
            { $set: updateDoc },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: `${title} updated successfully in MongoDB`
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function GET(request) {
    const user = getAdminUserFromRequest(request);
    if (!user) {
        return NextResponse.json({ authorized: false }, { status: 401 });
    }
    return NextResponse.json({ authorized: true, user });
}

