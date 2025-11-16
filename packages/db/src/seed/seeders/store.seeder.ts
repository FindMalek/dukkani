import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import type { UserSeeder } from "./user.seeder";
import { StoreCategory, StorePlanType, StoreTheme } from "../../../prisma/generated/client";

/**
 * Seeder for Store model
 * Creates stores linked to seeded users
 * Exports stores for use in other seeders
 */
export class StoreSeeder extends BaseSeeder {
	name = "StoreSeeder";
	order = 2; // Run after UserSeeder

	// Export seeded stores for use in other seeders
	public seededStores: Array<{
		id: bigint;
		name: string;
		slug: string;
		ownerId: string;
	}> = [];

	private userSeeder?: UserSeeder;

	/**
	 * Set the UserSeeder instance to access seeded users
	 */
	setUserSeeder(userSeeder: UserSeeder): void {
		this.userSeeder = userSeeder;
	}

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Store seeding...");

		if (!this.userSeeder) {
			throw new Error("UserSeeder must be set before running StoreSeeder");
		}

		// Check if stores already exist
		const existingStores = await prisma.store.findMany();
		if (existingStores.length > 0) {
			this.log(`Skipping: ${existingStores.length} stores already exist`);
			// Load existing stores for export
			for (const store of existingStores) {
				this.seededStores.push({
					id: store.id,
					name: store.name,
					slug: store.slug,
					ownerId: store.ownerId,
				});
			}
			return;
		}

		const users = this.userSeeder.seededUsers;
		if (users.length === 0) {
			this.log("⚠️  No users found. Skipping store creation.");
			return;
		}

		// Define stores for each user
		const storeData = [
			{
				name: "Ahmed's Fashion Boutique",
				slug: "ahmed-fashion",
				description: "Premium fashion and accessories for the modern gentleman",
				category: StoreCategory.FASHION,
				theme: StoreTheme.MODERN,
				whatsappNumber: "+971501234567",
				ownerId: users[0]!.id,
				planType: StorePlanType.PREMIUM,
				orderLimit: 1000,
			},
			{
				name: "Fatima's Electronics Hub",
				slug: "fatima-electronics",
				description: "Latest electronics, gadgets, and tech accessories",
				category: StoreCategory.ELECTRONICS,
				theme: StoreTheme.MINIMAL,
				whatsappNumber: "+971502345678",
				ownerId: users[1]!.id,
				planType: StorePlanType.BASIC,
				orderLimit: 500,
			},
			{
				name: "Omar's Home Essentials",
				slug: "omar-home",
				description: "Everything you need for your home and kitchen",
				category: StoreCategory.HOME,
				theme: StoreTheme.CLASSIC,
				whatsappNumber: "+971503456789",
				ownerId: users[2]!.id,
				planType: StorePlanType.FREE,
				orderLimit: 100,
			},
		];

		// Create stores with plans
		for (const storeInfo of storeData) {
			const store = await prisma.store.create({
				data: {
					name: storeInfo.name,
					slug: storeInfo.slug,
					description: storeInfo.description,
					category: storeInfo.category,
					theme: storeInfo.theme,
					whatsappNumber: storeInfo.whatsappNumber,
					ownerId: storeInfo.ownerId,
					storePlan: {
						create: {
							planType: storeInfo.planType,
							orderLimit: storeInfo.orderLimit,
							orderCount: 0,
						},
					},
				},
			});

			// Store for export
			this.seededStores.push({
				id: store.id,
				name: store.name,
				slug: store.slug,
				ownerId: store.ownerId,
			});

			this.log(`Created store: ${store.name} (${store.slug})`);
		}

		this.log(`✅ Created ${storeData.length} stores with plans`);
	}
}

