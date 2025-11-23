import { HealthStatus } from "@dukkani/common/schemas/enums";
import {
	type HealthSimpleOutput,
	healthSimpleOutputSchema,
} from "@dukkani/common/schemas/health/output";
import { database } from "@dukkani/db";
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
		} catch {
			dbConnected = false;
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
};
