import { ORPCError } from "@orpc/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { StoreClient } from "@/components/app/store-client";
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

		return <StoreClient store={store} />;
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return notFound();
		}

		// Handle other errors
		throw error;
	}
}
