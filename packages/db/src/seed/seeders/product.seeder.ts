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
				categoryNames.push("Jackets", "Shoes", "Accessories");
			} else if (storeSlug === "fatima-electronics") {
				categoryNames.push("Audio", "Wearables", "Chargers");
			} else if (storeSlug === "omar-home") {
				categoryNames.push("Kitchen", "Bedding", "Lighting");
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

		// Step 2: Define products with categories and variant support
		const productDefinitions = [
			// Products for Ahmed's Fashion Boutique (FASHION)
			{
				name: "Premium Leather Jacket",
				description: "Handcrafted genuine leather jacket with modern design",
				price: new Prisma.Decimal("299.99"),
				stock: 25,
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Jackets",
				hasVariants: false,
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
				categoryName: "Accessories",
				hasVariants: false,
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
				categoryName: "Shoes",
				hasVariants: false,
				images: [
					"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
				],
			},
			{
				name: "Premium Cotton T-Shirt",
				description:
					"Soft, breathable cotton t-shirt available in multiple sizes and colors",
				price: new Prisma.Decimal("29.99"),
				stock: 0, // Stock managed by variants
				published: true,
				storeSlug: "ahmed-fashion",
				categoryName: "Jackets", // Using existing category
				hasVariants: true,
				variantOptions: [
					{
						name: "Size",
						values: ["S", "M", "L", "XL"],
					},
					{
						name: "Color",
						values: ["Black", "White", "Navy"],
					},
				],
				variants: [
					{ Size: "S", Color: "Black", stock: 10, price: 29.99 },
					{ Size: "S", Color: "White", stock: 8, price: 29.99 },
					{ Size: "S", Color: "Navy", stock: 12, price: 29.99 },
					{ Size: "M", Color: "Black", stock: 15, price: 29.99 },
					{ Size: "M", Color: "White", stock: 20, price: 29.99 },
					{ Size: "M", Color: "Navy", stock: 18, price: 29.99 },
					{ Size: "L", Color: "Black", stock: 10, price: 29.99 },
					{ Size: "L", Color: "White", stock: 15, price: 29.99 },
					{ Size: "L", Color: "Navy", stock: 12, price: 29.99 },
					{ Size: "XL", Color: "Black", stock: 5, price: 31.99 },
					{ Size: "XL", Color: "White", stock: 8, price: 31.99 },
					{ Size: "XL", Color: "Navy", stock: 6, price: 31.99 },
				],
				images: [
					"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
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
				categoryName: "Audio",
				hasVariants: false,
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
				categoryName: "Wearables",
				hasVariants: false,
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
				categoryName: "Chargers",
				hasVariants: false,
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
				categoryName: "Kitchen",
				hasVariants: false,
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
				categoryName: "Bedding",
				hasVariants: false,
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
				categoryName: "Lighting",
				hasVariants: false,
				images: [
					"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
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
						// Assuming variantDef has properties like { size: "M", color: "Red" }
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
		this.log(`✅ Created ${createdProducts.length} products with images`);
		if (productsWithVariants > 0) {
			this.log(`✅ ${productsWithVariants} products include variants`);
		}
	}
}
