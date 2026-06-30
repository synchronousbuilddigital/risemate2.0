import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getAdminUserFromRequest } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');         // Replace multiple - with single -
}

export async function POST(request) {
    try {
        const user = getAdminUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const data = await request.json();
        const { slug, title, category, description, author, date, readTime, image, content, related } = data;

        if (!title) {
            return NextResponse.json({ success: false, error: 'Blog title is required' }, { status: 400 });
        }
        if (!content) {
            return NextResponse.json({ success: false, error: 'Blog content is required' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('blogs');

        const updateDoc = { title };
        if (category !== undefined) updateDoc.category = category;
        if (description !== undefined) updateDoc.description = description;
        if (author !== undefined) updateDoc.author = author;
        if (date !== undefined) updateDoc.date = date;
        if (readTime !== undefined) updateDoc.readTime = readTime;
        if (image !== undefined) updateDoc.image = image;
        if (content !== undefined) updateDoc.content = content;
        if (related !== undefined) updateDoc.related = Array.isArray(related) ? related : [];

        let targetSlug = slug;
        if (!targetSlug || targetSlug === '__new__') {
            let baseSlug = slugify(title);
            if (!baseSlug) baseSlug = 'article';
            
            const existing = await collection.findOne({ slug: baseSlug });
            if (existing) {
                targetSlug = `${baseSlug}-${Math.floor(Date.now() / 1000)}`;
            } else {
                targetSlug = baseSlug;
            }
        }
        updateDoc.slug = targetSlug;

        await collection.updateOne(
            { slug: targetSlug },
            { $set: updateDoc },
            { upsert: true }
        );

        return NextResponse.json({
            success: true,
            message: `Blog "${title}" saved successfully in MongoDB`,
            slug: targetSlug
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const user = getAdminUserFromRequest(request);
        if (!user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json({ success: false, error: 'Blog slug is required for deletion' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const collection = db.collection('blogs');

        const result = await collection.deleteOne({ slug });

        if (result.deletedCount === 0) {
            return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
