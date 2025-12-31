"use client";

import { Spinner } from "@dukkani/ui/components/spinner";
import { ORPCError } from "@orpc/server";
import { useStoreBySlug } from "@/hooks/api/use-store-by-slug";

interface StoreClientProps {
	slug: string;
}

export function StoreClient({ slug }: StoreClientProps) {
	const { data: store, isLoading, error } = useStoreBySlug(slug);

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Spinner className="h-8 w-8" />
			</div>
		);
	}

	if (!slug) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h1 className="font-bold text-2xl">No store specified</h1>
					<p className="mt-2 text-muted-foreground">
						Please provide a store slug in the URL
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		if (error instanceof ORPCError && error.status === 404) {
			return (
				<div className="flex min-h-screen items-center justify-center">
					<div className="text-center">
						<h1 className="font-bold text-2xl">Store not found</h1>
						<p className="mt-2 text-muted-foreground">
							The store &quot;{slug}&quot; does not exist
						</p>
					</div>
				</div>
			);
		}

		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<h1 className="font-bold text-2xl">Error loading store</h1>
					<p className="mt-2 text-muted-foreground">Please try again later</p>
				</div>
			</div>
		);
	}

	if (!store) {
		return null;
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

			{store.owner && (
				<div className="mb-6 rounded-lg border p-4">
					<h2 className="font-semibold text-xl">Store Owner</h2>
					<p className="text-muted-foreground">
						{store.owner.name || store.owner.email}
					</p>
				</div>
			)}

			{store.products && store.products.length > 0 ? (
				<div>
					<h2 className="mb-4 font-semibold text-2xl">Products</h2>
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
									<p className="mt-2 font-bold">{product.price} TND</p>
								)}
							</div>
						))}
					</div>
				</div>
			) : (
				<div className="text-center text-muted-foreground">
					No products available yet
				</div>
			)}
		</div>
	);
}
