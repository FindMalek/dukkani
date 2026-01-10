import { trace } from "@opentelemetry/api";
import { W3CTraceContextPropagator } from "@opentelemetry/core";
import {
	detectResources,
	resourceFromAttributes,
} from "@opentelemetry/resources";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
	SimpleSpanProcessor,
	TraceIdRatioBasedSampler,
} from "@opentelemetry/sdk-trace-base";
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { getInstrumentations } from "./instrumentations";
import {
	createOTLPLogExporter,
	createOTLPMetricExporter,
	createOTLPTraceExporter,
	type OTLPExporterConfig,
} from "./otlp-exporter";

export interface TracingConfig {
	serviceName: string;
	samplingRate?: number;
	enabled?: boolean;
	environment?: string;
	/**
	 * Use SimpleSpanProcessor for immediate export (useful for serverless/debugging)
	 * Default: false (uses BatchSpanProcessor)
	 */
	useSimpleSpanProcessor?: boolean;
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

	// Detect host information automatically
	const detectedResource = detectResources();

	// Create resource with service information
	const resource = resourceFromAttributes(
		{
			[ATTR_SERVICE_NAME]: config.serviceName,
			[ATTR_SERVICE_VERSION]: process.env.npm_package_version ?? "0.1.0",
			["deployment.environment.name"]: environment,
		},
		detectedResource,
	);

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

	// Choose span processor based on config
	// SimpleSpanProcessor: immediate export (good for serverless/debugging)
	// BatchSpanProcessor: batched export (better performance, default)
	const useSimpleProcessor =
		config.useSimpleSpanProcessor ??
		process.env.OTEL_USE_SIMPLE_PROCESSOR === "true";

	// Create SDK following Next.js OpenTelemetry patterns
	sdk = new NodeSDK({
		resource,
		instrumentations: getInstrumentations(),
		// Use SimpleSpanProcessor if configured (for testing serverless export timing)
		spanProcessor:
			traceExporter && useSimpleProcessor
				? new SimpleSpanProcessor(traceExporter)
				: undefined, // Default BatchSpanProcessor will be used
		traceExporter:
			traceExporter && !useSimpleProcessor ? traceExporter : undefined,
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
		// Restrict propagation to W3C Trace Context only (exclude Baggage)
		textMapPropagator: new W3CTraceContextPropagator(),
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

/**
 * Get SDK initialization status
 * Useful for debugging
 */
export function getSDKStatus(): {
	initialized: boolean;
	hasTracerProvider: boolean;
	hasLoggerProvider: boolean;
	hasMeterProvider: boolean;
} {
	if (!sdk) {
		return {
			initialized: false,
			hasTracerProvider: false,
			hasLoggerProvider: false,
			hasMeterProvider: false,
		};
	}

	// Check providers using OpenTelemetry API instead of internal SDK properties
	// NodeSDK doesn't expose these as public properties
	let hasTracerProvider = false;
	let hasLoggerProvider = false;
	let hasMeterProvider = false;

	try {
		// Check tracer provider by trying to get it from the API
		const tracerProvider = trace.getTracerProvider();
		hasTracerProvider =
			tracerProvider !== undefined &&
			typeof (tracerProvider as { forceFlush?: unknown }).forceFlush ===
				"function";
	} catch {
		// Provider not registered
	}

	try {
		// Check logger provider (if available in API)
		// Note: Logger provider API may not be available in all versions
		const loggerProvider = (
			trace as unknown as { getLoggerProvider?: () => unknown }
		).getLoggerProvider?.();
		hasLoggerProvider = loggerProvider !== undefined;
	} catch {
		// Logger provider not available or not registered
	}

	try {
		// Check meter provider (if available in API)
		// Note: Meter provider API may not be available in all versions
		const meterProvider = (
			trace as unknown as { getMeterProvider?: () => unknown }
		).getMeterProvider?.();
		hasMeterProvider = meterProvider !== undefined;
	} catch {
		// Meter provider not available or not registered
	}

	return {
		initialized: true,
		hasTracerProvider,
		hasLoggerProvider,
		hasMeterProvider,
	};
}
