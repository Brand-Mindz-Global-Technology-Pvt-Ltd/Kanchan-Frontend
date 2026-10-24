import { useEffect, useRef } from "react";
import gardenBanner from "../../assets/garden-banner.png";
import HomeEdgeLeaves from "./HomeEdgeLeaves";

function GardenBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Enable animated state only after client mount and feature check
    section.classList.add("garden-banner--animated");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove then re-add to restart animations cleanly on viewport entry/re-entry
            section.classList.remove("garden-banner--in-view");
            void section.offsetWidth;
            section.classList.add("garden-banner--in-view");
          } else {
            section.classList.remove("garden-banner--in-view");
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="garden-banner relative isolate w-full bg-[#FCFAF4] px-2 pb-6 pt-8 sm:px-3 sm:pb-8 sm:pt-10 lg:px-4 lg:pb-10 lg:pt-12"
    >
      <style>{`
        @media (max-width: 640px) {
          .garden-banner {
            padding: 10px 12px !important;
          }

          .garden-banner__frame {
            aspect-ratio: auto !important;
            height: 200px !important;
            min-height: 200px !important;
            border-radius: 8px !important;
          }

          .garden-banner__frame img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center top !important;
          }
        }

        /* Subtle, premium entrance animations */
        .garden-banner--animated:not(.garden-banner--in-view) .garden-banner__anim-label,
        .garden-banner--animated:not(.garden-banner--in-view) .garden-banner__anim-heading,
        .garden-banner--animated:not(.garden-banner--in-view) .garden-banner__anim-desc,
        .garden-banner--animated:not(.garden-banner--in-view) .garden-banner__anim-btn,
        .garden-banner--animated:not(.garden-banner--in-view) .garden-banner__anim-slogan {
          opacity: 0;
          pointer-events: none;
        }

        .garden-banner--in-view .garden-banner__anim-label {
          animation: gbFadeIn 500ms cubic-bezier(0.16, 1, 0.3, 1) 120ms both;
        }

        .garden-banner--in-view .garden-banner__anim-heading {
          animation: gbFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 240ms both;
        }

        .garden-banner--in-view .garden-banner__anim-desc {
          animation: gbFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 400ms both;
        }

        .garden-banner--in-view .garden-banner__anim-btn {
          animation: gbFadeUp 650ms cubic-bezier(0.16, 1, 0.3, 1) 560ms both;
        }

        .garden-banner--in-view .garden-banner__anim-slogan {
          animation: gbFadeIn 750ms cubic-bezier(0.16, 1, 0.3, 1) 720ms both;
        }

        @keyframes gbFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes gbFadeUp {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Desktop button hover interaction */
        @media (hover: hover) and (pointer: fine) {
          .garden-banner__anim-btn {
            transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease !important;
          }
          .garden-banner__anim-btn:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.28) !important;
            background-color: #446B44 !important;
          }
          .garden-banner__anim-btn:active {
            transform: translateY(0) scale(0.98) !important;
          }
        }

        /* Accessibility: respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .garden-banner__anim-label,
          .garden-banner__anim-heading,
          .garden-banner__anim-desc,
          .garden-banner__anim-btn,
          .garden-banner__anim-slogan {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Edge-border leaves – section must NOT be overflow-hidden so leaves are visible */}
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "0%", width: "clamp(100px, 16vw, 220px)", opacity: 0.88 },
            right: { top: "0%", width: "clamp(100px, 16vw, 220px)", opacity: 0.88 },
          },
          {
            left: { bottom: "-25%", width: "clamp(115px, 18vw, 240px)", opacity: 0.92 },
            right: { bottom: "-20%", width: "clamp(110px, 17vw, 230px)", opacity: 0.9 },
          },
        ]}
        mobileBorderTreatment
      />

      {/*
        Frame: narrower maxWidth leaves the leaf borders clearly visible on both sides.
        overflow-hidden stays here to clip the rounded image corners correctly.
        aspect-ratio 2.6/1 makes the frame noticeably taller than the original 3.8/1.
      */}
      <div
        className="garden-banner__frame relative z-10 mx-auto overflow-hidden rounded-[8px]"
        style={{
          width: "100%",
          maxWidth: "1100px",
          aspectRatio: "2.6 / 1",
          minHeight: "0",
          boxShadow: "0px 8px 40px 0px rgba(22,70,34,0.10)",
        }}
      >
        <img
          src={gardenBanner}
          alt="Lush blooming garden pathway"
          className="absolute inset-0 h-full w-full rounded-[8px] object-cover"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            borderRadius: "8px",
          }}
        />

        {/* Subtle dark directional gradient overlay for strong text readability */}
        <div
          className="pointer-events-none absolute inset-0 z-[5] rounded-[8px]"
          style={{
            background:
              "linear-gradient(90deg, rgba(12, 28, 18, 0.70) 0%, rgba(12, 28, 18, 0.45) 45%, rgba(12, 28, 18, 0.12) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Left-aligned content over garden image */}
        <div className="absolute inset-y-0 left-0 z-10 flex max-w-[76%] flex-col items-start justify-center pl-4 pr-16 text-left sm:max-w-[68%] sm:pl-8 sm:pr-20 md:max-w-[540px] md:pl-12 lg:pl-14">
          <p
            className="garden-banner__anim-label font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em]"
            style={{
              fontSize: "clamp(10px, 1.1vw, 13px)",
              lineHeight: 1.3,
              color: "#F7F3E8",
              textShadow:
                "0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            GROW A GREENER TOMORROW
          </p>

          <h4
            className="garden-banner__anim-heading font-serif font-bold text-left"
            style={{
              fontSize: "clamp(18px, 3.2vw, 42px)",
              lineHeight: 1.16,
              color: "#FAF8F0",
              marginTop: "clamp(4px, 0.6vw, 8px)",
              maxWidth: "460px",
              textShadow:
                "0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 14px rgba(0, 0, 0, 0.6)",
            }}
          >
            Grow Naturally Live Beautifully
          </h4>

          <p
            className="garden-banner__anim-desc text-left text-white"
            style={{
              maxWidth: "440px",
              width: "100%",
              marginTop: "clamp(6px, 1vw, 12px)",
              fontSize: "clamp(10px, 1.15vw, 14px)",
              lineHeight: 1.5,
              color: "#FFFFFF",
              textShadow:
                "0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            Discover garden essentials that help you nurture healthier plants
            and greener spaces. From small windowsill herbs to flourishing home
            gardens, find everything to cultivate with organic integrity.
          </p>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/plants";
            }}
            className="garden-banner__anim-btn inline-flex cursor-pointer items-center justify-center gap-1.5 font-bold text-white transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{
              backgroundColor: "#527A52",
              color: "#FFFFFF",
              borderRadius: "8px",
              marginTop: "clamp(10px, 1.4vw, 18px)",
              padding: "clamp(7px, 0.9vw, 10px) clamp(16px, 1.8vw, 24px)",
              fontSize: "clamp(11px, 1.05vw, 13.5px)",
              lineHeight: 1.3,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.25)",
              border: "none",
              outline: "none",
            }}
          >
            <span>Explore All Products</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>

        {/* Bottom-right slogan */}
        <div
          className="garden-banner__anim-slogan pointer-events-none absolute z-10 text-right font-serif font-bold italic text-white"
          style={{
            right: "clamp(12px, 2vw, 20px)",
            bottom: "clamp(12px, 2vw, 20px)",
            color: "#FFFFFF",
            fontSize: "clamp(11px, 1.4vw, 18px)",
            lineHeight: 1.15,
            textShadow:
              "0 1px 3px rgba(0, 0, 0, 0.8), 0 2px 8px rgba(0, 0, 0, 0.6)",
          }}
        >
          <span className="block">Plants</span>
          <span className="block">Make Life</span>
          <span className="block">Brighter.</span>
        </div>
      </div>
    </section>
  );
}

export default GardenBanner;
