export class ImageQuery {
	static getSimpleInclude() {
		return {} as const;
	}

	static getInclude() {
		return {
			...this.getSimpleInclude(),
			product: true,
		} as const;
	}

	static getClientSafeInclude() {
		return {
			...this.getSimpleInclude(),
		} as const;
	}
}

export interface ImageSimpleDbData {
	id: string;
	url: string;
	productId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ImageIncludeDbData extends ImageSimpleDbData {
	product?: unknown;
}

export interface ImageClientSafeDbData extends ImageSimpleDbData {}
