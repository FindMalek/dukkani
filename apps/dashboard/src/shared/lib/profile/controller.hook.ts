"use client";

import { updateProfileInputSchema } from "@dukkani/common/schemas/user/input";
import { useAppForm } from "@dukkani/ui/hooks/use-app-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { authClient } from "@/shared/api/auth-client";
import { handleAPIError } from "@/shared/api/error-handler";
import { client } from "@/shared/api/orpc";
import { appQueries } from "@/shared/api/queries";

/** Better Auth's `providerId` for an email/password account. */
export const CREDENTIAL_PROVIDER_ID = "credential";

/**
 * Linked Better Auth accounts (email/password + any OAuth connections) for
 * the current session. Not part of `appQueries`/oRPC — this hits Better
 * Auth's own `/list-accounts` endpoint directly via `authClient`, same as
 * `authClient.useSession()` elsewhere in this app.
 */
export function useLinkedAccounts() {
  return useQuery({
    queryKey: ["auth", "list-accounts"],
    queryFn: async () => {
      const { data, error } = await authClient.listAccounts();
      if (error) {
        throw error;
      }
      return data ?? [];
    },
    staleTime: 60 * 1000,
  });
}

/**
 * Re-reads the current user after a direct Better Auth client mutation
 * (`updateUser`, avatar upload) so `appQueries.account.currentUser` — used
 * by this page and by `NavUser` in the sidebar — reflects the change.
 */
export function useRefreshCurrentUser() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries(appQueries.account.currentUser());
    await queryClient.refetchQueries(appQueries.account.currentUser());
  };
}

/**
 * Controller hook for Settings > Profile: composes the current user, linked
 * accounts (to tell email/password vs OAuth-only merchants apart), and the
 * avatar upload flow.
 *
 * The "Personal Information" form lives in `usePersonalInfoForm`
 * (profile-personal-info-card.tsx) and password change in
 * `ChangePasswordCard` (profile-security-card.tsx) — both only mount once
 * their required data (current user / account list) is loaded, so their
 * `useAppForm` default values are seeded correctly on first render instead
 * of needing a reset-on-load effect.
 */
export function useProfileController() {
  const t = useTranslations("settings.profile");
  const refreshCurrentUser = useRefreshCurrentUser();

  const { data: user, isPending: isUserPending } = useQuery(
    appQueries.account.currentUser(),
  );
  const { data: accounts, isPending: isAccountsPending } =
    useLinkedAccounts();

  const hasPasswordAccount =
    accounts?.some(
      (account) => account.providerId === CREDENTIAL_PROVIDER_ID,
    ) ?? false;
  const oauthAccount = accounts?.find(
    (account) => account.providerId !== CREDENTIAL_PROVIDER_ID,
  );

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const { file: uploaded } = await client.account.uploadAvatar({ file });
      const { error } = await authClient.updateUser({
        image: uploaded.url,
      });
      if (error) {
        throw error;
      }
      return uploaded;
    },
    onSuccess: async () => {
      await refreshCurrentUser();
      toast.success(t("avatar.updateSuccess"));
    },
    onError: (error) => {
      handleAPIError(error, t("avatar.uploadError"));
    },
  });

  return {
    user,
    isUserPending,
    accounts,
    isAccountsPending,
    hasPasswordAccount,
    oauthProviderId: oauthAccount?.providerId,
    uploadAvatarMutation,
  };
}

/**
 * Form for the "Personal Information" card. Callers must only mount this
 * once `user` has loaded (see `useProfileController`) so `defaultValues`
 * captures the real name instead of an empty string.
 */
export function usePersonalInfoForm(user: { name: string }) {
  const t = useTranslations("settings.profile.personalInfo");
  const refreshCurrentUser = useRefreshCurrentUser();

  return useAppForm({
    defaultValues: { name: user.name },
    validators: { onSubmit: updateProfileInputSchema },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.updateUser({ name: value.name });
      if (error) {
        handleAPIError(error);
        return;
      }
      await refreshCurrentUser();
      toast.success(t("success"));
    },
  });
}
