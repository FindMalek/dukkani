import type {
	ImageIncludeOutput,
	ImageSimpleOutput,
} from "../../schemas/image/output";
import { ProductEntity } from "../product/entity";
import type { ImageIncludeDbData, ImageSimpleDbData } from "./query";

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
