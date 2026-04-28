import type { BundleItemOutput } from "../../schemas/bundle-item/output";
import type { ProductVersionDetailOutput } from "../../schemas/product-version/output";
import { ImageEntity } from "../image/entity";
import { ProductAddonEntity } from "../product-addon/entity";
import { VariantEntity } from "../variant/entity";
import type {
  ProductVersionBundleItemsDbData,
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

  /**
   * Map bundle items from a version's bundleItems relation to the public output shape.
   */
  static getBundleItemsRo(
    bundleItems: ProductVersionBundleItemsDbData["bundleItems"],
  ): BundleItemOutput[] {
    return bundleItems.map((bi) => {
      const pub = bi.childProduct.currentPublishedVersion;
      const childPrice = bi.childVariantId && bi.childVariant?.price != null
        ? Number(bi.childVariant.price)
        : pub?.price != null
          ? Number(pub.price)
          : 0;

      const variantLabel = bi.childVariantId ? bi.childVariantId : null;

      return {
        id: bi.id,
        childProductId: bi.childProductId,
        childVariantId: bi.childVariantId,
        childProductName: pub?.name ?? "",
        childVariantLabel: variantLabel,
        imageUrls: pub?.images.map((img) => img.url) ?? [],
        itemQty: bi.itemQty,
        unitPrice: childPrice,
        sortOrder: bi.sortOrder,
      };
    });
  }
}
