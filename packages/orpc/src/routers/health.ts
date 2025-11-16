import prisma from "@dukkani/db";
import { publicProcedure } from "../index";
import { z } from "zod";

export const healthRouter = {
	/**
	 * Health check endpoint with database connectivity test
	 */
	check: publicProcedure
		.output(
			z.object({
				status: z.enum(["healthy", "degraded", "unhealthy"]),
				timestamp: z.string(),
				database: z.object({
					connected: z.boolean(),
					latency: z.number().optional(),
				}),
				version: z.string().optional(),
			}),
		)
		.handler(async () => {
			const timestamp = new Date().toISOString();
			let dbConnected = false;
			let dbLatency: number | undefined;

			// Test database connectivity
			try {
				const startTime = Date.now();
				await prisma.$queryRaw`SELECT 1`;
				const endTime = Date.now();
				dbConnected = true;
				dbLatency = endTime - startTime;
			} catch (error) {
				dbConnected = false;
			}

			// Determine overall health status
			let status: "healthy" | "degraded" | "unhealthy";
			if (dbConnected) {
				status = "healthy";
			} else {
				status = "unhealthy";
			}

			return {
				status,
				timestamp,
				database: {
					connected: dbConnected,
					latency: dbLatency,
				},
				version: process.env.npm_package_version,
			};
		}),
};
