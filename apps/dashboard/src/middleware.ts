import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const locales = ["en", "fr"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
	// Check cookie first (user preference)
	const cookieLocale = request.cookies.get("locale")?.value;
	if (cookieLocale && locales.includes(cookieLocale)) {
		return cookieLocale;
	}

	// Then check Accept-Language header
	const acceptLanguage = request.headers.get("accept-language") ?? undefined;
	const headers = { "accept-language": acceptLanguage };
	const languages = new Negotiator({ headers }).languages();

	return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
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
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) {
		// Update cookie if needed
		const locale = pathname.split("/")[1];
		const response = NextResponse.next();
		response.cookies.set("locale", locale, {
			maxAge: 60 * 60 * 24 * 365, // 1 year
			path: "/",
		});
		return response;
	}

	// Redirect to add locale
	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;

	const response = NextResponse.redirect(request.nextUrl);
	response.cookies.set("locale", locale, {
		maxAge: 60 * 60 * 24 * 365,
		path: "/",
	});

	return response;
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		"/((?!_next|api|favicon|manifest|.*\\..*).*)",
	],
};
