import type {
	ConfigureStoreOnboardingInput,
	CreateStoreOnboardingInput,
} from "@dukkani/common/schemas/store/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeConfigurationFormDefaultValues as storeConfigurationFormDefaultOptions } from "@/components/auth/onboarding-store-configuration-form";
import { storeSetupFormDefaultOptions } from "@/components/auth/onboarding-store-setup-form";
import { handleAPIError } from "@/lib/error";
import { client } from "@/lib/orpc";
import { queryKeys } from "@/lib/query-keys";
import { useActiveStoreStore } from "@/stores/active-store.store";

/**
 * Hook for managing onboarding forms and mutations
 * Centralizes all form logic and API calls for onboarding
 */
export function useOnboardingForms(storeId: string | null) {
	const queryClient = useQueryClient();
	const { setSelectedStoreId } = useActiveStoreStore();

	// Mutations
	const createStoreMutation = useMutation({
		mutationFn: (input: CreateStoreOnboardingInput) =>
			client.store.create(input),
		onSuccess: async (data) => {
			setSelectedStoreId(data.id);
			queryClient.invalidateQueries({ queryKey: queryKeys.stores.all() });
			queryClient.invalidateQueries({ queryKey: queryKeys.account.current() });
			await queryClient.refetchQueries({
				queryKey: queryKeys.account.current(),
			});
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	const configureStoreMutation = useMutation({
		mutationFn: (input: ConfigureStoreOnboardingInput) =>
			client.store.configure(input),
		onSuccess: async (_data, variables) => {
			setSelectedStoreId(variables.storeId);
			queryClient.invalidateQueries({ queryKey: queryKeys.stores.all() });
			queryClient.invalidateQueries({ queryKey: queryKeys.account.current() });
			await queryClient.refetchQueries({
				queryKey: queryKeys.account.current(),
			});
		},
		onError: (error) => {
			handleAPIError(error);
		},
	});

	// Forms
	const storeSetupForm = useAppForm({
		...storeSetupFormDefaultOptions,
		onSubmit: async ({ value }) => {
			await createStoreMutation.mutateAsync(value);
		},
	});

	const storeConfigurationForm = useAppForm({
		...storeConfigurationFormDefaultOptions,
		onSubmit: async ({ value }) => {
			if (!storeId) {
				throw new Error(
					"Store ID is missing. Cannot configure store without it.",
				);
			}
			await configureStoreMutation.mutateAsync({ ...value, storeId });
		},
	});

	return {
		mutations: {
			createStoreMutation,
			configureStoreMutation,
		},
		forms: {
			storeSetupForm,
			storeConfigurationForm,
		},
		isLoading: {
			createStore: createStoreMutation.isPending,
			configureStore: configureStoreMutation.isPending,
		},
	};
}
