import { cookies } from "next/headers";
import { dashboardEnv } from "@/env";

/**
 * Get session from API by making an HTTP request
 * Server components can't access cross-origin cookies directly, so we forward
 * cookies from the incoming request to the API endpoint.
 *
 * @returns Session object with user data, or null if not authenticated
 */
export async function getServerSession() {
	try {
		const cookieStore = await cookies();
		const cookieHeader = cookieStore
			.getAll()
			.map((cookie) => `${cookie.name}=${cookie.value}`)
			.join("; ");

		const response = await fetch(
			`${dashboardEnv.NEXT_PUBLIC_CORS_ORIGIN}/api/auth/get-session`,
			{
				method: "GET",
				headers: {
					...(cookieHeader ? { cookie: cookieHeader } : {}),
					origin: dashboardEnv.NEXT_PUBLIC_DASHBOARD_URL,
				},
				cache: "no-store",
			},
		);

		if (!response.ok) {
			return null;
		}

		return await response.json();
	} catch {
		return null;
	}
}
