import type { Prisma } from "@dukkani/db/prisma/generated";

export type VariantOptionDbData = Prisma.ProductVariantOptionGetPayload<{
	include: ReturnType<typeof VariantQuery.getVariantOptionInclude>;
}>;

export type VariantDbData = Prisma.ProductVariantGetPayload<{
	include: ReturnType<typeof VariantQuery.getVariantInclude>;
}>;

export type VariantSimpleDbData = Prisma.ProductVariantGetPayload<{
	include: ReturnType<typeof VariantQuery.getSimpleInclude>;
}>;

export type VariantValueDbData = Prisma.ProductVariantOptionValueGetPayload<{
	select: ReturnType<typeof VariantQuery.getVariantValueSelect>;
}>;

export type VariantSelectionDbData = Prisma.ProductVariantSelectionGetPayload<{
	include: ReturnType<typeof VariantQuery.getVariantSelectionInclude>;
}>;

export class VariantQuery {
	static getSimpleInclude() {
		return {} satisfies Prisma.ProductVariantInclude;
	}

	static getVariantValueSelect() {
		return {
			id: true,
			value: true,
			optionId: true,
		} satisfies Prisma.ProductVariantOptionValueSelect;
	}

	static getVariantOptionInclude() {
		return {
			values: true,
		} satisfies Prisma.ProductVariantOptionInclude;
	}

	static getVariantSelectionInclude() {
		return {
			option: {
				include: VariantQuery.getVariantOptionInclude(),
			},
			value: {
				select: VariantQuery.getVariantValueSelect(),
			},
		} satisfies Prisma.ProductVariantSelectionInclude;
	}

	static getVariantInclude() {
		return {
			selections: {
				include: VariantQuery.getVariantSelectionInclude(),
			},
		} satisfies Prisma.ProductVariantInclude;
	}
}
