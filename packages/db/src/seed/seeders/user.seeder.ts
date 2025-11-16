import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import { hashPassword } from "../utils/password";

/**
 * Seeder for User model
 * Creates 3 diverse users with proper authentication
 * Exports users for use in other seeders
 */
export class UserSeeder extends BaseSeeder {
	name = "UserSeeder";
	order = 1; // Run first as other seeders depend on users

	// Export seeded users for use in other seeders
	public seededUsers: Array<{
		id: string;
		email: string;
		name: string;
		password: string; // Plain password for documentation
	}> = [];

	async seed(prisma: PrismaClient): Promise<void> {
		this.log("Starting User seeding...");

		// Check if users already exist
		const existingUsers = await prisma.user.findMany();
		if (existingUsers.length > 0) {
			this.log(`Skipping: ${existingUsers.length} users already exist`);
			// Load existing users for export
			for (const user of existingUsers) {
				this.seededUsers.push({
					id: user.id,
					email: user.email,
					name: user.name,
					password: "Already exists - check database",
				});
			}
			return;
		}

		// Define 3 diverse users
		const userData = [
			{
				id: "user_admin_001",
				name: "Ahmed Al-Mansoori",
				email: "ahmed@dukkani.com",
				password: "Admin123!",
				emailVerified: true,
				image: null,
			},
			{
				id: "user_merchant_001",
				name: "Fatima Hassan",
				email: "fatima@dukkani.com",
				password: "Merchant123!",
				emailVerified: true,
				image: null,
			},
			{
				id: "user_store_owner_001",
				name: "Omar Abdullah",
				email: "omar@dukkani.com",
				password: "Store123!",
				emailVerified: true,
				image: null,
			},
		];

		const now = new Date();

		// Create users and accounts
		for (const userInfo of userData) {
			// Hash password
			const hashedPassword = await hashPassword(userInfo.password);

			// Create user
			const user = await prisma.user.create({
				data: {
					id: userInfo.id,
					name: userInfo.name,
					email: userInfo.email,
					emailVerified: userInfo.emailVerified,
					image: userInfo.image,
					createdAt: now,
					updatedAt: now,
				},
			});

			// Create account with password for email/password authentication
			await prisma.account.create({
				data: {
					id: `account_${userInfo.id}`,
					accountId: userInfo.email,
					providerId: "credential",
					userId: user.id,
					password: hashedPassword,
					createdAt: now,
					updatedAt: now,
				},
			});

			// Store for export
			this.seededUsers.push({
				id: user.id,
				email: user.email,
				name: user.name,
				password: userInfo.password,
			});

			this.log(`Created user: ${user.name} (${user.email})`);
		}

		this.log(`✅ Created ${userData.length} users with accounts`);
		this.log("📝 User credentials saved for export");
	}
}
