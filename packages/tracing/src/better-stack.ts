import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

/**
 * Better Stack OTLP endpoints
 */
const BETTER_STACK_ENDPOINTS = {
	traces: "https://in-otel.betterstack.com/v1/traces",
	logs: "https://in-otel.betterstack.com/v1/logs",
	metrics: "https://in-otel.betterstack.com/v1/metrics",
} as const;

/**
 * Get headers for Better Stack authentication
 */
function getHeaders(apiKey: string): Record<string, string> {
	return {
		Authorization: `Bearer ${apiKey}`,
		"Content-Type": "application/json",
	};
}

/**
 * Generic factory function to create exporters
 */
function createExporter<T>(
	Exporter: new (config: { url: string; headers: Record<string, string> }) => T,
	url: string,
	apiKey?: string,
): T | undefined {
	if (!apiKey) {
		return undefined;
	}
	return new Exporter({
		url,
		headers: getHeaders(apiKey),
	});
}

/**
 * Create Better Stack trace exporter
 */
export function createBetterStackTraceExporter(apiKey?: string) {
	return createExporter(
		OTLPTraceExporter,
		BETTER_STACK_ENDPOINTS.traces,
		apiKey,
	);
}

/**
 * Create Better Stack log exporter
 */
export function createBetterStackLogExporter(apiKey?: string) {
	return createExporter(OTLPLogExporter, BETTER_STACK_ENDPOINTS.logs, apiKey);
}

/**
 * Create Better Stack metrics exporter
 */
export function createBetterStackMetricsExporter(apiKey?: string) {
	return createExporter(
		OTLPMetricExporter,
		BETTER_STACK_ENDPOINTS.metrics,
		apiKey,
	);
}
