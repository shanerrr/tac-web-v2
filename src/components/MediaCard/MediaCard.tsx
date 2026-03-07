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

// Only one video should be unmuted at a time
const unmutedVideo = { current: null as HTMLVideoElement | null };

function VideoCard({
  asset,
  className,
}: {
  asset: MediaAsset;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubberRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const dragListenersRef = useRef<{
    onMove: (e: globalThis.MouseEvent) => void;
    onUp: () => void;
  } | null>(null);

  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  // Sync muted state when changed externally (e.g. another card unmuted)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onVolumeChange = () => setMuted(video.muted);
    video.addEventListener("volumechange", onVolumeChange);
    return () => video.removeEventListener("volumechange", onVolumeChange);
  }, []);

  // Autoplay when visible, pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Update progress via rAF while video is playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      const tick = () => {
        if (video.duration) {
          setProgress(video.currentTime / video.duration);
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onPause = () => cancelAnimationFrame(rafRef.current);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    // If already playing (IO fired before this effect)
    if (!video.paused) onPlay();

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  // Clean up drag listeners on unmount
  useEffect(() => {
    return () => {
      if (dragListenersRef.current) {
        window.removeEventListener(
          "mousemove",
          dragListenersRef.current.onMove,
        );
        window.removeEventListener("mouseup", dragListenersRef.current.onUp);
      }
    };
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const willUnmute = video.muted;
    if (willUnmute && unmutedVideo.current && unmutedVideo.current !== video) {
      unmutedVideo.current.muted = true;
    }
    video.muted = !video.muted;
    unmutedVideo.current = willUnmute ? video : null;
    setMuted(video.muted);
  }, []);

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
        dragListenersRef.current = null;
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };

      dragListenersRef.current = { onMove, onUp };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [seekFromEvent],
  );

  return (
    <>
      <video
        ref={videoRef}
        src={asset.url}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 h-full w-full scale-[1.01] object-cover ${className ?? ""}`}
      />

      {/* Interaction zone — hover unmutes/remutes, click toggles mute on mobile */}
      <div
        onMouseEnter={() => {
          setHovered(true);
          const video = videoRef.current;
          if (video?.muted) toggleMute();
        }}
        onMouseLeave={() => {
          if (!isSeeking) setHovered(false);
          const video = videoRef.current;
          if (video && !video.muted) toggleMute();
        }}
        onClick={toggleMute}
        className="absolute inset-0 z-10"
      >
        {/* Mute/unmute indicator */}
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label={muted ? "Unmute video" : "Mute video"}
          className={`absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {muted ? <VolumeOff size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      {/* Scrubber */}
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

export default function MediaCard({
  asset,
  sizes,
  className,
}: {
  asset: MediaAsset;
  sizes: string;
  className?: string;
}) {
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

  return <VideoCard asset={asset} className={className} />;
}
