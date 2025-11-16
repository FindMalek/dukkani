import { createORPCClientUtils } from "@dukkani/orpc/client";
import { env } from "@dukkani/env";

export const { queryClient, client, orpc } = createORPCClientUtils(
	env.NEXT_PUBLIC_CORS_ORIGIN,
);
