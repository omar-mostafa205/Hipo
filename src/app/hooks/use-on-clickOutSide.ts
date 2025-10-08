import { RefObject, useEffect, useCallback } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: Event) => void,
) => {
  // Memoize the handler to prevent unnecessary re-renders
  const memoizedHandler = useCallback(handler, [handler]);

  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current;
      const target = event?.target as Node;

      // Check if the element exists and if the click is outside
      if (!el || !target || el.contains(target)) {
        return;
      }

      memoizedHandler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, memoizedHandler]);
};

// Alternative simpler version if you prefer:
export const useOnClickOutsideSimple = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
