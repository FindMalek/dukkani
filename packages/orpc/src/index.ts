import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";
import { rateLimitProtected, rateLimitPublic } from "./middleware/rate-limit";
import { serviceErrorHandling } from "./middleware/service-error-handling";

export const o = os.$context<Context>();

export const baseProcedure = o.use(serviceErrorHandling);
export const publicProcedure = o.use(serviceErrorHandling).use(rateLimitPublic);

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	return next({
		context: {
			session: context.session,
		},
	});
});

// Protected procedure with standard rate limiting and authentication
// Rate limiting happens first, then authentication
export const protectedProcedure = o
	.use(serviceErrorHandling)
	.use(rateLimitProtected)
	.use(requireAuth);

export { createORPCClientUtils } from "./client";
export type { AppRouter, AppRouterClient } from "./routers/index";
export { appRouter } from "./routers/index";
