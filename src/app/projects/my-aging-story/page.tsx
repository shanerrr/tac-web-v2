import Navbar from "@tac/components/Navbar";
import { getAssetsByTag } from "@tac/lib/contentful";
import Image from "next/image";
import logo from "../../../../public/logo-rings.svg";

export const revalidate = 3600;

const highlights = [
  {
    value: "105",
    label: "Attendees",
  },
  {
    value: "29",
    label: "Surveys Collected",
  },
  {
    value: "25",
    label: "Self-Reflections",
  },
];

const impact = [
  { value: 83, label: "reported improved perspectives on aging." },
  {
    value: 93,
    label: "found the exhibit stories and activities interesting.",
  },
  { value: 90, label: "felt inspired to take action against ageism." },
];

const stations = [
  {
    title: "22 Stories",
    description:
      "Powerful personal narratives from Edmontonians of various ages and backgrounds, collected over three years — each one challenging ageism and celebrating resilience.",
  },
  {
    title: "Story Scavenger Hunt",
    description:
      "An interactive activity guiding visitors through the exhibit's stories, encouraging deeper engagement with each narrative and the themes they carry.",
  },
  {
    title: "Self-Reflection Booth",
    description:
      "A quiet space where visitors imagined and wrote about their future older selves — bridging the gap between who we are and who we're becoming.",
  },
  {
    title: "Community Dialogue",
    description:
      "Open conversations sparked by the stories on display, creating space for visitors of all ages to share their own experiences with aging.",
  },
];

const acknowledgements = [
  "City of Edmonton",
  "Alberta Foundation for the Arts",
  "CSE Consulting",
];

// --- Stat ring for impact section ---

