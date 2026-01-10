import { registerTracing } from "@dukkani/tracing";
import { webEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: webEnv.OTEL_SERVICE_NAME,
		samplingRate: webEnv.OTEL_SAMPLING_RATE,
		enabled: webEnv.OTEL_ENABLED,
		environment: "production",
		otlp: {
			endpoint: webEnv.OTEL_EXPORTER_OTLP_ENDPOINT,
			tracesEndpoint: webEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			metricsEndpoint: webEnv.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
			logsEndpoint: webEnv.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
			headers: webEnv.OTEL_EXPORTER_OTLP_HEADERS,
			compression: webEnv.OTEL_EXPORTER_OTLP_COMPRESSION,
		},
	});
}
