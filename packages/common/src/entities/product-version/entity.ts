import type { ProductVersionDetailOutput } from "../../schemas/product-version/output";
import { ImageEntity } from "../image/entity";
import { ProductAddonEntity } from "../product-addon/entity";
import { VariantEntity } from "../variant/entity";
import type {
  ProductVersionDetailDbData,
  ProductVersionListSliceDbData,
} from "./query";

export class ProductVersionEntity {
  /**
   * Dashboard list: prefer draft slice when present, else published.
   */
  static pickForList(
    draft: ProductVersionListSliceDbData | null,
    published: ProductVersionListSliceDbData | null,
  ): ProductVersionListSliceDbData | null {
    return draft ?? published;
  }

  /**
   * Dashboard editor: prefer full draft include when present, else published.
   */
  static pickForEditor(
    draft: ProductVersionDetailDbData | null,
    published: ProductVersionDetailDbData | null,
  ): ProductVersionDetailDbData | null {
    return draft ?? published;
  }

  /**
   * Map a version row (detail include) to API output: copy, pricing, media, variant tree.
   */
  static getRo(entity: ProductVersionDetailDbData): ProductVersionDetailOutput {
    return {
      name: entity.name,
      description: entity.description,
      price: Number(entity.price),
      stock: entity.stock,
      hasVariants: entity.hasVariants,
      images: entity.images.map(ImageEntity.getSimpleRo),
      variantOptions: entity.variantOptions.map(
        VariantEntity.getVariantOptionRo,
      ),
      variants: entity.variants.map((row) =>
        VariantEntity.getVariantRo(row, Number(entity.price)),
      ),
      addonGroups: entity.addonGroups.map(ProductAddonEntity.getGroupRo),
    };
  }
}
