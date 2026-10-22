import leftBorder from "../../assets/leaves/boder/left-1.png";
import rightBorder from "../../assets/leaves/boder/rigth-1.png";
import type { CSSProperties } from "react";

type LeafPlacement = {
  top?: string;
  bottom?: string;
  width: string;
  opacity?: number;
};

type HomeEdgeLeavesProps = {
  placements: {
    left?: LeafPlacement;
    right?: LeafPlacement;
  }[];
};

function HomeEdgeLeaves({ placements }: HomeEdgeLeavesProps) {
  return (
    <div
      aria-hidden="true"
      className="home-edge-leaves pointer-events-none absolute inset-0 z-0 overflow-hidden"
      style={
        {
          "--home-edge-left": `url("${leftBorder}")`,
          "--home-edge-right": `url("${rightBorder}")`,
        } as CSSProperties
      }
    >
      <style>{`
        @media (max-width: 640px) {
          .home-edge-leaves::before,
          .home-edge-leaves::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            z-index: 0;
            background-repeat: repeat-y;
            background-position: top;
            background-size: 100% auto;
            opacity: 0.9;
            pointer-events: none;
          }

          .home-edge-leaves::before {
            left: 0;
            width: clamp(76px, 25vw, 100px);
            background-image: var(--home-edge-left);
          }

          .home-edge-leaves::after {
            right: 0;
            width: clamp(88px, 29vw, 116px);
            background-image: var(--home-edge-right);
          }

          .home-edge-leaves [data-home-edge-leaf] {
            display: none;
          }
        }
      `}</style>
      {placements.map((placement, index) => (
        <div key={index}>
          {placement.left && (
            <img
              src={leftBorder}
              alt=""
              data-decorative-leaf
              data-home-edge-leaf="left"
              className="pointer-events-none absolute h-auto max-w-none"
              style={{
                left: 0,
                ...placement.left,
              }}
            />
          )}
          {placement.right && (
            <img
              src={rightBorder}
              alt=""
              data-decorative-leaf
              data-home-edge-leaf="right"
              className="pointer-events-none absolute h-auto max-w-none"
              style={{
                right: 0,
                ...placement.right,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default HomeEdgeLeaves;
