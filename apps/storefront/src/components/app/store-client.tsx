"use client";

import type { StoreIncludeOutput } from "@dukkani/common/schemas/store/output";

export function StoreClient({ store }: { store: StoreIncludeOutput }) {
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
