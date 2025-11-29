import type {
	CreateStorageFileData,
	CreateVariantData,
	StorageFileIncludeOutput,
	StorageFileResult,
	StorageFileSimpleOutput,
} from "../../schemas/storage/output";
import type {
	StorageFileIncludeDbData,
	StorageFileSimpleDbData,
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
			...StorageFileEntity.getSimpleRo(entity),
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

	static createFileData(result: StorageFileResult): CreateStorageFileData {
		return {
			bucket: result.bucket,
			path: result.path,
			originalUrl: result.originalUrl,
			url: result.url,
			mimeType: result.mimeType,
			fileSize: result.fileSize,
			optimizedSize: result.optimizedSize ?? null,
			width: result.width ?? null,
			height: result.height ?? null,
			alt: result.alt ?? null,
		};
	}

	static createVariantData(result: StorageFileResult): CreateVariantData[] {
		return result.variants.map((variant) => ({
			variant: variant.variant,
			url: variant.url,
			width: variant.width ?? null,
			height: variant.height ?? null,
			fileSize: variant.fileSize,
		}));
	}
}
