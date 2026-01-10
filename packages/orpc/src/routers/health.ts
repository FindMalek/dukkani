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
	 * OpenTelemetry debug endpoint
	 * Returns current trace/span context and tests span creation
	 * Use this to verify tracing is working in production
	 */
	otelDebug: publicProcedure
		.output(
			z.object({
				traceId: z.string().nullable(),
				spanId: z.string().nullable(),
				testSpanCreated: z.boolean(),
				sdkInitialized: z.boolean(),
				message: z.string(),
				environment: z.string(),
			}),
		)
		.handler(async () => {
			// Get current trace context
			const traceId = getTraceId();
			const spanId = getSpanId();

			// Check if SDK is initialized (traceId/spanId exist = SDK is working)
			const sdkInitialized = traceId !== undefined;

			// Test span creation
			let testSpanCreated = false;
			let spanError: string | null = null;
			try {
				await withSpan("health.otelDebug.test", async (span) => {
					addSpanAttributes({
						"debug.test": true,
						"debug.timestamp": Date.now(),
						"debug.environment": process.env.NODE_ENV || "unknown",
						"debug.vercel": process.env.VERCEL ? "true" : "false",
					});
					testSpanCreated = true;
				});
			} catch (error) {
				spanError = error instanceof Error ? error.message : String(error);
				logger.error(
					enhanceLogWithTraceContext({
						error: spanError,
					}),
					"Failed to create test span",
				);
			}

			const message = traceId
				? "OpenTelemetry is active and tracing"
				: "No active trace context found - SDK may not be initialized";

			return {
				traceId: traceId ?? null,
				spanId: spanId ?? null,
				testSpanCreated,
				sdkInitialized,
				message: spanError ? `${message} (Error: ${spanError})` : message,
				environment: process.env.NODE_ENV || "unknown",
			};
		}),
};
