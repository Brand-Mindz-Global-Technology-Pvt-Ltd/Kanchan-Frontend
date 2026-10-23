import HomeEdgeLeaves from "./HomeEdgeLeaves";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

type FeatureItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const features: FeatureItem[] = [
  {
    title: "Quality Garden Essentials",
    description:
      "Fresh selected nursery and vibrant, chemicals free, and ready to the thrive.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Plant Care Made Simple",
    description:
      "Clear guidance and simple care tips, helping you grow confidently at home.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Products for Every Garden",
    description:
      "From compact apartment balconies to large gardens, we've got the right essentials.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "A Greener Way of Living",
    description:
      "Supporting sustainable gardening with eco- friendly products and practices.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8Z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" />
      </svg>
    ),
  },
];

export default function WhyChooseKanchan() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#F0F4DF_0%,#E8EFD8_100%)] pb-[88px] pt-[70px]"
      aria-labelledby="choose-kanchan-heading"
    >
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "-3%", width: "clamp(115px, 18vw, 245px)", opacity: 0.92 },
            right: { top: "0%", width: "clamp(105px, 17vw, 230px)", opacity: 0.9 },
          },
          {
            left: { bottom: "-12%", width: "clamp(110px, 17vw, 235px)", opacity: 0.88 },
            right: { bottom: "-10%", width: "clamp(115px, 18vw, 245px)", opacity: 0.9 },
          },
        ]}
        mobileBorderTreatment
      />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1180px]">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#3B6F45] sm:text-[12px]">
            OUR GARDEN PROMISE
          </p>

          <h2
            id="choose-kanchan-heading"
            aria-label="Why Choose Kanchan Garden?"
            className="mt-2 font-serif text-[28px] font-bold leading-tight text-[#183B2B] sm:text-[34px] lg:text-[38px]"
          >
            <AnimatedHeadingText text="Why Choose Kanchan Garden?" />
          </h2>

          <p
            data-reveal-paragraph
            className="mx-auto mt-2.5 max-w-[640px] text-[13px] leading-relaxed text-[#5E7163] sm:text-[14px]"
          >
            We believe in a deeper connection between humanity and nature, and
            it shows in everything we do.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="flex overflow-x-auto overflow-y-hidden gap-3.5 pb-4 pt-1 snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 sm:pt-0 sm:snap-none lg:grid-cols-4 lg:gap-[27px]">
          {features.map((feature) => (
            <article
              key={feature.title}
              data-reveal-card
              className="group flex h-full min-w-0 w-[87%] shrink-0 snap-start flex-col rounded-[20px] border border-[#E6EDE0]/70 bg-white p-4 shadow-[0px_8px_24px_0px_rgba(26,67,36,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_12px_32px_0px_rgba(26,67,36,0.1)] sm:w-auto sm:shrink sm:snap-align-none sm:p-7"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#DFF1D9] text-[#215732]"
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <h3 className="mt-4 text-[15.5px] font-bold leading-snug text-[#183B2B] sm:text-[16px]">
                {feature.title}
              </h3>

              <p className="mt-2 text-[12.5px] leading-[1.45] text-[#5E7163] sm:text-[13px]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhyChooseKanchan as ChooseKanchan };
