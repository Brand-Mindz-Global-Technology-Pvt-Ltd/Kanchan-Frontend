import left1 from "../../assets/about/leaf/left-1.png";
import left2 from "../../assets/about/leaf/left-2.png";
import right1 from "../../assets/about/leaf/right-1.png";
import right2 from "../../assets/about/leaf/right-2.png";

export interface ContactEdgeLeavesProps {
  /** Width clamp matching the original displayed leaf size */
  width?: string;
  /** Opacity of decorative leaves */
  opacity?: number;
}

export default function ContactEdgeLeaves({
  width = "clamp(70px, 10vw, 160px)",
  opacity = 0.88,
}: ContactEdgeLeavesProps = {}) {
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
        /* Hide all leaf decorations completely on mobile */
        @media (max-width: 767px) {
          .contact-edge-leaves-container {
            display: none !important;
          }
        }

        /* Desktop subtle natural animations */
        @media (min-width: 768px) {
          @keyframes contactLeafFadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes contactLeafSwayLeft {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            25% {
              transform: translate3d(3px, -4px, 0) rotate(1.2deg);
            }
            50% {
              transform: translate3d(5px, 2px, 0) rotate(-0.8deg);
            }
            75% {
              transform: translate3d(2px, 5px, 0) rotate(0.6deg);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
          }

          @keyframes contactLeafSwayRight {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            25% {
              transform: translate3d(-3px, 4px, 0) rotate(-1.2deg);
            }
            50% {
              transform: translate3d(-5px, -2px, 0) rotate(0.8deg);
            }
            75% {
              transform: translate3d(-2px, -5px, 0) rotate(-0.6deg);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
          }

          .contact-edge-leaves-container {
            animation: contactLeafFadeIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }

          .contact-leaf-anim-left-1 {
            transform-origin: left top;
            will-change: transform;
            animation: contactLeafSwayLeft 7.5s ease-in-out infinite;
          }

          .contact-leaf-anim-left-2 {
            transform-origin: left bottom;
            will-change: transform;
            animation: contactLeafSwayLeft 8.8s ease-in-out 1.2s infinite;
          }

          .contact-leaf-anim-right-1 {
            transform-origin: right top;
            will-change: transform;
            animation: contactLeafSwayRight 8.2s ease-in-out 0.6s infinite;
          }

          .contact-leaf-anim-right-2 {
            transform-origin: right bottom;
            will-change: transform;
            animation: contactLeafSwayRight 7.8s ease-in-out 1.8s infinite;
          }
        }

        /* Respect accessibility prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .contact-edge-leaves-container,
          .contact-leaf-anim-left-1,
          .contact-leaf-anim-left-2,
          .contact-leaf-anim-right-1,
          .contact-leaf-anim-right-2 {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="contact-edge-leaves-container pointer-events-none absolute inset-0 z-0 select-none"
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
          className="contact-leaf-anim-left-1"
          style={{
            ...commonLeftStyle,
            top: "0%",
          }}
        />

        {/* TOP RIGHT LEAF */}
        <img
          src={right1}
          alt=""
          className="contact-leaf-anim-right-1"
          style={{
            ...commonRightStyle,
            top: "0%",
          }}
        />

        {/* BOTTOM LEFT LEAF */}
        <img
          src={left2}
          alt=""
          className="contact-leaf-anim-left-2"
          style={{
            ...commonLeftStyle,
            bottom: "0%",
          }}
        />

        {/* BOTTOM RIGHT LEAF */}
        <img
          src={right2}
          alt=""
          className="contact-leaf-anim-right-2"
          style={{
            ...commonRightStyle,
            bottom: "0%",
          }}
        />
      </div>
    </>
  );
}
