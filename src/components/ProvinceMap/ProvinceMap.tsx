"use client";

import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import canadaMap from "../../../public/canada.svg";

type Province = {
  name: string;
  x: number;
  y: number;
  count: number;
  cities: string[];
};

const provinces: Province[] = [
  {
    name: "British Columbia",
    x: 220,
    y: 1120,
    count: 60,
    cities: [
      "Cranbrook",
      "Sidney",
      "Quesnel",
      "Parksville",
      "New Westminster",
      "Vancouver",
      "Terrace",
      "Burnaby",
      "Salt Spring Island",
      "Hornby Island",
      "White Rock",
      "Ucluelet",
      "Pender Island",
      "Victoria",
      "Galiano Island",
      "Peachland",
      "Langley",
      "Comox",
      "Coquitlam",
      "Chemainus",
      "Sooke",
      "Nanaimo",
      "Kelowna",
      "Invermere",
      "Fernie",
      "Slocan",
      "Sicamous",
    ],
  },
  {
    name: "Alberta",
    x: 450,
    y: 1100,
    count: 35,
    cities: [
      "Calgary",
      "Canmore",
      "Edmonton",
      "Okotoks",
      "Parkland County",
      "Lethbridge",
      "Priddis Greens",
      "St. Albert",
      "Stony Plain",
      "Spruce Grove",
      "Bonnyville",
      "Medicine Hat",
    ],
  },
  {
    name: "Saskatchewan",
    x: 650,
    y: 1200,
    count: 10,
    cities: ["Regina", "Saskatoon", "Beechy", "Prince Albert"],
  },
  {
    name: "Manitoba",
    x: 815,
    y: 1250,
    count: 12,
    cities: ["Winnipeg", "Beausejour", "Brokenhead", "Neepawa"],
  },
  {
    name: "Ontario",
    x: 1100,
    y: 1300,
    count: 161,
    cities: [
      "Eganville",
      "Caledonia",
      "Sarnia",
      "Dundas",
      "Barrie",
      "Etobicoke",
      "Brockville",
      "Toronto",
      "Havelock",
      "Amherstview",
      "Beeton",
      "Keswick",
      "Oshawa",
      "Hamilton",
      "Stouffville",
      "London",
      "Peterborough",
      "Caledon",
      "North Bay",
      "Waterloo",
      "Vaughan",
      "Eagle Lake",
      "Ohsweken",
      "Kenora",
      "North York",
      "Ottawa",
      "Collingwood",
      "Everett",
      "Aurora",
      "Mississauga",
      "Clinton",
      "Edwards",
      "Oakville",
      "Birch Island",
      "Niagara Falls",
      "Stoney Creek",
      "Mount Forest",
      "West Guilford",
      "Burlington",
      "Port Dover",
      "Kingston",
      "Deep River",
      "Sharbot Lake",
      "Owen Sound",
      "Uxbridge",
      "Bradford",
      "Pickering",
      "Scarborough",
      "Hanover",
      "Whitby",
      "Trenton",
      "Westport",
      "Kitchener",
      "Windsor",
      "Kanata",
      "Stittsville",
      "Thunder Bay",
      "Almonte",
      "Renfrew",
      "Stratford",
      "Gananoque",
      "Cambridge",
      "Naughton",
      "Tiny Township",
      "Shuniah",
    ],
  },
  {
    name: "Quebec",
    x: 1400,
    y: 1300,
    count: 4,
    cities: ["Lac- Supérieur", "Montreal", "Lévis", "Saint-Sylvestre"],
  },
  {
    name: "New Brunswick",
    x: 1650,
    y: 1300,
    count: 5,
    cities: ["Fredericton", "Woodstock", "Moncton"],
  },
  {
    name: "Prince Edward Island",
    x: 1730,
    y: 1250,
    count: 5,
    cities: ["Foxley River", "Meadbank", "Ebenezer"],
  },
  {
    name: "Nova Scotia",
    x: 1750,
    y: 1360,
    count: 15,
    cities: [
      "Hammonds Plains",
      "Tatamagouche",
      "Gulf Shore",
      "Clarence",
      "Halifax",
      "Hamlet of Greenwich (Kings County)",
      "Bedford",
      "Sydney",
      "Greenwich",
      "Musquodoboit Harbour",
      "Gabarus Lake",
      "Sambro Head",
      "Wolfville",
    ],
  },
  {
    name: "Newfoundland and Labrador",
    x: 1620,
    y: 1000,
    count: 5,
    cities: ["St. John’s", "Pasadena", "Charlottetown"],
  },
  {
    name: "Yukon",
    x: 200,
    y: 600,
    count: 4,
    cities: ["Whitehorse", "Dawson City"],
  },
  {
    name: "Northwest Territories",
    x: 490,
    y: 740,
    count: 3,
    cities: ["Hay River", "Inuvik"],
  },
];

const SVG_W = 2000;
const SVG_H = 1650;
const MAX_COUNT = Math.max(...provinces.map((p) => p.count));

function dotRadius(count: number) {
  return 18 + (count / MAX_COUNT) * 30;
}

