import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";

/**
 * Seeder for User model
 * Note: This is a basic example. In production, you might want to:
 * - Hash passwords properly
 * - Use more realistic data
 * - Handle email verification
 */
export class UserSeeder extends BaseSeeder {
	name = "UserSeeder";
	order = 5; // Run before other seeders that might depend on users

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting User seeding...");

		const userData = [
			{
				id: "user_1",
				name: "Alice",
				email: "alice@example.com",
				emailVerified: true,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: "user_2",
				name: "Bob",
				email: "bob@example.com",
				emailVerified: true,
				image: null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		// Check if users already exist
		const existingUsers = await prisma.user.findMany();
		if (existingUsers.length > 0) {
			this.log(`Skipping: ${existingUsers.length} users already exist`);
			return;
		}

		// Create users
		for (const user of userData) {
			await prisma.user.create({ data: user });
		}

		this.log(`Created ${userData.length} users`);
	}
}
