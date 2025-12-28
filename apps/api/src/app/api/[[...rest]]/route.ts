import { createContext } from "@dukkani/orpc/context";
import { appRouter } from "@dukkani/orpc/routers/index";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { NextRequest } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

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
			response.headers.set(key, String(value));
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
			response.headers.set(key, String(value));
		});
		return response;
	}

	const notFoundResponse = new Response("Not found", { status: 404 });
	Object.entries(corsHeaders).forEach(([key, value]) => {
		notFoundResponse.headers.set(key, String(value));
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
