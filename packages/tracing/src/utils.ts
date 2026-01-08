import { SpanStatusCode, trace } from "@opentelemetry/api";

/**
 * Helper to create a manual span
 */
export async function withSpan<T>(
	name: string,
	fn: (span: ReturnType<typeof trace.getActiveSpan>) => Promise<T>,
	attributes?: Record<string, string | number | boolean>,
): Promise<T> {
	const tracer = trace.getTracer("dukkani");
	return tracer.startActiveSpan(name, async (span) => {
		try {
			// Add attributes if provided
			if (attributes) {
				Object.entries(attributes).forEach(([key, value]) => {
					span.setAttribute(key, value);
				});
			}

			const result = await fn(span);
			span.setStatus({ code: SpanStatusCode.OK });
			return result;
		} catch (error) {
			span.recordException(error as Error);
			span.setStatus({
				code: SpanStatusCode.ERROR,
				message: error instanceof Error ? error.message : String(error),
			});
			throw error;
		} finally {
			span.end();
		}
	});
}

/**
 * Get current trace ID (for logging correlation)
 */
export function getTraceId(): string | undefined {
	const span = trace.getActiveSpan();
	if (!span) {
		return undefined;
	}
	return span.spanContext().traceId;
}

/**
 * Get current span ID (for logging correlation)
 */
export function getSpanId(): string | undefined {
	const span = trace.getActiveSpan();
	if (!span) {
		return undefined;
	}
	return span.spanContext().spanId;
}

/**
 * Add attributes to current span
 */
export function addSpanAttributes(
	attributes: Record<string, string | number | boolean>,
): void {
	const span = trace.getActiveSpan();
	if (span) {
		Object.entries(attributes).forEach(([key, value]) => {
			span.setAttribute(key, value);
		});
	}
}
