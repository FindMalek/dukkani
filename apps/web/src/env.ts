import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Web app environment configuration
 * Uses @t3-oss/env-nextjs which automatically loads .env.local files
 * This ensures Next.js environment variables are loaded before validation
 */
export const webEnv = createEnv({
	server: {
		BETTER_STACK_API_KEY: z.string().optional(),
		OTEL_SERVICE_NAME: z.string(),
		OTEL_SAMPLING_RATE: z.coerce.number().min(0).max(1),
		OTEL_ENABLED: z.coerce.boolean(),
		// OTLP exporter configuration
		OTEL_EXPORTER_OTLP_ENDPOINT: z.url().optional(),
		OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: z.url().optional(),
		OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: z.url().optional(),
		OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: z.url().optional(),
		OTEL_EXPORTER_OTLP_HEADERS: z.string().optional(),
		OTEL_EXPORTER_OTLP_PROTOCOL: z.enum(["http/protobuf"]).optional(),
		OTEL_EXPORTER_OTLP_COMPRESSION: z.enum(["gzip"]).optional(),
	},
	client: {
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
		BETTER_STACK_API_KEY: process.env.BETTER_STACK_API_KEY,
		OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME,
		OTEL_SAMPLING_RATE: process.env.OTEL_SAMPLING_RATE,
		OTEL_ENABLED: process.env.OTEL_ENABLED,
		OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
		OTEL_EXPORTER_OTLP_TRACES_ENDPOINT:
			process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
		OTEL_EXPORTER_OTLP_METRICS_ENDPOINT:
			process.env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
		OTEL_EXPORTER_OTLP_LOGS_ENDPOINT:
			process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
		OTEL_EXPORTER_OTLP_HEADERS: process.env.OTEL_EXPORTER_OTLP_HEADERS,
		OTEL_EXPORTER_OTLP_PROTOCOL: process.env.OTEL_EXPORTER_OTLP_PROTOCOL,
		OTEL_EXPORTER_OTLP_COMPRESSION: process.env.OTEL_EXPORTER_OTLP_COMPRESSION,
	},
	emptyStringAsUndefined: true,
});
