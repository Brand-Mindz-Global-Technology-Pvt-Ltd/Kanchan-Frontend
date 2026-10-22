import heroImage from "../../assets/hero-image.png";
import leafTwo from "../../assets/leaves/leaf-2.png";
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
        className="h-4 w-4"
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

  return (
    <section
      ref={sectionRef}
      className="hero-banner-mobile relative isolate w-full overflow-hidden bg-[linear-gradient(90deg,#FCFAF3_0%,#F8F6EB_38%,#ECF4DE_75%,#E3EED3_100%)] py-8 sm:py-14 lg:py-16"
    >
      <style>{`
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
            gap: 3px;
            padding: 3px;
            border-radius: 7px;
          }

          .hero-banner-mobile [data-reveal-card] > span {
            width: 16px;
            height: 16px;
            border-radius: 5px;
          }

          .hero-banner-mobile [data-reveal-card] svg {
            width: 10px;
            height: 10px;
          }

          .hero-banner-mobile [data-reveal-card] div > span:first-child {
            font-size: 6px;
          }

          .hero-banner-mobile [data-reveal-card] div > span:last-child {
            font-size: 5px;
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
            width: 18px;
            height: 18px;
          }

          .hero-banner-mobile [data-reveal-card] div > span:first-child {
            font-size: 7px;
          }

          .hero-banner-mobile [data-reveal-card] div > span:last-child {
            font-size: 6px;
          }
        }
      `}</style>
      {homeDecorations && (
        <HomeEdgeLeaves
          placements={[
            {
              left: { top: "-8%", width: "clamp(110px, 18vw, 250px)", opacity: 0.94 },
              right: { top: "-4%", width: "clamp(120px, 19vw, 260px)", opacity: 0.94 },
            },
            {
              left: { bottom: "-10%", width: "clamp(100px, 16vw, 220px)", opacity: 0.9 },
              right: { bottom: "-12%", width: "clamp(110px, 17vw, 235px)", opacity: 0.9 },
            },
          ]}
        />
      )}

      <div className="relative z-10 mx-auto w-[92%] max-w-[1320px]">
        <div className="hero-banner-layout flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-10 xl:gap-14">
          
          {/* ── Left Column: Text & Features ── */}
          <div className="hero-banner-copy relative z-10 w-full shrink-0 lg:max-w-[560px] xl:max-w-[600px]">
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
                className="pointer-events-none absolute right-4 top-1/2 hidden h-auto w-12 -translate-y-1/2 rotate-25 opacity-75 sm:block lg:right-6 lg:w-14"
              />
            </div>

            {/* Paragraph */}
            <p
              data-reveal-paragraph
              className="hero-banner-description mt-4 max-w-[460px] text-[14px] leading-relaxed text-[#637365] sm:mt-5 sm:text-[15px]"
            >
              Everything you need to grow, nurture, and create your own serene
              sanctuary. From rare tropical foliage to seeds and organic
              nourishment.
            </p>

            {/* CTA Buttons */}
            <div className="hero-banner-ctas mt-6 flex flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-4">
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
            <div className="hero-banner-features mt-6 grid max-w-[500px] grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  data-reveal-card
                  className="flex min-w-0 flex-col items-start gap-1.5 rounded-[14px] border border-[#E7EADF] bg-white/95 p-2 shadow-[0px_4px_16px_0px_rgba(26,67,36,0.06)] sm:flex-row sm:items-center sm:gap-2.5 sm:rounded-[16px] sm:p-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-[#E2F1DA] text-[#267445] sm:h-9 sm:w-9">
                    {feature.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[10.5px] font-bold leading-tight text-[#18382B] sm:text-[11.5px]">
                      {feature.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[8.5px] text-[#718073] sm:text-[9.5px]">
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
                src={heroImage}
                alt="Potted blooming garden plants on display with Green Happier You"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
