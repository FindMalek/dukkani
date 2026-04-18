import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/auth/auth-guard";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { StoreInitializer } from "@/components/layout/store-initializer";
import { appQueries } from "@/shared/api/queries";
import { getServerQueryClient } from "@/shared/api/query-client.server";
import { getServerSession } from "@/shared/api/session.server";
import { RoutePaths } from "@/shared/config/routes";

const DashboardLayoutContent = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <StoreInitializer>
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <main className="overflow-auto">{children}</main>
      <BottomNavigation />
    </div>
  </StoreInitializer>
);

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const session = await getServerSession();

  if (!session?.user) {
    return (
      <AuthGuard redirectTo={RoutePaths.AUTH.LOGIN.url} requireAuth>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </AuthGuard>
    );
  }

  const queryClient = getServerQueryClient();

  // Prefetch in parallel — eliminates the client-side waterfall where
  // StoreInitializer had to wait for a network round-trip before knowing
  // which store to select. Both queries resolve from the hydrated cache
  // on the client without any additional fetches.
  await Promise.all([
    queryClient.prefetchQuery(appQueries.account.currentUser()),
    queryClient.prefetchQuery(appQueries.store.all()),
  ]);

  // Read onboarding step from the prefetched cache — no extra API call needed
  const user = queryClient.getQueryData(
    appQueries.account.currentUser().queryKey,
  );

  if (user && user.onboardingStep === UserOnboardingStep.STORE_SETUP) {
    redirect(RoutePaths.AUTH.ONBOARDING.INDEX.url);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </HydrationBoundary>
  );
}
