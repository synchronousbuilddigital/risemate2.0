import crypto from 'crypto';

const SECRET = process.env.SESSION_SECRET || 'default-secret-key-at-least-32-chars-long-for-hmac-sha256';

export function signToken(payload) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    // Session is valid for 24 hours
    const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 })).toString('base64url');
    const signature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
    return `${header}.${body}.${signature}`;
}

export function verifyToken(token) {
    if (!token) return null;
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const [header, body, signature] = parts;
        const expectedSignature = crypto.createHmac('sha256', SECRET).update(`${header}.${body}`).digest('base64url');
        
        if (signature !== expectedSignature) {
            return null;
        }
        
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
        if (payload.exp < Date.now()) {
            return null; // Expired
        }
        
        return payload;
    } catch (e) {
        return null;
    }
}

export function getAdminUserFromRequest(request) {
    const cookie = request.cookies.get('admin_session');
    if (!cookie) return null;
    return verifyToken(cookie.value);
}
