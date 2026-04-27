import type { PrismaClient } from "../../../prisma/generated/client";
import {
  PaymentMethod,
  StoreCategory,
  StorePlanType,
  StoreStatus,
  StoreTheme,
  SupportedCurrency,
  TeamMemberRole,
  UserOnboardingStep,
} from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { UserSeeder } from "./user.seeder";

export interface SeededStore {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  status: StoreStatus;
}

export class StoreSeeder extends BaseSeeder {
  name = "StoreSeeder";
  order = 2;

  public seededStores: SeededStore[] = [];

  findBySlug(slug: string): SeededStore | undefined {
    return this.seededStores.find((s) => s.slug === slug);
  }

  findById(id: string): SeededStore | undefined {
    return this.seededStores.find((s) => s.id === id);
  }

  getStoresBySlug(): Map<string, SeededStore> {
    return new Map(this.seededStores.map((s) => [s.slug, s]));
  }

  private userSeeder?: UserSeeder;

  setUserSeeder(userSeeder: UserSeeder): void {
    this.userSeeder = userSeeder;
  }

  async seed(database: PrismaClient): Promise<void> {
    this.log("Starting Store seeding...");

    if (!this.userSeeder) {
      throw new Error("UserSeeder must be set before running StoreSeeder");
    }

    const existingStores = await database.store.findMany();
    if (existingStores.length > 0) {
      this.log(`Skipping: ${existingStores.length} stores already exist`);
      for (const store of existingStores) {
        this.seededStores.push({
          id: store.id,
          name: store.name,
          slug: store.slug,
          ownerId: store.ownerId,
          status: store.status,
        });
      }
      await this.syncPublishedStoreOwnersOnboarding(database, existingStores);
      return;
    }

    const usersByEmail = this.userSeeder.getUsersByEmail();
    if (usersByEmail.size === 0) {
      this.log("⚠️  No users found. Skipping store creation.");
      return;
    }

    const storeDefinitions = [
      {
        name: "Amine's Fashion Boutique",
        slug: "amine-fashion",
        description: "Mode et accessoires premium pour l'homme moderne",
        category: StoreCategory.FASHION,
        theme: StoreTheme.MODERN,
        whatsappNumber: "+21621100001",
        ownerEmail: "amine@dukkani.co",
        currency: SupportedCurrency.TND,
        planType: StorePlanType.PREMIUM,
        orderLimit: 1000,
        status: StoreStatus.PUBLISHED,
      },
      {
        name: "Sana's Electronics",
        slug: "sana-electronics",
        description: "Derniers gadgets et accessoires high-tech",
        category: StoreCategory.ELECTRONICS,
        theme: StoreTheme.MINIMAL,
        whatsappNumber: "+21621100002",
        ownerEmail: "sana@dukkani.co",
        currency: SupportedCurrency.TND,
        planType: StorePlanType.BASIC,
        orderLimit: 500,
        status: StoreStatus.PUBLISHED,
      },
      {
        name: "Yassine's Maison",
        slug: "yassine-home",
        description: "Tout ce qu'il vous faut pour votre maison et cuisine",
        category: StoreCategory.HOME,
        theme: StoreTheme.CLASSIC,
        whatsappNumber: "+21621100003",
        ownerEmail: "yassine@dukkani.co",
        currency: SupportedCurrency.TND,
        planType: StorePlanType.FREE,
        orderLimit: 100,
        status: StoreStatus.PUBLISHED,
      },
    ];

    const storeData = storeDefinitions
      .map((def) => {
        const owner = usersByEmail.get(def.ownerEmail);
        if (!owner) {
          this.error(
            `⚠️  Owner not found for store "${def.name}" (email: ${def.ownerEmail}). Skipping.`,
          );
          return null;
        }
        return {
          name: def.name,
          slug: def.slug,
          description: def.description,
          category: def.category,
          theme: def.theme,
          whatsappNumber: def.whatsappNumber,
          currency: def.currency,
          ownerId: owner.id,
          planType: def.planType,
          orderLimit: def.orderLimit,
          status: def.status,
        };
      })
      .filter((store): store is NonNullable<typeof store> => store !== null);

    if (storeData.length === 0) {
      this.log("⚠️  No valid stores to create.");
      return;
    }

    const createdStores = await Promise.all(
      storeData.map((storeInfo) =>
        database.store.create({
          data: {
            name: storeInfo.name,
            slug: storeInfo.slug,
            description: storeInfo.description,
            category: storeInfo.category,
            theme: storeInfo.theme,
            whatsappNumber: storeInfo.whatsappNumber,
            currency: storeInfo.currency,
            ownerId: storeInfo.ownerId,
            supportedPaymentMethods: [PaymentMethod.COD, PaymentMethod.CARD],
            shippingCost: 8.0,
            storePlan: {
              create: {
                planType: storeInfo.planType,
                orderLimit: storeInfo.orderLimit,
                orderCount: 0,
              },
            },
            status: storeInfo.status,
          },
        }),
      ),
    );

    for (const store of createdStores) {
      this.seededStores.push({
        id: store.id,
        name: store.name,
        slug: store.slug,
        ownerId: store.ownerId,
        status: store.status,
      });
    }

    await this.syncPublishedStoreOwnersOnboarding(database, createdStores);
    await this.createTeamMembers(database, usersByEmail);

    this.log(`✅ Created ${createdStores.length} stores with plans`);
  }

