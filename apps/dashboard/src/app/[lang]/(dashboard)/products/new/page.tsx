"use client";

import { Button } from "@dukkani/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@dukkani/ui/components/card";
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
			<div className="flex min-h-[400px] items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	if (!storeId) {
		return (
			<div className="container mx-auto p-6 text-center">
				<h2 className="text-xl font-bold">{t("noStore.title")}</h2>
				<p className="text-muted-foreground">{t("noStore.description")}</p>
				<Link
					href={RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url}
					className="mt-4 inline-block"
				>
					<Button>{t("noStore.createStore")}</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-5xl p-4 md:p-6 lg:p-8">
			<div className="mb-8 flex items-center gap-4">
				<Link href={RoutePaths.PRODUCTS.INDEX.url}>
					<Button variant="ghost" size="icon" className="h-9 w-9">
						<Icons.arrowLeft className="h-5 w-5" />
					</Button>
				</Link>
				<div>
					<h1 className="font-bold text-2xl tracking-tight md:text-3xl">
						{t("title")}
					</h1>
					<p className="text-muted-foreground text-sm md:text-base">
						{t("subtitle")}
					</p>
				</div>
			</div>

			<Card className="border-none shadow-none md:border md:shadow-sm">
				<CardHeader className="px-0 md:px-6">
					<CardTitle className="text-lg md:text-xl">
						{t("form.details")}
					</CardTitle>
					<CardDescription>{t("form.detailsDescription")}</CardDescription>
				</CardHeader>
				<CardContent className="px-0 md:px-6">
					<ProductForm storeId={storeId} />
				</CardContent>
			</Card>
		</div>
	);
}
