import { logger } from "@dukkani/logger";
import { ORPCError } from "@orpc/server";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/app/checkout-form";
import { getStoreSlug } from "@/lib/get-store-slug";
import { getQueryClient, orpc } from "@/lib/orpc";

export default async function CheckoutPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const cookieStore = await cookies();
  const storeSlug = getStoreSlug(host, cookieStore);

  if (!storeSlug) {
    return notFound();
  }

  const queryClient = getQueryClient();

  try {
    const store = await queryClient.fetchQuery(
      orpc.store.getBySlugPublic.queryOptions({
        input: { slug: storeSlug },
      }),
    );

    if (!store || !store.name) {
      logger.error({ store }, "Invalid store data");
      return notFound();
    }

    return <CheckoutForm store={store} />;
  } catch (error) {
    if (error instanceof ORPCError && error.status === 404) {
      return notFound();
    }

    throw error;
  }
}
