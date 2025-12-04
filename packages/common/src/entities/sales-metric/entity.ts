import type {
	SalesMetricSimpleOutput,
	SalesMetricIncludeOutput,
} from "../../schemas/sales-metric/output";
import type {
	SalesMetricSimpleDbData,
	SalesMetricIncludeDbData,
} from "./query";
import { StoreEntity } from "../store/entity";

export class SalesMetricEntity {
	static getSimpleRo(entity: SalesMetricSimpleDbData): SalesMetricSimpleOutput {
		return {
			id: entity.id,
			storeId: entity.storeId,
			date: entity.date,
			orderCount: entity.orderCount,
			totalSales: Number(entity.totalSales),
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: SalesMetricIncludeDbData): SalesMetricIncludeOutput {
		return {
			...SalesMetricEntity.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
		};
	}
}
