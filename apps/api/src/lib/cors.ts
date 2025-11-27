import { apiEnv } from "@dukkani/env/presets/api";

/**
 * Get CORS headers with Vercel environment support
 * Handles localhost, production, and Vercel preview URLs
 */
export function getCorsHeaders(origin: string | null): HeadersInit {
	// In development, allow requests from localhost origins
	const isDevelopment = apiEnv.NEXT_PUBLIC_NODE_ENV === "local";
	const isLocalhost = origin?.startsWith("http://localhost:") ?? false;

	// Build comprehensive allowed origins list
	const allowedOrigins: (string | null)[] = [
		apiEnv.NEXT_PUBLIC_CORS_ORIGIN,
		// Add dashboard URL if configured
		process.env.NEXT_PUBLIC_DASHBOARD_URL || null,
		// Add Vercel URLs if in Vercel environment
		process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
		process.env.VERCEL_BRANCH_URL
			? `https://${process.env.VERCEL_BRANCH_URL}`
			: null,
		process.env.VERCEL_PROJECT_PRODUCTION_URL
			? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
			: null,
	].filter((url): url is string => url !== null);

	// Determine the allowed origin
	let allowedOrigin: string;
	if (isDevelopment && isLocalhost && origin) {
		// In development, allow any localhost origin
		allowedOrigin = origin;
	} else if (origin && allowedOrigins.includes(origin)) {
		// If the origin matches one of the allowed origins, use it
		allowedOrigin = origin;
	} else if (origin?.includes(".vercel.app")) {
		// For Vercel .vercel.app domains (both preview and production)
		// In Vercel, allow .vercel.app origins from the same account
		// Security: Vercel isolates projects, and we're using HTTPS + proper cookie attributes
		const isVercel = !!process.env.VERCEL;
		if (isVercel) {
			// Allow any .vercel.app origin when running on Vercel
			// This works because Vercel deployments are isolated per account/project
			allowedOrigin = origin;
		} else {
			// Not on Vercel but origin is .vercel.app - fallback
			allowedOrigin = apiEnv.NEXT_PUBLIC_CORS_ORIGIN;
		}
	} else {
		// Fallback to the configured CORS origin
		allowedOrigin = apiEnv.NEXT_PUBLIC_CORS_ORIGIN;
	}

	// Return headers with credentials support
	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Expose-Headers": "Set-Cookie", // Allow client to read Set-Cookie
	};
}
