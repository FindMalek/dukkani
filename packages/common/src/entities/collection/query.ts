import type { Prisma } from "@dukkani/db/prisma/generated";

export type CollectionSimpleDbData = Prisma.CollectionGetPayload<{
	include: ReturnType<typeof CollectionQuery.getSimpleInclude>;
}>;

export type CollectionIncludeDbData = Prisma.CollectionGetPayload<{
	include: ReturnType<typeof CollectionQuery.getInclude>;
}>;

export class CollectionQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.CollectionInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			productCollections: {
				include: {
					product: {
						include: {
							images: true,
							category: true,
						},
					},
				},
				orderBy: {
					position: "asc",
				},
			},
		} satisfies Prisma.CollectionInclude;
	}

	static getWhere(storeId: string, filters?: { search?: string }) {
		return {
			storeId,
			...(filters?.search && {
				name: { contains: filters.search, mode: "insensitive" },
			}),
		} satisfies Prisma.CollectionWhereInput;
	}

	static getOrder(
		direction: "asc" | "desc",
		field: "position" | "name" | "createdAt" = "position",
	) {
		return {
			[field]: direction,
		} satisfies Prisma.CollectionOrderByWithRelationInput;
	}
}
