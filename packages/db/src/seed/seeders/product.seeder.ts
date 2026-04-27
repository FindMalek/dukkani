import { generateProductId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import { Prisma } from "../../../prisma/generated/client";
import {
  ProductAddonSelectionType,
  ProductVersionStatus,
} from "../../../prisma/generated/enums";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

/**
 * Denormalize min/max effective variant sell prices (mirrors
 * ProductVersionService.recomputeVariantEffectivePriceBounds; db package does not
 * depend on @dukkani/common).
 */
async function recomputeVariantEffectivePriceBoundsForSeed(
  database: PrismaClient,
  productVersionId: string,
  versionBasePrice: Prisma.Decimal,
): Promise<void> {
  const variants = await database.productVariant.findMany({
    where: { productVersionId },
    select: { price: true },
  });
  if (variants.length === 0) {
    return;
  }
  const toNum = (d: Prisma.Decimal) => Number(d);
  const base = toNum(versionBasePrice);
  const prices = variants.map((row) =>
    row.price != null ? toNum(row.price) : base,
  );
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  await database.productVersion.update({
    where: { id: productVersionId },
    data: {
      variantEffectivePriceMin: new Prisma.Decimal(min),
      variantEffectivePriceMax: new Prisma.Decimal(max),
    },
  });
}

type AddonOptionDef = { name: string; priceDelta: number; stock: number };
type AddonGroupDef = {
  name: string;
  selectionType: ProductAddonSelectionType;
  required: boolean;
  options: AddonOptionDef[];
};

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
    const existingProducts = await database.product.findMany({
      include: {
        currentPublishedVersion: { select: { name: true, price: true } },
      },
    });
    if (existingProducts.length > 0) {
      this.log(`Skipping: ${existingProducts.length} products already exist`);
      for (const product of existingProducts) {
        const v = product.currentPublishedVersion;
        if (!v?.name) {
          this.error(
            `Product ${product.id} has no current published version name; fix data or republish — not adding to seededProducts.`,
          );
          continue;
        }
        this.seededProducts.push({
          id: product.id,
          name: v.name,
          storeId: product.storeId,
          price: v.price ?? new Prisma.Decimal(0),
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
      if (storeSlug === "amine-fashion") {
        categoryNames.push(
          "Vestes",
          "Chaussures",
          "Accessoires",
          "T-Shirts",
          "Pantalons",
          "Montres",
          "Traditionnel",
        );
      } else if (storeSlug === "sana-electronics") {
        categoryNames.push(
          "Audio",
          "Wearables",
          "Chargeurs",
          "Smartphones",
          "Laptops",
          "Tablettes",
          "Accessoires PC",
        );
      } else if (storeSlug === "yassine-home") {
        categoryNames.push(
          "Cuisine",
          "Literie",
          "Éclairage",
          "Mobilier",
          "Rangement",
          "Décoration",
          "Art de la Table",
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
          "Veste en cuir véritable haut de gamme avec design moderne. Cuir italien premium, doublure matelassée, multiples poches. Parfaite toutes saisons avec doublure intérieure amovible.",
        price: new Prisma.Decimal("349.99"),
        stock: 0,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Vestes",
        hasVariants: true,
        addonGroups: [
          {
            name: "Personnalisation",
            selectionType: ProductAddonSelectionType.MULTIPLE,
            required: false,
            options: [
              { name: "Monogramme initiales", priceDelta: 20, stock: 999 },
              { name: "Emballage cadeau premium", priceDelta: 10, stock: 999 },
            ],
          },
        ],
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
        storeSlug: "amine-fashion",
        categoryName: "Chaussures",
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
        storeSlug: "amine-fashion",
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
        storeSlug: "amine-fashion",
        categoryName: "Accessoires",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
          "https://images.unsplash.com/photo-1511499767150-a48a237f0b84?w=800&q=80",
        ],
      },
      {
        name: "Classic Leather Belt",
        description:
          "Genuine full-grain leather belt with polished buckle. Adjustable sizing and double-stitch construction for long-lasting daily wear.",
        price: new Prisma.Decimal("45.00"),
        stock: 40,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Accessoires",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        ],
      },
      {
        name: "Merino Wool Scarf",
        description:
          "Soft merino wool scarf, lightweight and warm. Ideal for cool evenings; finished edges and available in solid seasonal colors.",
        price: new Prisma.Decimal("35.00"),
        stock: 60,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Accessoires",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1601925260368-af2a9a8a0d66?w=800&q=80",
        ],
      },
      {
        name: "Slim Fit Chinos",
        description:
          "Classic slim-fit chinos in premium cotton twill. Features stretch fabric for comfort, wrinkle-resistant finish, and perfect for both casual and smart-casual occasions.",
        price: new Prisma.Decimal("79.99"),
        stock: 0,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Pantalons",
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
        storeSlug: "amine-fashion",
        categoryName: "Montres",
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
        name: "Écouteurs Bluetooth Sans Fil Pro",
        description:
          "Écouteurs sans fil à réduction de bruit avec 30h d'autonomie, résistance IPX7 et son premium. Contrôle tactile et boîtier de charge sans fil inclus.",
        price: new Prisma.Decimal("129.99"),
        stock: 0,
        published: true,
        storeSlug: "sana-electronics",
        categoryName: "Audio",
        hasVariants: true,
        addonGroups: [
          {
            name: "Accessoires",
            selectionType: ProductAddonSelectionType.MULTIPLE,
            required: false,
            options: [
              { name: "Étui de protection rigide", priceDelta: 25, stock: 50 },
              {
                name: "Câble de recharge supplémentaire",
                priceDelta: 15,
                stock: 80,
              },
            ],
          },
        ],
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
        storeSlug: "sana-electronics",
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
        storeSlug: "sana-electronics",
        categoryName: "Chargeurs",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
          "https://images.unsplash.com/photo-1609091839311-d5365f5bf239?w=800&q=80",
        ],
      },
      {
        name: "Aluminum Laptop Stand",
        description:
          "Ergonomic ventilated stand for 13- to 16-inch laptops. Folds flat for travel and supports better posture and cooling.",
        price: new Prisma.Decimal("42.00"),
        stock: 50,
        published: true,
        storeSlug: "sana-electronics",
        categoryName: "Laptops",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1527864550417-7fd1fc5e7d0d?w=800&q=80",
        ],
      },
      {
        name: "HDMI 2.1 Certified Cable",
        description:
          "2-meter HDMI 2.1 cable for 4K/120Hz and 8K sources. Durable braiding and gold-plated connectors for reliable signal.",
        price: new Prisma.Decimal("19.99"),
        stock: 120,
        published: true,
        storeSlug: "sana-electronics",
        categoryName: "Chargeurs",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1588508065123-5abd63b1ef02?w=800&q=80",
        ],
      },
      {
        name: "Premium Smartphone",
        description:
          "Latest flagship smartphone with 6.7-inch OLED display, triple camera system, 256GB storage, and 5G connectivity. Features wireless charging and IP68 water resistance.",
        price: new Prisma.Decimal("899.99"),
        stock: 0,
        published: true,
        storeSlug: "sana-electronics",
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
        storeSlug: "sana-electronics",
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
        storeSlug: "sana-electronics",
        categoryName: "Tablettes",
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
        storeSlug: "yassine-home",
        categoryName: "Cuisine",
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
        storeSlug: "yassine-home",
        categoryName: "Literie",
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
        name: "Lampe de Bureau LED",
        description:
          "Lampe LED réglable avec port USB. 5 niveaux de luminosité, 3 températures de couleur, commande tactile et col de cygne flexible. Économique et douce pour les yeux.",
        price: new Prisma.Decimal("39.99"),
        stock: 45,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Éclairage",
        hasVariants: false,
        addonGroups: [
          {
            name: "Service",
            selectionType: ProductAddonSelectionType.SINGLE,
            required: false,
            options: [
              { name: "Livraison standard", priceDelta: 0, stock: 999 },
              {
                name: "Livraison express + installation",
                priceDelta: 30,
                stock: 999,
              },
            ],
          },
        ],
        images: [
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        ],
      },
      {
        name: "Bamboo Cutting Board",
        description:
          "Thick end-grain bamboo board for everyday prep. Knife-friendly surface and juice groove; oil occasionally for a long life.",
        price: new Prisma.Decimal("32.00"),
        stock: 70,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Cuisine",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1621996346565-e3dbc353d0e0?w=800&q=80",
        ],
      },
      {
        name: "Ceramic Planter Set",
        description:
          "Set of three modern ceramic pots with matching saucers. Drainage holes and matte finish; ideal for indoor herbs and succulents.",
        price: new Prisma.Decimal("28.00"),
        stock: 55,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Décoration",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80",
        ],
      },
      {
        name: "Modern Coffee Table",
        description:
          "Sleek modern coffee table with tempered glass top and metal frame. Features hidden storage compartment and scratch-resistant surface. Perfect for living rooms and modern interiors.",
        price: new Prisma.Decimal("299.99"),
        stock: 0,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Mobilier",
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
        storeSlug: "yassine-home",
        categoryName: "Rangement",
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
        storeSlug: "yassine-home",
        categoryName: "Décoration",
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

      // ========== AMINE'S FASHION — additional Tunisian items ==========
      {
        name: "Burnous Traditionnel",
        description:
          "Burnous artisanal en laine vierge, tissé à la main dans les ateliers de Sfax. Chaud et élégant, idéal pour les soirées fraîches. Broderie traditionnelle sur les bordures.",
        price: new Prisma.Decimal("189.99"),
        stock: 0,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Traditionnel",
        hasVariants: true,
        addonGroups: [
          {
            name: "Broderie Personnalisée",
            selectionType: ProductAddonSelectionType.SINGLE,
            required: false,
            options: [
              { name: "Sans broderie", priceDelta: 0, stock: 999 },
              { name: "Broderie initiales dorées", priceDelta: 35, stock: 999 },
            ],
          },
        ],
        variantOptions: [
          { name: "Taille", values: ["S", "M", "L", "XL"] },
          { name: "Couleur", values: ["Blanc cassé", "Beige", "Gris"] },
        ],
        variants: [
          { Taille: "S", Couleur: "Blanc cassé", stock: 8, price: 189.99 },
          { Taille: "S", Couleur: "Beige", stock: 6, price: 189.99 },
          { Taille: "S", Couleur: "Gris", stock: 5, price: 189.99 },
          { Taille: "M", Couleur: "Blanc cassé", stock: 12, price: 189.99 },
          { Taille: "M", Couleur: "Beige", stock: 10, price: 189.99 },
          { Taille: "M", Couleur: "Gris", stock: 8, price: 189.99 },
          { Taille: "L", Couleur: "Blanc cassé", stock: 10, price: 199.99 },
          { Taille: "L", Couleur: "Beige", stock: 8, price: 199.99 },
          { Taille: "L", Couleur: "Gris", stock: 7, price: 199.99 },
          { Taille: "XL", Couleur: "Blanc cassé", stock: 6, price: 209.99 },
          { Taille: "XL", Couleur: "Beige", stock: 5, price: 209.99 },
          { Taille: "XL", Couleur: "Gris", stock: 4, price: 209.99 },
        ],
        images: [
          "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
        ],
      },
      {
        name: "Sac en Bandoulière Cuir",
        description:
          "Sac en bandoulière en cuir naturel de qualité supérieure. Fabriqué à la main, avec compartiments multiples et fermeture zippée. Design intemporel adapté à tous les styles.",
        price: new Prisma.Decimal("75.00"),
        stock: 35,
        published: true,
        storeSlug: "amine-fashion",
        categoryName: "Accessoires",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
        ],
      },

      // ========== SANA'S ELECTRONICS — additional items ==========
      {
        name: "Station de Recharge Sans Fil",
        description:
          "Chargeur à induction 15W compatible Qi pour smartphones, écouteurs et montres connectées. Charge simultanée de 3 appareils. Certification CE et protection contre la surchauffe.",
        price: new Prisma.Decimal("49.99"),
        stock: 60,
        published: true,
        storeSlug: "sana-electronics",
        categoryName: "Chargeurs",
        hasVariants: false,
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
          "https://images.unsplash.com/photo-1609091839311-d5365f5bf239?w=800&q=80",
        ],
      },
      {
        name: "Housse Laptop Universelle",
        description:
          "Housse de protection en néoprène haute densité pour ordinateurs portables. Résistante aux chocs et à l'eau. Compartiment supplémentaire pour accessoires.",
        price: new Prisma.Decimal("22.00"),
        stock: 0,
        published: true,
        storeSlug: "sana-electronics",
        categoryName: "Accessoires PC",
        hasVariants: true,
        variantOptions: [
          { name: "Taille", values: ['13"', '14"', '15.6"'] },
          { name: "Couleur", values: ["Noir", "Gris", "Bleu marine"] },
        ],
        variants: [
          { Taille: '13"', Couleur: "Noir", stock: 20, price: 22.0 },
          { Taille: '13"', Couleur: "Gris", stock: 15, price: 22.0 },
          { Taille: '13"', Couleur: "Bleu marine", stock: 12, price: 22.0 },
          { Taille: '14"', Couleur: "Noir", stock: 25, price: 24.0 },
          { Taille: '14"', Couleur: "Gris", stock: 20, price: 24.0 },
          { Taille: '14"', Couleur: "Bleu marine", stock: 15, price: 24.0 },
          { Taille: '15.6"', Couleur: "Noir", stock: 18, price: 26.0 },
          { Taille: '15.6"', Couleur: "Gris", stock: 14, price: 26.0 },
          { Taille: '15.6"', Couleur: "Bleu marine", stock: 10, price: 26.0 },
        ],
        images: [
          "https://images.unsplash.com/photo-1527864550417-7fd1fc5e7d0d?w=800&q=80",
        ],
      },

      // ========== YASSINE'S MAISON — additional items ==========
      {
        name: "Tajine en Terre Cuite",
        description:
          "Tajine artisanal fabriqué à Nabeul en argile naturelle. Idéal pour les cuissons lentes au four ou sur feu doux. Motifs peints à la main inspirés des traditions tunisiennes.",
        price: new Prisma.Decimal("45.00"),
        stock: 0,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Cuisine",
        hasVariants: true,
        addonGroups: [
          {
            name: "Gravure",
            selectionType: ProductAddonSelectionType.SINGLE,
            required: false,
            options: [
              { name: "Sans gravure", priceDelta: 0, stock: 999 },
              { name: "Gravure prénom personnalisé", priceDelta: 15, stock: 999 },
            ],
          },
        ],
        variantOptions: [
          { name: "Taille", values: ["Petit (22cm)", "Moyen (28cm)", "Grand (34cm)"] },
        ],
        variants: [
          { Taille: "Petit (22cm)", stock: 30, price: 45.0 },
          { Taille: "Moyen (28cm)", stock: 25, price: 55.0 },
          { Taille: "Grand (34cm)", stock: 18, price: 69.0 },
        ],
        images: [
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
        ],
      },
      {
        name: "Nappe de Table Brodée",
        description:
          "Nappe en coton 100% avec broderies artisanales à la main. Motifs floraux traditionnels tunisiens. Lavable en machine. Disponible en plusieurs coloris harmonieux.",
        price: new Prisma.Decimal("35.00"),
        stock: 0,
        published: true,
        storeSlug: "yassine-home",
        categoryName: "Art de la Table",
        hasVariants: true,
        variantOptions: [
          { name: "Couleur", values: ["Blanc", "Écru", "Terracotta"] },
          { name: "Taille", values: ["4 couverts", "6 couverts", "8 couverts"] },
        ],
        variants: [
          { Couleur: "Blanc", Taille: "4 couverts", stock: 20, price: 35.0 },
          { Couleur: "Blanc", Taille: "6 couverts", stock: 18, price: 42.0 },
          { Couleur: "Blanc", Taille: "8 couverts", stock: 12, price: 52.0 },
          { Couleur: "Écru", Taille: "4 couverts", stock: 18, price: 35.0 },
          { Couleur: "Écru", Taille: "6 couverts", stock: 15, price: 42.0 },
          { Couleur: "Écru", Taille: "8 couverts", stock: 10, price: 52.0 },
          { Couleur: "Terracotta", Taille: "4 couverts", stock: 15, price: 38.0 },
          { Couleur: "Terracotta", Taille: "6 couverts", stock: 12, price: 45.0 },
          { Couleur: "Terracotta", Taille: "8 couverts", stock: 8, price: 55.0 },
        ],
        images: [
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
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

        const hasVariants = def.hasVariants === true;
        return {
          id: generateProductId(store.slug),
          name: def.name,
          description: def.description,
          price: hasVariants
            ? new Prisma.Decimal(0)
            : (def.price ?? new Prisma.Decimal(0)),
          stock: hasVariants ? 0 : def.stock,
          referencePriceForSeededProduct: def.price,
          published: def.published,
          storeId: store.id,
          categoryId,
          hasVariants: def.hasVariants ?? false,
          images: def.images,
          variantOptions: def.variantOptions,
          variants: def.variants,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          addonGroups: (def as any).addonGroups as AddonGroupDef[] | undefined,
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
        const product = await database.product.create({
          data: {
            id: productInfo.id,
            published: productInfo.published,
            storeId: productInfo.storeId,
            categoryId: productInfo.categoryId,
          },
        });

        const version = await database.productVersion.create({
          data: {
            productId: product.id,
            status: ProductVersionStatus.PUBLISHED,
            versionNumber: 1,
            name: productInfo.name,
            description: productInfo.description ?? null,
            price: productInfo.price,
            stock: productInfo.stock,
            hasVariants: productInfo.hasVariants,
            images: {
              create: productInfo.images.map((url) => ({ url })),
            },
          },
        });

        await database.product.update({
          where: { id: product.id },
          data: { currentPublishedVersionId: version.id },
        });

        if (
          productInfo.hasVariants &&
          productInfo.variantOptions &&
          productInfo.variants
        ) {
          const optionMap = new Map<
            string,
            { optionId: string; values: Map<string, string> }
          >();

          for (const optionDef of productInfo.variantOptions) {
            const createdOption = await database.productVariantOption.create({
              data: {
                name: optionDef.name,
                productVersionId: version.id,
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

          for (const variantDef of productInfo.variants) {
            const variantSelections: Array<{
              optionId: string;
              valueId: string;
            }> = [];

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
                  productVersionId: version.id,
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

          if (productInfo.variants?.length) {
            await recomputeVariantEffectivePriceBoundsForSeed(
              database,
              version.id,
              productInfo.price,
            );
          }
        }

        // Create addon groups and options if defined
        if (productInfo.addonGroups?.length) {
          for (const groupDef of productInfo.addonGroups) {
            await database.productAddonGroup.create({
              data: {
                name: groupDef.name,
                selectionType: groupDef.selectionType,
                required: groupDef.required,
                productVersionId: version.id,
                options: {
                  create: groupDef.options.map((opt, i) => ({
                    name: opt.name,
                    priceDelta: new Prisma.Decimal(opt.priceDelta.toString()),
                    stock: opt.stock,
                    sortOrder: i,
                  })),
                },
              },
            });
          }
        }

        return product;
      }),
    );

    // Store for export
    for (let i = 0; i < createdProducts.length; i++) {
      const product = createdProducts[i]!;
      const info = productData[i]!;
      this.seededProducts.push({
        id: product.id,
        name: info.name,
        storeId: product.storeId,
        price: info.referencePriceForSeededProduct,
      });
    }

    const productsWithVariants = productData.filter((p) => p.hasVariants).length;
    const totalVariants = productData
      .filter((p) => p.hasVariants && p.variants)
      .reduce((sum, p) => sum + (p.variants?.length || 0), 0);
    const productsWithAddons = productData.filter((p) => p.addonGroups?.length).length;

    this.log(`✅ Created ${createdProducts.length} products with images`);
    if (productsWithVariants > 0) {
      this.log(`✅ ${productsWithVariants} products include variants (${totalVariants} total variants)`);
    }
    if (productsWithAddons > 0) {
      this.log(`✅ ${productsWithAddons} products include addon groups`);
    }

    // Step 3: Create collections per store
    await this.createCollections(database, storesBySlug, createdProducts, productData);
  }

  private async createCollections(
    database: PrismaClient,
    storesBySlug: Map<string, { id: string; slug: string; name: string }>,
    createdProducts: Array<{ id: string; storeId: string }>,
    productData: Array<{ id: string; name: string; storeId: string }>,
  ): Promise<void> {
    // Build a name→id lookup scoped per store
    const productNameToId = new Map<string, string>();
    for (let i = 0; i < createdProducts.length; i++) {
      const info = productData[i]!;
      const product = createdProducts[i]!;
      productNameToId.set(`${product.storeId}::${info.name}`, product.id);
    }

    const collectionDefs: Array<{
      storeSlug: string;
      name: string;
      slug: string;
      description: string;
      position: number;
      productNames: string[];
    }> = [
      // amine-fashion
      {
        storeSlug: "amine-fashion",
        name: "Nouveautés",
        slug: "nouveautes",
        description: "Nos dernières arrivées",
        position: 0,
        productNames: ["Premium Leather Jacket", "Slim Fit Chinos", "Luxury Watch Collection"],
      },
      {
        storeSlug: "amine-fashion",
        name: "Accessoires & Style",
        slug: "accessoires",
        description: "Complétez votre look",
        position: 1,
        productNames: ["Designer Sunglasses", "Classic Leather Belt", "Sac en Bandoulière Cuir"],
      },
      // sana-electronics
      {
        storeSlug: "sana-electronics",
        name: "Meilleures Offres",
        slug: "meilleures-offres",
        description: "Les meilleurs deals du moment",
        position: 0,
        productNames: ["Écouteurs Bluetooth Sans Fil Pro", "USB-C Fast Charger", "Station de Recharge Sans Fil"],
      },
      {
        storeSlug: "sana-electronics",
        name: "Informatique",
        slug: "informatique",
        description: "Laptops, tablettes et accessoires",
        position: 1,
        productNames: ["Ultrabook Laptop", "Tablet Pro", "Aluminum Laptop Stand"],
      },
      // yassine-home
      {
        storeSlug: "yassine-home",
        name: "Cuisine Tunisienne",
        slug: "cuisine",
        description: "Équipez votre cuisine à la tunisienne",
        position: 0,
        productNames: ["Stainless Steel Cookware Set", "Bamboo Cutting Board", "Tajine en Terre Cuite"],
      },
      {
        storeSlug: "yassine-home",
        name: "Décoration",
        slug: "decoration",
        description: "Embellissez votre intérieur",
        position: 1,
        productNames: ["Ceramic Planter Set", "Wall Art Canvas Set", "Lampe de Bureau LED"],
      },
    ];

    let collectionCount = 0;
    let memberCount = 0;

    for (const colDef of collectionDefs) {
      const store = storesBySlug.get(colDef.storeSlug);
      if (!store) continue;

      const collection = await database.collection.create({
        data: {
          name: colDef.name,
          slug: colDef.slug,
          description: colDef.description,
          position: colDef.position,
          storeId: store.id,
        },
      });
      collectionCount++;

      const productIds = colDef.productNames
        .map((name) => productNameToId.get(`${store.id}::${name}`))
        .filter((id): id is string => id !== undefined);

      if (productIds.length > 0) {
        await database.productCollection.createMany({
          data: productIds.map((productId, position) => ({
            productId,
            collectionId: collection.id,
            position,
          })),
          skipDuplicates: true,
        });
        memberCount += productIds.length;
      }
    }

    this.log(`✅ Created ${collectionCount} collections with ${memberCount} product memberships`);
  }
}
