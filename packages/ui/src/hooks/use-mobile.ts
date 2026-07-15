import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Tracks whether the viewport is narrower than `breakpoint` (defaults to the
 * standard mobile breakpoint of 768px). Pass a custom breakpoint to reuse the
 * same matchMedia-based tracking for other container/layout switches (e.g.
 * `ResponsivePopover` uses 1280px to match the dashboard shell's
 * always-visible sidebar breakpoint) instead of re-deriving the pattern.
 */
export function useIsMobile(breakpoint: number = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return !!isMobile;
}
