import { isOriginAllowedForRequest } from "@dukkani/common/utils/origin";
import { apiEnv } from "@dukkani/env/presets/api";

/**
 * Get CORS headers with explicit origin allowlist support
 * Handles localhost, production, and Vercel preview URLs
 */
export function getCorsHeaders(origin: string | null): HeadersInit {
	const isDevelopment = apiEnv.NEXT_PUBLIC_NODE_ENV === "local";
	const isLocalhost = origin?.startsWith("http://localhost:") ?? false;

	const originConfig = [
		apiEnv.NEXT_PUBLIC_CORS_ORIGIN,
		apiEnv.NEXT_PUBLIC_DASHBOARD_URL,
		apiEnv.VERCEL_BRANCH_URL,
		apiEnv.VERCEL_PROJECT_PRODUCTION_URL,
	].filter((origin) => origin !== undefined);

	let allowedOrigin: string;
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
		allowedOrigin = apiEnv.NEXT_PUBLIC_CORS_ORIGIN;
	}

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Expose-Headers": "Set-Cookie",
	};
}
