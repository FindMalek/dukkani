import { initializeSDK, shutdownSDK, type TracingConfig } from "./sdk";

/**
 * Register OpenTelemetry tracing
 * Call this from instrumentation.ts in Next.js apps
 */
export function registerTracing(config: TracingConfig): void {
	// Only initialize in server-side environment
	if (typeof window !== "undefined") {
		return;
	}

	initializeSDK(config);
}

/**
 * Shutdown tracing gracefully
 * Useful for cleanup in tests or graceful shutdowns
 */
export { shutdownSDK };

export {
	fetchWithTrace,
	propagateTraceContext,
} from "./context-propagation";
export { Trace } from "./decorators";
export {
	enhanceLogWithTraceContext,
	getTraceContext,
} from "./logger-integration";
export {
	addSpanAttributes,
	addSpanEvent,
	getSpanId,
	getTraceId,
	traceStaticClass,
	withSpan,
} from "./utils";
export type { TracingConfig };
export { getSDKStatus } from "./sdk";
