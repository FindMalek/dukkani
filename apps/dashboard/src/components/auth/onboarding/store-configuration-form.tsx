import { configureStoreOnboardingInputSchema } from "@dukkani/common/schemas/store/input";
import { Form } from "@dukkani/ui/components/forms/wrapper";
import { withForm } from "@dukkani/ui/hooks/use-app-form";

const StoreConfigurationOnboardingForm = withForm({
    defaultValues: {},
    validators: {
        onChangeAsync: configureStoreOnboardingInputSchema,
    },
    onSubmit: async ({value}) => {
        console.log(value);
    },
    render: function RenderForm({form}) {
        return (
            <Form onSubmit={form.handleSubmit}>
                Hi
            </Form>
        );
    }
});