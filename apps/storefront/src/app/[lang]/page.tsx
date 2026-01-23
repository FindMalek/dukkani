import { StoreStatus } from "@dukkani/common/schemas/enums";
import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/app/coming-soon";
import { StorefrontLayout } from "@/components/app/storefront-layout";
import { client } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function StorePage() {
	const headersList = await headers();
	const host = headersList.get("host");
	const storeSlug = getStoreSlugFromHost(host);

	if (!storeSlug) {
		return notFound();
	}

	try {
		const store = await client.store.getBySlugPublic({
			slug: storeSlug,
		});

		if (!store || !store.name) {
			logger.error({ store }, "Invalid store data");
			return notFound();
		}

		if (store.status === StoreStatus.DRAFT) {
			return <ComingSoon store={store} />;
		}

		return <StorefrontLayout store={store} />;
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return notFound();
		}

		throw error;
	}
}
