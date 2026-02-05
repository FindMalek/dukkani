import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/app/checkout-form";
import { getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function CheckoutPage() {
	const headersList = await headers();
	const host = headersList.get("host");
	const storeSlug = getStoreSlugFromHost(host);

	if (!storeSlug) {
		redirect("/");
	}

	const queryClient = getQueryClient();

	// Get store
	const store = await queryClient.fetchQuery(
		orpc.store.getBySlugPublic.queryOptions({
			input: { slug: storeSlug },
		}),
	);

	if (!store) {
		redirect("/");
	}

	// Note: Cart items will be fetched on client side since cart store is client-only
	// We pass store data to the client component

	return <CheckoutForm store={store} />;
}
