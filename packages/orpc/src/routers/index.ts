import type { RouterClient } from "@orpc/server";
import { dashboardRouter } from "./dashboard";
import { storefrontRouter } from "./storefront";
import { webRouter } from "./web";

/**
 * Single API router: dashboard and storefront are separate namespaces so
 * procedure names never overwrite each other (no spread-merge collisions).
 */
export const appRouter = {
  dashboard: dashboardRouter,
  storefront: storefrontRouter,
  web: webRouter,
};

export { dashboardRouter, storefrontRouter, webRouter };

export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;

export type DashboardRouter = typeof dashboardRouter;
export type DashboardRouterClient = RouterClient<typeof dashboardRouter>;

export type StorefrontRouter = typeof storefrontRouter;
export type StorefrontRouterClient = RouterClient<typeof storefrontRouter>;

export type WebRouter = typeof webRouter;
export type WebRouterClient = RouterClient<typeof webRouter>;
