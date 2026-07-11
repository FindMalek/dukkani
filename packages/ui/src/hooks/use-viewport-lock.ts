"use client";

import * as React from "react";

type UseViewportLockOptions = {
  enabled?: boolean;
};

// iOS Safari scrolls the layout viewport (not the shrinking visual viewport) to keep
// a focused input visible, pushing `position: fixed` containers off-screen; this
// counters it. Consumers must add `data-viewport-locked` (see globals.css).
export function useViewportLock(options: UseViewportLockOptions = {}) {
  const { enabled = true } = options;
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const visualViewport = window.visualViewport;

    if (!enabled || !container || !visualViewport) {
      return;
    }

    const onResize = () => {
      container.style.height = `${visualViewport.height}px`;
    };

    const onScroll = () => {
      window.scrollTo(0, 0);
    };

    const onTouchEnd = (event: TouchEvent) => {
      const target = event.target;
      if (
        (target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement) &&
        !target.disabled &&
        !target.readOnly
      ) {
        event.preventDefault();
        target.focus({ preventScroll: true });
      }
    };

    visualViewport.addEventListener("resize", onResize);
    visualViewport.addEventListener("scroll", onScroll);
    container.addEventListener("touchend", onTouchEnd);
    onResize();

    return () => {
      visualViewport.removeEventListener("resize", onResize);
      visualViewport.removeEventListener("scroll", onScroll);
      container.removeEventListener("touchend", onTouchEnd);
      container.style.height = "";
    };
  }, [container, enabled]);

  return setContainer;
}
