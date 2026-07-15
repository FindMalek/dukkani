"use client";

import * as React from "react";
import { useIsMobile } from "../hooks/use-mobile";
import { cn } from "../lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "./drawer";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * Breakpoint at which `ResponsivePopover` switches from a `Drawer` (mobile,
 * bottom sheet) to a `Popover` (desktop, anchored). Matches the dashboard
 * shell's always-visible sidebar breakpoint so the two layout switches agree
 * on what counts as "desktop".
 */
const RESPONSIVE_POPOVER_BREAKPOINT = 1280;

const ResponsivePopoverContext = React.createContext<boolean | null>(null);

function useResponsivePopoverContext() {
  const isDesktop = React.useContext(ResponsivePopoverContext);
  if (isDesktop === null) {
    throw new Error(
      "ResponsivePopover subcomponents must be used within a <ResponsivePopover>",
    );
  }
  return isDesktop;
}

type ResponsivePopoverProps = React.ComponentProps<typeof Popover>;

/**
 * Renders a `Popover` at >=1280px and a `Drawer` (bottom sheet) below that,
 * sharing the exact same trigger/content children between both. Use with
 * `ResponsivePopoverTrigger` and `ResponsivePopoverContent` — content should
 * stay breakpoint-agnostic, since only the surrounding container swaps.
 *
 * @example
 * ```tsx
 * <ResponsivePopover open={open} onOpenChange={setOpen}>
 *   <ResponsivePopoverTrigger asChild>
 *     <Button variant="outline">Filters</Button>
 *   </ResponsivePopoverTrigger>
 *   <ResponsivePopoverContent>
 *     {// shared filter body, unchanged between mobile/desktop}
 *   </ResponsivePopoverContent>
 * </ResponsivePopover>
 * ```
 */
function ResponsivePopover({ ...props }: ResponsivePopoverProps) {
  const isMobile = useIsMobile(RESPONSIVE_POPOVER_BREAKPOINT);
  const isDesktop = !isMobile;

  const Container = isDesktop ? Popover : Drawer;

  return (
    <ResponsivePopoverContext.Provider value={isDesktop}>
      <Container {...props} />
    </ResponsivePopoverContext.Provider>
  );
}

type ResponsivePopoverTriggerProps = React.ComponentProps<
  typeof PopoverTrigger
>;

function ResponsivePopoverTrigger({ ...props }: ResponsivePopoverTriggerProps) {
  const isDesktop = useResponsivePopoverContext();
  const Trigger = isDesktop ? PopoverTrigger : DrawerTrigger;

  return <Trigger data-slot="responsive-popover-trigger" {...props} />;
}

type ResponsivePopoverContentProps = React.ComponentProps<
  typeof PopoverContent
>;

/**
 * Desktop content is capped to a sane fixed width (unlike the drawer, which
 * spans the viewport) — pass `className` to override if a filter body needs
 * more room.
 */
function ResponsivePopoverContent({
  className,
  align = "end",
  children,
  ...props
}: ResponsivePopoverContentProps) {
  const isDesktop = useResponsivePopoverContext();

  if (isDesktop) {
    return (
      <PopoverContent
        data-slot="responsive-popover-content"
        align={align}
        className={cn("w-80 max-w-sm p-0", className)}
        {...props}
      >
        {children}
      </PopoverContent>
    );
  }

  return (
    <DrawerContent
      data-slot="responsive-popover-content"
      className={cn("max-h-[85vh]", className)}
    >
      {children}
    </DrawerContent>
  );
}

export {
  ResponsivePopover,
  ResponsivePopoverContent,
  ResponsivePopoverTrigger,
};
