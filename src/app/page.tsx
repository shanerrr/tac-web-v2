import Navbar from "@tac/components/Navbar";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import heroImage from "../../public/landingHero.svg";

export default function Home() {
  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden">
      <Navbar />
      <section className="flex items-center justify-center text-center tracking-tight md:tracking-[-2px] lg:tracking-[-3px]">
        <div className="pt-10 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          <h1 className="italic">We’re all aging. </h1>
          <h2 className="font-bold">Let’s talk about it.</h2>
          <p className="flex items-center justify-center gap-3 py-4 font-extralight font-sans text-primary text-xl italic tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl">
            Click to learn more.
            <MoveRight size={24} className="sm:hidden" />
            <MoveRight size={34} className="hidden sm:block" />
          </p>
        </div>
      </section>
      <section className="relative grow">
        <Image
          src={heroImage}
          alt="hero image"
          sizes="100vw"
          style={{ objectFit: "cover", transform: "scale(1.05)" }}
          fill
        />
      </section>
    </div>
  );
}
