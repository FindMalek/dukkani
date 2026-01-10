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

/**
 * Add event to current active span
 * Use for important milestones within an operation
 */
export function addSpanEvent(
	name: string,
	attributes?: Record<string, string | number | boolean>,
): void {
	const span = trace.getActiveSpan();
	if (span) {
		span.addEvent(name, attributes);
	}
}

/**
 * Check if we're currently in a trace context
 * Useful for conditional instrumentation
 */
export function hasActiveSpan(): boolean {
	return trace.getActiveSpan() !== undefined;
}

/**
 * Create a traced method - cleaner alternative to decorators
 * Usage: static methodName = traceMethod("span.name", async (span, ...args) => { ... })
 */
export function traceMethod<T extends (...args: any[]) => Promise<any>>(
	spanName: string,
	fn: (
		span: ReturnType<typeof trace.getActiveSpan>,
		...args: Parameters<T>
	) => Promise<ReturnType<T>>,
	staticAttributes?: Record<string, string | number | boolean>,
): T {
	return (async (...args: Parameters<T>) => {
		const tracer = trace.getTracer("dukkani");
		return tracer.startActiveSpan(spanName, async (span) => {
			try {
				if (staticAttributes) {
					Object.entries(staticAttributes).forEach(([key, value]) => {
						span.setAttribute(key, value);
					});
				}

				const result = await fn(span, ...args);
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
	}) as T;
}
