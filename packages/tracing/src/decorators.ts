import { SpanStatusCode, trace } from "@opentelemetry/api";

type Constructor = new (...args: unknown[]) => unknown;

/**
 * Decorator to automatically trace method execution
 * Creates child spans within existing trace context (respects parent-child relationships)
 *
 * Supports TypeScript experimental decorators API (signature: target, propertyKey, descriptor).
 * Does not support the new decorator proposal (signature: value, context).
 */
export function Trace(
	spanName: string,
	staticAttributes?: Record<string, string | number | boolean>,
) {
	// TypeScript experimental decorator API (experimentalDecorators: true)
	return (
		target: Constructor | object,
		propertyKey: string | symbol | undefined,
		descriptor?: PropertyDescriptor,
	) => {
		// Guard: propertyKey is required for method decorators
		if (propertyKey === undefined) {
			// Return early - decorator called incorrectly (might be class decorator)
			return;
		}

		// Resolve descriptor from target if not provided
		let resolvedDescriptor: PropertyDescriptor;

		if (descriptor && typeof descriptor.value === "function") {
			resolvedDescriptor = descriptor;
		} else {
			// Determine if this is a static method (target is constructor) or instance method
			const isStatic = typeof target === "function";
			const targetObj = isStatic ? target : target.constructor;

			// For static methods, descriptor is on the constructor itself
			// For instance methods, descriptor is on the prototype
			const descriptorSource = isStatic ? targetObj : targetObj.prototype;

			// Try to get the descriptor
			const ownDescriptor = Object.getOwnPropertyDescriptor(
				descriptorSource,
				propertyKey,
			);

			if (ownDescriptor && typeof ownDescriptor.value === "function") {
				resolvedDescriptor = ownDescriptor;
			} else {
				// Fallback: get the method directly and create descriptor
				const originalMethod = descriptorSource[propertyKey];
				if (typeof originalMethod !== "function") {
					return;
				}

				resolvedDescriptor = {
					value: originalMethod,
					writable: true,
					enumerable: false,
					configurable: true,
				};
			}
		}

		if (!resolvedDescriptor || typeof resolvedDescriptor.value !== "function") {
			return;
		}

		const originalMethod = resolvedDescriptor.value;

		// Determine class name: for static methods use target.name, for instance use target.constructor.name
		const isStatic = typeof target === "function";
		const className = isStatic ? target.name : target.constructor.name;
		const name = spanName || `${className}.${String(propertyKey)}`;

		// Create the wrapped method - preserves original return type (sync/async)
		const wrappedMethod = function (this: unknown, ...args: unknown[]) {
			const tracer = trace.getTracer("dukkani_app");

			// Call original method and detect if result is a Promise/thenable
			let result: unknown;
			try {
				result = originalMethod.apply(this, args);
			} catch (error) {
				// Synchronous exception - create span, record error, then rethrow
				const span = tracer.startSpan(name);
				try {
					if (staticAttributes) {
						Object.entries(staticAttributes).forEach(([key, value]) => {
							span.setAttribute(key, value);
						});
					}
					if (args.length > 0) {
						span.setAttribute("method.args_count", args.length);
					}
					span.recordException(error as Error);
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
				// Async path: wrap Promise with tracing
				return tracer.startActiveSpan(name, async (span) => {
					try {
						if (staticAttributes) {
							Object.entries(staticAttributes).forEach(([key, value]) => {
								span.setAttribute(key, value);
							});
						}
						if (args.length > 0) {
							span.setAttribute("method.args_count", args.length);
						}

						const awaitedResult = await (result as Promise<unknown>);
						span.setStatus({ code: SpanStatusCode.OK });
						return awaitedResult;
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

			// Synchronous path: create span, execute, end span
			const span = tracer.startSpan(name);
			try {
				if (staticAttributes) {
					Object.entries(staticAttributes).forEach(([key, value]) => {
						span.setAttribute(key, value);
					});
				}
				if (args.length > 0) {
					span.setAttribute("method.args_count", args.length);
				}
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
		};

		// Update descriptor with wrapped method
		resolvedDescriptor.value = wrappedMethod;

		// Update the property descriptor on the correct target
		const isStaticForUpdate = typeof target === "function";
		const targetObj = isStaticForUpdate ? target : target.constructor;
		const descriptorSource = isStaticForUpdate
			? targetObj
			: targetObj.prototype;

		try {
			Object.defineProperty(descriptorSource, propertyKey, resolvedDescriptor);
		} catch {
			// Silently fail if we can't define property
			return;
		}

		return resolvedDescriptor;
	};
}
