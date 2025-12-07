import "server-only";

import { type AppRouterClient, appRouter } from "@dukkani/orpc";
import { createContext } from "@dukkani/orpc/context";
import { createRouterClient } from "@orpc/server";
import { headers } from "next/headers";

declare global {
	var $orpcClient: AppRouterClient | undefined;
}

globalThis.$orpcClient = createRouterClient(appRouter, {
	context: async () => {
		const headersObj = await headers();
		return createContext(headersObj);
	},
});
