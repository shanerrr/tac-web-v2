"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function QuoteCard({ text }: { text: string }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-quaternary/20 bg-white px-7 py-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
      {/* Quote mark */}
      <svg
        viewBox="0 0 32 24"
        className="mb-4 h-8 w-10 shrink-0 fill-quaternary"
        aria-hidden="true"
      >
        <path d="M0 24V14.4C0 6.08 4.48 1.12 13.44 0l1.28 3.2C9.92 4.48 7.68 7.68 7.36 12H13.44V24H0zm18.56 0V14.4C18.56 6.08 23.04 1.12 32 0l1.28 3.2c-4.8 1.28-7.04 4.48-7.36 8.8h6.08V24H18.56z" />
      </svg>
      <p className="font-serif text-base text-foreground/80 italic leading-relaxed md:text-lg">
        {text}
      </p>
    </div>
  );
}

export default function ReflectionsCarousel({
  reflections,
}: {
  reflections: string[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth =
      el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 300;
    el.scrollBy({
      left: direction === "left" ? -cardWidth - 16 : cardWidth + 16,
      behavior: "smooth",
    });
  }, []);

  if (reflections.length === 0) return null;

  return (
    <div className="relative">
      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {reflections.map((text, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static list, order never changes
            key={i}
            data-card
            className="w-[280px] shrink-0 snap-start sm:w-[300px] md:w-[320px]"
          >
            <QuoteCard text={text} />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Previous reflections"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-quaternary/25 text-quaternary transition-all duration-200 hover:bg-quaternary/10 disabled:cursor-default disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Next reflections"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-quaternary/25 text-quaternary transition-all duration-200 hover:bg-quaternary/10 disabled:cursor-default disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
