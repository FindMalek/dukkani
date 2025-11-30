import type {
	ImageSimpleOutput,
	ImageIncludeOutput,
} from "../../schemas/image/output";
import type { ImageSimpleDbData, ImageIncludeDbData } from "./query";
import { ProductEntity } from "../product/entity";

export class ImageEntity {
	static getSimpleRo(entity: ImageSimpleDbData): ImageSimpleOutput {
		return {
			id: entity.id,
			url: entity.url,
			productId: entity.productId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: ImageIncludeDbData): ImageIncludeOutput {
		return {
			...ImageEntity.getSimpleRo(entity),
			product: ProductEntity.getSimpleRo(entity.product),
		};
	}
}
