import type { AppRouterClient } from "./index";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { headersToObject } from "./utils/headers";

export function createORPCClientUtils(apiUrl: string) {
	const queryClient = new QueryClient({
		queryCache: new QueryCache({
			onError: (error) => {
				toast.error(`Error: ${error.message}`, {
					action: {
						label: "retry",
						onClick: () => {
							queryClient.invalidateQueries();
						},
					},
				});
			},
		}),
	});

	const link = new RPCLink({
		url: `${apiUrl}/api`,
		fetch(url, options) {
			return fetch(url, {
				...options,
				credentials: "include",
			});
		},
		headers: async () => {
			// Client-side: return empty headers
			if (typeof window !== "undefined") {
				return {};
			}

			// Server-side: try to get Next.js headers if available
			try {
				const { headers } = await import("next/headers");
				const headersObj = await headers();
				// Convert Next.js Headers to plain object
				return headersToObject(headersObj);
			} catch {
				// Not in Next.js environment or import failed
				return {};
			}
		},
	});

	const client: AppRouterClient = createORPCClient(link);
	const orpc = createTanstackQueryUtils(client);

	return { queryClient, client, orpc };
}
