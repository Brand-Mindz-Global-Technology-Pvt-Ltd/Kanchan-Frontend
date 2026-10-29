import leftBorder from "../../assets/leaves/boder/left-1.webp";
import rightBorder from "../../assets/leaves/boder/right-1.webp";
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
      <style>{`
        @media (max-width: 767px) {
          .home-edge-leaves,
          .home-edge-leaves--mobile-border {
            position: absolute !important;
            inset: 0 !important;
            z-index: 0 !important;
            pointer-events: none !important;
            overflow: hidden !important;
          }

          .home-edge-leaves [data-home-edge-leaf],
          .home-edge-leaves--mobile-border [data-home-edge-leaf] {
            position: absolute !important;
            height: 100% !important;
            width: auto !important;
            max-width: none !important;
            object-fit: contain !important;
            opacity: var(--home-edge-mobile-opacity, 0.45) !important;
            pointer-events: none !important;
            z-index: 0 !important;
          }

          .home-edge-leaves [data-home-edge-leaf="left"],
          .home-edge-leaves--mobile-border [data-home-edge-leaf="left"] {
            left: 0 !important;
            right: auto !important;
            top: 0 !important;
            bottom: 0 !important;
            object-position: left top !important;
          }

          .home-edge-leaves [data-home-edge-leaf="right"],
          .home-edge-leaves--mobile-border [data-home-edge-leaf="right"] {
            right: 0 !important;
            left: auto !important;
            top: 0 !important;
            bottom: 0 !important;
            object-position: right top !important;
          }

          /* Hide duplicate/subsequent placement leaves on mobile so one continuous leaf border frames the full height */
          .home-edge-leaves [data-home-edge-leaf="left"] ~ [data-home-edge-leaf="left"],
          .home-edge-leaves--mobile-border [data-home-edge-leaf="left"] ~ [data-home-edge-leaf="left"],
          .home-edge-leaves [data-home-edge-leaf="right"] ~ [data-home-edge-leaf="right"],
          .home-edge-leaves--mobile-border [data-home-edge-leaf="right"] ~ [data-home-edge-leaf="right"] {
            display: none !important;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className={`home-edge-leaves pointer-events-none absolute inset-0 z-0${
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