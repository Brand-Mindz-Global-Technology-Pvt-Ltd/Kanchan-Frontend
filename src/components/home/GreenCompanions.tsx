import ProductCard, { type Product } from "./ProductCard";

// Product images
import img1 from "../../assets/products/img-1.png"; // Monstera Deliciosa
import img2 from "../../assets/products/img-2.png"; // Snake Plant Zeylanica
import img3 from "../../assets/products/img-3.png"; // Peace Lily Sensation
import img4 from "../../assets/products/img-4.png"; // Areca Palm

// Leaf decorative assets
import leafTwo from "../../assets/leaves/leaf-2.png";
import leafThree from "../../assets/leaves/leaf-3.png";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

const products: Product[] = [
  {
    id: "monstera",
    name: "Monstera Deliciosa",
    subtitle: "A tropical beauty",
    badge: "Best Seller",
    badgeBg: "#06452E",
    originalPrice: "₹999",
    price: "₹899",
    rating: 4.8,
    image: img1,
  },
  {
    id: "snake-plant",
    name: "Snake Plant Zeylanica",
    subtitle: "Low maintenance",
    badge: "Low Light",
    badgeBg: "#06452E",
    originalPrice: "₹699",
    price: "₹549",
    rating: 4.8,
    image: img2,
  },
  {
    id: "peace-lily",
    name: "Peace Lily Sensation",
    subtitle: "Purifies indoor air",
    badge: "Flowering",
    badgeBg: "#5D2811",
    originalPrice: "₹899",
    price: "₹699",
    rating: 4.8,
    image: img3,
  },
  {
    id: "areca-palm",
    name: "Areca Palm",
    subtitle: "Elegant & fresh",
    badge: "Air Purifying",
    badgeBg: "#06452E",
    originalPrice: "₹1,499",
    price: "₹1,199",
    rating: 4.8,
    image: img4,
  },
];

function GreenCompanions() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#ebf4dc_0%,#e4f0d3_60%,#ddeccd_100%)] py-14 sm:py-16 lg:py-20"
      aria-labelledby="companions-heading"
    >
      {/* ── Decorative Leaf Illustrations ── */}
      {/* Top-left leaf */}
      <img
        src={leafThree}
        alt=""
        aria-hidden="true"
        data-decorative-leaf
        className="pointer-events-none absolute -left-10 top-6 z-0 h-auto w-36 -rotate-45 opacity-65 sm:-left-6 sm:top-10 sm:w-44 lg:w-48"
      />
      {/* Top-right leaf */}
      <img
        src={leafTwo}
        alt=""
        aria-hidden="true"
        data-decorative-leaf
        className="pointer-events-none absolute -right-6 top-10 z-0 h-auto w-28 rotate-12 opacity-65 sm:right-6 sm:top-12 sm:w-32 lg:right-10 lg:w-36"
      />
      {/* Bottom-left leaf */}
      <img
        src={leafTwo}
        alt=""
        aria-hidden="true"
        data-decorative-leaf
        className="pointer-events-none absolute -bottom-10 -left-8 z-0 h-auto w-32 -rotate-12 opacity-60 sm:-bottom-8 sm:left-2 sm:w-36 lg:w-40"
      />
      {/* Bottom-right leaf */}
      <img
        src={leafThree}
        alt=""
        aria-hidden="true"
        data-decorative-leaf
        className="pointer-events-none absolute -bottom-12 -right-8 z-0 h-auto w-36 rotate-45 opacity-60 sm:-bottom-10 sm:right-0 sm:w-40 lg:w-44"
      />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1240px]">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#3B6F45] sm:text-[12px]">
            FRESH SELECTIONS FOR YOUR GARDEN
          </p>

          <h2
            id="companions-heading"
            aria-label="Meet Your New Green Companions"
            className="mt-2 font-serif text-[28px] font-bold leading-tight text-[#1B3B2F] sm:text-[34px] lg:text-[40px]"
          >
            <AnimatedHeadingText text="Meet Your New Green Companions" />
          </h2>

          <p
            data-reveal-paragraph
            className="mx-auto mt-2.5 max-w-[620px] text-[13px] leading-relaxed text-[#5E7163] sm:text-[14px]"
          >
            Beautiful, handpicked plants ready to bring timeless green, vitality,
            and peace to any garden or home.
          </p>
        </div>

        {/* 4 Cards Grid: 2 cols on mobile and tablet, 4 cols on desktop */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GreenCompanions;
