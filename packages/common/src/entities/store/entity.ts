import type {
	StoreSimpleOutput,
	StoreIncludeOutput,
} from "../../schemas/store/output";
import type { StoreSimpleDbData, StoreIncludeDbData } from "./query";
import { UserEntity } from "../user/entity";
import { StorePlanEntity } from "../store-plan/entity";
import { ProductEntity } from "../product/entity";
import { OrderEntity } from "../order/entity";
import { CustomerEntity } from "../customer/entity";
import { TeamMemberEntity } from "../team-member/entity";
import { SalesMetricEntity } from "../sales-metric/entity";

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
			...this.getSimpleRo(entity),
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
