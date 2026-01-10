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

				// Span processor configuration
				useSimpleSpanProcessor: z.boolean(),
				simpleProcessorEnv: z.string().nullable(),
				flushTestResult: z.enum([
					"success",
					"failed",
					"not_supported",
					"not_tested",
				]),

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

			// Check span processor configuration
			const simpleProcessorEnv = process.env.OTEL_USE_SIMPLE_PROCESSOR ?? null;
			const useSimpleSpanProcessor =
				simpleProcessorEnv === "true" || !!process.env.VERCEL;

			diagnostics.push(
				`SimpleSpanProcessor configured: ${useSimpleSpanProcessor}`,
			);
			diagnostics.push(
				`OTEL_USE_SIMPLE_PROCESSOR env: ${simpleProcessorEnv ?? "not set"}`,
			);
			diagnostics.push(`Vercel detected: ${!!process.env.VERCEL}`);

			// Check if tracer provider is registered
			let tracerProviderRegistered = false;
			let tracerAvailable = false;
			try {
				const tracer = trace.getTracer("dukkani");
				tracerAvailable = tracer !== undefined;

				const provider = trace.getTracerProvider();

				if (provider) {
					const testTracer = trace.getTracer("health-check");
					const testSpan = testTracer.startSpan("test-detection");
					const spanContext = testSpan.spanContext();
					const traceId = spanContext.traceId;
					testSpan.end();

					tracerProviderRegistered =
						traceId !== "00000000000000000000000000000000" &&
						traceId.length === 32;

					if (!tracerProviderRegistered) {
						diagnostics.push(
							`Provider detected but trace ID is invalid: ${traceId}`,
						);
					}
				}
			} catch (error) {
				diagnostics.push(
					`Tracer check failed: ${error instanceof Error ? error.message : String(error)}`,
				);
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

					const activeSpan = trace.getActiveSpan();
					if (activeSpan) {
						const spanContext = activeSpan.spanContext();
						testSpanTraceId = spanContext.traceId;
						testSpanSpanId = spanContext.spanId;

						addSpanAttributes({
							"debug.test": true,
							"debug.timestamp": Date.now(),
							"debug.environment": process.env.NODE_ENV || "unknown",
							"debug.vercel": process.env.VERCEL ? "true" : "false",
							"debug.endpoint": endpoint || "not_configured",
							"debug.headers_configured": headersConfigured,
							"debug.use_simple_processor": useSimpleSpanProcessor,
						});

						diagnostics.push(
							`Span created successfully: traceId=${testSpanTraceId}, spanId=${testSpanSpanId}`,
						);
					} else {
						diagnostics.push("Span created but getActiveSpan() returned null");
					}
				});
			} catch (error) {
				spanError = error instanceof Error ? error.message : String(error);
				diagnostics.push(`Span creation failed: ${spanError}`);
			}

			// Test flush functionality
			let flushTestResult:
				| "success"
				| "failed"
				| "not_supported"
				| "not_tested" = "not_tested";
			try {
				const { flushTelemetry } = await import("@dukkani/tracing");
				const tracerProvider = trace.getTracerProvider();
				const providerWithFlush = tracerProvider as unknown as {
					forceFlush?: () => Promise<void>;
				};

				if (
					providerWithFlush &&
					typeof providerWithFlush.forceFlush === "function"
				) {
					await flushTelemetry();
					flushTestResult = "success";
					diagnostics.push("✅ Flush test: SUCCESS - spans should be exported");
				} else {
					flushTestResult = "not_supported";
					diagnostics.push(
						"⚠️ Flush test: NOT SUPPORTED - tracer provider doesn't have forceFlush",
					);
				}
			} catch (error) {
				flushTestResult = "failed";
				diagnostics.push(
					`❌ Flush test: FAILED - ${error instanceof Error ? error.message : String(error)}`,
				);
			}

			// Determine SDK initialization status
			const sdkInitialized =
				testSpanCreated &&
				testSpanTraceId !== null &&
				testSpanTraceId !== "00000000000000000000000000000000" &&
				(testSpanTraceId as string).length === 32;

			// Build message
			let message = "";
			if (!sdkInitialized) {
				if (!tracerProviderRegistered && !testSpanCreated) {
					message =
						"SDK not initialized - tracer provider not registered and spans cannot be created";
					diagnostics.push(
						"CRITICAL: Tracer provider not registered - instrumentation.ts may not be executing",
					);
				} else if (!testSpanCreated) {
					message = "SDK initialized but span creation failed";
				} else if (
					!testSpanTraceId ||
					testSpanTraceId === "00000000000000000000000000000000"
				) {
					message =
						"SDK initialized but spans have invalid trace IDs (NoOp provider?)";
					diagnostics.push(
						"WARNING: Spans created but trace IDs are invalid - check SDK initialization",
					);
				} else {
					message = "SDK initialized but trace context not propagating";
				}
			} else {
				message = "OpenTelemetry is active and tracing";
				diagnostics.push(
					"✅ Tracing is working correctly - spans have valid trace IDs",
				);

				// Add export strategy info
				if (useSimpleSpanProcessor) {
					diagnostics.push(
						"✅ Using SimpleSpanProcessor - spans export immediately when ended",
					);
				} else {
					diagnostics.push(
						"⚠️ Using BatchSpanProcessor - spans are batched and may not export before function terminates",
					);
					diagnostics.push(
						"💡 Recommendation: Enable SimpleSpanProcessor in Vercel by setting useSimpleSpanProcessor: true",
					);
				}
			}

			if (spanError) {
				message += ` (Error: ${spanError})`;
			}

			// Additional diagnostics
			if (!endpoint) {
				diagnostics.push("WARNING: OTEL_EXPORTER_OTLP_ENDPOINT not configured");
			}
			if (!headersConfigured) {
				diagnostics.push(
					"WARNING: OTEL_EXPORTER_OTLP_HEADERS missing Authorization",
				);
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
				useSimpleSpanProcessor,
				simpleProcessorEnv,
				flushTestResult,
				environment: process.env.NODE_ENV || "unknown",
				vercel: !!process.env.VERCEL,
				otelEnabled,
				message,
				diagnostics,
			};
		}),
};
