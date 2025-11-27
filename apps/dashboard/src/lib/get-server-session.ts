import { cookies, headers } from "next/headers";
import { dashboardEnv } from "@/env";

/**
 * Get session from API by making an HTTP request
 * This is needed because server components can't access cross-origin cookies directly.
 *
 * The challenge: Cookies set on the API domain are only sent by the browser in cross-origin
 * requests TO the API. When the browser requests the dashboard server component, those cookies
 * won't be included because it's a same-origin request (browser -> dashboard).
 *
 * Solution: We check both Next.js cookies() API and request headers, then forward all cookies
 * to the API endpoint. In Vercel, this may still not work if cookies aren't being sent by
 * the browser, but we try our best to forward what's available.
 *
 * @returns Session object with user data, or null if not authenticated
 */
export async function getServerSession() {
	try {
		const headersList = await headers();
		const cookieStore = await cookies();

		// Get cookies from Next.js cookies() API
		const nextCookies = cookieStore
			.getAll()
			.map((cookie) => `${cookie.name}=${cookie.value}`)
			.join("; ");

		// Get cookies from request headers
		const headerCookies = headersList.get("cookie") || "";

		// Combine all cookies
		const allCookies = [nextCookies, headerCookies].filter(Boolean).join("; ");

		// Make request to API's get-session endpoint
		const response = await fetch(
			`${dashboardEnv.NEXT_PUBLIC_CORS_ORIGIN}/api/auth/get-session`,
			{
				method: "GET",
				headers: {
					// Forward all cookies we found
					...(allCookies ? { cookie: allCookies } : {}),
					// Set origin header for CORS
					origin: dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL,
					// Set referer to help with CORS
					referer: dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL,
				},
				// Don't cache the response
				cache: "no-store",
			},
		);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch {
		// If request fails, return null (user is not authenticated)
		return null;
	}
}
