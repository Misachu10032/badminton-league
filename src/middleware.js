import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  console.log('Middleware called for path:', request.nextUrl.pathname);
  const token = request.cookies.get('token');
  
  // Define protected paths that require authentication
  const protectedPaths = ['/home', '/admin', '/api/confirm-request'];
  // Define public paths that should redirect to home if already authenticated
  const publicPaths = ['/login', '/register'];

  const isProtectedRoute = protectedPaths.includes(request.nextUrl.pathname);
  const isPublicRoute = publicPaths.includes(request.nextUrl.pathname);

  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
      const verified = await jose.jwtVerify(token.value, secret);
      const payload = verified.payload;
      
      // Check if the user is trying to access a protected admin route
      const isAdminRoute = ['/admin', '/api/confirm-request'].includes(request.nextUrl.pathname);

      if (isProtectedRoute && isAdminRoute && payload.role !== 'Admin') {
        // If the user does not have admin role, redirect to home
        return NextResponse.redirect(new URL('/home', request.url));
      }
      
      if (isPublicRoute) {
        // If user is authenticated and tries to access login/register, redirect to home
        return NextResponse.redirect(new URL('/home', request.url));
      }
    } else if (isProtectedRoute) {
      // If no token and trying to access protected route, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification error:', error);
    // If token verification fails, clear the invalid token and redirect to login
    if (isProtectedRoute) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      return response;
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/home',
    '/admin',
    '/api/confirm-request', // Protect the API path
    '/login',
    '/register'
  ]
};
