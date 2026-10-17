import CategoryCard from "./CategoryCard";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";
import indoorJungleImage from "../../assets/references/img-1.png";
import balconyGardenImage from "../../assets/references/img2.png";
import wateringGuideImage from "../../assets/references/img-3.png";

const articles = [
  {
    image: indoorJungleImage,
    title: "Create Your Indoor Jungle:\nLayering Heights & Foliage",
    categoryLabel: "Indoor Styling",
    description:
      "Transform your home into a refreshing green indoor plants. Choose plants heights to create a natural look.",
  },
  {
    image: balconyGardenImage,
    title: "Start Your Balcony Kitchen Garden: Herbs & Greens",
    categoryLabel: "Balcony Gardening",
    description:
      "Turn your balcony into a beautiful garden with fresh herbs. Start with easy-to-grow plants like mint, coriander, basil.",
  },
  {
    image: wateringGuideImage,
    title: "Simple Tips for Thriving Plants: Watering & Soil Health",
    categoryLabel: "Care Guide",
    description:
      "Healthy plants begin with proper watering and good-quality soil. Check the soil moisture before watering your plants.",
  },
];

function BotanicalChronicle() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="w-full bg-[#FBF9F1] py-10">
      <div className="mx-auto w-[92%] max-w-[1180px] sm:w-[82%]">
        <header>
          <p className="text-[12px] font-bold leading-4 tracking-[0.16em] text-[#4A7C43]">
            THE BOTANICAL CHRONICLE
          </p>
          <h2
            aria-label="Get Inspired to Grow"
            className="mt-[18px] font-serif text-[34px] font-bold leading-10 text-[#18382B]"
          >
            <AnimatedHeadingText text="Get Inspired to Grow" />
          </h2>
          <p data-reveal-paragraph className="mt-3 text-[14px] leading-5 text-[#718074]">
            Expert guidance, fresh styling ideas, and seasonal garden advice
            written by our horticulture team.
          </p>
        </header>

        <div className="mt-[25px] grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 min-[1280px]:gap-[60px]">
          {articles.map((article) => (
            <CategoryCard
              key={article.title}
              image={article.image}
              title={article.title}
              categoryLabel={article.categoryLabel}
              articleDescription={article.description}
              readArticleHref="/blog"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BotanicalChronicle;