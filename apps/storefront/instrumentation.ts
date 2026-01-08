import { registerTracing } from "@dukkani/tracing";
import { storefrontEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: storefrontEnv.OTEL_SERVICE_NAME,
		betterStackApiKey: storefrontEnv.BETTER_STACK_API_KEY,
		samplingRate: storefrontEnv.OTEL_SAMPLING_RATE,
		enabled: storefrontEnv.OTEL_ENABLED,
		environment: storefrontEnv.NEXT_PUBLIC_NODE_ENV,
	});
}