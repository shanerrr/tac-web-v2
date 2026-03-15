"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface Section {
  id: string;
  label: string;
  /** Scroll to this fraction of the element's height (0–1). Default 0 (top). */
  scrollTo?: number;
  /** Consider this section active only after scrolling past this fraction (0–1). Default 0. */
  activeAfter?: number;
}

export default function SectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  /* ── Track which section is in the center of the viewport ── */
  const updateActive = useCallback(() => {
    const mid = window.innerHeight / 2;
    let closest = "";
    let closestDist = Infinity;

    for (const { id, activeAfter = 0 } of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();

      // For sections with activeAfter, use a point further down the element
      // instead of the geometric center
      const anchor = rect.top + rect.height * Math.max(activeAfter, 0.5);
      const dist = Math.abs(anchor - mid);

      if (dist < closestDist) {
        closestDist = dist;
        closest = id;
      }
    }

    if (closest) setActive(closest);
  }, [sections]);

  /* ── Show/hide based on scroll past hero ── */
  const updateVisibility = useCallback(() => {
    setVisible(window.scrollY > window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          updateActive();
          updateVisibility();
          ticking.current = false;
        });
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [updateActive, updateVisibility]);

  const handleClick = (section: Section) => {
    const el = document.getElementById(section.id);
    if (!el) return;
    navigator.vibrate?.(6);
    const rect = el.getBoundingClientRect();
    const offset = (section.scrollTo ?? 0) * rect.height;
    const y = rect.top + window.scrollY + offset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 md:block ${
        visible
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none translate-x-8 opacity-0"
      }`}
    >
      <div className="flex flex-col items-stretch gap-1 rounded-l-2xl border border-r-0 border-white/[0.06] bg-black/60 px-3 py-3 shadow-2xl backdrop-blur-xl">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section)}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-300 ${
                isActive ? "bg-gold/15" : "hover:bg-white/[0.06]"
              }`}
              aria-label={`Scroll to ${section.label}`}
              aria-current={isActive ? "true" : undefined}
            >
              {/* Active bar */}
              <span
                className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                  isActive ? "bg-gold opacity-100" : "opacity-0"
                }`}
              />

              {/* Label */}
              <span
                className={`font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                  isActive
                    ? "text-gold"
                    : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
