import Navbar from "@tac/components/Navbar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import heroImage from "../../public/landingHero.png";
import people from "../../public/landingHeroPeople.png";
import peopleLayer from "../../public/landingHeroPeopleLayer.png";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Navbar />

      <section className="relative flex flex-2 items-end justify-center text-center tracking-[-4px] md:flex-2 md:items-center">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 animate-hero-glow rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative font-serif text-5xl sm:text-6xl md:pt-10 lg:text-7xl">
          <h1 className="flex flex-col">
            <span
              className="animate-hero-fade-up italic"
              style={{ animationDelay: "400ms" }}
            >
              We're all aging.{" "}
            </span>
            <span
              className="animate-hero-fade-up font-bold"
              style={{ animationDelay: "700ms" }}
            >
              Let's talk about it.
            </span>
          </h1>
          <Link
            href="/about"
            className="group inline-flex animate-hero-fade-up items-center justify-center gap-3 pt-4 font-extralight font-sans text-primary text-xl italic tracking-[-2px] transition-colors duration-300 hover:text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
            style={{ animationDelay: "1100ms" }}
          >
            Click to learn more.
            <MoveRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1 sm:h-8.5 sm:w-8.5" />
          </Link>
        </div>
      </section>

      <section
        className="relative flex-4 animate-hero-image-enter md:flex-3"
        style={{ animationDelay: "600ms" }}
      >
        {/* Ken Burns drift container */}
        <div className="absolute inset-0 animate-hero-ken-burns">
          <Image
            src={heroImage}
            alt="A collage of people of all ages sharing their stories about aging"
            sizes="100vw"
            className="object-cover object-center md:object-[25%_15%]"
            fill
            priority
          />
          {/* Layer A — normal directions */}
          <div className="absolute inset-0 animate-people-a">
            <Image
              src={people}
              alt=""
              sizes="100vw"
              className="object-cover object-center md:object-[25%_15%]"
              fill
            />
          </div>
          {/* Layer B — flipped direction */}
          <div
            className="absolute inset-0 animate-people-b"
            style={{ transform: "scaleX(-1)" }}
          >
            <Image
              src={peopleLayer}
              alt=""
              sizes="100vw"
              className="object-cover object-center md:object-[25%_15%]"
              fill
            />
          </div>
        </div>
      </section>
    </div>
  );
}
