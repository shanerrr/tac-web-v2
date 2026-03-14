"use client";

import { useState } from "react";

export default function PillarCard({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  const spaceIdx = title.lastIndexOf(" ");
  const titleStart = spaceIdx > 0 ? title.slice(0, spaceIdx) : title;
  const titleEnd = spaceIdx > 0 ? title.slice(spaceIdx + 1) : "";

  const showOverlay = open
    ? "opacity-100"
    : "pointer-events-none opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100";
  const hideTitle = open ? "opacity-0" : "md:group-hover:opacity-0";

  return (
    <button
      type="button"
      onClick={() => {
        navigator.vibrate?.(8);
        setOpen((o) => !o);
      }}
      aria-expanded={open}
      className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 py-8 text-center backdrop-blur-sm transition-all duration-300 sm:px-6 sm:py-10 md:px-8 md:py-12 md:hover:bg-white/12"
    >
      {/* Title centered over the full card via absolute positioning */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${hideTitle}`}
      >
        <span className="font-sans text-md text-white/60 uppercase tracking-[0.3em]">
          0{index + 1}
        </span>
        <h3 className="mt-3 font-sans text-2xl leading-tight md:text-3xl">
          <span className="font-medium">{titleStart}</span>
          {titleEnd && (
            <>
              {" "}
              <span className="lowercase italic">{titleEnd}</span>
            </>
          )}
        </h3>
      </div>

      {/* Invisible description — forces card height to fit longest text */}
      <div
        className="pointer-events-none px-0 opacity-0 sm:px-2 md:px-4"
        aria-hidden="true"
      >
        <p className="font-sans text-sm leading-relaxed md:text-base">
          {description}
        </p>
      </div>

      {/* Description overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center overflow-y-auto rounded-2xl bg-white/12 px-4 py-6 transition-opacity duration-300 sm:px-6 sm:py-8 md:px-8 md:py-10 ${showOverlay}`}
      >
        <p className="font-sans text-sm text-white/80 leading-relaxed md:text-base">
          {description}
        </p>
      </div>
    </button>
  );
}
