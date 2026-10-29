import { useEffect, useRef } from "react";
import heroImage from "../../assets/hero-image.jpg";
import leafTwo from "../../assets/leaves/leaf-2.png";
import leafThree from "../../assets/leaves/leaf-3.png";
import leafFour from "../../assets/leaves/leaf-4.png";
import leafFive from "../../assets/leaves/leaf-5.png";
import HomeEdgeLeaves from "../home/HomeEdgeLeaves";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

const features = [
  {
    title: "Quality Plants",
    detail: "Strong Wellness",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Organic Inputs",
    detail: "Chemical-Free Care",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    title: "Total Solution",
    detail: "Everything you need",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
] as const;

function HeroBanner({ homeDecorations = false }: { homeDecorations?: boolean }) {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();
  const imgRef = useRef<HTMLImageElement>(null);

  // Replay the hero image fade-up animation each time the section enters the viewport
  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove then re-add the class to restart the animation
            img.classList.remove("hero-img-animate");
            // Force reflow so the browser registers the class removal
            void img.offsetWidth;
            img.classList.add("hero-img-animate");
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      className="hero-banner-mobile relative isolate w-full overflow-hidden bg-[linear-gradient(90deg,#FCFAF3_0%,#F8F6EB_38%,#ECF4DE_75%,#E3EED3_100%)] py-8 sm:py-14 lg:py-16"
    >
      <style>{`
        @media (min-width: 768px) {
          .hero-banner-mobile {
            overflow: visible !important;
          }

          .hero-banner-mobile .home-edge-leaves,
          .hero-banner-mobile .home-edge-leaves [data-home-edge-leaf="left"] {
            overflow: visible !important;
          }
        }

        @media (max-width: 1023px) {
          .hero-banner-mobile {
            padding-block: 12px;
          }

          .hero-banner-mobile .hero-banner-layout {
            display: grid;
            grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
            align-items: center;
            gap: 6px;
          }

          .hero-banner-mobile .hero-banner-copy,
          .hero-banner-mobile .hero-banner-image {
            min-width: 0;
            width: auto;
            max-width: none;
          }

          .hero-banner-mobile .hero-banner-copy {
            grid-column: 1;
            margin-left: calc(clamp(40px, 13vw, 80px) + 20px);
          }

          .hero-banner-mobile .hero-banner-image {
            grid-column: 2;
            margin-top: 0;
          }

          .hero-banner-mobile .hero-banner-image > div {
            border-radius: 24px 10px 12px 24px !important;
          }

          .hero-banner-mobile .hero-banner-badge {
            max-width: 100%;
            flex-wrap: wrap;
            gap: 2px;
            padding: 4px 6px;
            font-size: 7px;
            line-height: 1.2;
          }

          .hero-banner-mobile .hero-banner-badge svg {
            width: 10px;
            height: 10px;
          }

          .hero-banner-mobile .hero-banner-heading {
            margin-top: 8px;
          }

          .hero-banner-mobile h1 {
            font-size: 16px;
            line-height: 1.1;
          }

          .hero-banner-mobile .hero-banner-description {
            max-width: none;
            margin-top: 8px;
            font-size: 10px;
            line-height: 1.3;
          }

          .hero-banner-mobile .hero-banner-ctas {
            gap: 4px;
            margin-top: 8px;
          }

          .hero-banner-mobile .hero-banner-ctas a {
            padding: 6px 7px;
            font-size: 9px;
            line-height: 1.2;
            white-space: nowrap;
          }

          .hero-banner-mobile .hero-banner-features {
            max-width: none;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 3px;
            margin-top: 6px;
          }

          .hero-banner-mobile [data-reveal-card] {
            min-width: 0;
            gap: 5px;
            padding: 6px 5px;
            border-radius: 8px;
            align-items: center;
          }

          .hero-banner-mobile [data-reveal-card] > span {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            flex-shrink: 0;
          }

          .hero-banner-mobile [data-reveal-card] svg {
            width: 12px;
            height: 12px;
          }

          .hero-banner-mobile [data-reveal-card] div {
            min-width: 0;
            flex: 1 1 0%;
            text-align: left;
          }

          .hero-banner-mobile [data-reveal-card] div > span:first-child {
            display: block;
            font-size: 8.5px;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hero-banner-mobile [data-reveal-card] div > span:last-child {
            display: block;
            margin-top: 1px;
            font-size: 7px;
            line-height: 1.2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        @media (min-width: 400px) and (max-width: 1023px) {
          .hero-banner-mobile h1 {
            font-size: 19px;
          }

          .hero-banner-mobile .hero-banner-description {
            font-size: 11px;
          }

          .hero-banner-mobile [data-reveal-card] > span {
            width: 24px;
            height: 24px;
          }

          .hero-banner-mobile [data-reveal-card] div > span:first-child {
            font-size: 9.5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hero-banner-mobile [data-reveal-card] div > span:last-child {
            font-size: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

    
        @media (min-width: 1024px) {
          .hero-banner-mobile .hero-banner-content-shell {
            width: auto;
            max-width: none;
            margin-inline: clamp(88px, 8vw, 116px);
          }

          .hero-banner-mobile .hero-banner-layout {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
            align-items: center;
            gap: clamp(20px, 3vw, 44px);
          }

          .hero-banner-mobile .hero-banner-copy {
            width: auto;
            max-width: 636px;
            min-width: 0;
            margin-left: 70px;
          }

          .hero-banner-mobile .hero-banner-image {
            width: auto;
            max-width: 620px;
            min-width: 0;
            margin-top: 0;
          }

          .hero-banner-mobile .hero-banner-features {
            max-width: 636px;
            gap: 12px;
          }

          .hero-banner-mobile [data-reveal-card] {
            min-height: 72px;
            padding: 14px 12px;
            gap: 10px;
            box-sizing: border-box;
          }

          .hero-banner-mobile [data-reveal-card] > span {
            width: 38px;
            height: 38px;
            flex-shrink: 0;
            border-radius: 10px;
          }

          .hero-banner-mobile [data-reveal-card] div {
            min-width: 0;
            flex: 1 1 auto;
          }

          .hero-banner-mobile [data-reveal-card] div > span:first-child {
            display: block;
            font-size: 13px;
            line-height: 1.25;
            font-weight: 700;
            white-space: nowrap;
            overflow: visible;
            text-overflow: clip;
          }

          .hero-banner-mobile [data-reveal-card] div > span:last-child {
            display: block;
            margin-top: 2px;
            font-size: 11px;
            line-height: 1.25;
            white-space: nowrap;
            overflow: visible;
            text-overflow: clip;
          }
        }
        @media (max-width: 767px) {
  .hero-banner-mobile .hero-banner-layout {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .hero-banner-mobile .hero-banner-copy {
    order: 1;
    width: 100%;
    max-width: 330px;
    margin-inline: auto;
    text-align: center;
  }

  .hero-banner-mobile .hero-banner-heading,
  .hero-banner-mobile h1 {
    width: 100%;
    max-width: 290px;
    margin-inline: auto;
    text-align: center;
    font-size: 25px;
    line-height: 1.25;
  }

  .hero-banner-mobile .hero-banner-description {
    width: 100%;
    max-width: 285px;
    margin-inline: auto;
    margin-top: 10px;
    font-size: 13px;
    line-height: 1.9;
    text-align: center;
    color: #000000;
  }

  .hero-banner-mobile .hero-banner-badge {
    margin-inline: auto;
    font-size: 10px;
    padding: 6px 10px;
  }

  .hero-banner-mobile .hero-banner-ctas {
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 14px;
  }

  .hero-banner-mobile .hero-banner-ctas a {
    font-size: 12px;
    padding: 8px 14px;
    white-space: normal;
  }

  .hero-banner-mobile .hero-banner-features {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 5px;
    margin-top: 14px;
    max-width: 340px;
    margin-inline: auto;
  }

  .hero-banner-mobile [data-reveal-card] {
    min-width: 0;
    padding: 7px 4px;
    gap: 4px;
    align-items: center;
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
  }

  .hero-banner-mobile [data-reveal-card] > span {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 6px;
    margin-inline: auto;
  }

  .hero-banner-mobile [data-reveal-card] svg {
    width: 12px;
    height: 12px;
  }

  .hero-banner-mobile [data-reveal-card] div {
    min-width: 0;
    flex: 1 1 0%;
    text-align: center;
  }

  .hero-banner-mobile [data-reveal-card] div > span:first-child {
    display: block;
    font-size: 9.5px;
    line-height: 1.2;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-banner-mobile [data-reveal-card] div > span:last-child {
    display: block;
    margin-top: 1.5px;
    font-size: 8px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero-banner-mobile .hero-banner-image {
    order: 2;
    width: 100%;
    max-width: none;
    margin-top: 0;
  }
}
 

        @keyframes hero-img-fadein {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-img-animate {
          animation: hero-img-fadein 900ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-img-animate {
            animation: none;
          }
        }

        /* ── Leaf float animations ── */
        @keyframes leaf-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        @keyframes leaf-float-spin {
          0%   { transform: translateY(0px) rotate(0deg); }
          25%  { transform: translateY(-6px) rotate(2deg); }
          50%  { transform: translateY(-10px) rotate(-2deg); }
          75%  { transform: translateY(-4px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .leaf-float {
          animation: leaf-float 5s ease-in-out infinite;
        }
        .leaf-float-alt {
          animation: leaf-float 6.5s ease-in-out infinite;
          animation-delay: -2.5s;
        }
        .leaf-float-spin {
          animation: leaf-float-spin 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .leaf-float,
          .leaf-float-alt,
          .leaf-float-spin {
            animation: none;
          }
        }
      `}</style>
      {homeDecorations && (
        <HomeEdgeLeaves
          placements={[
            {
              left: {
                top: "0",
                width: "clamp(80px, 13vw, 210px)",
                height: "100%",
                opacity: 0.92,
              },
              right: {
                top: "0",
                width: "clamp(80px, 13vw, 210px)",
                height: "100%",
                opacity: 0.92,
              },
            },
          ]}
          mobileBorderTreatment
          mobileOpacity={0.5}
        />
      )}

      {/* Scattered floating leaf decorations – clearly visible background botanical accents */}
      {homeDecorations && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden sm:block"
        >
          {/* Top area: to the right of the badge / above heading */}
          <img
            src={leafThree}
            alt=""
            className="leaf-float absolute"
            style={{
              top: "6%",
              left: "58%",
              width: "clamp(30px, 2.6vw, 44px)",
              opacity: 0.72,
              transform: "rotate(18deg)",
            }}
          />
          <img
            src={leafFour}
            alt=""
            className="leaf-float-alt absolute"
            style={{
              top: "4%",
              left: "38%",
              width: "clamp(24px, 2vw, 34px)",
              opacity: 0.65,
              transform: "rotate(-32deg)",
            }}
          />

          {/* Description area: open background between text & image */}
          <img
            src={leafFive}
            alt=""
            className="leaf-float absolute"
            style={{
              top: "49%",
              left: "53%",
              width: "clamp(32px, 2.6vw, 44px)",
              opacity: 0.75,
              transform: "rotate(28deg)",
            }}
          />
          <img
            src={leafThree}
            alt=""
            className="leaf-float-alt absolute"
            style={{
              top: "39%",
              left: "48%",
              width: "clamp(26px, 2.3vw, 38px)",
              opacity: 0.70,
              transform: "rotate(-14deg)",
            }}
          />

          {/* Above & beside the hero image frame */}
          <img
            src={leafFive}
            alt=""
            className="leaf-float absolute"
            style={{
              top: "8%",
              right: "clamp(120px, 15vw, 220px)",
              width: "clamp(28px, 2.4vw, 38px)",
              opacity: 0.68,
              transform: "rotate(-20deg)",
            }}
          />
          <img
            src={leafThree}
            alt=""
            className="leaf-float-alt absolute"
            style={{
              top: "50%",
              right: "clamp(80px, 11vw, 160px)",
              width: "clamp(26px, 2.2vw, 36px)",
              opacity: 0.65,
              transform: "rotate(-35deg)",
            }}
          />

          {/* Below CTAs & near feature cards */}
          <img
            src={leafFive}
            alt=""
            className="leaf-float absolute"
            style={{
              top: "72%",
              left: "46%",
              width: "clamp(26px, 2.2vw, 38px)",
              opacity: 0.70,
              transform: "rotate(-26deg)",
            }}
          />

          {/* Bottom right: below hero image frame */}
          <img
            src={leafFive}
            alt=""
            className="leaf-float-alt absolute"
            style={{
              bottom: "4%",
              right: "clamp(90px, 12vw, 180px)",
              width: "clamp(30px, 2.5vw, 42px)",
              opacity: 0.72,
              transform: "rotate(32deg)",
            }}
          />
        </div>
      )}

      <div className="hero-banner-content-shell relative z-10 mx-auto w-[92%] max-w-[1320px]">
        <div className="hero-banner-layout flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">

          {/* ── Left Column: Text & Features ── */}
          <div className="hero-banner-copy relative z-10 w-full shrink-0 lg:max-w-[580px] xl:max-w-[620px]">
            {/* Badge */}
            <div className="hero-banner-badge inline-flex items-center gap-2 rounded-full bg-[#EAF2D7] px-3.5 py-1.5 text-[11px] font-semibold text-[#315F38] sm:text-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6" />
              </svg>
              <span>Natural • Sustainable • Healthier Homes</span>
            </div>

            {/* Heading with middle decorative leaf */}
            <div className="hero-banner-heading relative mt-4 sm:mt-5">
              <h1
                aria-label="Bring Home the Beauty of Nature"
                className="font-serif text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#18382B] sm:text-[46px] lg:text-[52px] xl:text-[56px]"
              >
                <span className="block">
                  <AnimatedHeadingText text="Bring Home the" />
                </span>
                <span className="block italic text-[#0B633B]">
                  <AnimatedHeadingText text="Beauty of Nature" />
                </span>
              </h1>

              {/* Decorative leaf next to "Nature" */}
              <img
                src={leafTwo}
                alt=""
                aria-hidden="true"
                className="leaf-float-spin pointer-events-none absolute right-4 top-1/2 hidden h-auto w-12 -translate-y-1/2 rotate-25 opacity-75 sm:block lg:right-6 lg:w-14"
              />
            </div>

            {/* Paragraph */}
            <p
              data-reveal-paragraph
              className="hero-banner-description mt-4 text-[14px] leading-relaxed text-[#43584B] sm:mt-5 sm:text-[15px] lg:mt-5 lg:max-w-[570px] lg:text-[15px] lg:leading-[1.65]"
            >
              Everything you need to grow, nurture, and create your own serene
              sanctuary. From rare tropical foliage to seeds and organic
              nourishment.
            </p>

            {/* CTA Buttons */}
            <div className="hero-banner-ctas mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-4 lg:mt-8">
              <a
                href="/plants"
                className="inline-flex items-center justify-center rounded-full bg-[#06452E] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#043322] active:scale-95 sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Shop Plants <span className="ml-2 font-normal">›</span>
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[#D9DFD0] bg-white/90 px-4 py-2.5 text-[13.5px] font-semibold text-[#254233] shadow-sm transition-all duration-200 hover:bg-white active:scale-95 sm:px-6 sm:py-3 sm:text-[14px]"
              >
                Explore Our Services
              </a>
            </div>

            {/* 3 Feature cards */}
            <div className="hero-banner-features mt-6 grid max-w-[800px] grid-cols-3 gap-3 sm:mt-10 sm:gap-4 lg:max-w-none">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  data-reveal-card
                  className="flex min-w-0 flex-col items-start gap-2.5 rounded-[18px] border border-[#E7EADF] bg-white/95 p-3.5 shadow-[0px_4px_16px_0px_rgba(26,67,36,0.06)] sm:flex-row sm:items-center sm:gap-3 sm:rounded-[20px] sm:px-3 sm:py-3.5 xl:gap-3.5 xl:px-4 xl:py-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#E2F1DA] text-[#267445] sm:h-10 sm:w-10 xl:h-11 xl:w-11">
                    {feature.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span
                      title={feature.title}
                     className="block break-words text-[12px] font-bold leading-tight text-[#18382B] sm:text-[12.5px] xl:text-[13px]">
                      {feature.title}
                    </span>
                    <span
                      title={feature.detail}
                      className="mt-0.5 block break-words text-[10px] text-[#718073] sm:text-[10.5px] xl:text-[11px]">
                      {feature.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column: Garden Image ── */}
          <div className="hero-banner-image relative mt-6 w-full max-w-[560px] flex-1 sm:mt-8 lg:mt-0 lg:max-w-[580px] xl:max-w-[620px]">
            <div
              className="relative aspect-[1.12/1] w-full overflow-hidden shadow-[0px_24px_60px_0px_rgba(22,70,34,0.18)]"
              style={{
                borderRadius: "48px 16px 24px 48px",
              }}
            >
              <img
                ref={imgRef}
                src={heroImage}
                alt="Potted blooming garden plants on display with Green Happier You"
                className="hero-img-animate h-full w-full object-cover object-center transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
