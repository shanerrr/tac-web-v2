"use client";

import type { MediaAsset } from "@tac/lib/contentful";
import { Volume2, VolumeOff } from "lucide-react";
import Image from "next/image";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const scrubberRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const play = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPlaying(false);
  }, []);

  const toggleMute = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  // Auto-play when mostly visible, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else {
          pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [play, pause]);

  // Update progress via rAF while playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (video.duration) {
        setProgress(video.currentTime / video.duration);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (playing) {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const seekFromEvent = useCallback((clientX: number) => {
    const bar = scrubberRef.current;
    const video = videoRef.current;
    if (!bar || !video || !video.duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    video.currentTime = ratio * video.duration;
    setProgress(ratio);
  }, []);

  const handleScrubDown = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      setIsSeeking(true);
      seekFromEvent(e.clientX);

      const onMove = (ev: globalThis.MouseEvent) => seekFromEvent(ev.clientX);
      const onUp = () => {
        setIsSeeking(false);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [seekFromEvent],
  );

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
        muted
        loop
        playsInline
        preload="metadata"
        onEnded={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
      />

      {/* Hover/tap zone — shows controls on interaction */}
      <div
        onMouseEnter={() => {
          setHovered(true);
          play();
        }}
        onMouseLeave={() => {
          if (!isSeeking) {
            setHovered(false);
            pause();
          }
        }}
        onClick={() => setHovered((h) => !h)}
        className="absolute inset-0 z-10"
      >
        {/* Mute/unmute button */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className={`absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {muted ? <VolumeOff size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Scrubber — subtle progress bar at bottom */}
      <div
        ref={scrubberRef}
        role="slider"
        aria-label="Seek video"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        tabIndex={0}
        onMouseDown={handleScrubDown}
        className={`absolute right-0 bottom-0 left-0 z-20 h-3 cursor-pointer transition-opacity duration-300 ${
          hovered || isSeeking ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Track */}
        <div className="absolute bottom-0 h-1 w-full bg-white/40">
          <div
            className="h-full bg-tertiary transition-[width] duration-75 ease-linear"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
