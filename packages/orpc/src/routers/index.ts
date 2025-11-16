import type { RouterClient } from "@orpc/server";
import { protectedProcedure, publicProcedure } from "../index";
import { customerRouter } from "./customer";
import { dashboardRouter } from "./dashboard";
import { orderRouter } from "./order";
import { productRouter } from "./product";
import { storeRouter } from "./store";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	store: storeRouter,
	product: productRouter,
	order: orderRouter,
	customer: customerRouter,
	dashboard: dashboardRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
