import type {
	StorageFileSimpleOutput,
	StorageFileIncludeOutput,
} from "../../schemas/storage/output";
import type {
	StorageFileSimpleDbData,
	StorageFileIncludeDbData,
} from "./query";

export class StorageFileEntity {
	static getSimpleRo(entity: StorageFileSimpleDbData): StorageFileSimpleOutput {
		return {
			id: entity.id,
			bucket: entity.bucket,
			path: entity.path,
			originalUrl: entity.originalUrl,
			url: entity.url,
			mimeType: entity.mimeType,
			fileSize: entity.fileSize,
			optimizedSize: entity.optimizedSize,
			width: entity.width,
			height: entity.height,
			alt: entity.alt,
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		};
	}

	static getRo(entity: StorageFileIncludeDbData): StorageFileIncludeOutput {
		return {
			...this.getSimpleRo(entity),
			variants: entity.variants.map((variant) => ({
				id: variant.id,
				storageFileId: variant.storageFileId,
				variant: variant.variant,
				url: variant.url,
				width: variant.width,
				height: variant.height,
				fileSize: variant.fileSize,
				createdAt: variant.createdAt,
				updatedAt: variant.updatedAt,
			})),
		};
	}
}
