import Navbar from "@tac/components/Navbar";
import Image from "next/image";
import anthology from "../../../../public/anthology.png";
import logo from "../../../../public/logo-rings.svg";
import ProvinceMap from "./ProvinceMap";

/* ────────────────────── Data ────────────────────── */

const highlights = [
  { value: "319", label: "Poems Submitted" },
  { value: "319", label: "Older Adults Reached" },
  { value: "91", label: "Organizations Reached" },
];

const themes = [
  {
    number: "01",
    title: "Self & Identity",
    description:
      "Poems exploring who we become as we age — the evolving self, changing roles, and the stories we tell about ourselves.",
  },
  {
    number: "02",
    title: "Place & Belonging",
    description:
      "Poems rooted in the places that shape us — home, community, landscape, and the search for where we belong.",
  },
  {
    number: "03",
    title: "Time, Memory & Legacy",
    description:
      "Poems that move through time — looking back, holding on, letting go, and asking what we leave behind.",
  },
  {
    number: "04",
    title: "Power & Resistance",
    description:
      "Poems that push back — against ageism, invisibility, and the assumptions placed on older adults.",
  },
];

const ageGroups = [
  { range: "55–64", percentage: 38 },
  { range: "65–74", percentage: 35 },
  { range: "75–84", percentage: 20 },
  { range: "85–95", percentage: 7 },
];

const judges = [
  {
    name: "Trevor Hughes",
    title: "Poet & Writer",
    bio: "Trevor\u2019s first encounter with live poetry readings was when, as a teenager, he heard Brian Patten, Roger McGough and Adrian Henri, the so-called Mersey Poets, performing in his native Liverpool in the late 1960s. Trevor has been hooked ever since. He particularly values the way people share thoughts, feelings and experiences, and reveal their vulnerabilities in the best words they can find. Trevor started to write poetry seriously in his forties, attending workshops with well-established writers, which helped him considerably. In 2017, he published a sequence of poems, \u2018belongings\u2019, in memory of his son, Peter, who died aged 25. Trevor\u2019s main feeling about aging is to try and stay as active and engaged with other people as possible, whatever increasing hardships one faces.",
  },
  {
    name: "Judge Name",
    title: "Title / Affiliation",
    bio: "Placeholder biography \u2014 replace with the real judge\u2019s background, their connection to poetry and aging, and what they bring to the GOLD selection process.",
  },
  {
    name: "Judge Name",
    title: "Title / Affiliation",
    bio: "Placeholder biography \u2014 replace with the real judge\u2019s background, their connection to poetry and aging, and what they bring to the GOLD selection process.",
  },
];

