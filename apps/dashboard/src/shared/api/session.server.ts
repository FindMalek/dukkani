import { getApiUrl } from "@dukkani/env/get-api-url";
import { cookies } from "next/headers";
import { env } from "@/env";

/**
 * Get session from API by making an HTTP request, forwarding whatever
 * cookies came in on the dashboard's own incoming request. This only works
 * because the session cookie's Domain attribute is shared across the
 * dashboard/API subdomains (see `crossSubDomainCookies` in
 * `packages/auth/src/index.ts`) — without that, the browser never attaches
 * the API-issued cookie to a request made to the dashboard's own host.
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
      `${getApiUrl(env.NEXT_PUBLIC_API_URL)}/api/auth/get-session`,
      {
        method: "GET",
        headers: {
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
          origin: env.NEXT_PUBLIC_DASHBOARD_URL,
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
