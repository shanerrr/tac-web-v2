"use client";

import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import testPhoto from "../../../public/test.webp";

type Film = {
  id: number;
  title: string;
  name: string;
  age: number;
  date: string;
  location: string;
  duration: string;
};

const films: Film[] = [
  {
    id: 1,
    title: "What 45 years together taught us about life",
    name: "Ruth & Gerald",
    age: 74,
    date: "Nov 12th, 2024",
    location: "Vancouver, BC",
    duration: "8 min",
  },
  {
    id: 2,
    title: "Made with love, lessons, & legends",
    name: "Dora",
    age: 88,
    date: "Sep 3rd, 2024",
    location: "Toronto, ON",
    duration: "12 min",
  },
  {
    id: 3,
    title: "I've lived for 76 years — change is inevitable",
    name: "Thomas",
    age: 76,
    date: "Jun 18th, 2024",
    location: "Calgary, AB",
    duration: "6 min",
  },
  {
    id: 4,
    title: "We chose to live together again later in life",
    name: "Carol & Frank",
    age: 71,
    date: "Mar 22nd, 2024",
    location: "Halifax, NS",
    duration: "10 min",
  },
];

// Golden angle rotation — same pattern as StoriesFeed
const goldenRotation = (i: number) => (i * 137.508) % 360;

const TreeRingDivider = memo(function TreeRingDivider({
  isDrawn,
  rotation,
}: {
  isDrawn: boolean;
  rotation: number;
}) {
  const ring = (delay: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: isDrawn ? 0 : 1,
    transition: `stroke-dashoffset 0.6s ease-out ${delay}s`,
  });

  return (
    <div className="-my-2 flex items-center gap-5 py-2 md:my-0">
      <div className="h-px flex-1 bg-primary/20" />
      <svg
        viewBox="0 0 287 299"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="opacity-60"
        style={{
          width: "clamp(3rem, 6vw, 8rem)",
          height: "clamp(3rem, 6vw, 8rem)",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <path
          d="M143.5 2C221.572 2 285 67.96 285 149.5C285 231.04 221.572 297 143.5 297C65.4281 297 2 231.04 2 149.5C2 67.96 65.4281 2 143.5 2Z"
          stroke="#D87D3C"
          strokeWidth="4"
          pathLength={1}
          style={ring(0)}
        />
        <path
          d="M143.5 33C210.673 33 265 85.452 265 150C265 214.548 210.673 267 143.5 267C76.3268 267 22 214.548 22 150C22 85.452 76.3268 33 143.5 33Z"
          stroke="#D7B88F"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.07)}
        />
        <path
          d="M144.5 61C186.483 61 221 100.559 221 150C221 199.441 186.483 239 144.5 239C102.517 239 68 199.441 68 150C68 100.559 102.517 61 144.5 61Z"
          stroke="#B39C66"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.14)}
        />
        <path
          d="M156 118C171.289 118 184 131.696 184 149C184 166.304 171.289 180 156 180C140.711 180 128 166.304 128 149C128 131.696 140.711 118 156 118Z"
          stroke="#AF4106"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.21)}
        />
      </svg>
      <div className="h-px flex-1 bg-primary/20" />
    </div>
  );
});

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
        <Link href={`/films/${film.id}`}>
          <div
            className={`group relative aspect-video overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 will-change-transform hover:scale-[1.01] ${
              isEven
                ? "md:rotate-[1.5deg] md:hover:rotate-0"
                : "md:-rotate-[1.5deg] md:hover:rotate-0"
            }`}
          >
            <Image
              src={testPhoto}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              alt="Film thumbnail placeholder"
              priority={priority}
            />

            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/35">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play
                  size={20}
                  className="translate-x-0.5 fill-primary text-primary"
                />
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
        <h2 className="mb-4 font-serif text-3xl text-foreground font-light italic leading-snug md:text-4xl lg:text-5xl">
          &ldquo;{film.title}&rdquo;
        </h2>
        <div className="mb-6 flex items-center gap-3">
          <span className="font-serif text-lg text-primary italic md:text-xl">
            {film.name}
          </span>
          <span className="h-px w-8 shrink-0 bg-primary/40" />
          <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.2em]">
            {film.location}
          </span>
        </div>
        <Link
          href={`/films/${film.id}`}
          className="inline-flex items-center gap-3 border-primary/30 border-b pb-1 font-sans text-primary text-xs uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5 hover:border-foreground hover:text-foreground"
        >
          Watch film
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
});

export default function FilmsFeed() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [drawnDividers, setDrawnDividers] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const dividerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setCardRef = useCallback((el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(Number(el.dataset.filmId), el);
  }, []);

  const setDividerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) dividerRefs.current.set(Number(el.dataset.dividerId), el);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.dataset.filmId) {
            const id = Number(el.dataset.filmId);
            setVisibleCards((prev) => {
              if (prev.has(id)) return prev;
              return new Set([...prev, id]);
            });
          }
          if (el.dataset.dividerId) {
            const id = Number(el.dataset.dividerId);
            setDrawnDividers((prev) => {
              if (prev.has(id)) return prev;
              return new Set([...prev, id]);
            });
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    const timer = setTimeout(() => {
      for (const el of cardRefs.current.values()) observer.observe(el);
      for (const el of dividerRefs.current.values()) observer.observe(el);
    }, 0);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="container py-16">
      {/* Meta row */}
      <div className="flex items-center">
        <span className="font-sans text-foreground/50 text-xs uppercase tracking-[0.25em]">
          <span className="font-normal text-primary text-sm">
            {films.length}
          </span>{" "}
          films
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
            <div ref={setCardRef} data-film-id={film.id}>
              <FilmCard
                film={film}
                index={index}
                isVisible={visibleCards.has(film.id)}
                priority={index === 0}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
