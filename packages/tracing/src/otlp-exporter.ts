import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import type { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";

export interface OTLPExporterConfig {
	/**
	 * Base OTLP endpoint (e.g., https://otlp-gateway-prod-us-central-0.grafana.net/otlp)
	 * If not provided, per-signal endpoints must be set
	 */
	endpoint?: string;
	/**
	 * Per-signal endpoints (overrides base endpoint if set)
	 */
	tracesEndpoint?: string;
	metricsEndpoint?: string;
	logsEndpoint?: string;
	/**
	 * OTLP headers as string (e.g., "Authorization=Basic ..." or "key1=value1,key2=value2")
	 */
	headers?: string;
	/**
	 * Compression: 'gzip' or undefined
	 */
	compression?: CompressionAlgorithm;
}

// ... existing parseHeaders and buildEndpoint functions ...

/**
 * Create OTLP trace exporter
 */
export function createOTLPTraceExporter(
	config: OTLPExporterConfig,
): OTLPTraceExporter | undefined {
	const endpoint = buildEndpoint(
		config.endpoint,
		config.tracesEndpoint,
		"/v1/traces",
	);

	if (!endpoint) {
		return undefined;
	}

	const headers = parseHeaders(config.headers);

	return new OTLPTraceExporter({
		url: endpoint,
		headers,
		compression: config.compression,
	});
}

/**
 * Create OTLP log exporter
 */
export function createOTLPLogExporter(
	config: OTLPExporterConfig,
): OTLPLogExporter | undefined {
	const endpoint = buildEndpoint(
		config.endpoint,
		config.logsEndpoint,
		"/v1/logs",
	);

	if (!endpoint) {
		return undefined;
	}

	const headers = parseHeaders(config.headers);

	return new OTLPLogExporter({
		url: endpoint,
		headers,
		compression: config.compression,
	});
}

/**
 * Create OTLP metrics exporter
 */
export function createOTLPMetricExporter(
	config: OTLPExporterConfig,
): OTLPMetricExporter | undefined {
	const endpoint = buildEndpoint(
		config.endpoint,
		config.metricsEndpoint,
		"/v1/metrics",
	);

	if (!endpoint) {
		return undefined;
	}

	const headers = parseHeaders(config.headers);

	return new OTLPMetricExporter({
		url: endpoint,
		headers,
		compression: config.compression,
	});
}
