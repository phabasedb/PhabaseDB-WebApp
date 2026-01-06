/**
 * Tracks the width of a DOM container element.
 *
 * Measures the rendered width of a referenced element and updates
 * automatically on mount and window resize.
 * Useful for responsive layouts where component size depends
 * on the actual container width (e.g. charts or tables).
 */

import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";

export default function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  const measure = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.getBoundingClientRect().width;
    setWidth(w);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return { ref, width, measure };
}
