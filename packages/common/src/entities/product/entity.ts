import type {
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
	ProductPublicDbData,
	ProductSimpleDbData,
} from "./query";

export class ProductEntity {
	static getSimpleRo(entity: ProductSimpleDbData): ProductSimpleOutput {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			price: Number(entity.price),
			stock: entity.stock,
			published: entity.published,
			storeId: entity.storeId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: ProductIncludeDbData): ProductIncludeOutput {
		return {
			...ProductEntity.getSimpleRo(entity),
			images: entity.images.map(ImageEntity.getSimpleRo),
			orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
		};
	}

	static getPublicRo(entity: ProductPublicDbData): ProductPublicOutput {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			price: Number(entity.price),
			stock: entity.stock,
			published: entity.published,
			imagesUrls: entity.images.map((image) => image.url),
			store: StoreEntity.getPublicSimpleRo(entity.store),
			variants: entity.variants.map(VariantEntity.getVariantRo),
			variantOptions: entity.variantOptions.map(
				VariantEntity.getVariantOptionRo,
			),
		};
	}
}
