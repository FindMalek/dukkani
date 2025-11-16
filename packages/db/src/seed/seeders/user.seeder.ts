import { BaseSeeder } from "../base";
import type { PrismaClient } from "../../../prisma/generated/client";
import { hashPassword } from "../utils/password";

/**
 * Seeder for User model
 * Creates 3 diverse users with proper authentication
 * Exports users for use in other seeders
 */
export interface SeededUser {
	id: string;
	email: string;
	name: string;
	password: string; // Plain password for documentation
}

export class UserSeeder extends BaseSeeder {
	name = "UserSeeder";
	order = 1; // Run first as other seeders depend on users

	// Export seeded users for use in other seeders
	public seededUsers: SeededUser[] = [];

	/**
	 * Find a user by email (stable key)
	 */
	findByEmail(email: string): SeededUser | undefined {
		return this.seededUsers.find((u) => u.email === email);
	}

	/**
	 * Find a user by ID
	 */
	findById(id: string): SeededUser | undefined {
		return this.seededUsers.find((u) => u.id === id);
	}

	/**
	 * Get all users as a map keyed by email for easy lookup
	 */
	getUsersByEmail(): Map<string, SeededUser> {
		return new Map(this.seededUsers.map((u) => [u.email, u]));
	}

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

		// Hash all passwords in parallel
		const hashedPasswords = await Promise.all(
			userData.map((user) => hashPassword(user.password)),
		);

		// Create all users at once
		const users = await prisma.user.createMany({
			data: userData.map((user) => ({
				id: user.id,
				name: user.name,
				email: user.email,
				emailVerified: user.emailVerified,
				image: user.image,
				createdAt: now,
				updatedAt: now,
			})),
		});

		// Create all accounts at once
		await prisma.account.createMany({
			data: userData.map((user, index) => ({
				id: `account_${user.id}`,
				accountId: user.email,
				providerId: "credential",
				userId: user.id,
				password: hashedPasswords[index]!,
				createdAt: now,
				updatedAt: now,
			})),
		});

		// Store for export
		for (const userInfo of userData) {
			this.seededUsers.push({
				id: userInfo.id,
				email: userInfo.email,
				name: userInfo.name,
				password: userInfo.password,
			});
		}

		this.log(`✅ Created ${users.count} users with accounts`);
		this.log("📝 User credentials saved for export");
	}
}
