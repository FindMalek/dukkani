import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import type { StoreSeeder } from "./store.seeder";
import type { ProductSeeder } from "./product.seeder";
import type { CustomerSeeder } from "./customer.seeder";
import { OrderStatus } from "../../../prisma/generated/client";
import { Prisma } from "../../../prisma/generated/client";
import { generateOrderId } from "@dukkani/common/utils";

/**
 * Seeder for Order model
 * Creates orders with order items linked to stores, products, and customers
 * Exports orders for use in other seeders
 */
export interface SeededOrder {
	id: string;
	status: OrderStatus;
	storeId: string;
	customerId: string | null;
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

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting Order seeding...");

		if (!this.storeSeeder || !this.productSeeder || !this.customerSeeder) {
			throw new Error(
				"StoreSeeder, ProductSeeder, and CustomerSeeder must be set before running OrderSeeder",
			);
		}

		// Check if orders already exist
		const existingOrders = await prisma.order.findMany();
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

		// Define orders for each store
		const orderData: Array<{
			id: string;
			status: OrderStatus;
			customerName: string;
			customerPhone: string;
			address: string;
			notes?: string;
			storeId: string;
			customerId: string | null;
			items: Array<{
				productId: string;
				quantity: number;
				price: Prisma.Decimal;
			}>;
		}> = [];

		// Create orders for each store using stable slug lookups
		for (const [storeSlug, store] of storesBySlug) {
			const storeProducts = productsByStoreSlug.get(storeSlug) || [];
			const storeCustomers = customersByStoreSlug.get(storeSlug) || [];

			if (storeProducts.length === 0) {
				this.log(
					`⚠️  No products found for store "${store.name}" (${storeSlug}). Skipping orders for this store.`,
				);
				continue;
			}

			// Order 1: Confirmed order with customer
			if (storeCustomers.length > 0) {
				const customer = storeCustomers[0];
				if (customer && storeProducts.length >= 2) {
					const selectedProducts = storeProducts.slice(0, 2);
					orderData.push({
						id: generateOrderId(store.slug),
						status: OrderStatus.CONFIRMED,
						customerName: customer.name,
						customerPhone: customer.phone,
						address: "123 Main Street, Dubai, UAE",
						notes: "Please deliver before 5 PM",
						storeId: store.id,
						customerId: customer.id,
						items: selectedProducts.map((p) => ({
							productId: p.id,
							quantity: 1,
							price: p.price,
						})),
					});
				}
			}

			// Order 2: Processing order
			if (storeProducts.length > 1) {
				const selectedProducts = storeProducts.slice(1, 3);
				orderData.push({
					id: generateOrderId(store.slug),
					status: OrderStatus.PROCESSING,
					customerName: "Guest Customer",
					customerPhone: "+971509999999",
					address: "456 Business Bay, Dubai, UAE",
					storeId: store.id,
					customerId: null,
					items: selectedProducts.map((p) => ({
						productId: p.id,
						quantity: 2,
						price: p.price,
					})),
				});
			}

			// Order 3: Pending order
			if (storeProducts.length > 0) {
				const selectedProduct = storeProducts[0];
				if (selectedProduct) {
					orderData.push({
						id: generateOrderId(store.slug),
						status: OrderStatus.PENDING,
						customerName: "New Customer",
						customerPhone: "+971508888888",
						address: "789 Jumeirah, Dubai, UAE",
						storeId: store.id,
						customerId: null,
						items: [
							{
								productId: selectedProduct.id,
								quantity: 1,
								price: selectedProduct.price,
							},
						],
					});
				}
			}
		}

		if (orderData.length === 0) {
			this.log("⚠️  No valid orders to create. All orders were skipped.");
			return;
		}

		// Create orders (need individual creates for orderItems relation)
		const createdOrders = await Promise.all(
			orderData.map((orderInfo) =>
				prisma.order.create({
					data: {
						id: orderInfo.id,
						status: orderInfo.status,
						customerName: orderInfo.customerName,
						customerPhone: orderInfo.customerPhone,
						address: orderInfo.address,
						notes: orderInfo.notes,
						storeId: orderInfo.storeId,
						customerId: orderInfo.customerId,
						orderItems: {
							create: orderInfo.items.map((item) => ({
								productId: item.productId,
								quantity: item.quantity,
								price: item.price,
							})),
						},
					},
				}),
			),
		);

		// Store for export
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
