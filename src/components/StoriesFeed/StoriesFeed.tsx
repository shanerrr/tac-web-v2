"use client";

import { ArrowRight, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  gradient: string;
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
    gradient: "linear-gradient(145deg,#D4A882,#B5784A,#7A4A28)",
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
    gradient: "linear-gradient(145deg,#C8B09A,#A08070,#7A6055)",
  },
];

const DECADES = ["all", "40", "50", "60", "70", "80", "90"] as const;
type Decade = (typeof DECADES)[number];

const decadeLabel = (d: Decade) => (d === "all" ? "All Ages" : `${d}s`);

function PersonSilhouette() {
  return (
    <svg
      width="55"
      viewBox="0 0 60 90"
      fill="rgba(255,255,255,0.15)"
      aria-hidden="true"
    >
      <ellipse cx="30" cy="22" rx="14" ry="16" />
      <path d="M4 90 C4 58,56 58,56 90Z" />
    </svg>
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
      className={`relative grid grid-cols-1 items-center gap-6 border-primary/20 border-b py-10 transition-all duration-700 md:grid-cols-2 md:gap-12 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Photo */}
      <div className={`relative z-10 ${isEven ? "md:order-2" : ""}`}>
        <div
          className={`relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 group-hover:rotate-0 ${
            isEven
              ? "rotate-[1.5deg] hover:rotate-0"
              : "-rotate-[1.5deg] hover:rotate-0"
          } hover:scale-[1.01]`}
        >
          <div className="flex w-full items-end justify-center pb-8 aspect-3/3">
            <Image src={testPhoto} fill objectFit="cover" alt="hehe" />
          </div>

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
        <h2 className="mb-1.5 font-serif text-3xl text-foreground leading-none md:text-4xl">
          {story.name}
        </h2>
        <div className="mb-4 flex items-center gap-3">
          <span className="font-serif text-base text-primary italic">
            {story.age} years old
          </span>
          <span className="h-px w-8 shrink-0 bg-primary/40" />
          <span className="font-sans text-[0.5rem] text-foreground/50 uppercase tracking-[0.2em]">
            {story.location}
          </span>
        </div>
        <blockquote className="relative mb-6 border-tertiary/50 border-l-2 pl-5 font-serif text-base text-foreground/70 italic leading-relaxed">
          <span className="absolute -top-3 -left-2 select-none font-serif text-4xl text-tertiary/50 not-italic leading-none">
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
          className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none font-serif text-primary/[0.055] leading-none md:block -right-4`}
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
      cardRefs.current.forEach((el) => observer.observe(el));
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
        <div
          className="flex border border-primary/20"
          role="group"
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
        </div>
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

      {/* Diamond divider */}
      <div className="flex items-center gap-5 px-6 pt-8 md:px-24">
        <div className="h-px flex-1 bg-primary/20" />
        <div className="h-1.5 w-1.5 rotate-45 border border-primary opacity-50" />
        <div className="h-px flex-1 bg-primary/20" />
      </div>

      {/* Stories feed */}
      <div className="px-6 pb-24 md:px-24">
        {filtered.length === 0 ? (
          <p className="py-20 text-center font-serif text-foreground/40 text-xl italic">
            No stories in this decade yet.
          </p>
        ) : (
          filtered.map((story, index) => (
            <div
              key={story.id}
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
          ))
        )}
      </div>
    </div>
  );
}
