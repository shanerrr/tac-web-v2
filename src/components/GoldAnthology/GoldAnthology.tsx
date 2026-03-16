"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function GoldAnthology({ coverUrl }: { coverUrl: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = [
        ".gs-book",
        ".gs-accent",
        ".gs-heading",
        ".gs-divider",
        ".gs-body",
        ".gs-cta",
      ];
      const mm = gsap.matchMedia();

      // Reduced motion: show everything immediately, no animations
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(targets, { opacity: 1, y: 0, scale: 1, rotate: 0, scaleX: 1 });
      });

      mm.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          gsap.set(targets, { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.8,
            },
          });

          tl.fromTo(
            ".gs-book",
            { y: 120, opacity: 0, scale: 0.9, rotate: -6 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotate: -3,
              duration: 0.5,
              ease: "power2.out",
            },
          )
            .fromTo(
              ".gs-accent",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
              0.25,
            )
            .fromTo(
              ".gs-heading",
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
              0.35,
            )
            .fromTo(
              ".gs-divider",
              { scaleX: 0 },
              { scaleX: 1, duration: 0.25, ease: "power2.out" },
              0.4,
            )
            .fromTo(
              ".gs-body",
              { y: 25, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
              0.45,
            )
            .fromTo(
              ".gs-cta",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
              0.55,
            );
        },
      );

      // Mobile: no pinning, simple fade-in on enter
      mm.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          gsap.set(targets, { opacity: 0 });

          gsap.fromTo(
            ".gs-book",
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
              },
            },
          );

          gsap.fromTo(
            [".gs-accent", ".gs-heading", ".gs-divider", ".gs-body", ".gs-cta"],
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
              },
            },
          );
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-dvh items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="container relative flex min-h-dvh items-center py-24 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-16 md:flex-row lg:gap-24">
          {/* Cover image */}
          <div className="gs-book relative w-72 shrink-0 md:w-88 lg:w-[26rem]">
            {/* Ambient glow behind book */}
            <div className="absolute -inset-6 rounded-3xl bg-gold/10 blur-3xl" />
            <div
              className="relative aspect-3/4 overflow-hidden rounded-xl shadow-2xl shadow-black/60 ring-1 ring-gold/20 transition-transform duration-500 hover:rotate-0 hover:scale-105"
              style={{ transform: "rotate(-3deg)" }}
            >
              <Image
                src={coverUrl}
                alt="GOLD anthology cover"
                fill
                sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 224px"
                className="object-cover"
              />
              {/* Subtle sheen overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
                }}
              />
            </div>
          </div>

          {/* Text + CTA */}
          <div className="text-center md:text-left">
            <p className="gs-accent mb-5 font-sans text-gold text-xs uppercase tracking-[0.4em]">
              The Anthology
            </p>
            <h2 className="gs-heading font-serif text-3xl text-white leading-tight md:text-4xl lg:text-5xl">
              Read the <span className="text-gold italic">collection.</span>
            </h2>
            <div className="gs-divider mx-auto mt-2 h-px w-16 origin-left bg-gold/20 md:mx-0" />
            <p className="gs-body mt-6 font-sans text-base text-white/70 leading-relaxed md:text-lg">
              The GOLD anthology spotlights powerful poems that illuminate the
              layered and lived realities of growing older.
            </p>
            <a
              target="_blank"
              rel="noreferrer"
              href="/GOLD-Digital-Anthology.pdf"
              className="gs-cta mt-8 inline-flex items-center gap-3 rounded-xl border border-gold/20 bg-gold/10 px-8 py-4 font-sans text-gold text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:border-gold/40 hover:bg-gold/15 hover:shadow-gold/5 hover:shadow-lg"
            >
              Read the Anthology
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
