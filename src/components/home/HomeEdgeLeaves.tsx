import leftBorder from "../../assets/leaves/boder/left-1.png";
import rightBorder from "../../assets/leaves/boder/rigth-1.png";
import { Fragment, type CSSProperties } from "react";

type LeafPlacement = {
  top?: string;
  bottom?: string;
  width: string;
  height?: string;
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
  return (
    <>
      {mobileBorderTreatment && (
        <style>{`
          @media (max-width: 640px) {
            .home-edge-leaves--mobile-border [data-home-edge-leaf] {
              width: clamp(72px, 22vw, 100px) !important;
              opacity: var(--home-edge-mobile-opacity, 0.55) !important;
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
        {placements.map(({ left, right }, index) => (
          <Fragment key={index}>
            {left && (
              <img
                src={leftBorder}
                alt=""
                data-decorative-leaf
                data-home-edge-leaf="left"
                className="pointer-events-none absolute max-w-none"
                style={{
                  left: 0,
                  top: left.top ?? 0,
                  bottom: left.bottom,
                  width: left.width,
                  height: left.height ?? "100%",
                  objectFit: "cover",
                  objectPosition: "left center",
                  opacity: left.opacity ?? 0.9,
                }}
              />
            )}

            {right && (
              <img
                src={rightBorder}
                alt=""
                data-decorative-leaf
                data-home-edge-leaf="right"
                className="pointer-events-none absolute max-w-none"
                style={{
                  right: 0,
                  top: right.top ?? 0,
                  bottom: right.bottom,
                  width: right.width,
                  height: right.height ?? "100%",
                  objectFit: "cover",
                  objectPosition: "right center",
                  opacity: right.opacity ?? 0.9,
                }}
              />
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default HomeEdgeLeaves;