  /**
   * Create team members: Karim as MANAGER for amine-fashion, Rania as STAFF for sana-electronics.
   * Idempotent via skipDuplicates.
   */
  private async createTeamMembers(
    database: PrismaClient,
    usersByEmail: Map<string, { id: string; email: string; name: string }>,
  ): Promise<void> {
    const amineFashion = this.findBySlug("amine-fashion");
    const sanaElectronics = this.findBySlug("sana-electronics");
    const karim = usersByEmail.get("karim@dukkani.co");
    const rania = usersByEmail.get("rania@dukkani.co");

    const membersToCreate: Array<{
      userId: string;
      storeId: string;
      role: TeamMemberRole;
      label: string;
    }> = [];

    if (karim && amineFashion) {
      membersToCreate.push({
        userId: karim.id,
        storeId: amineFashion.id,
        role: TeamMemberRole.MANAGER,
        label: "Karim (MANAGER) → amine-fashion",
      });
    }

    if (rania && sanaElectronics) {
      membersToCreate.push({
        userId: rania.id,
        storeId: sanaElectronics.id,
        role: TeamMemberRole.STAFF,
        label: "Rania (STAFF) → sana-electronics",
      });
    }

    if (membersToCreate.length === 0) return;

    await database.teamMember.createMany({
      data: membersToCreate.map(({ userId, storeId, role }) => ({
        userId,
        storeId,
        role,
      })),
      skipDuplicates: true,
    });

    for (const m of membersToCreate) {
      this.log(`✅ Team member: ${m.label}`);
    }
  }

  private async syncPublishedStoreOwnersOnboarding(
    database: PrismaClient,
    stores: Array<{ ownerId: string; status: StoreStatus }>,
  ): Promise<void> {
    const ownerIds = Array.from(
      new Set(
        stores
          .filter((store) => store.status === StoreStatus.PUBLISHED)
          .map((store) => store.ownerId),
      ),
    );

    if (ownerIds.length === 0) return;

    const { count } = await database.user.updateMany({
      where: {
        id: { in: ownerIds },
        onboardingStep: { not: UserOnboardingStep.STORE_LAUNCHED },
      },
      data: { onboardingStep: UserOnboardingStep.STORE_LAUNCHED },
    });

    if (count > 0) {
      this.log(
        `✅ Advanced onboardingStep → STORE_LAUNCHED for ${count} published-store owner(s)`,
      );
    }
  }
}
