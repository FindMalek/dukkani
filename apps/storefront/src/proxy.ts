import { LOCALES } from "@dukkani/common/schemas/constants";
import { isReservedStoreSlug } from "@dukkani/common/schemas/store/constants";
import { getLocale, setLocaleCookie } from "@dukkani/common/utils/locale-proxy";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STORE_SLUG_COOKIE = "storefront_store_slug";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function proxy(request: NextRequest) {
	const hostname = request.headers.get("host");

	// Exclude api/dashboard subdomains (shouldn't reach here, but safety check)
	if (hostname?.startsWith("api.") || hostname?.startsWith("dashboard.")) {
		return NextResponse.next();
	}

	const { pathname, searchParams } = request.nextUrl;

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

	// Preview only: when URL has ?store=slug, set cookie and redirect to same path without param
	if (process.env.VERCEL_ENV === "preview") {
		const storeParam = searchParams.get("store")?.trim().toLowerCase();
		if (storeParam && !isReservedStoreSlug(storeParam)) {
			const redirectUrl = new URL(pathname + request.nextUrl.hash, request.url);
			const response = NextResponse.redirect(redirectUrl);
			response.cookies.set(STORE_SLUG_COOKIE, storeParam, {
				path: "/",
				maxAge: COOKIE_MAX_AGE,
				sameSite: "lax",
				secure: true,
			});
			return response;
		}
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
