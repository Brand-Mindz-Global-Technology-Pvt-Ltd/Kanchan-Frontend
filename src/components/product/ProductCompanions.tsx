import ProductCard, { type Product } from "../home/ProductCard";
import imgMonstera from "../../assets/products/img-1.png";
import imgPeaceLily from "../../assets/products/img-3.png";
import imgZZ from "../../assets/products/img-2.png";
import imgAreca from "../../assets/products/img-4.png";

const companionProducts: Product[] = [
  {
    id: "monstera-comp",
    name: "Monstera Deliciosa",
    subtitle: "A tropical beauty with split leaves",
    badge: "Best Seller",
    badgeBg: "#06452E",
    originalPrice: "₹999",
    price: "₹899",
    rating: 4.8,
    image: imgMonstera,
  },
  {
    id: "peace-lily-comp",
    name: "Peace Lily Sensation",
    subtitle: "Purifies indoor air and blooms white",
    badge: "Flowering",
    badgeBg: "#5D2811",
    originalPrice: "₹849",
    price: "₹699",
    rating: 4.7,
    image: imgPeaceLily,
  },
  {
    id: "zz-plant-comp",
    name: "ZZ Plant (Zamioculcas)",
    subtitle: "Low maintenance, drought tolerant",
    badge: "Low Maintenance",
    badgeBg: "#06452E",
    originalPrice: "₹749",
    price: "₹649",
    rating: 4.8,
    image: imgZZ,
  },
  {
    id: "areca-palm-comp",
    name: "Areca Palm",
    subtitle: "Tropical feathery fronds",
    badge: "Popular",
    badgeBg: "#06452E",
    originalPrice: "₹1,499",
    price: "₹999",
    rating: 4.7,
    image: imgAreca,
  },
];

export default function ProductCompanions() {
  return (
    <section aria-label="Complementary Green Companions" className="w-full">
      <div className="mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B6F45]">
          YOU MIGHT ALSO LOVE
        </span>
        <h2 className="font-serif-heading mt-1 text-[24px] font-bold text-[#18382B] sm:text-[28px]">
          Complementary Green Companions
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
        {companionProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

