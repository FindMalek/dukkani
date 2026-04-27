import { generateOrderId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import {
  OrderStatus,
  PaymentMethod,
  type Prisma,
} from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { CustomerSeeder } from "./customer.seeder";
import type { ProductSeeder } from "./product.seeder";
import type { StoreSeeder } from "./store.seeder";

type OrderItemSeed = {
  productId: string;
  quantity: number;
  /**
   * Catalog list price (used if the version has no price or no variant line price).
   */
  price: Prisma.Decimal;
};

type OrderSeedDef = {
  id: string;
  status: OrderStatus;
  notes?: string;
  storeId: string;
  customerId: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  isWhatsApp: boolean;
  items: OrderItemSeed[];
};

/**
 * Build a line item for seed: match storefront behavior (variant + option snapshots when variants exist).
 */
async function buildSeededOrderItemCreateData(
  database: PrismaClient,
  { productId, quantity, price: listPriceFallback }: OrderItemSeed,
): Promise<{
  productId: string;
  productVersionId: string;
  productVariantId?: string;
  quantity: number;
  price: Prisma.Decimal;
  displayAttributes: {
    create: Array<{
      position: number;
      optionName: string;
      value: string;
    }>;
  };
}> {
  const p = await database.product.findUnique({
    where: { id: productId },
    select: {
      currentPublishedVersionId: true,
      currentPublishedVersion: {
        select: { name: true, price: true },
      },
    },
  });
  const versionId = p?.currentPublishedVersionId;
  if (!versionId || !p.currentPublishedVersion) {
    throw new Error(
      `Order seed: product ${productId} has no published version`,
    );
  }

  const baseName = p.currentPublishedVersion.name;
  const versionBasePrice = p.currentPublishedVersion.price;

  const variantInStock = await database.productVariant.findFirst({
    where: { productVersionId: versionId, stock: { gt: 0 } },
    orderBy: { id: "asc" },
    include: {
      selections: { include: { option: true, value: true } },
    },
  });
  const variant = variantInStock
    ? variantInStock
    : await database.productVariant.findFirst({
        where: { productVersionId: versionId },
        orderBy: { id: "asc" },
        include: {
          selections: { include: { option: true, value: true } },
        },
      });

  if (!variant || variant.selections.length === 0) {
    return {
      productId,
      productVersionId: versionId,
      quantity,
      price: listPriceFallback,
      displayAttributes: {
        create: [{ position: 0, optionName: "Product", value: baseName }],
      },
    };
  }

  const linePrice: Prisma.Decimal =
    variant.price != null
      ? variant.price
      : versionBasePrice != null
        ? versionBasePrice
        : listPriceFallback;

  const rows = [...variant.selections]
    .sort((a, b) => a.option.name.localeCompare(b.option.name))
    .map((s, position) => ({
      position,
      optionName: s.option.name,
      value: s.value.value,
    }));

  return {
    productId,
    productVersionId: versionId,
    productVariantId: variant.id,
    quantity,
    price: linePrice,
    displayAttributes: {
      create:
        rows.length > 0
          ? rows
          : [{ position: 0, optionName: "Product", value: baseName }],
    },
  };
}

/**
 * Seeder for Order model
 * Creates orders with order items linked to stores, products, and customers
 * Exports orders for use in other seeders
 */
export interface SeededOrder {
  id: string;
  status: OrderStatus;
  storeId: string;
  customerId: string;
}

export class OrderSeeder extends BaseSeeder {
  name = "OrderSeeder";
  order = 5; // Run after all other seeders

  // Export seeded orders for use in other seeders
  public seededOrders: SeededOrder[] = [];

  /**
   * Find orders by store slug
   */
  findByStoreSlug(storeSlug: string): SeededOrder[] {
    const store = this.storeSeeder?.findBySlug(storeSlug);
    if (!store) return [];
    return this.seededOrders.filter((o) => o.storeId === store.id);
  }

  /**
   * Get all orders grouped by store slug
   */
  getOrdersByStoreSlug(): Map<string, SeededOrder[]> {
    const map = new Map<string, SeededOrder[]>();
    for (const order of this.seededOrders) {
      const store = this.storeSeeder?.findById(order.storeId);
      if (store) {
        const existing = map.get(store.slug) || [];
        existing.push(order);
        map.set(store.slug, existing);
      }
    }
    return map;
  }

  private storeSeeder?: StoreSeeder;
  private productSeeder?: ProductSeeder;
  private customerSeeder?: CustomerSeeder;

  /**
   * Set the required seeder instances
   */
  setSeeders(
    storeSeeder: StoreSeeder,
    productSeeder: ProductSeeder,
    customerSeeder: CustomerSeeder,
  ): void {
    this.storeSeeder = storeSeeder;
    this.productSeeder = productSeeder;
    this.customerSeeder = customerSeeder;
  }

  async seed(database: PrismaClient): Promise<void> {
    this.log("Starting Order seeding...");

    if (!this.storeSeeder || !this.productSeeder || !this.customerSeeder) {
      throw new Error(
        "StoreSeeder, ProductSeeder, and CustomerSeeder must be set before running OrderSeeder",
      );
    }

    // Check if orders already exist
    const existingOrders = await database.order.findMany();
    if (existingOrders.length > 0) {
      this.log(`Skipping: ${existingOrders.length} orders already exist`);
      // Load existing orders for export
      for (const order of existingOrders) {
        this.seededOrders.push({
          id: order.id,
          status: order.status,
          storeId: order.storeId,
          customerId: order.customerId,
        });
      }
      return;
    }

    const storesBySlug = this.storeSeeder.getStoresBySlug();
    const productsByStoreSlug = this.productSeeder.getProductsByStoreSlug();
    const customersByStoreSlug = this.customerSeeder.getCustomersByStoreSlug();

    if (storesBySlug.size === 0 || productsByStoreSlug.size === 0) {
      this.log("⚠️  No stores or products found. Skipping order creation.");
      return;
    }

    const orderData: OrderSeedDef[] = [];

    for (const [storeSlug, store] of storesBySlug) {
      const storeProducts = productsByStoreSlug.get(storeSlug) || [];
      const storeCustomers = customersByStoreSlug.get(storeSlug) || [];

      if (storeProducts.length === 0 || storeCustomers.length === 0) {
        this.log(
          `⚠️  Missing products or customers for store "${store.name}" (${storeSlug}). Skipping orders.`,
        );
        continue;
      }

      // Order 1: Confirmed, COD, first customer
      const customer1 = storeCustomers[0];
      if (customer1 && storeProducts.length >= 2) {
        const address1 = this.customerSeeder?.findAddressByCustomerId(
          customer1.id,
        );
        if (address1?.id) {
          orderData.push({
            id: generateOrderId(store.slug),
            status: OrderStatus.CONFIRMED,
            notes: "Please deliver before 5 PM",
            storeId: store.id,
            customerId: customer1.id,
            addressId: address1.id,
            paymentMethod: PaymentMethod.COD,
            isWhatsApp: false,
            items: storeProducts.slice(0, 2).map((p) => ({
              productId: p.id,
              quantity: 1,
              price: p.price,
            })),
          });
        } else {
          this.log(
            `⚠️  Skipping confirmed order for ${store.name}: no address for customer ${customer1.id}`,
          );
        }
      }

      // Order 2: Processing, online card, WhatsApp thread
      const customer2 = storeCustomers[1] ?? storeCustomers[0];
      if (customer2 && storeProducts.length > 1) {
        const address2 = this.customerSeeder?.findAddressByCustomerId(
          customer2.id,
        );
        if (address2?.id) {
          orderData.push({
            id: generateOrderId(store.slug),
            status: OrderStatus.PROCESSING,
            notes: "Gift receipt inside the box please",
            storeId: store.id,
            customerId: customer2.id,
            addressId: address2.id,
            paymentMethod: PaymentMethod.CARD,
            isWhatsApp: true,
            items: storeProducts.slice(1, 3).map((p) => ({
              productId: p.id,
              quantity: 2,
              price: p.price,
            })),
          });
        } else {
          this.log(
            `⚠️  Skipping processing order for ${store.name}: no address for customer ${customer2.id}`,
          );
        }
      }

      // Order 3: Pending, COD + WhatsApp, with delivery address (same as checkout)
      const customer3 = storeCustomers[0];
      const selectedProduct = storeProducts[0];
      if (customer3 && selectedProduct) {
        const address3 = this.customerSeeder?.findAddressByCustomerId(
          customer3.id,
        );
        if (address3?.id) {
          orderData.push({
            id: generateOrderId(store.slug),
            status: OrderStatus.PENDING,
            notes: "Apartment 4B — please ring the video intercom twice",
            storeId: store.id,
            customerId: customer3.id,
            addressId: address3.id,
            paymentMethod: PaymentMethod.COD,
            isWhatsApp: true,
            items: [
              {
                productId: selectedProduct.id,
                quantity: 1,
                price: selectedProduct.price,
              },
            ],
          });
        } else {
          this.log(
            `⚠️  Skipping pending order for ${store.name}: no address for customer ${customer3.id}`,
          );
        }
      }
    }

    if (orderData.length === 0) {
      this.log("⚠️  No valid orders to create. All orders were skipped.");
      return;
    }

    const createdOrders = await Promise.all(
      orderData.map(async (orderInfo) => {
        const orderItemsCreate = await Promise.all(
          orderInfo.items.map((item) =>
            buildSeededOrderItemCreateData(database, item),
          ),
        );

        return database.order.create({
          data: {
            id: orderInfo.id,
            status: orderInfo.status,
            paymentMethod: orderInfo.paymentMethod,
            isWhatsApp: orderInfo.isWhatsApp,
            notes: orderInfo.notes,
            storeId: orderInfo.storeId,
            customerId: orderInfo.customerId,
            addressId: orderInfo.addressId,
            orderItems: {
              create: orderItemsCreate,
            },
          },
        });
      }),
    );

    for (const order of createdOrders) {
      this.seededOrders.push({
        id: order.id,
        status: order.status,
        storeId: order.storeId,
        customerId: order.customerId,
      });
    }

    this.log(`✅ Created ${createdOrders.length} orders with order items`);
  }
}
