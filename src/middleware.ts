import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const authPaths = ['/auth/login', '/auth/register'];
const productEditRegex = /^\/products\/\d+\/edit$/;
const cartRegex = /^\/buyer\/cart\/\d+$/;
const privateRegex = [cartRegex];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionToken = request.cookies.get('sessionToken')?.value;

	// Chưa đăng nhập thì không cho vào private paths
	if (privateRegex.some((regex) => pathname.match(regex)) && !sessionToken) {
		return NextResponse.redirect(new URL('/auth/login', request.url));
	}

	// Đăng nhập rồi thì không cho vào login/register nữa
	if (
		authPaths.some(
			(path) => pathname.startsWith(path) || pathname.endsWith(path)
		) &&
		sessionToken
	) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	// Nếu là admin thì cho vào admin
	if (pathname.match(productEditRegex) && !sessionToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	// Delegate to next-intl middleware
	return createMiddleware(routing)(request);
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/auth/login',
		'/auth/login',
		'/buyer/product/:path*',
		'/buyer/cart/:path*',
		'/((?!api|trpc|_next|_vercel|.*\\..*).*)',
	],
};
