import type React from "react";
import { memo } from "react";

/** Deterministic rotation via the golden angle — nicely distributed, no hydration risk. */
export const goldenRotation = (i: number) => (i * 137.508) % 360;

const TreeRingDivider = memo(function TreeRingDivider({
  isDrawn,
  rotation,
}: {
  isDrawn: boolean;
  rotation: number;
}) {
  const ring = (delay: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: isDrawn ? 0 : 1,
    transition: `stroke-dashoffset 0.6s ease-out ${delay}s`,
  });

  return (
    <div className="-my-2 flex items-center gap-5 py-2 md:my-0">
      <div className="h-px flex-1 bg-primary/20" />
      <svg
        viewBox="0 0 287 299"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="opacity-60"
        style={{
          width: "clamp(3rem, 6vw, 8rem)",
          height: "clamp(3rem, 6vw, 8rem)",
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <path
          d="M143.5 2C221.572 2 285 67.96 285 149.5C285 231.04 221.572 297 143.5 297C65.4281 297 2 231.04 2 149.5C2 67.96 65.4281 2 143.5 2Z"
          stroke="#D87D3C"
          strokeWidth="4"
          pathLength={1}
          style={ring(0)}
        />
        <path
          d="M143.5 33C210.673 33 265 85.452 265 150C265 214.548 210.673 267 143.5 267C76.3268 267 22 214.548 22 150C22 85.452 76.3268 33 143.5 33Z"
          stroke="#D7B88F"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.07)}
        />
        <path
          d="M144.5 61C186.483 61 221 100.559 221 150C221 199.441 186.483 239 144.5 239C102.517 239 68 199.441 68 150C68 100.559 102.517 61 144.5 61Z"
          stroke="#B39C66"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.14)}
        />
        <path
          d="M156 118C171.289 118 184 131.696 184 149C184 166.304 171.289 180 156 180C140.711 180 128 166.304 128 149C128 131.696 140.711 118 156 118Z"
          stroke="#AF4106"
          strokeWidth="4"
          pathLength={1}
          style={ring(0.21)}
        />
      </svg>
      <div className="h-px flex-1 bg-primary/20" />
    </div>
  );
});

export default TreeRingDivider;
