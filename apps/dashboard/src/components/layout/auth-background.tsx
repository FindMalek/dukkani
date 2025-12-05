export function AuthBackground() {
	return (
		<div className="relative hidden bg-gradient-to-br from-background to-muted lg:block lg:w-1/2">
			<div className="absolute inset-0 flex items-center justify-center p-12">
				<div className="space-y-6 text-center">
					<h2 className="font-serif text-3xl">Welcome to Dukkani</h2>
					<p className="max-w-md text-muted-foreground">
						Turn your WhatsApp into a powerful sales channel. Automated orders,
						seamless payments, and instant customer connection.
					</p>
				</div>
			</div>
			{/* Optional: Add a subtle pattern or gradient overlay */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
		</div>
	);
}
