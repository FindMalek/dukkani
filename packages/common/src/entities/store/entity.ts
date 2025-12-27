import type {
	StoreIncludeOutput,
	StoreSimpleOutput,
} from "../../schemas/store/output";
import { CustomerEntity } from "../customer/entity";
import { OrderEntity } from "../order/entity";
import { ProductEntity } from "../product/entity";
import { SalesMetricEntity } from "../sales-metric/entity";
import { StorePlanEntity } from "../store-plan/entity";
import { TeamMemberEntity } from "../team-member/entity";
import { UserEntity } from "../user/entity";
import type { StoreIncludeDbData, StoreSimpleDbData } from "./query";

export class StoreEntity {
	static getSimpleRo(entity: StoreSimpleDbData): StoreSimpleOutput {
		return {
			id: entity.id,
			slug: entity.slug,
			name: entity.name,
			description: entity.description,
			whatsappNumber: entity.whatsappNumber,
			category: entity.category,
			theme: entity.theme,
			ownerId: entity.ownerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: StoreIncludeDbData): StoreIncludeOutput {
		return {
			...StoreEntity.getSimpleRo(entity),
			owner: UserEntity.getSimpleRo(entity.owner),
			storePlan: entity.storePlan
				? StorePlanEntity.getSimpleRo(entity.storePlan)
				: undefined,
			products: entity.products.map(ProductEntity.getSimpleRo),
			orders: entity.orders.map(OrderEntity.getSimpleRo),
			customers: entity.customers.map(CustomerEntity.getSimpleRo),
			teamMembers: entity.teamMembers.map(TeamMemberEntity.getSimpleRo),
			salesMetrics: entity.salesMetrics.map(SalesMetricEntity.getSimpleRo),
		};
	}
}
