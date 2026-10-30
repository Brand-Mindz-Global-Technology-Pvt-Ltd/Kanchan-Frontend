import person1 from "../../assets/about/person1.png";
import person2 from "../../assets/about/person2.png";
import person3 from "../../assets/about/person3.png";
import person4 from "../../assets/about/person4.png";
import BotanicalLeaf from "./BotanicalLeaf";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

export default function Caretakers() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("caretakers");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{ backgroundColor: "#EDF5DC" }}
    >
      <AboutEdgeLeaves />

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
        <div data-about-caretakers-heading className="mb-8 text-center sm:mb-9">
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
          <div data-about-caretakers-card className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
            {/* Portrait */}
            <div className="mb-4 h-28 w-28 sm:h-[100px] sm:w-[100px] shrink-0 overflow-hidden rounded-full">
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
          <div data-about-caretakers-card className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
            <div className="mb-4 h-28 w-28 sm:h-[100px] sm:w-[100px] shrink-0 overflow-hidden rounded-full">
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
          <div data-about-caretakers-card className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
            <div className="mb-4 h-28 w-28 sm:h-[100px] sm:w-[100px] shrink-0 overflow-hidden rounded-full">
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
          <div data-about-caretakers-card className="flex flex-col items-center rounded-2xl bg-white px-5 pt-7 pb-6 shadow-[0_2px_12px_rgba(20,56,35,0.05)] text-center">
            <div className="mb-4 h-28 w-28 sm:h-[100px] sm:w-[100px] shrink-0 overflow-hidden rounded-full">
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
  );
}

