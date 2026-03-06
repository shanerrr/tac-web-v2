import Navbar from "@tac/components/Navbar";
import PageHero from "@tac/components/PageHero";
import Image from "next/image";
import logo from "../../../../public/logo-rings.svg";

const exhibits = [
  {
    title: "The Mirror",
    description:
      "Participants confront a simple question written on a mirror: What does aging mean to you? Their handwritten answers are captured alongside their reflection.",
  },
  {
    title: "The Timeline",
    description:
      "A tactile, walk-through timeline where visitors place personal milestones along a shared path — revealing how aging weaves through every decade of life.",
  },
  {
    title: "The Letters",
    description:
      "Visitors write letters to their younger or older selves. Sealed and displayed, these letters become a living archive of hopes, regrets, and wisdom.",
  },
  {
    title: "The Listening Booth",
    description:
      "A private recording space where visitors share a 2-minute story about aging. These audio portraits are woven into the exhibit's evolving soundscape.",
  },
];

export default function MyAgingStory() {
  return (
    <div className="min-h-dvh w-full">
      <Navbar
        transparent
        textColor="text-white"
        burgerBgColor="bg-primary/60"
        scrollThreshold={200}
      />
      <PageHero
        accentLabel="Exhibit"
        title="My Aging Story"
        subtitle={
          <>
            An interactive exhibit exploring <br /> personal aging narratives
          </>
        }
        bgClass="bg-primary"
        watermarkRight="calc(min(110vw, 110vh) / 2)"
      />

      {/* ─── About the Exhibit ─── */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            About the Exhibit
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            What happens when we{" "}
            <span className="text-primary italic">stop</span> and listen?
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          <p className="mt-8 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            My Aging Story is an immersive, travelling exhibit that invites
            people of all ages to engage with aging through storytelling,
            reflection, and shared experience. Part art installation, part
            community dialogue — it creates a space where personal narratives
            become the catalyst for deeper understanding.
          </p>
        </div>
      </section>

      {/* ─── Photo Mosaic ─── */}
      <section className="relative">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="relative aspect-square overflow-hidden bg-primary/[0.06]"
            >
              <div className="absolute inset-0 flex items-center justify-center font-sans text-primary/30 text-sm italic">
                Exhibit Photo {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Floating overlay text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto rounded-2xl bg-white/90 px-10 py-8 text-center shadow-xl backdrop-blur-sm md:px-16 md:py-12">
            <p className="font-sans text-primary text-xs uppercase tracking-[0.4em]">
              Interactive
            </p>
            <h3 className="mt-2 font-serif text-2xl text-foreground md:text-4xl">
              Stories told by{" "}
              <span className="text-primary italic">real people.</span>
            </h3>
          </div>
        </div>
      </section>

      {/* ─── Statement ─── */}
      <section className="container py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="mb-4 font-sans text-tertiary text-xs uppercase tracking-[0.4em]">
                The Experience
              </p>
              <h2 className="font-serif text-3xl text-foreground leading-tight md:text-4xl">
                A space for{" "}
                <span className="text-tertiary italic">every age</span> to be
                heard.
              </h2>
              <div className="mt-2 h-px w-16 bg-tertiary/30" />
            </div>
            <div className="space-y-5 font-sans text-foreground/70 text-lg leading-relaxed">
              <p>
                The exhibit is designed to be intergenerational. A teenager and
                their grandmother can walk through side by side, each
                encountering prompts and installations that speak to their own
                relationship with time, change, and identity.
              </p>
              <p>
                There are no right answers. Only honest ones. And in that
                honesty, something remarkable happens — strangers find common
                ground, and families discover conversations they never knew they
                needed to have.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Exhibit Stations ─── */}
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
            {exhibits.map((exhibit, i) => (
              <div
                key={exhibit.title}
                className="group flex flex-col rounded-2xl border border-tertiary/25 bg-white px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="font-sans text-[10px] text-primary/40 uppercase tracking-[0.3em]">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-serif text-foreground text-xl leading-tight md:text-2xl">
                  {exhibit.title}
                </h3>
                <div className="mt-2 h-px w-8 bg-primary/20 transition-all duration-300 group-hover:w-12 group-hover:bg-primary/40" />
                <p className="mt-4 font-sans text-foreground/60 text-sm leading-relaxed">
                  {exhibit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Feature Section ─── */}
      <section className="container py-24 md:py-32">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl shadow-xl">
          {/* Background — replace with exhibit photo */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-tertiary/15 to-secondary/20" />
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative px-8 py-20 text-center text-white md:px-16 md:py-32">
            <div className="mx-auto flex w-fit items-center justify-center rounded-2xl bg-tertiary p-5">
              <Image
                src={logo}
                alt="The Age Collective"
                width={52}
                height={52}
                className="animate-spin-slow"
              />
            </div>
            <h2 className="mt-8 font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
              Every wrinkle tells a story.
              <br />
              <span className="italic">Every story matters.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl font-sans text-lg text-white/80 leading-relaxed">
              My Aging Story has been experienced by over 2,000 visitors across
              community centres, universities, and festivals. Each installation
              leaves behind a growing archive of voices — proof that when we
              listen, we learn.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Bring the Exhibit ─── */}
      <section className="container pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-sans text-primary text-xs uppercase tracking-[0.4em]">
            Touring
          </p>
          <h2 className="font-serif text-4xl text-foreground leading-[1.15] md:text-5xl lg:text-6xl">
            Bring the exhibit{" "}
            <span className="text-primary italic">to&nbsp;you.</span>
          </h2>
          <div className="mx-auto mt-2 h-px w-16 bg-primary/30" />
          <p className="mt-8 font-sans text-foreground/70 text-lg leading-relaxed md:text-xl">
            My Aging Story is designed to travel. Whether you&rsquo;re a
            university, community organization, healthcare facility, or cultural
            institution — we&rsquo;d love to partner with you to bring these
            stories to your community.
          </p>
          <a
            href="mailto:hello@theagecollective.ca"
            className="mt-10 inline-flex items-center gap-3 rounded-xl border border-primary bg-primary px-8 py-4 font-sans text-sm text-white uppercase tracking-[0.2em] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* ─── Bottom Photo Row ─── */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden bg-primary/[0.06]"
            >
              <div className="absolute inset-0 flex items-center justify-center font-sans text-primary/30 text-sm italic">
                Exhibit Photo {i + 9}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
