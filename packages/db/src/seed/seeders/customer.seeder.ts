import type { PrismaClient } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

/**
 * Seeder for Customer model
 * Creates customers linked to seeded stores
 * Exports customers for use in other seeders
 */
export interface SeededCustomer {
	id: string;
	name: string;
	phone: string;
	storeId: string;
}

export class CustomerSeeder extends BaseSeeder {
	name = "CustomerSeeder";
	order = 4; // Run after StoreSeeder

	// Export seeded customers for use in other seeders
	public seededCustomers: SeededCustomer[] = [];

	/**
	 * Find customers by store slug
	 */
	findByStoreSlug(storeSlug: string): SeededCustomer[] {
		const store = this.storeSeeder?.findBySlug(storeSlug);
		if (!store) return [];
		return this.seededCustomers.filter((c) => c.storeId === store.id);
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

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Customer seeding...");

		if (!this.storeSeeder) {
			throw new Error("StoreSeeder must be set before running CustomerSeeder");
		}

		// Check if customers already exist
		const existingCustomers = await database.customer.findMany();
		if (existingCustomers.length > 0) {
			this.log(`Skipping: ${existingCustomers.length} customers already exist`);
			// Load existing customers for export
			for (const customer of existingCustomers) {
				this.seededCustomers.push({
					id: customer.id,
					name: customer.name,
					phone: customer.phone,
					storeId: customer.storeId,
				});
			}
			return;
		}

		const storesBySlug = this.storeSeeder.getStoresBySlug();
		if (storesBySlug.size === 0) {
			this.log("⚠️  No stores found. Skipping customer creation.");
			return;
		}

		// Define customers with stable slug lookups
		const customerDefinitions = [
			// Customers for Ahmed's Fashion Boutique
			{
				name: "Khalid Al-Rashid",
				phone: "+971501111111",
				storeSlug: "ahmed-fashion",
			},
			{
				name: "Mariam Al-Zahra",
				phone: "+971501111112",
				storeSlug: "ahmed-fashion",
			},
			// Customers for Fatima's Electronics Hub
			{
				name: "Yusuf Al-Mazrouei",
				phone: "+971502222221",
				storeSlug: "fatima-electronics",
			},
			{
				name: "Layla Al-Mansoori",
				phone: "+971502222222",
				storeSlug: "fatima-electronics",
			},
			// Customers for Omar's Home Essentials
			{
				name: "Hassan Al-Suwaidi",
				phone: "+971503333331",
				storeSlug: "omar-home",
			},
			{
				name: "Noor Al-Kaabi",
				phone: "+971503333332",
				storeSlug: "omar-home",
			},
		];

		// Resolve stores by slug and validate
		const customerData = customerDefinitions
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
				};
			})
			.filter(
				(customer): customer is NonNullable<typeof customer> =>
					customer !== null,
			);

		if (customerData.length === 0) {
			this.log(
				"⚠️  No valid customers to create. All customers were skipped due to missing stores.",
			);
			return;
		}

		// Create all customers at once
		const customers = await database.customer.createMany({
			data: customerData,
		});

		// Fetch created customers for export (need IDs)
		const createdCustomers = await database.customer.findMany({
			where: {
				phone: {
					in: customerData.map((c) => c.phone),
				},
			},
		});

		// Store for export
		for (const customer of createdCustomers) {
			this.seededCustomers.push({
				id: customer.id,
				name: customer.name,
				phone: customer.phone,
				storeId: customer.storeId,
			});
		}

		this.log(`✅ Created ${customers.count} customers`);
	}
}
