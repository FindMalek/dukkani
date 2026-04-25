import "server-only";

import { type DashboardRouterClient, dashboardRouter } from "@dukkani/orpc";
import { createContext } from "@dukkani/orpc/context";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";

declare global {
  var $orpcClient: DashboardRouterClient | undefined;
}

globalThis.$orpcClient = createRouterClient(dashboardRouter, {
  context: async () => {
    const headersObj = await headers();
    return createContext(headersObj);
  },
}) as DashboardRouterClient;
