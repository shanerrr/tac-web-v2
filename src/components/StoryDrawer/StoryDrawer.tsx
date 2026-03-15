"use client";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Block, Inline } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { STORIES_BLUR_DATA_URL } from "@tac/lib/constants";
import { formatDate } from "@tac/lib/utils";
import type { Film, Story } from "@tac/types";
import { Play, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const richTextOptions = {
  renderText: (text: string) =>
    text.split("\n").flatMap((segment, i) =>
      // biome-ignore lint/suspicious/noArrayIndexKey: stable text split, order never changes
      i === 0 ? [segment] : [<br key={`br-${i}`} />, segment],
    ),
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: React.ReactNode) => (
      <p className="mb-5 font-sans text-base leading-relaxed selection:bg-primary selection:text-white md:text-lg">
        {children}
      </p>
    ),
    [BLOCKS.HEADING_2]: (_node: unknown, children: React.ReactNode) => (
      <h2 className="mt-8 mb-4 font-serif text-2xl text-foreground md:text-3xl">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_node: unknown, children: React.ReactNode) => (
      <h3 className="mt-6 mb-3 font-serif text-foreground text-xl md:text-2xl">
        {children}
      </h3>
    ),
    [BLOCKS.QUOTE]: (_node: unknown, children: React.ReactNode) => (
      <blockquote className="my-6 border-tertiary/50 border-l-2 pl-5 font-serif text-foreground/60 text-lg italic leading-relaxed md:text-xl">
        {children}
      </blockquote>
    ),
    [BLOCKS.UL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ul className="mb-5 list-disc space-y-2 pl-6 font-sans text-foreground/80">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (_node: unknown, children: React.ReactNode) => (
      <ol className="mb-5 list-decimal space-y-2 pl-6 font-sans text-foreground/80">
        {children}
      </ol>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-primary/10" />,
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <a
        href={node.data.uri}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:text-foreground"
      >
        {children}
      </a>
    ),
  },
};

function StoryMeta({ story, className }: { story: Story; className?: string }) {
  return (
    <div className={`flex flex-col ${className ?? ""}`}>
      <p className="mb-1 font-sans text-secondary text-xs uppercase tracking-[0.28em]">
        {formatDate(story.published)}
      </p>
      <h2 className="font-serif text-3xl text-foreground leading-none md:text-4xl">
        {story.name}
      </h2>
      <div className="mt-1.5 flex items-center gap-3">
        <span className="font-serif text-primary italic md:text-lg">
          {story.age} years old
        </span>
        <span className="h-px w-5 shrink-0 bg-primary/30" />
        <span className="font-sans text-foreground/60 text-xs uppercase tracking-[0.2em]">
          {story.location}
        </span>
      </div>
    </div>
  );
}

