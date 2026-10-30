import zoneA from "../../assets/about/zone A.png";
import zoneB from "../../assets/about/zone B.png";
import zoneC from "../../assets/about/zone C.png";
import zoneD from "../../assets/about/zone D.png";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

export default function BotanicalSanctuary() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("sanctuary");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{
        backgroundColor: "#FCFAF4",
      }}
    >
      <AboutEdgeLeaves />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6 pt-10 pb-9 sm:px-8 sm:pt-11 sm:pb-10 lg:px-10 lg:pt-12 lg:pb-11">
        {/* Section Heading Group & Button */}
        <div data-about-sanctuary-header className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6 sm:mb-7">
          {/* Left Heading Group */}
          <div>
            <span className="block text-[11px] font-bold tracking-[0.2em] text-[#3d6d4a] uppercase sm:text-xs">
              BOTANICAL SANCTUARY
            </span>
            <h2 className="font-serif-heading mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#143826] sm:text-[32px] md:text-[36px]">
              Where Every Seedling Begins
            </h2>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#55635a] sm:text-[13.5px]">
              Walk through our open greenhouse pavilions, experience exotic
              foliage in true light, and consult master gardeners.
            </p>
          </div>

          {/* Right: Plan Your Visit Button */}
          <div className="shrink-0 pb-0.5">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#1B4332] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#143326] sm:text-[13px]"
            >
              {/* Outlined road navigation / diamond arrow icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                aria-hidden="true"
              >
                <path d="M10.29 3.86 1.82 12.33a2.001 2.001 0 0 0 0 2.83l8.47 8.47a2.001 2.001 0 0 0 2.83 0l8.47-8.47a2.001 2.001 0 0 0 0-2.83l-8.47-8.47a2 2 0 0 0-2.83 0z" />
                <path d="M9 14.5v-2a1.5 1.5 0 0 1 1.5-1.5h4m0 0-2-2m2 2-2 2" />
              </svg>
              <span>Plan Your Visit</span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid - exact order Zone A to Zone D */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Card 1: Zone A */}
          <div data-about-sanctuary-card className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
            {/* Photo with Overlay Badge */}
            <div className="relative aspect-[16/11] sm:aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
              <img
                src={zoneA}
                alt="Tropical Aroid Pavilion greenhouse"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-[#224636]/90 px-2.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                ZONE A
              </span>
            </div>
            {/* Content area */}
            <div className="flex flex-1 flex-col p-4.5 sm:p-5">
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
                Tropical Aroid Pavilion
              </h3>
              <p className="mb-4 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Rare monsteras, statement ficus, and humidity-loving
                philodendrons in ambient microclimates.
              </p>
              <div className="mt-auto pt-1 text-[12.5px] font-bold text-[#2d6a4f] sm:text-[13px]">
                220+ Varieties
              </div>
            </div>
          </div>

          {/* Card 2: Zone B */}
          <div data-about-sanctuary-card className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
            {/* Photo with Overlay Badge */}
            <div className="relative aspect-[16/11] sm:aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
              <img
                src={zoneB}
                alt="Succulent and Courtyard greenhouse"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-[#224636]/90 px-2.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                ZONE B
              </span>
            </div>
            {/* Content area */}
            <div className="flex flex-1 flex-col p-4.5 sm:p-5">
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
                Succulent &amp; Courtyard
              </h3>
              <p className="mb-4 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Hardy desert companions, low-water architectural plants, and
                matured Japanese bonsai pots.
              </p>
              <div className="mt-auto pt-1 text-[12.5px] font-bold text-[#2d6a4f] sm:text-[13px]">
                Low-Maintenance
              </div>
            </div>
          </div>

          {/* Card 3: Zone C */}
          <div data-about-sanctuary-card className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
            {/* Photo with Overlay Badge */}
            <div className="relative aspect-[16/11] sm:aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
              <img
                src={zoneC}
                alt="Bio-Media and Soil Lab work bench"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-[#224636]/90 px-2.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                ZONE C
              </span>
            </div>
            {/* Content area */}
            <div className="flex flex-1 flex-col p-4.5 sm:p-5">
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
                Bio-Media &amp; Soil Lab
              </h3>
              <p className="mb-4 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Custom hand-blended organic potting media, microbial tonics,
                and slow-release natural feed.
              </p>
              <div className="mt-auto pt-1 text-[12.5px] font-bold text-[#2d6a4f] sm:text-[13px]">
                Peat-Free Mixes
              </div>
            </div>
          </div>

          {/* Card 4: Zone D */}
          <div data-about-sanctuary-card className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
            {/* Photo with Overlay Badge */}
            <div className="relative aspect-[16/11] sm:aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
              <img
                src={zoneD}
                alt="Plant Doctor Clinic counter and consultation"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-2.5 left-2.5 rounded-full bg-[#224636]/90 px-2.5 py-0.5 text-[9.5px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                ZONE D
              </span>
            </div>
            {/* Content area */}
            <div className="flex flex-1 flex-col p-4.5 sm:p-5">
              <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
                Plant Doctor Clinic
              </h3>
              <p className="mb-4 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Complimentary repotting guidance, pest diagnostics, and
                lighting analysis for your home.
              </p>
              <div className="mt-auto pt-1 text-[12.5px] font-bold text-[#2d6a4f] sm:text-[13px]">
                Free Walk-In Help
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Information Bar */}
        <div data-about-sanctuary-info className="mt-5.5 flex flex-col gap-4 rounded-2xl bg-[#F0F3FB] px-6 py-3.5 sm:mt-6 sm:px-8 sm:py-4 md:flex-row md:items-center md:justify-between">
          {/* Group 1: Visiting hours */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#AAD1B3] text-[#143826]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#143826"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <h4 className="text-[13px] font-bold leading-tight text-[#143826]">
                Nursery Visiting Hours
              </h4>
              <p className="mt-0.5 text-[11.5px] leading-tight text-[#55635a]">
                Mon – Sat: 9:00am – 7:30pm | Sun: 10:00am – 5:00pm
              </p>
            </div>
          </div>

          {/* Group 2: Address */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#AAD1B3] text-[#143826]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#143826"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h4 className="text-[13px] font-bold leading-tight text-[#143826]">
                125-Greenery Street
              </h4>
              <p className="mt-0.5 text-[11.5px] leading-tight text-[#55635a]">
                Koramangala 4th Block, Bangalore 560001
              </p>
            </div>
          </div>

          {/* Group 2: Visitor status */}
          <div className="flex items-center gap-2.5">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#059669]"
              aria-hidden="true"
            />
            <span className="text-[12.5px] font-semibold text-[#143826]">
              Open Today for Visitors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

