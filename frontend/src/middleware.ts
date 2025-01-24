import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axiosInstance from './lib/axios';

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const publicRoutes = ['/login', '/register'];

  if (publicRoutes.includes(request.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!publicRoutes.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!publicRoutes.includes(request.nextUrl.pathname) && token) {
    try {
      const verifyResponse = await axiosInstance.get('/auth/verify', {
        headers: {
          Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
          cookie: `token=${token}`,
        },
      });

      if (verifyResponse.status !== 200) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
      }
    } catch (error) {
      console.error('Error verifying token:', error);

      // Clear session storage and cookies
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token'); // Clear the token cookie
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/register'],
};