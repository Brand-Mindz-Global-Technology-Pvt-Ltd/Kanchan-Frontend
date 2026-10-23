
import gardenBanner from "../../assets/garden-banner.png";
import HomeEdgeLeaves from "./HomeEdgeLeaves";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

function GardenBanner() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="garden-banner relative isolate w-full overflow-hidden bg-[#FCFAF4] px-2 py-3 sm:px-3 sm:py-3 lg:px-4 lg:py-3"
    >
      <style>{`
        @media (max-width: 640px) {
          .garden-banner__frame {
            aspect-ratio: auto !important;
            min-height: clamp(280px, 82vw, 340px) !important;
          }

          .garden-banner__content {
            padding: 20px !important;
          }

          .garden-banner .garden-banner__left-content {
            width: 70% !important;
            transform: none !important;
          }

          .garden-banner .garden-banner__label {
            font-size: 9px !important;
          }

          .garden-banner .garden-banner__heading {
            font-size: 21px !important;
            line-height: 1.08 !important;
          }

          .garden-banner .garden-banner__description {
            font-size: 11px !important;
            line-height: 1.45 !important;
          }

          .garden-banner .garden-banner__button {
            gap: 6px !important;
            margin-top: 12px !important;
            padding: 7px 10px !important;
            font-size: 10px !important;
          }

          .garden-banner .garden-banner__slogan {
            left: auto !important;
            right: 5% !important;
            bottom: 7% !important;
            width: 25%;
          }

          .garden-banner .garden-banner__slogan p {
            font-size: clamp(11px, 3.4vw, 15px) !important;
            text-align: right !important;
          }
        }
      `}</style>
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "-15%", width: "clamp(105px, 17vw, 230px)", opacity: 0.86 },
            right: { top: "-15%", width: "clamp(105px, 17vw, 230px)", opacity: 0.86 },
          },
          {
            left: { bottom: "-20%", width: "clamp(100px, 16vw, 215px)", opacity: 0.82 },
            right: { bottom: "-20%", width: "clamp(100px, 16vw, 215px)", opacity: 0.82 },
          },
        ]}
        mobileBorderTreatment
      />
      <div
        className="garden-banner__frame relative z-10 mx-auto overflow-hidden rounded-[12px] sm:rounded-[14px]"
        style={{
          width: "100%",
          maxWidth: "1328px",
          aspectRatio: "3.8 / 1",
          minHeight: "0",
          boxShadow: "none",
        }}
      >
        <img
          src={gardenBanner}
          alt="Lush blooming garden pathway"
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(4,54,28,0.68) 0%, rgba(3,57,28,0.48) 52%, rgba(3,57,28,0.16) 100%)",
            clipPath: "inset(0 3% 8% 3% round 3% / 11%)",
          }}
        />

        <div
          className="garden-banner__content absolute inset-0 flex items-stretch justify-between"
          style={{
            boxSizing: "border-box",
            padding: "clamp(16px, 2.5%, 24px) clamp(16px, 2.8%, 38px)",
          }}
        >
          {/* Left content */}
          <div
            className="garden-banner__left-content flex flex-col items-start"
            style={{
              width: "min(62%, 440px)",
              minWidth: 0,
              transform: "translate(30px, 10px)",
            }}
          >
            <p
              className="garden-banner__label font-bold uppercase text-white"
              style={{
                margin: 0,
                fontSize: "calc(clamp(5px, 0.65vw, 7px) + 3px)",
                letterSpacing: "0.14em",
                lineHeight: 1.4,
              }}
            >
              GROW A GREENER TOMORROW
            </p>

            <h2
              aria-label="Grow Naturally Live Beautifully."
              className="garden-banner__heading font-serif font-bold text-white"
              style={{
                margin: "clamp(6px, 1.1vw, 10px) 0 0",
                fontSize: "calc(clamp(15px, 2.05vw, 25px) + 3px)",
                lineHeight: 1.02,
              }}
            >
              <AnimatedHeadingText text="Grow Naturally" />
              <br />
              <AnimatedHeadingText text="Live Beautifully." />
            </h2>

            <p
              data-reveal-paragraph
              className="garden-banner__description text-white"
              style={{
                maxWidth: "390px",
                margin: "clamp(5px, 0.9vw, 9px) 0 0",
                fontSize: "calc(clamp(6px, 0.72vw, 9px) + 3px)",
                lineHeight: 1.4,
              }}
            >
              Discover garden essentials that help you nurture healthier plants
              and greener spaces. From small windowsill herbs to flourishing home
              gardens, find everything to cultivate with organic integrity.
            </p>

            <a
              href="/plants"
              className="garden-banner__button inline-flex items-center bg-white font-semibold text-[#183B2B] transition-colors hover:bg-[#F2F7EF]"
              style={{
                gap: "8px",
                marginTop: "clamp(8px, 1.5vw, 14px)",
                padding: "clamp(5px, 0.8vw, 8px) clamp(9px, 1.3vw, 14px)",
                borderRadius: "5px",
                fontSize: "clamp(4px, calc(0.68vw - 2px), 7px)",
                lineHeight: 1.3,
                textDecoration: "none",
              }}
            >
              <span>Explore All Products</span>
              <span aria-hidden="true">›</span>
            </a>
          </div>

          {/* Right slogan */}
          <div
            className="garden-banner__slogan absolute flex flex-col justify-end"
            style={{
              right: "4%",
              bottom: "8%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              boxSizing: "border-box",
            }}
          >
            <p
              className="font-serif font-bold italic text-white"
              style={{
                margin: 0,
                fontSize: "clamp(6px, calc(1.2vw - 2px), 14px)",
                lineHeight: 1.02,
                textAlign: "left",
                textShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            >
              Plants
              <br />
              Make Life
              <br />
              Brighter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GardenBanner;
