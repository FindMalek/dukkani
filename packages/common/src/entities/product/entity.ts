import type {
	ProductSimpleOutput,
	ProductIncludeOutput,
} from "../../schemas/product/output";
import { ImageEntity } from "../image/entity";
import { OrderItemEntity } from "../order-item/entity";
import type { ProductSimpleDbData, ProductIncludeDbData } from "./query";
import { StoreEntity } from "../store/entity";

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
			...this.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			images: entity.images.map(ImageEntity.getSimpleRo),
			orderItems: entity.orderItems.map(OrderItemEntity.getSimpleRo),
		};
	}
}
