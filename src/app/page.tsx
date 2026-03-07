import Navbar from "@tac/components/Navbar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import heroImage from "../../public/landingHero.png";
import people from "../../public/landingHeroPeople.png";
import peopleLayer from "../../public/landingHeroPeopleLayer.png";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full flex-col overflow-hidden">
      <Navbar />
      <section className="flex flex-2 items-end justify-center text-center tracking-[-4px] md:flex-2 md:items-center">
        <div className="font-serif text-5xl sm:text-6xl md:pt-10 lg:text-7xl">
          <h1 className="flex flex-col">
            <span className="italic">We're all aging. </span>
            <span className="font-bold">Let's talk about it.</span>
          </h1>
          <p className="flex items-center justify-center gap-3 pt-4 font-extralight font-sans text-primary text-xl italic tracking-[-2px] sm:text-2xl md:text-3xl lg:text-4xl">
            Click to learn more.
            <MoveRight className="h-6 w-6 sm:h-8.5 sm:w-8.5" />
          </p>
        </div>
      </section>
      <section className="relative flex-4 md:flex-3">
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
      </section>
    </div>
  );
}
