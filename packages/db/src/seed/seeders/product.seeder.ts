import { generateProductId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import { Prisma } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

/**
 * Seeder for Product model
 * Creates products linked to seeded stores
 * Exports products for use in other seeders
 */
export interface SeededProduct {
	id: string;
	name: string;
	storeId: string;
	price: Prisma.Decimal;
}

export class ProductSeeder extends BaseSeeder {
	name = "ProductSeeder";
	order = 3; // Run after StoreSeeder

	// Export seeded products for use in other seeders
	public seededProducts: SeededProduct[] = [];

	/**
	 * Find products by store slug
	 */
	findByStoreSlug(storeSlug: string): SeededProduct[] {
		const store = this.storeSeeder?.findBySlug(storeSlug);
		if (!store) return [];
		return this.seededProducts.filter((p) => p.storeId === store.id);
	}

	/**
	 * Get all products grouped by store slug
	 */
	getProductsByStoreSlug(): Map<string, SeededProduct[]> {
		const map = new Map<string, SeededProduct[]>();
		for (const product of this.seededProducts) {
			const store = this.storeSeeder?.findById(product.storeId);
			if (store) {
				const existing = map.get(store.slug) || [];
				existing.push(product);
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
		this.log("Starting Product seeding...");

		if (!this.storeSeeder) {
			throw new Error("StoreSeeder must be set before running ProductSeeder");
		}

		// Check if products already exist
		const existingProducts = await database.product.findMany();
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

		const storesBySlug = this.storeSeeder.getStoresBySlug();
		if (storesBySlug.size === 0) {
			this.log("⚠️  No stores found. Skipping product creation.");
			return;
		}

		// Define products with stable slug lookups
		const productDefinitions = [
			// Products for Ahmed's Fashion Boutique (FASHION)
			{
				name: "Premium Leather Jacket",
				description: "Handcrafted genuine leather jacket with modern design",
				price: new Prisma.Decimal("299.99"),
				stock: 25,
				published: true,
				storeSlug: "ahmed-fashion",
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
				storeSlug: "ahmed-fashion",
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
				storeSlug: "ahmed-fashion",
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
				storeSlug: "fatima-electronics",
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
				storeSlug: "fatima-electronics",
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
				storeSlug: "fatima-electronics",
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
				storeSlug: "omar-home",
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
				storeSlug: "omar-home",
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
				storeSlug: "omar-home",
				images: [
					"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
				],
			},
		];

		// Resolve stores by slug and validate
		const productData = productDefinitions
			.map((def) => {
				const store = storesBySlug.get(def.storeSlug);
				if (!store) {
					this.error(
						`⚠️  Store not found for product "${def.name}" (slug: ${def.storeSlug}). Skipping this product.`,
					);
					return null;
				}
				return {
					id: generateProductId(store.slug),
					name: def.name,
					description: def.description,
					price: def.price,
					stock: def.stock,
					published: def.published,
					storeId: store.id,
					images: def.images,
				};
			})
			.filter(
				(product): product is NonNullable<typeof product> => product !== null,
			);

		if (productData.length === 0) {
			this.log(
				"⚠️  No valid products to create. All products were skipped due to missing stores.",
			);
			return;
		}

		// Create products (need individual creates for images relation)
		const createdProducts = await Promise.all(
			productData.map((productInfo) =>
				database.product.create({
					data: {
						id: productInfo.id,
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
				}),
			),
		);

		// Store for export
		for (const product of createdProducts) {
			this.seededProducts.push({
				id: product.id,
				name: product.name,
				storeId: product.storeId,
				price: product.price,
			});
		}

		this.log(`✅ Created ${createdProducts.length} products with images`);
	}
}
