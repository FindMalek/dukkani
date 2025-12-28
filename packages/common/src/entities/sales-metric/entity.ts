import type { SalesMetricSimpleOutput } from "../../schemas/sales-metric/output";
import type { SalesMetricSimpleDbData } from "./query";

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
}
