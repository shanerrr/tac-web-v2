import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import Image from "next/image";
import logo from "../../../public/logo-rings.svg";

const values = [
  {
    title: "Dignity",
    description:
      "Every person's experience of aging deserves to be heard, honoured, and shared without reduction or stereotype.",
  },
  {
    title: "Connection",
    description:
      "We believe intergenerational dialogue bridges divides and reveals the common threads of human experience.",
  },
  {
    title: "Authenticity",
    description:
      "We amplify real voices and unscripted stories — no filters, no formulas, just honest reflection.",
  },
  {
    title: "Advocacy",
    description:
      "Storytelling is a tool for social change. We use it to challenge ageism and reshape cultural narratives.",
  },
];

export default async function About() {
  return (
    <div className="min-h-dvh w-screen">
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
          <p className="mt-8 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            The Age Collective is a storytelling initiative dedicated to
            challenging ageism through the power of personal narrative. We
            collect and share stories from people of all ages — honouring the
            full spectrum of what it means to grow older in a world that too
            often overlooks the wisdom, complexity, and beauty of aging.
          </p>
        </div>
      </section>

      {/* ─── Photo Collage ─── */}
      <section className="container pb-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-tertiary/20 md:col-span-1 md:row-span-2 md:aspect-auto">
            {/* Replace src with your image */}
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/60 italic">
              Photo 1
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary/15">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/50 italic">
              Photo 2
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary/10">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/50 italic">
              Photo 3
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary/10">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/50 italic">
              Photo 4
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tertiary/20">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/60 italic">
              Photo 5
            </div>
          </div>
        </div>
      </section>

      {/* ─── Changing the Narrative ─── */}
      <section className="relative overflow-hidden bg-tertiary/[0.07] py-24 md:py-32">
        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: "min(80vw, 80vh)",
            height: "min(80vw, 80vh)",
            top: "calc(min(80vw, 80vh) / -3)",
            right: "calc(min(80vw, 80vh) / -3)",
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
                Through written stories, short films, interactive exhibits, and
                community partnerships, we create spaces where people can
                reflect on aging honestly — and see themselves reflected in
                return.
              </p>
              <p className="mt-5 font-sans text-foreground/70 text-lg leading-relaxed">
                We don&rsquo;t shy away from the hard parts. Loss, loneliness,
                and change are part of the story. But so are resilience, joy,
                and the quiet power of a life lived fully.
              </p>
            </div>

            {/* Side photo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-tertiary/15 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center font-sans text-tertiary/50 italic">
                Feature Photo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
      <section>
        {/* Wavy top edge */}
        <div className="text-tertiary">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            preserveAspectRatio="none"
            className="block h-12 w-full md:h-20"
          >
            <path
              d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="heroTexture relative overflow-hidden bg-tertiary py-20 text-white md:py-28">
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
              className="object-contain opacity-[0.06]"
            />
          </div>

          <div className="container relative">
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

            <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-8">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-8 backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.12]"
                >
                  <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.3em]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl leading-none md:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm text-white/70 leading-relaxed md:text-base">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wavy bottom edge */}
        <div className="text-tertiary">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            preserveAspectRatio="none"
            className="block h-12 w-full rotate-180 md:h-20"
          >
            <path
              d="M0 80V40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ─── Why We Are ─── */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="lg:sticky lg:top-32">
            <p className="mb-4 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
              Origin
            </p>
            <h2 className="font-serif text-4xl text-foreground leading-tight md:text-5xl">
              Why <span className="text-tertiary italic">We Are</span>
            </h2>
            <div className="mt-2 h-px w-16 bg-tertiary/30" />
          </div>

          <div className="space-y-6 font-sans text-foreground/70 text-lg leading-relaxed">
            <p>
              The Age Collective began with a simple observation: the stories we
              tell about aging are incomplete. Media, advertising, and even
              well-meaning health campaigns often reduce older adults to
              stereotypes — frail, out of touch, or in need of saving.
            </p>
            <p>
              Meanwhile, younger people rarely see aging as something that
              concerns them. The result is a cultural blind spot — a failure to
              see aging as the universal, deeply personal experience that it is.
            </p>
            <blockquote className="border-tertiary/50 border-l-2 pl-6 font-serif text-foreground/50 text-xl italic leading-relaxed md:text-2xl">
              We started collecting stories because we believed that if people
              could hear each other — really hear each other — something would
              shift.
            </blockquote>
            <p>
              What began as a small collection of written narratives has grown
              into a multi-platform initiative spanning films, exhibits, poetry,
              and community dialogue. Every story we share is a step toward a
              culture that embraces aging rather than fearing it.
            </p>
            <p>
              We are researchers, filmmakers, writers, and advocates. But above
              all, we are listeners. And we believe the best way to fight ageism
              is to let people speak for themselves.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Second Photo Row ─── */}
      <section className="container pb-24 md:pb-32">
        <div className="grid grid-cols-3 gap-3 md:gap-5">
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-tertiary/15">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/50 italic">
              Photo 6
            </div>
          </div>
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-tertiary/20">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/60 italic">
              Photo 7
            </div>
          </div>
          <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-tertiary/10">
            <div className="absolute inset-0 flex items-center justify-center font-sans text-sm text-tertiary/50 italic">
              Photo 8
            </div>
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
