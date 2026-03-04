"use client";

import { ArrowRight, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import testPhoto from "../../../public/test.webp";

type Story = {
  id: number;
  name: string;
  age: number;
  decade: string;
  date: string;
  location: string;
  quote: string;
  pronoun: string;
};

const stories: Story[] = [
  {
    id: 1,
    name: "Deb",
    age: 64,
    decade: "60",
    date: "Oct 13th, 2024",
    location: "Vancouver, BC",
    quote:
      "I read a statistic somewhere that said 97% of people who say they're going to write a book never do. And I thought, I'm going to be one of that 3%!",
    pronoun: "her",
  },
  {
    id: 2,
    name: "Margaret",
    age: 95,
    decade: "90",
    date: "Jun 23rd, 2024",
    location: "Toronto, ON",
    quote:
      "My husband passed away, and I've never lived alone until now. I didn't expect to be alone. You have to re-learn, I guess, how to live.",
    pronoun: "her",
  },
  {
    id: 3,
    name: "Ranee",
    age: 81,
    decade: "80",
    date: "Aug 20th, 2023",
    location: "Calgary, AB",
    quote:
      "I used to be quick to judge others. So, I learned to accept people as they are. The two words I find important are 'loving' and 'forgiving.'",
    pronoun: "her",
  },
  {
    id: 4,
    name: "Thomas",
    age: 72,
    decade: "70",
    date: "Mar 4th, 2024",
    location: "Montréal, QC",
    quote:
      "Retirement felt like a cliff I'd fall off. Instead it was a door — to the garden, to my grandchildren, to the person I'd been delaying becoming for fifty years.",
    pronoun: "his",
  },
  {
    id: 5,
    name: "Carol",
    age: 58,
    decade: "50",
    date: "Jan 15th, 2024",
    location: "Halifax, NS",
    quote:
      "The grey hair was the moment. Not a crisis — a declaration. I stopped asking permission to take up space and started deciding what space I actually wanted.",
    pronoun: "her",
  },
  {
    id: 6,
    name: "Bernard",
    age: 44,
    decade: "40",
    date: "Nov 30th, 2023",
    location: "Edmonton, AB",
    quote:
      "I look at my father at 80 and see the destination. But for the first time, I'm not afraid of it. I'm studying him like a map.",
    pronoun: "his",
  },
];

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

// Golden angle: deterministic, nicely distributed, no state or hydration risk
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
    transition: `stroke-dashoffset 0.4s ease-out ${delay}s`,
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
      className={`relative grid grid-cols-1 items-center gap-6 py-10 transition-[opacity,transform] duration-700 md:gap-28 ${isEven ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
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
            src={testPhoto}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
            alt={`Photo of ${story.name}`}
            priority={priority}
          />
          {/* Decade badge */}
          <div className="absolute bottom-4 left-4 z-10 rounded-sm bg-primary px-3 py-1.5 font-sans text-[0.5rem] text-white uppercase tracking-[0.25em]">
            {story.decade}s
          </div>
        </div>
      </div>

      {/* Text */}
      <div className={`relative z-10 py-2 ${isEven ? "md:order-1" : ""}`}>
        <p className="mb-2 font-sans text-[0.52rem] text-secondary uppercase tracking-[0.28em]">
          {story.date}
        </p>
        <h2 className="mb-1.5 font-serif text-3xl text-foreground leading-none md:text-5xl lg:text-6xl">
          {story.name}
        </h2>
        <div className="mb-4 flex items-center gap-3">
          <span className="font-serif text-base text-primary italic md:text-lg lg:text-xl">
            {story.age} years old
          </span>
          <span className="h-px w-8 shrink-0 bg-primary/40" />
          <span className="font-sans text-[0.5rem] text-foreground/50 uppercase tracking-[0.2em]">
            {story.location}
          </span>
        </div>
        <blockquote className="relative mb-6 border-tertiary/50 border-l-2 pl-5 font-serif text-base text-foreground/70 italic leading-relaxed md:text-lg lg:text-xl">
          <span className="-top-3 -left-2 absolute select-none font-serif text-4xl text-tertiary/50 not-italic leading-none">
            &ldquo;
          </span>
          {story.quote}
        </blockquote>
        <Link
          href={`/stories/${story.id}`}
          className="inline-flex items-center gap-3 border-primary/30 border-b pb-1 font-sans text-[0.58rem] text-primary uppercase tracking-[0.22em] transition-all duration-300 hover:gap-5 hover:border-foreground hover:text-foreground"
        >
          Read {story.pronoun} story
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
});

export default function StoriesFeed() {
  const [activeDecade, setActiveDecade] = useState<Decade>("all");
  const [newestFirst, setNewestFirst] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [drawnDividers, setDrawnDividers] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const dividerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filtered = useMemo(
    () =>
      stories
        .filter((s) => activeDecade === "all" || s.decade === activeDecade)
        .sort((a, b) => (newestFirst ? b.age - a.age : a.age - b.age)),
    [activeDecade, newestFirst],
  );

  // Stable ref callbacks — read id from data attribute, no closure over changing values
  const setCardRef = useCallback((el: HTMLDivElement | null) => {
    if (el) cardRefs.current.set(Number(el.dataset.storyId), el);
  }, []);

  const setDividerRef = useCallback((el: HTMLDivElement | null) => {
    if (el) dividerRefs.current.set(Number(el.dataset.dividerId), el);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeDecade/newestFirst trigger re-observation when filter/sort changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (el.dataset.storyId) {
            const id = Number(el.dataset.storyId);
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
  }, [activeDecade, newestFirst]);

  return (
    <div className="container">
      {/* Filter bar */}
      <div className="flex flex-col items-center gap-5 px-4 pt-16">
        <span className="font-sans text-[0.55rem] text-foreground/50 uppercase tracking-[0.3em]">
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
              className={`cursor-pointer border px-4 py-2 font-sans text-[0.58rem] uppercase tracking-[0.18em] transition-colors ${
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
        <span className="font-sans text-[0.55rem] text-foreground/50 uppercase tracking-[0.25em]">
          <span className="font-normal text-primary text-sm">
            {filtered.length}
          </span>{" "}
          stories collected
        </span>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 font-sans text-[0.52rem] text-foreground/50 uppercase tracking-[0.2em] transition-colors hover:text-primary"
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
              <div ref={setCardRef} data-story-id={story.id}>
                <StoryCard
                  story={story}
                  index={index}
                  isVisible={visibleCards.has(story.id)}
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
