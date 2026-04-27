import { generateOrderId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import {
  OrderStatus,
  PaymentMethod,
  WhatsAppMessageStatus,
  type Prisma,
} from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { CustomerSeeder } from "./customer.seeder";
import type { ProductSeeder } from "./product.seeder";
import type { StoreSeeder } from "./store.seeder";

type OrderItemSeed = {
  productId: string;
  quantity: number;
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
 * Build a line item for seed: match storefront behavior (variant + addon snapshots where present).
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
    create: Array<{ position: number; optionName: string; value: string }>;
  };
  addonSelections?: {
    create: Array<{
      addonOptionId: string;
      groupNameSnapshot: string;
      optionNameSnapshot: string;
      priceDeltaSnapshot: Prisma.Decimal;
      quantity: number;
    }>;
  };
}> {
  const p = await database.product.findUnique({
    where: { id: productId },
    select: {
      currentPublishedVersionId: true,
      currentPublishedVersion: { select: { name: true, price: true } },
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

  // Resolve variant
  const variantInStock = await database.productVariant.findFirst({
    where: { productVersionId: versionId, stock: { gt: 0 } },
    orderBy: { id: "asc" },
    include: { selections: { include: { option: true, value: true } } },
  });
  const variant =
    variantInStock ??
    (await database.productVariant.findFirst({
      where: { productVersionId: versionId },
      orderBy: { id: "asc" },
      include: { selections: { include: { option: true, value: true } } },
    }));

  const linePrice: Prisma.Decimal =
    variant?.price != null
      ? variant.price
      : versionBasePrice != null
        ? versionBasePrice
        : listPriceFallback;

  let displayRows: Array<{
    position: number;
    optionName: string;
    value: string;
  }>;

  if (!variant || variant.selections.length === 0) {
    displayRows = [{ position: 0, optionName: "Product", value: baseName }];
  } else {
    displayRows = [...variant.selections]
      .sort((a, b) => a.option.name.localeCompare(b.option.name))
      .map((s, position) => ({
        position,
        optionName: s.option.name,
        value: s.value.value,
      }));
    if (displayRows.length === 0) {
      displayRows = [{ position: 0, optionName: "Product", value: baseName }];
    }
  }

  // Collect addon selections: pick the first option from each addon group
  const addonGroups = await database.productAddonGroup.findMany({
    where: { productVersionId: versionId },
    include: { options: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });

  const addonCreate = addonGroups
    .filter((g) => g.options.length > 0)
    .map((g) => {
      const opt = g.options[0]!;
      return {
        addonOptionId: opt.id,
        groupNameSnapshot: g.name,
        optionNameSnapshot: opt.name,
        priceDeltaSnapshot: opt.priceDelta,
        quantity: 1,
      };
    });

  return {
    productId,
    productVersionId: versionId,
    ...(variant ? { productVariantId: variant.id } : {}),
    quantity,
    price: linePrice,
    displayAttributes: { create: displayRows },
    ...(addonCreate.length > 0
      ? { addonSelections: { create: addonCreate } }
      : {}),
  };
}

export interface SeededOrder {
  id: string;
  status: OrderStatus;
  storeId: string;
  customerId: string;
}

export class OrderSeeder extends BaseSeeder {
  name = "OrderSeeder";
  order = 5;

  public seededOrders: SeededOrder[] = [];

  findByStoreSlug(storeSlug: string): SeededOrder[] {
    const store = this.storeSeeder?.findBySlug(storeSlug);
    if (!store) return [];
    return this.seededOrders.filter((o) => o.storeId === store.id);
  }

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

    const existingOrders = await database.order.findMany();
    if (existingOrders.length > 0) {
      this.log(`Skipping: ${existingOrders.length} orders already exist`);
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
          `⚠️  Missing products or customers for store "${store.name}". Skipping.`,
        );
        continue;
      }

      const c0 = storeCustomers[0];
      const c1 = storeCustomers[1] ?? storeCustomers[0];
      const c2 = storeCustomers[2] ?? storeCustomers[0];

      const addr0 = c0
        ? this.customerSeeder.findAddressByCustomerId(c0.id)
        : undefined;
      const addr1 = c1
        ? this.customerSeeder.findAddressByCustomerId(c1.id)
        : undefined;
      const addr2 = c2
        ? this.customerSeeder.findAddressByCustomerId(c2.id)
        : undefined;

      // Order 1: CONFIRMED, COD
      if (c0 && addr0 && storeProducts.length >= 2) {
        orderData.push({
          id: generateOrderId(store.slug),
          status: OrderStatus.CONFIRMED,
          notes: "Livraison avant 18h SVP",
          storeId: store.id,
          customerId: c0.id,
          addressId: addr0.id,
          paymentMethod: PaymentMethod.COD,
          isWhatsApp: false,
          items: storeProducts
            .slice(0, 2)
            .map((p) => ({ productId: p.id, quantity: 1, price: p.price })),
        });
      }

      // Order 2: PROCESSING, CARD, WhatsApp
      if (c1 && addr1 && storeProducts.length > 1) {
        orderData.push({
          id: generateOrderId(store.slug),
          status: OrderStatus.PROCESSING,
          notes: "Besoin d'un reçu cadeau dans la boîte",
          storeId: store.id,
          customerId: c1.id,
          addressId: addr1.id,
          paymentMethod: PaymentMethod.CARD,
          isWhatsApp: true,
          items: storeProducts
            .slice(1, 3)
            .map((p) => ({ productId: p.id, quantity: 2, price: p.price })),
        });
      }

      // Order 3: PENDING, COD, WhatsApp — Arabic note
      if (c0 && addr0 && storeProducts.length >= 1) {
        orderData.push({
          id: generateOrderId(store.slug),
          status: OrderStatus.PENDING,
          notes: "يرجى الاتصال قبل التسليم",
          storeId: store.id,
          customerId: c0.id,
          addressId: addr0.id,
          paymentMethod: PaymentMethod.COD,
          isWhatsApp: true,
          items: [
            {
              productId: storeProducts[0]!.id,
              quantity: 1,
              price: storeProducts[0]!.price,
            },
          ],
        });
      }

      // Order 4: DELIVERED, COD
      if (c2 && addr2 && storeProducts.length >= 2) {
        orderData.push({
          id: generateOrderId(store.slug),
          status: OrderStatus.DELIVERED,
          notes: "Please leave at the door",
          storeId: store.id,
          customerId: c2.id,
          addressId: addr2.id,
          paymentMethod: PaymentMethod.COD,
          isWhatsApp: false,
          items: storeProducts
            .slice(2, 4)
            .map((p) => ({ productId: p.id, quantity: 1, price: p.price })),
        });
      }

      // Order 5: CANCELLED, CARD
      if (c1 && addr1 && storeProducts.length >= 1) {
        const lastProduct = storeProducts[storeProducts.length - 1]!;
        orderData.push({
          id: generateOrderId(store.slug),
          status: OrderStatus.CANCELLED,
          notes: "Commande annulée — article hors stock",
          storeId: store.id,
          customerId: c1.id,
          addressId: addr1.id,
          paymentMethod: PaymentMethod.CARD,
          isWhatsApp: false,
          items: [
            {
              productId: lastProduct.id,
              quantity: 1,
              price: lastProduct.price,
            },
          ],
        });
      }
    }

    if (orderData.length === 0) {
      this.log("⚠️  No valid orders to create.");
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
            orderItems: { create: orderItemsCreate },
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

    // Create WhatsApp messages for orders that used WhatsApp
    await this.createWhatsAppMessages(database, orderData, createdOrders);
  }

  private async createWhatsAppMessages(
    database: PrismaClient,
    orderDefs: OrderSeedDef[],
    createdOrders: Array<{ id: string; isWhatsApp: boolean }>,
  ): Promise<void> {
    const whatsappOrders = createdOrders.filter((o) => o.isWhatsApp);
    if (whatsappOrders.length === 0) return;

    const now = new Date();
    let messageCount = 0;

    for (const order of whatsappOrders) {
      const def = orderDefs.find((d) => d.id === order.id);
      const status = def?.status ?? OrderStatus.PENDING;

      // Confirmation message
      await database.whatsAppMessage.create({
        data: {
          orderId: order.id,
          status: WhatsAppMessageStatus.DELIVERED,
          content: `✅ Votre commande #${order.id} a été reçue. Nous vous contacterons sous peu.`,
          messageId: `wa_seed_${order.id}_1`,
          sentAt: now,
        },
      });
      messageCount++;

      // Status update message for PROCESSING orders
      if (status === OrderStatus.PROCESSING) {
        await database.whatsAppMessage.create({
          data: {
            orderId: order.id,
            status: WhatsAppMessageStatus.READ,
            content: `🚚 Votre commande #${order.id} est en cours de préparation.`,
            messageId: `wa_seed_${order.id}_2`,
            sentAt: new Date(now.getTime() + 3600_000),
          },
        });
        messageCount++;
      }
    }

    this.log(
      `✅ Created ${messageCount} WhatsApp messages for ${whatsappOrders.length} orders`,
    );
  }
}
