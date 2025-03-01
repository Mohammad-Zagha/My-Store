import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function middleware(request: NextRequest,res : NextResponse) {
  // const accessToken = request.cookies.get('AccessToken')?.value;
  // if (request.nextUrl.pathname.startsWith('/auth')) {
  //   if (accessToken) {
  //     try {
  //       await jwtVerify(accessToken, new TextEncoder().encode(JWT_SECRET));
  //       return NextResponse.redirect(new URL('/admin', request.url ));
  //     } catch (error) {
  //       console.error('Token verification failed:', error);
  //     }
  //   }
  // }

  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   if (!accessToken) {
  //     return NextResponse.redirect(new URL('/auth/signin', request.url));
  //   }

  //   try {
  //     await jwtVerify(accessToken, new TextEncoder().encode(JWT_SECRET));
  //     return NextResponse.next();
  //   } catch (error) {
  //     console.error('Token verification failed:', error);
  //     return NextResponse.redirect(new URL('/auth/signin', request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*'],
};
