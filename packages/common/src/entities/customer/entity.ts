import type {
	CustomerSimpleOutput,
	CustomerIncludeOutput,
} from "../../schemas/customer/output";
import type { CustomerSimpleDbData, CustomerIncludeDbData } from "./query";
import { StoreEntity } from "../store/entity";
import { OrderEntity } from "../order/entity";

export class CustomerEntity {
	static getSimpleRo(entity: CustomerSimpleDbData): CustomerSimpleOutput {
		return {
			id: entity.id,
			name: entity.name,
			phone: entity.phone,
			storeId: entity.storeId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: CustomerIncludeDbData): CustomerIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			store: StoreEntity.getSimpleRo(entity.store),
			orders: entity.orders.map(OrderEntity.getSimpleRo),
		};
	}
}
