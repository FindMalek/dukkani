import { SpanStatusCode, trace } from "@opentelemetry/api";

type Constructor = new (...args: unknown[]) => unknown;

/**
 * Decorator to automatically trace method execution
 * Creates child spans within existing trace context (respects parent-child relationships)
 */
export function Trace(
	spanName: string,
	staticAttributes?: Record<string, string | number | boolean>,
) {
	return (
		target: Constructor | object,
		propertyKey: string | symbol,
		descriptor: PropertyDescriptor,
	) => {
		const originalMethod = descriptor.value;
		const name =
			spanName || `${target.constructor.name}.${String(propertyKey)}`;

		descriptor.value = async function (this: unknown, ...args: unknown[]) {
			const tracer = trace.getTracer("dukkani");

			// startActiveSpan automatically creates child span if active span exists
			// This respects parent-child relationships - no new trace!
			return tracer.startActiveSpan(name, async (span) => {
				try {
					// Add static attributes if provided
					if (staticAttributes) {
						Object.entries(staticAttributes).forEach(([key, value]) => {
							span.setAttribute(key, value);
						});
					}

					// Add method arguments as attributes (sanitized, optional)
					// Only add if they're simple types to avoid sensitive data
					if (args.length > 0) {
						span.setAttribute("method.args_count", args.length);
					}

					const result = await originalMethod.apply(this, args);
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
		};

		return descriptor;
	};
}
