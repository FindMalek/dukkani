import { StoreStatus } from "@dukkani/common/schemas/enums";
import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/app/coming-soon";
import { StorefrontLayout } from "@/components/app/storefront-layout";
import { getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function StorePage() {
	const headersList = await headers();
	const host = headersList.get("host");
	const storeSlug = getStoreSlugFromHost(host);

	if (!storeSlug) {
		return notFound();
	}

	const queryClient = getQueryClient();

	try {
		// Prefetch using queryOptions for proper hydration
		await queryClient.prefetchQuery(
			orpc.store.getBySlugPublic.queryOptions({
				input: { slug: storeSlug },
			}),
		);

		// Get the data from the query cache
		const store = queryClient.getQueryData(
			orpc.store.getBySlugPublic.queryKey({ input: { slug: storeSlug } }),
		);

		if (!store || !store.name) {
			logger.error({ store }, "Invalid store data");
			return notFound();
		}

		if (store.status === StoreStatus.DRAFT) {
			return <ComingSoon store={store} />;
		}

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<StorefrontLayout store={store} />
			</HydrationBoundary>
		);
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return notFound();
		}

		throw error;
	}
}
