import type { RouterClient } from "@orpc/server";
import { accountRouter } from "./account";
import { customerRouter } from "./customer";
import { dashboardRouter } from "./dashboard";
import { healthRouter } from "./health";
import { orderRouter } from "./order";
import { productRouter } from "./product";
import { storageRouter } from "./storage";
import { storeRouter } from "./store";
import { telegramRouter } from "./telegram";

export const appRouter = {
	health: healthRouter,
	store: storeRouter,
	product: productRouter,
	order: orderRouter,
	customer: customerRouter,
	dashboard: dashboardRouter,
	storage: storageRouter,
	account: accountRouter,
	telegram: telegramRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
