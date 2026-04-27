import { hashPassword } from "@/seed/utils/password";
import type { PrismaClient } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";

export interface SeededUser {
  id: string;
  email: string;
  name: string;
}

export class UserSeeder extends BaseSeeder {
  name = "UserSeeder";
  order = 1;

  public seededUsers: SeededUser[] = [];

  findByEmail(email: string): SeededUser | undefined {
    return this.seededUsers.find((u) => u.email === email);
  }

  findById(id: string): SeededUser | undefined {
    return this.seededUsers.find((u) => u.id === id);
  }

  getUsersByEmail(): Map<string, SeededUser> {
    return new Map(this.seededUsers.map((u) => [u.email, u]));
  }

  async seed(database: PrismaClient): Promise<void> {
    this.log("Starting User seeding...");

    const existingUsers = await database.user.findMany();
    if (existingUsers.length > 0) {
      this.log(`Skipping: ${existingUsers.length} users already exist`);
      for (const user of existingUsers) {
        this.seededUsers.push({
          id: user.id,
          email: user.email,
          name: user.name,
        });
      }
      return;
    }

    // 5 Tunisian users — passwords are hashed; plaintext never exported
    const userData = [
      {
        id: "user_admin_001",
        name: "Amine Trabelsi",
        email: "amine@dukkani.co",
        password: "Admin123!",
        emailVerified: true,
        image: null,
        telegramChatId: "123456789",
        telegramLinkedAt: new Date(),
      },
      {
        id: "user_merchant_001",
        name: "Sana Ben Salah",
        email: "sana@dukkani.co",
        password: "Merchant123!",
        emailVerified: true,
        image: null,
        telegramChatId: null,
      },
      {
        id: "user_store_owner_001",
        name: "Yassine Gharbi",
        email: "yassine@dukkani.co",
        password: "Store123!",
        emailVerified: true,
        image: null,
        telegramChatId: null,
      },
      {
        id: "user_team_001",
        name: "Karim Mansouri",
        email: "karim@dukkani.co",
        password: "Team123!",
        emailVerified: true,
        image: null,
        telegramChatId: null,
      },
      {
        id: "user_team_002",
        name: "Rania Hamdi",
        email: "rania@dukkani.co",
        password: "Team123!",
        emailVerified: true,
        image: null,
        telegramChatId: null,
      },
    ];

    const now = new Date();

    const hashedPasswords: string[] = await Promise.all(
      userData.map((user) => hashPassword(user.password)),
    );

    if (hashedPasswords.length !== userData.length) {
      throw new Error(
        `Password hashing failed: expected ${userData.length} hashed passwords, got ${hashedPasswords.length}`,
      );
    }

    const users = await database.user.createMany({
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

    // Link Amine's Telegram account for testing
    await database.user.update({
      where: { id: "user_admin_001" },
      data: { telegramChatId: "123456789", telegramLinkedAt: now },
    });

    await database.account.createMany({
      data: userData.map((user, index) => {
        const hashedPassword = hashedPasswords[index];
        if (!hashedPassword) {
          throw new Error(
            `Missing hashed password for user ${user.email} at index ${index}`,
          );
        }
        return {
          id: `account_${user.id}`,
          accountId: user.email,
          providerId: "credential",
          userId: user.id,
          password: hashedPassword,
          createdAt: now,
          updatedAt: now,
        };
      }),
    });

    for (const userInfo of userData) {
      this.seededUsers.push({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
      });
    }

    this.log(`✅ Created ${users.count} users with accounts`);
    this.log("📝 User data exported (passwords excluded for security)");
    this.log(
      "📱 Amine's account has Telegram linked (chat ID: 123456789) for testing",
    );
  }
}
