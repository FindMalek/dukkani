import { isOriginAllowedForRequest } from "@dukkani/common/utils/origin";
import { apiEnv } from "@dukkani/env/presets/api";

/**
 * Get CORS headers with explicit origin allowlist support
 * Handles localhost, production, and Vercel preview URLs
 */
export function getCorsHeaders(origin: string | null): HeadersInit {
	const isDevelopment = apiEnv.NEXT_PUBLIC_NODE_ENV === "local";

	// Check if origin is localhost (with or without subdomain)
	const isLocalhost = origin
		? origin.includes("localhost") || origin.includes("127.0.0.1")
		: false;

	const originConfig = [
		apiEnv.NEXT_PUBLIC_API_URL,
		apiEnv.NEXT_PUBLIC_DASHBOARD_URL,
		apiEnv.VERCEL_BRANCH_URL,
		apiEnv.VERCEL_PROJECT_PRODUCTION_URL,
		apiEnv.NEXT_PUBLIC_STORE_DOMAIN,
	].filter((origin) => origin !== undefined);

	let allowedOrigin: string;

	// In development, allow all localhost origins (including subdomains)
	if (isDevelopment && isLocalhost && origin) {
		allowedOrigin = origin;
	} else if (
		origin &&
		isOriginAllowedForRequest(
			origin,
			originConfig,
			apiEnv.NEXT_PUBLIC_ALLOWED_ORIGIN,
		)
	) {
		allowedOrigin = origin;
	} else {
		allowedOrigin = apiEnv.NEXT_PUBLIC_API_URL;
	}

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Expose-Headers": "Set-Cookie",
	};
}
