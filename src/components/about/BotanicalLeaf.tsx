import type { CSSProperties } from "react";

interface BotanicalLeafProps {
  className?: string;
  style?: CSSProperties;
}

// Minimalist botanical outline leaf illustration matching screenshot 2
export default function BotanicalLeaf({
  className = "",
  style,
}: BotanicalLeafProps) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M 50 120 L 50 15"
        stroke="#C9E1B0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 50 112 C 16 80 12 32 50 15 C 88 32 84 80 50 112 Z"
        stroke="#C9E1B0"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

