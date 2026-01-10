import { type Span, SpanStatusCode, trace } from "@opentelemetry/api";

/**
 * Helper to create a manual span
 */
export async function withSpan<T>(
	name: string,
	fn: (span: Span) => Promise<T>,
	attributes?: Record<string, string | number | boolean>,
): Promise<T> {
	const tracer = trace.getTracer("dukkani_app");
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
			if (error instanceof Error) {
				span.recordException(error);
			} else {
				span.recordException(new Error(String(error)));
			}
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
 * Automatically trace all static methods of a class
 * Usage: export const TracedService = traceStaticClass(Service);
 *
 * This is for classes with only static methods (like your services)
 * Preserves original return types: sync methods return values, async methods return Promises
 */
export function traceStaticClass<
	T extends abstract new (
		...args: never[]
	) => unknown,
>(
	Class: T,
	options?: {
		prefix?: string;
		exclude?: string[];
	},
): T {
	const prefix = options?.prefix || Class.name.toLowerCase();
	const exclude = new Set(
		options?.exclude || ["constructor", "length", "name", "prototype"],
	);

	// Create a function constructor (for static-only classes, this is never instantiated)
	const TracedClass = function TracedClassConstructor(
		this: unknown,
		...args: never[]
	): unknown {
		// This should never be called for static-only classes
		// But if it is, throw an error
		throw new Error(
			`Cannot instantiate ${Class.name} - it only has static methods. Use the static methods directly.`,
		);
	} as unknown as new (
		...args: never[]
	) => unknown;

	// Copy prototype to maintain instanceof checks (if needed)
	TracedClass.prototype = Class.prototype;

	// Copy static properties from original class
	const propertyNames = Object.getOwnPropertyNames(Class);

	for (const prop of propertyNames) {
		if (exclude.has(prop)) continue;

		const descriptor = Object.getOwnPropertyDescriptor(Class, prop);

		if (descriptor && typeof descriptor.value === "function") {
			const originalMethod = descriptor.value;

			// Wrap the method with tracing - preserves sync/async return types
			Object.defineProperty(TracedClass, prop, {
				...descriptor,
				value: function (this: unknown, ...args: unknown[]) {
					const spanName = `${prefix}.${prop}`;
					const tracer = trace.getTracer("dukkani_app");

					// Call original method and detect if result is a Promise/thenable
					let result: unknown;
					try {
						result = originalMethod.apply(this, args);
					} catch (error) {
						// Synchronous exception - create span, record error, then rethrow
						const span = tracer.startSpan(spanName);
						try {
							addSpanAttributes({
								"class.name": Class.name,
								"method.name": prop,
							});
							if (error instanceof Error) {
								span.recordException(error);
							} else {
								span.recordException(new Error(String(error)));
							}
							span.setStatus({
								code: SpanStatusCode.ERROR,
								message: error instanceof Error ? error.message : String(error),
							});
						} finally {
							span.end();
						}
						throw error;
					}

					// Check if result is a Promise/thenable
					const isPromise =
						result && typeof (result as { then?: unknown }).then === "function";

					if (isPromise) {
						// Async path: use startActiveSpan with async callback
						return tracer.startActiveSpan(spanName, async (span) => {
							try {
								addSpanAttributes({
									"class.name": Class.name,
									"method.name": prop,
								});

								const awaitedResult = await (result as Promise<unknown>);
								span.setStatus({ code: SpanStatusCode.OK });
								return awaitedResult;
							} catch (error) {
								if (error instanceof Error) {
									span.recordException(error);
								} else {
									span.recordException(new Error(String(error)));
								}
								span.setStatus({
									code: SpanStatusCode.ERROR,
									message:
										error instanceof Error ? error.message : String(error),
								});
								throw error;
							} finally {
								span.end();
							}
						});
					}

					// Synchronous path: use startSpan, execute synchronously, end span
					const span = tracer.startSpan(spanName);
					try {
						addSpanAttributes({
							"class.name": Class.name,
							"method.name": prop,
						});
						span.setStatus({ code: SpanStatusCode.OK });
						return result;
					} catch (error) {
						if (error instanceof Error) {
							span.recordException(error);
						} else {
							span.recordException(new Error(String(error)));
						}
						span.setStatus({
							code: SpanStatusCode.ERROR,
							message: error instanceof Error ? error.message : String(error),
						});
						throw error;
					} finally {
						span.end();
					}
				},
			});
		} else if (descriptor) {
			// Copy non-function properties as-is
			Object.defineProperty(TracedClass, prop, descriptor);
		}
	}

	return TracedClass as unknown as T;
}
