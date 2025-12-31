import { LOCALES } from "@dukkani/common/schemas/constants";
import { getLocale, setLocaleCookie } from "@dukkani/common/utils/locale-proxy";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
	const hostname = request.headers.get("host");
	
	// Exclude api/dashboard subdomains (shouldn't reach here, but safety check)
	if (hostname?.includes("api.") || hostname?.includes("dashboard.")) {
		return NextResponse.next();
	}

	const { pathname } = request.nextUrl;

	// Skip API routes, static files, and Next.js internals
	if (
		pathname.startsWith("/api") ||
		pathname.startsWith("/_next") ||
		pathname.startsWith("/favicon") ||
		pathname.startsWith("/manifest") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// Check if pathname already has a locale
	const pathnameHasLocale = LOCALES.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) {
		// Update cookie if needed
		const locale = pathname.split("/")[1];
		const response = NextResponse.next();
		setLocaleCookie(response, locale);
		return response;
	}

	// Redirect to add locale
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;

	const response = NextResponse.redirect(request.nextUrl);
	setLocaleCookie(response, locale);

	return response;
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|api|favicon|manifest|.*\\..*).*)",
	],
};