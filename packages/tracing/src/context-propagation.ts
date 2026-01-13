import { context, propagation } from "@opentelemetry/api";

/**
 * Propagate trace context to headers for service-to-service calls
 * Ensures trace continuity across service boundaries
 *
 * Normalizes input headers (handles Headers, Record, tuple arrays) and injects
 * trace context headers (traceparent, tracestate) while preserving original values.
 *
 * Note: propagation.inject may also inject W3C Baggage headers depending on SDK
 * configuration. For third-party endpoints (e.g., Telegram API), consider restricting
 * propagation to W3C Trace Context only by configuring propagators at the SDK level
 * (see packages/tracing/src/sdk.ts) to avoid sending baggage to external services.
 */
export function propagateTraceContext(headers: HeadersInit = {}): Headers {
	// Normalize input to Headers instance (handles all HeadersInit variants)
	const normalized = new Headers(headers);

	// Create a plain carrier object from normalized headers
	const carrier: Record<string, string> = {};
	normalized.forEach((value, key) => {
		carrier[key] = value;
	});

	// Inject current trace context (and potentially W3C Baggage) into carrier
	// By default, NodeSDK uses both W3C Trace Context (traceparent, tracestate)
	// and W3C Baggage propagators. This injects headers based on active context
	// and SDK propagator configuration.
	propagation.inject(context.active(), carrier);

	// Apply carrier entries back onto normalized Headers
	// This preserves original headers and adds trace context headers
	for (const [key, value] of Object.entries(carrier)) {
		normalized.set(key, value);
	}

	return normalized;
}

/**
 * Fetch with automatic trace context propagation
 * Use this for all external API calls (Telegram, internal services, etc.)
 *
 * Note: This propagates all configured context (trace + baggage) to the target endpoint.
 * For third-party APIs, ensure SDK propagators are configured to only emit W3C Trace
 * Context (not Baggage) if you want to avoid sending baggage to external services.
 *
 * Example:
 * const response = await fetchWithTrace("https://api.telegram.org/...", {
 *   method: "POST",
 *   headers: { "Content-Type": "application/json" },
 *   body: JSON.stringify(data),
 * });
 */
export async function fetchWithTrace(
	url: string | URL,
	options?: RequestInit,
): Promise<Response> {
	// Propagate trace context to headers
	const headers = propagateTraceContext(options?.headers);

	// HTTP instrumentation will automatically create a child span
	// and the trace context in headers ensures continuity
	return fetch(url, { ...options, headers });
}
