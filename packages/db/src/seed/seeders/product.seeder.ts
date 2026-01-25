import { generateProductId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import { Prisma } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

export interface SeededProduct {
	id: string;
	name: string;
	storeId: string;
	price: Prisma.Decimal;
}

export class ProductSeeder extends BaseSeeder {
	name = "ProductSeeder";
	order = 3; // Run after StoreSeeder

	public seededProducts: SeededProduct[] = [];

	findByStoreSlug(storeSlug: string): SeededProduct[] {
		const store = this.storeSeeder?.findBySlug(storeSlug);
		if (!store) return [];
		return this.seededProducts.filter((p) => p.storeId === store.id);
	}

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

		// Step 1: Create categories for each store
		this.log("Creating categories...");
		const categoryMap = new Map<string, Map<string, string>>(); // storeSlug -> categoryName -> categoryId

		for (const [storeSlug, store] of storesBySlug) {
			const storeCategories = new Map<string, string>();

			// Define categories per store type
			const categoryNames: string[] = [];
			if (storeSlug === "ahmed-fashion") {
				categoryNames.push(
					"Jackets",
					"Shoes",
					"Accessories",
					"T-Shirts",
					"Pants",
					"Watches",
				);
			} else if (storeSlug === "fatima-electronics") {
				categoryNames.push(
					"Audio",
					"Wearables",
					"Chargers",
					"Smartphones",
					"Laptops",
					"Tablets",
				);
			} else if (storeSlug === "omar-home") {
				categoryNames.push(
					"Kitchen",
					"Bedding",
					"Lighting",
					"Furniture",
					"Storage",
					"Decor",
				);
			}

			for (const categoryName of categoryNames) {
				const category = await database.category.create({
					data: {
						name: categoryName,
						storeId: store.id,
					},
				});
				storeCategories.set(categoryName, category.id);
			}

			categoryMap.set(storeSlug, storeCategories);
			this.log(
				`✅ Created ${categoryNames.length} categories for ${store.name}`,
			);
		}

		// Step 2: Define comprehensive products with variants
		const productDefinitions = [
			// ========== AHMED'S FASHION BOUTIQUE ==========
			{
				name: "Premium Leather Jacket",
				description:
					"Handcrafted genuine leather jacket with modern design. Features premium Italian leather, quilted lining, and multiple pockets. Perfect for all seasons with removable inner lining.",
				price: new Prisma.Decimal("349.99"),
				stock: 0,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Jackets",
				hasVariants: true,
				variantOptions: [
					{ name: "Size", values: ["S", "M", "L", "XL", "XXL"] },
					{ name: "Color", values: ["Black", "Brown", "Navy"] },
				],
				variants: [
					{ Size: "S", Color: "Black", stock: 8, price: 349.99 },
					{ Size: "S", Color: "Brown", stock: 5, price: 349.99 },
					{ Size: "S", Color: "Navy", stock: 6, price: 349.99 },
					{ Size: "M", Color: "Black", stock: 15, price: 349.99 },
					{ Size: "M", Color: "Brown", stock: 12, price: 349.99 },
					{ Size: "M", Color: "Navy", stock: 10, price: 349.99 },
					{ Size: "L", Color: "Black", stock: 18, price: 349.99 },
					{ Size: "L", Color: "Brown", stock: 14, price: 349.99 },
					{ Size: "L", Color: "Navy", stock: 16, price: 349.99 },
					{ Size: "XL", Color: "Black", stock: 10, price: 359.99 },
					{ Size: "XL", Color: "Brown", stock: 8, price: 359.99 },
					{ Size: "XL", Color: "Navy", stock: 9, price: 359.99 },
					{ Size: "XXL", Color: "Black", stock: 5, price: 369.99 },
					{ Size: "XXL", Color: "Brown", stock: 4, price: 369.99 },
					{ Size: "XXL", Color: "Navy", stock: 3, price: 369.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
					"https://images.unsplash.com/photo-1591047139829-d91eecb6c98?w=800&q=80",
					"https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
				],
			},
			{
				name: "Classic White Sneakers",
				description:
					"Comfortable and stylish white sneakers for everyday wear. Features memory foam insoles, breathable mesh upper, and durable rubber sole. Perfect for casual and athletic activities.",
				price: new Prisma.Decimal("129.99"),
				stock: 0,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Shoes",
				hasVariants: true,
				variantOptions: [
					{
						name: "Size",
						values: ["38", "39", "40", "41", "42", "43", "44", "45"],
					},
					{ name: "Color", values: ["White", "Black", "Gray"] },
				],
				variants: [
					{ Size: "38", Color: "White", stock: 12, price: 129.99 },
					{ Size: "38", Color: "Black", stock: 8, price: 129.99 },
					{ Size: "38", Color: "Gray", stock: 6, price: 129.99 },
					{ Size: "39", Color: "White", stock: 20, price: 129.99 },
					{ Size: "39", Color: "Black", stock: 15, price: 129.99 },
					{ Size: "39", Color: "Gray", stock: 12, price: 129.99 },
					{ Size: "40", Color: "White", stock: 25, price: 129.99 },
					{ Size: "40", Color: "Black", stock: 18, price: 129.99 },
					{ Size: "40", Color: "Gray", stock: 15, price: 129.99 },
					{ Size: "41", Color: "White", stock: 30, price: 129.99 },
					{ Size: "41", Color: "Black", stock: 22, price: 129.99 },
					{ Size: "41", Color: "Gray", stock: 20, price: 129.99 },
					{ Size: "42", Color: "White", stock: 28, price: 129.99 },
					{ Size: "42", Color: "Black", stock: 20, price: 129.99 },
					{ Size: "42", Color: "Gray", stock: 18, price: 129.99 },
					{ Size: "43", Color: "White", stock: 22, price: 129.99 },
					{ Size: "43", Color: "Black", stock: 16, price: 129.99 },
					{ Size: "43", Color: "Gray", stock: 14, price: 129.99 },
					{ Size: "44", Color: "White", stock: 15, price: 129.99 },
					{ Size: "44", Color: "Black", stock: 10, price: 129.99 },
					{ Size: "44", Color: "Gray", stock: 8, price: 129.99 },
					{ Size: "45", Color: "White", stock: 10, price: 129.99 },
					{ Size: "45", Color: "Black", stock: 7, price: 129.99 },
					{ Size: "45", Color: "Gray", stock: 5, price: 129.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
					"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
					"https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
				],
			},
			{
				name: "Premium Cotton T-Shirt",
				description:
					"Soft, breathable 100% organic cotton t-shirt. Pre-shrunk fabric, double-stitched seams, and tagless design for ultimate comfort. Available in multiple sizes and colors.",
				price: new Prisma.Decimal("29.99"),
				stock: 0,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "T-Shirts",
				hasVariants: true,
				variantOptions: [
					{ name: "Size", values: ["S", "M", "L", "XL", "XXL"] },
					{ name: "Color", values: ["Black", "White", "Navy", "Gray", "Red"] },
				],
				variants: [
					{ Size: "S", Color: "Black", stock: 25, price: 29.99 },
					{ Size: "S", Color: "White", stock: 30, price: 29.99 },
					{ Size: "S", Color: "Navy", stock: 20, price: 29.99 },
					{ Size: "S", Color: "Gray", stock: 18, price: 29.99 },
					{ Size: "S", Color: "Red", stock: 15, price: 29.99 },
					{ Size: "M", Color: "Black", stock: 40, price: 29.99 },
					{ Size: "M", Color: "White", stock: 45, price: 29.99 },
					{ Size: "M", Color: "Navy", stock: 35, price: 29.99 },
					{ Size: "M", Color: "Gray", stock: 32, price: 29.99 },
					{ Size: "M", Color: "Red", stock: 28, price: 29.99 },
					{ Size: "L", Color: "Black", stock: 50, price: 29.99 },
					{ Size: "L", Color: "White", stock: 55, price: 29.99 },
					{ Size: "L", Color: "Navy", stock: 45, price: 29.99 },
					{ Size: "L", Color: "Gray", stock: 40, price: 29.99 },
					{ Size: "L", Color: "Red", stock: 35, price: 29.99 },
					{ Size: "XL", Color: "Black", stock: 35, price: 31.99 },
					{ Size: "XL", Color: "White", stock: 40, price: 31.99 },
					{ Size: "XL", Color: "Navy", stock: 30, price: 31.99 },
					{ Size: "XL", Color: "Gray", stock: 28, price: 31.99 },
					{ Size: "XL", Color: "Red", stock: 25, price: 31.99 },
					{ Size: "XXL", Color: "Black", stock: 20, price: 33.99 },
					{ Size: "XXL", Color: "White", stock: 25, price: 33.99 },
					{ Size: "XXL", Color: "Navy", stock: 18, price: 33.99 },
					{ Size: "XXL", Color: "Gray", stock: 15, price: 33.99 },
					{ Size: "XXL", Color: "Red", stock: 12, price: 33.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
					"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
				],
			},
			{
				name: "Designer Sunglasses",
				description:
					"UV-protected designer sunglasses with polarized lenses. Features lightweight frame, anti-glare coating, and comes with protective case and cleaning cloth.",
				price: new Prisma.Decimal("89.99"),
				stock: 50,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Accessories",
				hasVariants: false,
				images: [
					"https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
					"https://images.unsplash.com/photo-1511499767150-a48a237f0b84?w=800&q=80",
				],
			},
			{
				name: "Slim Fit Chinos",
				description:
					"Classic slim-fit chinos in premium cotton twill. Features stretch fabric for comfort, wrinkle-resistant finish, and perfect for both casual and smart-casual occasions.",
				price: new Prisma.Decimal("79.99"),
				stock: 0,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Pants",
				hasVariants: true,
				variantOptions: [
					{ name: "Size", values: ["28", "30", "32", "34", "36", "38"] },
					{ name: "Color", values: ["Khaki", "Navy", "Black", "Olive"] },
				],
				variants: [
					{ Size: "28", Color: "Khaki", stock: 8, price: 79.99 },
					{ Size: "28", Color: "Navy", stock: 6, price: 79.99 },
					{ Size: "28", Color: "Black", stock: 5, price: 79.99 },
					{ Size: "28", Color: "Olive", stock: 4, price: 79.99 },
					{ Size: "30", Color: "Khaki", stock: 15, price: 79.99 },
					{ Size: "30", Color: "Navy", stock: 12, price: 79.99 },
					{ Size: "30", Color: "Black", stock: 10, price: 79.99 },
					{ Size: "30", Color: "Olive", stock: 8, price: 79.99 },
					{ Size: "32", Color: "Khaki", stock: 25, price: 79.99 },
					{ Size: "32", Color: "Navy", stock: 20, price: 79.99 },
					{ Size: "32", Color: "Black", stock: 18, price: 79.99 },
					{ Size: "32", Color: "Olive", stock: 15, price: 79.99 },
					{ Size: "34", Color: "Khaki", stock: 30, price: 79.99 },
					{ Size: "34", Color: "Navy", stock: 25, price: 79.99 },
					{ Size: "34", Color: "Black", stock: 22, price: 79.99 },
					{ Size: "34", Color: "Olive", stock: 20, price: 79.99 },
					{ Size: "36", Color: "Khaki", stock: 20, price: 79.99 },
					{ Size: "36", Color: "Navy", stock: 18, price: 79.99 },
					{ Size: "36", Color: "Black", stock: 15, price: 79.99 },
					{ Size: "36", Color: "Olive", stock: 12, price: 79.99 },
					{ Size: "38", Color: "Khaki", stock: 12, price: 79.99 },
					{ Size: "38", Color: "Navy", stock: 10, price: 79.99 },
					{ Size: "38", Color: "Black", stock: 8, price: 79.99 },
					{ Size: "38", Color: "Olive", stock: 6, price: 79.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
					"https://images.unsplash.com/photo-1506629905607-2c5c0b0a0b0a?w=800&q=80",
				],
			},
			{
				name: "Luxury Watch Collection",
				description:
					"Elegant timepiece with genuine leather strap, sapphire crystal glass, and water resistance up to 50m. Features date display and luminous hands.",
				price: new Prisma.Decimal("249.99"),
				stock: 0,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Watches",
				hasVariants: true,
				variantOptions: [
					{ name: "Strap Color", values: ["Black", "Brown", "Silver"] },
					{ name: "Case Material", values: ["Stainless Steel", "Rose Gold"] },
				],
				variants: [
					{
						"Strap Color": "Black",
						"Case Material": "Stainless Steel",
						stock: 15,
						price: 249.99,
					},
					{
						"Strap Color": "Black",
						"Case Material": "Rose Gold",
						stock: 10,
						price: 279.99,
					},
					{
						"Strap Color": "Brown",
						"Case Material": "Stainless Steel",
						stock: 12,
						price: 249.99,
					},
					{
						"Strap Color": "Brown",
						"Case Material": "Rose Gold",
						stock: 8,
						price: 279.99,
					},
					{
						"Strap Color": "Silver",
						"Case Material": "Stainless Steel",
						stock: 18,
						price: 249.99,
					},
					{
						"Strap Color": "Silver",
						"Case Material": "Rose Gold",
						stock: 12,
						price: 279.99,
					},
				],
				images: [
					"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
					"https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
				],
			},

			// ========== FATIMA'S ELECTRONICS HUB ==========
			{
				name: "Wireless Bluetooth Earbuds Pro",
				description:
					"High-quality noise-canceling wireless earbuds with 30-hour battery life, IPX7 water resistance, and premium sound quality. Features touch controls and wireless charging case.",
				price: new Prisma.Decimal("129.99"),
				stock: 0,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Audio",
				hasVariants: true,
				variantOptions: [
					{ name: "Color", values: ["Black", "White", "Blue"] },
					{ name: "Storage", values: ["Standard", "Premium"] },
				],
				variants: [
					{ Color: "Black", Storage: "Standard", stock: 45, price: 129.99 },
					{ Color: "Black", Storage: "Premium", stock: 30, price: 149.99 },
					{ Color: "White", Storage: "Standard", stock: 50, price: 129.99 },
					{ Color: "White", Storage: "Premium", stock: 35, price: 149.99 },
					{ Color: "Blue", Storage: "Standard", stock: 30, price: 129.99 },
					{ Color: "Blue", Storage: "Premium", stock: 20, price: 149.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
					"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800&q=80",
				],
			},
			{
				name: "Smart Watch Pro",
				description:
					"Feature-rich smartwatch with health tracking, GPS, heart rate monitor, and 7-day battery life. Compatible with iOS and Android. Includes sleep tracking and workout modes.",
				price: new Prisma.Decimal("299.99"),
				stock: 0,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Wearables",
				hasVariants: true,
				variantOptions: [
					{ name: "Size", values: ["40mm", "44mm"] },
					{ name: "Color", values: ["Black", "Silver", "Rose Gold"] },
				],
				variants: [
					{ Size: "40mm", Color: "Black", stock: 25, price: 299.99 },
					{ Size: "40mm", Color: "Silver", stock: 20, price: 299.99 },
					{ Size: "40mm", Color: "Rose Gold", stock: 15, price: 319.99 },
					{ Size: "44mm", Color: "Black", stock: 30, price: 319.99 },
					{ Size: "44mm", Color: "Silver", stock: 25, price: 319.99 },
					{ Size: "44mm", Color: "Rose Gold", stock: 18, price: 339.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
					"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=80",
				],
			},
			{
				name: "USB-C Fast Charger",
				description:
					"65W fast charging adapter with multiple ports (2x USB-C, 1x USB-A). Features GaN technology for compact size, supports Power Delivery 3.0, and includes safety certifications.",
				price: new Prisma.Decimal("34.99"),
				stock: 75,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Chargers",
				hasVariants: false,
				images: [
					"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
					"https://images.unsplash.com/photo-1609091839311-d5365f5bf239?w=800&q=80",
				],
			},
			{
				name: "Premium Smartphone",
				description:
					"Latest flagship smartphone with 6.7-inch OLED display, triple camera system, 256GB storage, and 5G connectivity. Features wireless charging and IP68 water resistance.",
				price: new Prisma.Decimal("899.99"),
				stock: 0,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Smartphones",
				hasVariants: true,
				variantOptions: [
					{ name: "Storage", values: ["128GB", "256GB", "512GB"] },
					{
						name: "Color",
						values: ["Midnight Black", "Starlight White", "Ocean Blue"],
					},
				],
				variants: [
					{
						Storage: "128GB",
						Color: "Midnight Black",
						stock: 20,
						price: 899.99,
					},
					{
						Storage: "128GB",
						Color: "Starlight White",
						stock: 18,
						price: 899.99,
					},
					{ Storage: "128GB", Color: "Ocean Blue", stock: 15, price: 899.99 },
					{
						Storage: "256GB",
						Color: "Midnight Black",
						stock: 25,
						price: 999.99,
					},
					{
						Storage: "256GB",
						Color: "Starlight White",
						stock: 22,
						price: 999.99,
					},
					{ Storage: "256GB", Color: "Ocean Blue", stock: 20, price: 999.99 },
					{
						Storage: "512GB",
						Color: "Midnight Black",
						stock: 12,
						price: 1199.99,
					},
					{
						Storage: "512GB",
						Color: "Starlight White",
						stock: 10,
						price: 1199.99,
					},
					{ Storage: "512GB", Color: "Ocean Blue", stock: 8, price: 1199.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
					"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
				],
			},
			{
				name: "Ultrabook Laptop",
				description:
					"Sleek ultrabook with 14-inch 4K display, latest processor, 16GB RAM, and 512GB SSD. Features all-day battery life, backlit keyboard, and premium aluminum build.",
				price: new Prisma.Decimal("1299.99"),
				stock: 0,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Laptops",
				hasVariants: true,
				variantOptions: [
					{ name: "RAM", values: ["16GB", "32GB"] },
					{ name: "Storage", values: ["512GB SSD", "1TB SSD"] },
					{ name: "Color", values: ["Space Gray", "Silver"] },
				],
				variants: [
					{
						RAM: "16GB",
						Storage: "512GB SSD",
						Color: "Space Gray",
						stock: 15,
						price: 1299.99,
					},
					{
						RAM: "16GB",
						Storage: "512GB SSD",
						Color: "Silver",
						stock: 12,
						price: 1299.99,
					},
					{
						RAM: "16GB",
						Storage: "1TB SSD",
						Color: "Space Gray",
						stock: 10,
						price: 1499.99,
					},
					{
						RAM: "16GB",
						Storage: "1TB SSD",
						Color: "Silver",
						stock: 8,
						price: 1499.99,
					},
					{
						RAM: "32GB",
						Storage: "512GB SSD",
						Color: "Space Gray",
						stock: 8,
						price: 1599.99,
					},
					{
						RAM: "32GB",
						Storage: "512GB SSD",
						Color: "Silver",
						stock: 6,
						price: 1599.99,
					},
					{
						RAM: "32GB",
						Storage: "1TB SSD",
						Color: "Space Gray",
						stock: 5,
						price: 1799.99,
					},
					{
						RAM: "32GB",
						Storage: "1TB SSD",
						Color: "Silver",
						stock: 4,
						price: 1799.99,
					},
				],
				images: [
					"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
					"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80",
				],
			},
			{
				name: "Tablet Pro",
				description:
					"11-inch tablet with high-resolution display, powerful chip, and support for stylus. Perfect for work, creativity, and entertainment. Includes 128GB storage and cellular option.",
				price: new Prisma.Decimal("649.99"),
				stock: 0,
				published: true,
				storeSlug: "fatima-electronics",
				categoryName: "Tablets",
				hasVariants: true,
				variantOptions: [
					{ name: "Storage", values: ["128GB", "256GB", "512GB"] },
					{ name: "Connectivity", values: ["Wi-Fi", "Wi-Fi + Cellular"] },
				],
				variants: [
					{ Storage: "128GB", Connectivity: "Wi-Fi", stock: 30, price: 649.99 },
					{
						Storage: "128GB",
						Connectivity: "Wi-Fi + Cellular",
						stock: 20,
						price: 799.99,
					},
					{ Storage: "256GB", Connectivity: "Wi-Fi", stock: 25, price: 749.99 },
					{
						Storage: "256GB",
						Connectivity: "Wi-Fi + Cellular",
						stock: 18,
						price: 899.99,
					},
					{ Storage: "512GB", Connectivity: "Wi-Fi", stock: 15, price: 949.99 },
					{
						Storage: "512GB",
						Connectivity: "Wi-Fi + Cellular",
						stock: 10,
						price: 1099.99,
					},
				],
				images: [
					"https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
					"https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=80",
				],
			},

			// ========== OMAR'S HOME ESSENTIALS ==========
			{
				name: "Stainless Steel Cookware Set",
				description:
					"10-piece premium cookware set for your kitchen. Features tri-ply construction, heat-resistant handles, and compatible with all cooktops including induction. Dishwasher safe.",
				price: new Prisma.Decimal("179.99"),
				stock: 0,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Kitchen",
				hasVariants: true,
				variantOptions: [
					{ name: "Set Size", values: ["10-Piece", "14-Piece", "18-Piece"] },
					{ name: "Material", values: ["Stainless Steel", "Non-Stick"] },
				],
				variants: [
					{
						"Set Size": "10-Piece",
						Material: "Stainless Steel",
						stock: 20,
						price: 179.99,
					},
					{
						"Set Size": "10-Piece",
						Material: "Non-Stick",
						stock: 15,
						price: 199.99,
					},
					{
						"Set Size": "14-Piece",
						Material: "Stainless Steel",
						stock: 15,
						price: 249.99,
					},
					{
						"Set Size": "14-Piece",
						Material: "Non-Stick",
						stock: 12,
						price: 269.99,
					},
					{
						"Set Size": "18-Piece",
						Material: "Stainless Steel",
						stock: 10,
						price: 329.99,
					},
					{
						"Set Size": "18-Piece",
						Material: "Non-Stick",
						stock: 8,
						price: 349.99,
					},
				],
				images: [
					"https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
					"https://images.unsplash.com/photo-1556911220-e15b29be4c7b?w=800&q=80",
				],
			},
			{
				name: "Memory Foam Pillow Set",
				description:
					"Set of 2 ergonomic memory foam pillows with cooling gel layer. Features adjustable height, hypoallergenic materials, and machine washable cover. Perfect for side, back, and stomach sleepers.",
				price: new Prisma.Decimal("59.99"),
				stock: 0,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Bedding",
				hasVariants: true,
				variantOptions: [
					{ name: "Firmness", values: ["Soft", "Medium", "Firm"] },
					{ name: "Size", values: ["Standard", "Queen", "King"] },
				],
				variants: [
					{ Firmness: "Soft", Size: "Standard", stock: 25, price: 59.99 },
					{ Firmness: "Soft", Size: "Queen", stock: 30, price: 64.99 },
					{ Firmness: "Soft", Size: "King", stock: 20, price: 69.99 },
					{ Firmness: "Medium", Size: "Standard", stock: 35, price: 59.99 },
					{ Firmness: "Medium", Size: "Queen", stock: 40, price: 64.99 },
					{ Firmness: "Medium", Size: "King", stock: 28, price: 69.99 },
					{ Firmness: "Firm", Size: "Standard", stock: 20, price: 59.99 },
					{ Firmness: "Firm", Size: "Queen", stock: 25, price: 64.99 },
					{ Firmness: "Firm", Size: "King", stock: 18, price: 69.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80",
					"https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
				],
			},
			{
				name: "LED Desk Lamp",
				description:
					"Adjustable LED desk lamp with USB charging port. Features 5 brightness levels, 3 color temperatures, touch control, and flexible gooseneck design. Energy-efficient and eye-friendly.",
				price: new Prisma.Decimal("39.99"),
				stock: 45,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Lighting",
				hasVariants: false,
				images: [
					"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
				],
			},
			{
				name: "Modern Coffee Table",
				description:
					"Sleek modern coffee table with tempered glass top and metal frame. Features hidden storage compartment and scratch-resistant surface. Perfect for living rooms and modern interiors.",
				price: new Prisma.Decimal("299.99"),
				stock: 0,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Furniture",
				hasVariants: true,
				variantOptions: [
					{
						name: "Size",
						values: ["Small (100cm)", "Medium (120cm)", "Large (150cm)"],
					},
					{ name: "Color", values: ["Black", "White", "Walnut"] },
				],
				variants: [
					{ Size: "Small (100cm)", Color: "Black", stock: 8, price: 299.99 },
					{ Size: "Small (100cm)", Color: "White", stock: 6, price: 299.99 },
					{ Size: "Small (100cm)", Color: "Walnut", stock: 5, price: 319.99 },
					{ Size: "Medium (120cm)", Color: "Black", stock: 12, price: 349.99 },
					{ Size: "Medium (120cm)", Color: "White", stock: 10, price: 349.99 },
					{ Size: "Medium (120cm)", Color: "Walnut", stock: 8, price: 369.99 },
					{ Size: "Large (150cm)", Color: "Black", stock: 6, price: 399.99 },
					{ Size: "Large (150cm)", Color: "White", stock: 5, price: 399.99 },
					{ Size: "Large (150cm)", Color: "Walnut", stock: 4, price: 419.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
					"https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&q=80",
				],
			},
			{
				name: "Storage Organizer Set",
				description:
					"12-piece storage organizer set with clear bins and labels. Features stackable design, easy-to-clean material, and perfect for closets, pantries, and garages. BPA-free and durable.",
				price: new Prisma.Decimal("49.99"),
				stock: 0,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Storage",
				hasVariants: true,
				variantOptions: [
					{ name: "Set Size", values: ["6-Piece", "12-Piece", "18-Piece"] },
					{ name: "Color", values: ["Clear", "White", "Gray"] },
				],
				variants: [
					{ "Set Size": "6-Piece", Color: "Clear", stock: 30, price: 29.99 },
					{ "Set Size": "6-Piece", Color: "White", stock: 25, price: 29.99 },
					{ "Set Size": "6-Piece", Color: "Gray", stock: 20, price: 29.99 },
					{ "Set Size": "12-Piece", Color: "Clear", stock: 25, price: 49.99 },
					{ "Set Size": "12-Piece", Color: "White", stock: 20, price: 49.99 },
					{ "Set Size": "12-Piece", Color: "Gray", stock: 18, price: 49.99 },
					{ "Set Size": "18-Piece", Color: "Clear", stock: 15, price: 69.99 },
					{ "Set Size": "18-Piece", Color: "White", stock: 12, price: 69.99 },
					{ "Set Size": "18-Piece", Color: "Gray", stock: 10, price: 69.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&q=80",
					"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
				],
			},
			{
				name: "Wall Art Canvas Set",
				description:
					"Set of 3 modern abstract canvas prints. Features high-quality printing, ready-to-hang design, and UV-resistant inks. Perfect for adding style to any room.",
				price: new Prisma.Decimal("79.99"),
				stock: 0,
				published: true,
				storeSlug: "omar-home",
				categoryName: "Decor",
				hasVariants: true,
				variantOptions: [
					{
						name: "Size",
						values: ["Small (30x40cm)", "Medium (40x60cm)", "Large (50x70cm)"],
					},
					{ name: "Style", values: ["Abstract", "Nature", "Geometric"] },
				],
				variants: [
					{
						Size: "Small (30x40cm)",
						Style: "Abstract",
						stock: 20,
						price: 79.99,
					},
					{ Size: "Small (30x40cm)", Style: "Nature", stock: 18, price: 79.99 },
					{
						Size: "Small (30x40cm)",
						Style: "Geometric",
						stock: 15,
						price: 79.99,
					},
					{
						Size: "Medium (40x60cm)",
						Style: "Abstract",
						stock: 15,
						price: 99.99,
					},
					{
						Size: "Medium (40x60cm)",
						Style: "Nature",
						stock: 12,
						price: 99.99,
					},
					{
						Size: "Medium (40x60cm)",
						Style: "Geometric",
						stock: 10,
						price: 99.99,
					},
					{
						Size: "Large (50x70cm)",
						Style: "Abstract",
						stock: 10,
						price: 129.99,
					},
					{ Size: "Large (50x70cm)", Style: "Nature", stock: 8, price: 129.99 },
					{
						Size: "Large (50x70cm)",
						Style: "Geometric",
						stock: 6,
						price: 129.99,
					},
				],
				images: [
					"https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80",
					"https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
				],
			},
		];

		// Resolve stores and categories, validate
		const productData = productDefinitions
			.map((def) => {
				const store = storesBySlug.get(def.storeSlug);
				if (!store) {
					this.error(
						`⚠️  Store not found for product "${def.name}" (slug: ${def.storeSlug}). Skipping.`,
					);
					return null;
				}

				const storeCategories = categoryMap.get(def.storeSlug);
				const categoryId = def.categoryName
					? storeCategories?.get(def.categoryName)
					: undefined;

				if (def.categoryName && !categoryId) {
					this.error(
						`⚠️  Category "${def.categoryName}" not found for product "${def.name}". Skipping.`,
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
					categoryId,
					hasVariants: def.hasVariants ?? false,
					images: def.images,
					variantOptions: def.variantOptions,
					variants: def.variants,
				};
			})
			.filter(
				(product): product is NonNullable<typeof product> => product !== null,
			);

		if (productData.length === 0) {
			this.log(
				"⚠️  No valid products to create. All products were skipped due to missing stores/categories.",
			);
			return;
		}

		// Create products with categories, images, and variants
		const createdProducts = await Promise.all(
			productData.map(async (productInfo) => {
				// Create product base
				const product = await database.product.create({
					data: {
						id: productInfo.id,
						name: productInfo.name,
						description: productInfo.description,
						price: productInfo.price,
						stock: productInfo.stock,
						published: productInfo.published,
						storeId: productInfo.storeId,
						categoryId: productInfo.categoryId,
						hasVariants: productInfo.hasVariants,
						images: {
							create: productInfo.images.map((url) => ({ url })),
						},
					},
				});

				// Create variant options and variants if needed
				if (
					productInfo.hasVariants &&
					productInfo.variantOptions &&
					productInfo.variants
				) {
					// Create variant options and store their IDs
					const optionMap = new Map<
						string,
						{ optionId: string; values: Map<string, string> }
					>();

					for (const optionDef of productInfo.variantOptions) {
						const createdOption = await database.productVariantOption.create({
							data: {
								name: optionDef.name,
								productId: product.id,
								values: {
									create: optionDef.values.map((value) => ({
										value,
									})),
								},
							},
							include: {
								values: true,
							},
						});

						const valueMap = new Map<string, string>();
						for (const value of createdOption.values) {
							valueMap.set(value.value, value.id);
						}

						optionMap.set(optionDef.name, {
							optionId: createdOption.id,
							values: valueMap,
						});
					}

					// Create variants
					for (const variantDef of productInfo.variants) {
						const variantSelections: Array<{
							optionId: string;
							valueId: string;
						}> = [];

						// Build selections from variant definition
						for (const [optionName, valueString] of Object.entries(
							variantDef,
						)) {
							if (optionName === "stock" || optionName === "price") continue;

							const optionData = optionMap.get(optionName);
							if (!optionData) {
								this.error(
									`⚠️  Option "${optionName}" not found for variant. Skipping variant.`,
								);
								continue;
							}

							const valueId = optionData.values.get(valueString as string);
							if (!valueId) {
								this.error(
									`⚠️  Value "${valueString}" not found for option "${optionName}". Skipping variant.`,
								);
								continue;
							}

							variantSelections.push({
								optionId: optionData.optionId,
								valueId,
							});
						}

						if (variantSelections.length > 0) {
							await database.productVariant.create({
								data: {
									price: variantDef.price
										? new Prisma.Decimal(variantDef.price.toString())
										: null,
									stock: variantDef.stock,
									productId: product.id,
									selections: {
										create: variantSelections.map((s) => ({
											optionId: s.optionId,
											valueId: s.valueId,
										})),
									},
								},
							});
						}
					}
				}

				return product;
			}),
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

		const productsWithVariants = productData.filter(
			(p) => p.hasVariants,
		).length;
		const totalVariants = productData
			.filter((p) => p.hasVariants && p.variants)
			.reduce((sum, p) => sum + (p.variants?.length || 0), 0);

		this.log(`✅ Created ${createdProducts.length} products with images`);
		if (productsWithVariants > 0) {
			this.log(
				`✅ ${productsWithVariants} products include variants (${totalVariants} total variants)`,
			);
		}
	}
}
