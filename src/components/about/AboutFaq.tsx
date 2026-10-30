import { useState } from "react";
import leafA from "../../assets/about/Component 16.png";
import leafB from "../../assets/about/Component 17.png";
import leafC from "../../assets/about/Component 18.png";
import leafD from "../../assets/about/Component 19.png";
import leafE from "../../assets/about/Component 20.png";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

const faqItems = [
  {
    q: "What types of plants are available at Kanchan Garden?",
    a: "We curate a wide selection of indoor air-purifying foliage, flowering ornamentals, rare exotic succulents, table bonsai, and outdoor landscape varieties—all ethically cultivated in our Bangalore greenhouses.",
  },
  {
    q: "How do I choose the right plant for my home?",
    a: "Start by evaluating your available sunlight (direct, bright indirect, or low light) and your typical watering routine. Each plant on our site features clear light and water tags, and our nursery specialists are always happy to recommend options suited to your space.",
  },
  {
    q: "How should I care for my newly purchased plants?",
    a: "Give your plant 3 to 5 days to acclimate to its new environment before repotting. Keep it away from AC draft vents or extreme afternoon heat, and follow the included botanical care guide for watering instructions.",
  },
  {
    q: "Do you provide gardening supplies and organic fertilizers?",
    a: "Yes! We formulate our own nutrient-rich organic potting mixes, vermicompost, slow-release bio-fertilizers, neem cake, and offer handcrafted terracotta pots and precision pruning tools.",
  },
  {
    q: "How can I track my order?",
    a: "As soon as your plant companion is carefully packaged in our eco-friendly, shock-proof containers and leaves our nursery, you will receive a tracking link via SMS and email with live delivery updates.",
  },
  {
    q: "What should I do if my plant arrives damaged?",
    a: "We back every order with our 7-Day Transit Guarantee. If your plant arrives stressed, damaged, or unhealthy, simply snap a picture and reach out within 48 hours—we will replace it promptly with zero hassle.",
  },
];

export default function AboutFaq() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("faq");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{
        backgroundColor: "#EDF5DC",
      }}
    >
      <AboutEdgeLeaves />

      {/* Decorative leaf images — behind all content */}
      <img
        src={leafA}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ width: 72, top: "6%", left: 20, opacity: 1 }}
      />
      <img
        src={leafE}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ width: 84, top: "4%", right: 16, opacity: 1 }}
      />
      <img
        src={leafC}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ width: 92, top: "38%", right: -14, opacity: 1 }}
      />
      <img
        src={leafD}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ width: 76, bottom: "10%", left: 14, opacity: 1 }}
      />
      <img
        src={leafB}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute select-none"
        style={{ width: 66, top: "44%", left: -10, opacity: 1 }}
      />

      <div className="relative z-10 mx-auto max-w-[720px] px-6 pt-10 pb-12 sm:px-8 sm:pt-11 sm:pb-14 lg:px-4 lg:pt-12 lg:pb-14">
        {/* Centered Heading Group */}
        <div data-about-faq-heading className="mb-8 text-center sm:mb-9">
          <span className="block text-[11px] font-bold tracking-[0.2em] text-[#3d6d4a] uppercase sm:text-xs">
            PLANT CARE, MADE SIMPLE
          </span>
          <h2 className="font-serif-heading mx-auto mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#143826] sm:text-[32px] md:text-[36px]">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-2 max-w-[500px] text-[12.5px] leading-relaxed text-[#4a5d4e] sm:text-[13.5px]">
            Everything you need to know about choosing and caring for your plants.
          </p>
        </div>

        {/* FAQ Accordion Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(20,56,35,0.07)]">
          {faqItems.map((item, i, arr) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                data-about-faq-item
                style={{
                  borderBottom:
                    i < arr.length - 1 ? "1px solid #EDF5E8" : "none",
                }}
                className="transition-colors duration-150"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-6 py-4.5 text-left sm:px-7 sm:py-5 hover:bg-[#FBFDF8] transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4 text-[13px] font-semibold text-[#143826] sm:text-[13.5px]">
                    {item.q}
                  </span>
                  {/* Outlined leaf icon on the right with smooth rotate animation */}
                  <img
                    src={leafD}
                    alt=""
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-90 opacity-100" : "opacity-60"
                    }`}
                  />
                </button>

                {/* Expandable answer panel */}
                <div
                  style={{
                    maxHeight: isOpen ? "350px" : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition:
                      "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                  }}
                >
                  <div className="px-6 pb-5 pt-1 sm:px-7 sm:pb-6 text-[12.5px] sm:text-[13px] leading-relaxed text-[#4a5d4e]">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

