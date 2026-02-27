import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CheckboxField } from "../components/forms/checkbox-field";
import { EmailField } from "../components/forms/email-field";
import { NumberField } from "../components/forms/number-field";
import { PasswordField } from "../components/forms/password-field";
import { SelectField } from "../components/forms/select-field";
import { TextAreaField } from "../components/forms/text-area-field";
import { TextField } from "../components/forms/text-field";

const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		TextInput: TextField,
		EmailInput: EmailField,
		TextAreaInput: TextAreaField,
		PasswordInput: PasswordField,
		NumberInput: NumberField,
		SelectInput: SelectField,
		CheckboxInput: CheckboxField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});

export { useFieldContext, useFormContext, useAppForm };
