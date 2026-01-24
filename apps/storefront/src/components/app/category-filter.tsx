"use client";

import { Button } from "@dukkani/ui/components/button";
import { ScrollArea, ScrollBar } from "@dukkani/ui/components/scroll-area";
import { cn } from "@dukkani/ui/lib/utils";
import { useTranslations } from "next-intl";
import { useFilterStore } from "@/stores/filter.store";

interface Category {
	id: string | null;
	name: string;
}

interface CategoryFilterProps {
	categories: Category[];
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
	const t = useTranslations("storefront.store.categoryFilter");
	const { selectedCategoryId, setSelectedCategoryId } = useFilterStore();
	if (categories.length === 0) {
		return null;
	}

	return (
		<div className="mb-6 w-full overflow-x-hidden px-4">
			<ScrollArea className="w-full whitespace-nowrap">
				<div className="flex gap-2 pb-4">
					<Button
						variant={selectedCategoryId === null ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategoryId(null)}
						className={cn(
							"rounded-full",
							selectedCategoryId === null &&
								"bg-primary text-primary-foreground",
						)}
					>
						{t("all")}
					</Button>
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={
								selectedCategoryId === category.id ? "default" : "outline"
							}
							size="sm"
							onClick={() => setSelectedCategoryId(category.id)}
							className={cn(
								"rounded-full",
								selectedCategoryId === category.id &&
									"bg-primary text-primary-foreground",
							)}
						>
							{category.name}
						</Button>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
