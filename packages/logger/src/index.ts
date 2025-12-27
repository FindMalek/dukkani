import pino from "pino";

/**
 * Logger configuration for Turborepo
 * Uses Pino for high-performance structured logging
 *
 * Explicitly writes to stderr so Turborepo captures logs
 */
const isDevelopment = process.env.NODE_ENV === "development";

const logger = pino(
	{
		level: process.env.LOG_LEVEL || (isDevelopment ? "debug" : "info"),
	},
	process.stderr, // Explicitly write to stderr
);

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
