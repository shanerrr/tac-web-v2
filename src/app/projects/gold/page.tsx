import CountUp from "@tac/components/CountUp";
import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import ProvinceMap from "@tac/components/ProvinceMap";
import { getGoldJudges, getGoldPoets } from "@tac/lib/contentful";
import { ExternalLink, Globe, Mail } from "lucide-react";
import Image from "next/image";
import anthology from "../../../../public/anthology.png";
import glocalLogo from "../../../../public/glocal.png";
import logo from "../../../../public/logo-rings.svg";

const highlights = [
  { value: "319", label: "Poems Submitted" },
  { value: "260", label: "Older Adults Reached" },
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
  { range: "55–64", percentage: 28 },
  { range: "65–74", percentage: 43 },
  { range: "75–84", percentage: 23 },
  { range: "85–95", percentage: 6 },
];

export default async function Gold() {
  const [goldJudges, goldPoets] = await Promise.all([
    getGoldJudges(),
    getGoldPoets(),
  ]);

  return (
    <div className="min-h-dvh w-full overflow-x-clip">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-gold/60"
        scrollThreshold={200}
      />

      {/* ═══════════════════ Hero ═══════════════════ */}
      <PageHero
        accentLabel="Poetry Anthology"
        title="GOLD"
        subtitle={
          <>Poems celebrating the golden threads of a life well&#8209;lived.</>
        }
        bgClass="bg-[#0A0A0A]"
        noTexture
        fullHeight
        watermarkRight="calc(min(110vw, 110vh) / 6)"
        watermarkOpacity="opacity-[0.04]"
        glowOverlay="radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 55%)"
        vignetteOverlay="radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)"
        accentLabelClassName="text-gold/50"
        titleClassName="animate-shimmer bg-clip-text text-transparent"
        titleStyle={{
          backgroundImage:
            "linear-gradient(105deg, #8A7230 0%, #C9A84C 25%, #F5E6A3 45%, #FFFDE0 50%, #F5E6A3 55%, #C9A84C 75%, #8A7230 100%)",
          backgroundSize: "200% 100%",
        }}
        subtitleClassName="max-w-lg text-white/50 text-xl sm:text-3xl"
        scrollCueClassName="text-gold/40"
        scrollLineClassName="bg-gold/20"
      />

      {/* ═══════════════════ About the Anthology ═══════════════════ */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-gold text-xs uppercase tracking-[0.4em]">
            About the Anthology
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

      {/* ═══════════════════ The Four Calls ═══════════════════ */}
      <section className="relative overflow-hidden bg-gold/[0.06] py-24 md:py-32">
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
            className="object-contain opacity-[0.04]"
            style={{ filter: "invert(1)" }}
          />
        </div>

        <div className="container relative">
          <div className="mb-16 text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              The Four Calls
            </p>
            <h3 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Four dimensions of{" "}
              <span className="text-gold italic">the aging experience.</span>
            </h3>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map((theme) => (
              <div
                key={theme.title}
                className="group flex flex-col rounded-2xl border border-gold/10 bg-[#0A0A0A] px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold/8 hover:shadow-lg"
              >
                <span className="font-sans text-[10px] text-gold/40 uppercase tracking-[0.3em]">
                  {theme.number}
                </span>
                <h4 className="mt-2 font-serif text-white text-xl leading-tight md:text-2xl">
                  {theme.title}
                </h4>
                <div className="mt-2 h-px w-8 bg-gold/20 transition-all duration-300 group-hover:w-12 group-hover:bg-gold/40" />
                <p className="mt-4 font-sans text-sm text-white/45 leading-relaxed">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Read the Anthology ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)",
          }}
        />

        <div className="container relative">
          <div className="mx-auto max-w-5xl items-center gap-16 md:flex lg:gap-24">
            {/* Cover image — overflows with tilt for emphasis */}
            <div className="relative mx-auto mb-10 w-56 shrink-0 md:mx-0 md:mb-0 md:-ml-4 md:w-64 lg:w-72">
              {/* Ambient glow behind book */}
              <div className="absolute -inset-6 rounded-3xl bg-gold/10 blur-3xl" />
              <div
                className="relative aspect-3/4 overflow-hidden rounded-xl shadow-2xl shadow-black/60 ring-1 ring-gold/20 transition-transform duration-500 hover:rotate-0 hover:scale-105"
                style={{ transform: "rotate(-3deg)" }}
              >
                <Image
                  src={anthology}
                  alt="GOLD anthology cover"
                  fill
                  sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 224px"
                  className="object-cover"
                />
                {/* Subtle sheen overlay */}
                <div
                  className="pointer-events-none absolute inset-0"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                  }}
                />
              </div>
            </div>

            {/* Text + CTA */}
            <div className="text-center md:text-left">
              <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
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
      </section>

      {/* ═══════════════════ Reach & Impact ═══════════════════ */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              Our Reach
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              A national <span className="text-gold italic">movement.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
          </div>

          {/* Reach Section */}
          <div className="overflow-hidden">
            {/* Stats strip */}
            <div className="grid grid-cols-1 divide-y divide-gold/30 border-gold/30 border-b sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {highlights.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center px-6 py-8 text-center"
                >
                  <CountUp
                    value={Number(stat.value)}
                    className="font-serif text-6xl text-gold leading-none tracking-tight md:text-7xl"
                    delay={i * 150}
                  />
                  <span className="mt-2 font-medium font-sans text-foreground/70 text-sm uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Map + Age Distribution side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_492px]">
              {/* Map area */}
              <div className="relative px-4 pt-8 pb-6 text-center md:px-8 md:pt-10 md:pb-8 md:text-start">
                <p className="mb-2 font-sans text-gold text-sm uppercase tracking-[0.3em]">
                  Geographical Distribution
                </p>
                <p className="mx-auto mb-8 font-sans text-foreground/70 text-sm leading-relaxed">
                  Poems were received from all provinces and two territories.
                </p>
                <ProvinceMap />
              </div>

              {/* Age distribution sidebar */}
              <div className="border-gold/30 border-t px-8 py-8 lg:border-t-0 lg:border-l">
                <p className="mb-2 text-center font-sans text-gold text-sm uppercase tracking-[0.3em] md:text-start">
                  Age Distribution
                </p>
                <p className="mb-8 text-center font-sans text-foreground/70 text-sm leading-relaxed md:text-start">
                  Poems were submitted by older adults from 55 to 95 years old.
                </p>
                <div className="space-y-5">
                  {ageGroups.map((group) => (
                    <div key={group.range}>
                      <div className="mb-1.5 flex items-baseline justify-between">
                        <span className="font-sans text-foreground/70 text-md">
                          {group.range}
                        </span>
                        <span className="font-bold font-serif text-gold text-lg">
                          {group.percentage}%
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-gold/10">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-gold/70 to-gold"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

          <div className="mx-auto flex max-w-5xl flex-col gap-20 md:gap-28">
            {goldJudges.map((judge, i) => (
              <div
                key={judge.name}
                className={`group relative flex flex-col items-center gap-8 md:flex-row md:gap-14 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Floating photo */}
                <div className="relative shrink-0">
                  {/* Ambient glow behind photo */}
                  <div className="absolute -inset-4 rounded-3xl bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/20 group-hover:blur-3xl" />
                  <div className="relative h-56 w-56 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-gold/15 transition-all duration-500 group-hover:ring-gold/30 sm:h-64 sm:w-64 md:h-72 md:w-72">
                    {judge.photo ? (
                      <Image
                        src={judge.photo}
                        alt={`Portrait of ${judge.name}`}
                        fill
                        sizes="(min-width: 768px) 288px, (min-width: 640px) 256px, 224px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gold/8">
                        <span className="font-serif text-5xl text-gold/30">
                          {judge.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                    {/* Subtle bottom gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Bio */}
                <div
                  className={`text-center ${i % 2 !== 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <h3 className="font-serif text-2xl text-white leading-tight md:text-3xl">
                    {judge.name}
                  </h3>
                  <div
                    className={`mx-auto mt-3 h-px w-10 bg-gold/20 transition-all duration-300 group-hover:w-16 group-hover:bg-gold/40 ${i % 2 !== 0 ? "md:mr-0 md:ml-auto" : "md:mx-0"}`}
                  />
                  <p className="mt-5 max-w-lg font-sans text-[15px] text-white/50 leading-relaxed md:text-base">
                    {judge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ The GOLD Poets ═══════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="container relative">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              The Voices
            </p>
            <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl lg:text-5xl">
              Meet the GOLD <span className="text-gold italic">poets.</span>
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/30" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-foreground/60 leading-relaxed md:text-lg">
              Poets whose words shape the anthology — each bringing their own
              experience of aging into verse.
            </p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col gap-14 md:gap-18">
            {goldPoets.map((poet, i) => (
              <div
                key={poet.name}
                className={`group relative flex flex-col items-center gap-6 sm:flex-row sm:gap-10 ${i % 2 !== 0 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Photo */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-3 rounded-2xl bg-gold/5 blur-xl transition-all duration-500 group-hover:bg-gold/9 group-hover:blur-2xl" />
                  <div className="relative h-40 w-40 overflow-hidden rounded-xl shadow-black/40 shadow-xl ring-1 ring-gold/10 transition-all duration-500 group-hover:ring-gold/25 sm:h-48 sm:w-48 md:h-52 md:w-52">
                    {poet.photo ? (
                      <Image
                        src={poet.photo}
                        alt={`Portrait of ${poet.name}`}
                        fill
                        sizes="(min-width: 768px) 208px, (min-width: 640px) 192px, 160px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gold/8">
                        <span className="font-serif text-4xl text-gold/25">
                          {poet.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Info */}
                <div
                  className={`text-center ${i % 2 !== 0 ? "sm:text-right" : "sm:text-left"}`}
                >
                  <h3 className="font-serif text-2xl text-foreground leading-tight md:text-3xl">
                    {poet.name}
                  </h3>
                  {poet.poemTitle && (
                    <div className="mt-1.5 font-bold font-serif text-gold text-sm md:text-base">
                      {poet.poemTitle.split("|").map((t) => (
                        <p key={t.trim()}>&ldquo;{t.trim()}&rdquo;</p>
                      ))}
                    </div>
                  )}
                  <div
                    className={`mx-auto mt-3 h-px w-8 bg-gold/15 transition-all duration-300 group-hover:w-14 group-hover:bg-gold/35 ${i % 2 !== 0 ? "sm:mr-0 sm:ml-auto" : "sm:mx-0"}`}
                  />
                  <p className="mt-4 max-w-md font-sans text-foreground/70 text-sm leading-relaxed md:text-base">
                    {poet.description}
                  </p>

                  {/* Social links */}
                  {poet.socialMediaLinks &&
                    Object.keys(poet.socialMediaLinks).length > 0 && (
                      <div
                        className={`mt-4 flex items-center gap-3 ${i % 2 !== 0 ? "justify-center sm:justify-end" : "justify-center sm:justify-start"}`}
                      >
                        {Object.entries(poet.socialMediaLinks)
                          .slice(0, 2)
                          .map(([label, url]) => {
                            const key = label.toLowerCase();
                            const isEmail =
                              key === "email" || url.startsWith("mailto:");
                            const Icon = isEmail
                              ? Mail
                              : key === "website"
                                ? Globe
                                : ExternalLink;
                            const href =
                              isEmail && !url.startsWith("mailto:")
                                ? `mailto:${url}`
                                : url;
                            return (
                              <a
                                key={label}
                                href={href}
                                {...(!isEmail && {
                                  target: "_blank",
                                  rel: "noopener noreferrer",
                                })}
                                className="group/link flex items-center gap-1.5 rounded-full border border-foreground/10 px-3.5 py-1.5 font-sans text-foreground/40 text-xs capitalize transition-all duration-200 hover:border-foreground/20 hover:text-foreground/70"
                              >
                                <Icon size={13} className="shrink-0" />
                                {label}
                              </a>
                            );
                          })}
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ Acknowledgements ═══════════════════ */}
      <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.04) 0%, transparent 55%)",
          }}
        />

        <div className="container relative">
          {/* Section header */}
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <p className="mb-5 font-sans text-gold/60 text-xs uppercase tracking-[0.4em]">
              Thank You
            </p>
            <h2 className="font-serif text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
              Acknow&shy;ledgements
            </h2>
            <div className="mx-auto mt-2 h-px w-16 bg-gold/20" />
            <p className="mx-auto mt-6 max-w-xl font-sans text-base text-white/45 leading-relaxed md:text-lg">
              We are grateful for the collective effort that made the GOLD
              Poetry Project possible.
            </p>
          </div>

          {/* Acknowledgement blocks */}
          <div className="mx-auto max-w-4xl space-y-16 md:space-y-20">
            {/* Poets */}
            <div className="group">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  01
                </span>
                <h3 className="font-serif text-2xl text-white leading-tight md:text-3xl">
                  Our GOLD <span className="text-gold italic">Poets</span>
                </h3>
              </div>
              <div className="mt-2 ml-8 h-px w-10 bg-gold/15" />
              <p className="mt-5 ml-8 max-w-2xl font-sans text-[15px] text-white/45 leading-relaxed md:text-base">
                Thank you for sharing your words, your stories, and your
                honesty. Your work reflects the many ways aging is lived and
                understood, and this project exists because of you. Whether or
                not your poem appears in this anthology, your enthusiasm to
                reflect, create, and contribute is what made this project
                meaningful.
              </p>
            </div>

            {/* Judges */}
            <div className="group">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  02
                </span>
                <h3 className="font-serif text-2xl text-white leading-tight md:text-3xl">
                  Our GOLD <span className="text-gold italic">Judges</span>
                </h3>
              </div>
              <div className="mt-2 ml-8 h-px w-10 bg-gold/15" />
              <p className="mt-5 ml-8 max-w-2xl font-sans text-[15px] text-white/45 leading-relaxed md:text-base">
                Thank you for the care, time, and thoughtfulness you brought to
                reviewing and selecting the poems for this anthology.
              </p>
            </div>

            {/* Community */}
            <div className="group">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  03
                </span>
                <h3 className="font-serif text-2xl text-white leading-tight md:text-3xl">
                  Our GOLD <span className="text-gold italic">Community</span>
                </h3>
              </div>
              <div className="mt-2 ml-8 h-px w-10 bg-gold/15" />
              <div className="mt-5 ml-8 max-w-3xl space-y-5 font-sans text-[15px] text-white/45 leading-relaxed md:text-base">
                <p>
                  Thank you to the organizations, groups, collectives, and
                  individuals who shared our poetry calls, amplified the voices
                  of older adults, and helped this project reach across
                  communities, disciplines, provinces, and territories across
                  Canada.
                </p>
                <p>
                  We are especially grateful to organizations committed to arts,
                  storytelling, justice, aging, and community-building, whose
                  values align with the spirit of the GOLD Poetry Project. Your
                  support affirmed that poetry is not only an art form, but a
                  method of connection, resistance, remembrance, and care.
                </p>
              </div>

              {/* Organization grid */}
              <div className="mt-10 ml-8 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-3 sm:grid-cols-2">
                {[
                  "The League of Canadian Poets",
                  "Darthmouth Seniors' Services Centre",
                  "Mill Woods Seniors Association",
                  "SageWell Association",
                  "Entente Education Canada (formerly RTOERO)",
                  "New Hope",
                  "Edmonton Seniors Coordinating Council",
                  "Ontario Poetry Society",
                  "Healthy Aging CORE BC",
                  "Caregivers Nova Scotia",
                  "Canadian Coalition for Seniors' Mental Health (CCSMH)",
                  "Aging Together As Community - Haliburton Highlands",
                  "Canadian Coalition Against Ageism (CCAA)",
                  "Tower Poetry Society",
                  "National Institute on Ageing (NIA)",
                  "St Albert Library",
                  "Canadian Network for the Prevention of Elder Abuse (CNPEA)",
                  "Aldershot News",
                  "Abuse (CNPEA)",
                  "Brokenhead Writer's Circle",
                  "ElderActive",
                  "Seniors Take Action Coalition of Richmond County",
                  "St. Elias Seniors and Elders Society (SESES)",
                  "Writers Guild of Alberta",
                  "Age Friendly Saskatchewan",
                  "Sooke Writers Collective",
                  "Superannuated Teachers of Saskatchewan",
                  "Stroll of Poets",
                  "Manitoba Possible",
                  "Saskatchewan Writer’s Guild",
                  "Intergenerational Longevity Centre Canada",
                  "Comox Valley Writers Society",
                  "Aging Well Nova Scotia",
                  "Burnaby Writers Society",
                  "Ukrainian-Canadian Cultural Society of Vancouver Island",
                  "Sudbury Writers' Guild",
                  "NorthWords NWT",
                  "Yukon Words Society",
                  "Inter-Cultural Association of Greater Victoria",
                ].map((org) => (
                  <p
                    key={org}
                    className="font-sans text-sm text-white/35 leading-relaxed transition-colors duration-200 hover:text-gold/60"
                  >
                    {org}
                  </p>
                ))}
              </div>
            </div>

            {/* Funders */}
            <div className="group">
              <div className="flex items-baseline gap-4">
                <span className="font-sans text-[10px] text-gold/30 uppercase tracking-[0.3em]">
                  04
                </span>
                <h3 className="font-serif text-2xl text-white leading-tight md:text-3xl">
                  Our GOLD <span className="text-gold italic">Funders</span>
                </h3>
              </div>
              <div className="mt-2 ml-8 h-px w-10 bg-gold/15" />
              <p className="mt-5 ml-8 max-w-2xl font-sans text-[15px] text-white/45 leading-relaxed md:text-base">
                We are grateful to the GLOCAL Foundation for supporting this
                work through the CANCONNECT Grant and for believing in the power
                of connection, storytelling, and community.
              </p>
              <div className="mt-8 ml-8">
                <Image
                  src={glocalLogo}
                  alt="Glocal logo"
                  width={140}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
