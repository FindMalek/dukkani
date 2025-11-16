import prisma from "@dukkani/db";
import { CustomerQuery } from "@/entities/customer/query";
import { CustomerEntity } from "@/entities/customer/entity";
import type {
	CreateCustomerInput,
	UpdateCustomerInput,
} from "@/schemas/customer/input";
import type { CustomerSimpleOutput } from "@/schemas/customer/output";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
		const existing = await prisma.customer.findUnique({
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
		const store = await prisma.store.findUnique({
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
		const isDuplicate = await this.checkDuplicatePhone(
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
			const customer = await prisma.customer.create({
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
	 * Update customer with duplicate check
	 */
	static async updateCustomer(
		input: UpdateCustomerInput,
		userId: string,
	): Promise<CustomerSimpleOutput> {
		// Get existing customer to verify ownership
		const existingCustomer = await prisma.customer.findUnique({
			where: { id: input.id },
			select: { storeId: true, phone: true },
		});

		if (!existingCustomer) {
			throw new Error("Customer not found");
		}

		// Verify store ownership
		const store = await prisma.store.findUnique({
			where: { id: existingCustomer.storeId },
			select: { ownerId: true },
		});

		if (!store || store.ownerId !== userId) {
			throw new Error("You don't have access to this customer");
		}

		// If phone is being updated, check for duplicates
		if (input.phone && input.phone !== existingCustomer.phone) {
			const isDuplicate = await this.checkDuplicatePhone(
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
			const customer = await prisma.customer.update({
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
