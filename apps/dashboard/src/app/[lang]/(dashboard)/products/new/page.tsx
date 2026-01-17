"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Spinner } from "@dukkani/ui/components/spinner";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
	ProductForm,
	type ProductFormHandle,
} from "@/components/dashboard/products/product-form";
import { RoutePaths } from "@/lib/routes";
import { useActiveStoreStore } from "@/stores/active-store.store";

export default function NewProductPage() {
	const t = useTranslations("products.create");
	const formRef = useRef<ProductFormHandle>(null);
	const { selectedStoreId, isLoading } = useActiveStoreStore();

	const handleSave = () => {
		formRef.current?.submit(false);
	};

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8 text-primary" />
			</div>
		);
	}

	if (!selectedStoreId) {
		return (
			<div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
				<div className="mb-4 rounded-full bg-muted p-4">
					<Icons.package className="h-8 w-8 text-muted-foreground" />
				</div>
				<h2 className="font-bold text-xl">{t("noStore.title")}</h2>
				<p className="mt-2 text-muted-foreground">{t("noStore.description")}</p>
				<Button asChild size="lg" className="mt-6">
					<Link href={RoutePaths.AUTH.ONBOARDING.STORE_SETUP.url}>
						{t("noStore.createStore")}
					</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen dark:bg-background">
			<header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b bg-background px-4">
				<Link href={RoutePaths.PRODUCTS.INDEX.url} className="z-10">
					<Icons.arrowLeft className="h-5 w-5" />
				</Link>

				<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-bold text-sm">
					{t("header.title")}
				</h1>

				<Button
					onClick={handleSave}
					variant="ghost"
					className="z-10 p-0 font-bold text-primary text-sm hover:bg-transparent"
				>
					{t("header.save")}
				</Button>
			</header>

			<main className="container max-w-lg px-2 pt-4">
				<ProductForm ref={formRef} storeId={selectedStoreId} />
			</main>
		</div>
	);
}
