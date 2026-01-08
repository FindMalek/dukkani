import { Resource } from "@opentelemetry/resources";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { TraceIdRatioBasedSampler } from "@opentelemetry/sdk-trace-base";
import {
	SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
	SEMRESATTRS_SERVICE_NAME,
	SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
	createBetterStackLogExporter,
	createBetterStackTraceExporter,
} from "./better-stack";
import { getInstrumentations } from "./instrumentations";

export interface TracingConfig {
	serviceName: string;
	betterStackApiKey?: string;
	samplingRate?: number;
	enabled?: boolean;
	environment?: string;
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

	// Create resource with service information
	// Using Resource directly (Next.js uses resourceFromAttributes helper, but Resource works too)
	const resource = new Resource({
		[SEMRESATTRS_SERVICE_NAME]: config.serviceName,
		[SEMRESATTRS_SERVICE_VERSION]: process.env.npm_package_version ?? "0.0.0",
		[SEMRESATTRS_DEPLOYMENT_ENVIRONMENT]: environment,
	});

	// Create exporters
	const traceExporter = createBetterStackTraceExporter(
		config.betterStackApiKey,
	);
	const logExporter = createBetterStackLogExporter(config.betterStackApiKey);
	
	// Note: Metrics temporarily disabled due to version conflicts
	// Will be re-enabled once we resolve SDK version compatibility

	// Create SDK following Next.js OpenTelemetry patterns
	// Next.js automatically instruments HTTP requests, so we don't need to add that manually
	sdk = new NodeSDK({
		resource,
		instrumentations: getInstrumentations(),
		traceExporter,
		logRecordProcessor: logExporter
			? new BatchLogRecordProcessor(logExporter, {
					maxExportBatchSize: 512,
					exportTimeoutMillis: 30000,
				})
			: undefined,
		// Sampling configuration - Next.js supports sampling via sampler
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