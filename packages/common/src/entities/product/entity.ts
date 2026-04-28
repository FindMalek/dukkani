import { buildProductPriceDisplay } from "../../lib/pricing/product-price-display";
import { buildVariantDescription } from "../../lib/variant/build-description";
import { listDisplayStock } from "../../lib/variant/list-display-stock";
import { reconcileVariants } from "../../lib/variant/matrix";
import type { CartItemOutput } from "../../schemas/cart/output";
import type {
  BundleIncludeOutput,
  ListBundleOutput,
} from "../../schemas/bundle/output";
import type { ProductFormInput } from "../../schemas/product/form";
import type { ProductLineItem } from "../../schemas/product/input";
import type {
  ListProductOutput,
  ProductIncludeOutput,
  ProductPublicOutput,
  ProductSimpleOutput,
} from "../../schemas/product/output";
import type { ProductVariantFormRowInput } from "../../schemas/variant/form";
import { OrderItemEntity } from "../order-item/entity";
import { ProductAddonEntity } from "../product-addon/entity";
import { ProductVersionEntity } from "../product-version/entity";
import { StoreEntity } from "../store/entity";
import { VariantEntity } from "../variant/entity";
import type {
  ProductBundleIncludeDbData,
  ProductIncludeDbData,
  ProductListDbData,
  ProductPublicDbDataWithPublished,
  ProductSimpleDbData,
  ProductStorefrontListDbData,
} from "./query";

