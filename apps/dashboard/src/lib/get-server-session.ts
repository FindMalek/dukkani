import { dashboardEnv } from "@/env";
import { headers } from "next/headers";

/**
 * Get session from API by making an HTTP request
 * This is needed because server components can't access cross-origin cookies directly.
 *
 * Note: Cookies set on the API domain are only sent by the browser in cross-origin requests.
 * When the browser requests the dashboard server component, those cookies won't be included
 * because it's a same-origin request from the browser's perspective.
 *
 * However, we forward any cookies that ARE present in the request headers.
 * In practice, this means the session check happens client-side via the auth client,
 * and server-side checks may return null until cookies are properly shared.
 *
 * @returns Session object with user data, or null if not authenticated
 */
export async function getServerSession() {
	try {
		const headersList = await headers();
		const cookieHeader = headersList.get("cookie");

		// Make request to API's get-session endpoint
		// Forward any cookies that are present in the incoming request
		const response = await fetch(
			`${dashboardEnv.NEXT_PUBLIC_CORS_ORIGIN}/api/auth/get-session`,
			{
				method: "GET",
				headers: {
					// Forward cookies from the incoming request (if any)
					...(cookieHeader ? { cookie: cookieHeader } : {}),
					// Set origin header for CORS
					origin: dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL,
				},
			},
		);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		// If request fails, return null (user is not authenticated)
		return null;
	}
}
