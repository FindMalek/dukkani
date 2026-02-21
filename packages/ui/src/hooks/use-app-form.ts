import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CheckboxField } from "../components/forms/checkbox-field";
import { EmailField } from "../components/forms/email-field";
import { PasswordField } from "../components/forms/password-field";
import { TextField } from "../components/forms/text-field";

const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		TextInput: TextField,
		EmailInput: EmailField,
		PasswordInput: PasswordField,
		CheckboxInput: CheckboxField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});

export { useFieldContext, useFormContext, useAppForm };
