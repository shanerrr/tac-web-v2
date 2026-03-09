import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import logo from "../../../public/logo-rings.svg";

type PageHeroProps = {
  accentLabel: string;
  title: string;
  subtitle: ReactNode;
  bgClass: string;
  /** CSS `right` value for the watermark. Defaults to off-screen right. */
  watermarkRight?: string;
  /** Full viewport height instead of 70vh. */
  fullHeight?: boolean;
  /** Disable the heroTexture background pattern. */
  noTexture?: boolean;
  /** Extra CSS classes applied to the h1 title. */
  titleClassName?: string;
  /** Inline styles applied to the h1 title (e.g. gradient background). */
  titleStyle?: CSSProperties;
  /** Extra CSS classes applied to the subtitle paragraph. */
  subtitleClassName?: string;
  /** CSS class for the accent label color. Default: "text-white/60". */
  accentLabelClassName?: string;
  /** CSS class for the scroll-cue text color. Default: "text-white/60". */
  scrollCueClassName?: string;
  /** CSS class for the scroll-cue line color. Default: "bg-white/20". */
  scrollLineClassName?: string;
  /** CSS background value for an extra ambient glow overlay. */
  glowOverlay?: string;
  /** Override the vignette background. */
  vignetteOverlay?: string;
  /** Watermark opacity class. Default: "opacity-[0.08]". */
  watermarkOpacity?: string;
};

export default function PageHero({
  accentLabel,
  title,
  subtitle,
  bgClass,
  watermarkRight = "calc(min(110vw, 110vh) / -2)",
  fullHeight = false,
  noTexture = false,
  titleClassName,
  titleStyle,
  subtitleClassName,
  accentLabelClassName = "text-white/60",
  scrollCueClassName = "text-white/60",
  scrollLineClassName = "bg-white/20",
  glowOverlay,
  vignetteOverlay = "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.18) 100%)",
  watermarkOpacity = "opacity-[0.08]",
}: PageHeroProps) {
  const size = "min(110vw, 110vh)";

  return (
    <div
      className={`-mt-27 ${bgClass} md:-mt-32 ${noTexture ? "" : "heroTexture"}`}
    >
      <section
        className={`relative flex flex-col items-center justify-center overflow-hidden pt-27 pb-27 text-center text-white md:pt-32 md:pb-32 ${fullHeight ? "min-h-dvh" : "min-h-[70vh]"}`}
      >
        {/* Ambient glow overlay */}
        {glowOverlay && (
          <div
            className="pointer-events-none absolute inset-0 select-none"
            aria-hidden="true"
            style={{ background: glowOverlay }}
          />
        )}

        {/* Radial vignette */}
        <div
          className="pointer-events-none absolute inset-0 select-none"
          aria-hidden="true"
          style={{ background: vignetteOverlay }}
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
            className={`object-contain ${watermarkOpacity}`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <p
            className={`mb-6 font-sans text-sm uppercase tracking-[0.5em] ${accentLabelClassName}`}
          >
            {accentLabel}
          </p>
          <h1
            className={`my-6 font-bold font-serif text-8xl leading-none tracking-tight sm:text-9xl lg:text-[11rem] ${titleClassName ?? ""}`}
            style={titleStyle}
          >
            {title}
          </h1>
          <p
            className={`font-light font-sans text-2xl sm:text-4xl ${subtitleClassName ?? ""}`}
          >
            {subtitle}
          </p>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2">
          <span
            className={`font-sans text-xs uppercase tracking-[0.4em] ${scrollCueClassName}`}
          >
            scroll
          </span>
          <div className={`h-5 w-px ${scrollLineClassName}`} />
        </div>
      </section>
    </div>
  );
}
