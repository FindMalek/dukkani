import type {
  ListProductOutput,
  ProductIncludeOutput,
  ProductPublicOutput,
  ProductSimpleOutput,
} from "../../schemas/product/output";
import { ImageEntity } from "../image/entity";
import { OrderItemEntity } from "../order-item/entity";
import { StoreEntity } from "../store/entity";
import { VariantEntity } from "../variant/entity";
import type {
  ProductIncludeDbData,
  ProductListDbData,
  ProductPublicDbData,
  ProductSimpleDbData,
} from "./query";

type VersionListSlice = NonNullable<
  ProductListDbData["currentPublishedVersion"]
>;

function displayVersionForList(
  entity: ProductListDbData,
): VersionListSlice | null {
  return entity.draftVersion ?? entity.currentPublishedVersion;
}

type VersionDetail = NonNullable<ProductIncludeDbData["draftVersion"]>;

function editingVersion(entity: ProductIncludeDbData): VersionDetail | null {
  return entity.draftVersion ?? entity.currentPublishedVersion;
}

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
    const v = displayVersionForList(entity);
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
    const v = editingVersion(entity);
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

  static getPublicRo(entity: ProductPublicDbData): ProductPublicOutput {
    const v = entity.currentPublishedVersion;
    if (!v) {
      throw new Error("Product has no published version for public output");
    }
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
