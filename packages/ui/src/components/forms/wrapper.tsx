import type React from "react";

type FormWrapperProps = {
	children: React.ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

function FormWrapper({ children, onSubmit, ...props }: FormWrapperProps) {
	return (
		<form
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit?.(e);
			}}
			{...props}
		>
			{children}
		</form>
	);
}

export { FormWrapper as Form };
