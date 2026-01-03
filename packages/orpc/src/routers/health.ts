import { HealthStatus } from "@dukkani/common/schemas/enums";
import {
	type HealthSimpleOutput,
	healthSimpleOutputSchema,
} from "@dukkani/common/schemas/health/output";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import { publicProcedure } from "../index";

const HEALTH_CHECK_CONFIG = {
	DEGRADED_THRESHOLD_MS: 1000,
} as const;

export const healthRouter = {
	/**
	 * Health check endpoint with database connectivity test
	 */
	check: publicProcedure.output(healthSimpleOutputSchema).handler(async () => {
		logger.info("Health check started");
		const startTime = new Date();
		let dbConnected = false;
		let dbLatency: number | undefined;
		let health: HealthSimpleOutput | null = null;

		// Test database connectivity
		try {
			const dbStartTime = Date.now();
			logger.info({ startTime }, "Creating health record");
			health = await database.health.create({
				data: {
					status: HealthStatus.UNKNOWN,
					duration: 0,
					startTime,
					endTime: startTime,
				},
			});
			logger.info({ health }, "Health record created");
			const dbEndTime = Date.now();
			dbConnected = true;
			dbLatency = dbEndTime - dbStartTime;
			logger.info({ dbLatency }, "Database connected");
		} catch (error) {
			logger.error({ error }, "Database connection failed");
			dbConnected = false;
		}

		// Determine overall health status
		logger.info(
			{ dbConnected, dbLatency },
			"Determining overall health status",
		);
		const status: HealthStatus = !dbConnected
			? HealthStatus.UNHEALTHY
			: dbLatency && dbLatency > HEALTH_CHECK_CONFIG.DEGRADED_THRESHOLD_MS
				? HealthStatus.DEGRADED
				: HealthStatus.HEALTHY;

		logger.info({ status }, "Overall health status determined");
		const endTime = new Date();

		// Update health record with final status and metrics
		logger.info({ health }, "Updating health record");
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

		logger.info({ health }, "Health check completed");

		return health;
	}),
};