function StatRing({ value }: { value: number }) {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - value / 100);

  return (
    <svg
      viewBox="0 0 100 100"
      className="h-36 w-36 -rotate-90 sm:h-40 sm:w-40 md:h-44 md:w-44"
      aria-hidden="true"
    >
      {/* Background ring */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-primary/10"
      />
      {/* Progress ring */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        className="text-primary"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      {/* Inner decorative ring */}
      <circle
        cx="50"
        cy="50"
        r={r - 8}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-primary/8"
      />
    </svg>
  );
}

// --- Photo placeholder ---

function PhotoPlaceholder({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-tertiary/[0.04] ${className ?? ""}`}
    >
      {label && (
        <div className="absolute inset-0 flex items-center justify-center font-sans text-primary/20 text-sm italic">
          {label}
        </div>
      )}
    </div>
  );
}

export default async function MyAgingStory() {
  const [heroAssets, galleryAssets] = await Promise.all([
    getAssetsByTag("masHero"),
    getAssetsByTag("masGallery"),
  ]);

  const heroImage = heroAssets[0]?.url;
  const gallery = galleryAssets.sort((a, b) => a.sortIndex - b.sortIndex);

  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-primary/60"
        scrollThreshold={200}
      />

      {/* ═══════════════════ Hero ═══════════════════ */}
      <div className="heroTexture -mt-27 bg-primary md:-mt-32">
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden pt-27 pb-20 text-center text-white md:pt-32 md:pb-32">
          {/* Photo background (from Contentful) or gradient fallback */}
          {heroImage ? (
            <Image
              src={heroImage}
              alt="My Aging Story exhibit space"
              fill
              className="object-cover"
              priority
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          {/* Watermark */}
          <div
            className="pointer-events-none absolute animate-spin-slow select-none"
            aria-hidden="true"
            style={{
              width: "min(110vw, 110vh)",
              height: "min(110vw, 110vh)",
              bottom: "calc(min(110vw, 110vh) / -2)",
              right: "calc(min(110vw, 110vh) / 4)",
            }}
          >
            <Image
              src={logo}
              alt=""
              fill
              className="object-contain opacity-[0.08]"
            />
          </div>

          {/* Title */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="mb-6 font-sans text-sm text-white/60 uppercase tracking-[0.5em]">
              Exhibit
            </p>
            <h1 className="font-serif leading-[0.9] tracking-tight">
              <span className="block text-5xl italic sm:text-6xl md:text-7xl lg:text-8xl">
                My Aging Story
              </span>
            </h1>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="font-sans text-white/60 text-xs uppercase tracking-[0.4em]">
              scroll
            </span>
            <div className="h-5 w-px bg-white/20" />
          </div>
        </section>
      </div>

      {/* ═══════════════════ About the Exhibit ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            About the Exhibit
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            Challenging ageism.{" "}
            <span className="text-primary italic">Celebrating resilience.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          <div className="mt-8 space-y-5 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            <p>
              On February 21&ndash;22, 2025, we hosted the My Aging Story
              exhibit in Edmonton, AB. The exhibit showcased 22 powerful stories
              from Edmontonians of various ages and backgrounds, collected over
              three years through our initiative.
            </p>
            <p>
              Visitors explored interactive activities like a story-based
              scavenger hunt and the Self-Reflection Booth, where they imagined
              and wrote about their future older selves &mdash; sparking
              conversations about what it truly means to grow older.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Highlights ═══════════════════ */}
      <section className="bg-primary/[0.04] py-20 md:py-24">
        <div className="container">
          <p className="mb-14 text-center font-sans text-primary text-xs uppercase tracking-[0.4em]">
            Highlights
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-primary/10">
            {highlights.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <span className="font-serif text-7xl text-primary leading-none tracking-tight md:text-8xl">
                  {stat.value}
                </span>
                <span className="mt-3 font-sans text-foreground text-sm font-medium uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Photo Gallery 1 ═══════════════════ */}
      <section className="py-6">
        <div className="container">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {(gallery.length >= 4
              ? gallery.slice(0, 4)
              : Array(4).fill(null)
            ).map((asset, i) => (
              <div
                key={asset?.url ?? `placeholder-a-${i}`}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 0 ? "col-span-2 aspect-[2.2/1]" : "aspect-[4/3]"
                }`}
              >
                {asset ? (
                  <Image
                    src={asset.url}
                    alt={asset.title || "Exhibit photo"}
                    fill
                    className="object-cover"
                    sizes={
                      i === 0
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 25vw, 50vw"
                    }
                  />
                ) : (
                  <PhotoPlaceholder
                    className="h-full w-full"
                    label={`Exhibit Photo ${i + 1}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Impact Stats ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            Impact
          </p>
          <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
            What visitors{" "}
            <span className="text-primary italic">told&nbsp;us.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {impact.map((stat) => (
            <div
              key={stat.value}
              className="flex flex-col items-center text-center"
            >
              {/* Ring + number */}
              <div className="relative flex items-center justify-center">
                <StatRing value={stat.value} />
                <span className="absolute font-serif text-4xl text-primary leading-none tracking-tight sm:text-4xl md:text-5xl">
                  {stat.value}
                  <span className="text-2xl md:text-3xl">%</span>
                </span>
              </div>
              <p className="mt-5 max-w-[16rem] font-sans text-foreground/60 text-sm leading-relaxed md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ Photo Gallery 2 ═══════════════════ */}
      <section className="py-2">
        <div className="container">
          <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
            {(gallery.length >= 9
              ? gallery.slice(4, 9)
              : Array(5).fill(null)
            ).map((asset, i) => (
              <div
                key={asset?.url ?? `placeholder-b-${i}`}
                className={`relative overflow-hidden rounded-2xl ${
                  i === 2
                    ? "col-span-1 row-span-2 hidden aspect-auto md:block"
                    : "aspect-square"
                } ${i >= 3 ? "hidden md:block" : ""}`}
              >
                {asset ? (
                  <Image
                    src={asset.url}
                    alt={asset.title || "Exhibit photo"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 20vw, 33vw"
                  />
                ) : (
                  <PhotoPlaceholder
                    className="h-full w-full"
                    label={`Exhibit Photo ${i + 5}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Exhibit Stations ═══════════════════ */}
      <section className="relative overflow-hidden bg-primary/[0.04] py-24 md:py-32">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(70vw, 70vh)",
            height: "min(70vw, 70vh)",
            top: "calc(min(70vw, 70vh) / -3)",
            left: "calc(min(70vw, 70vh) / -3)",
          }}
        >
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain opacity-[0.03]"
            style={{ filter: "invert(1)" }}
          />
        </div>

        <div className="container relative">
          <div className="mb-16 text-center">
            <p className="mb-5 font-sans text-primary text-xs uppercase tracking-[0.4em]">
              Stations
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Four ways to <span className="text-primary italic">engage.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station, i) => (
              <div
                key={station.title}
                className="group flex flex-col rounded-2xl border border-primary/10 bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-sans text-[10px] text-primary/35 uppercase tracking-[0.3em]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-foreground text-xl leading-tight md:text-2xl">
                  {station.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                <p className="mt-4 font-sans text-foreground/55 text-sm leading-relaxed">
                  {station.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Feature CTA ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="heroTexture absolute inset-0 opacity-40" />

          {/* Watermark */}
          <div
            className="pointer-events-none absolute animate-spin-slow"
            aria-hidden="true"
            style={{
              width: "min(50vw, 50vh)",
              height: "min(50vw, 50vh)",
              bottom: "calc(min(50vw, 50vh) / -2.5)",
              right: "calc(min(50vw, 50vh) / -2.5)",
            }}
          >
            <Image
              src={logo}
              alt=""
              fill
              className="object-contain opacity-[0.12]"
            />
          </div>

          <div className="relative px-8 py-20 text-center text-white md:px-16 md:py-28">
            <p className="font-sans text-sm text-white/60 uppercase tracking-[0.4em]">
              Why It Matters
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
              Aging affects everyone.
              <br />
              <span className="italic">Let&rsquo;s keep talking about it.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-white/75 leading-relaxed">
              How we think about aging shapes how we grow old and how we treat
              one another. By involving people of all ages in these
              conversations, we build compassionate communities where we can all
              grow old in.
            </p>
            <a
              href="mailto:hello@theagecollective.ca"
              className="mt-10 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Acknowledgements ═══════════════════ */}
      <section className="border-t border-primary/8 py-16 md:py-20">
        <div className="container text-center">
          <p className="mb-10 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            Acknowledgements
          </p>
          <p className="mx-auto mb-10 max-w-2xl font-sans text-foreground/50 text-sm leading-relaxed">
            This exhibit was made possible through the generous support and
            collaboration of our community partners. We are deeply grateful for
            their belief in the power of storytelling.
          </p>
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 md:gap-12">
            {acknowledgements.map((name) => (
              <div
                key={name}
                className="flex h-14 items-center justify-center rounded-lg bg-primary/[0.04] px-6 font-sans text-foreground/35 text-sm tracking-wide transition-colors duration-200 hover:bg-primary/[0.07] hover:text-foreground/50"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
