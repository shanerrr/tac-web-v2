"use client";

import { ArrowRight, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import testPhoto from "../../../public/test.webp";
import treeRings from "../../../public/treerings.svg";

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

const DECADES = ["all", "40", "50", "60", "70", "80", "90"] as const;
type Decade = (typeof DECADES)[number];

const decadeLabel = (d: Decade) => (d === "all" ? "All Ages" : `${d}s`);

function TreeRingDivider() {
  return (
    <div className="flex items-center -my-2 md:my-0 gap-5 py-2">
      <div className="h-px flex-1 bg-primary/20" />
      <Image
        src={treeRings}
        alt=""
        aria-hidden="true"
        width={96}
        height={96}
        className="opacity-60"
        style={{
          width: "clamp(3rem, 6vw, 8rem)",
          height: "clamp(3rem, 6vw, 8rem)",
        }}
      />
      <div className="h-px flex-1 bg-primary/20" />
    </div>
  );
}

function StoryCard({
  story,
  index,
  isVisible,
}: {
  story: Story;
  index: number;
  isVisible: boolean;
}) {
  const isEven = index % 2 === 1;
  return (
    <article
      className={`relative grid grid-cols-1 items-center gap-6 py-10 transition-all duration-700 md:gap-12 ${isEven ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-[2fr_3fr]"} ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Photo */}
      <div className={`relative z-10 ${isEven ? "md:order-2" : ""}`}>
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.01] ${
            isEven
              ? "md:rotate-[1.5deg] md:hover:rotate-0"
              : "md:-rotate-[1.5deg] md:hover:rotate-0"
          }`}
        >
          <Image
            src={testPhoto}
            fill
            className="object-cover"
            alt={`Photo of ${story.name}`}
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

        {/* Ghost age */}
        <span
          className="-translate-y-1/2 -right-4 pointer-events-none absolute top-1/2 hidden select-none font-serif text-primary/[0.055] leading-none md:block"
          style={{
            fontSize: "clamp(5rem,10vw,9rem)",
          }}
          aria-hidden="true"
        >
          {story.age}
        </span>
      </div>
    </article>
  );
}

export default function StoriesFeed() {
  const [activeDecade, setActiveDecade] = useState<Decade>("all");
  const [newestFirst, setNewestFirst] = useState(true);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const filtered = stories
    .filter((s) => activeDecade === "all" || s.decade === activeDecade)
    .sort((a, b) => (newestFirst ? b.age - a.age : a.age - b.age));

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeDecade/newestFirst trigger re-observation when filter/sort changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = Number((e.target as HTMLElement).dataset.storyId);
            setVisibleCards((prev) => new Set([...prev, id]));
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );

    const timer = setTimeout(() => {
      for (const el of cardRefs.current.values()) {
        observer.observe(el);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [activeDecade, newestFirst]);

  return (
    <div className="bg-white">
      {/* Filter bar */}
      <div className="flex flex-col items-center gap-5 px-4 pt-16">
        <span className="font-sans text-[0.55rem] text-foreground/50 uppercase tracking-[0.3em]">
          Filter by decade
        </span>
        <fieldset
          className="flex border border-primary/20"
          aria-label="Decade filter"
        >
          {DECADES.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActiveDecade(d)}
              className={`cursor-pointer border-primary/20 border-r px-4 py-2.5 font-sans text-[0.58rem] uppercase tracking-[0.18em] transition-all last:border-r-0 ${
                activeDecade === d
                  ? "bg-primary text-white"
                  : "text-foreground/50 hover:bg-primary/5 hover:text-primary"
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
      <div className="flex items-center justify-between px-6 pt-10 md:px-24">
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
      <div className="px-6 pb-24 md:px-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center font-serif text-foreground/40 text-xl italic">
            No stories in this decade yet.
          </p>
        ) : (
          filtered.map((story, index) => (
            <Fragment key={story.id}>
              {index > 0 && <TreeRingDivider />}
              <div
                ref={(el) => {
                  if (el) cardRefs.current.set(story.id, el);
                }}
                data-story-id={story.id}
              >
                <StoryCard
                  story={story}
                  index={index}
                  isVisible={visibleCards.has(story.id)}
                />
              </div>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
