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

async function handleRequest(req: NextRequest) {
	// Handle RPC requests
	const rpcResult = await rpcHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (rpcResult.response) return rpcResult.response;

	// Handle OpenAPI requests (playground and spec)
	const apiResult = await apiHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (apiResult.response) return apiResult.response;

	return new Response("Not found", { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;

