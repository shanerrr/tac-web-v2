"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

  const animate = useCallback(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          if (delay > 0) {
            setTimeout(animate, delay);
          } else {
            animate();
          }
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, started]);

  return (
    <span ref={ref} className={className}>
      {started ? display : 0}
      {suffix}
    </span>
  );
}
