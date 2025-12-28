import type { StorePlanSimpleOutput } from "../../schemas/store-plan/output";
import type { StorePlanSimpleDbData } from "./query";

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
}
