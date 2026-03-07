import MediaCard from "@tac/components/MediaCard";
import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import PillarCard from "@tac/components/PillarCard";
import { getAssetsByTag, type MediaAsset } from "@tac/lib/contentful";
import Image from "next/image";
import logo from "../../../public/logo-rings.svg";

const pillars = [
  {
    title: "Community First.",
    description:
      "Our work centers on building inclusive, intergenerational communities where people feel seen, valued, and heard. We bring younger and older adults into the same conversation because aging affects all of us.",
  },
  {
    title: "Aging is Living.",
    description:
      "We embrace the full and complex reality of aging, including joy, loss, growth, change, and resilience. We also recognize that factors such as income, race, gender, ability, and access to care all shape how people experience growing older.",
  },
  {
    title: "Conversation Creates Change.",
    description:
      "When people are invited to listen and be listened to, change emerges. Through stories, poetry, film, and art, we challenge ageist assumptions and create space for empathy, understanding, and connection.",
  },
];

const quotes: MediaAsset[] = [
  {
    url: "Jamie, 24 yrs",
    sortIndex: 2,
    title:
      "I had a professor that said that ageism is the last -ism that we’ve yet to see real change in. Racism, sexism, etc. - none of this is okay, but ageism is somehow still acceptable in a lot of different sectors.",
    type: "quote",
  },
  {
    url: "Jamie, 24 yrs",
    sortIndex: 5,
    title:
      "I had a professor that said that ageism is the last -ism that we’ve yet to see real change in. Racism, sexism, etc. - none of this is okay, but ageism is somehow still acceptable in a lot of different sectors.",
    type: "quote",
  },
];
export const revalidate = 3600;

