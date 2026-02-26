"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@dukkani/ui/components/alert-dialog";
import { Button } from "@dukkani/ui/components/button";
import { Card, CardContent } from "@dukkani/ui/components/card";
import { Icons } from "@dukkani/ui/components/icons";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { ProductListCard } from "@/components/app/products/product-list-card";
import { ProductsEmptyState } from "@/components/app/products/products-empty-state";
import { ProductsListSkeleton } from "@/components/app/products/products-list-skeleton";
import { ProductsPageHeader } from "@/components/app/products/products-page-header";
import { ProductsSearchBar } from "@/components/app/products/products-search-bar";
import { ProductsStatusTabs } from "@/components/app/products/products-status-tabs";
import { useProductsController } from "@/hooks/controllers/use-products-controller";
import { RoutePaths } from "@/lib/routes";

export default function ProductsPage() {
	const t = useTranslations("products.list");
	const [productToDelete, setProductToDelete] = useState<string | null>(null);

	const {
		productsQuery: { data, isLoading, error },
		search,
		published,
		setSearch,
		setPublished,
		deleteProductMutation,
		togglePublishMutation,
	} = useProductsController();

	const handleDeleteRequest = useCallback((id: string) => {
		setProductToDelete(id);
	}, []);

	const handleDeleteConfirm = useCallback(() => {
		if (productToDelete) {
			deleteProductMutation.mutate(productToDelete);
			setProductToDelete(null);
		}
	}, [productToDelete, deleteProductMutation]);

	const handleTogglePublish = useCallback(
		(id: string, published: boolean) => {
			togglePublishMutation.mutate({ id, published });
		},
		[togglePublishMutation],
	);

	if (error) {
		return (
			<div className="container mx-auto max-w-7xl p-4 md:p-6">
				<ProductsPageHeader />
				<Card>
					<CardContent className="pt-6">
						<p className="text-destructive text-sm">{t("error")}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-7xl p-4 pb-24 md:p-6 md:pb-8">
			<ProductsPageHeader />

			{/* Search & Filters */}
			<div className="mb-6 space-y-4">
				<ProductsSearchBar value={search} onChange={setSearch} />
				<ProductsStatusTabs value={published} onChange={setPublished} />
			</div>

			{/* Product List */}
			{isLoading ? (
				<ProductsListSkeleton />
			) : data && data.products.length > 0 ? (
				<div className="space-y-3">
					{data.products.map((product) => (
						<ProductListCard
							key={product.id}
							product={product}
							onDelete={handleDeleteRequest}
							onTogglePublish={handleTogglePublish}
						/>
					))}
				</div>
			) : (
				<ProductsEmptyState />
			)}

			{/* FAB - Add Product */}
			<Button
				asChild
				size="icon-lg"
				className="fixed bottom-24 end-4 z-50 size-14 rounded-full shadow-lg md:bottom-8 md:end-6"
				aria-label={t("addProduct")}
			>
				<Link href={RoutePaths.PRODUCTS.NEW.url}>
					<Icons.plus className="size-6" />
				</Link>
			</Button>

			{/* Delete Confirmation Dialog */}
			<AlertDialog
				open={!!productToDelete}
				onOpenChange={(open) => !open && setProductToDelete(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{t("actions.deleteConfirmTitle")}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{t("actions.deleteConfirmDescription")}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>{t("actions.cancel")}</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteConfirm}
							className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						>
							{t("actions.delete")}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
