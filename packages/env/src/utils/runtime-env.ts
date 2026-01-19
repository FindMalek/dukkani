/**
 * Helper to create runtimeEnv object for Next.js presets
 * MUST use literal property access (not loops) for Next.js bundling to work
 */
export function createNextjsRuntimeEnv() {
	return {
		// Base client vars - MUST be literal, or Next won't inline
		NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NEXT_PUBLIC_ALLOWED_ORIGIN: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN,
		// URLs module vars
		NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
		NEXT_PUBLIC_DASHBOARD_URL: process.env.NEXT_PUBLIC_DASHBOARD_URL,
		NEXT_PUBLIC_STORE_DOMAIN: process.env.NEXT_PUBLIC_STORE_DOMAIN,
		// Observability server vars - only available on server side
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
	} as const;
}
