"use client";

import { Icons } from "@dukkani/ui/components/icons";
import { useTranslations } from "next-intl";

interface ProductPhotosSectionProps {
	previews: string[];
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveImage: (index: number) => void;
}

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
						<img src={p} className="h-full w-full object-cover" alt="" />
						<button
							type="button"
							onClick={() => onRemoveImage(i)}
							className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
						>
							<Icons.x className="h-3 w-3" />
						</button>
					</div>
				))}
				{previews.length < 10 && (
					<label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-muted-foreground/20 border-dashed hover:bg-muted/50">
						<Icons.camera className="mb-1 h-6 w-6 text-muted-foreground/60" />
						<span className="text-[10px] text-muted-foreground">
							{t("form.addPhotos")}
						</span>
						<input
							type="file"
							multiple
							accept="image/*"
							className="hidden"
							onChange={onFileChange}
						/>
					</label>
				)}
			</div>
		</section>
	);
}
