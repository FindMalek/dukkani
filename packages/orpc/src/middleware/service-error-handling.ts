import { os } from "@orpc/server";
import type { Context } from "../context";
import { convertServiceError } from "../utils/convert-service-error";

const o = os.$context<Context>();

/**
 * Middleware that converts service-layer errors (NotFoundError, ForbiddenError, etc.)
 * to ORPCError. Apply to base procedure so all handlers get consistent error handling.
 */
export const serviceErrorHandling = o.middleware(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		convertServiceError(error);
	}
});
