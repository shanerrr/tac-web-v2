"use client";

import TreeRingDivider, { goldenRotation } from "@tac/components/TreeRingDivider";
import type { Film } from "@tac/types";
import { useScrollReveal } from "@tac/hooks/useScrollReveal";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, memo } from "react";
import testPhoto from "../../../public/test.webp";

const FilmCard = memo(function FilmCard({
  film,
  index,
  isVisible,
  priority,
}: {
  film: Film;
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
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Thumbnail */}
      <div className={`relative z-10 ${isEven ? "md:order-2" : ""}`}>
        <Link href={`/films/${film.slug}`}>
          <div
            className={`group relative aspect-video overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 will-change-transform hover:scale-[1.01] ${
              isEven
                ? "md:rotate-[1.5deg] md:hover:rotate-0"
                : "md:-rotate-[1.5deg] md:hover:rotate-0"
            }`}
          >
            <Image
              src={film.thumbnail ?? testPhoto}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              alt={`Thumbnail for ${film.title}`}
              priority={priority}
            />

            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/35">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play size={20} className="translate-x-0.5 fill-primary text-primary" />
              </div>
            </div>

            {/* Duration badge */}
            <div className="absolute bottom-4 left-4 z-10 rounded-sm bg-primary px-3 py-1.5 font-sans text-white text-xs tracking-[0.25em]">
              {film.duration}
            </div>
          </div>
        </Link>
      </div>

      {/* Text */}
      <div className={`relative z-10 py-2 ${isEven ? "md:order-1" : ""}`}>
        <p className="mb-2 font-sans text-secondary text-xs uppercase tracking-[0.28em]">
          {film.date}
        </p>
        <h2 className="mb-4 font-light font-serif text-3xl text-foreground italic leading-snug md:text-4xl lg:text-5xl">
          &ldquo;{film.title}&rdquo;
        </h2>
        <div className="mb-6 flex items-center gap-3">
          <span className="font-serif text-lg text-primary italic md:text-xl">{film.name}</span>
          <span className="h-px w-8 shrink-0 bg-primary/40" />
          <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.2em]">
            {film.location}
          </span>
        </div>
        <Link
          href={`/films/${film.slug}`}
          className="inline-flex items-center gap-3 border-primary/30 border-b pb-1 font-sans text-primary text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5 hover:border-foreground hover:text-foreground"
        >
          Watch film
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
});

export default function FilmsFeed({ films }: { films: Film[] }) {
  const { setItemRef, setDividerRef, visibleItems, drawnDividers } = useScrollReveal();

  return (
    <div className="container py-16">
      {/* Meta row */}
      <div className="flex items-center">
        <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.25em]">
          <span className="font-normal text-primary text-sm">{films.length}</span> films
        </span>
      </div>

      {/* Films feed */}
      <div>
        {films.map((film, index) => (
          <Fragment key={film.id}>
            {index > 0 && (
              <div ref={setDividerRef} data-divider-id={index}>
                <TreeRingDivider
                  isDrawn={drawnDividers.has(index)}
                  rotation={goldenRotation(index)}
                />
              </div>
            )}
            <div ref={setItemRef} data-item-id={film.id}>
              <FilmCard
                film={film}
                index={index}
                isVisible={visibleItems.has(film.id)}
                priority={index === 0}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
