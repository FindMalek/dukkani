import { registerTracing } from "@dukkani/tracing";
import { env } from "./src/env";

export function register() {
	registerTracing({
		serviceName: env.OTEL_SERVICE_NAME,
		samplingRate: env.OTEL_SAMPLING_RATE,
		enabled: env.OTEL_ENABLED,
		environment: "production",
		otlp: {
			endpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
			tracesEndpoint: env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			metricsEndpoint: env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
			logsEndpoint: env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
			headers: env.OTEL_EXPORTER_OTLP_HEADERS,
			compression: env.OTEL_EXPORTER_OTLP_COMPRESSION,
		},
	});
}
