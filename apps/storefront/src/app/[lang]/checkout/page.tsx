import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CheckoutForm } from "@/components/app/checkout-form";
import { getQueryClient, orpc } from "@/lib/orpc";
import { getStoreSlugFromHost } from "@/lib/utils";

export default async function CheckoutPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const storeSlug = getStoreSlugFromHost(host);

	// TODO: Fix this
	// if (!storeSlug) {
	// 	redirect("/");
	// }

  const queryClient = getQueryClient();

	let store: StorePublicOutput;
	try {
		store = await queryClient.fetchQuery(
			orpc.store.getBySlugPublic.queryOptions({
				input: { slug: storeSlug ?? "omar-home" },
			}),
		);
	} catch {
		redirect("/");
	}

  if (!store) {
    redirect("/");
  }

  return <CheckoutForm store={store} />;
}
