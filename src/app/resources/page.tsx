import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import ScrollReveal from "@tac/components/ScrollReveal";
import { getResources } from "@tac/lib/contentful";
import type { Resource } from "@tac/types";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import logo from "../../../public/logo-rings.svg";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Learn, connect, and engage around aging and ageism with curated resources from The Age Collective.",
};

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary/5">
        {resource.thumbnail ? (
          <Image
            src={resource.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src={logo}
              alt=""
              width={60}
              height={60}
              className="opacity-[0.08]"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 pt-5 pb-5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {resource.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-primary/8 px-2.5 py-0.5 font-sans text-[10px] text-primary uppercase tracking-[0.15em]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-foreground text-lg leading-tight transition-colors duration-200 group-hover:text-primary">
          {resource.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 font-sans text-foreground/70 text-sm leading-relaxed">
          {resource.description}
        </p>
        <div className="mt-4 flex items-center gap-1.5 font-sans text-primary text-xs uppercase tracking-[0.2em] transition-colors duration-200 group-hover:text-foreground">
          Read more
          <ExternalLink
            size={12}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </a>
  );
}

export default async function Resources() {
  const resources = await getResources();
  const featured = resources.find((r) => r.featured);
  const hub = resources.filter((r) => !r.featured);

  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-primary/60"
        scrollThreshold={200}
      />

      {/* ═══════════════════ Hero ═══════════════════ */}
      <PageHero
        accentLabel="Education"
        title="Resources"
        subtitle="Learn, connect, and engage around aging and ageism."
        bgClass="bg-primary"
        watermarkRight="calc(min(110vw, 110vh) / 4)"
        glowOverlay="radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 55%)"
        vignetteOverlay="radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)"
        fullHeight={false}
      />

      {/* ═══════════════════ Featured Resource ═══════════════════ */}
      {featured && (
        <ScrollReveal as="section" className="container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-primary text-xs uppercase tracking-[0.4em]">
              Featured Resource
            </p>
            <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          </div>

          <a
            href={featured.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto mt-12 block max-w-4xl overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/8 hover:shadow-xl md:flex"
          >
            {/* Image side */}
            <div className="relative aspect-video w-full overflow-hidden bg-primary/5 md:aspect-auto md:w-2/5">
              {featured.thumbnail ? (
                <Image
                  src={featured.thumbnail}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-48 w-full items-center justify-center">
                  <Image
                    src={logo}
                    alt=""
                    width={80}
                    height={80}
                    className="opacity-[0.08]"
                  />
                </div>
              )}
            </div>

            {/* Text side */}
            <div className="flex flex-1 flex-col justify-center px-8 py-8 md:px-10 md:py-10">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {featured.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/8 px-3 py-1 font-sans text-[10px] text-primary uppercase tracking-[0.15em]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-serif text-2xl text-foreground leading-tight transition-colors duration-200 group-hover:text-primary md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-4 line-clamp-3 font-sans text-base text-foreground/60 leading-relaxed">
                {featured.description}
              </p>
              <div className="mt-6 flex items-center gap-1.5 font-sans text-primary text-xs uppercase tracking-[0.2em] transition-colors duration-200 group-hover:text-foreground">
                Learn more
                <ExternalLink
                  size={12}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </div>
            </div>
          </a>
        </ScrollReveal>
      )}

      {/* ═══════════════════ Resource Hub ═══════════════════ */}
      <ScrollReveal as="section" className="bg-primary/[0.04] py-24 md:py-32">
        <div className="container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 font-sans text-primary text-xs uppercase tracking-[0.4em]">
              Explore
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Resource <span className="text-primary italic">Hub.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hub.map((resource) => (
              <ResourceCard key={resource.title} resource={resource} />
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <ScrollReveal as="section" className="container py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-5 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            Contribute
          </p>
          <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
            Know a great <span className="text-primary italic">resource?</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          <p className="mx-auto mt-8 max-w-xl font-sans text-foreground/60 text-lg leading-relaxed">
            Help us grow this collection. If you know of a resource that
            challenges ageism or supports aging well, we&rsquo;d love to hear
            about it.
          </p>
          <a
            href="mailto:info@theagecollective.com"
            className="mt-10 inline-flex items-center gap-3 rounded-xl border border-primary bg-primary px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Share a Resource
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
