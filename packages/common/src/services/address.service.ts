import { database } from "@dukkani/db";
import type { PrismaClient } from "@prisma/client/extension";
import { AddressEntity } from "../entities/address/entity";
import { AddressQuery } from "../entities/address/query";
import type { CreateAddressInput } from "../schemas/address/input";
import type { AddressSimpleOutput } from "../schemas/address/output";

export class AddressService {
	/**
	 * Create or find address for customer
	 * If address exists (same street + city + postalCode), return existing
	 * Otherwise create new address
	 * Accepts optional tx for transactional use (e.g. order creation)
	 */
	static async createOrFindAddress(
		input: CreateAddressInput,
		tx?: PrismaClient,
	): Promise<AddressSimpleOutput> {
		const client = tx ?? database;

		// Check if address already exists for this customer
		const existing = await client.address.findFirst({
			where: {
				customerId: input.customerId,
				street: input.street,
				city: input.city,
				postalCode: input.postalCode || null,
			},
			select: AddressQuery.getSimpleSelect(),
		});

		if (existing) {
			return AddressEntity.getSimpleRo(existing);
		}

		const runCreate = async (db: typeof client) => {
			if (input.isDefault) {
				await db.address.updateMany({
					where: { customerId: input.customerId, isDefault: true },
					data: { isDefault: false },
				});
			}

			return db.address.create({
				data: {
					street: input.street,
					city: input.city,
					postalCode: input.postalCode,
					latitude: input.latitude,
					longitude: input.longitude,
					isDefault: input.isDefault,
					customerId: input.customerId,
				},
				select: AddressQuery.getSimpleSelect(),
			});
		};

		const address = tx
			? await runCreate(client)
			: await database.$transaction((txInner) => runCreate(txInner));

		return AddressEntity.getSimpleRo(address);
	}
}
