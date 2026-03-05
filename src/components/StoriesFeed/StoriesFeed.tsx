"use client";

import TreeRingDivider, {
  goldenRotation,
} from "@tac/components/TreeRingDivider";
import { useScrollReveal } from "@tac/hooks/useScrollReveal";
import type { Story } from "@tac/types";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, memo, useEffect, useMemo, useState } from "react";

const DECADES = [
  "all",
  "20",
  "30",
  "40",
  "50",
  "60",
  "70",
  "80",
  "90",
] as const;
type Decade = (typeof DECADES)[number];

const decadeLabel = (d: Decade) => (d === "all" ? "All Ages" : `${d}s`);

const StoryCard = memo(function StoryCard({
  story,
  index,
  isVisible,
  priority,
}: {
  story: Story;
  index: number;
  isVisible: boolean;
  priority?: boolean;
}) {
  const isEven = index % 2 === 1;

  return (
    <article
      className={`relative grid grid-cols-1 items-center gap-6 py-10 transition-[opacity,transform] duration-700 md:gap-20 lg:gap-28 ${
        isEven ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"
      } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: index === 0 ? "0ms" : "500ms" }}
    >
      {/* Photo */}
      <div className={`relative z-10 ${isEven ? "md:order-2" : ""}`}>
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 will-change-transform hover:scale-[1.01] ${
            isEven
              ? "md:rotate-[1.5deg] md:hover:rotate-0"
              : "md:-rotate-[1.5deg] md:hover:rotate-0"
          }`}
        >
          <Image
            src={story.portrait}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            alt={`Portrait of ${story.name}`}
            priority={priority}
          />
          <div className="absolute bottom-4 left-4 z-10 rounded-sm bg-primary px-3 py-1.5 font-sans text-white text-xs tracking-[0.25em]">
            {story.decade}s
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={`relative z-10 py-2 ${isEven ? "md:order-1" : ""}`}>
        <p className="mb-2 font-sans text-secondary text-xs uppercase tracking-[0.28em]">
          {story.published}
        </p>
        <h2 className="mb-1.5 font-serif text-4xl text-foreground leading-none md:text-5xl lg:text-7xl">
          {story.name}
        </h2>
        <div className="mb-4 flex items-center gap-3">
          <span className="font-serif text-lg text-primary italic md:text-xl lg:text-2xl">
            {story.age} years old
          </span>
          <span className="h-px w-8 shrink-0 bg-primary/40" />
          <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.2em]">
            {story.location}
          </span>
        </div>
        <blockquote className="relative mb-6 border-tertiary/50 border-l-2 pl-5 font-light font-sans text-base text-foreground/70 italic leading-relaxed md:text-lg lg:text-xl">
          <span className="-top-3 -left-2 absolute select-none font-serif text-4xl text-tertiary/50 not-italic leading-none">
            &ldquo;
          </span>
          {story.quote}
        </blockquote>
        <Link
          href={`/stories/${story.slug}`}
          className="inline-flex items-center gap-3 border-primary/30 border-b pb-1 font-sans text-primary text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5 hover:border-foreground hover:text-foreground"
        >
          Read {story.pronoun} story
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
});

export default function StoriesFeed({ stories }: { stories: Story[] }) {
  const [activeDecade, setActiveDecade] = useState<Decade>("all");
  const [newestFirst, setNewestFirst] = useState(true);

  const { setItemRef, setDividerRef, visibleItems, drawnDividers, reset } =
    useScrollReveal();

  // Re-observe whenever the filtered list changes and new DOM nodes mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — re-observe on filter/sort change
  useEffect(() => {
    reset();
  }, [activeDecade, newestFirst, reset]);

  const filtered = useMemo(
    () =>
      stories
        .filter((s) => activeDecade === "all" || s.decade === activeDecade)
        .sort((a, b) => (newestFirst ? b.age - a.age : a.age - b.age)),
    [stories, activeDecade, newestFirst],
  );

  return (
    <div className="container py-16">
      {/* Filter bar */}
      <div className="flex flex-col items-center gap-5">
        <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.3em]">
          Filter by decade
        </span>
        <fieldset
          className="flex flex-wrap justify-center gap-1.5"
          aria-label="Decade filter"
        >
          {DECADES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDecade(d)}
              className={`cursor-pointer rounded-[10px] border px-4 py-2 font-sans text-sm tracking-[0.18em] transition-colors ${
                activeDecade === d
                  ? "border-primary bg-primary text-white"
                  : "border-primary/20 text-foreground/50 hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {decadeLabel(d)}
            </button>
          ))}
        </fieldset>
        <span className="font-sans text-foreground/40 text-xs">
          Showing {filtered.length}{" "}
          {filtered.length === 1 ? "story" : "stories"}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between pt-10">
        <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.25em]">
          <span className="font-normal text-primary text-sm">
            {filtered.length}
          </span>{" "}
          stories collected
        </span>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 font-sans text-foreground/50 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary"
          onClick={() => setNewestFirst((n) => !n)}
        >
          <ArrowUpDown size={10} className="opacity-60" />
          {newestFirst ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {/* Stories feed */}
      <div>
        {filtered.length === 0 ? (
          <p className="py-20 text-center font-serif text-foreground/40 text-xl italic">
            No stories in this decade yet.
          </p>
        ) : (
          filtered.map((story, index) => (
            <Fragment key={story.id}>
              {index > 0 && (
                <div ref={setDividerRef} data-divider-id={index}>
                  <TreeRingDivider
                    isDrawn={drawnDividers.has(index)}
                    rotation={goldenRotation(index)}
                  />
                </div>
              )}
              <div ref={index === 0 ? setItemRef : undefined} data-item-id={story.id}>
                <StoryCard
                  story={story}
                  index={index}
                  isVisible={index === 0 ? visibleItems.has(story.id) : drawnDividers.has(index)}
                  priority={index === 0}
                />
              </div>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
