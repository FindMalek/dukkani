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
 * According to OpenTelemetry spec, values with commas MUST be URL-encoded (%2C)
 * This parser correctly handles URL-encoded commas by checking for %2C before splitting
 */
function parseHeaders(headersString?: string): Record<string, string> {
	if (!headersString) {
		return {};
	}

	const headers: Record<string, string> = {};
	
	// Split by comma, but only when NOT preceded by %2C (URL-encoded comma)
	// We'll use a regex to find all commas that aren't part of %2C
	const parts: string[] = [];
	let currentPart = "";
	let i = 0;

	while (i < headersString.length) {
		// Check if we're at a comma
		if (headersString[i] === ",") {
			// Check if this comma is URL-encoded (%2C or %2c)
			// Look back 3 characters to see if we have %2C
			if (i >= 3 && 
			    headersString.substring(i - 3, i).toUpperCase() === "%2C") {
				// This comma is URL-encoded, keep it
				currentPart += headersString[i];
			} else {
				// This is a separator comma
				parts.push(currentPart);
				currentPart = "";
			}
		} else {
			currentPart += headersString[i];
		}
		i++;
	}
	
	// Add the last part
	if (currentPart) {
		parts.push(currentPart);
	}

	// Parse each part as key=value
	for (const part of parts) {
		const trimmed = part.trim();
		const equalIndex = trimmed.indexOf("=");
		if (equalIndex > 0) {
			const key = trimmed.substring(0, equalIndex).trim();
			const value = trimmed.substring(equalIndex + 1).trim();
			
			if (key && value) {
				try {
					headers[key] = decodeURIComponent(value);
				} catch {
					// If decoding fails, use original value
					headers[key] = value;
				}
			}
		}
	}

	return headers;
}

/**
 * Create OTLP trace exporter with error handling
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

	const exporter = new OTLPTraceExporter({
		url: endpoint,
		headers,
		compression: getCompressionAlgorithm(config.compression),
	});

	// Add error handling for export failures
	const originalExport = exporter.export.bind(exporter);
	exporter.export = (spans, resultCallback) => {
		originalExport(spans, (result) => {
			if (result.code !== 0 && result.error) {
				// logger.error(
				// 	{
				// 		error: result.error.message || String(result.error),
				// 		endpoint,
				// 		spanCount: spans.length,
				// 	},
				// 	"Failed to export traces",
				// );
			}
			resultCallback(result);
		});
	};

	return exporter;
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
