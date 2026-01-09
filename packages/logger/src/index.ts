import { Transform } from "node:stream";
import pino from "pino";

/**
 * Custom synchronous formatter for development
 * Formats logs nicely without using worker threads
 */
class PrettyFormatter extends Transform {
	override _transform(chunk: Buffer, _encoding: string, callback: () => void) {
		try {
			const log = JSON.parse(chunk.toString());
			const { level, time, msg, ...rest } = log;

			// Format timestamp
			const timestamp = new Date(time)
				.toISOString()
				.replace("T", " ")
				.slice(0, 19);

			// Format level with color codes (ANSI)
			const levelColors: Record<string, string> = {
				TRACE: "\x1b[90m", // gray
				DEBUG: "\x1b[36m", // cyan
				INFO: "\x1b[32m", // green
				WARN: "\x1b[33m", // yellow
				ERROR: "\x1b[31m", // red
				FATAL: "\x1b[35m", // magenta
			};
			const reset = "\x1b[0m";
			const levelColor = levelColors[level] || "";
			const formattedLevel = `${levelColor}${level}${reset}`;

			// Build the formatted log line
			let formatted = `[${timestamp}] ${formattedLevel}: ${msg || ""}`;

			// Add context if present
			const contextKeys = Object.keys(rest).filter(
				(key) => key !== "pid" && key !== "hostname",
			);
			if (contextKeys.length > 0) {
				formatted += "\n";
				for (const key of contextKeys) {
					const value = rest[key];
					const formattedValue =
						typeof value === "object"
							? JSON.stringify(value, null, 2)
									.split("\n")
									.map((line, i) => (i === 0 ? line : `    ${line}`))
									.join("\n")
							: value;
					formatted += `    ${key}: ${formattedValue}\n`;
				}
				formatted = formatted.slice(0, -1); // Remove trailing newline
			}

			this.push(`${formatted}\n`);
		} catch {
			this.push(chunk);
		}
		callback();
	}
}

/**
 * Console logger for production (matches pino API)
 */
const createConsoleLogger = () => {
	const log = (obj: unknown, msg?: string) => {
		if (msg) {
			console.log(msg, obj);
		} else {
			console.log(obj);
		}
	};

	return {
		trace: log,
		debug: log,
		info: log,
		warn: (obj: unknown, msg?: string) => {
			if (msg) {
				console.warn(msg, obj);
			} else {
				console.warn(obj);
			}
		},
		error: (obj: unknown, msg?: string) => {
			if (msg) {
				console.error(msg, obj);
			} else {
				console.error(obj);
			}
		},
		fatal: (obj: unknown, msg?: string) => {
			if (msg) {
				console.error(msg, obj);
			} else {
				console.error(obj);
			}
		},
	};
};

/**
 * Logger configuration based on environment
 * - Development: Pretty-printed logs with timestamps using pino (synchronous, no worker threads)
 * - Production: Simple console.log/error/warn
 */
const isDevelopment = process.env.NODE_ENV !== "production";

let logger: ReturnType<typeof createConsoleLogger>;

if (isDevelopment) {
	const prettyFormatter = new PrettyFormatter();
	prettyFormatter.pipe(process.stdout);

	logger = pino(
		{
			level: process.env.LOG_LEVEL || "info",
			formatters: {
				level: (label: string) => {
					return { level: label.toUpperCase() };
				},
			},
			timestamp: pino.stdTimeFunctions.isoTime,
		},
		prettyFormatter,
	);
} else {
	logger = createConsoleLogger();
}

export { logger };
export default logger;
