const careCards = [
  {
    title: "LIGHT",
    description: "Low to bright indirect light. Avoid direct scorching sun.",
    bgColor: "#FEF9EC",
    badgeColor: "#F59E0B",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-[#D97706]"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
  {
    title: "WATER",
    description:
      "Water once every 2-3 weeks. Allow soil to dry completely between waterings.",
    bgColor: "#EFF6FF",
    badgeColor: "#3B82F6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-[#2563EB]"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    title: "HUMIDITY",
    description:
      "Adapts to average room humidity (40-60%). Tolerates dry indoor air easily.",
    bgColor: "#ECFDF5",
    badgeColor: "#10B981",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-[#059669]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v8" />
        <path d="m8 12 4 4 4-4" />
      </svg>
    ),
  },
  {
    title: "TEMPERATURE",
    description:
      "Ideal 18°C – 27°C. Keep away from cold drafts and air conditioning vents.",
    bgColor: "#FEF2F2",
    badgeColor: "#EF4444",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-[#DC2626]"
      >
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
      </svg>
    ),
  },
  {
    title: "PET SAFETY",
    description:
      "Mildly toxic if consumed. Keep out of reach of curious cats and dogs.",
    bgColor: "#F5F3FF",
    badgeColor: "#8B5CF6",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4.5 w-4.5 text-[#7C3AED]"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m4.93 4.93 14.14 14.14" />
      </svg>
    ),
  },
];

export default function ProductCareGuide() {
  return (
    <section
      aria-label="Plant Care & Advice"
      className="w-full rounded-[24px] border border-[#E6EADF] bg-white p-5 shadow-[0_4px_20px_rgba(20,56,38,0.06)] sm:p-7"
    >
      {/* Header */}
      <div className="mb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B6F45]">
          PLANT CARE &amp; ADVICE
        </span>
        <h2 className="font-serif-heading mt-1 text-[22px] font-bold text-[#18382B] sm:text-[26px]">
          How to Keep Your Snake Plant Zeylanica
        </h2>
        <p className="mt-1 text-[13px] text-[#5E7163]">
          This plant thrives on minimal attention. Here&apos;s all you need to keep it happy and lush indoors year-round.
        </p>
      </div>

      {/* 5 Care Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 sm:gap-3.5">
        {careCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-[16px] border border-[#EAEFE5] p-3.5 shadow-[0_2px_10px_rgba(20,56,38,0.04)] transition-all hover:shadow-[0_4px_14px_rgba(20,56,38,0.07)] hover:border-[#CCD8C4]"
            style={{ backgroundColor: card.bgColor }}
          >
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wider text-[#18382B]">
                {card.title}
              </span>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-2xs">
                {card.icon}
              </div>
            </div>
            <p className="text-[11.5px] leading-relaxed text-[#5E7163]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

