import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const publicRoutes = ['/login', '/register'];

  if (publicRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const verifyResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
      {
        headers: {
          Referer: process.env.NEXT_PUBLIC_FRONTEND_URL, 
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (verifyResponse.status !== 200) {
      console.warn(`Unexpected response status: ${verifyResponse.status}`);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error verifying token:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
      });
    } else {
      console.error('Unexpected error verifying token:', error);
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to selected routes
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/login', '/register'],
};
