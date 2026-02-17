import type { PrismaClient } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

/**
 * Seeder for Customer model
 * Creates customers and their addresses linked to seeded stores
 * Exports customers and addresses for use in other seeders
 */
export interface SeededCustomer {
	id: string;
	name: string;
	phone: string;
	storeId: string;
}

export interface SeededAddress {
	id: string;
	street: string;
	city: string;
	customerId: string;
}

export class CustomerSeeder extends BaseSeeder {
	name = "CustomerSeeder";
	order = 4; // Run after StoreSeeder

	// Export seeded customers and addresses for use in other seeders
	public seededCustomers: SeededCustomer[] = [];
	public seededAddresses: SeededAddress[] = [];

	/**
	 * Find customers by store slug
	 */
	findByStoreSlug(storeSlug: string): SeededCustomer[] {
		const store = this.storeSeeder?.findBySlug(storeSlug);
		if (!store) return [];
		return this.seededCustomers.filter((c) => c.storeId === store.id);
	}

	/**
	 * Find the default address for a customer
	 */
	findAddressByCustomerId(customerId: string): SeededAddress | undefined {
		return this.seededAddresses.find((a) => a.customerId === customerId);
	}

	/**
	 * Get all customers grouped by store slug
	 */
	getCustomersByStoreSlug(): Map<string, SeededCustomer[]> {
		const map = new Map<string, SeededCustomer[]>();
		for (const customer of this.seededCustomers) {
			const store = this.storeSeeder?.findById(customer.storeId);
			if (store) {
				const existing = map.get(store.slug) || [];
				existing.push(customer);
				map.set(store.slug, existing);
			}
		}
		return map;
	}

	private storeSeeder?: StoreSeeder;

	/**
	 * Set the StoreSeeder instance to access seeded stores
	 */
	setStoreSeeder(storeSeeder: StoreSeeder): void {
		this.storeSeeder = storeSeeder;
	}

	async seed(database: PrismaClient): Promise<void> {
		this.log("Starting Customer seeding...");

		if (!this.storeSeeder) {
			throw new Error("StoreSeeder must be set before running CustomerSeeder");
		}

		// Check if customers already exist
		const existingCustomers = await database.customer.findMany({
			include: { addresses: true },
		});
		if (existingCustomers.length > 0) {
			this.log(`Skipping: ${existingCustomers.length} customers already exist`);
			// Load existing customers and addresses for export
			for (const customer of existingCustomers) {
				this.seededCustomers.push({
					id: customer.id,
					name: customer.name,
					phone: customer.phone,
					storeId: customer.storeId,
				});
				for (const address of customer.addresses) {
					this.seededAddresses.push({
						id: address.id,
						street: address.street,
						city: address.city,
						customerId: address.customerId,
					});
				}
			}
			return;
		}

		const storesBySlug = this.storeSeeder.getStoresBySlug();
		if (storesBySlug.size === 0) {
			this.log("⚠️  No stores found. Skipping customer creation.");
			return;
		}

		// Define customers with stable slug lookups and address data
		const customerDefinitions = [
			// Customers for Ahmed's Fashion Boutique
			{
				name: "Khalid Al-Rashid",
				phone: "+971501111111",
				storeSlug: "ahmed-fashion",
				address: { street: "123 Main Street", city: "Dubai" },
			},
			{
				name: "Mariam Al-Zahra",
				phone: "+971501111112",
				storeSlug: "ahmed-fashion",
				address: { street: "45 Al Wasl Road", city: "Dubai" },
			},
			// Customers for Fatima's Electronics Hub
			{
				name: "Yusuf Al-Mazrouei",
				phone: "+971502222221",
				storeSlug: "fatima-electronics",
				address: { street: "456 Business Bay", city: "Dubai" },
			},
			{
				name: "Layla Al-Mansoori",
				phone: "+971502222222",
				storeSlug: "fatima-electronics",
				address: { street: "78 Sheikh Zayed Road", city: "Abu Dhabi" },
			},
			// Customers for Omar's Home Essentials
			{
				name: "Hassan Al-Suwaidi",
				phone: "+971503333331",
				storeSlug: "omar-home",
				address: { street: "789 Jumeirah Beach Road", city: "Dubai" },
			},
			{
				name: "Noor Al-Kaabi",
				phone: "+971503333332",
				storeSlug: "omar-home",
				address: { street: "12 Corniche Road", city: "Abu Dhabi" },
			},
		];

		// Resolve stores by slug and validate
		const resolvedDefinitions = customerDefinitions
			.map((def) => {
				const store = storesBySlug.get(def.storeSlug);
				if (!store) {
					this.error(
						`⚠️  Store not found for customer "${def.name}" (slug: ${def.storeSlug}). Skipping this customer.`,
					);
					return null;
				}
				return {
					name: def.name,
					phone: def.phone,
					storeId: store.id,
					address: def.address,
				};
			})
			.filter(
				(customer): customer is NonNullable<typeof customer> =>
					customer !== null,
			);

		if (resolvedDefinitions.length === 0) {
			this.log(
				"⚠️  No valid customers to create. All customers were skipped due to missing stores.",
			);
			return;
		}

		// Create customers with addresses using individual creates
		const createdCustomers = await Promise.all(
			resolvedDefinitions.map((def) =>
				database.customer.create({
					data: {
						name: def.name,
						phone: def.phone,
						storeId: def.storeId,
						addresses: {
							create: {
								street: def.address.street,
								city: def.address.city,
								isDefault: true,
							},
						},
					},
					include: { addresses: true },
				}),
			),
		);

		// Store for export
		for (const customer of createdCustomers) {
			this.seededCustomers.push({
				id: customer.id,
				name: customer.name,
				phone: customer.phone,
				storeId: customer.storeId,
			});
			for (const address of customer.addresses) {
				this.seededAddresses.push({
					id: address.id,
					street: address.street,
					city: address.city,
					customerId: address.customerId,
				});
			}
		}

		this.log(`✅ Created ${createdCustomers.length} customers with addresses`);
	}
}
