import { Transform } from "node:stream";

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
 * Check if we're in a Node.js environment (not Edge Runtime)
 */
function isNodeEnvironment(): boolean {
	return (
		typeof process !== "undefined" &&
		typeof process.stdout !== "undefined" &&
		typeof window === "undefined"
	);
}

/**
 * Initialize logger lazily - only when actually used
 * This prevents Edge Runtime errors
 */
let loggerInstance: ReturnType<typeof createConsoleLogger> | null = null;

function getLogger(): ReturnType<typeof createConsoleLogger> {
	if (loggerInstance) {
		return loggerInstance;
	}

	// In Edge Runtime or browser, use console logger
	if (!isNodeEnvironment()) {
		loggerInstance = createConsoleLogger();
		return loggerInstance;
	}

	// In Node.js environment, check if development
	// Use NEXT_PUBLIC_NODE_ENV from env, fallback to process.env.NODE_ENV
	const nodeEnv = process.env.NEXT_PUBLIC_NODE_ENV || process.env.NODE_ENV;
	const isDevelopment = nodeEnv !== "production";

	if (isDevelopment) {
		try {
			// Dynamic import pino only in development and Node.js
			const pino = require("pino");
			const prettyFormatter = new PrettyFormatter();
			prettyFormatter.pipe(process.stdout);

			loggerInstance = pino(
				{
					level: "info",
					formatters: {
						level: (label: string) => {
							return { level: label.toUpperCase() };
						},
					},
					timestamp: pino.stdTimeFunctions.isoTime,
				},
				prettyFormatter,
			) as ReturnType<typeof createConsoleLogger>;
		} catch {
			// Fallback to console logger if pino fails
			loggerInstance = createConsoleLogger();
		}
	} else {
		loggerInstance = createConsoleLogger();
	}

	return loggerInstance;
}

// Export logger as a getter that initializes lazily
export const logger = new Proxy({} as ReturnType<typeof createConsoleLogger>, {
	get(_target, prop) {
		const loggerInstance = getLogger();
		return loggerInstance[prop as keyof ReturnType<typeof createConsoleLogger>];
	},
});

export default logger;
