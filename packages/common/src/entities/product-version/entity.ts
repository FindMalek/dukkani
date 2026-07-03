import { computeBundleEffectiveStock } from "../../lib/bundle/compute-bundle-stock";
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
   * Map a bundle's child rows (bundle detail include) to API output: child name,
   * variant label, images, and resolved unit price (variant price falls back to
   * the child's published-version price).
   */
  static getBundleItemsRo(
    bundleItems: ProductVersionBundleItemsDbData["bundleItems"],
  ): BundleItemOutput[] {
    return bundleItems.map((item) => {
      const variant = item.childVariant;
      const version = item.childProduct.currentPublishedVersion;
      const unitPrice = Number(variant?.price ?? version?.price ?? 0);
      const childVariantLabel =
        variant && variant.selections.length > 0
          ? variant.selections
              .map((s) => `${s.option.name}: ${s.value.value}`)
              .join(", ")
          : null;

      return {
        id: item.id,
        childProductId: item.childProductId,
        childVariantId: item.childVariantId,
        childProductName: version?.name ?? "",
        childVariantLabel,
        imageUrls: version?.images.map((img) => img.url) ?? [],
        itemQty: item.itemQty,
        unitPrice,
        sortOrder: item.sortOrder,
      };
    });
  }

  /**
   * Effective stock for a bundle: min(childStock / itemQty) across tracked
   * children. Simple (non-variant) children always track stock; variant
   * children use their own `trackStock` flag.
   */
  static getBundleEffectiveStock(
    bundleItems: ProductVersionBundleItemsDbData["bundleItems"],
  ): number {
    return computeBundleEffectiveStock(
      bundleItems.map((item) => {
        const variant = item.childVariant;
        if (variant) {
          return {
            stock: variant.stock,
            trackStock: variant.trackStock,
            itemQty: item.itemQty,
          };
        }
        const version = item.childProduct.currentPublishedVersion;
        return {
          stock: version?.stock ?? 0,
          trackStock: true,
          itemQty: item.itemQty,
        };
      }),
    );
  }
}
