import { StoreTheme } from "@dukkani/common/schemas/enums";
import { cn } from "@dukkani/ui/lib/utils";

interface ThemePreviewBaseProps {
	children: React.ReactNode;
	className?: string;
}

function ThemePreviewBase({ children, className }: ThemePreviewBaseProps) {
	return (
		<div
			className={cn(
				"h-16 w-full overflow-hidden rounded-md border bg-background",
				className,
			)}
		>
			{/* Mock Browser/App Header */}
			<div className="flex origin-top scale-75 items-center justify-between border-b px-2 py-1 opacity-50">
				<div className="h-1.5 w-6 rounded bg-muted-foreground/30" />
				<div className="flex gap-0.5">
					<div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
					<div className="h-1 w-1 rounded-full bg-muted-foreground/30" />
				</div>
			</div>
			{/* Mock Content */}
			<div className="space-y-1 p-1.5">{children}</div>
		</div>
	);
}

export function ModernPreview() {
	return (
		<ThemePreviewBase className="bg-slate-50">
			<div className="mx-auto h-2 w-3/4 rounded bg-primary/80" />
			<div className="grid grid-cols-2 gap-1">
				<div className="h-6 rounded border bg-white" />
				<div className="h-6 rounded border bg-white" />
			</div>
		</ThemePreviewBase>
	);
}

export function DarkPreview() {
	return (
		<ThemePreviewBase className="border-slate-800 bg-slate-950">
			<div className="mx-auto h-2 w-3/4 rounded bg-slate-800" />
			<div className="grid grid-cols-2 gap-1">
				<div className="h-6 rounded border-slate-800 bg-slate-900" />
				<div className="h-6 rounded border-slate-800 bg-slate-900" />
			</div>
		</ThemePreviewBase>
	);
}

export function MinimalPreview() {
	return (
		<ThemePreviewBase>
			<div className="mx-auto mt-1 h-1.5 w-1/2 rounded bg-slate-900" />
			<div className="mt-1 h-8 rounded border-2 border-dashed bg-transparent" />
		</ThemePreviewBase>
	);
}

export function ClassicPreview() {
	return (
		<ThemePreviewBase className="border-stone-200 bg-[#FDFBF7]">
			<div className="mx-auto h-2 w-2/3 rounded bg-stone-800" />
			<div className="h-8 rounded border border-stone-200 bg-white" />
		</ThemePreviewBase>
	);
}

export function LightPreview() {
	return (
		<ThemePreviewBase className="bg-white">
			<div className="mx-auto h-2 w-3/4 rounded bg-slate-100" />
			<div className="grid grid-cols-2 gap-1">
				<div className="h-6 rounded border bg-slate-50" />
				<div className="h-6 rounded border bg-slate-50" />
			</div>
		</ThemePreviewBase>
	);
}

export const THEME_PREVIEWS: Record<StoreTheme, React.ComponentType> = {
	[StoreTheme.MODERN]: ModernPreview,
	[StoreTheme.DARK]: DarkPreview,
	[StoreTheme.MINIMAL]: MinimalPreview,
	[StoreTheme.CLASSIC]: ClassicPreview,
	[StoreTheme.LIGHT]: LightPreview,
};
