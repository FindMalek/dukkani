"use client";

import { StoreStatus } from "@dukkani/common/schemas/enums";
import type { StorePublicOutput } from "@dukkani/common/schemas/store/output";
import { useTranslations } from "next-intl";

export function StoreClient({ store }: { store: StorePublicOutput }) {
	const t = useTranslations("storefront.store");

	if (store.status === StoreStatus.DRAFT) {
		return (
			<div className="container mx-auto px-4 py-16">
				<div className="mx-auto max-w-2xl text-center">
					<div className="mb-6">
						<h1 className="font-bold text-4xl">{store.name}</h1>
						{store.description && (
							<p className="mt-4 text-lg text-muted-foreground">
								{store.description}
							</p>
						)}
					</div>
					<div className="rounded-lg border bg-muted/30 p-8">
						<h2 className="mb-2 font-semibold text-2xl">
							{t("comingSoon.title")}
						</h2>
						<p className="text-muted-foreground">
							{t("comingSoon.description")}
						</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<h1 className="font-bold text-4xl">{store.name}</h1>
				{store.description && (
					<p className="mt-2 text-lg text-muted-foreground">
						{store.description}
					</p>
				)}
			</div>

			{store.owner?.name && (
				<div className="mb-6 rounded-lg border p-4">
					<h2 className="font-semibold text-xl">{t("owner.title")}</h2>
					<p className="text-muted-foreground">{store.owner.name}</p>
					{store.owner.image && (
						<img
							src={store.owner.image}
							alt={store.owner.name}
							className="mt-2 h-16 w-16 rounded-full"
						/>
					)}
				</div>
			)}

			{store.products && store.products.length > 0 ? (
				<div>
					<h2 className="mb-4 font-semibold text-2xl">{t("products.title")}</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{store.products.map((product) => (
							<div key={product.id} className="rounded-lg border p-4">
								<h3 className="font-semibold">{product.name}</h3>
								{product.description && (
									<p className="mt-2 text-muted-foreground text-sm">
										{product.description}
									</p>
								)}
								{product.price && (
									<p className="mt-2 font-bold">
										{product.price}{" "}
										{/* TODO: FIN-209 Replace hardcoded TND with dynamic currency from store settings */}
										TND
									</p>
								)}
								{product.imagesUrls &&
									product.imagesUrls.length > 0 &&
									product.imagesUrls.map((imageUrl) => (
										<img
											key={imageUrl}
											src={imageUrl}
											alt={product.name || "Product image"}
											className="h-32 w-full rounded object-cover"
										/>
									))}
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="text-center text-muted-foreground">
					{t("products.empty")}
				</div>
			)}
		</div>
	);
}
