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

	// Debug logging for cookie setting (development and Vercel preview)
	if (
		process.env.NODE_ENV === "development" ||
		process.env.VERCEL_ENV === "preview"
	) {
		const setCookieHeader = response.headers.get("set-cookie");
		if (setCookieHeader) {
			console.log("[Auth] Set-Cookie header:", setCookieHeader);
			// Parse and log cookie attributes
			const cookies = setCookieHeader.split(", ");
			cookies.forEach((cookie) => {
				console.log("[Auth] Cookie:", cookie);
			});
		} else {
			console.log("[Auth] No Set-Cookie header in response");
		}
	}

	return response;
}

export async function GET(req: NextRequest) {
	// Debug logging (development and Vercel preview)
	if (
		process.env.NODE_ENV === "development" ||
		process.env.VERCEL_ENV === "preview"
	) {
		console.log("Auth GET - Origin:", req.headers.get("origin"));
		console.log(
			"Auth GET - Cookies:",
			req.cookies.getAll().map((c) => c.name),
		);
	}

	return handleWithCors(req, authHandlers.GET);
}

export async function POST(req: NextRequest) {
	// Debug logging (development and Vercel preview)
	if (
		process.env.NODE_ENV === "development" ||
		process.env.VERCEL_ENV === "preview"
	) {
		console.log("Auth POST - Origin:", req.headers.get("origin"));
		console.log(
			"Auth POST - Cookies:",
			req.cookies.getAll().map((c) => c.name),
		);
	}

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