const poets = [
  {
    name: "Jannie Danies",
    bio: "Jannie Danies is an emerging poet whose work explores the textures of memory, aging, and quiet resilience. Her poems draw from lived experience with tenderness and precision, giving voice to moments often overlooked.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
  {
    name: "Poet Name",
    bio: "Placeholder biography — replace with the poet\u2019s background and their connection to the GOLD anthology.",
  },
];

export default function Gold() {
  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-gold/60"
        scrollThreshold={200}
      />

      {/* ═══════════════════ Hero ═══════════════════ */}
      <div className="-mt-27 bg-[#0A0A0A] md:-mt-32">
        <section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden pt-27 pb-27 text-center md:pt-32 md:pb-32">
          {/* Warm radial glow */}
          <div
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 55%)",
            }}
          />
          {/* Subtle vignette */}
          <div
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)",
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
              right: "calc(min(110vw, 110vh) / 6)",
            }}
          >
            <Image
              src={logo}
              alt=""
              fill
              className="object-contain opacity-[0.04]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="mb-6 font-sans text-gold/50 text-sm uppercase tracking-[0.5em]">
              Poetry Collection
            </p>
            <h1
              className="my-6 animate-shimmer bg-clip-text font-bold font-serif text-8xl text-transparent leading-none tracking-tight sm:text-9xl lg:text-[11rem]"
              style={{
                backgroundImage:
                  "linear-gradient(105deg, #8A7230 0%, #C9A84C 25%, #F5E6A3 45%, #FFFDE0 50%, #F5E6A3 55%, #C9A84C 75%, #8A7230 100%)",
                backgroundSize: "200% 100%",
              }}
            >
              GOLD
            </h1>
            <p className="max-w-lg font-light font-sans text-white/50 text-xl sm:text-3xl">
              Poems celebrating the golden threads of a life well&#8209;lived.
            </p>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="font-sans text-gold/40 text-xs uppercase tracking-[0.4em]">
              scroll
            </span>
            <div className="h-5 w-px bg-gold/20" />
          </div>
        </section>
      </div>

      {/* ═══════════════════ About the Collection ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-gold text-xs uppercase tracking-[0.4em]">
            About the Collection
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            Centering older voices{" "}
            <span className="text-gold italic">through poetry.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
          <div className="mt-8 space-y-5 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            <p>
              The GOLD Poetry Project began in response to two connected gaps:
              older adults are underrepresented in the arts, and aging is often
              understood in narrow ways. These gaps limit opportunities for
              creative expression and make it harder to have honest
              conversations about what it really means to grow older.
            </p>
            <p>
              Between June 2025 and February 2026, we invited adults aged 55 and
              older across Canada to submit original poems about their
              experiences of aging. Over four national calls &mdash; each
              focused on a different dimension of the aging experience &mdash;
              the ten highest&#8209;scoring poems from each theme were selected,
              resulting in a final digital anthology of 40&nbsp;poems.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Read the Anthology ═══════════════════ */}
      <section className="relative pb-8 md:pb-10">
        {/* Dark bottom half bridges into Highlights */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0A0A0A]" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#141210] shadow-2xl shadow-gold/8 ring-1 ring-gold/10">
            {/* Ambient glow inside card */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)",
              }}
            />

            <div className="relative items-center gap-12 p-8 md:flex md:p-12 lg:gap-16 lg:p-16">
              {/* Cover image */}
              <div className="mx-auto mb-10 w-52 shrink-0 md:mx-0 md:mb-0 md:w-56 lg:w-64">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-black/40 shadow-xl ring-1 ring-gold/15">
                  <Image
                    src={anthology}
                    alt="GOLD anthology cover"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text + CTA */}
              <div className="text-center md:text-left">
                <p className="mb-5 font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
                  The Anthology
                </p>
                <h2 className="font-serif text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
                  Read the <span className="text-gold italic">collection.</span>
                </h2>
                <div className="mx-auto mt-2 h-px w-16 bg-gold/20 md:mx-0" />
                <p className="mt-6 font-sans text-base text-white/55 leading-relaxed md:text-lg">
                  The GOLD anthology reflects a wide range of experiences that
                  resist singular narratives of aging and instead reveal its
                  complexity, contradiction, strength, and vulnerability.
                </p>
                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/10 px-8 py-4 font-sans text-gold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold/40 hover:bg-gold/15 hover:shadow-gold/5 hover:shadow-lg"
                >
                  Read the Anthology
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Highlights ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-28">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          }}
        />

        <div className="container relative">
          <p className="mb-14 text-center font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
            Highlights
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-gold/10">
            {highlights.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center"
              >
                <span className="font-serif text-7xl text-gold leading-none tracking-tight md:text-8xl">
                  {stat.value}
                </span>
                <span className="mt-3 font-medium font-sans text-sm text-white/50 uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Reach & Demographics ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-18 md:py-24">
        <div className="container relative">
          {/* Interactive province map */}
          <ProvinceMap />

          {/* Divider */}
          <div className="mx-auto my-16 h-px w-16 bg-gold/15" />

          {/* Age Distribution */}
          <div className="mx-auto max-w-2xl">
            <p className="mb-10 text-center font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
              Age Distribution
            </p>
            <div className="space-y-6">
              {ageGroups.map((group) => (
                <div key={group.range} className="flex items-center gap-5">
                  <span className="w-14 shrink-0 text-right font-sans text-sm text-white/50">
                    {group.range}
                  </span>
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-gold/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold/80 to-gold"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                  <span className="w-12 shrink-0 font-serif text-gold text-lg">
                    {group.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Themes ═══════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32">
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
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              The Four Calls
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Four dimensions of{" "}
              <span className="text-gold italic">the aging experience.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((theme) => (
              <div
                key={theme.title}
                className="group flex flex-col rounded-2xl border border-gold/10 bg-[#0A0A0A] px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold/5 hover:shadow-lg"
              >
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  {theme.number}
                </span>
                <h3 className="mt-2 font-serif text-white text-xl leading-tight md:text-2xl">
                  {theme.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-gold/20 transition-all duration-300 group-hover:w-12 group-hover:bg-gold/40" />
                <p className="mt-4 font-sans text-sm text-white/40 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Meet the Judges ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(60vw, 60vh)",
            height: "min(60vw, 60vh)",
            bottom: "calc(min(60vw, 60vh) / -3)",
            left: "calc(min(60vw, 60vh) / -3)",
          }}
        >
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain opacity-[0.03]"
          />
        </div>

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.04) 0%, transparent 55%)",
          }}
        />

        <div className="container relative">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
              The Panel
            </p>
            <h2 className="font-serif text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
              Meet the <span className="text-gold italic">judges.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/20" />
          </div>

          <div className="mx-auto flex max-w-4xl flex-col gap-6">
            {judges.map((judge, i) => (
              <div
                key={judge.name + i}
                className="group flex flex-col gap-6 rounded-2xl border border-gold/10 bg-[#141210] p-7 transition-all duration-300 hover:border-gold/20 hover:shadow-gold/5 hover:shadow-lg sm:flex-row sm:gap-8 sm:p-8"
              >
                {/* Avatar placeholder */}
                <div className="flex shrink-0 flex-col items-center sm:pt-1">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gold/8 ring-2 ring-gold/15 sm:h-36 sm:w-36">
                    <span className="font-serif text-3xl text-gold/40 sm:text-4xl">
                      {judge.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center sm:text-left">
                  <h3 className="font-serif text-white text-xl leading-tight md:text-2xl">
                    {judge.name}
                  </h3>
                  <p className="mt-1 font-sans text-gold/50 text-xs uppercase tracking-[0.2em]">
                    {judge.title}
                  </p>
                  <div className="mx-auto mt-3 h-px w-8 bg-gold/15 transition-all duration-300 group-hover:w-12 group-hover:bg-gold/30 sm:mx-0" />
                  <p className="mt-4 font-sans text-sm text-white/45 leading-relaxed md:text-[15px]">
                    {judge.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ The GOLD Poets ═══════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(70vw, 70vh)",
            height: "min(70vw, 70vh)",
            top: "calc(min(70vw, 70vh) / -3)",
            right: "calc(min(70vw, 70vh) / -3)",
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
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              The Voices
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              The GOLD <span className="text-gold italic">poets.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-foreground/60 leading-relaxed md:text-lg">
              Fourteen poets whose words shape the anthology &mdash; each
              bringing their own experience of aging into verse.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 lg:grid-cols-2">
            {poets.map((poet, i) => (
              <div
                key={poet.name + i}
                className="group flex gap-5 rounded-2xl border border-gold/8 bg-[#0A0A0A] p-5 transition-all duration-300 hover:border-gold/20 hover:shadow-gold/5 hover:shadow-lg sm:gap-6 sm:p-6"
              >
                {/* Avatar */}
                <div className="shrink-0 pt-0.5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/8 ring-1 ring-gold/15 transition-all duration-300 group-hover:ring-gold/30 sm:h-20 sm:w-20">
                    <span className="font-serif text-gold/35 text-xl transition-colors duration-300 group-hover:text-gold/60 sm:text-2xl">
                      {poet.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="font-serif text-foreground text-lg leading-tight transition-colors duration-300 group-hover:text-gold md:text-xl">
                    {poet.name}
                  </h3>
                  <div className="mt-2 h-px w-6 bg-gold/15 transition-all duration-300 group-hover:w-10 group-hover:bg-gold/30" />
                  <p className="mt-3 font-sans text-foreground/50 text-sm leading-relaxed">
                    {poet.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
