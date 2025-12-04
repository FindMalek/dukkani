import type {
	StorePlanSimpleOutput,
	StorePlanIncludeOutput,
} from "../../schemas/store-plan/output";
import type { StorePlanSimpleDbData, StorePlanIncludeDbData } from "./query";
import { StoreEntity } from "../store/entity";
export class StorePlanEntity {
	static getSimpleRo(entity: StorePlanSimpleDbData): StorePlanSimpleOutput {
		return {
			id: entity.id,
			planType: entity.planType,
			orderLimit: entity.orderLimit,
			orderCount: entity.orderCount,
			resetAt: entity.resetAt,
			storeId: entity.storeId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: StorePlanIncludeDbData): StorePlanIncludeOutput {
		return {
			...StorePlanEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
		};
	}
}
