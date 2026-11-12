const benefits = [
  {
    title: "Easy to Care",
    description:
      "Thrives on neglect, drought-tolerant, forgiving of irregular watering schedule.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#215732]"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Natural Air Purifier",
    description:
      "Filters airborne VOCs day and night for clean, revitalizing home air.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#215732]"
      >
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8Z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z" />
      </svg>
    ),
  },
  {
    title: "Nursery-Grown Quality",
    description:
      "Healthy roots and pest-free foliage grown with love in Kanchan nurseries.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#215732]"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    title: "Safe Frame Packaging",
    description:
      "Specially padded, breathable shipping box protects foliage and pot.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-[#215732]"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
  },
];

export default function ProductBenefits() {
  return (
    <section aria-label="Product Benefits" className="w-full">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
        {benefits.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3.5 rounded-[20px] border border-[#E6EADF] bg-white p-4 shadow-[0_4px_20px_rgba(20,56,38,0.06)] sm:p-5 transition-all hover:shadow-[0_6px_24px_rgba(20,56,38,0.09)]"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#EAF3E7] text-[#215732]">
              {item.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[13.5px] font-bold text-[#18382B]">
                {item.title}
              </h3>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[#5E7163]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

