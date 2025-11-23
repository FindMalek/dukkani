import { auth } from "@dukkani/core";
import { apiEnv } from "@dukkani/env/presets/api";
import { toNextJsHandler } from "better-auth/next-js";
import type { NextRequest } from "next/server";

function getCorsHeaders(origin: string | null): HeadersInit {
	// In development, allow requests from localhost origins
	const isDevelopment = apiEnv.NEXT_PUBLIC_NODE_ENV === "local";
	const isLocalhost = origin?.startsWith("http://localhost:") ?? false;

	// Build list of allowed origins
	const allowedOrigins: string[] = [apiEnv.NEXT_PUBLIC_CORS_ORIGIN];

	// Add dashboard URL if available (for production)
	const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL;
	if (dashboardUrl) {
		allowedOrigins.push(dashboardUrl);
	}

	// Determine the allowed origin
	let allowedOrigin: string;
	if (isDevelopment && isLocalhost && origin) {
		// In development, allow any localhost origin
		allowedOrigin = origin;
	} else if (origin && allowedOrigins.includes(origin)) {
		// If the origin matches one of the allowed origins, use it
		allowedOrigin = origin;
	} else {
		// Fallback to the configured CORS origin
		allowedOrigin = apiEnv.NEXT_PUBLIC_CORS_ORIGIN;
	}

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Credentials": "true",
	};
}

// Get the Better Auth handlers
const authHandlers = toNextJsHandler(auth.handler);

// Wrap handlers to add CORS headers
async function handleWithCors(
	req: NextRequest,
	handler: (req: NextRequest) => Promise<Response>,
) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const response = await handler(req);

	// Add CORS headers to the response
	Object.entries(corsHeaders).forEach(([key, value]) => {
		response.headers.set(key, value);
	});

	return response;
}

export async function GET(req: NextRequest) {
	return handleWithCors(req, authHandlers.GET);
}

export async function POST(req: NextRequest) {
	return handleWithCors(req, authHandlers.POST);
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}
