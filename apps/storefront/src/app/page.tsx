import { ORPCError } from "@orpc/server";
import { client } from "@/lib/orpc";

interface PageProps {
	searchParams: Promise<{ storeSlug?: string }>;
}

export default async function StorePage({ searchParams }: PageProps) {
	const params = await searchParams;
	const storeSlug = params.storeSlug;

	if (!storeSlug) {
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

	try {
		// Fetch store data using public endpoint
		// Note: We'll need to add a public getBySlugPublic endpoint
		const store = await client.store.getBySlugPublic({
			input: { slug: storeSlug },
		});

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
	} catch (error) {
		if (error instanceof ORPCError && error.status === "NOT_FOUND") {
			return (
				<div className="flex min-h-screen items-center justify-center">
					<div className="text-center">
						<h1 className="font-bold text-2xl">Store not found</h1>
						<p className="mt-2 text-muted-foreground">
							The store &quot;{storeSlug}&quot; does not exist
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
}
