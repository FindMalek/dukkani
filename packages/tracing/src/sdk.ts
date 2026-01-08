import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { TraceIdRatioBasedSampler } from "@opentelemetry/sdk-trace-base";
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
	createOTLPLogExporter,
	createOTLPMetricExporter,
	createOTLPTraceExporter,
	type OTLPExporterConfig,
} from "./otlp-exporter";
import { getInstrumentations } from "./instrumentations";

export interface TracingConfig {
	serviceName: string;
	samplingRate?: number;
	enabled?: boolean;
	environment?: string;
	/**
	 * OTLP exporter configuration
	 */
	otlp?: OTLPExporterConfig;
}

let sdk: NodeSDK | null = null;

/**
 * Initialize OpenTelemetry SDK
 * Aligned with Next.js OpenTelemetry best practices
 * @see https://nextjs.org/docs/app/guides/open-telemetry
 */
export function initializeSDK(config: TracingConfig): NodeSDK | null {
	if (config.enabled === false) {
		return null;
	}

	// Don't initialize twice
	if (sdk) {
		return sdk;
	}

	const samplingRate = config.samplingRate ?? 1.0;
	const environment =
		config.environment ?? process.env.NODE_ENV ?? "development";

	// Create resource with service information using resourceFromAttributes
	const resource = resourceFromAttributes({
		[ATTR_SERVICE_NAME]: config.serviceName,
		[ATTR_SERVICE_VERSION]: process.env.npm_package_version ?? "0.0.0",
		["deployment.environment.name"]: environment,
	});

	// Create exporters from OTLP config
	const traceExporter = config.otlp
		? createOTLPTraceExporter(config.otlp)
		: undefined;
	const logExporter = config.otlp
		? createOTLPLogExporter(config.otlp)
		: undefined;
	const metricsExporter = config.otlp
		? createOTLPMetricExporter(config.otlp)
		: undefined;

	// Create SDK following Next.js OpenTelemetry patterns
	sdk = new NodeSDK({
		resource,
		instrumentations: getInstrumentations(),
		traceExporter,
		logRecordProcessor: logExporter
			? new BatchLogRecordProcessor(logExporter)
			: undefined,
		metricReader: metricsExporter
			? new PeriodicExportingMetricReader({
					exporter: metricsExporter,
					exportIntervalMillis: 30000,
				})
			: undefined,
		sampler: new TraceIdRatioBasedSampler(samplingRate),
	});

	// Start SDK
	sdk.start();

	return sdk;
}

/**
 * Shutdown SDK gracefully
 */
export async function shutdownSDK(): Promise<void> {
	if (sdk) {
		await sdk.shutdown();
		sdk = null;
	}
}
