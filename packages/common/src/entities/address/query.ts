import type { Prisma } from "@dukkani/db/prisma/generated";

export type AddressSimpleDbData = Prisma.AddressGetPayload<{
	select: ReturnType<typeof AddressQuery.getSimpleSelect>;
}>;

export class AddressQuery {
	static getSimpleSelect() {
		return {
		  id: true,
		  street: true,
		  city: true,
		  postalCode: true,
		  latitude: true,
		  longitude: true,
		} satisfies Prisma.AddressSelect;
	  }
}
