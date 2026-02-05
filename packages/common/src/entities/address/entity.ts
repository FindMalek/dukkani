import type { AddressSimpleOutput } from "../../schemas/address/output";
import type { AddressSimpleDbData } from "./query";

export class AddressEntity {
	static getSimpleRo(entity: AddressSimpleDbData): AddressSimpleOutput {
		return {
			id: entity.id,
			street: entity.street,
			city: entity.city,
			postalCode: entity.postalCode,
			latitude: entity.latitude,
			longitude: entity.longitude,
			isDefault: entity.isDefault,
			customerId: entity.customerId,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}
}
