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
  mobileBorderTreatment?: boolean;
  mobileOpacity?: number;
};

function HomeEdgeLeaves({
  placements,
  mobileBorderTreatment = false,
  mobileOpacity,
}: HomeEdgeLeavesProps) {
  const leftPlacement = placements.find((placement) => placement.left)?.left;
  const rightPlacement = placements.find((placement) => placement.right)?.right;

  return (
    <>
      {mobileBorderTreatment && (
        <style>{`
          @media (max-width: 640px) {
            .home-edge-leaves--mobile-border [data-home-edge-leaf] {
              width: clamp(100px, 28vw, 120px) !important;
              opacity: var(--home-edge-mobile-opacity, 0.4) !important;
              object-fit: cover;
            }

            .home-edge-leaves--mobile-border [data-home-edge-leaf="left"] {
              object-position: left center;
            }

            .home-edge-leaves--mobile-border [data-home-edge-leaf="right"] {
              object-position: right center;
            }
          }
        `}</style>
      )}
      <div
        aria-hidden="true"
        className={`home-edge-leaves pointer-events-none absolute inset-0 z-0 overflow-hidden${
          mobileBorderTreatment ? " home-edge-leaves--mobile-border" : ""
        }`}
        style={
          mobileOpacity === undefined
            ? undefined
            : ({ "--home-edge-mobile-opacity": mobileOpacity } as CSSProperties)
        }
      >
        {leftPlacement && (
          <img
            src={leftBorder}
            alt=""
            data-decorative-leaf
            data-home-edge-leaf="left"
            className="pointer-events-none absolute left-0 top-0 h-full max-w-none object-fill"
            style={{
              width: leftPlacement.width,
              opacity: leftPlacement.opacity ?? 0.7,
            }}
          />
        )}

        {rightPlacement && (
          <img
            src={rightBorder}
            alt=""
            data-decorative-leaf
            data-home-edge-leaf="right"
            className="pointer-events-none absolute top-0 h-full max-w-none object-fill"
            style={{
              right: 0,
              width: rightPlacement.width,
              opacity: rightPlacement.opacity ?? 0.7,
            }}
          />
        )}
      </div>
    </>
  );
}

export default HomeEdgeLeaves;