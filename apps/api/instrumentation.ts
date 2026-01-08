import { registerTracing } from "@dukkani/tracing";
import { apiEnv } from "@dukkani/env";

export function register() {
	registerTracing({
		serviceName: apiEnv.OTEL_SERVICE_NAME,
		betterStackApiKey: apiEnv.BETTER_STACK_API_KEY,
		samplingRate: apiEnv.OTEL_SAMPLING_RATE,
		enabled: apiEnv.OTEL_ENABLED,
		environment: apiEnv.NEXT_PUBLIC_NODE_ENV,
	});
}