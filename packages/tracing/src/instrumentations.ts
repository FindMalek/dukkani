import type { Instrumentation } from "@opentelemetry/instrumentation";
import { FsInstrumentation } from "@opentelemetry/instrumentation-fs";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { PrismaInstrumentation } from "@prisma/instrumentation";

/**
 * Get all auto-instrumentations for OpenTelemetry
 */
export function getInstrumentations(): Instrumentation[] {
	const instrumentations: Instrumentation[] = [
		new HttpInstrumentation({
			headersToSpanAttributes: {
				client: {
					requestHeaders: [
						"user-agent",
						"content-type",
						"authorization",
						"x-forwarded-for",
					],
					responseHeaders: ["content-type", "content-length"],
				},
			},
		}),

		// File system instrumentation
		new FsInstrumentation(),

		// Prisma database instrumentation
		new PrismaInstrumentation(),

		// Pino logger instrumentation
		new PinoInstrumentation(),
	];

	return instrumentations;
}
