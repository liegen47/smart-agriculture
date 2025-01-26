import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function middleware(request: NextRequest) {
  const publicRoutes = ['/login', '/register'];
  const adminRoutes = ['/admin/:path*'];
  const adminLoginRoute = '/admin/login';

  const isAdminRoute = adminRoutes.some(path => 
    request.nextUrl.pathname.startsWith(path.replace('/:path*', ''))
  );

  if (request.nextUrl.pathname === adminLoginRoute) {
    const adminToken = request.cookies.get('adminToken')?.value;

    if (adminToken) {
      try {
        const verifyResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
          {
            headers: {
              Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (verifyResponse.status === 200 && verifyResponse.data.user.role === 'admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
      } catch (error) {
        console.error('Admin token verification failed:', error);
      }
    }
    return NextResponse.next();
  }

  if (isAdminRoute) {
    const adminToken = request.cookies.get('adminToken')?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL(adminLoginRoute, request.url));
    }

    try {
      const verifyResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`,
        {
          headers: {
            Referer: process.env.NEXT_PUBLIC_FRONTEND_URL,
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      if (verifyResponse.status !== 200 || verifyResponse.data.user.role !== 'admin') {
        console.warn('Admin access denied', verifyResponse.data);
        return NextResponse.redirect(new URL(adminLoginRoute, request.url));
      }
    } catch (error) {
      console.error('Admin token verification failed:', error);
      return NextResponse.redirect(new URL(adminLoginRoute, request.url));
    }

    return NextResponse.next();
  }

  // Handle public routes
  if (publicRoutes.includes(request.nextUrl.pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Handle regular authenticated routes
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
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/login', 
    '/register',
    '/admin/:path*',
    '/admin/login' 
  ],
};