import type {
	StorageUploadResource,
	StorageUploadTarget,
} from "@dukkani/common/schemas/storage/input";
import { database } from "@dukkani/db";
import { logger } from "@dukkani/logger";
import type { StorageFileMapping } from "../types";

/**
 * Utility for mapping source files to target storage structure
 */
export class FileMapper {
	/**
	 * Extract path from Supabase public URL
	 */
	extractPathFromSupabaseUrl(url: string, bucket: string): string | null {
		try {
			const suffix = `/object/public/${bucket}/`;
			const idx = url.indexOf(suffix);
			if (idx === -1) return null;
			return url.slice(idx + suffix.length);
		} catch {
			return null;
		}
	}

	/**
	 * Infer target structure from database records
	 */
	async inferTargetFromDatabase(): Promise<StorageFileMapping[]> {
		const mappings: StorageFileMapping[] = [];

		// Get storage files from database
		const storageFiles = await database.storageFile.findMany({
			select: {
				id: true,
				path: true,
				originalUrl: true,
				url: true,
				bucket: true,
			},
		});

		for (const file of storageFiles) {
			const target = this.inferTargetFromPath(file.path);
			if (target) {
				mappings.push({
					sourcePath: file.path,
					target,
					sourceUrl: file.url,
					fileId: file.id,
				});
			}
		}

		// Get file variants
		const variants = await database.storageFileVariant.findMany({
			select: { url: true },
		});

		for (const variant of variants) {
			const path = this.extractPathFromSupabaseUrl(variant.url, "production");
			if (path) {
				const target = this.inferTargetFromPath(path);
				if (target) {
					mappings.push({
						sourcePath: path,
						target,
						sourceUrl: variant.url,
					});
				}
			}
		}

		// Get images
		const images = await database.image.findMany({ select: { url: true } });
		for (const img of images) {
			const path = this.extractPathFromSupabaseUrl(img.url, "production");
			if (path) {
				const target = this.inferTargetFromPath(path);
				if (target) {
					mappings.push({
						sourcePath: path,
						target,
						sourceUrl: img.url,
					});
				}
			}
		}

		logger.info(`Inferred ${mappings.length} file mappings from database`);
		return mappings;
	}

	/**
	 * Infer target structure from file path
	 */
	inferTargetFromPath(path: string): StorageUploadTarget | null {
		// Try to parse path patterns to infer resource, entity, and role
		// This is a simplified version - you'd need to adjust based on your actual path structure

		const parts = path.split("/");

		// Example patterns:
		// stores/{storeId}/logo/{fileId}
		// stores/{storeId}/banner/{fileId}
		// products/{productId}/gallery/{fileId}
		// products/{productId}/main/{fileId}
		// avatars/{userId}/profile/{fileId}

		if (parts.length >= 2) {
			const resource = parts[0] as StorageUploadResource;
			const entityId = parts[1];

			// Validate resource type
			if (["avatars", "stores", "products"].includes(resource)) {
				return {
					resource,
					entityId: entityId || "",
					assetId: parts.slice(2).join("-") || undefined,
				};
			}
		}

		// Fallback: use generic structure
		return {
			resource: "products" as StorageUploadResource,
			entityId: "unknown",
			assetId: path.replace(/[^a-zA-Z0-9-]/g, "-"),
		};
	}

	/**
	 * Create mappings from simple file list
	 */
	createMappingsFromFileList(paths: string[]): StorageFileMapping[] {
		return paths.map((path) => ({
			sourcePath: path,
			target: this.inferTargetFromPath(path) || {
				resource: "products" as StorageUploadResource,
				entityId: "migrated",
				assetId: path.replace(/[^a-zA-Z0-9-]/g, "-"),
			},
		}));
	}

	/**
	 * Validate mapping consistency
	 */
	validateMappings(mappings: StorageFileMapping[]): {
		valid: boolean;
		errors: string[];
	} {
		const errors: string[] = [];
		const seenPaths = new Set<string>();

		for (const mapping of mappings) {
			// Check for duplicate source paths
			if (seenPaths.has(mapping.sourcePath)) {
				errors.push(`Duplicate source path: ${mapping.sourcePath}`);
			}
			seenPaths.add(mapping.sourcePath);

			// Validate target structure
			if (!mapping.target.entityId) {
				errors.push(`Missing entity ID for: ${mapping.sourcePath}`);
			}

			if (
				!["avatars", "stores", "products"].includes(mapping.target.resource)
			) {
				errors.push(
					`Invalid resource '${mapping.target.resource}' for: ${mapping.sourcePath}`,
				);
			}
		}

		return {
			valid: errors.length === 0,
			errors,
		};
	}
}
