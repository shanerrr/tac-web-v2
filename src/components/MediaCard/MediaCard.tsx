"use client";

import type { MediaAsset } from "@tac/lib/contentful";
import { Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

export default function MediaCard({
  asset,
  sizes,
  className,
}: {
  asset: MediaAsset;
  sizes: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  if (asset.type === "image") {
    return (
      <Image
        src={asset.url}
        alt={asset.title}
        fill
        sizes={sizes}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        src={asset.url}
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause video" : "Play video"}
        className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity duration-200 ${
          playing ? "opacity-0 hover:opacity-100" : "opacity-100"
        }`}
      >
        {playing ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="2" y="1" width="3.5" height="12" rx="1" />
            <rect x="8.5" y="1" width="3.5" height="12" rx="1" />
          </svg>
        ) : (
          <Play size={14} className="ml-0.5" fill="currentColor" />
        )}
      </button>
    </>
  );
}
