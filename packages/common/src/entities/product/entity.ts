import type {
  ListProductOutput,
  ProductIncludeOutput,
  ProductPublicOutput,
  ProductSimpleOutput,
} from "../../schemas/product/output";
import { ImageEntity } from "../image/entity";
import { OrderItemEntity } from "../order-item/entity";
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
      };
    }

    return {
      id: entity.id,
      name: v.name,
      description: v.description,
      price: Number(v.price),
      stock: v.stock,
      published: entity.published,
      storeId: entity.storeId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      categoryId: entity.categoryId,
      hasDraft: entity.draftVersionId !== null,
      hasVariants: v.hasVariants,
      images: v.images.map(ImageEntity.getSimpleRo),
      orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
      variantOptions: v.variantOptions.map(VariantEntity.getVariantOptionRo),
      variants: v.variants.map(VariantEntity.getVariantRo),
    };
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
      imagesUrls: v.images.map((image) => image.url),
      store: StoreEntity.getPublicSimpleRo(entity.store),
      variants: v.variants.map(VariantEntity.getVariantRo),
      variantOptions: v.variantOptions.map(VariantEntity.getVariantOptionRo),
    };
  }
}
