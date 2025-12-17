import { cn } from "../lib/utils";
import { Icons } from "./icons";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
	return (
		<Icons.spinner
			role="status"
			aria-label="Loading"
			className={cn("size-4 animate-spin", className)}
			{...props}
		/>
	);
}

export { Spinner };
