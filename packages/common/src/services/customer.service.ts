import { database, PrismaClientKnownRequestError } from "@dukkani/db";
import { CustomerEntity } from "../entities/customer/entity";
import { CustomerQuery } from "../entities/customer/query";
import type {
	CreateCustomerInput,
	UpdateCustomerInput,
} from "../schemas/customer/input";
import type { CustomerSimpleOutput } from "../schemas/customer/output";

/**
 * Customer service - Shared business logic for customer operations
 */
export class CustomerService {
	/**
	 * Check for duplicate phone number in store
	 */
	static async checkDuplicatePhone(
		phone: string,
		storeId: string,
	): Promise<boolean> {
		const existing = await database.customer.findUnique({
			where: {
				phone_storeId: {
					phone,
					storeId,
				},
			},
		});

		return !!existing;
	}

	/**
	 * Create customer with duplicate check
	 */
	static async createCustomer(
		input: CreateCustomerInput,
		userId: string,
	): Promise<CustomerSimpleOutput> {
		// Verify store ownership
		const store = await database.store.findUnique({
			where: { id: input.storeId },
			select: { ownerId: true },
		});

		if (!store) {
			throw new Error("Store not found");
		}

		if (store.ownerId !== userId) {
			throw new Error("You don't have access to this store");
		}

		// Check for duplicate phone
		const isDuplicate = await CustomerService.checkDuplicatePhone(
			input.phone,
			input.storeId,
		);

		if (isDuplicate) {
			throw new Error(
				"Customer with this phone number already exists in this store",
			);
		}

		// Create customer
		try {
			const customer = await database.customer.create({
				data: {
					name: input.name,
					phone: input.phone,
					storeId: input.storeId,
				},
				include: CustomerQuery.getSimpleInclude(),
			});

			return CustomerEntity.getSimpleRo(customer);
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				throw new Error(
					"Customer with this phone number already exists in this store",
				);
			}
			throw error;
		}
	}

	/**
	 * Find or create customer by phone number
	 * If customer exists, update name if changed
	 * If not, create new customer
	 * No ownership check - used for public order creation
	 */
	static async findOrCreateCustomer(
		phone: string,
		name: string,
		storeId: string,
	): Promise<CustomerSimpleOutput> {
		// Find existing customer
		const existing = await database.customer.findUnique({
			where: {
				phone_storeId: {
					phone,
					storeId,
				},
			},
			include: CustomerQuery.getSimpleInclude(),
		});

		if (existing) {
			return CustomerEntity.getSimpleRo(existing);
		}

		// Create new customer
		const customer = await database.customer.create({
			data: {
				name,
				phone,
				storeId,
			},
			include: CustomerQuery.getSimpleInclude(),
		});

		return CustomerEntity.getSimpleRo(customer);
	}

	/**
	 * Update customer with duplicate check
	 */
	static async updateCustomer(
		input: UpdateCustomerInput,
		userId: string,
	): Promise<CustomerSimpleOutput> {
		// Get existing customer to verify ownership
		const existingCustomer = await database.customer.findUnique({
			where: { id: input.id },
			select: { storeId: true, phone: true },
		});

		if (!existingCustomer) {
			throw new Error("Customer not found");
		}

		// Verify store ownership
		const store = await database.store.findUnique({
			where: { id: existingCustomer.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this customer");
		}

		// If phone is being updated, check for duplicates
		if (input.phone && input.phone !== existingCustomer.phone) {
			const isDuplicate = await CustomerService.checkDuplicatePhone(
				input.phone,
				existingCustomer.storeId,
			);

			if (isDuplicate) {
				throw new Error(
					"Customer with this phone number already exists in this store",
				);
			}
		}

		// Update customer
		const updateData: {
			name?: string;
			phone?: string;
		} = {};

		if (input.name !== undefined) updateData.name = input.name;
		if (input.phone !== undefined) updateData.phone = input.phone;

		try {
			const customer = await database.customer.update({
				where: { id: input.id },
				data: updateData,
				include: CustomerQuery.getSimpleInclude(),
			});

			return CustomerEntity.getSimpleRo(customer);
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				throw new Error(
					"Customer with this phone number already exists in this store",
				);
			}
			throw error;
		}
	}
}
