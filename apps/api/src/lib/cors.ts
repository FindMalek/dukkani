import { isOriginAllowedForRequest } from "@dukkani/common/utils/origin";
import { apiAppEnv } from "@dukkani/env/apps/api";

/**
 * Get CORS headers with explicit origin allowlist support
 * Handles localhost, production, and Vercel preview URLs
 */
export function getCorsHeaders(origin: string | null): HeadersInit {
	const isDevelopment = apiAppEnv.NODE_ENV === "development";
	const isLocalhost = origin?.startsWith("http://localhost:") ?? false;

	const originConfig = [
		apiAppEnv.CORS_ORIGIN,
		apiAppEnv.DASHBOARD_URL,
		apiAppEnv.VERCEL_BRANCH_URL,
		apiAppEnv.VERCEL_PROJECT_PRODUCTION_URL,
	].filter((origin) => origin !== undefined);

	let allowedOrigin: string;
	if (isDevelopment && isLocalhost && origin) {
		allowedOrigin = origin;
	} else if (
		origin &&
		isOriginAllowedForRequest(
			origin,
			originConfig,
			apiAppEnv.ALLOWED_ORIGIN,
		)
	) {
		allowedOrigin = origin;
	} else {
		allowedOrigin = apiAppEnv.CORS_ORIGIN;
	}

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Expose-Headers": "Set-Cookie",
	};
}
