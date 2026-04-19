import type {
  ProductAddonGroupPublic,
  ProductAddonOptionPublic,
} from "../../schemas/product-addon/output";
import type { ProductVersionDetailDbData } from "../product-version/query";

type AddonGroupRow = ProductVersionDetailDbData["addonGroups"][number];
type AddonOptionRow = AddonGroupRow["options"][number];

export class ProductAddonEntity {
  static getOptionRo(row: AddonOptionRow): ProductAddonOptionPublic {
    return {
      id: row.id,
      name: row.name,
      sortOrder: row.sortOrder,
      priceDelta: Number(row.priceDelta),
      stock: row.stock,
    };
  }

  static getGroupRo(row: AddonGroupRow): ProductAddonGroupPublic {
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
