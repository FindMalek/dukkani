import { auth } from "@dukkani/core";
import { toNextJsHandler } from "better-auth/next-js";
import type { NextRequest } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

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
		response.headers.set(key, String(value));
	});

	// Debug logging for cookie inspection (development and Vercel preview)
	if (
		process.env.NODE_ENV === "development" ||
		process.env.VERCEL_ENV === "preview"
	) {
		const setCookieHeader = response.headers.get("set-cookie");
		if (setCookieHeader) {
			console.log("[Auth] Set-Cookie header:", setCookieHeader);
		}
		const cookieHeader = req.headers.get("cookie");
		if (cookieHeader) {
			console.log("[Auth] Request Cookie header:", cookieHeader);
		} else {
			console.log("[Auth] No Cookie header in request");
		}
	}

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
