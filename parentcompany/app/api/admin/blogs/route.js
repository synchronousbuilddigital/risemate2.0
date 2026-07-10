import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getAdminUserFromRequest } from '../../../../lib/auth';
import { connectToDatabase } from '../../../../lib/db';
import { sendEmail } from '../../../../lib/mail';

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
        const { slug, oldSlug, title, category, description, author, date, readTime, image, content, related } = data;

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
            if (existing && (!oldSlug || oldSlug === '__new__')) {
                targetSlug = `${baseSlug}-${Math.floor(Date.now() / 1000)}`;
            } else {
                targetSlug = baseSlug;
            }
        }

        targetSlug = slugify(targetSlug); // ensure completely sanitized
        updateDoc.slug = targetSlug;

        const isNewPost = !oldSlug || oldSlug === '__new__';
        const lookupSlug = isNewPost ? targetSlug : oldSlug;

        await collection.updateOne(
            { slug: lookupSlug },
            { $set: updateDoc },
            { upsert: true }
        );

        // Dispatch newsletter asynchronously to all subscribers if it's a new article
        if (isNewPost) {
            try {
                const subscribers = await db.collection('subscribers').find({}).toArray();
                if (subscribers.length > 0) {
                    const emails = subscribers.map(s => s.email);
                    const postUrl = `https://RiseMates.com/blog/${targetSlug}`;
                    const subject = `[New Insight] ${title} - RiseMates Ventures`;
                    const html = `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
                            <div style="text-align: center; margin-bottom: 25px;">
                                <h1 style="color: #000000; font-size: 24px; font-weight: 800; letter-spacing: -0.05em; margin: 0;">
                                    RiseMates <span style="color: #C9A84C;">VENTURES</span>
                                </h1>
                                <p style="font-size: 10px; color: #9ca3af; text-align: center; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 0.15em;">Ecosystem Intelligence Insights</p>
                            </div>
                            
                            ${image ? `<div style="margin-bottom: 25px; border-radius: 8px; overflow: hidden; height: 200px; background-color: #f3f4f6;">
                                <img src="${image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;" />
                            </div>` : ''}

                            <span style="display: inline-block; padding: 4px 10px; background-color: #f3f4f6; color: #002366; font-size: 9px; font-weight: bold; text-transform: uppercase; border-radius: 4px; margin-bottom: 12px;">
                                ${category || 'Ecosystem Insight'}
                            </span>
                            
                            <h2 style="font-size: 20px; font-weight: 800; color: #000; margin: 0 0 10px 0; line-height: 1.3;">
                                ${title}
                            </h2>
                            
                            <p style="font-size: 12px; color: #6b7280; margin: 0 0 20px 0;">
                                By ${author || 'RiseMates Team'} | ${readTime || '5 min read'}
                            </p>
                            
                            <p style="font-size: 14px; color: #4b5563; line-height: 1.7; margin-bottom: 25px;">
                                ${description || 'A new analysis has been published by our venture growth team. Click below to explore the full insights.'}
                            </p>

                            <div style="text-align: center; margin-bottom: 30px;">
                                <a href="${postUrl}" style="display: inline-block; background-color: #000; color: #fff; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; padding: 14px 28px; text-decoration: none; border-radius: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                                    Read Full Article
                                </a>
                            </div>
                            
                            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
                            
                            <div style="font-size: 11px; color: #9ca3af; text-align: center; line-height: 1.5;">
                                <p style="margin: 0; font-weight: bold; color: #6b7280;">RiseMates Ventures</p>
                                <p style="margin: 2px 0;">NCR HQ: Spaze Plazo, Golf Course Ext. Road, Gurugram, India</p>
                                <p style="margin: 0; color: #9ca3af;">You are receiving this email because you subscribed to RiseMates Ventures Ecosystem Intelligence.</p>
                            </div>
                        </div>
                    `;
                    const textContent = `New Article: ${title}\n\nRead it here: ${postUrl}\n\n${description}`;

                    emails.forEach(emailAddress => {
                        sendEmail({ to: emailAddress, subject, text: textContent, html }).catch(err => {
                            console.error(`Failed to send newsletter to ${emailAddress}:`, err);
                        });
                    });
                }
            } catch (subError) {
                console.error("Failed to process subscriber newsletter dispatch:", subError);
            }
        }

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
