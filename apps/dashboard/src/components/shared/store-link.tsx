"use client";

import { Button } from "@dukkani/ui/components/button";
import { Icons } from "@dukkani/ui/components/icons";
import { Label } from "@dukkani/ui/components/label";
import { cn } from "@dukkani/ui/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface StoreLinkProps {
	url: string;
	label?: string;
	hint?: string;
	className?: string;
}

export function StoreLink({
	url,
	label = "Your store link",
	hint = "Tap to copy and share",
	className,
}: StoreLinkProps) {
	const { copy, copied } = useCopyToClipboard();

	const handleCopy = () => {
		copy(url, "Link copied to clipboard!");
	};

	return (
		<div className={cn("space-y-2", className)}>
			<Label htmlFor="store-link" className="text-muted-foreground text-sm">
				{label}
			</Label>
			<Button
				variant="outline"
				onClick={handleCopy}
				className="h-auto w-full justify-between rounded-lg border-border/50 p-4 text-left font-normal transition-colors hover:bg-accent/50"
			>
				<span className="truncate pr-2 font-semibold text-base text-foreground">
					{url}
				</span>
				<div className="flex shrink-0 items-center gap-2">
					{copied ? (
						<Icons.check className="size-4 text-success" />
					) : (
						<Icons.copy className="size-4 text-muted-foreground" />
					)}
				</div>
			</Button>
			<p className="text-muted-foreground text-xs">{hint}</p>
		</div>
	);
}
