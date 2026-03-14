"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = { value: number; label: string };

const R = 46;
const CIRCUMFERENCE = 2 * Math.PI * R;

function StatRing({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-36 w-36 -rotate-90 sm:h-40 sm:w-40 md:h-44 md:w-44"
      aria-hidden="true"
    >
      {/* Background ring */}
      <circle
        cx="50"
        cy="50"
        r={R}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="text-white/10"
      />
      {/* Progress ring — starts fully hidden, GSAP draws it in */}
      <circle
        cx="50"
        cy="50"
        r={R}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        className={`is-ring-${index} text-white`}
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={CIRCUMFERENCE}
        strokeLinecap="round"
      />
      {/* Inner decorative ring */}
      <circle
        cx="50"
        cy="50"
        r={R - 8}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-white/8"
      />
    </svg>
  );
}

export default function ImpactStats({ stats }: { stats: Stat[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Reduced motion: show final state immediately
      mm.add("(prefers-reduced-motion: reduce)", () => {
        stats.forEach((stat, i) => {
          gsap.set(`.is-ring-${i}`, {
            strokeDashoffset: CIRCUMFERENCE * (1 - stat.value / 100),
          });
        });
        gsap.set(".is-stat-card", { opacity: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Start state
        gsap.set(".is-stat-card", { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });

        // Fade up each stat card with stagger
        tl.to(".is-stat-card", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        });

        // Animate each ring drawing in
        stats.forEach((stat, i) => {
          const targetOffset = CIRCUMFERENCE * (1 - stat.value / 100);
          tl.to(
            `.is-ring-${i}`,
            {
              strokeDashoffset: targetOffset,
              duration: 1.2,
              ease: "power2.out",
            },
            i * 0.15,
          );
        });

        // Animate numbers counting up (using proxy objects)
        stats.forEach((stat, i) => {
          const proxy = { val: 0 };
          const numEl = containerRef.current?.querySelector(`.is-num-${i}`);
          if (!numEl) return;

          tl.to(
            proxy,
            {
              val: stat.value,
              duration: 1.4,
              ease: "power2.out",
              onUpdate: () => {
                numEl.textContent = `${Math.round(proxy.val)}`;
              },
            },
            i * 0.15,
          );
        });
      });
    },
    { scope: containerRef, dependencies: [stats] },
  );

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8"
    >
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="is-stat-card flex flex-col items-center text-center"
        >
          {/* Ring + number */}
          <div className="relative flex items-center justify-center">
            <StatRing index={i} />
            <span className="absolute font-serif text-4xl leading-none tracking-tight sm:text-4xl md:text-5xl">
              <span className={`is-num-${i}`}>0</span>
              <span className="text-2xl md:text-3xl">%</span>
            </span>
          </div>
          <p className="mt-5 max-w-[16rem] font-sans text-sm text-white/70 leading-relaxed md:text-base">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
