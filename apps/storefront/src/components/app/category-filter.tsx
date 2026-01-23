import { Button } from "@dukkani/ui/components/button";
import { ScrollArea, ScrollBar } from "@dukkani/ui/components/scroll-area";
import { cn } from "@dukkani/ui/lib/utils";

interface Category {
	id: string | null;
	name: string;
}

interface CategoryFilterProps {
	categories: Category[];
	selectedCategoryId: string | null;
	onCategoryChange: (categoryId: string | null) => void;
}

export function CategoryFilter({
	categories,
	selectedCategoryId,
	onCategoryChange,
}: CategoryFilterProps) {
	return (
		<div className="container mx-auto mb-6 px-4">
			<ScrollArea className="w-full whitespace-nowrap">
				<div className="flex gap-2 pb-4">
					<Button
						variant={selectedCategoryId === null ? "default" : "outline"}
						size="sm"
						onClick={() => onCategoryChange(null)}
						className={cn(
							"rounded-full",
							selectedCategoryId === null &&
								"bg-primary text-primary-foreground",
						)}
					>
						All
					</Button>
					{categories.map((category) => (
						<Button
							key={category.id}
							variant={
								selectedCategoryId === category.id ? "default" : "outline"
							}
							size="sm"
							onClick={() => onCategoryChange(category.id)}
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
