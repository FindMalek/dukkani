import { registerTracing } from "@dukkani/tracing";
import { webEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: webEnv.OTEL_SERVICE_NAME,
		betterStackApiKey: webEnv.BETTER_STACK_API_KEY,
		samplingRate: webEnv.OTEL_SAMPLING_RATE,
		enabled: webEnv.OTEL_ENABLED,
		environment: "production", 
	});
}