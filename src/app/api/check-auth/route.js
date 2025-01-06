import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get('token');

    if (!token) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Verify the token
    const secret = process.env.SECRET_KEY;
    const verified = jwt.verify(token.value, secret);

    if (verified) {
      return new NextResponse(JSON.stringify({ authenticated: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse('Unauthorized', { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return new NextResponse('Unauthorized', { status: 401 });
  }
}