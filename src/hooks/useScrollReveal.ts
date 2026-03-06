"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which feed items and tree-ring dividers have scrolled into view.
 *
 * Elements must carry the following data attributes:
 *   - Items:    `data-item-id={id}`
 *   - Dividers: `data-divider-id={index}`
 *
 * Call `reset()` in a `useEffect` whenever the rendered list changes
 * (e.g. when a filter updates) so newly mounted elements get observed.
 */
export function useScrollReveal() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [drawnDividers, setDrawnDividers] = useState<Set<number>>(new Set());
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const dividerRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [observationKey, setObservationKey] = useState(0);

  const setItemRef = useCallback((el: HTMLDivElement | null) => {
    if (el?.dataset.itemId) itemRefs.current.set(el.dataset.itemId, el);
  }, []);

  const setDividerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) dividerRefs.current.set(Number(el.dataset.dividerId), el);
  }, []);

  const reset = useCallback(() => setObservationKey((k) => k + 1), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: observationKey triggers re-observation after reset
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;

          if (el.dataset.itemId) {
            const id = el.dataset.itemId;
            setVisibleItems((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }

          if (el.dataset.dividerId) {
            const id = Number(el.dataset.dividerId);
            setDrawnDividers((prev) => {
              if (prev.has(id)) return prev;
              const next = new Set(prev);
              next.add(id);
              return next;
            });
          }

          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    const timer = setTimeout(() => {
      for (const el of itemRefs.current.values()) observer.observe(el);
      for (const el of dividerRefs.current.values()) observer.observe(el);
    }, 0);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [observationKey]);

  return { setItemRef, setDividerRef, visibleItems, drawnDividers, reset };
}
