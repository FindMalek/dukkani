/**
 * Export all seeders and their types from this file
 * Add new seeders here to register them
 */

export {
	CustomerSeeder,
	type SeededAddress,
	type SeededCustomer,
} from "./customer.seeder";
export { OrderSeeder, type SeededOrder } from "./order.seeder";
export { ProductSeeder, type SeededProduct } from "./product.seeder";
export { type SeededStore, StoreSeeder } from "./store.seeder";
export { type SeededUser, UserSeeder } from "./user.seeder";

import type { Seeder } from "../base";
import { CustomerSeeder } from "./customer.seeder";
import { OrderSeeder } from "./order.seeder";
import { ProductSeeder } from "./product.seeder";
import { StoreSeeder } from "./store.seeder";
/**
 * Register all seeders here
 * Seeders will be executed in order based on their `order` property
 * Dependencies are set up after seeders are instantiated
 */
import { UserSeeder } from "./user.seeder";

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

/**
 * Get all seeded data with helper methods for easy access
 */
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

/**
 * Get seeder instances for direct access to helper methods
 * This provides the best DX for accessing seeded data
 */
export function getSeeders() {
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
		users: userSeeder,
		stores: storeSeeder,
		products: productSeeder,
		customers: customerSeeder,
		orders: orderSeeder,
	};
}

/**
 * Example usage:
 *
 * ```ts
 * import { getSeeders } from '@dukkani/db/seed/seeders';
 *
 * const seeders = getSeeders();
 *
 * // Find by stable keys
 * const ahmedStore = seeders.stores.findBySlug('ahmed-fashion');
 * const ahmedUser = seeders.users.findByEmail('ahmed@dukkani.com');
 *
 * // Get grouped data
 * const productsByStore = seeders.products.getProductsByStoreSlug();
 * const ahmedProducts = productsByStore.get('ahmed-fashion');
 *
 * // Direct access
 * const allStores = seeders.stores.seededStores;
 * ```
 */
