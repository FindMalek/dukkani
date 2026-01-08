import { registerTracing } from "@dukkani/tracing";
import { storefrontEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: storefrontEnv.OTEL_SERVICE_NAME,
		samplingRate: storefrontEnv.OTEL_SAMPLING_RATE,
		enabled: storefrontEnv.OTEL_ENABLED,
		environment: storefrontEnv.NEXT_PUBLIC_NODE_ENV,
		otlp: {
			endpoint: storefrontEnv.OTEL_EXPORTER_OTLP_ENDPOINT,
			tracesEndpoint: storefrontEnv.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
			metricsEndpoint: storefrontEnv.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT,
			logsEndpoint: storefrontEnv.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
			headers: storefrontEnv.OTEL_EXPORTER_OTLP_HEADERS,
			compression: storefrontEnv.OTEL_EXPORTER_OTLP_COMPRESSION,
		},
	});
}
