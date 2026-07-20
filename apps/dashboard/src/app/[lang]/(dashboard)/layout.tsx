import { UserOnboardingStep } from "@dukkani/common/schemas/enums";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@dukkani/ui/components/sidebar";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthGuard } from "@/components/app/auth/auth-guard";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { BottomNavigation } from "@/components/layout/bottom-navigation";
import { DashboardTopbar } from "@/components/layout/dashboard-topbar";
import { StoreInitializer } from "@/components/layout/store-initializer";
import { appQueries } from "@/shared/api/queries";
import { getServerQueryClient } from "@/shared/api/query-client.server";
import { getServerSession } from "@/shared/api/session.server";
import { RoutePaths } from "@/shared/config/routes";

// Matches the cookie name shadcn's `SidebarProvider` writes on toggle
// (`packages/ui/src/components/sidebar.tsx`) — read server-side so the
// desktop sidebar renders already-collapsed/expanded on first paint instead
// of flashing open then snapping to the persisted state.
const SIDEBAR_COOKIE_NAME = "sidebar_state";

const DashboardLayoutContent = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value !== "false";

  return (
    <StoreInitializer>
      <SidebarProvider defaultOpen={defaultOpen} className="h-svh">
        <AppSidebar />
        <SidebarInset>
          <DashboardTopbar />
          <header className="hidden h-14 shrink-0 items-center border-border border-b px-4 xl:flex">
            <SidebarTrigger />
          </header>
          <div className="flex-1 overflow-auto pb-16 xl:pb-0">{children}</div>
        </SidebarInset>
        <BottomNavigation />
      </SidebarProvider>
    </StoreInitializer>
  );
};

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
