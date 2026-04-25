import { accountRouter } from "./account";
import { categoryRouter } from "./category";
import { collectionRouter } from "./collection";
import { customerRouter } from "./customer";
import { dashboardStatsRouter } from "./dashboard";
import { healthRouter } from "./health";
import { onboardingRouter } from "./onboarding";
import { orderRouter } from "./order";
import { productRouter } from "./product";
import { storageRouter } from "./storage";
import { storeRouter } from "./store";
import { telegramRouter } from "./telegram";

export const dashboardRouter = {
  health: healthRouter,
  store: storeRouter,
  product: productRouter,
  order: orderRouter,
  customer: customerRouter,
  dashboard: dashboardStatsRouter,
  storage: storageRouter,
  account: accountRouter,
  telegram: telegramRouter,
  onboarding: onboardingRouter,
  category: categoryRouter,
  collection: collectionRouter,
};
