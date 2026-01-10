/**
 * Logger integration with OpenTelemetry
 *
 * This module ensures logs are correlated with traces.
 * The PinoInstrumentation handles the actual integration,
 * but we export utilities for manual log correlation.
 */

import { getSpanId, getTraceId } from "./utils";

/**
 * Get trace context for logging
 * Adds trace_id and span_id to log context
 */
export function getTraceContext(): {
	trace_id?: string;
	span_id?: string;
} {
	const traceId = getTraceId();
	const spanId = getSpanId();

	if (!traceId && !spanId) {
		return {};
	}

	return {
		...(traceId && { trace_id: traceId }),
		...(spanId && { span_id: spanId }),
	};
}

/**
 * Enhance log object with trace context
 */
export function enhanceLogWithTraceContext<T extends Record<string, unknown>>(
	logObject: T,
): T & { trace_id?: string; span_id?: string } {
	return {
		...logObject,
		...getTraceContext(),
	};
}