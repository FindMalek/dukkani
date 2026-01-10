import { context, propagation } from "@opentelemetry/api";

/**
 * Propagate trace context to headers for service-to-service calls
 * Ensures trace continuity across service boundaries
 */
export function propagateTraceContext(headers: HeadersInit = {}): HeadersInit {
	const carrier: Record<string, string> = {};

	// Inject current trace context into headers
	// This adds traceparent, tracestate headers automatically
	propagation.inject(context.active(), carrier);

	return {
		...headers,
		...carrier,
	};
}

/**
 * Fetch with automatic trace context propagation
 * Use this for all external API calls (Telegram, internal services, etc.)
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
