import { logger } from "@dukkani/logger";
import { createContext } from "@dukkani/orpc/context";
import { appRouter } from "@dukkani/orpc/routers/index";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { NextRequest } from "next/server";
import { getCorsHeaders } from "@/lib/cors";

// Ensure tracing is initialized (fallback if instrumentation.ts didn't run)
if (typeof window === "undefined") {
	// Lazy import to avoid circular dependencies
	import("@dukkani/tracing").then(({ isTracingInitialized, registerTracing }) => {
		if (!isTracingInitialized()) {
			// Fallback initialization
			console.warn("[OTEL] Fallback initialization - instrumentation.ts may not have executed");
			import("@dukkani/env/presets/api").then(({ apiEnv }) => {
				registerTracing({
					serviceName: apiEnv.OTEL_SERVICE_NAME,
					samplingRate: apiEnv.OTEL_SAMPLING_RATE,
					enabled: apiEnv.OTEL_ENABLED,
					environment: apiEnv.NEXT_PUBLIC_NODE_ENV,
					otlp: {
						endpoint: apiEnv.OTEL_EXPORTER_OTLP_ENDPOINT,
						tracesEndpoint: apiEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
						metricsEndpoint: apiEnv.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
						logsEndpoint: apiEnv.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
						headers: apiEnv.OTEL_EXPORTER_OTLP_HEADERS,
						compression: apiEnv.OTEL_EXPORTER_OTLP_COMPRESSION,
					},
				});
			});
		}
	});
}

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			logger.error(error);
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
			logger.error(error);
		}),
	],
});

async function handleRequest(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	const rpcResult = await rpcHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (rpcResult.response) {
		const response = rpcResult.response;
		Object.entries(corsHeaders).forEach(([key, value]) => {
			response.headers.set(key, String(value));
		});
		return response;
	}

	const apiResult = await apiHandler.handle(req, {
		prefix: "/api",
		context: await createContext(req.headers),
	});
	if (apiResult.response) {
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

export async function OPTIONS(req: NextRequest) {
	const origin = req.headers.get("origin");
	const corsHeaders = getCorsHeaders(origin);

	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	});
}