export default function StoryDrawer({
  story,
  onClose,
  onOpenStory,
}: {
  story: Story | null;
  onClose: () => void;
  onOpenStory?: (story: Story) => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const [metaScrolledPast, setMetaScrolledPast] = useState(false);
  const isOpen = story !== null;

  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    // Close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — reset scroll when story changes
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  }, [isOpen, story?.id]);

  // Observe when meta section scrolls out of view within the drawer
  useEffect(() => {
    if (!isOpen || !metaRef.current || !drawerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setMetaScrolledPast(!entry.isIntersecting),
      { root: drawerRef.current, threshold: 0 },
    );
    observer.observe(metaRef.current);
    return () => observer.disconnect();
  }, [isOpen]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        navigator.vibrate?.(6);
        onClose();
      }
    },
    [onClose],
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={story ? `${story.name}'s story` : undefined}
        className={`fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {story && (
          <>
            {/* Drag handle + close */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/95 px-6 pt-4 pb-2 backdrop-blur-sm">
              <div className="mx-auto h-1 w-10 rounded-full bg-foreground/15" />
              <button
                type="button"
                onClick={() => {
                  navigator.vibrate?.(6);
                  onClose();
                }}
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 transition-colors hover:bg-foreground/10"
                aria-label="Close story"
              >
                <X size={16} className="text-foreground/60" />
              </button>
            </div>

            {/* Content — stacked on mobile, two-col on lg+ */}
            <div className="px-6 pt-2 pb-16 md:px-12 lg:mx-auto lg:flex lg:max-w-6xl lg:gap-12 lg:pt-6">
              {/* Left column — portrait + meta (sticky on desktop) */}
              <div className="hidden shrink-0 lg:block lg:w-100">
                <div className="sticky top-14">
                  <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={story.portrait}
                      fill
                      sizes="400px"
                      className="object-cover"
                      alt={`Portrait of ${story.name}`}
                      placeholder="blur"
                      blurDataURL={STORIES_BLUR_DATA_URL}
                    />
                  </div>
                  <StoryMeta
                    story={story}
                    className={`mt-5 transition-opacity duration-300 ${
                      metaScrolledPast ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              {/* Right column — meta + body */}
              <div className="min-w-0 flex-1">
                <div
                  ref={metaRef}
                  className="flex items-center gap-5 pb-6 md:gap-8"
                >
                  {/* Portrait — mobile only */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl shadow-md md:h-28 md:w-28 lg:hidden">
                    <Image
                      src={story.portrait}
                      fill
                      sizes="112px"
                      className="object-cover"
                      alt={`Portrait of ${story.name}`}
                      placeholder="blur"
                      blurDataURL={STORIES_BLUR_DATA_URL}
                    />
                  </div>
                  <StoryMeta story={story} />
                </div>

                <div className="h-px bg-primary/10" />

                <div className="pt-8">
                  {story.body ? (
                    documentToReactComponents(story.body, richTextOptions)
                  ) : (
                    <p className="text-center font-serif text-foreground/60 italic">
                      Full story coming soon.
                    </p>
                  )}
                </div>

                {/* Film section */}
                {story.related.filter((r) => r._type === "film").length > 0 && (
                  <div className="mt-12 border-primary/10 border-t pt-10">
                    <p className="mb-2 font-sans text-secondary text-xs uppercase tracking-[0.3em]">
                      Watch
                    </p>
                    <div className="space-y-6">
                      {story.related
                        .filter((r): r is Film => r._type === "film")
                        .map((film) => (
                          <div key={film.id}>
                            <h3 className="mb-3 font-serif text-foreground text-xl md:text-2xl">
                              &ldquo;{film.title}&rdquo;
                            </h3>
                            <Link
                              key={film.id}
                              href={`/films#${film.id}`}
                              className="group relative block overflow-hidden rounded-2xl shadow-lg ring-1 ring-primary/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-primary/20"
                            >
                              <div className="relative aspect-video w-full">
                                {film.banner ? (
                                  <Image
                                    src={film.banner}
                                    fill
                                    sizes="(min-width: 768px) 600px, 100vw"
                                    className="object-cover"
                                    alt={`${film.title} film`}
                                    placeholder="blur"
                                    blurDataURL={STORIES_BLUR_DATA_URL}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-foreground/5" />
                                )}
                                {/* Play button overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
                                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
                                    <Play className="ml-0.5 h-6 w-6 fill-primary text-primary md:h-7 md:w-7" />
                                  </div>
                                </div>
                              </div>
                              <div className="bg-primary/[0.03] px-5 py-4">
                                <p className="font-sans text-primary text-xs uppercase tracking-[0.2em]">
                                  Watch on the films page
                                </p>
                              </div>
                            </Link>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Additional stories */}
                {story.related.filter((r) => r._type !== "film").length > 0 && (
                  <div className="mt-12 border-primary/10 border-t pt-10">
                    <p className="mb-2 font-sans text-secondary text-xs uppercase tracking-[0.3em]">
                      Keep reading
                    </p>
                    <h3 className="mb-8 font-serif text-2xl text-foreground md:text-3xl">
                      More from {story.name}
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {story.related
                        .filter((r): r is Story => r._type !== "film")
                        .map((related) => (
                          <button
                            key={related.id}
                            type="button"
                            onClick={() => onOpenStory?.(related)}
                            className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-primary/10 bg-primary/[0.02] p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/5"
                          >
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl shadow-sm ring-1 ring-primary/10 transition-all duration-300 group-hover:ring-primary/25">
                              <Image
                                src={related.portrait}
                                fill
                                sizes="64px"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                alt={`Portrait of ${related.name}`}
                                placeholder="blur"
                                blurDataURL={STORIES_BLUR_DATA_URL}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-serif text-foreground text-lg leading-tight">
                                {related.name}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="font-serif text-primary text-sm italic">
                                  {related.age} years old
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
