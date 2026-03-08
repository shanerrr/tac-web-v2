import Navbar from "@tac/components/Navbar";
import Image from "next/image";
import ACSELLogo from "../../../../public/ACSEL.png";
import anthology from "../../../../public/anthology.png";
import CSCLogo from "../../../../public/CSC.png";
import logo from "../../../../public/logo-rings.svg";
import VALogo from "../../../../public/VA.png";

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

const impact = [
  {
    value: 92,
    label: "felt a deeper connection to older adults' experiences.",
  },
  { value: 87, label: "said the poems shifted how they think about aging." },
  { value: 95, label: "would recommend the collection to others." },
];

const supporters = [
  { name: "ACSEL", logo: ACSELLogo },
  { name: "Canada Service Corps", logo: CSCLogo },
  { name: "Volunteer Alberta", logo: VALogo },
];

/* ────────────────────── StatRing ────────────────────── */

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
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-gold/15"
      />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        className="text-gold"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="50"
        r={r - 8}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-gold/8"
      />
    </svg>
  );
}

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
      <div className="bg-[#0A0A0A] -mt-27 md:-mt-32">
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
            <p className="mb-6 font-sans text-sm text-gold/50 uppercase tracking-[0.5em]">
              Poetry Collection
            </p>
            <h1 className="my-6 bg-gradient-to-b from-[#E8D07A] via-gold to-[#8A7230] bg-clip-text font-bold font-serif text-8xl leading-none tracking-tight text-transparent sm:text-9xl lg:text-[11rem]">
              GOLD
            </h1>
            <p className="max-w-lg font-light font-sans text-xl text-white/50 sm:text-3xl">
              Poems celebrating the golden threads
              <br className="hidden sm:block" /> of a life well&#8209;lived.
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
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl shadow-black/40 ring-1 ring-gold/15">
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
                  className="mt-8 inline-flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/10 px-8 py-4 font-sans text-sm text-gold uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold/40 hover:bg-gold/15 hover:shadow-lg hover:shadow-gold/5"
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
                <span className="mt-3 font-medium font-sans text-white/50 text-sm uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
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
                className="group flex flex-col rounded-2xl border border-gold/10 bg-[#0A0A0A] px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5"
              >
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  {theme.number}
                </span>
                <h3 className="mt-2 font-serif text-white text-xl leading-tight md:text-2xl">
                  {theme.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-gold/20 transition-all duration-300 group-hover:w-12 group-hover:bg-gold/40" />
                <p className="mt-4 font-sans text-white/40 text-sm leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Featured Excerpt ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <p className="mb-12 text-center font-sans text-gold text-xs uppercase tracking-[0.4em]">
            From the Collection
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Poem 1 */}
            <div className="relative rounded-2xl border border-gold/10 bg-[#0A0A0A] px-8 py-10 md:px-10 md:py-12">
              <span
                className="pointer-events-none absolute top-4 left-6 font-serif text-[6rem] leading-none text-gold/10 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10">
                <p className="font-serif text-lg text-white/80 italic leading-relaxed md:text-xl">
                  There is gold in the way she laughs &mdash;
                  <br />
                  not the polished kind, not the kept kind,
                  <br />
                  but the gold that lives in late&#8209;afternoon light,
                  <br />
                  in bread crusts, in the worn spine
                  <br />
                  of a book read forty times.
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="h-px w-6 bg-gold/30" />
                  <cite className="font-sans text-sm text-gold/50 not-italic uppercase tracking-[0.2em]">
                    Excerpt I
                  </cite>
                </footer>
              </blockquote>
            </div>

            {/* Poem 2 */}
            <div className="relative rounded-2xl border border-gold/10 bg-[#0A0A0A] px-8 py-10 md:px-10 md:py-12">
              <span
                className="pointer-events-none absolute top-4 left-6 font-serif text-[6rem] leading-none text-gold/10 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10">
                <p className="font-serif text-lg text-white/80 italic leading-relaxed md:text-xl">
                  I am not fading.
                  <br />I am becoming
                  <br />
                  the colour of dusk &mdash;
                  <br />
                  deeper, softer,
                  <br />
                  almost ready to be sky.
                </p>
                <footer className="mt-6 flex items-center gap-3">
                  <div className="h-px w-6 bg-gold/30" />
                  <cite className="font-sans text-sm text-gold/50 not-italic uppercase tracking-[0.2em]">
                    Excerpt II
                  </cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Impact Stats ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
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
          />
        </div>

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.04) 0%, transparent 55%)",
          }}
        />

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
              Impact
            </p>
            <h2 className="font-serif text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
              What readers{" "}
              <span className="text-gold italic">told&nbsp;us.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/20" />
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            {impact.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col items-center text-center"
              >
                <div className="relative flex items-center justify-center">
                  <StatRing value={stat.value} />
                  <span className="absolute font-serif text-4xl text-gold leading-none tracking-tight sm:text-4xl md:text-5xl">
                    {stat.value}
                    <span className="text-2xl md:text-3xl">%</span>
                  </span>
                </div>
                <p className="mt-5 max-w-[16rem] font-sans text-white/45 text-sm leading-relaxed md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Featured Reading ═══════════════════ */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              Featured Reading
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Hear the poems{" "}
              <span className="text-gold italic">come alive.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-foreground/60 leading-relaxed md:text-lg">
              A selection of poems from the collection, read aloud by the poets
              and the people whose stories inspired them.
            </p>
          </div>

          {/* Video embed */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gold/10">
              <div className="aspect-video bg-[#0A0A0A]">
                <iframe
                  src="https://www.youtube.com/embed/unh5yVYfwqE"
                  title="GOLD poetry collection — featured reading"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="container pb-24 md:pb-32">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl shadow-xl">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#12100A] to-[#1A160E]" />

          {/* Subtle gold shimmer */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 50%)",
            }}
          />

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
              className="object-contain opacity-[0.06]"
            />
          </div>

          <div className="relative px-8 py-20 text-center text-white md:px-16 md:py-28">
            <p className="font-sans text-sm text-gold/50 uppercase tracking-[0.4em]">
              The Collection
            </p>
            <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
              Every life holds gold.
              <br />
              <span className="text-gold italic">
                These poems find&nbsp;it.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-white/50 leading-relaxed">
              Interested in reading the full collection, hosting a reading, or
              collaborating on future poems? We&rsquo;d love to hear from you.
            </p>
            <a
              href="mailto:info@theagecollective.com"
              className="mt-10 inline-flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/10 px-8 py-4 font-sans text-sm text-gold uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold/40 hover:bg-gold/15 hover:shadow-lg hover:shadow-gold/5"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ Acknowledgements ═══════════════════ */}
      <section className="border-gold/8 border-t py-24 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              Acknowledgements
            </p>
            <h2 className="font-serif text-4xl text-foreground leading-tight md:text-5xl">
              With <span className="text-gold italic">gratitude.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
          </div>

          {/* Thank-you messages */}
          <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gold/8 bg-gold/[0.04] px-7 py-6">
              <p className="mb-2 font-sans text-[12px] text-gold uppercase tracking-[0.3em]">
                Storytellers
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                To every person who opened their lives and shared their stories
                &mdash; your words are the heart of this collection.
              </p>
            </div>
            <div className="rounded-2xl border border-gold/8 bg-gold/[0.04] px-7 py-6">
              <p className="mb-2 font-sans text-[12px] text-gold uppercase tracking-[0.3em]">
                Poets
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                To the writers who listened deeply and transformed conversations
                into verse &mdash; thank you for your care and craft.
              </p>
            </div>
            <div className="rounded-2xl border border-gold/8 bg-gold/[0.04] px-7 py-6 sm:col-span-2">
              <p className="mb-2 font-sans text-[12px] text-gold uppercase tracking-[0.3em]">
                Community
              </p>
              <p className="font-sans text-foreground/80 text-sm leading-relaxed">
                Thank you to the communities across Canada who welcomed us,
                connected us with elders, and helped make these poems possible.
              </p>
            </div>
          </div>

          {/* Funding acknowledgement + logos */}
          <div className="mx-auto mt-12 max-w-3xl text-center">
            <div className="mx-auto h-px w-12 bg-gold/15" />
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
