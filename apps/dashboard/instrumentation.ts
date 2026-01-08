import { registerTracing } from "@dukkani/tracing";
import { dashboardEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: dashboardEnv.OTEL_SERVICE_NAME,
		samplingRate: dashboardEnv.OTEL_SAMPLING_RATE,
		enabled: dashboardEnv.OTEL_ENABLED,
		environment: dashboardEnv.NEXT_PUBLIC_NODE_ENV,
		otlp: {
			endpoint: dashboardEnv.OTEL_EXPORTER_OTLP_ENDPOINT,
			tracesEndpoint: dashboardEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			metricsEndpoint: dashboardEnv.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
			logsEndpoint: dashboardEnv.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
			headers: dashboardEnv.OTEL_EXPORTER_OTLP_HEADERS,
			compression: dashboardEnv.OTEL_EXPORTER_OTLP_COMPRESSION,
		},
	});
}
