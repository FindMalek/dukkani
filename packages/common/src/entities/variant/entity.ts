import type {
	VariantOptionOutput,
	VariantOptionValueOutput,
	VariantOutput,
	VariantSimpleOutput,
} from "../../schemas/variant/output";

import type {
	VariantDbData,
	VariantOptionDbData,
	VariantSimpleDbData,
    VariantValueDbData
} from "./query";

export class VariantEntity {
	static getSimpleRo(entity: VariantSimpleDbData): VariantSimpleOutput {
		return {
			id: entity.id,
			sku: entity.sku,
			price: entity.price ? Number(entity.price) : null,
			stock: entity.stock,
		};
	}

    static getVariantValues(entity: VariantValueDbData): VariantOptionValueOutput {
        return {
            id: entity.id,
            value: entity.value,
            optionId: entity.optionId,
        };
    }

	static getVariantOptionRo(entity: VariantOptionDbData): VariantOptionOutput {
		return {
			id: entity.id,
			name: entity.name,
			productId: entity.productId,
			values: entity.values.map(VariantEntity.getVariantValues),
		};
	}

	static getVariantRo(entity: VariantDbData): VariantOutput {
		return {
			id: entity.id,
			sku: entity.sku,
			price: entity.price ? Number(entity.price) : null,
			stock: entity.stock,
			productId: entity.productId,
			selections: entity.selections.map((selection) => ({
				id: selection.id,
				variantId: selection.variantId,
				optionId: selection.optionId,
				valueId: selection.valueId,
				option: {
					id: selection.option.id,
					name: selection.option.name,
					productId: selection.option.productId,
					values: selection.option.values.map((value) => ({
						id: value.id,
						value: value.value,
						optionId: value.optionId,
					})),
				},
				value: {
					id: selection.value.id,
					value: selection.value.value,
					optionId: selection.value.optionId,
				},
			})),
		};
	}
}
