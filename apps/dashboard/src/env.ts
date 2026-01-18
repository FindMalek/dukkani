import { otelServerSchema } from "@dukkani/env/presets/otel";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Dashboard app environment configuration
 * Uses @t3-oss/env-nextjs which reads env files from the app envDir (repo root)
 * This ensures environment variables are loaded before validation
 * Includes base env variables (DATABASE_URL, NEXT_PUBLIC_NODE_ENV, NEXT_PUBLIC_CORS_ORIGIN)
 * and dashboard-specific variables (NEXT_PUBLIC_DASHBOARD_URL)
 */
export const dashboardEnv = createEnv({
	server: {
		DATABASE_URL: z.url(),
		BETTER_STACK_API_KEY: z.string().optional(),
		...otelServerSchema,
	},
	client: {
		NEXT_PUBLIC_NODE_ENV: z
			.enum(["development", "production", "local"])
			.default("local")
			.transform((val) => {
				// Map Vercel's preview environment to development
				if (process.env.VERCEL_ENV === "preview") return "development";
				return val;
			}),
		NEXT_PUBLIC_CORS_ORIGIN: z.url(),
		NEXT_PUBLIC_DASHBOARD_URL: z.url(),
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_CORS_ORIGIN: process.env.NEXT_PUBLIC_CORS_ORIGIN,
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
