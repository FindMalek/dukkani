import { type Prisma } from "@dukkani/db/prisma/generated";


export type ProductSimpleDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getSimpleInclude>;
}>;

export type ProductIncludeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getInclude>;
}>;

export type ProductClientSafeDbData = Prisma.ProductGetPayload<{
	include: ReturnType<typeof ProductQuery.getClientSafeInclude>;
}>;


export class ProductQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.ProductInclude;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			store: true,
			images: true,
			orderItems: true,
		} satisfies Prisma.ProductInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			images: true,
		} satisfies Prisma.ProductInclude;
	}
}
