import { auth } from "@dukkani/core";
import { apiEnv } from "@dukkani/env";
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
		// If this is an OpenAPI spec request, merge better-auth schema
		const url = new URL(req.url);
		if (
			url.pathname.includes("/openapi.json") ||
			url.pathname.includes("/openapi.yaml") ||
			url.pathname.endsWith("/openapi")
		) {
			try {
				// Get better-auth OpenAPI schema
				// The OpenAPI plugin adds this method to the auth.api object
				const authSchema = await (
					auth.api as unknown as {
						generateOpenAPISchema: () => Promise<{
							paths?: Record<string, unknown>;
						}>;
					}
				).generateOpenAPISchema();

				// Clone the response to modify it
				const responseText = await apiResult.response.text();
				const orpcSchema = JSON.parse(responseText);

				// Merge schemas
				const mergedSchema = {
					...orpcSchema,
					paths: {
						// Prepend /auth to all better-auth paths
						...Object.fromEntries(
							Object.entries(authSchema.paths || {}).map(([key, value]) => [
								`/auth${key}`,
								value,
							]),
						),
						// Include oRPC paths
						...orpcSchema.paths,
					},
					servers: [{ url: "/api" }],
					info: {
						title: "Dukkani API",
						version: "1.0.0",
						description:
							"API documentation and playground for Dukkani - includes oRPC endpoints and Better Auth authentication endpoints",
					},
				};

				// Create new response with merged schema
				const mergedResponse = new Response(
					JSON.stringify(mergedSchema, null, 2),
					{
						status: apiResult.response.status,
						headers: apiResult.response.headers,
					},
				);

				// Add CORS headers
				Object.entries(corsHeaders).forEach(([key, value]) => {
					mergedResponse.headers.set(key, String(value));
				});
				return mergedResponse;
			} catch (error) {
				// If merging fails, return original response
				console.error("Failed to merge OpenAPI schemas:", error);
			}
		}

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
