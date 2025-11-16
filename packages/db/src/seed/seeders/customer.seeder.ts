import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import type { StoreSeeder } from "./store.seeder";

/**
 * Seeder for Customer model
 * Creates customers linked to seeded stores
 * Exports customers for use in other seeders
 */
export class CustomerSeeder extends BaseSeeder {
	name = "CustomerSeeder";
	order = 4; // Run after StoreSeeder

	// Export seeded customers for use in other seeders
	public seededCustomers: Array<{
		id: bigint;
		name: string;
		phone: string;
		storeId: bigint;
	}> = [];

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
		const existingCustomers = await prisma.customer.findMany();
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

		const stores = this.storeSeeder.seededStores;
		if (stores.length === 0) {
			this.log("⚠️  No stores found. Skipping customer creation.");
			return;
		}

		// Define customers for each store
		const customerData = [
			// Customers for Ahmed's Fashion Boutique
			{
				name: "Khalid Al-Rashid",
				phone: "+971501111111",
				storeId: stores[0]!.id,
			},
			{
				name: "Mariam Al-Zahra",
				phone: "+971501111112",
				storeId: stores[0]!.id,
			},
			// Customers for Fatima's Electronics Hub
			{
				name: "Yusuf Al-Mazrouei",
				phone: "+971502222221",
				storeId: stores[1]!.id,
			},
			{
				name: "Layla Al-Mansoori",
				phone: "+971502222222",
				storeId: stores[1]!.id,
			},
			// Customers for Omar's Home Essentials
			{
				name: "Hassan Al-Suwaidi",
				phone: "+971503333331",
				storeId: stores[2]!.id,
			},
			{
				name: "Noor Al-Kaabi",
				phone: "+971503333332",
				storeId: stores[2]!.id,
			},
		];

		// Create all customers at once
		const customers = await prisma.customer.createMany({
			data: customerData,
		});

		// Fetch created customers for export (need IDs)
		const createdCustomers = await prisma.customer.findMany({
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
