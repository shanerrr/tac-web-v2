import Navbar from "@tac/components/Navbar";
import StoriesFeed from "@tac/components/StoriesFeed";
import Image from "next/image";
import logo from "../../../public/logo-rings.svg";

export default function Stories() {
  return (
    <div className="min-h-dvh w-screen">
      <Navbar
        transparent
        textColour="text-white"
        burgerBgColour="bg-secondary/60"
        scrollThreshold={500}
      />

      {/* Hero */}
      <div className="heroTexture -mt-27 bg-secondary md:-mt-32">
        <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden pt-27 pb-27 text-center text-white md:pt-32 md:pb-32">
          {/* Radial vignette */}
          <div
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%)",
            }}
          />

          {/* Off-center logo-rings watermark */}
          <div
            className="pointer-events-none absolute animate-spin-slow select-none"
            aria-hidden="true"
            style={{
              width: "min(110vw, 110vh)",
              height: "min(110vw, 110vh)",
              bottom: "calc(min(110vw, 110vh) / -2)",
              right: "calc(min(110vw, 110vh) / -2)",
            }}
          >
            <Image
              src={logo}
              alt=""
              fill
              className="object-contain opacity-[0.08]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <p className="mb-6 font-sans text-sm text-white/60 uppercase tracking-[0.5em]">
              Storytelling
            </p>
            <h1 className="my-6 font-bold font-serif text-8xl leading-none tracking-tight sm:text-9xl lg:text-[11rem]">
              Stories
            </h1>
            <p className="font-light font-sans text-2xl sm:text-4xl">
              Read stories about aging from <br /> people across the lifespan
            </p>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
            <span className="font-sans text-white/60 text-xs uppercase tracking-[0.4em]">
              scroll
            </span>
            <div className="h-5 w-px bg-white/20" />
          </div>
        </section>
      </div>

      <StoriesFeed />
    </div>
  );
}
