import Image from "next/image";
import type { ReactNode } from "react";
import logo from "../../../public/logo-rings.svg";

type PageHeroProps = {
  accentLabel: string;
  title: string;
  subtitle: ReactNode;
  bgClass: string;
  /** CSS `right` value for the watermark. Defaults to off-screen right. */
  watermarkRight?: string;
};

export default function PageHero({
  accentLabel,
  title,
  subtitle,
  bgClass,
  watermarkRight = "calc(min(110vw, 110vh) / -2)",
}: PageHeroProps) {
  const size = "min(110vw, 110vh)";

  return (
    <div className={`heroTexture -mt-27 ${bgClass} md:-mt-32`}>
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

        {/* Watermark */}
        <div
          className="pointer-events-none absolute animate-spin-slow select-none"
          aria-hidden="true"
          style={{
            width: size,
            height: size,
            bottom: `calc(${size} / -2)`,
            right: watermarkRight,
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
            {accentLabel}
          </p>
          <h1 className="my-6 font-bold font-serif text-8xl leading-none tracking-tight sm:text-9xl lg:text-[11rem]">
            {title}
          </h1>
          <p className="font-light font-sans text-2xl sm:text-4xl">
            {subtitle}
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
  );
}
