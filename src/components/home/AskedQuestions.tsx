import { useState } from "react";
import HomeEdgeLeaves from "./HomeEdgeLeaves";

import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What types of plants are available Kanchan Garden?",
    answer:
      "We offer a diverse collection of indoor and outdoor plants, including lush tropical foliage like Monstera Deliciosa and Areca Palms, resilient low-light varieties like Snake Plants, flowering specimens like Peace Lilies, and certified air-purifying selections suited for all living and office spaces.",
  },
  {
    question: "How do I choose the right plant for my home?",
    answer:
      "Consider your room's natural lighting, ambient humidity, and how much time you have for routine care. For low to medium indirect light, Snake Plants and ZZ plants thrive effortlessly. If you have bright, sun-kissed windows, Monsteras and tropical palms are ideal choices. Our care filters and detailed plant tags help you find the perfect match.",
  },
  {
    question: "How should I care for my newly purchased plants?",
    answer:
      "Give your plant 2 to 3 days to adjust to its new surroundings before repotting. Place it in indirect sunlight, inspect soil moisture before watering, and ensure good pot drainage. Keep newly arrived plants away from harsh direct drafts, heaters, or continuous air conditioning vents.",
  },
  {
    question: "Do you provide gardening supplies and organic fertilizers?",
    answer:
      "Yes, we supply nutrient-dense potting mixes, organic vermicompost, slow-release bio-fertilizers, cold-pressed neem oil pest protection sprays, stylish handcrafted planters, and durable gardening tools to help you cultivate healthy plants.",
  },
  {
    question: "How can I track my order?",
    answer:
      "As soon as your plants are safely packed and dispatched, we will send an automated tracking link to your registered email and WhatsApp. You can monitor the real-time courier transit and estimated delivery window anytime.",
  },
  {
    question: "What should I do if my plant arrives damaged?",
    answer:
      "We ship all living plants in specialized, shock-absorbing, and ventilated transit containers. In the rare case of transit damage, simply reach out to our customer support within 48 hours with a clear photo, and we will issue an immediate free replacement or full refund.",
  },
];

function AskedQuestions() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#EDF3E2] py-16 sm:py-20 lg:py-24"
      aria-labelledby="faq-heading"
    >
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "0%", width: "clamp(110px, 17vw, 235px)", opacity: 0.9 },
            right: { top: "0%", width: "clamp(110px, 17vw, 235px)", opacity: 0.9 },
          },
          {
            left: { bottom: "-8%", width: "clamp(120px, 18vw, 245px)", opacity: 0.9 },
            right: { bottom: "-8%", width: "clamp(110px, 17vw, 230px)", opacity: 0.88 },
          },
        ]}
        mobileBorderTreatment
      />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1240px]">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#3B6F45] sm:text-[12px]">
            PLANT CARE, MADE SIMPLE
          </p>

          <h2
            id="faq-heading"
            aria-label="Frequently Asked Questions"
            className="mt-2 font-serif text-[28px] font-bold leading-tight text-[#183B2B] sm:text-[34px] lg:text-[40px]"
          >
            <AnimatedHeadingText text="Frequently Asked Questions" />
          </h2>

          <p
            data-reveal-paragraph
            className="mx-auto mt-2.5 max-w-[620px] text-[13px] leading-relaxed text-[#5E7163] sm:text-[14px]"
          >
            Everything you need to know about choosing and caring for your plants.
          </p>
        </div>

        {/* ── FAQ Centered White Container (~940px wide) ── */}
        <div className="mx-auto max-w-[940px] overflow-hidden rounded-[20px] border border-[#E2EADC]/80 bg-white/95 shadow-[0px_10px_30px_0px_rgba(26,67,36,0.06)] backdrop-blur-sm sm:rounded-[24px]">
          <div className="divide-y divide-[#EEF3EA]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  data-reveal-card
                  className="transition-colors duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between px-6 py-4.5 text-left transition-colors hover:bg-[#F9FCF5] sm:px-8 sm:py-[18px]"
                  >
                    <span className="text-[14px] font-semibold text-[#183B2B] sm:text-[15.5px]">
                      {faq.question}
                    </span>

                    {/* Small outlined green leaf icon on the right */}
                    <span
                      className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-[#2D613D]" : "text-[#7DA87B]"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-[18px] w-[18px]"
                      >
                        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
                      </svg>
                    </span>
                  </button>

                  {/* Accordion Answer */}
                  {isOpen && (
                    <div className="animate-fadeIn px-6 pb-5 pt-0 sm:px-8 sm:pb-6">
                      <p className="text-[13px] leading-relaxed text-[#5A6D5E] sm:text-[14px]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AskedQuestions;
