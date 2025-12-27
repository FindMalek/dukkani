import pino from "pino";

/**
 * Logger configuration for Turborepo
 * Uses Pino for high-performance structured logging
 *
 * In development: Pretty prints logs for readability
 * In production: Outputs JSON for log aggregation
 */
const isDevelopment = process.env.NODE_ENV === "development";

const logger = pino({
	level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
	transport: isDevelopment
		? {
				target: "pino-pretty",
				options: {
					colorize: true,
					translateTime: "HH:MM:ss.l",
					ignore: "pid,hostname",
					singleLine: false,
					// Force output to stderr so Turborepo captures it
					destination: 2, // stderr
				},
			}
		: undefined,
	// Force sync logging in development so logs appear immediately
	...(isDevelopment && { sync: false }),
});

/**
 * Create a child logger with a specific context/prefix
 * Useful for scoped logging (e.g., "TELEGRAM", "API", etc.)
 */
export function createLogger(name: string) {
	return logger.child({ name });
}

// Export default logger
export { logger };

// Export pre-configured loggers for common use cases
export const telegramLogger = createLogger("TELEGRAM");
export const apiLogger = createLogger("API");
export const dbLogger = createLogger("DB");
