import type { PrismaClient } from "../../../prisma/generated/client";
import {
	StoreCategory,
	StorePlanType,
	StoreTheme,
} from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { UserSeeder } from "./user.seeder";

/**
 * Seeder for Store model
 * Creates stores linked to seeded users
 * Exports stores for use in other seeders
 */
export interface SeededStore {
	id: string;
	name: string;
	slug: string;
	ownerId: string;
}

export class StoreSeeder extends BaseSeeder {
	name = "StoreSeeder";
	order = 2; // Run after UserSeeder

	// Export seeded stores for use in other seeders
	public seededStores: SeededStore[] = [];

	/**
	 * Find a store by slug (stable key)
	 */
	findBySlug(slug: string): SeededStore | undefined {
		return this.seededStores.find((s) => s.slug === slug);
	}

	/**
	 * Find a store by ID
	 */
	findById(id: string): SeededStore | undefined {
		return this.seededStores.find((s) => s.id === id);
	}

	/**
	 * Get all stores as a map keyed by slug for easy lookup
	 */
	getStoresBySlug(): Map<string, SeededStore> {
		return new Map(this.seededStores.map((s) => [s.slug, s]));
	}

	private userSeeder?: UserSeeder;

	/**
	 * Set the UserSeeder instance to access seeded users
	 */
	setUserSeeder(userSeeder: UserSeeder): void {
		this.userSeeder = userSeeder;
	}

	async seed(database: PrismaClient): Promise<void> {
		this.log("Starting Store seeding...");

		if (!this.userSeeder) {
			throw new Error("UserSeeder must be set before running StoreSeeder");
		}

		// Check if stores already exist
		const existingStores = await database.store.findMany();
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

		const usersByEmail = this.userSeeder.getUsersByEmail();
		if (usersByEmail.size === 0) {
			this.log("⚠️  No users found. Skipping store creation.");
			return;
		}

		// Define stores with stable email lookups
		const storeDefinitions = [
			{
				name: "Ahmed's Fashion Boutique",
				slug: "ahmed-fashion",
				description: "Premium fashion and accessories for the modern gentleman",
				category: StoreCategory.FASHION,
				theme: StoreTheme.MODERN,
				whatsappNumber: "+971501234567",
				ownerEmail: "ahmed@dukkani.com",
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
				ownerEmail: "fatima@dukkani.com",
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
				ownerEmail: "omar@dukkani.com",
				planType: StorePlanType.FREE,
				orderLimit: 100,
			},
		];

		// Resolve owners by email and validate
		const storeData = storeDefinitions
			.map((def) => {
				const owner = usersByEmail.get(def.ownerEmail);
				if (!owner) {
					this.error(
						`⚠️  Owner not found for store "${def.name}" (email: ${def.ownerEmail}). Skipping this store.`,
					);
					return null;
				}
				return {
					name: def.name,
					slug: def.slug,
					description: def.description,
					category: def.category,
					theme: def.theme,
					whatsappNumber: def.whatsappNumber,
					ownerId: owner.id,
					planType: def.planType,
					orderLimit: def.orderLimit,
				};
			})
			.filter((store): store is NonNullable<typeof store> => store !== null);

		if (storeData.length === 0) {
			this.log(
				"⚠️  No valid stores to create. All stores were skipped due to missing owners.",
			);
			return;
		}

		// Create stores (need individual creates for storePlan relation)
		const createdStores = await Promise.all(
			storeData.map((storeInfo) =>
				database.store.create({
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
				}),
			),
		);

		// Store for export
		for (const store of createdStores) {
			this.seededStores.push({
				id: store.id,
				name: store.name,
				slug: store.slug,
				ownerId: store.ownerId,
			});
		}

		this.log(`✅ Created ${createdStores.length} stores with plans`);
	}
}
