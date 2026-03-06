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

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="group relative flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] px-8 py-12 text-center backdrop-blur-sm transition-all duration-300 md:min-h-96 md:hover:bg-white/[0.12]"
    >
      {/* Default state — number + title */}
      <div
        className={`transition-opacity duration-300 ${
          open
            ? "opacity-0"
            : "md:group-hover:opacity-0"
        }`}
      >
        <span className="font-sans text-[10px] text-white/30 uppercase tracking-[0.3em]">
          0{index + 1}
        </span>
        <h3 className="mt-3 font-serif text-2xl leading-tight md:text-3xl">
          {title}
        </h3>
      </div>

      {/* Description overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-white/[0.12] px-8 py-10 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100"
        }`}
      >
        <p className="font-sans text-sm text-white/80 leading-relaxed md:text-base">
          {description}
        </p>
      </div>
    </button>
  );
}
