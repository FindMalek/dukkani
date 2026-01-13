import type { Instrumentation } from "@opentelemetry/instrumentation";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PinoInstrumentation } from "@opentelemetry/instrumentation-pino";
import { ORPCInstrumentation } from "@orpc/otel";
import { PrismaInstrumentation } from "@prisma/instrumentation";

/**
 * Get all auto-instrumentations for OpenTelemetry
 */
export function getInstrumentations(): Instrumentation[] {
	const instrumentations: Instrumentation[] = [
		new HttpInstrumentation({
			headersToSpanAttributes: {
				client: {
					requestHeaders: ["user-agent", "content-type", "x-forwarded-for"],
					responseHeaders: ["content-type", "content-length"],
				},
			},
			requestHook: (span, request) => {
				let hasAuth = false;

				if ("headers" in request && request.headers) {
					const authLower = request.headers.authorization;
					const authUpper = request.headers.Authorization;
					hasAuth = Boolean(authLower || authUpper);
				} else if (
					"getHeader" in request &&
					typeof request.getHeader === "function"
				) {
					const authLower = request.getHeader("authorization");
					const authUpper = request.getHeader("Authorization");
					const authValue = authLower || authUpper;
					hasAuth = Boolean(
						authValue &&
							(typeof authValue === "string" || Array.isArray(authValue)),
					);
				}

				if (hasAuth) {
					span.setAttribute("http.request.has_auth", true);
				}
			},
		}),
		new PrismaInstrumentation(),
		new PinoInstrumentation(),
		new ORPCInstrumentation(),
	];

	return instrumentations;
}
