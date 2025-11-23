import { apiEnv } from "@dukkani/env/presets/api";
import { createContext } from "@dukkani/orpc/context";
import { appRouter } from "@dukkani/orpc/routers/index";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { NextRequest } from "next/server";

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
			specGenerateOptions: {
				info: {
					title: "Dukkani API",
					version: "1.0.0",
					description: "API documentation and playground for Dukkani",
				},
			},
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

function getCorsHeaders(origin: string | null): HeadersInit {
	// In development, allow requests from localhost origins
	const isDevelopment = apiEnv.NEXT_PUBLIC_NODE_ENV === "local";
	const isLocalhost = origin?.startsWith("http://localhost:") ?? false;

	// Allow the origin if it's from localhost in development, or use the configured origin
	const allowedOrigin =
		isDevelopment && isLocalhost && origin
			? origin
			: apiEnv.NEXT_PUBLIC_CORS_ORIGIN;

	return {
		"Access-Control-Allow-Origin": allowedOrigin,
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
		"Access-Control-Allow-Credentials": "true",
	};
}

async function handleRequest(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	// Handle RPC requests
	const rpcResult = await rpcHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (rpcResult.response) {
		// Add CORS headers to the response
		const response = rpcResult.response;
		Object.entries(corsHeaders).forEach(([key, value]) => {
			response.headers.set(key, value);
		});
		return response;
	}

	// Handle OpenAPI requests (playground and spec)
	const apiResult = await apiHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (apiResult.response) {
		// Add CORS headers to the response
		const response = apiResult.response;
		Object.entries(corsHeaders).forEach(([key, value]) => {
			response.headers.set(key, value);
		});
		return response;
	}

	const notFoundResponse = new Response("Not found", { status: 404 });
	Object.entries(corsHeaders).forEach(([key, value]) => {
		notFoundResponse.headers.set(key, value);
	});
	return notFoundResponse;
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}
