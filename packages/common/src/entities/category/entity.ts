import type { CategoryOutput } from "../../schemas/category/output";
import type { CategorySimpleDbData } from "./query";

export class CategoryEntity {
	static getSimpleRo(entity: CategorySimpleDbData): CategoryOutput {
		return {
			id: entity.id,
			name: entity.name,
			storeId: entity.storeId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
