import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    // Exclude public admin routes and the new approval/rejection flow
    const publicPaths = ['/admin/request', '/admin/login', '/admin/approve', '/admin/reject'];
    const isPublicPath = publicPaths.includes(pathname) || pathname.startsWith('/admin/approval/');

    if (isPublicPath) {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token');

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/request';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
