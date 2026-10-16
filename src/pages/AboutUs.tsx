import containerLeft from "../assets/Container.png";
import containerRight from "../assets/Container (1).png";
import zoneA from "../assets/about/zone A.png";
import zoneB from "../assets/about/zone B.png";
import zoneC from "../assets/about/zone C.png";
import zoneD from "../assets/about/zone D.png";
import person1 from "../assets/about/person1.png";
import person2 from "../assets/about/person2.png";
import person3 from "../assets/about/person3.png";
import person4 from "../assets/about/person4.png";
import leafA from "../assets/about/Component 16.png";
import leafB from "../assets/about/Component 17.png";
import leafC from "../assets/about/Component 18.png";
import leafD from "../assets/about/Component 19.png";
import leafE from "../assets/about/Component 20.png";
import greenhouse from "../assets/about/greenhouse.png";
import { useState } from "react";

// Minimalist botanical outline leaf illustration matching screenshot 2
function BotanicalLeaf({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M 50 120 L 50 15"
        stroke="#C9E1B0"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M 50 112 C 16 80 12 32 50 15 C 88 32 84 80 50 112 Z"
        stroke="#C9E1B0"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AboutUs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  return (
    <div className="w-full text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* White section separator between HeroBanner and Section 2 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 2: HOW WE BEGAN
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="w-full font-body-copy"
        style={{
          backgroundColor: "#FCFAF4",
        }}
      >
        <div className="mx-auto max-w-[1140px] px-6 pt-11 pb-8 sm:px-8 sm:pt-12 sm:pb-9 lg:px-10 lg:pt-12 lg:pb-10">
          {/* Section Heading Group */}
          <div className="mb-6 text-center sm:mb-7">
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
            <div className="flex justify-center lg:col-span-6 lg:justify-start">
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
            <div className="flex flex-col lg:col-span-6 lg:pl-1">
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

      {/* White section separator between Section 2 and Section 3 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 3: OUR BOTANICAL COMMITMENT
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="relative isolate w-full overflow-hidden font-body-copy"
        style={{
          backgroundColor: "#EDF5DC",
        }}
      >
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
          <div className="mb-6 text-center sm:mb-7">
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
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
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
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
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
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
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
            <div className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_2px_12px_rgba(20,56,35,0.04)] sm:p-5.5">
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

      {/* White section separator between Section 3 and Section 4 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 4: BOTANICAL SANCTUARY - WHERE EVERY SEEDLING BEGINS
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="w-full font-body-copy"
        style={{
          backgroundColor: "#FCFAF4",
        }}
      >
        <div className="mx-auto max-w-[1140px] px-6 pt-10 pb-9 sm:px-8 sm:pt-11 sm:pb-10 lg:px-10 lg:pt-12 lg:pb-11">
          {/* Section Heading Group & Button */}
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6 sm:mb-7">
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
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
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
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
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
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
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
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(20,56,35,0.04)]">
              {/* Photo with Overlay Badge */}
              <div className="relative aspect-[308/192] w-full overflow-hidden bg-[#e8efe9]">
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
          <div className="mt-5.5 flex flex-col gap-4 rounded-2xl bg-[#F0F3FB] px-6 py-3.5 sm:mt-6 sm:px-8 sm:py-4 md:flex-row md:items-center md:justify-between">
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

            {/* Group 3: Visitor status */}
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

      {/* White section separator between Section 4 and Section 5 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 5: MEET THE CARETAKERS
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="relative isolate w-full overflow-hidden font-body-copy"
        style={{ backgroundColor: "#EDF5DC" }}
      >
        {/* Decorative botanical leaf outlines — same component already in Section 3 */}
        <BotanicalLeaf
          className="w-14 sm:w-18"
          style={{ top: "5%", left: "-18px", transform: "rotate(-12deg)" }}
        />
        <BotanicalLeaf
          className="w-16 sm:w-20"
          style={{ top: "15%", right: "-20px", transform: "rotate(18deg)" }}
        />
        <BotanicalLeaf
          className="w-14 sm:w-16"
          style={{ bottom: "10%", left: "1%", transform: "rotate(35deg)" }}
        />
        <BotanicalLeaf
          className="w-14 sm:w-16"
          style={{ bottom: "5%", right: "-14px", transform: "rotate(-30deg)" }}
        />

        <div className="relative z-10 mx-auto max-w-[1140px] px-6 pt-10 pb-10 sm:px-8 sm:pt-11 sm:pb-11 lg:px-10 lg:pt-12 lg:pb-12">
          {/* Centered Heading Group */}
          <div className="mb-8 text-center sm:mb-9">
            <span className="block text-[11px] font-bold tracking-[0.2em] text-[#3d6d4a] uppercase sm:text-xs">
              MEET THE CARETAKERS
            </span>
            <h2 className="font-serif-heading mx-auto mt-2 text-[26px] font-bold leading-tight tracking-tight text-[#143826] sm:text-[32px] md:text-[36px]">
              The Green Thumbs Behind the Foliage
            </h2>
            <p className="mx-auto mt-2 max-w-[580px] text-[12.5px] leading-relaxed text-[#4a5d4e] sm:text-[13.5px]">
              Decades of scientific botanical research combined with a deep love
              for living greenery.
            </p>
          </div>

          {/* 4 Team Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {/* Card 1 — Dr. Vimal Kanchan */}
            <div className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
              {/* Portrait */}
              <div className="mb-4 h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={person1}
                  alt="Dr. Vimal Kanchan"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-[15px] font-bold text-[#143826] sm:text-[15.5px]">
                Dr. Vimal Kanchan
              </h3>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-[#3d6d4a] uppercase sm:text-[10.5px]">
                FOUNDER &amp; CHIEF HORTICULTURIST
              </p>
              <p className="mt-3 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Over 30 years researching tropical aroid acclimation and
                indigenous bio-fertility in Indian climates.
              </p>
              <div className="mt-4 inline-block rounded-full bg-[#E7EEFF] px-3 py-1 text-[10.5px] font-semibold text-[#143826]">
                Specialty: Aroids &amp; Ficus
              </div>
            </div>

            {/* Card 2 — Priya Sundaram */}
            <div className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
              <div className="mb-4 h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={person2}
                  alt="Priya Sundaram"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-[15px] font-bold text-[#143826] sm:text-[15.5px]">
                Priya Sundaram
              </h3>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-[#3d6d4a] uppercase sm:text-[10.5px]">
                PLANT ACCLIMATION LEAD
              </p>
              <p className="mt-3 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Leads our 21-day quarantine &amp; indoor lighting hardening
                process to guarantee resilient transitions into homes.
              </p>
              <div className="mt-4 inline-block rounded-full bg-[#E7EEFF] px-3 py-1 text-[10.5px] font-semibold text-[#143826]">
                Specialty: Root Hardiness
              </div>
            </div>

            {/* Card 3 — Arjun Nambiar */}
            <div className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
              <div className="mb-4 h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={person3}
                  alt="Arjun Nambiar"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-[15px] font-bold text-[#143826] sm:text-[15.5px]">
                Arjun Nambiar
              </h3>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-[#3d6d4a] uppercase sm:text-[10.5px]">
                SOIL NUTRITION SPECIALIST
              </p>
              <p className="mt-3 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Master blender behind our 100% peat-free media, integrating
                living mycorrhizae and aerating volcanic pumice.
              </p>
              <div className="mt-4 inline-block rounded-full bg-[#E7EEFF] px-3 py-1 text-[10.5px] font-semibold text-[#143826]">
                Specialty: Living Bio-Soil
              </div>
            </div>

            {/* Card 4 — Ananya Rao */}
            <div className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
              <div className="mb-4 h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full">
                <img
                  src={person4}
                  alt="Ananya Rao"
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-[15px] font-bold text-[#143826] sm:text-[15.5px]">
                Ananya Rao
              </h3>
              <p className="mt-0.5 text-[10px] font-bold tracking-[0.12em] text-[#3d6d4a] uppercase sm:text-[10.5px]">
                INTERIOR PLANT STYLIST
              </p>
              <p className="mt-3 text-[11.5px] leading-[1.55] text-[#55635a] sm:text-[12px]">
                Guides urban homeowners in curating harmonious, sculptural
                plant setups tailored to window orientations.
              </p>
              <div className="mt-4 inline-block rounded-full bg-[#E7EEFF] px-3 py-1 text-[10.5px] font-semibold text-[#143826]">
                Specialty: Lighting Layouts
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White section separator between Section 5 and Section 6 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 6: BOTANICAL BENEFITS
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="w-full font-body-copy"
        style={{
          backgroundColor: "#EDF5DC",
        }}
      >
        <div className="mx-auto max-w-[1140px] px-6 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">
            {/* Benefit 1 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif-heading text-[17px] font-bold text-[#143826] sm:text-[18px] md:text-[19px]">
                Botanical Variety
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#4a5d4e] sm:text-[12.5px]">
                Indoor, outdoor, and exotic foliage
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif-heading text-[17px] font-bold text-[#143826] sm:text-[18px] md:text-[19px]">
                Organic Inputs
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#4a5d4e] sm:text-[12.5px]">
                Nutrient-rich, chemical-free soils
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif-heading text-[17px] font-bold text-[#143826] sm:text-[18px] md:text-[19px]">
                Safe Delivery
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#4a5d4e] sm:text-[12.5px]">
                Breathable, shock-proof packaging
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="flex flex-col items-center text-center">
              <h3 className="font-serif-heading text-[17px] font-bold text-[#143826] sm:text-[18px] md:text-[19px]">
                Expert Plant Care
              </h3>
              <p className="mt-1 text-[12px] leading-relaxed text-[#4a5d4e] sm:text-[12.5px]">
                Guidance for every stage of growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* White section separator between Section 6 and Section 7 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 7: FREQUENTLY ASKED QUESTIONS
          Exact Figma Layout & Dimensions with Interactive Accordion
          ========================================================================= */}
      <section
        className="relative isolate w-full overflow-hidden font-body-copy"
        style={{
          backgroundColor: "#EDF5DC",
        }}
      >
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
          <div className="mb-8 text-center sm:mb-9">
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
                      transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
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

      {/* White section separator between Section 7 and Section 8 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* =========================================================================
          SECTION 8: GREEN COMMUNITY BANNER
          Exact Figma Layout & Dimensions
          ========================================================================= */}
      <section
        className="w-full font-body-copy"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="mx-auto max-w-[1140px] px-6 py-10 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
          {/* Greenhouse banner with overlay */}
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 280 }}>
            {/* Background image */}
            <img
              src={greenhouse}
              alt="Greenhouse interior"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundColor: "rgba(10, 30, 15, 0.52)" }}
            />

            {/* Content centered over overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 py-14 text-center sm:px-12 sm:py-16">
              {/* Envelope icon in circular outline */}
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4.5 w-4.5"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>

              {/* Eyebrow */}
              <span className="block text-[11px] font-bold tracking-[0.22em] text-white/80 uppercase sm:text-xs">
                JOIN OUR GREEN COMMUNITY
              </span>

              {/* Main heading */}
              <h2 className="font-serif-heading mx-auto mt-3 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px] md:text-[36px]">
                Let&rsquo;s Grow Something Beautiful
              </h2>

              {/* Subtitle */}
              <p className="mx-auto mt-2 max-w-[460px] text-[12.5px] leading-relaxed text-white/75 sm:text-[13px]">
                Get plant care tips, gardening inspiration, and updates on our latest arrivals.
              </p>

              {/* Email form */}
              <div className="mt-6 flex w-full max-w-[440px] overflow-hidden rounded-full bg-white shadow-md">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent px-5 py-3 text-[12.5px] text-[#143826] placeholder:text-[#9aab9e] outline-none sm:text-[13px]"
                />
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-full bg-[#1B4332] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#143326] sm:px-6 sm:text-[12.5px]"
                >
                  Send Mail
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* White section separator between Section 8 and Footer */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />
    </div>
  );
}
