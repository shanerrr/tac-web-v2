"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import canadaMap from "../../../../public/canada.svg";

type Province = {
  name: string;
  x: number;
  y: number;
  count: number;
};

const provinces: Province[] = [
  { name: "British Columbia", x: 220, y: 1120, count: 60 },
  { name: "Alberta", x: 450, y: 1100, count: 58 },
  { name: "Saskatchewan", x: 650, y: 1200, count: 15 },
  { name: "Manitoba", x: 815, y: 1250, count: 22 },
  { name: "Ontario", x: 1100, y: 1300, count: 45 },
  { name: "Quebec", x: 1400, y: 1300, count: 34 },
  { name: "New Brunswick", x: 1650, y: 1300, count: 5 },
  { name: "Prince Edward Island", x: 1730, y: 1250, count: 6 },
  { name: "Nova Scotia", x: 1750, y: 1360, count: 12 },
  { name: "Newfoundland and Labrador", x: 1620, y: 1000, count: 5 },
  { name: "Yukon", x: 200, y: 600, count: 60 },
  { name: "Northwest Territories", x: 490, y: 740, count: 60 },
  { name: "Nunavut", x: 850, y: 800, count: 60 },
];

const SVG_W = 2000;
const SVG_H = 1650;
const MAX_COUNT = Math.max(...provinces.map((p) => p.count));

function dotRadius(count: number) {
  return 18 + (count / MAX_COUNT) * 30;
}

export default function ProvinceMap() {
  const [active, setActive] = useState<string | null>(null);

  const handleToggle = useCallback((name: string) => {
    setActive((prev) => (prev === name ? null : name));
  }, []);

  const handleClear = useCallback(() => setActive(null), []);

  const activeProv = active ? provinces.find((p) => p.name === active) : null;

  return (
    <div
      className="relative mx-auto w-full max-w-5xl select-none"
      onMouseLeave={handleClear}
    >
      <Image
        src={canadaMap}
        alt="Map of Canada"
        className="mx-auto w-full opacity-90"
        style={{
          filter:
            "invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(0.85)",
        }}
        draggable={false}
      />

      {/* Dot overlay — same viewBox as the SVG map */}
      <svg
        viewBox="0 0 2000 1650"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Poem submissions by province"
      >
        {provinces.map((prov) => {
          const r = dotRadius(prov.count);
          const isActive = active === prov.name;

          return (
            <g
              key={prov.name}
              className="cursor-pointer"
              onMouseEnter={() => setActive(prov.name)}
              onClick={() => handleToggle(prov.name)}
            >
              {/* Glow */}
              <circle
                cx={prov.x}
                cy={prov.y}
                r={r * 2.2}
                fill="rgba(201,168,76,0.06)"
                className="transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0.5,
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                  transformOrigin: `${prov.x}px ${prov.y}px`,
                }}
              />
              {/* Dot */}
              <circle
                cx={prov.x}
                cy={prov.y}
                r={r}
                fill="#C9A84C"
                className="transition-all duration-200"
                style={{
                  opacity: isActive ? 1 : 0.7,
                  transform: isActive ? "scale(1.12)" : "scale(1)",
                  transformOrigin: `${prov.x}px ${prov.y}px`,
                }}
              />
              {/* Count inside dot */}
              {r > 22 && (
                <text
                  x={prov.x}
                  y={prov.y + 8}
                  textAnchor="middle"
                  fill="#0A0A0A"
                  fontFamily="'Old Standard TT', serif"
                  fontWeight="bold"
                  fontSize="22"
                  className="pointer-events-none"
                >
                  {prov.count}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* DOM tooltip — renders at real pixel sizes */}
      {activeProv && (
        <div
          className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
          style={{
            left: `${(activeProv.x / SVG_W) * 100}%`,
            top: `${(activeProv.y / SVG_H) * 100 - 3}%`,
          }}
        >
          <div className="flex flex-col items-center">
            <div className="rounded-xl border border-gold/25 bg-[#1A1710] px-5 py-3 shadow-2xl shadow-black/50">
              <p className="text-center font-sans text-sm text-white/80 md:text-base">
                {activeProv.name}
              </p>
              <p className="text-center font-bold font-serif text-2xl text-gold md:text-3xl">
                {activeProv.count}{" "}
                <span className="font-normal font-sans text-white/40 text-xs md:text-sm">
                  poems
                </span>
              </p>
            </div>
            {/* Caret */}
            <div
              className="h-0 w-0"
              style={{
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid #1A1710",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
