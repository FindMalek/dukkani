import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "../schemas/constants";

/**
 * Request type that has cookies and headers
 * This avoids importing NextRequest directly to prevent version conflicts
 */
type RequestWithCookiesAndHeaders = {
	cookies: {
		get: (name: string) => { value: string } | undefined;
	};
	headers: {
		get: (name: string) => string | null;
	};
};

/**
 * Response type that has cookies.set method
 * This avoids importing NextResponse directly to prevent version conflicts
 */
type ResponseWithCookies = {
	cookies: {
		set: (
			name: string,
			value: string,
			options?: {
				maxAge?: number;
				path?: string;
			},
		) => void;
	};
};

/**
 * Get locale from request (cookie or Accept-Language header)
 */
export function getLocale(request: RequestWithCookiesAndHeaders): string {
	// Check cookie first (user preference)
	const cookieLocale = request.cookies.get("locale")?.value;
	if (cookieLocale && LOCALES.includes(cookieLocale as Locale)) {
		return cookieLocale;
	}

	// Then check Accept-Language header
	const acceptLanguage = request.headers.get("accept-language") ?? undefined;
	const headers = { "accept-language": acceptLanguage };
	const languages = new Negotiator({ headers }).languages();

	return match(languages, LOCALES, DEFAULT_LOCALE);
}

/**
 * Set locale cookie on response
 */
export function setLocaleCookie(
	response: ResponseWithCookies,
	locale: string,
): void {
	response.cookies.set("locale", locale, {
		maxAge: 60 * 60 * 24 * 365, // 1 year
		path: "/",
	});
}
