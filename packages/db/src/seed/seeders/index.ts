/**
 * Export all seeders from this file
 * Add new seeders here to register them
 */
export { UserSeeder } from "./user.seeder";
export { StoreSeeder } from "./store.seeder";
export { ProductSeeder } from "./product.seeder";
export { CustomerSeeder } from "./customer.seeder";
export { OrderSeeder } from "./order.seeder";

/**
 * Register all seeders here
 * Seeders will be executed in order based on their `order` property
 * Dependencies are set up after seeders are instantiated
 */
import { UserSeeder } from "./user.seeder";
import { StoreSeeder } from "./store.seeder";
import { ProductSeeder } from "./product.seeder";
import { CustomerSeeder } from "./customer.seeder";
import { OrderSeeder } from "./order.seeder";
import type { Seeder } from "../base";

export const seeders: Seeder[] = [
	new UserSeeder(),
	new StoreSeeder(),
	new ProductSeeder(),
	new CustomerSeeder(),
	new OrderSeeder(),
];

/**
 * Get seeder instances for dependency injection
 * This allows seeders to access data from other seeders
 */
export function setupSeederDependencies(): void {
	const userSeeder = seeders.find((s) => s.name === "UserSeeder") as UserSeeder;
	const storeSeeder = seeders.find(
		(s) => s.name === "StoreSeeder",
	) as StoreSeeder;
	const productSeeder = seeders.find(
		(s) => s.name === "ProductSeeder",
	) as ProductSeeder;
	const customerSeeder = seeders.find(
		(s) => s.name === "CustomerSeeder",
	) as CustomerSeeder;
	const orderSeeder = seeders.find(
		(s) => s.name === "OrderSeeder",
	) as OrderSeeder;

	// Set up dependencies
	if (storeSeeder && userSeeder) {
		storeSeeder.setUserSeeder(userSeeder);
	}

	if (productSeeder && storeSeeder) {
		productSeeder.setStoreSeeder(storeSeeder);
	}

	if (customerSeeder && storeSeeder) {
		customerSeeder.setStoreSeeder(storeSeeder);
	}

	if (orderSeeder && storeSeeder && productSeeder && customerSeeder) {
		orderSeeder.setSeeders(storeSeeder, productSeeder, customerSeeder);
	}
}

/**
 * Export seeded data for use in tests or other contexts
 */
export interface SeededData {
	users: UserSeeder["seededUsers"];
	stores: StoreSeeder["seededStores"];
	products: ProductSeeder["seededProducts"];
	customers: CustomerSeeder["seededCustomers"];
	orders: OrderSeeder["seededOrders"];
}

export function getSeededData(): SeededData {
	const userSeeder = seeders.find((s) => s.name === "UserSeeder") as UserSeeder;
	const storeSeeder = seeders.find(
		(s) => s.name === "StoreSeeder",
	) as StoreSeeder;
	const productSeeder = seeders.find(
		(s) => s.name === "ProductSeeder",
	) as ProductSeeder;
	const customerSeeder = seeders.find(
		(s) => s.name === "CustomerSeeder",
	) as CustomerSeeder;
	const orderSeeder = seeders.find(
		(s) => s.name === "OrderSeeder",
	) as OrderSeeder;

	return {
		users: userSeeder?.seededUsers || [],
		stores: storeSeeder?.seededStores || [],
		products: productSeeder?.seededProducts || [],
		customers: customerSeeder?.seededCustomers || [],
		orders: orderSeeder?.seededOrders || [],
	};
}
