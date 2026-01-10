import { apiEnv } from "@dukkani/env";
import { registerTracing } from "@dukkani/tracing";

export function register() {
	console.log("[OTEL] instrumentation.ts register() called");
	console.log("[OTEL] Environment:", process.env.NODE_ENV);
	console.log("[OTEL] Vercel:", !!process.env.VERCEL);
	console.log("[OTEL] OTEL_ENABLED:", apiEnv.OTEL_ENABLED);
	console.log("[OTEL] Service Name:", apiEnv.OTEL_SERVICE_NAME);
	console.log(
		"[OTEL] Endpoint:",
		apiEnv.OTEL_EXPORTER_OTLP_ENDPOINT ||
			apiEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
			"not configured",
	);

	registerTracing({
		serviceName: apiEnv.OTEL_SERVICE_NAME,
		samplingRate: apiEnv.OTEL_SAMPLING_RATE,
		enabled: apiEnv.OTEL_ENABLED,
		environment: apiEnv.NEXT_PUBLIC_NODE_ENV,
		useSimpleSpanProcessor: !!process.env.VERCEL,
		otlp: {
			endpoint: apiEnv.OTEL_EXPORTER_OTLP_ENDPOINT,
			tracesEndpoint: apiEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			metricsEndpoint: apiEnv.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
			logsEndpoint: apiEnv.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
			headers: apiEnv.OTEL_EXPORTER_OTLP_HEADERS,
			compression: apiEnv.OTEL_EXPORTER_OTLP_COMPRESSION,
		},
	});

	console.log("[OTEL] Tracing registration complete");
}