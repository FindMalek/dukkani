import { effectiveVariantUnitPrice } from "../../lib/pricing/variant-effective-price";
import type { FormVariantRow } from "../../lib/variant/matrix";
import type { ProductVariantFormRowInput } from "../../schemas/variant/form";
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
      price: entity.price != null ? Number(entity.price) : null,
      stock: entity.stock,
      trackStock: entity.trackStock,
      imageUrl: entity.image?.url ?? null,
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
      productId: entity.productVersion.productId,
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

  static getVariantRo(
    entity: VariantDbData,
    versionBasePrice?: number,
  ): VariantOutput {
    const price = entity.price != null ? Number(entity.price) : null;
    const effectivePrice =
      versionBasePrice !== undefined
        ? effectiveVariantUnitPrice(entity.price, versionBasePrice)
        : undefined;

    return {
      id: entity.id,
      sku: entity.sku,
      price,
      effectivePrice,
      stock: entity.stock,
      trackStock: entity.trackStock,
      imageUrl: entity.image?.url ?? null,
      productId: entity.productVersion.productId,
      selections: entity.selections.map(VariantEntity.getVariantSelectionRo),
    };
  }

  static convertFormVariantRowToInput(
    row: FormVariantRow,
  ): ProductVariantFormRowInput {
    return {
      selections: row.selections,
      sku: row.sku,
      price:
        row.price !== undefined && row.price !== null
          ? String(row.price)
          : undefined,
      stock: String(row.stock),
      imageRef: row.imageRef,
    };
  }

  static convertVariantOutputToFormRow(
    variant: VariantOutput,
  ): ProductVariantFormRowInput {
    const selections: Record<string, string> = {};
    for (const s of variant.selections) {
      selections[s.option.name] = s.value.value;
    }
    return {
      selections,
      sku: variant.sku ?? undefined,
      price:
        variant.price !== undefined && variant.price !== null
          ? String(variant.price)
          : undefined,
      stock: String(variant.stock),
      imageRef: variant.imageUrl ?? undefined,
    };
  }
}
