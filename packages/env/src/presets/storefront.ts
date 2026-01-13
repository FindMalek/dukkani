import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import { baseEnv } from "../base";

/**
 * Storefront app environment preset
 * Extends base env and adds storefront-specific variables
 */
export const storefrontEnv = createEnv({
	extends: [baseEnv],
	server: {
		// OpenTelemetry configuration
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
		NEXT_PUBLIC_STORE_DOMAIN: z.string().refine((val) => val.includes("."), {
			message: "NEXT_PUBLIC_STORE_DOMAIN must be a valid domain name.",
		}),
	},
	clientPrefix: "NEXT_PUBLIC_",
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
});
