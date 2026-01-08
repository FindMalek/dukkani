import { registerTracing } from "@dukkani/tracing";
import { apiEnv } from "@dukkani/env";

export function register() {
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
}
