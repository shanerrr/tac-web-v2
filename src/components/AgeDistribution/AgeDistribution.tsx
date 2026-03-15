"use client";

import { useEffect, useRef, useState } from "react";

type AgeGroup = { range: string; percentage: number };

export default function AgeDistribution({ groups }: { groups: AgeGroup[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-5">
      {groups.map((group, i) => (
        <div key={group.range}>
          <div className="mb-1.5 flex items-baseline justify-between">
            <span className="font-sans text-foreground/70 text-md">
              {group.range}
            </span>
            <span className="font-bold font-serif text-gold text-lg">
              {group.percentage}%
            </span>
          </div>
          <div className="relative h-2 overflow-hidden rounded-full bg-gold/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-gold/70 to-gold transition-[width] duration-1000 ease-out"
              style={{
                width: visible ? `${group.percentage}%` : "0%",
                transitionDelay: visible ? `${i * 150}ms` : "0ms",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
