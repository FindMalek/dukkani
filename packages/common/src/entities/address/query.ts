import type { Prisma } from "@dukkani/db/prisma/generated";

export type AddressSimpleDbData = Prisma.AddressGetPayload<{
	select: ReturnType<typeof AddressQuery.getSimpleSelect>;
}>;

export class AddressQuery {
	static getSimpleSelect() {
		return {} satisfies Prisma.AddressSelect;
	}
}
