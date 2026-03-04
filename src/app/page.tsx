import Navbar from "@tac/components/Navbar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import heroImage from "../../public/landingHero.svg";
import heroImagePeople from "../../public/landingHeroPeople.svg";

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
            <MoveRight className="h-6 w-6 sm:h-[34px] sm:w-[34px]" />
          </p>
        </div>
      </section>
      <section className="relative flex-4 md:flex-3">
        <Image
          src={heroImage}
          alt="hero image"
          sizes="100vw"
          className="object-cover object-center md:object-top"
          fill
          priority
        />
        {/* Layer A — normal direction, fades out after Layer B appears */}
        <div className="absolute inset-0 animate-people-a">
          <Image
            src={heroImagePeople}
            alt="people"
            sizes="100vw"
            className="object-cover object-center md:object-top"
            fill
          />
        </div>
        {/* Layer B — flipped direction, fades in while Layer A still showing */}
        <div
          className="absolute inset-0 animate-people-b"
          style={{ transform: "scaleX(-1)" }}
        >
          <Image
            src={heroImagePeople}
            alt="people"
            sizes="100vw"
            className="object-cover object-center md:object-top"
            fill
          />
        </div>
      </section>
    </div>
  );
}
