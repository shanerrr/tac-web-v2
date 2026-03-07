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
      onClick={() => setOpen((o) => !o)}
      className="group relative flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 py-8 text-center backdrop-blur-sm transition-all duration-300 sm:min-h-80 sm:px-6 sm:py-10 md:px-8 md:py-12 md:hover:bg-white/12 lg:min-h-96"
    >
      {/* Default state — number + title */}
      <div className={`transition-opacity duration-300 ${hideTitle}`}>
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

      {/* Description overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-white/12 px-4 py-6 transition-opacity duration-300 sm:px-6 sm:py-8 md:px-8 md:py-10 ${showOverlay}`}
      >
        <p className="font-sans text-white/80 text-xs leading-relaxed sm:text-sm md:text-base">
          {description}
        </p>
      </div>
    </button>
  );
}
