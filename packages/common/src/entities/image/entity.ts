import type { ImageSimpleOutput } from "../../schemas/image/output";
import type { ImageSimpleDbData } from "./query";

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
}
