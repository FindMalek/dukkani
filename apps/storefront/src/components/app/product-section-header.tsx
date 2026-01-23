import { Button } from "@dukkani/ui/components/button";

interface ProductSectionHeaderProps {
	title?: string;
	showFilter?: boolean;
	onFilterClick?: () => void;
}

export function ProductSectionHeader({
	title = "New Arrivals",
	showFilter = true,
	onFilterClick,
}: ProductSectionHeaderProps) {
	return (
		<div className="container mx-auto mb-4 px-4">
			<div className="flex items-center justify-between">
				<h2 className="font-bold text-xl">{title}</h2>
				{showFilter && (
					<Button variant="ghost" size="sm" onClick={onFilterClick}>
						Filter
					</Button>
				)}
			</div>
		</div>
	);
}
