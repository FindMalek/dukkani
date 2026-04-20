import type {
  ProductAddonGroupPublic,
  ProductAddonOptionPublic,
} from "../../schemas/product-addon/output";
import type {
  ProductAddonGroupDetailDbData,
  ProductAddonOptionDetailDbData,
} from "./query";

export class ProductAddonEntity {
  static getOptionRo(
    row: ProductAddonOptionDetailDbData,
  ): ProductAddonOptionPublic {
    return {
      id: row.id,
      name: row.name,
      sortOrder: row.sortOrder,
      priceDelta: Number(row.priceDelta),
      stock: row.stock,
    };
  }

  static getGroupRo(
    row: ProductAddonGroupDetailDbData,
  ): ProductAddonGroupPublic {
    return {
      id: row.id,
      name: row.name,
      sortOrder: row.sortOrder,
      selectionType: row.selectionType,
      required: row.required,
      options: row.options.map(ProductAddonEntity.getOptionRo),
    };
  }
}
