import type { CSSProperties } from "react";

interface BotanicalLeafProps {
  style?: CSSProperties;
  width?: number;
  opacity?: number;
  rotate?: number;
}

// Botanical outline leaf SVG — matches the Figma green leaf outlines in the section background
export default function BotanicalLeaf({
  style,
  width = 90,
  opacity = 1,
  rotate = 0,
}: BotanicalLeafProps) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        userSelect: "none",
        width: `${width}px`,
        height: `${Math.round(width * 1.35)}px`,
        opacity,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* stem */}
      <path
        d="M60 148 L60 18"
        stroke="#BECFAA"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* leaf outline */}
      <path
        d="M60 138 C18 98 14 38 60 18 C106 38 102 98 60 138 Z"
        stroke="#BECFAA"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* mid-vein */}
      <path
        d="M60 138 L60 40"
        stroke="#BECFAA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

