import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getAllBlogs } from '../../../lib/blogs';

export async function GET() {
    try {
        const blogs = await getAllBlogs();
        return NextResponse.json({ blogs });
    } catch (error) {
        console.error('API blogs query failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