export default async function About() {
  const [collageAssets, featureAssets, bottomAssets] = await Promise.all([
    getAssetsByTag("aboutCollage"),
    getAssetsByTag("aboutFeature"),
    getAssetsByTag("aboutBottom"),
  ]);

  const allCollageAssets = [...collageAssets, ...quotes].sort(
    (a, b) => a.sortIndex - b.sortIndex,
  );
  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-tertiary/60"
        scrollThreshold={200}
      />
      <PageHero
        accentLabel="Who we are"
        title="About Us"
        subtitle={
          <>
            We&rsquo;re redefining what it <br /> means to grow older.
          </>
        }
        bgClass="bg-tertiary"
        watermarkRight="calc(min(110vw, 110vh) / 6)"
      />

      {/* ─── Mission Statement ─── */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
            Our Mission
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            Aging isn&rsquo;t the problem.{" "}
            <span className="text-tertiary italic">Ageism is.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-tertiary/30" />
          <div className="mt-8 space-y-5 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            <p>
              Ageism is the way we think, feel, or act towards people based on
              age. It is one of the most common and normalized forms of
              discrimination, and it shows up in everyday language, in media,
              and in how systems like healthcare, housing, and employment are
              designed.
            </p>
            <p>
              Ageism shapes whose voices are heard, whose lives are valued, and
              whose needs are prioritized. Its impacts are even greater when
              combined with sexism, racism, ableism, and other forms of
              discrimination.
            </p>
            <p>
              Ageism is linked to social isolation, poorer health outcomes, and
              reduced access to care and opportunity. Over time, it can also
              affect how people see themselves as they grow older.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Photo Collage ─── */}
      {collageAssets.length > 0 && (
        <section className="container pb-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {allCollageAssets.map((asset, i) => (
              <div
                key={`${asset.url}-${asset.sortIndex}`}
                className={`relative overflow-hidden rounded-2xl bg-tertiary/10 ${
                  i === 0
                    ? "row-span-2"
                    : i > 2
                      ? "hidden aspect-4/3 md:block"
                      : "aspect-4/3"
                }`}
              >
                <MediaCard asset={asset} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Changing the Narrative ─── */}
      <section className="relative bg-tertiary/[0.07] py-24 md:py-32">
        <div className="container relative">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
                What We Do
              </p>
              <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
                We&rsquo;re changing the{" "}
                <span className="text-tertiary italic">narrative</span> around
                aging.
              </h2>
              <div className="mt-2 h-px w-16 bg-tertiary/30" />
              <p className="mt-8 font-sans text-foreground/70 text-lg leading-relaxed">
                How we think about aging shapes how we grow old and how we treat
                one another across generations. We create space for honest
                stories, creative expression, and meaningful conversation about
                what it means to grow older across the life course.
              </p>
              <p className="mt-5 font-sans text-foreground/70 text-lg leading-relaxed">
                Through storytelling, art, educational resources, and community
                engagement, we work to challenge ageism and support healthier,
                more equitable aging for all.
              </p>
            </div>

            {/* Side photos — shuffling duo */}
            <div className="relative mx-auto aspect-4/5 w-full max-w-md lg:max-w-none">
              {featureAssets[0] && (
                <div className="absolute inset-[10%] animate-shuffle-a overflow-hidden rounded-2xl bg-tertiary/15 shadow-xl">
                  <Image
                    src={featureAssets[0].url}
                    alt={featureAssets[0].title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 60vw"
                    className="object-cover"
                  />
                </div>
              )}
              {featureAssets[1] && (
                <div className="absolute inset-[10%] animate-shuffle-b overflow-hidden rounded-2xl bg-tertiary/15 shadow-xl">
                  <Image
                    src={featureAssets[1].url}
                    alt={featureAssets[1].title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 60vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Wave Divider Top + Watermark ─── */}
      <div className="relative">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="block h-12 w-full md:h-20"
        >
          {/* Upper half — matches the section above (tertiary/[0.07]) */}
          <path
            d="M0 0H1440V40C1200 0 960 80 720 40C480 0 240 80 0 40Z"
            className="fill-tertiary"
            fillOpacity="0.07"
          />
          {/* Lower half — matches the Values section */}
          <path
            d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z"
            className="fill-tertiary"
          />
        </svg>
      </div>

      {/* ─── Values ─── */}
      <section className="heroTexture relative bg-tertiary pb-12 text-white md:pb-20">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute z-40 animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(60vw, 60vh)",
            height: "min(60vw, 60vh)",
            bottom: "calc(min(60vw, 60vh) / -3)",
            left: "calc(min(60vw, 90vh) / -3)",
          }}
        >
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain opacity-[0.06]"
          />
        </div>

        <div className="container relative pt-8 md:pt-14">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 font-sans text-white/50 text-xs uppercase tracking-[0.4em]">
              What We Believe
            </p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
              These values shape how we{" "}
              <span className="italic">engage, create, and advocate.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-white/20" />
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-3 lg:gap-8">
            {pillars.map((pillar, i) => (
              <PillarCard
                key={pillar.title}
                index={i}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Wave Divider Bottom ─── */}
      <div
        aria-hidden="true"
        className="heroTexture h-12 w-full bg-tertiary md:h-20"
        style={{
          clipPath: "url(#waveBottomClip)",
        }}
      />
      <svg width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id="waveBottomClip" clipPathUnits="objectBoundingBox">
            <path d="M0 0 H1 V0.5 C0.833 1,0.667 0,0.5 0.5 C0.333 1,0.167 0,0 0.5 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ─── Why We Are ─── */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto grid items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-38">
            <p className="mb-4 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
              Origin
            </p>
            <h2 className="font-serif text-4xl text-foreground leading-tight md:text-5xl">
              Why <span className="text-tertiary italic">We Are</span>
            </h2>
            <div className="mt-2 h-px w-16 bg-tertiary/30" />
          </div>

          <div className="space-y-8 font-sans text-foreground/70 text-lg leading-relaxed">
            {/* Photo */}
            {bottomAssets[0] && (
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <Image
                    src={bottomAssets[0].url}
                    alt={bottomAssets[0].title}
                    width={1080}
                    height={810}
                    sizes="(min-width: 896px) 700px, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            )}
            <p>
              The Age Collective was founded in 2021 by a sister duo who saw
              gaps that needed addressing. We watched our own parents navigate
              complex systems as older immigrants, often facing confusing
              processes, limited support, and age-based assumptions. In our work
              experiences, we also witnessed older adults being overlooked or
              dismissed in healthcare and community settings.
            </p>
            <p>
              These experiences made it clear to us that aging is not just
              personal, but shaped by systems, power, and whose voices are taken
              seriously.
            </p>
            <blockquote className="border-tertiary/50 border-l-2 pl-6 font-serif text-foreground/50 text-xl italic leading-relaxed md:text-2xl">
              We also believe aging is not only an &ldquo;older adult
              issue.&rdquo; Younger people are aging too. Intergenerational
              relationships matter if we want greater understanding, solidarity,
              and collective action.
            </blockquote>
            <p>
              What began as a small collection of written narratives has grown
              into a multi-platform initiative spanning films, exhibits, poetry,
              and community dialogue. Every story we share is a step toward a
              culture that embraces and normalizes aging rather than fearing it.
            </p>
            <p>
              We&rsquo;re grateful that many of our participants have become
              ongoing collaborators (and more importantly, friends!) and these
              relationships have challenged and reshaped our own assumptions
              about aging. Through this work, we continue to learn and build
              meaningful bonds across generations.
            </p>
            <p>
              We remain committed to centering older adults&rsquo; voices,
              questioning ageist systems, and creating space for honest
              dialogue. Our work continues to evolve through reflection,
              learning, and the relationships that make this collective
              possible.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-tertiary/5 py-24 md:py-32">
        <div className="container relative text-center">
          <p className="mb-5 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
            Get Involved
          </p>
          <h2 className="mx-auto max-w-2xl font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
            Every age has a story.{" "}
            <span className="text-tertiary italic">What&rsquo;s yours?</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-tertiary/30" />
          <p className="mx-auto mt-8 max-w-xl font-sans text-foreground/60 text-lg leading-relaxed">
            Whether you&rsquo;re 22 or 92, your perspective on aging matters.
            We&rsquo;d love to hear from you.
          </p>
          <a
            href="mailto:hello@theagecollective.ca"
            className="mt-10 inline-flex items-center gap-3 rounded-xl border border-tertiary bg-tertiary px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </div>
  );
}
