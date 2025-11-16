import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";
import { rateLimitPublic, rateLimitProtected } from "./middleware/rate-limit";

export const o = os.$context<Context>();

// Public procedure with strict rate limiting
export const publicProcedure = o.use(rateLimitPublic);

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
	.use(rateLimitProtected)
	.use(requireAuth);

// Re-export router types for easier importing
export type { AppRouter, AppRouterClient } from "./routers/index";
export { appRouter } from "./routers/index";

// Re-export client utilities
export { createORPCClientUtils } from "./client";
