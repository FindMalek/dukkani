/**
 * Export all seeders from this file
 * Add new seeders here to register them
 */
export { TodoSeeder } from "./todo.seeder";
export { UserSeeder } from "./user.seeder";

/**
 * Register all seeders here
 * Seeders will be executed in order based on their `order` property
 */
import { TodoSeeder } from "./todo.seeder";
import { UserSeeder } from "./user.seeder";
import type { Seeder } from "../base";

export const seeders: Seeder[] = [
	new UserSeeder(),
	new TodoSeeder(),
	// Add more seeders here as you create them
];