export default function ProvinceMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [drawerProv, setDrawerProv] = useState<Province | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleClear = useCallback(() => setHovered(null), []);

  const handleDotClick = useCallback((prov: Province) => {
    navigator.vibrate?.(12);
    setDrawerProv(prov);
  }, []);

  const closeDrawer = useCallback(() => {
    navigator.vibrate?.(6);
    setDrawerProv(null);
  }, []);

  // Lock body scroll & close on Escape when drawer is open
  useEffect(() => {
    if (!drawerProv) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerProv(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerProv]);

  const hoveredProv = hovered
    ? provinces.find((p) => p.name === hovered)
    : null;

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-5xl select-none"
        onMouseLeave={handleClear}
      >
        {/* Map image with shimmer on outlines */}
        <div className="relative">
          <Image
            src={canadaMap}
            alt="Map of Canada"
            className="mx-auto w-full"
            style={{
              filter: "brightness(0.15)",
            }}
            draggable={false}
          />
          {/* Shimmer masked to map shape */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(201,168,76,0.12) 50%, transparent 60%, transparent 100%)",
              backgroundSize: "200% 100%",
              WebkitMaskImage: `url(${canadaMap.src})`,
              maskImage: `url(${canadaMap.src})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Dot overlay — same viewBox as the SVG map */}
        <svg
          viewBox="0 0 2000 1650"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-label="Poem submissions by province"
        >
          {provinces.map((prov) => {
            const r = dotRadius(prov.count);
            const isHovered = hovered === prov.name;

            return (
              <g
                key={prov.name}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${prov.name}: ${prov.count} poems. Click to view locations.`}
                onMouseEnter={() => setHovered(prov.name)}
                onFocus={() => setHovered(prov.name)}
                onBlur={() => setHovered(null)}
                onClick={() => handleDotClick(prov)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleDotClick(prov);
                  }
                }}
              >
                {/* Glow */}
                <circle
                  cx={prov.x}
                  cy={prov.y}
                  r={r * 2.2}
                  fill="rgba(201,168,76,0.1)"
                  className="transition-all duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0.6,
                    transform: isHovered ? "scale(1.15)" : "scale(1)",
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
                    opacity: isHovered ? 1 : 0.9,
                    transform: isHovered ? "scale(1.12)" : "scale(1)",
                    transformOrigin: `${prov.x}px ${prov.y}px`,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* DOM tooltip */}
        {hoveredProv && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hoveredProv.x / SVG_W) * 100}%`,
              top: `${(hoveredProv.y / SVG_H) * 100 - 3}%`,
            }}
          >
            <div className="flex flex-col items-center">
              <div className="min-w-40 rounded-xl border border-gold/25 bg-[#1A1710] px-5 py-3 shadow-2xl shadow-black/50">
                <p className="mb-1 text-center font-sans text-sm text-white/80 md:text-base">
                  {hoveredProv.name}
                </p>
                <p className="text-center font-bold font-serif text-2xl text-gold md:text-3xl">
                  {hoveredProv.count}{" "}
                  <span className="font-normal font-sans text-white/70 text-xs md:text-sm">
                    poems
                  </span>
                </p>
                <p className="mt-1.5 text-center font-sans text-gold/50 text-xs uppercase tracking-[0.15em]">
                  Click to view locations
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

      {/* ═══════════ Locations Drawer (portalled to body to escape ScrollReveal transform) ═══════════ */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                drawerProv
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label={
                drawerProv ? `Locations in ${drawerProv.name}` : undefined
              }
              className={`fixed inset-x-0 bottom-0 z-50 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-[#0F0D08] shadow-2xl transition-transform duration-500 ease-out ${
                drawerProv ? "translate-y-0" : "translate-y-full"
              }`}
            >
              {drawerProv && (
                <>
                  {/* Drag handle + close */}
                  <div className="sticky top-0 z-10 flex items-center justify-between bg-[#0F0D08]/95 px-6 pt-4 pb-2 backdrop-blur-sm">
                    <div className="mx-auto h-1 w-10 rounded-full bg-white/15" />
                    <button
                      type="button"
                      onClick={closeDrawer}
                      className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
                      aria-label="Close locations drawer"
                    >
                      <X size={16} className="text-white/60" />
                    </button>
                  </div>

                  <div
                    className="px-6 pt-4 pb-12 md:px-12"
                    style={{
                      paddingBottom:
                        "max(3rem, env(safe-area-inset-bottom, 0px))",
                    }}
                  >
                    {/* Header */}
                    <div className="mb-8 text-center">
                      <p className="mb-2 font-sans text-gold/60 text-xs uppercase tracking-[0.3em]">
                        {drawerProv.count} poems submitted
                      </p>
                      <h2 className="font-serif text-3xl text-white md:text-4xl">
                        {drawerProv.name}
                      </h2>
                      <div className="mx-auto mt-3 h-px w-16 bg-gold/30" />
                    </div>

                    {/* Locations grid */}
                    <div className="mx-auto max-w-3xl">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                        {drawerProv.cities
                          .slice()
                          .sort((a, b) => a.localeCompare(b))
                          .map((city) => (
                            <div
                              key={city}
                              className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 transition-colors duration-200 hover:border-gold/15 hover:bg-gold/[0.04]"
                            >
                              <MapPin
                                size={13}
                                className="shrink-0 text-gold/40"
                              />
                              <span className="font-sans text-sm text-white/70">
                                {city}
                              </span>
                            </div>
                          ))}
                      </div>

                      <p className="mt-8 text-center font-sans text-white/25 text-xs">
                        {drawerProv.cities.length} locations reached
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
