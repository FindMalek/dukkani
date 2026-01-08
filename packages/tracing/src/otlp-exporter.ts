import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { CompressionAlgorithm } from "@opentelemetry/otlp-exporter-base";

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
	 * Compression: 'gzip' string from env, will be converted to CompressionAlgorithm
	 */
	compression?: "gzip";
}

/**
 * Convert compression string to CompressionAlgorithm enum
 */
function getCompressionAlgorithm(
	compression?: "gzip",
): CompressionAlgorithm | undefined {
	if (compression === "gzip") {
		return CompressionAlgorithm.GZIP;
	}
	return undefined;
}

/**
 * Parse headers string into object
 * Supports formats:
 * - "Authorization=Basic ..."
 * - "key1=value1,key2=value2"
 * - "key1=value1, key2=value2" (with spaces)
 */
function parseHeaders(headersString?: string): Record<string, string> {
	if (!headersString) {
		return {};
	}

	const headers: Record<string, string> = {};
	const pairs = headersString.split(",").map((pair) => pair.trim());

	for (const pair of pairs) {
		const [key, ...valueParts] = pair.split("=");
		if (key && valueParts.length > 0) {
			// Rejoin value in case it contains '=' (e.g., base64 strings)
			const value = valueParts.join("=").trim();
			headers[key.trim()] = value;
		}
	}

	return headers;
}

/**
 * Build endpoint URL for a signal type
 * If per-signal endpoint is provided, use it
 * Otherwise, append signal path to base endpoint
 */
function buildEndpoint(
	baseEndpoint: string | undefined,
	signalEndpoint: string | undefined,
	signalPath: string,
): string | undefined {
	if (signalEndpoint) {
		return signalEndpoint;
	}
	if (baseEndpoint) {
		// Remove trailing slash if present
		const base = baseEndpoint.replace(/\/$/, "");
		// Append signal path
		return `${base}${signalPath}`;
	}
	return undefined;
}

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
		compression: getCompressionAlgorithm(config.compression),
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
		compression: getCompressionAlgorithm(config.compression),
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
		compression: getCompressionAlgorithm(config.compression),
	});
}