export class ProductEntity {
  static getSimpleRo(entity: ProductSimpleDbData): ProductSimpleOutput {
    const v = entity.currentPublishedVersion;
    return {
      id: entity.id,
      name: v?.name ?? "",
      description: v?.description ?? null,
      price: v ? Number(v.price) : 0,
      stock: v?.stock ?? 0,
      published: entity.published,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Storefront listing: **published** catalog only (see {@link ProductVersionQuery.getStorefrontListInclude}).
   */
  static getStorefrontListRo(
    entity: ProductStorefrontListDbData,
  ): ListProductOutput {
    const v = entity.currentPublishedVersion;
    const versionPrice = v ? Number(v.price) : 0;

    return {
      id: entity.id,
      name: v?.name ?? "",
      description: v?.description ?? null,
      price: versionPrice,
      stock: listDisplayStock(v),
      published: entity.published,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      imageUrls: v?.images.map((img) => img.url) ?? [],
      variantCount: v?._count.variants ?? 0,
      hasRequiredAddonGroups: (v?.addonGroups?.length ?? 0) > 0,
      priceDisplay: buildProductPriceDisplay({
        hasVariants: v?.hasVariants ?? false,
        versionPrice,
        variantEffectivePriceMin:
          v?.variantEffectivePriceMin != null
            ? Number(v.variantEffectivePriceMin)
            : null,
        variantEffectivePriceMax:
          v?.variantEffectivePriceMax != null
            ? Number(v.variantEffectivePriceMax)
            : null,
        variantsFallback: v?.variants,
      }),
    };
  }

  static getListRo(entity: ProductListDbData): ListProductOutput {
    const v = ProductVersionEntity.pickForList(
      entity.draftVersion,
      entity.currentPublishedVersion,
    );
    const versionPrice = v ? Number(v.price) : 0;

    return {
      id: entity.id,
      name: v?.name ?? "",
      description: v?.description ?? null,
      price: versionPrice,
      stock: listDisplayStock(v),
      published: entity.published,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      imageUrls: v?.images.map((img) => img.url) ?? [],
      variantCount: v?._count.variants ?? 0,
      hasRequiredAddonGroups: (v?.addonGroups?.length ?? 0) > 0,
      priceDisplay: buildProductPriceDisplay({
        hasVariants: v?.hasVariants ?? false,
        versionPrice,
        variantEffectivePriceMin:
          v?.variantEffectivePriceMin != null
            ? Number(v.variantEffectivePriceMin)
            : null,
        variantEffectivePriceMax:
          v?.variantEffectivePriceMax != null
            ? Number(v.variantEffectivePriceMax)
            : null,
        variantsFallback: v?.variants,
      }),
    };
  }

  static getRo(entity: ProductIncludeDbData): ProductIncludeOutput {
    const v = ProductVersionEntity.pickForEditor(
      entity.draftVersion,
      entity.currentPublishedVersion,
    );
    if (!v) {
      return {
        id: entity.id,
        name: "",
        description: null,
        price: 0,
        stock: 0,
        published: entity.published,
        storeId: entity.storeId,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        categoryId: entity.categoryId,
        hasDraft: entity.draftVersionId !== null,
        hasVariants: false,
        images: [],
        orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
        variantOptions: [],
        variants: [],
        addonGroups: [],
      };
    }

    const version = ProductVersionEntity.getRo(v);

    return {
      id: entity.id,
      name: version.name,
      description: version.description,
      price: version.price,
      stock: version.stock,
      published: entity.published,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      categoryId: entity.categoryId,
      hasDraft: entity.draftVersionId !== null,
      hasVariants: version.hasVariants,
      images: version.images,
      orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
      variantOptions: version.variantOptions,
      variants: version.variants,
      addonGroups: version.addonGroups,
    };
  }

  /**
   * Dashboard editor: default form values from API include payload
   * (`ProductIncludeOutput` from oRPC).
   */
  static convertIncludeOutputToFormInput(
    product: ProductIncludeOutput,
  ): ProductFormInput {
    return {
      name: product.name,
      description: product.description ?? "",
      price: String(product.price),
      stock: String(product.stock),
      published: product.published,
      categoryId: product.categoryId ?? "",
      hasVariants: product.hasVariants,
      variantOptions: (product.variantOptions ?? []).map((o) => ({
        name: o.name,
        values: o.values.map((v) => ({ value: v.value })),
      })),
      variants: ProductEntity.convertIncludeOutputVariantsToForm(product),
      addonGroups: [],
      images:
        product.images?.map((i) => ({
          kind: "remote" as const,
          url: i.url,
        })) ?? [],
    };
  }

  private static convertIncludeOutputVariantsToForm(
    product: ProductIncludeOutput,
  ): ProductVariantFormRowInput[] {
    const opts = (product.variantOptions ?? []).map((o) => ({
      name: o.name,
      values: o.values.map((v) => ({ value: v.value })),
    }));

    const fromApi = (product.variants ?? []).map((v) =>
      VariantEntity.convertVariantOutputToFormRow(v),
    );

    if (product.hasVariants && fromApi.length === 0 && opts.length > 0) {
      return reconcileVariants([], opts, {
        stock: product.stock,
      }).map(VariantEntity.convertFormVariantRowToInput);
    }

    return fromApi;
  }

  static getCartItemRo(
    entity: ProductPublicDbDataWithPublished,
    item: ProductLineItem,
    unitPrice: number,
  ): CartItemOutput {
    const productData = ProductEntity.getPublicRo(entity);
    const variant = item.variantId
      ? productData.variants?.find((v) => v.id === item.variantId)
      : null;

    return {
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      productName: productData.name,
      productImage: variant?.imageUrl ?? productData.imageUrls?.[0],
      productDescription: buildVariantDescription(variant),
      price: unitPrice,
      stock: variant?.stock ?? productData.stock,
    };
  }

  /**
   * Dashboard bundle detail: maps a bundle product with full bundle items tree.
   */
  static getBundleRo(entity: ProductBundleIncludeDbData): BundleIncludeOutput {
    const v = entity.draftVersion ?? entity.currentPublishedVersion;
    const versionPrice = v ? Number(v.price) : 0;

    return {
      id: entity.id,
      name: v?.name ?? "",
      description: v?.description ?? null,
      price: versionPrice,
      effectiveStock: v?.totalVariantStock ?? 0,
      published: entity.published,
      storeId: entity.storeId,
      categoryId: entity.categoryId,
      hasDraft: entity.draftVersionId !== null,
      images: v?.images.map(({ id, url, productVersionId, createdAt, updatedAt }) => ({
        id, url, productVersionId, createdAt, updatedAt,
      })),
      bundleItems: v?.bundleItems
        ? ProductVersionEntity.getBundleItemsRo(v.bundleItems)
        : [],
      orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
      priceDisplay: buildProductPriceDisplay({
        hasVariants: false,
        versionPrice,
        variantEffectivePriceMin: null,
        variantEffectivePriceMax: null,
      }),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Dashboard bundle list card.
   */
  static getBundleListRo(entity: ProductBundleIncludeDbData): ListBundleOutput {
    const v = entity.draftVersion ?? entity.currentPublishedVersion;
    const versionPrice = v ? Number(v.price) : 0;

    return {
      id: entity.id,
      name: v?.name ?? "",
      description: v?.description ?? null,
      price: versionPrice,
      effectiveStock: v?.totalVariantStock ?? 0,
      published: entity.published,
      storeId: entity.storeId,
      imageUrls: v?.images.map((img) => img.url) ?? [],
      bundleItemCount: v?.bundleItems?.length ?? 0,
      priceDisplay: buildProductPriceDisplay({
        hasVariants: false,
        versionPrice,
        variantEffectivePriceMin: null,
        variantEffectivePriceMax: null,
      }),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static getPublicRo(
    entity: ProductPublicDbDataWithPublished,
  ): ProductPublicOutput {
    const v = entity.currentPublishedVersion;
    const versionPrice = Number(v.price);

    return {
      id: entity.id,
      name: v.name,
      description: v.description,
      price: versionPrice,
      stock: v.stock,
      published: entity.published,
      imageUrls: v.images.map((image) => image.url),
      store: StoreEntity.getPublicSimpleRo(entity.store),
      variants: v.variants.map((row) =>
        VariantEntity.getVariantRo(row, versionPrice),
      ),
      variantOptions: v.variantOptions.map(VariantEntity.getVariantOptionRo),
      addonGroups: v.addonGroups.map(ProductAddonEntity.getGroupRo),
      priceDisplay: buildProductPriceDisplay({
        hasVariants: v.hasVariants,
        versionPrice,
        variantEffectivePriceMin:
          v.variantEffectivePriceMin != null
            ? Number(v.variantEffectivePriceMin)
            : null,
        variantEffectivePriceMax:
          v.variantEffectivePriceMax != null
            ? Number(v.variantEffectivePriceMax)
            : null,
        variantsFallback: v.variants,
      }),
    };
  }
}
