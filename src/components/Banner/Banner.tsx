"use client";

import type { AlertBanner } from "@tac/types";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const DISMISSED_KEY = "tac-banner-dismissed";

export default function Banner({ banner }: { banner: AlertBanner }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed !== banner.id) {
      setVisible(true);
    }
  }, [banner.id]);

  const dismiss = useCallback(() => {
    setVisible(false);
    localStorage.setItem(DISMISSED_KEY, banner.id);
  }, [banner.id]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-full bg-foreground/90 px-6 py-3 shadow-xl backdrop-blur-sm">
        <p className="font-sans text-sm text-white leading-snug">
          {banner.message}
          {banner.link && (
            <Link
              href={banner.link}
              className="ml-2 inline-flex items-center gap-1 font-medium text-white underline decoration-white/40 underline-offset-2 transition-colors duration-200 hover:decoration-white"
            >
              {banner.linkText ?? "Learn more"}
              <ArrowRight size={14} />
            </Link>
          )}
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/60 transition-colors duration-200 hover:bg-white/15 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
