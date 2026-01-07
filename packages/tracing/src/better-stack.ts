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
 * Create Better Stack trace exporter
 */
export function createBetterStackTraceExporter(apiKey?: string) {
	if (!apiKey) {
		// Return console exporter for local development
		return undefined;
	}

	return new OTLPTraceExporter({
		url: BETTER_STACK_ENDPOINTS.traces,
		headers: getHeaders(apiKey),
	});
}

/**
 * Create Better Stack log exporter
 */
export function createBetterStackLogExporter(apiKey?: string) {
	if (!apiKey) {
		return undefined;
	}

	return new OTLPLogExporter({
		url: BETTER_STACK_ENDPOINTS.logs,
		headers: getHeaders(apiKey),
	});
}

/**
 * Create Better Stack metrics exporter
 */
export function createBetterStackMetricsExporter(apiKey?: string) {
	if (!apiKey) {
		return undefined;
	}

	return new OTLPMetricExporter({
		url: BETTER_STACK_ENDPOINTS.metrics,
		headers: getHeaders(apiKey),
	});
}
