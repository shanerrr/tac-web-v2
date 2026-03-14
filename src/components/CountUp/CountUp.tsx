"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUp({
  value,
  duration = 1800,
  suffix = "",
  className,
  delay = 0,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || triggeredRef.current) return;

    let timer: ReturnType<typeof setTimeout>;

    const animate = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggeredRef.current = true;
          setStarted(true);
          observer.disconnect();
          if (delay > 0) {
            timer = setTimeout(animate, delay);
          } else {
            animate();
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {started ? display : 0}
      {suffix}
    </span>
  );
}
