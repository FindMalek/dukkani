import { ORPCError } from "@orpc/server";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { StoreClient } from "@/components/app/store-client";
import { client } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function StorePage() {
	const headersList = await headers();
	const host = headersList.get("host");
	// const storeSlug = getStoreSlugFromHost(host);
	const storeSlug = "omar-home";
	console.log("storeSlug", storeSlug);

	if (!storeSlug) {
		return notFound();
	}

	try {
		const store = await client.store.getBySlugPublic({
			slug: storeSlug,
		});

		// Add validation check before rendering
		if (!store || !store.name) {
			console.error("Invalid store data:", store);
			return notFound();
		}

		return <StoreClient store={store} />;
	} catch (error) {
		if (error instanceof ORPCError && error.status === 404) {
			// TODO: Show a message to the user that the store does not exist and a button to redirect to the home page
			return notFound();
		}

		throw error;
	}
}