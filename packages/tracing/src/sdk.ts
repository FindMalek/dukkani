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
 * Check if tracer provider is NoOp (not initialized)
 */
function isNoOpTracerProvider(): boolean {
	try {
		const provider = trace.getTracerProvider();
		// NoOpTracerProvider doesn't have forceFlush method
		// Real providers (like SDK's TracerProvider) have forceFlush
		return (
			!provider ||
			typeof (provider as { forceFlush?: unknown }).forceFlush !== "function"
		);
	} catch {
		return true;
	}
}

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

	// Verify tracer provider is registered (critical check)
	if (isNoOpTracerProvider()) {
		console.error(
			"[OTEL] Tracer provider not initialized - instrumentation.ts may not have executed",
		);
	}

	return sdk;
}

// For Vercel/serverless: Ensure spans are flushed before function termination
if (
	typeof process !== "undefined" &&
	process.env.VERCEL &&
	typeof process.on === "function"
) {
	const flushOnExit = async () => {
		try {
			await flushTelemetry();
		} catch {
			// Silently fail - don't block function exit
		}
	};

	process.on("beforeExit", flushOnExit);
	process.on("SIGTERM", flushOnExit);
	try {
		process.on("SIGINT", flushOnExit);
	} catch {
		// SIGINT may not be available in all environments
	}
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
 * Check if tracing is properly initialized
 * Returns true if tracer provider is registered (not NoOp)
 */
export function isTracingInitialized(): boolean {
	return !isNoOpTracerProvider();
}

/**
 * Flush all pending spans immediately
 * CRITICAL for serverless environments where functions terminate quickly
 * Call this before function returns to ensure spans are exported
 */
export async function flushTelemetry(): Promise<void> {
	if (!sdk) {
		return;
	}

	try {
		const tracerProvider = trace.getTracerProvider();
		const providerWithFlush = tracerProvider as unknown as {
			forceFlush?: () => Promise<void>;
		};

		if (
			providerWithFlush &&
			typeof providerWithFlush.forceFlush === "function"
		) {
			await providerWithFlush.forceFlush();
		}
	} catch (error) {
		// Silently fail - flushing failures shouldn't break the app
		console.error("[OTEL] Failed to flush telemetry:", error);
	}
}
