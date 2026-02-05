import { generateOrderId } from "@/utils/generate-id";
import type { PrismaClient } from "../../../prisma/generated/client";
import { OrderStatus, type Prisma } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { CustomerSeeder } from "./customer.seeder";
import type { ProductSeeder } from "./product.seeder";
import type { StoreSeeder } from "./store.seeder";

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

		// Define orders for each store
		const orderData: Array<{
			id: string;
			status: OrderStatus;
			notes?: string;
			storeId: string;
			customerId: string;
			addressId?: string;
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

			if (storeProducts.length === 0 || storeCustomers.length === 0) {
				this.log(
					`⚠️  Missing products or customers for store "${store.name}" (${storeSlug}). Skipping orders.`,
				);
				continue;
			}

			// Order 1: Confirmed order with first customer
			const customer1 = storeCustomers[0];
			if (customer1 && storeProducts.length >= 2) {
				const address = this.customerSeeder?.findAddressByCustomerId(
					customer1.id,
				);
				orderData.push({
					id: generateOrderId(store.slug),
					status: OrderStatus.CONFIRMED,
					notes: "Please deliver before 5 PM",
					storeId: store.id,
					customerId: customer1.id,
					addressId: address?.id,
					items: storeProducts.slice(0, 2).map((p) => ({
						productId: p.id,
						quantity: 1,
						price: p.price,
					})),
				});
			}

			// Order 2: Processing order with second customer (or first)
			const customer2 = storeCustomers[1] ?? storeCustomers[0];
			if (customer2 && storeProducts.length > 1) {
				const address = this.customerSeeder?.findAddressByCustomerId(
					customer2.id,
				);
				orderData.push({
					id: generateOrderId(store.slug),
					status: OrderStatus.PROCESSING,
					storeId: store.id,
					customerId: customer2.id,
					addressId: address?.id,
					items: storeProducts.slice(1, 3).map((p) => ({
						productId: p.id,
						quantity: 2,
						price: p.price,
					})),
				});
			}

			// Order 3: Pending order with first customer
			const customer3 = storeCustomers[0];
			const selectedProduct = storeProducts[0];
			if (customer3 && selectedProduct) {
				orderData.push({
					id: generateOrderId(store.slug),
					status: OrderStatus.PENDING,
					storeId: store.id,
					customerId: customer3.id,
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

		if (orderData.length === 0) {
			this.log("⚠️  No valid orders to create. All orders were skipped.");
			return;
		}

		// Create orders (need individual creates for orderItems relation)
		const createdOrders = await Promise.all(
			orderData.map((orderInfo) =>
				database.order.create({
					data: {
						id: orderInfo.id,
						status: orderInfo.status,
						notes: orderInfo.notes,
						storeId: orderInfo.storeId,
						customerId: orderInfo.customerId,
						addressId: orderInfo.addressId,
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
