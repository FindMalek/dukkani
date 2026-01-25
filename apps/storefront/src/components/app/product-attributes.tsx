interface ProductAttributesProps {
	tags?: string[];
}

export function ProductAttributes({ tags }: ProductAttributesProps) {
	if (!tags || tags.length === 0) {
		return null;
	}

	return <p className="text-muted-foreground text-sm">{tags.join(" • ")}</p>;
}
