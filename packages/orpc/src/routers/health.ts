import { HealthStatus } from "@dukkani/common/schemas/enums";
import {
	type HealthSimpleOutput,
	healthSimpleOutputSchema,
} from "@dukkani/common/schemas/health/output";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import {
	addSpanAttributes,
	enhanceLogWithTraceContext,
	getSpanId,
	getTraceId,
	withSpan,
} from "@dukkani/tracing";
import { trace } from "@opentelemetry/api";
import { z } from "zod";
import { publicProcedure } from "../index";

const HEALTH_CHECK_CONFIG = {
	DEGRADED_THRESHOLD_MS: 1000,
} as const;

export const healthRouter = {
	/**
	 * Health check endpoint with database connectivity test
	 */
	check: publicProcedure.output(healthSimpleOutputSchema).handler(async () => {
		const startTime = new Date();
		let dbConnected = false;
		let dbLatency: number | undefined;
		let health: HealthSimpleOutput | null = null;

		// Test database connectivity
		try {
			const dbStartTime = Date.now();
			health = await database.health.create({
				data: {
					status: HealthStatus.UNKNOWN,
					duration: 0,
					startTime,
					endTime: startTime,
				},
			});
			const dbEndTime = Date.now();
			dbConnected = true;
			dbLatency = dbEndTime - dbStartTime;
		} catch (error) {
			dbConnected = false;
			logger.error(
				enhanceLogWithTraceContext({
					error: error instanceof Error ? error.message : String(error),
				}),
				"Database connection failed",
			);
		}

		// Determine overall health status
		const status: HealthStatus = !dbConnected
			? HealthStatus.UNHEALTHY
			: dbLatency && dbLatency > HEALTH_CHECK_CONFIG.DEGRADED_THRESHOLD_MS
				? HealthStatus.DEGRADED
				: HealthStatus.HEALTHY;

		const endTime = new Date();

		// Update health record with final status and metrics
		if (health) {
			health = await database.health.update({
				where: { id: health.id },
				data: {
					status,
					duration: dbLatency ?? 0,
					endTime,
				},
			});
		} else {
			// If creation failed, create a new record with unhealthy status
			health = await database.health.create({
				data: {
					status,
					duration: 0,
					startTime,
					endTime,
				},
			});
		}

		return health;
	}),

	/**
	 * OpenTelemetry debug endpoint - Enhanced version
	 * Returns comprehensive SDK status and trace context information
	 */
	otelDebug: publicProcedure
		.output(
			z.object({
				// Trace context
				traceId: z.string().nullable(),
				spanId: z.string().nullable(),
				
				// SDK status
				sdkInitialized: z.boolean(),
				tracerProviderRegistered: z.boolean(),
				tracerAvailable: z.boolean(),
				
				// Span creation test
				testSpanCreated: z.boolean(),
				testSpanTraceId: z.string().nullable(),
				testSpanSpanId: z.string().nullable(),
				
				// Exporter configuration
				exporterConfigured: z.boolean(),
				endpoint: z.string().nullable(),
				headersConfigured: z.boolean(),
				
				// Environment
				environment: z.string(),
				vercel: z.boolean(),
				otelEnabled: z.string().nullable(),
				
				// Diagnostics
				message: z.string(),
				diagnostics: z.array(z.string()),
			}),
		)
		.handler(async () => {
			const diagnostics: string[] = [];
			
			// Check environment variables
			const otelEnabled = process.env.OTEL_ENABLED ?? null;
			const endpoint = 
				process.env.OTEL_EXPORTER_OTLP_ENDPOINT ||
				process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
				null;
			const headers = process.env.OTEL_EXPORTER_OTLP_HEADERS || "";
			const headersConfigured = headers.includes("Authorization");
			
			// Check if tracer provider is registered
			let tracerProviderRegistered = false;
			let tracerAvailable = false;
			try {
				const tracer = trace.getTracer("dukkani");
				tracerAvailable = tracer !== undefined;
				
				// Try to get tracer provider (this will fail if SDK not initialized)
				const provider = trace.getTracerProvider();
				tracerProviderRegistered = provider !== undefined && 
					typeof (provider as { forceFlush?: unknown }).forceFlush === "function";
			} catch (error) {
				diagnostics.push(`Tracer check failed: ${error instanceof Error ? error.message : String(error)}`);
			}
			
			// Get current trace context (before creating test span)
			const initialTraceId = getTraceId();
			const initialSpanId = getSpanId();
			
			// Test span creation and capture trace/span IDs INSIDE the span
			let testSpanCreated = false;
			let testSpanTraceId: string | null = null;
			let testSpanSpanId: string | null = null;
			let spanError: string | null = null;
			
			try {
				await withSpan("health.otelDebug.test", async (span) => {
					testSpanCreated = true;
					
					// Capture trace/span IDs while span is active
					const activeSpan = trace.getActiveSpan();
					if (activeSpan) {
						const spanContext = activeSpan.spanContext();
						testSpanTraceId = spanContext.traceId;
						testSpanSpanId = spanContext.spanId;
						
						// Add diagnostic attributes
						addSpanAttributes({
							"debug.test": true,
							"debug.timestamp": Date.now(),
							"debug.environment": process.env.NODE_ENV || "unknown",
							"debug.vercel": process.env.VERCEL ? "true" : "false",
							"debug.endpoint": endpoint || "not_configured",
							"debug.headers_configured": headersConfigured,
						});
						
						diagnostics.push(`Span created successfully: traceId=${testSpanTraceId}, spanId=${testSpanSpanId}`);
					} else {
						diagnostics.push("Span created but getActiveSpan() returned null");
					}
				});
			} catch (error) {
				spanError = error instanceof Error ? error.message : String(error);
				diagnostics.push(`Span creation failed: ${spanError}`);
			}
			
			// Determine SDK initialization status
			// SDK is initialized if tracer provider is registered AND spans can be created
			const sdkInitialized = tracerProviderRegistered && testSpanCreated;
			
			// Build message
			let message = "";
			if (!sdkInitialized) {
				if (!tracerProviderRegistered) {
					message = "SDK not initialized - tracer provider not registered";
					diagnostics.push("CRITICAL: Tracer provider not registered - instrumentation.ts may not be executing");
				} else if (!testSpanCreated) {
					message = "SDK initialized but span creation failed";
				} else {
					message = "SDK initialized but trace context not propagating";
				}
			} else if (!testSpanTraceId) {
				message = "SDK initialized but spans have no trace ID (sampling issue?)";
				diagnostics.push("WARNING: Spans created but no trace ID - check sampling configuration");
			} else {
				message = "OpenTelemetry is active and tracing";
			}
			
			if (spanError) {
				message += ` (Error: ${spanError})`;
			}
			
			// Additional diagnostics
			if (!endpoint) {
				diagnostics.push("WARNING: OTEL_EXPORTER_OTLP_ENDPOINT not configured");
			}
			if (!headersConfigured) {
				diagnostics.push("WARNING: OTEL_EXPORTER_OTLP_HEADERS missing Authorization");
			}
			if (otelEnabled === "false") {
				diagnostics.push("WARNING: OTEL_ENABLED=false - tracing is disabled");
			}
			
			return {
				traceId: initialTraceId ?? null,
				spanId: initialSpanId ?? null,
				sdkInitialized,
				tracerProviderRegistered,
				tracerAvailable,
				testSpanCreated,
				testSpanTraceId,
				testSpanSpanId,
				exporterConfigured: !!endpoint && headersConfigured,
				endpoint,
				headersConfigured,
				environment: process.env.NODE_ENV || "unknown",
				vercel: !!process.env.VERCEL,
				otelEnabled,
				message,
				diagnostics,
			};
		}),
};
