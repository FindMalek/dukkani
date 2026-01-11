// apps/dashboard/src/app/[lang]/(dashboard)/products/new/page.tsx
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
		<div className="flex min-h-screen flex-col bg-background pb-24 md:pb-0">
			{/* Mobile Header: Sticky and Minimal */}
			<header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-md md:static md:h-auto md:border-none md:bg-transparent md:px-6 md:py-8">
				<div className="container mx-auto flex max-w-7xl items-center gap-4">
					<Link href={RoutePaths.PRODUCTS.INDEX.url}>
						<Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
							<Icons.arrowLeft className="h-5 w-5" />
						</Button>
					</Link>
					<div className="flex flex-col">
						<h1 className="font-bold text-lg leading-none tracking-tight md:text-3xl">
							{t("title")}
						</h1>
						<p className="hidden text-muted-foreground text-sm md:mt-1 md:block">
							{t("subtitle")}
						</p>
					</div>
				</div>
			</header>

			<main className="container mx-auto max-w-7xl flex-1 px-0 md:px-6">
				<ProductForm storeId={storeId} />
			</main>
		</div>
	);
}
