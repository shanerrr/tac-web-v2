"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Animation = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom";

const hiddenStyles: Record<Animation, string> = {
  "fade-up": "translate-y-6 opacity-0",
  "fade-down": "-translate-y-6 opacity-0",
  "fade-left": "translate-x-6 opacity-0",
  "fade-right": "-translate-x-6 opacity-0",
  zoom: "scale-95 opacity-0",
};

export default function ScrollReveal({
  children,
  className = "",
  id,
  as: Tag = "div",
  animation = "fade-up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section";
  animation?: Animation;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "-48px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`transition-[opacity,transform] duration-700 ease-out ${visible ? "translate-x-0 translate-y-0 scale-100 opacity-100" : hiddenStyles[animation]} ${className}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
