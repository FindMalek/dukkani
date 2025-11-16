import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import type { StoreSeeder } from "./store.seeder";
import { Prisma } from "../../../prisma/generated/client";

/**
 * Seeder for Product model
 * Creates products linked to seeded stores
 * Exports products for use in other seeders
 */
export class ProductSeeder extends BaseSeeder {
	name = "ProductSeeder";
	order = 3; // Run after StoreSeeder

	// Export seeded products for use in other seeders
	public seededProducts: Array<{
		id: bigint;
		name: string;
		storeId: bigint;
		price: Prisma.Decimal;
	}> = [];

	private storeSeeder?: StoreSeeder;

	/**
	 * Set the StoreSeeder instance to access seeded stores
	 */
	setStoreSeeder(storeSeeder: StoreSeeder): void {
		this.storeSeeder = storeSeeder;
	}

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Product seeding...");

		if (!this.storeSeeder) {
			throw new Error("StoreSeeder must be set before running ProductSeeder");
		}

		// Check if products already exist
		const existingProducts = await prisma.product.findMany();
		if (existingProducts.length > 0) {
			this.log(`Skipping: ${existingProducts.length} products already exist`);
			// Load existing products for export
			for (const product of existingProducts) {
				this.seededProducts.push({
					id: product.id,
					name: product.name,
					storeId: product.storeId,
					price: product.price,
				});
			}
			return;
		}

		const stores = this.storeSeeder.seededStores;
		if (stores.length === 0) {
			this.log("⚠️  No stores found. Skipping product creation.");
			return;
		}

		// Define products for each store
		const productData = [
			// Products for Ahmed's Fashion Boutique (FASHION)
			{
				name: "Premium Leather Jacket",
				description: "Handcrafted genuine leather jacket with modern design",
				price: new Prisma.Decimal("299.99"),
				stock: 25,
				published: true,
				storeId: stores[0]!.id,
				images: [
					"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
					"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
				],
			},
			{
				name: "Designer Sunglasses",
				description: "UV-protected designer sunglasses with polarized lenses",
				price: new Prisma.Decimal("89.99"),
				stock: 50,
				published: true,
				storeId: stores[0]!.id,
				images: [
					"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800",
				],
			},
			{
				name: "Classic White Sneakers",
				description: "Comfortable and stylish white sneakers for everyday wear",
				price: new Prisma.Decimal("129.99"),
				stock: 40,
				published: true,
				storeId: stores[0]!.id,
				images: [
					"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
				],
			},
			// Products for Fatima's Electronics Hub (ELECTRONICS)
			{
				name: "Wireless Bluetooth Earbuds",
				description: "High-quality noise-canceling wireless earbuds",
				price: new Prisma.Decimal("79.99"),
				stock: 100,
				published: true,
				storeId: stores[1]!.id,
				images: [
					"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
				],
			},
			{
				name: "Smart Watch Pro",
				description: "Feature-rich smartwatch with health tracking",
				price: new Prisma.Decimal("249.99"),
				stock: 30,
				published: true,
				storeId: stores[1]!.id,
				images: [
					"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
				],
			},
			{
				name: "USB-C Fast Charger",
				description: "65W fast charging adapter with multiple ports",
				price: new Prisma.Decimal("34.99"),
				stock: 75,
				published: true,
				storeId: stores[1]!.id,
				images: [
					"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800",
				],
			},
			// Products for Omar's Home Essentials (HOME)
			{
				name: "Stainless Steel Cookware Set",
				description: "10-piece premium cookware set for your kitchen",
				price: new Prisma.Decimal("149.99"),
				stock: 20,
				published: true,
				storeId: stores[2]!.id,
				images: [
					"https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
				],
			},
			{
				name: "Memory Foam Pillow Set",
				description: "Set of 2 ergonomic memory foam pillows",
				price: new Prisma.Decimal("49.99"),
				stock: 60,
				published: true,
				storeId: stores[2]!.id,
				images: [
					"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800",
				],
			},
			{
				name: "LED Desk Lamp",
				description: "Adjustable LED desk lamp with USB charging port",
				price: new Prisma.Decimal("39.99"),
				stock: 45,
				published: true,
				storeId: stores[2]!.id,
				images: [
					"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
				],
			},
		];

		// Create products with images
		for (const productInfo of productData) {
			const product = await prisma.product.create({
				data: {
					name: productInfo.name,
					description: productInfo.description,
					price: productInfo.price,
					stock: productInfo.stock,
					published: productInfo.published,
					storeId: productInfo.storeId,
					images: {
						create: productInfo.images.map((url) => ({
							url,
						})),
					},
				},
			});

			// Store for export
			this.seededProducts.push({
				id: product.id,
				name: product.name,
				storeId: product.storeId,
				price: product.price,
			});

			this.log(`Created product: ${product.name} (Store ID: ${product.storeId})`);
		}

		this.log(`✅ Created ${productData.length} products with images`);
	}
}

