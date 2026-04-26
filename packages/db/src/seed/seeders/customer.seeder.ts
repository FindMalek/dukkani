import type { PrismaClient } from "../../../prisma/generated/client";
import { BaseSeeder } from "../base";
import type { StoreSeeder } from "./store.seeder";

/**
 * Seeder for Customer model
 * Creates customers and their addresses linked to seeded stores
 * Exports customers and addresses for use in other seeders
 */
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
  order = 4; // Run after StoreSeeder

  // Export seeded customers and addresses for use in other seeders
  public seededCustomers: SeededCustomer[] = [];
  public seededAddresses: SeededAddress[] = [];

  /**
   * Find customers by store slug
   */
  findByStoreSlug(storeSlug: string): SeededCustomer[] {
    const store = this.storeSeeder?.findBySlug(storeSlug);
    if (!store) return [];
    return this.seededCustomers.filter((c) => c.storeId === store.id);
  }

  /**
   * Find the default address for a customer
   */
  findAddressByCustomerId(customerId: string): SeededAddress | undefined {
    return this.seededAddresses.find((a) => a.customerId === customerId);
  }

  /**
   * Get all customers grouped by store slug
   */
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

  /**
   * Set the StoreSeeder instance to access seeded stores
   */
  setStoreSeeder(storeSeeder: StoreSeeder): void {
    this.storeSeeder = storeSeeder;
  }

  async seed(database: PrismaClient): Promise<void> {
    this.log("Starting Customer seeding...");

    if (!this.storeSeeder) {
      throw new Error("StoreSeeder must be set before running CustomerSeeder");
    }

    // Check if customers already exist
    const existingCustomers = await database.customer.findMany({
      include: { addresses: true },
    });
    if (existingCustomers.length > 0) {
      this.log(`Skipping: ${existingCustomers.length} customers already exist`);
      // Load existing customers and addresses for export
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

    // Define customers with stable slug lookups; UAE-style addresses (postal + map pins)
    const customerDefinitions = [
      // Customers for Ahmed's Fashion Boutique
      {
        name: "Khalid Al-Rashid",
        phone: "+971501111111",
        storeSlug: "ahmed-fashion",
        address: {
          street: "123 Al Mina Road, Deira",
          city: "Dubai",
          postalCode: "12345",
          latitude: 25.27,
          longitude: 55.31,
        },
      },
      {
        name: "Mariam Al-Zahra",
        phone: "+971501111112",
        storeSlug: "ahmed-fashion",
        address: {
          street: "45 Al Wasl Road, Al Wasl",
          city: "Dubai",
          postalCode: "12346",
          latitude: 25.21,
          longitude: 55.26,
        },
      },
      // Customers for Fatima's Electronics Hub
      {
        name: "Yusuf Al-Mazrouei",
        phone: "+971502222221",
        storeSlug: "fatima-electronics",
        address: {
          street: "456 Business Bay, Executive Towers",
          city: "Dubai",
          postalCode: "00000",
          latitude: 25.19,
          longitude: 55.27,
        },
      },
      {
        name: "Layla Al-Mansoori",
        phone: "+971502222222",
        storeSlug: "fatima-electronics",
        address: {
          street: "78 Sheikh Zayed Street, Al Dana",
          city: "Abu Dhabi",
          postalCode: "00000",
          latitude: 24.45,
          longitude: 54.38,
        },
      },
      // Customers for Omar's Home Essentials
      {
        name: "Hassan Al-Suwaidi",
        phone: "+971503333331",
        storeSlug: "omar-home",
        address: {
          street: "789 Jumeirah Street, Jumeirah 1",
          city: "Dubai",
          postalCode: "00000",
          latitude: 25.2,
          longitude: 55.24,
        },
      },
      {
        name: "Noor Al-Kaabi",
        phone: "+971503333332",
        storeSlug: "omar-home",
        address: {
          street: "12 Corniche Road West",
          city: "Abu Dhabi",
          postalCode: "00000",
          latitude: 24.47,
          longitude: 54.35,
        },
      },
    ];

    // Resolve stores by slug and validate
    const resolvedDefinitions = customerDefinitions
      .map((def) => {
        const store = storesBySlug.get(def.storeSlug);
        if (!store) {
          this.error(
            `⚠️  Store not found for customer "${def.name}" (slug: ${def.storeSlug}). Skipping this customer.`,
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
      this.log(
        "⚠️  No valid customers to create. All customers were skipped due to missing stores.",
      );
      return;
    }

    // Create customers with addresses using individual creates
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

    // Store for export
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

    this.log(`✅ Created ${createdCustomers.length} customers with addresses`);
  }
}
