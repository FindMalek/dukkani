interface ProductHeaderProps {
	name: string;
	price: number;
}

export async function ProductHeader({ name, price }: ProductHeaderProps) {
	const formattedPrice = price.toFixed(2);

	return (
		<div className="flex items-baseline justify-between gap-4">
			<h1 className="flex-1 font-bold text-2xl text-foreground">{name}</h1>
			<p className="font-bold text-2xl text-foreground">{formattedPrice} TND</p>
		</div>
	);
}
