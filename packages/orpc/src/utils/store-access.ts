import prisma from "@dukkani/db";
import { ORPCError } from "@orpc/server";

/**
 * Get all store IDs owned by a user
 */
export async function getUserStoreIds(userId: string): Promise<string[]> {
	const stores = await prisma.store.findMany({
		where: { ownerId: userId },
		select: { id: true },
	});
	return stores.map((store) => store.id);
}

/**
 * Verify that a user owns a store
 * Throws ORPCError if user doesn't own the store
 */
export async function verifyStoreOwnership(
	userId: string,
	storeId: string,
): Promise<void> {
	const store = await prisma.store.findFirst({
		where: {
			id: storeId,
			ownerId: userId,
		},
		select: { id: true },
	});

	if (!store) {
		throw new ORPCError("FORBIDDEN", {
			message: "You don't have access to this store",
		});
	}
}

/**
 * Verify that a user owns any of the provided stores
 * Throws ORPCError if user doesn't own any of the stores
 */
export async function verifyStoreOwnershipMultiple(
	userId: string,
	storeIds: string[],
): Promise<void> {
	if (storeIds.length === 0) {
		return;
	}

	const userStoreIds = await getUserStoreIds(userId);
	const hasAccess = storeIds.every((storeId) => userStoreIds.includes(storeId));

	if (!hasAccess) {
		throw new ORPCError("FORBIDDEN", {
			message: "You don't have access to one or more stores",
		});
	}
}
