import type { RouterClient } from "@orpc/server";
import { dashboardRouter } from "./dashboard";
import { storefrontRouter } from "./storefront";
import { webRouter } from "./web";

export const appRouter = {
  // dashboard-only
  customer: dashboardRouter.customer,
  storage: dashboardRouter.storage,
  telegram: dashboardRouter.telegram,
  onboarding: dashboardRouter.onboarding,
  // storefront-only
  cart: storefrontRouter.cart,
  // shared (dashboard + storefront merged — no key collisions)
  health: { ...dashboardRouter.health, ...storefrontRouter.health },
  store: { ...dashboardRouter.store, ...storefrontRouter.store },
  product: { ...dashboardRouter.product, ...storefrontRouter.product },
  order: { ...dashboardRouter.order, ...storefrontRouter.order },
  account: { ...dashboardRouter.account, ...storefrontRouter.account },
  category: { ...dashboardRouter.category, ...storefrontRouter.category },
  collection: { ...dashboardRouter.collection, ...storefrontRouter.collection },
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
