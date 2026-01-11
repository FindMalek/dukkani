"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ProductForm } from "@/components/dashboard/products/product-form";
import { orpc } from "@/lib/orpc";
import { RoutePaths } from "@/lib/routes";

export default function NewProductPage() {
	const t = useTranslations("products.create");
	const searchParams = useSearchParams();
	const urlStoreId = searchParams.get("storeId");

	const { data: stores, isLoading: isLoadingStores } = useQuery({
		...orpc.store.getAll.queryOptions(),
		enabled: !urlStoreId,
	});

	const storeId = urlStoreId || stores?.[0]?.id;

	if (isLoadingStores && !urlStoreId) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (!storeId) {
		return (
			<div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
				<div className="mb-4 rounded-full bg-muted p-4">
					<Icons.package className="h-8 w-8 text-muted-foreground" />
				</div>
				<h2 className="font-bold text-xl">{t("noStore.title")}</h2>
				<p className="mt-2 text-muted-foreground">{t("noStore.description")}</p>
				<Link
					href={RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url}
					className="mt-6"
				>
					<Button size="lg">{t("noStore.createStore")}</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen dark:bg-background">
			{/* Top Bar */}
			<header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
				<Link href={RoutePaths.PRODUCTS.INDEX.url}>
					<Icons.arrowLeft className="h-5 w-5" />
				</Link>
				<h1 className="font-bold text-sm">{t("header.title")}</h1>
				<Button
					onClick={() => {}}
					variant="ghost"
					className="font-bold text-primary text-sm"
				>
					{t("header.save")}
				</Button>
			</header>

			<main className="container max-w-lg px-2 pt-4">
				<ProductForm storeId={storeId} />
			</main>
		</div>
	);
}
