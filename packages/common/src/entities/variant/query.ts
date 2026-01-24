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

	static getVariantInclude() {
		return {
			selections: {
				include: {
					option: {
						include: {
							values: true,
						},
					},
					value: true,
				},
			},
		} satisfies Prisma.ProductVariantInclude;
	}
}
