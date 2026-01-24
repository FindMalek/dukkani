import type {
	CollectionIncludeOutput,
	CollectionOutput,
} from "../../schemas/collection";
import { ProductEntity } from "../product/entity";
import type { CollectionIncludeDbData, CollectionSimpleDbData } from "./query";

export class CollectionEntity {
	static getSimpleRo(entity: CollectionSimpleDbData): CollectionOutput {
		return {
			id: entity.id,
			name: entity.name,
			slug: entity.slug,
			description: entity.description,
			image: entity.image,
			position: entity.position,
			storeId: entity.storeId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: CollectionIncludeDbData): CollectionIncludeOutput {
		return {
			...CollectionEntity.getSimpleRo(entity),
			products: entity.productCollections.map((pc) => ({
				...ProductEntity.getSimpleRo(pc.product),
				position: pc.position,
			})),
		};
	}
}
