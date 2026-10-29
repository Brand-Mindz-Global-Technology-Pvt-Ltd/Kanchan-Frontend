import CategoryCard from "./CategoryCard";
import HomeEdgeLeaves from "./HomeEdgeLeaves";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

// Category images
import img1 from "../../assets/categories/img-1.png"; // Potted succulent
import img2 from "../../assets/categories/img-2.png"; // Greenhouse interior
import img3 from "../../assets/categories/img-3.png"; // Potting soil & scoop
import img4 from "../../assets/categories/img-4.png"; // Raised vegetable bed
import img5 from "../../assets/categories/img-5.png"; // Garden path with pink flowers
import img6 from "../../assets/categories/img-6.png"; // Gloved hands planting

const categories = [
  {
    image: img2,
    title: "Indoor & Outdoor Plants",
    description:
      "Lush foliage for cozy interiors and vibrant exteriors. Perfect for every space.",
    iconBg: "#EBF5EC",
    iconColor: "#2D613D",
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
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    image: img1,
    title: "Pots & Planters",
    description:
      "Stylish and durable pots for beautiful green spaces.",
    iconBg: "#FFF4E5",
    iconColor: "#D47E20",
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
        <path d="M6 10h12l-1.5 9h-9L6 10Z" />
        <path d="M5 6h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      </svg>
    ),
  },
  {
    image: img3,
    title: "Seeds & Seedlings",
    description:
      "The best quality seeds to make your garden flourish.",
    iconBg: "#EBF5EC",
    iconColor: "#2D613D",
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
  {
    image: img4,
    title: "Soil & Growing Medium",
    description:
      "Nutrient-rich growing media for healthy, thriving plants.",
    iconBg: "#F6ECE0",
    iconColor: "#99683B",
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
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 3v2.5" />
        <path d="M12 18.5V21" />
        <path d="M3 12h2.5" />
        <path d="M18.5 12H21" />
        <path d="m5.64 5.64 1.76 1.76" />
        <path d="m16.6 16.6 1.76 1.76" />
        <path d="m5.64 18.36 1.76-1.76" />
        <path d="m16.6 7.4 1.76-1.76" />
      </svg>
    ),
  },
  {
    image: img6,
    title: "Organic Manure & Fertilizers",
    description:
      "Natural nutrients for stronger, healthier plants and richer soil.",
    iconBg: "#EBF5EC",
    iconColor: "#2D613D",
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
    image: img5,
    title: "Gardening Tools",
    description:
      "Essential tools to make gardening easier and more enjoyable.",
    iconBg: "#FEEFE7",
    iconColor: "#CC5634",
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
        <path d="m14 7 3-3a2.12 2.12 0 0 1 3 3l-3 3" />
        <path d="m15 6-8.5 8.5a2.12 2.12 0 1 0 3 3L18 9" />
        <path d="m3 21 3.5-3.5" />
      </svg>
    ),
  },
];

function OurCategories() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#FCFAF4] py-14 sm:py-16 lg:py-20 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[4px] after:w-full after:bg-[#FCFAF4]"
      aria-labelledby="categories-heading"
    >
    <HomeEdgeLeaves
  placements={[
    {
      left: { top: "4%", width: "clamp(90px, 14vw, 190px)", opacity: 0.72 },
      right: { top: "4%", width: "clamp(90px, 14vw, 190px)", opacity: 0.72 },
    },
    {
      left: { bottom: "0%", width: "clamp(105px, 16vw, 220px)", opacity: 0.9 },
      right: { bottom: "0%", width: "clamp(105px, 16vw, 220px)", opacity: 0.9 },
    }
  ]}
/>
      <div className="relative z-10 mx-auto w-[92%] max-w-[1240px]">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#4A7C59]">
            Our Categories
          </p>

          <h2
            id="categories-heading"
            aria-label="Find Everything Your Garden Needs"
            className="mx-auto mt-2.5 max-w-[270px] font-serif text-[23px] font-bold leading-tight text-[#183B2B] sm:max-w-none sm:text-[36px] lg:text-[40px]"
          >
            <AnimatedHeadingText text="Find Everything Your Garden Needs" />
          </h2>

          <p
            data-reveal-paragraph
            className="mx-auto mt-2.5 max-w-[270px] text-[12px] leading-relaxed text-black sm:text-[#5A6E5F] sm:max-w-[620px] sm:text-[14px]"
          >
            Thoughtfully selected essentials for every kind of garden space.
            Balcony, and to terrace welcome.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              image={category.image}
              title={category.title}
              description={category.description}
              iconBg={category.iconBg}
              iconColor={category.iconColor}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurCategories;
