import type { PrismaClient } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

export interface SeededCustomer {
  id: string;
  name: string;
  phone: string;
  storeId: string;
}

export interface SeededAddress {
  id: string;
  street: string;
  city: string;
  customerId: string;
  postalCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

export class CustomerSeeder extends BaseSeeder {
  name = "CustomerSeeder";
  order = 4;

  public seededCustomers: SeededCustomer[] = [];
  public seededAddresses: SeededAddress[] = [];

  findByStoreSlug(storeSlug: string): SeededCustomer[] {
    const store = this.storeSeeder?.findBySlug(storeSlug);
    if (!store) return [];
    return this.seededCustomers.filter((c) => c.storeId === store.id);
  }

  findAddressByCustomerId(customerId: string): SeededAddress | undefined {
    return this.seededAddresses.find((a) => a.customerId === customerId);
  }

  getCustomersByStoreSlug(): Map<string, SeededCustomer[]> {
    const map = new Map<string, SeededCustomer[]>();
    for (const customer of this.seededCustomers) {
      const store = this.storeSeeder?.findById(customer.storeId);
      if (store) {
        const existing = map.get(store.slug) || [];
        existing.push(customer);
        map.set(store.slug, existing);
      }
    }
    return map;
  }

  private storeSeeder?: StoreSeeder;

  setStoreSeeder(storeSeeder: StoreSeeder): void {
    this.storeSeeder = storeSeeder;
  }

  async seed(database: PrismaClient): Promise<void> {
    this.log("Starting Customer seeding...");

    if (!this.storeSeeder) {
      throw new Error("StoreSeeder must be set before running CustomerSeeder");
    }

    const existingCustomers = await database.customer.findMany({
      include: { addresses: true },
    });
    if (existingCustomers.length > 0) {
      this.log(`Skipping: ${existingCustomers.length} customers already exist`);
      for (const customer of existingCustomers) {
        this.seededCustomers.push({
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
          storeId: customer.storeId,
        });
        for (const address of customer.addresses) {
          this.seededAddresses.push({
            id: address.id,
            street: address.street,
            city: address.city,
            customerId: address.customerId,
            postalCode: address.postalCode,
            latitude: address.latitude,
            longitude: address.longitude,
          });
        }
      }
      return;
    }

    const storesBySlug = this.storeSeeder.getStoresBySlug();
    if (storesBySlug.size === 0) {
      this.log("⚠️  No stores found. Skipping customer creation.");
      return;
    }

    // 3 customers per store — Tunisian names, +216 phones, Tunisian cities
    const customerDefinitions = [
      // amine-fashion
      {
        name: "Mohamed Ben Salah",
        phone: "+21655123456",
        storeSlug: "amine-fashion",
        address: {
          street: "15 Rue Ibn Khaldoun",
          city: "Tunis",
          postalCode: "1000",
          latitude: 36.817,
          longitude: 10.181,
        },
      },
      {
        name: "Amira Trabelsi",
        phone: "+21695234567",
        storeSlug: "amine-fashion",
        address: {
          street: "8 Avenue Habib Bourguiba",
          city: "Sousse",
          postalCode: "4000",
          latitude: 35.825,
          longitude: 10.637,
        },
      },
      {
        name: "Nadia Gharbi",
        phone: "+21623345678",
        storeSlug: "amine-fashion",
        address: {
          street: "42 Rue de la République",
          city: "Sfax",
          postalCode: "3000",
          latitude: 34.741,
          longitude: 10.762,
        },
      },
      // sana-electronics
      {
        name: "Karim Mansouri",
        phone: "+21656456789",
        storeSlug: "sana-electronics",
        address: {
          street: "3 Avenue Mohamed V",
          city: "Tunis",
          postalCode: "1002",
          latitude: 36.801,
          longitude: 10.195,
        },
      },
      {
        name: "Rim Ben Ali",
        phone: "+21697567890",
        storeSlug: "sana-electronics",
        address: {
          street: "18 Rue Mongi Bali",
          city: "Monastir",
          postalCode: "5000",
          latitude: 35.764,
          longitude: 10.832,
        },
      },
      {
        name: "Bilel Chaari",
        phone: "+21626678901",
        storeSlug: "sana-electronics",
        address: {
          street: "7 Rue Farhat Hached",
          city: "Kairouan",
          postalCode: "3100",
          latitude: 35.679,
          longitude: 10.1,
        },
      },
      // yassine-home
      {
        name: "Houda Sassi",
        phone: "+21652789012",
        storeSlug: "yassine-home",
        address: {
          street: "29 Avenue de la Liberté",
          city: "Ariana",
          postalCode: "2080",
          latitude: 36.859,
          longitude: 10.193,
        },
      },
      {
        name: "Yassine Ayari",
        phone: "+21698890123",
        storeSlug: "yassine-home",
        address: {
          street: "5 Avenue 7 Novembre",
          city: "Gabès",
          postalCode: "6000",
          latitude: 33.882,
          longitude: 10.098,
        },
      },
      {
        name: "Mariem Nouri",
        phone: "+21627901234",
        storeSlug: "yassine-home",
        address: {
          street: "11 Avenue Habib Thameur",
          city: "Nabeul",
          postalCode: "8000",
          latitude: 36.453,
          longitude: 10.726,
        },
      },
    ];

    const resolvedDefinitions = customerDefinitions
      .map((def) => {
        const store = storesBySlug.get(def.storeSlug);
        if (!store) {
          this.error(
            `⚠️  Store not found for customer "${def.name}" (slug: ${def.storeSlug}). Skipping.`,
          );
          return null;
        }
        return {
          name: def.name,
          phone: def.phone,
          storeId: store.id,
          address: def.address,
        };
      })
      .filter(
        (customer): customer is NonNullable<typeof customer> =>
          customer !== null,
      );

    if (resolvedDefinitions.length === 0) {
      this.log("⚠️  No valid customers to create.");
      return;
    }

    const createdCustomers = await Promise.all(
      resolvedDefinitions.map((def) =>
        database.customer.create({
          data: {
            name: def.name,
            phone: def.phone,
            storeId: def.storeId,
            addresses: {
              create: {
                street: def.address.street,
                city: def.address.city,
                postalCode: def.address.postalCode,
                latitude: def.address.latitude,
                longitude: def.address.longitude,
                isDefault: true,
              },
            },
          },
          include: { addresses: true },
        }),
      ),
    );

    for (const customer of createdCustomers) {
      this.seededCustomers.push({
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        storeId: customer.storeId,
      });
      for (const address of customer.addresses) {
        this.seededAddresses.push({
          id: address.id,
          street: address.street,
          city: address.city,
          customerId: address.customerId,
          postalCode: address.postalCode,
          latitude: address.latitude,
          longitude: address.longitude,
        });
      }
    }

    this.log(
      `✅ Created ${createdCustomers.length} customers with Tunisian addresses`,
    );
  }
}
