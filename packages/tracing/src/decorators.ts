import { SpanStatusCode, trace } from "@opentelemetry/api";

type Constructor = new (...args: unknown[]) => unknown;

/**
 * Decorator to automatically trace method execution
 * Creates child spans within existing trace context (respects parent-child relationships)
 *
 * Compatible with both TypeScript experimental decorators and new decorator proposal
 */
export function Trace(
	spanName: string,
	staticAttributes?: Record<string, string | number | boolean>,
) {
	// Support both old (experimentalDecorators) and new decorator APIs
	return ((
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
		const name =
			spanName || `${target.constructor.name}.${String(propertyKey)}`;

		// Create the wrapped method
		const wrappedMethod = async function (this: unknown, ...args: unknown[]) {
			const tracer = trace.getTracer("dukkani");

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

		// Update descriptor with wrapped method
		resolvedDescriptor.value = wrappedMethod;

		// Update the property descriptor on the correct target
		const isStatic = typeof target === "function";
		const targetObj = isStatic ? target : target.constructor;
		const descriptorSource = isStatic ? targetObj : targetObj.prototype;

		try {
			Object.defineProperty(descriptorSource, propertyKey, resolvedDescriptor);
		} catch {
			// Silently fail if we can't define property
			return;
		}

		return resolvedDescriptor;
	}); // Type assertion to bypass TypeScript's strict decorator type checking
}
