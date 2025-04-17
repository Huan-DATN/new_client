import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const authPaths = ['/auth/login', '/auth/register'];
const productEditRegex = /^\/products\/\d+\/edit$/;
const cartRegex = /^\/buyer\/cart\/\d+$/;
const privateRegex = [cartRegex];

// This function can be marked `async` if using `await` inside
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
	if (pathname.match(productEditRegex) && !sessionToken) {
		return NextResponse.redirect(new URL('/login', request.url));
	}
	// Nếu là admin thì cho vào admin
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		'/auth/login',
		'/auth/login',
		'/buyer/product/:path*',
		'/buyer/cart/:path*',
	],
};
