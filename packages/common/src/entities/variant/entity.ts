import type {
	VariantOptionOutput,
	VariantOptionValueOutput,
	VariantOutput,
	VariantSelectionOutput,
	VariantSimpleOutput,
} from "../../schemas/variant/output";

import type {
	VariantDbData,
	VariantOptionDbData,
	VariantSelectionDbData,
	VariantSimpleDbData,
	VariantValueDbData,
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

	static getVariantValues(
		entity: VariantValueDbData,
	): VariantOptionValueOutput {
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

	static getVariantSelectionRo(
		selection: VariantSelectionDbData,
	): VariantSelectionOutput {
		return {
			id: selection.id,
			variantId: selection.variantId,
			optionId: selection.optionId,
			valueId: selection.valueId,
			option: VariantEntity.getVariantOptionRo(selection.option),
			value: VariantEntity.getVariantValues(selection.value),
		};
	}

	static getVariantRo(entity: VariantDbData): VariantOutput {
		return {
			id: entity.id,
			sku: entity.sku,
			price: entity.price ? Number(entity.price) : null,
			stock: entity.stock,
			productId: entity.productId,
			selections: entity.selections.map(VariantEntity.getVariantSelectionRo),
		};
	}
}
