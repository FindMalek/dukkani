"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Input } from "@dukkani/ui/components/input";
import { Label } from "@dukkani/ui/components/label";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ProductPhotosSectionProps {
	previews: string[];
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveImage: (index: number) => void;
}

/**
 * Product Photos Section
 *
 * TODO: Add image cropping functionality
 * - Linear Issue: https://linear.app/findmalek/issue/FIN-249/add-image-cropper-component-for-product-photos
 * - Reference: https://21st.dev/ruixenui/image-cropper/default
 * - Allow users to crop/edit images before adding them to the product
 */
export function ProductPhotosSection({
	previews,
	onFileChange,
	onRemoveImage,
}: ProductPhotosSectionProps) {
	const t = useTranslations("products.create");

	return (
		<section>
			<h3 className="mb-3 font-semibold text-sm">{t("sections.photos")}</h3>
			<div className="scrollbar-hide flex gap-3 overflow-x-auto">
				{previews.map((p, i) => (
					<div
						key={p}
						className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted"
					>
						<Image src={p} alt="" fill className="object-cover" unoptimized />
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => onRemoveImage(i)}
							className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
						>
							<Icons.x className="h-3 w-3" />
						</Button>
					</div>
				))}
				{previews.length < 10 && (
					<Label
						htmlFor="product-photos-input"
						className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-muted-foreground/20 border-dashed transition-colors hover:bg-muted/50"
					>
						<Icons.camera className="mb-1 h-6 w-6 text-muted-foreground/60" />
						<span className="text-[10px] text-muted-foreground">
							{t("form.addPhotos")}
						</span>
						<Input
							id="product-photos-input"
							type="file"
							multiple
							accept="image/*"
							className="hidden"
							onChange={onFileChange}
						/>
					</Label>
				)}
			</div>
		</section>
	);
}
