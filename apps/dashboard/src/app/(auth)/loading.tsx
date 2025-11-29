import { Skeleton } from "@dukkani/ui/components/skeleton";

export default function AuthLoading() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md space-y-6">
				<div className="space-y-2 text-center">
					<Skeleton className="mx-auto h-8 w-48" />
					<Skeleton className="mx-auto h-4 w-64" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}
