import type {
	ProductSimpleOutput,
	ProductIncludeOutput,
} from "../../schemas/product/output";
import type { ProductSimpleDbData, ProductIncludeDbData } from "./query";

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
			store: entity.store,
			images: entity.images,
			orderItems: entity.orderItems,
		};
	}
}
