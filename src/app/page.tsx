import Navbar from "@tac/components/Navbar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import heroImage from "../../public/landingHero.png";
import people from "../../public/landingHeroPeople.png";
import peopleLayer from "../../public/landingHeroPeopleLayer.png";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-screen flex-col overflow-hidden">
      <Navbar />
      <section className="flex flex-2 items-end justify-center text-center tracking-[-4px] md:flex-2 md:items-center">
        <div className="font-serif text-5xl sm:text-6xl md:pt-10 md:text-6xl lg:text-7xl">
          <h1 className="italic">We're all aging. </h1>
          <h2 className="font-bold">Let's talk about it.</h2>
          <p className="flex items-center justify-center gap-3 pt-4 font-extralight font-sans text-primary text-xl italic tracking-[-2px] sm:text-2xl md:text-3xl lg:text-4xl">
            Click to learn more.
            <MoveRight className="h-6 w-6 sm:h-8.5 sm:w-8.5" />
          </p>
        </div>
      </section>
      <section className="relative flex-4 md:flex-3">
        <Image
          src={heroImage}
          alt="hero image"
          sizes="100vw"
          className="object-cover object-center md:object-[25%_15%]"
          fill
          priority
        />
        {/* Layer A — normal directions */}
        <div className="absolute inset-0 animate-people-a">
          <Image
            src={people}
            alt="people"
            sizes="100vw"
            className="object-cover object-center md:object-[25%_15%]"
            fill
          />
        </div>
        {/* Layer B — flipped directiong */}
        <div
          className="absolute inset-0 animate-people-b"
          style={{ transform: "scaleX(-1)" }}
        >
          <Image
            src={peopleLayer}
            alt="people"
            sizes="100vw"
            className="object-cover object-center md:object-[25%_15%]"
            fill
          />
        </div>
      </section>
    </div>
  );
}
