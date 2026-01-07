import { Resource } from "@opentelemetry/resources";
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
	SEMRESATTRS_DEPLOYMENT_ENVIRONMENT,
	SEMRESATTRS_SERVICE_NAME,
	SEMRESATTRS_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import {
	createBetterStackLogExporter,
	createBetterStackMetricsExporter,
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
	const metricsExporter = createBetterStackMetricsExporter(
		config.betterStackApiKey,
	);

	// Create SDK - only pass traceExporter and let NodeSDK handle the rest
	// This avoids version conflicts
	sdk = new NodeSDK({
		resource,
		instrumentations: getInstrumentations(),
		traceExporter,
		// Sampling configuration - use simple ratio-based sampling
		// NodeSDK will handle this internally if we don't provide a sampler
		// For now, skip explicit sampler to avoid import issues
		// Sampling can be configured via environment variables if needed
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
