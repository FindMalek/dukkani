import { registerTracing } from "@dukkani/tracing";
import { dashboardEnv } from "./src/env";

export function register() {
	registerTracing({
		serviceName: dashboardEnv.OTEL_SERVICE_NAME,
		betterStackApiKey: dashboardEnv.BETTER_STACK_API_KEY,
		samplingRate: dashboardEnv.OTEL_SAMPLING_RATE,
		enabled: dashboardEnv.OTEL_ENABLED,
		environment: dashboardEnv.NEXT_PUBLIC_NODE_ENV,
	});
}