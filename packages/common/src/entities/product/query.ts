import { type Prisma } from "@dukkani/db/prisma/generated";
import { StoreQuery } from "../store/query";
import { ImageQuery } from "../image/query";
import { OrderItemQuery } from "../order-item/query";
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
			store: StoreQuery.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
			orderItems: OrderItemQuery.getSimpleInclude(),
		} satisfies Prisma.ProductInclude;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
			images: ImageQuery.getSimpleInclude(),
		} satisfies Prisma.ProductInclude;
	}
}
