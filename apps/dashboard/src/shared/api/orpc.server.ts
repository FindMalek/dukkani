import "server-only";

import { type DashboardRouterClient, appRouter } from "@dukkani/orpc";
import { createContext } from "@dukkani/orpc/context";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";

declare global {
  var $orpcClient: DashboardRouterClient | undefined;
}

globalThis.$orpcClient = createRouterClient(appRouter, {
  context: async () => {
    const headersObj = await headers();
    return createContext(headersObj);
  },
}) as DashboardRouterClient;
