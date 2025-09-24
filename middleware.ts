import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const protectedRoutes = ['/dashboard']; // ✅ Only protect dashboard

  const isProtected = protectedRoutes.includes(request.nextUrl.pathname);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}