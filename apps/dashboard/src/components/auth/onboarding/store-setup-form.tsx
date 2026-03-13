import { storeNotificationMethodEnum } from "@dukkani/common/schemas";
import {
	type CreateStoreOnboardingInput,
	createStoreOnboardingInputSchema,
} from "@dukkani/common/schemas/store/input";
import { Form } from "@dukkani/ui/components/forms/wrapper";

import { withForm } from "@dukkani/ui/hooks/use-app-form";

export const StoreSetupOnboardingForm = withForm({
	defaultValues: {
		name: "",
		description: "",
		notificationMethod: storeNotificationMethodEnum.EMAIL,
	} as CreateStoreOnboardingInput,
	validators: {
		onChangeAsync: createStoreOnboardingInputSchema,
	},
	render: function RenderForm({ form }) {
		return <Form onSubmit={form.handleSubmit}>Hi</Form>;
	},
});
