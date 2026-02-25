import { hashPassword } from "@/seed/utils/password";
import { generateProductId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import {
	PaymentMethod,
	Prisma,
	StoreCategory,
	StorePlanType,
	StoreStatus,
	StoreTheme,
} from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";
import type { UserSeeder } from "./user.seeder";

const DEMO_USER_EMAIL = "demo@dukkani.com";
const DEMO_USER_ID = "user_demo_001";
const DEMO_STORE_SLUG = "demo";

/**
 * Seeder for demo store used by Lighthouse CI and testing.
 * Uses upsert to ensure demo store always exists (works for fresh seeds and existing production DBs).
 * Runs last (order 6) after all other seeders.
 */
export class DemoSeeder extends BaseSeeder {
	name = "DemoSeeder";
	order = 6; // Run last

	private userSeeder?: UserSeeder;
	private storeSeeder?: StoreSeeder;

	setUserSeeder(userSeeder: UserSeeder): void {
		this.userSeeder = userSeeder;
	}

	setStoreSeeder(storeSeeder: StoreSeeder): void {
		this.storeSeeder = storeSeeder;
	}

	async seed(database: PrismaClient): Promise<void> {
		this.log("Starting Demo store seeding (upsert)...");

		if (!this.userSeeder || !this.storeSeeder) {
			throw new Error(
				"UserSeeder and StoreSeeder must be set before running DemoSeeder",
			);
		}

		const now = new Date();

		// 1. Upsert demo user
		const hashedPassword = await hashPassword("Demo123!");
		const demoUser = await database.user.upsert({
			where: { email: DEMO_USER_EMAIL },
			create: {
				id: DEMO_USER_ID,
				name: "Demo User",
				email: DEMO_USER_EMAIL,
				emailVerified: true,
				image: null,
				createdAt: now,
				updatedAt: now,
			},
			update: {},
		});

		// 2. Ensure demo user has credential account
		const existingAccount = await database.account.findFirst({
			where: {
				userId: demoUser.id,
				providerId: "credential",
			},
		});

		if (!existingAccount) {
			await database.account.create({
				data: {
					id: `account_${demoUser.id}`,
					accountId: demoUser.email,
					providerId: "credential",
					userId: demoUser.id,
					password: hashedPassword,
					createdAt: now,
					updatedAt: now,
				},
			});
			this.log("✅ Created credential account for demo user");
		}

		// 3. Upsert demo store
		const demoStore = await database.store.upsert({
			where: { slug: DEMO_STORE_SLUG },
			create: {
				name: "Demo Store",
				slug: DEMO_STORE_SLUG,
				description: "Demo store for Lighthouse CI and testing",
				category: StoreCategory.HOME,
				theme: StoreTheme.MODERN,
				whatsappNumber: "+971500000000",
				ownerId: demoUser.id,
				supportedPaymentMethods: [PaymentMethod.COD],
				shippingCost: 12.0,
				status: StoreStatus.PUBLISHED,
				storePlan: {
					create: {
						planType: StorePlanType.FREE,
						orderLimit: 100,
						orderCount: 0,
					},
				},
			},
			update: {
				status: StoreStatus.PUBLISHED,
				name: "Demo Store",
				description: "Demo store for Lighthouse CI and testing",
			},
		});

		// Add to store seeder's export if not already present
		if (!this.storeSeeder.findBySlug(DEMO_STORE_SLUG)) {
			this.storeSeeder.seededStores.push({
				id: demoStore.id,
				name: demoStore.name,
				slug: demoStore.slug,
				ownerId: demoStore.ownerId,
				status: demoStore.status,
			});
		}

		// 4. Check if demo store has products
		const existingProducts = await database.product.count({
			where: { storeId: demoStore.id },
		});

		if (existingProducts > 0) {
			this.log(
				`✅ Demo store already has ${existingProducts} products. Skipping product creation.`,
			);
			return;
		}

		// 5. Create categories for demo store
		const categoryNames = ["Kitchen", "Decor", "Essentials"];
		const categoryMap = new Map<string, string>();

		for (const categoryName of categoryNames) {
			const category = await database.category.upsert({
				where: {
					storeId_name: {
						storeId: demoStore.id,
						name: categoryName,
					},
				},
				create: {
					name: categoryName,
					storeId: demoStore.id,
				},
				update: {},
			});
			categoryMap.set(categoryName, category.id);
		}

		// 6. Create demo products (simple, no variants)
		const productDefinitions = [
			{
				name: "Demo Coffee Mug",
				description: "A simple ceramic coffee mug for your morning brew.",
				price: new Prisma.Decimal("12.99"),
				stock: 50,
				categoryName: "Kitchen",
				images: [
					"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80",
				],
			},
			{
				name: "Demo Desk Organizer",
				description: "Keep your desk tidy with this minimalist organizer.",
				price: new Prisma.Decimal("24.99"),
				stock: 30,
				categoryName: "Essentials",
				images: [
					"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
				],
			},
			{
				name: "Demo Wall Art",
				description: "Modern abstract wall art to brighten any room.",
				price: new Prisma.Decimal("39.99"),
				stock: 20,
				categoryName: "Decor",
				images: [
					"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
				],
			},
			{
				name: "Demo LED Lamp",
				description: "Adjustable LED lamp with warm and cool light modes.",
				price: new Prisma.Decimal("29.99"),
				stock: 40,
				categoryName: "Essentials",
				images: [
					"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
				],
			},
			{
				name: "Demo Plant Pot",
				description: "Ceramic plant pot with drainage hole for indoor plants.",
				price: new Prisma.Decimal("18.99"),
				stock: 35,
				categoryName: "Decor",
				images: [
					"https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80",
				],
			},
		];

		for (const def of productDefinitions) {
			const categoryId = categoryMap.get(def.categoryName);
			if (!categoryId) continue;

			const productId = generateProductId(DEMO_STORE_SLUG);
			await database.product.create({
				data: {
					id: productId,
					name: def.name,
					description: def.description,
					price: def.price,
					stock: def.stock,
					published: true,
					hasVariants: false,
					storeId: demoStore.id,
					categoryId,
					images: {
						create: def.images.map((url) => ({ url })),
					},
				},
			});
		}

		this.log(
			`✅ Demo store ready: ${DEMO_STORE_SLUG}.localhost (${productDefinitions.length} products)`,
		);
	}
}
