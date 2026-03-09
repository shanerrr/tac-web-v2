import CountUp from "@tac/components/CountUp";
import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import { getAssetsByTag } from "@tac/lib/contentful";
import Image from "next/image";
import ACSELLogo from "../../../../public/ACSEL.png";
import CSCLogo from "../../../../public/CSC.png";
import logo from "../../../../public/logo-rings.svg";
import VALogo from "../../../../public/VA.png";

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

const supporters = [
  { name: "ACSEL", logo: ACSELLogo },
  { name: "Canada Service Corps", logo: CSCLogo },
  {
    name: "Volunteer Alberta",
    logo: VALogo,
  },
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
        className="text-quaternary/10"
      />
      {/* Progress ring */}
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        className="text-quaternary"
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
        className="text-quaternary/8"
      />
    </svg>
  );
}

export default async function MyAgingStory() {
  const galleryAssets = await getAssetsByTag("masGallery");
  const gallery = galleryAssets.sort((a, b) => a.sortIndex - b.sortIndex);

  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-quaternary/60"
        scrollThreshold={200}
      />

      <PageHero
        accentLabel="Exhibit"
        title="My Aging Story"
        subtitle="An interactive exhibit exploring personal aging narratives"
        bgClass="bg-quaternary"
        watermarkRight="calc(min(110vw, 110vh) / 4)"
        glowOverlay="radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 55%)"
        vignetteOverlay="radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
        fullHeight
      />

      {/* ═══════════════════ About the Exhibit ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
            About the Exhibit
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            Challenging ageism.{" "}
            <span className="text-quaternary italic">
              Celebrating resilience.
            </span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-quaternary/30" />
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

      {/* ═══════════════════ Exhibit Stations ═══════════════════ */}
      <section className="relative overflow-hidden bg-quaternary/4 py-24 md:py-32">
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
            <p className="mb-5 font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
              Stations
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Four ways to{" "}
              <span className="text-quaternary italic">engage.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-quaternary/30" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stations.map((station, i) => (
              <div
                key={station.title}
                className="group flex flex-col rounded-2xl border border-quaternary/10 bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-sans text-[10px] text-quaternary/35 uppercase tracking-[0.3em]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-foreground text-xl leading-tight md:text-2xl">
                  {station.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-quaternary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-quaternary/40" />
                <p className="mt-4 font-sans text-foreground/55 text-sm leading-relaxed">
                  {station.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Highlights ═══════════════════ */}
      <section className="py-20 md:py-24">
        <div className="container">
          <p className="mb-14 text-center font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
            Highlights
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-quaternary/10">
            {highlights.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <CountUp
                  value={Number(stat.value)}
                  className="font-serif text-7xl text-quaternary leading-none tracking-tight md:text-8xl"
                  delay={i * 150}
                />
                <span className="mt-3 font-medium font-sans text-foreground text-sm uppercase tracking-[0.2em]">
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
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {gallery.map((asset, i) => (
              <div
                key={asset?.url ?? `placeholder-a-${i}`}
                className={`relative overflow-hidden rounded-[10px] ${
                  i === 0
                    ? "col-span-2 aspect-2/0"
                    : i >= 5
                      ? "hidden aspect-4/3 md:block"
                      : "aspect-4/3"
                }`}
              >
                <Image
                  src={asset.url}
                  alt={asset.title || "Exhibit photo"}
                  fill
                  className="object-cover"
                  sizes={
                    i === 0
                      ? "(min-width: 768px) 66vw, 100vw"
                      : "(min-width: 768px) 33vw, 50vw"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Impact Stats ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
            Impact
          </p>
          <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
            What visitors{" "}
            <span className="text-quaternary italic">told&nbsp;us.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-quaternary/30" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {impact.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center"
            >
              {/* Ring + number */}
              <div className="relative flex items-center justify-center">
                <StatRing value={stat.value} />
                <span className="absolute font-serif text-4xl text-quaternary leading-none tracking-tight sm:text-4xl md:text-5xl">
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

      {/* ═══════════════════ Feature CTA ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-linear-to-br from-quaternary via-quaternary/90 to-quaternary/80" />
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
              href="mailto:info@theagecollective.com"
              className="mt-10 inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Exhibit Video ═══════════════════ */}
      <section className="relative overflow-hidden bg-quaternary/[0.04] py-24 md:py-32">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(60vw, 60vh)",
            height: "min(60vw, 60vh)",
            bottom: "calc(min(60vw, 60vh) / -3)",
            right: "calc(min(60vw, 60vh) / -3)",
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
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
              The Experience
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Two days of{" "}
              <span className="text-quaternary italic">
                stories&nbsp;&amp;&nbsp;connection.
              </span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-quaternary/30" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-foreground/60 leading-relaxed md:text-lg">
              A look inside the My Aging Story exhibit &mdash; the people, the
              conversations, and the moments that made it meaningful.
            </p>
          </div>

          {/* Video embed */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/unh5yVYfwqE"
                  title="My Aging Story exhibit video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Acknowledgements ═══════════════════ */}
      <section className="border-quaternary/8 border-t py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-quaternary text-xs uppercase tracking-[0.4em]">
              Acknowledgements
            </p>
            <h2 className="font-serif text-4xl text-foreground leading-tight md:text-5xl">
              With <span className="text-quaternary italic">gratitude.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-quaternary/30" />
          </div>

          {/* Thank-you messages */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-quaternary/8 bg-quaternary/10 px-7 py-6">
              <p className="mb-2 font-sans text-[12px] text-quaternary uppercase tracking-[0.3em]">
                Participants
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                To everyone who courageously shared their stories &mdash; this
                exhibit would not be possible without you.
              </p>
            </div>
            <div className="rounded-2xl border border-quaternary/8 bg-quaternary/10 px-7 py-6">
              <p className="mb-2 font-sans text-[12px] text-quaternary uppercase tracking-[0.3em]">
                Volunteers
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                To our incredible volunteers who dedicated their time to set-up,
                take-down, and event coordination &mdash; thank you.
              </p>
            </div>
            <div className="rounded-2xl border border-quaternary/8 bg-quaternary/10 px-7 py-6 sm:col-span-2">
              <p className="mb-2 font-sans text-[12px] text-quaternary uppercase tracking-[0.3em]">
                Community
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                Thank you to everyone who attended, engaged with the stories,
                and began conversations about aging in their own communities.
              </p>
            </div>
          </div>

          {/* Funding acknowledgement + logos */}
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mx-auto h-px w-12 bg-quaternary/15" />
            <p className="mt-8 font-sans text-foreground/80 text-sm leading-relaxed">
              Funded by Canada Service Corps and Volunteer Alberta through the
              Alberta Civil Society Emerging Leaders (ACSEL) Microgrant Program.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-10 md:gap-14">
              {supporters.map((org) => (
                <div
                  key={org.name}
                  className="flex h-16 items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                >
                  <Image
                    src={org.logo}
                    alt={org.name}
                    width={140}
                    height={56}
                    className="h-12 w-auto object-contain md:h-14"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
