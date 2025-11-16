import type { StoreSimpleOutput, StoreIncludeOutput } from "../../schemas/store/output";
import type { StoreSimpleDbData, StoreIncludeDbData } from "./query";

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
			owner: entity.owner ? entity.owner : undefined,
			storePlan: entity.storePlan ? entity.storePlan : undefined,
			products: entity.products?.map((product) => product) ?? [],
			orders: entity.orders?.map((order) => order) ?? [],
			customers: entity.customers?.map((customer) => customer) ?? [],
			teamMembers: entity.teamMembers?.map((tm) => tm) ?? [],
			salesMetrics: entity.salesMetrics?.map((metric) => metric) ?? [],
		};
	}
}

