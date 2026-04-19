import type { ProductFormInput } from "../../schemas/product/form";
import type {
  ListProductOutput,
  ProductIncludeOutput,
  ProductPublicOutput,
  ProductSimpleOutput,
} from "../../schemas/product/output";
import type { ProductVariantFormRowInput } from "../../schemas/variant/form";
import { reconcileVariants } from "../../utils/variant-matrix";
import { OrderItemEntity } from "../order-item/entity";
import { ProductAddonEntity } from "../product-addon/entity";
import { ProductVersionEntity } from "../product-version/entity";
import { StoreEntity } from "../store/entity";
import { VariantEntity } from "../variant/entity";
import type {
  ProductIncludeDbData,
  ProductListDbData,
  ProductPublicDbDataWithPublished,
  ProductSimpleDbData,
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

  static getListRo(entity: ProductListDbData): ListProductOutput {
    const v = ProductVersionEntity.pickForList(
      entity.draftVersion,
      entity.currentPublishedVersion,
    );
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
      imageUrls: v?.images.map((img) => img.url) ?? [],
      variantCount: v?._count.variants ?? 0,
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

  static getPublicRo(
    entity: ProductPublicDbDataWithPublished,
  ): ProductPublicOutput {
    const v = entity.currentPublishedVersion;
    return {
      id: entity.id,
      name: v.name,
      description: v.description,
      price: Number(v.price),
      stock: v.stock,
      published: entity.published,
      imageUrls: v.images.map((image) => image.url),
      store: StoreEntity.getPublicSimpleRo(entity.store),
      variants: v.variants.map(VariantEntity.getVariantRo),
      variantOptions: v.variantOptions.map(VariantEntity.getVariantOptionRo),
      addonGroups: v.addonGroups.map(ProductAddonEntity.getGroupRo),
    };
  }
}
