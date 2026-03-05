"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Tracks which feed items and tree-ring dividers have scrolled into view.
 *
 * Elements must carry the following data attributes:
 *   - Items:    `data-item-id={id}`
 *   - Dividers: `data-divider-id={index}`
 *
 * @param extraDeps - Additional deps that trigger re-observation when the
 *   rendered list changes (e.g. active filter state in StoriesFeed).
 */
export function useScrollReveal(extraDeps: unknown[] = []) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [drawnDividers, setDrawnDividers] = useState<Set<number>>(new Set());
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const dividerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setItemRef = useCallback((el: HTMLDivElement | null) => {
    if (el) itemRefs.current.set(Number(el.dataset.itemId), el);
  }, []);

  const setDividerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) dividerRefs.current.set(Number(el.dataset.dividerId), el);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: extraDeps signals new DOM nodes to observe
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;

          if (el.dataset.itemId) {
            const id = Number(el.dataset.itemId);
            setVisibleItems((prev) => (prev.has(id) ? prev : new Set([...prev, id])));
          }

          if (el.dataset.dividerId) {
            const id = Number(el.dataset.dividerId);
            setDrawnDividers((prev) => (prev.has(id) ? prev : new Set([...prev, id])));
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
  }, extraDeps);

  return { setItemRef, setDividerRef, visibleItems, drawnDividers };
}
