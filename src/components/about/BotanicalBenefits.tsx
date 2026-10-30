import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

const benefits = [
  {
    title: "Botanical Variety",
    description: "Indoor, outdoor, and exotic foliage",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 sm:h-5.5 sm:w-5.5"
        aria-hidden="true"
      >
        <path d="M12 22V11" />
        <path d="M12 11c0-4 3.5-7 7.5-7 0 4-3 7.5-7.5 7.5Z" />
        <path d="M12 15c0-3.5-3-6-6.5-6 0 3.5 2.5 6 6.5 6Z" />
        <path d="M12 18c0-3 2.5-5 5.5-5 0 3-2 5-5.5 5Z" />
      </svg>
    ),
  },
  {
    title: "Organic Inputs",
    description: "Nutrient-rich, chemical-free soils",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 sm:h-5.5 sm:w-5.5"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    title: "Safe Delivery",
    description: "Breathable, shock-proof packaging",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 sm:h-5.5 sm:w-5.5"
        aria-hidden="true"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
  {
    title: "Expert Plant Care",
    description: "Guidance for every stage of growth",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 sm:h-5.5 sm:w-5.5"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        <path d="M12 9v4" />
      </svg>
    ),
  },
] as const;

export default function BotanicalBenefits() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("benefits");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{
        backgroundColor: "#EDF5DC",
      }}
    >
      <div className="relative z-10 mx-auto max-w-[1140px] px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
        <div className="grid grid-cols-1 gap-4 min-[440px]:grid-cols-2 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              data-about-benefit-item
              className="group flex h-full min-w-0 flex-col items-center rounded-[20px] border border-[#DCE7CF] bg-white/95 p-5 text-center shadow-[0px_4px_18px_0px_rgba(20,56,38,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#C4D9B0] hover:bg-white hover:shadow-[0px_10px_26px_0px_rgba(20,56,38,0.12)] sm:p-6"
            >
              <div className="mb-3.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E2F0D4] text-[#1D5E38] transition-transform duration-300 ease-out group-hover:scale-110 sm:h-12 sm:w-12">
                {benefit.icon}
              </div>
              <h3 className="font-serif-heading text-[16.5px] font-bold text-[#143826] sm:text-[17.5px] md:text-[18px]">
                {benefit.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#4A5D4E] sm:text-[13px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
