import { NextResponse } from 'next/server';
import { signToken } from '../../../../lib/auth';

export async function POST(request) {
    try {
        const { username, password } = await request.json();
        
        const envUser = process.env.ADMIN_USERNAME || 'admin';
        const envPass = process.env.ADMIN_PASSWORD || 'adminpassword123';

        if (username === envUser && password === envPass) {
            const token = signToken({ username });
            
            const response = NextResponse.json({ success: true, message: 'Login successful' });
            
            response.cookies.set('admin_session', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60, // 1 day
                path: '/'
            });

            return response;
        }

        return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
