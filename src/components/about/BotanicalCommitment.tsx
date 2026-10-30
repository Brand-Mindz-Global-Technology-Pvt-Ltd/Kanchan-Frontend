import BotanicalLeaf from "./BotanicalLeaf";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

export default function BotanicalCommitment() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("commitment");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{
        backgroundColor: "#EDF5DC",
      }}
    >
      <AboutEdgeLeaves />

      {/* Subtle Botanical Leaf Illustrations positioned matching screenshot 2 */}
      <BotanicalLeaf
        className="w-14 sm:w-18"
        style={{ top: "7%", left: "26%", transform: "rotate(20deg)" }}
      />
      <BotanicalLeaf
        className="w-16 sm:w-20"
        style={{ top: "18%", left: "-25px", transform: "rotate(-15deg)" }}
      />
      <BotanicalLeaf
        className="w-14 sm:w-18"
        style={{ bottom: "2%", left: "1%", transform: "rotate(40deg)" }}
      />
      <BotanicalLeaf
        className="w-16 sm:w-20"
        style={{ top: "8%", right: "14%", transform: "rotate(-25deg)" }}
      />
      <BotanicalLeaf
        className="w-20 sm:w-26"
        style={{ bottom: "10%", right: "-30px", transform: "rotate(35deg)" }}
      />
      <BotanicalLeaf
        className="w-14 sm:w-18"
        style={{ bottom: "-20px", left: "48%", transform: "rotate(60deg)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6 pt-10 pb-8 sm:px-8 sm:pt-11 sm:pb-9 lg:px-10 lg:pt-12 lg:pb-10">
        {/* Centered Heading Group */}
        <div data-about-commitment-heading className="mb-6 text-center sm:mb-7">
          <span className="block text-[11px] font-bold tracking-[0.2em] text-[#355e3b] uppercase sm:text-xs">
            OUR BOTANICAL COMMITMENT
          </span>
          <h2 className="font-serif-heading mx-auto mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#143826] sm:text-[32px] md:text-[36px]">
            The Principles That Root Us
          </h2>
          <p className="mx-auto mt-2 max-w-[620px] text-[12.5px] leading-relaxed text-[#4a5d4e] sm:text-[13.5px]">
            We believe in a deeper connection between humanity and nature, and
            it shows in everything we do.
          </p>
        </div>

        {/* 4 Cards Grid - single horizontal row at desktop */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Card 1: Acclimated & Resilient */}
          <div data-about-commitment-card className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7EEFF] text-[#0F392B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F392B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path
                  d="M12 8.5c-.8-1-2.2-1-3 .2-.7 1.1-.3 2.5 1.5 3.8l1.5 1.2 1.5-1.2c1.8-1.3 2.2-2.7 1.5-3.8-.8-1.2-2.2-1.2-3-.2z"
                  fill="#0F392B"
                  stroke="none"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
              Acclimated &amp; Resilient
            </h3>
            <p className="text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
              Pre-hardened in realistic home lighting environments to
              eliminate the sudden leaf-drop and transport shock typical of
              commercial nurseries.
            </p>
          </div>

          {/* Card 2: Living Bio-Soil Media */}
          <div data-about-commitment-card className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7EEFF] text-[#0F392B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F392B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
                aria-hidden="true"
              >
                <path d="M12 3a9 9 0 1 0 9 9" />
                <path d="m19 2 2 3-3.5.5" />
                <path d="M12 16v-4" />
                <path
                  d="M12 12c-2 0-3-1-3-2.5 1.5 0 2.5.5 3 2.5z"
                  fill="#0F392B"
                  stroke="none"
                />
                <path
                  d="M12 14c2 0 3-1 3-2.5-1.5 0-2.5.5-3 2.5z"
                  fill="#0F392B"
                  stroke="none"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
              Living Bio-Soil Media
            </h3>
            <p className="text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
              100% peat-free growing mediums fortified with native leaf mould,
              beneficial mycorrhizal fungi, and organic worm castings for
              lively roots.
            </p>
          </div>

          {/* Card 3: Cushioned Transit */}
          <div data-about-commitment-card className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7EEFF] text-[#0F392B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F392B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
                aria-hidden="true"
              >
                <rect x="4" y="4" width="16" height="4.5" rx="1.5" />
                <rect x="4.5" y="8.5" width="15" height="11" rx="1.5" />
                <line x1="10" y1="13.5" x2="14" y2="13.5" />
              </svg>
            </div>
            <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
              Cushioned Transit
            </h3>
            <p className="text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
              Bespoke breathable, zero-plastic packaging with biodegradable
              honeycomb wrap and stabilized soil anchors that guarantee safe
              pan-India arrivals.
            </p>
          </div>

          {/* Card 4: Lifetime Plant Care */}
          <div data-about-commitment-card className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
            <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#E7EEFF] text-[#0F392B]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0F392B"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
                aria-hidden="true"
              >
                <path
                  d="M18.5 4.5c-.8-.8-2-.8-2.8 0l-.7.7-.7-.7c-.8-.8-2-.8-2.8 0s-.8 2 0 2.8l3.5 3.5 3.5-3.5c.8-.8.8-2 0-2.8z"
                  fill="#0F392B"
                  stroke="none"
                />
                <path d="M3 13.5h3v6H3z" />
                <path d="M6 15h6a2 2 0 0 1 1.8 1.1l1.2 1.9c.4.6.2 1.3-.3 1.7l-.4.3H6" />
              </svg>
            </div>
            <h3 className="mb-2 text-[15px] font-bold leading-snug text-[#143826] sm:text-[15.5px]">
              Lifetime Plant Care
            </h3>
            <p className="text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
              Complimentary direct access to our seasoned Bangalore
              horticulturists via WhatsApp. Send photos anytime for
              diagnostics, pruning, and light tips.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

