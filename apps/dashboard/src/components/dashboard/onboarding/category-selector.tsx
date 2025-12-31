import { StoreEntity } from "@dukkani/common/entities/store/entity";
import {
	StoreCategory,
	storeCategoryEnum,
} from "@dukkani/common/schemas/enums";
import { Icons } from "@dukkani/ui/components/icons";
import { ScrollArea, ScrollBar } from "@dukkani/ui/components/scroll-area";
import { cn } from "@dukkani/ui/lib/utils";
import type { useTranslations } from "next-intl";

const CATEGORY_ICONS = {
	[StoreCategory.FASHION]: Icons.shirt,
	[StoreCategory.ELECTRONICS]: Icons.laptop,
	[StoreCategory.FOOD]: Icons.utensils,
	[StoreCategory.HOME]: Icons.home,
	[StoreCategory.BEAUTY]: Icons.beauty,
	[StoreCategory.SPORTS]: Icons.sports,
	[StoreCategory.BOOKS]: Icons.books,
	[StoreCategory.TOYS]: Icons.toys,
	[StoreCategory.OTHER]: Icons.other,
};
export function CategorySelector({
	value,
	onChange,
	t,
}: {
	value: StoreCategory;
	onChange: (value: StoreCategory) => void;
	t: ReturnType<typeof useTranslations>;
}) {
	return (
		<ScrollArea className="w-full whitespace-nowrap rounded-md">
			<div className="flex w-max space-x-4 p-1">
				{Object.values(storeCategoryEnum).map((cat) => {
					const Icon = CATEGORY_ICONS[cat as StoreCategory];
					const isActive = value === cat;
					return (
						<button
							key={cat}
							type="button"
							onClick={() => onChange(cat)}
							className={cn(
								"flex flex-col items-center gap-2 outline-none transition-all",
								isActive ? "scale-105" : "opacity-60 hover:opacity-100",
							)}
						>
							<div
								className={cn(
									"flex h-11 w-11 items-center justify-center rounded-xl border transition-colors",
									isActive
										? "border-primary bg-primary text-primary-foreground"
										: "border-muted bg-muted/20",
								)}
							>
								<Icon className="h-5 w-5" />
							</div>
							<span className="font-medium text-[11px]">
								{
									t(
										StoreEntity.getCategoryLabelKey(cat as StoreCategory),
									).split(" ")[0]
								}
							</span>
						</button>
					);
				})}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
