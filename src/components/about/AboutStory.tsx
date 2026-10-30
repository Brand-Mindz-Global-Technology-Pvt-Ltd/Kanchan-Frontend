import containerLeft from "../../assets/Container.png";
import containerRight from "../../assets/Container (1).png";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

export default function AboutStory() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("story");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{
        backgroundColor: "#FCFAF4",
      }}
    >
      <AboutEdgeLeaves />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6 pt-11 pb-8 sm:px-8 sm:pt-12 sm:pb-9 lg:px-10 lg:pt-12 lg:pb-10">
        {/* Section Heading Group */}
        <div data-about-story-heading className="mb-6 text-center sm:mb-7">
          <span className="block text-[11px] font-bold tracking-[0.2em] text-[#3d6d4a] uppercase sm:text-xs">
            HOW WE BEGAN
          </span>
          <h2 className="font-serif-heading mx-auto mt-2 max-w-[720px] text-[26px] font-bold leading-[1.18] tracking-tight text-[#143826] sm:text-[34px] md:text-[38px] lg:text-[42px]">
            From a Passion for Foliage to a Living
            <br className="hidden sm:inline" /> Sanctuary
          </h2>
        </div>

        {/* Two-Column Content: Left Image Collage, Right Narrative */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: 4-image asymmetric collage rendered using the combined container images */}
          <div data-about-story-collage className="flex justify-center lg:col-span-6 lg:justify-start">
            <div className="grid w-full max-w-[430px] grid-cols-2 gap-3 items-start sm:gap-3.5">
              <img
                src={containerLeft}
                alt="Hands potting a tropical plant in a terracotta pot, and greenhouse nursery rows with person tending plants"
                className="w-full h-auto object-contain"
              />
              <img
                src={containerRight}
                alt="Indoor nursery shelving filled with pots and plants, and lush greenhouse walkway with tropical plants"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column: Quotation, Paragraphs, Trust Indicators */}
          <div data-about-story-narrative className="flex flex-col lg:col-span-6 lg:pl-1">
            {/* Quotation */}
            <div
              className="mb-4 pl-3.5 sm:pl-4"
              style={{ borderLeft: "3px solid #94b89b" }}
            >
              <p className="font-body-copy text-[14.5px] font-semibold italic leading-[1.45] text-[#143826] sm:text-[15.5px] md:text-[16.5px]">
                &ldquo;We believe bringing nature indoors transforms everyday
                urban apartments into restorative sanctuaries of life and
                stillness.&rdquo;
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-3 text-[12.5px] leading-[1.6] text-[#55635a] sm:text-[13px] md:text-[13.5px]">
              <p>
                Kanchan Garden started with a singular observation: far too
                many nursery plants struggle when brought into real urban
                apartments. They were grown in synthetic stimulants, packed in
                suffocating coco-peat, and stressed by unacclimated climate
                changes.
              </p>
              <p>
                We established our open-canopy nursery in Bangalore to redefine
                that relationship. Every plant we propagate spends weeks
                acclimatizing to indoor-realistic ambient conditions,
                developing sturdy root systems in nutrient-dense organic
                mixes before leaving our glasshouses.
              </p>
              <p>
                Today, we combine generational horticulturist insight with
                sustainable bio-fertilizers, plastic-free transit, and
                personalized lifelong plant parenting care so you never have
                to guess what your plant needs.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-5 flex flex-wrap items-center gap-6 pt-1 sm:gap-7">
              {/* 100% Acclimatized */}
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#267445"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5 shrink-0 text-[#267445]"
                  aria-hidden="true"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-[12.5px] font-bold text-[#143826] sm:text-[13.5px]">
                  100% Acclimatized
                </span>
              </div>

              {/* Zero Single-Use Plastic */}
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#267445"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5 shrink-0 text-[#267445]"
                  aria-hidden="true"
                >
                  <path d="M8 4.5h6a2 2 0 0 1 1.7 1l3 5.2" />
                  <path d="m16.5 10.7 2.2.3.8-2" />
                  <path d="M18.7 13.2l-3 5.2a2 2 0 0 1-1.7 1h-6" />
                  <path d="m9.5 17.5-1.5 1.7 1.8 1.1" />
                  <path d="M6 17.5l-3-5.2a2 2 0 0 1 0-2l3-5.2" />
                  <path d="m6 6.8-.7-2.1-1.9 1" />
                </svg>
                <span className="text-[12.5px] font-bold text-[#143826] sm:text-[13.5px]">
                  Zero Single-Use Plastic
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

