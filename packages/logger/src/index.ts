import pino from "pino";

/**
 * Logger configuration based on environment
 * - Development: Pretty-printed logs with timestamps
 * - Production: Structured JSON logs
 */
const isDevelopment = process.env.NODE_ENV !== "production";

export const logger = isDevelopment
	? pino({
			transport: {
				target: "pino-pretty",
				options: {
					colorize: true,
					ignore: "pid,hostname",
					translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
					levelFirst: true,
				},
			},
			level: process.env.LOG_LEVEL || "info",
		})
	: pino({
			level: process.env.LOG_LEVEL || "info",
		});

export default logger;
