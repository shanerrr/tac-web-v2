"use client";

import TreeRingDivider, {
  goldenRotation,
} from "@tac/components/TreeRingDivider";
import { useScrollReveal } from "@tac/hooks/useScrollReveal";
import type { Film } from "@tac/types";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, memo } from "react";

const FilmCard = memo(function FilmCard({
  film,
  isVisible,
  priority,
}: {
  film: Film;
  isVisible: boolean;
  priority?: boolean;
}) {
  return (
    <article
      className={`mx-auto max-w-4xl transition-[opacity,transform] duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
    >
      {/* Framed thumbnail */}
      <Link href={`/films/${film.slug}`} className="group block">
        <div className="rounded-xl bg-white p-2 shadow-[0_4px_30px_rgba(0,0,0,0.08)] transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] sm:p-3">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {film.thumbnail && (
              <Image
                src={film.thumbnail}
                fill
                sizes="(min-width: 896px) 896px, 90vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                alt={`Thumbnail for ${film.title}`}
                priority={priority}
              />
            )}

            {/* Subtle vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 md:h-16 md:w-16">
                <Play
                  size={24}
                  className="translate-x-0.5 fill-primary text-primary"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="absolute top-3 right-3 rounded-full bg-black/40 px-2.5 py-0.5 font-sans text-white/90 text-xs tracking-wider backdrop-blur-sm">
              {film.duration}
            </div>
          </div>
        </div>
      </Link>

      {/* Plaque — centered beneath the frame */}
      <div className="mt-5 flex flex-col items-center text-center md:mt-6">
        <h2 className="font-light font-serif text-2xl text-foreground italic leading-snug md:text-3xl">
          &ldquo;{film.title}&rdquo;
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-serif text-primary italic md:text-lg">
            {film.name}
          </span>
          <span className="h-px w-5 shrink-0 bg-primary/30" />
          <span className="font-sans text-foreground/40 text-xs uppercase tracking-[0.2em]">
            {film.location}
          </span>
        </div>
        <p className="mt-1 font-sans text-foreground/30 text-xs tracking-[0.15em]">
          {film.date}
        </p>
      </div>
    </article>
  );
});

export default function FilmsFeed({ films }: { films: Film[] }) {
  const { setDividerRef, drawnDividers, setItemRef, visibleItems } =
    useScrollReveal();

  return (
    <div className="py-20 md:py-28">
      {/* Meta */}
      <div className="container mb-16 text-center">
        <span className="font-sans text-foreground/40 text-xs uppercase tracking-[0.3em]">
          <span className="text-primary">{films.length}</span> films collected
        </span>
      </div>

      {/* Gallery */}
      <div className="container flex flex-col gap-20 md:gap-28">
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
            <div
              ref={index === 0 ? setItemRef : undefined}
              data-item-id={film.id}
            >
              <FilmCard
                film={film}
                isVisible={
                  index === 0
                    ? visibleItems.has(film.id)
                    : drawnDividers.has(index)
                }
                priority={index === 0}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
