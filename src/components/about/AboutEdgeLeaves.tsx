import left1 from "../../assets/about/leaf/left-1.png";
import left2 from "../../assets/about/leaf/left-2.png";
import left3 from "../../assets/about/leaf/left-3.png";
import right1 from "../../assets/about/leaf/right-1.png";
import right2 from "../../assets/about/leaf/right-2.png";
import right3 from "../../assets/about/leaf/right-3.png";

export interface AboutEdgeLeavesProps {
  /** Width clamp matching the original displayed leaf size */
  width?: string;
  /** Opacity of decorative leaves */
  opacity?: number;
  className?: string;
  /** Optional matching middle leaves along the left and right edges */
  includeMiddleLeaves?: boolean;
}

export default function AboutEdgeLeaves({
  width = "clamp(70px, 10vw, 160px)",
  opacity = 0.88,
  className = "",
  includeMiddleLeaves = false,
}: AboutEdgeLeavesProps = {}) {
  const commonLeftStyle: React.CSSProperties = {
    position: "absolute",
    left: "-40px",
    right: "auto",
    width,
    height: "auto",
    objectFit: "contain",
    objectPosition: "left center",
    opacity,
    pointerEvents: "none",
    userSelect: "none",
    display: "block",
    maxWidth: "none",
    margin: 0,
    padding: 0,
  };

  const commonRightStyle: React.CSSProperties = {
    position: "absolute",
    right: "-40px",
    left: "auto",
    width,
    height: "auto",
    objectFit: "contain",
    objectPosition: "right center",
    opacity,
    pointerEvents: "none",
    userSelect: "none",
    display: "block",
    maxWidth: "none",
    margin: 0,
    padding: 0,
  };

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .about-edge-leaves-container {
            display: none !important;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className={`about-edge-leaves-container pointer-events-none absolute inset-0 z-0 select-none ${className}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* TOP LEFT LEAF */}
        <img
          src={left1}
          alt=""
          style={{
            ...commonLeftStyle,
            top: "0%",
          }}
        />

        {/* TOP RIGHT LEAF */}
        <img
          src={right1}
          alt=""
          style={{
            ...commonRightStyle,
            top: "0%",
          }}
        />

        {/* MIDDLE LEFT LEAF */}
        {includeMiddleLeaves && (
          <img
            src={left3}
            alt=""
            style={{
              ...commonLeftStyle,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {/* MIDDLE RIGHT LEAF */}
        {includeMiddleLeaves && (
          <img
            src={right3}
            alt=""
            style={{
              ...commonRightStyle,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        )}

        {/* BOTTOM LEFT LEAF */}
        <img
          src={left2}
          alt=""
          style={{
            ...commonLeftStyle,
            bottom: "0%",
          }}
        />

        {/* BOTTOM RIGHT LEAF */}
        <img
          src={right2}
          alt=""
          style={{
            ...commonRightStyle,
            bottom: "0%",
          }}
        />
      </div>
    </>
  );
}
