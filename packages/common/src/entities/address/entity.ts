import type { AddressSimpleOutput } from "../../schemas/address/output";
import type { AddressSimpleDbData } from "./query";

export class AddressEntity {
	/**
	 * Formats address as a short one-line string for display (e.g. "City, Street").
	 * Returns null if address is null.
	 */
	static formatShortLocation(
		address: AddressSimpleOutput | null | undefined,
	): string | null {
		if (!address) return null;
		return address.street ? `${address.city}, ${address.street}` : address.city;
	}

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
