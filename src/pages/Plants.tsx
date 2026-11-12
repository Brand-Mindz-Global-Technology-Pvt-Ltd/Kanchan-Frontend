import { useState, useMemo, useEffect } from "react";
import HeroBanner from "../components/ui/HeroBanner";
import ProductCard, { type Product } from "../components/home/ProductCard";
import WhyChooseKanchan from "../components/home/ChooseKanchan";
import GreenCommunity from "../components/about/GreenCommunity";
import AboutFaq from "../components/about/AboutFaq";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  getProductsApi,
  resolveProductImage,
  type BackendProduct,
} from "../services/productApi";

// Verified product images from assets
import img1 from "../assets/products/img-1.png"; // Monstera Deliciosa
import img2 from "../assets/products/img-2.png"; // Snake Plant Zeylanica
import img3 from "../assets/products/img-3.png"; // Peace Lily Sensation
import img4 from "../assets/products/img-4.png"; // Areca Palm

interface PlantCatalogItem extends Product {
  categories: string[];
  category: string;
  light: "low" | "indirect" | "bright";
  priceNumeric: number;
}

function mapBackendProductToCatalogItem(p: BackendProduct): PlantCatalogItem {
  const rawCat = (p.category || "").toLowerCase().trim();
  const rawLight = (p.light || "").toLowerCase().trim();

  let light: "low" | "indirect" | "bright" = "indirect";
  if (rawLight.includes("low")) light = "low";
  else if (rawLight.includes("bright") || rawLight.includes("sun")) light = "bright";

  // Build categories list for flexible filtering
  const catSet = new Set<string>(["all"]);
  if (rawCat) {
    catSet.add(rawCat);
    if (rawCat.includes("indoor")) catSet.add("indoor");
    if (rawCat.includes("outdoor")) catSet.add("outdoor");
    if (rawCat.includes("flower")) catSet.add("flowering");
    if (rawCat.includes("succulent") || rawCat.includes("cactus")) catSet.add("succulents");
    if (rawCat.includes("low-maintenance") || rawCat.includes("easy") || rawCat.includes("snake")) catSet.add("low-maintenance");
    if (rawCat.includes("air") || rawCat.includes("purif")) catSet.add("air-purifying");
    if (rawCat.includes("tropical")) catSet.add("tropical");
    if (rawCat.includes("low-light") || light === "low") catSet.add("low-light");
  }

  const nameLower = (p.name || "").toLowerCase();
  if (nameLower.includes("monstera")) {
    catSet.add("indoor");
    catSet.add("tropical");
    catSet.add("low-maintenance");
  } else if (nameLower.includes("snake")) {
    catSet.add("indoor");
    catSet.add("low-maintenance");
    catSet.add("succulents");
    catSet.add("low-light");
  } else if (nameLower.includes("lily")) {
    catSet.add("indoor");
    catSet.add("flowering");
  } else if (nameLower.includes("palm") || nameLower.includes("areca")) {
    catSet.add("indoor");
    catSet.add("outdoor");
    catSet.add("air-purifying");
  }

  const numPrice =
    typeof p.priceNumeric === "number" && !isNaN(p.priceNumeric)
      ? p.priceNumeric
      : parseFloat(String(p.price).replace(/[^\d.]/g, "")) || 0;

  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle || "",
    badge: p.badge,
    badgeBg: p.badgeBg,
    originalPrice: p.originalPrice || `₹${numPrice}`,
    price: p.price || `₹${numPrice}`,
    priceNumeric: numPrice,
    rating: typeof p.rating === "number" && !isNaN(p.rating) ? p.rating : 4.8,
    image: resolveProductImage(p.image),
    category: rawCat || "tropical",
    categories: Array.from(catSet),
    light,
  };
}

// Verified product items expanded across categories without inventing any unverified names or prices
const verifiedCatalog: PlantCatalogItem[] = [
  {
    id: "monstera-1",
    name: "Monstera Deliciosa",
    subtitle: "A tropical beauty",
    badge: "Best Seller",
    badgeBg: "#06452E",
    originalPrice: "₹999",
    price: "₹899",
    priceNumeric: 899,
    rating: 4.8,
    image: img1,
    category: "tropical",
    categories: ["all", "indoor", "tropical", "low-maintenance"],
    light: "indirect",
  },
  {
    id: "snake-plant-1",
    name: "Snake Plant Zeylanica",
    subtitle: "Low maintenance",
    badge: "Low Light",
    badgeBg: "#06452E",
    originalPrice: "₹699",
    price: "₹549",
    priceNumeric: 549,
    rating: 4.9,
    image: img2,
    category: "low-light",
    categories: ["all", "indoor", "low-maintenance", "succulents"],
    light: "low",
  },
  {
    id: "peace-lily-1",
    name: "Peace Lily Sensation",
    subtitle: "Purifies indoor air",
    badge: "Flowering",
    badgeBg: "#5D2811",
    originalPrice: "₹899",
    price: "₹699",
    priceNumeric: 699,
    rating: 4.7,
    image: img3,
    category: "flowering",
    categories: ["all", "indoor", "flowering"],
    light: "indirect",
  },
  {
    id: "areca-palm-1",
    name: "Areca Palm",
    subtitle: "Elegant & fresh",
    badge: "Indoor Plants",
    badgeBg: "#06452E",
    originalPrice: "₹1,499",
    price: "₹1,199",
    priceNumeric: 1199,
    rating: 4.7,
    image: img4,
    category: "air-purifying",
    categories: ["all", "indoor", "outdoor", "air-purifying"],
    light: "bright",
  },
  {
    id: "monstera-2",
    name: "Monstera Deliciosa",
    subtitle: "A tropical beauty",
    badge: "Best Seller",
    badgeBg: "#06452E",
    originalPrice: "₹999",
    price: "₹899",
    priceNumeric: 899,
    rating: 4.8,
    image: img1,
    category: "tropical",
    categories: ["all", "indoor", "tropical", "low-maintenance"],
    light: "indirect",
  },
  {
    id: "snake-plant-2",
    name: "Snake Plant Zeylanica",
    subtitle: "Low maintenance",
    badge: "Low Light",
    badgeBg: "#06452E",
    originalPrice: "₹699",
    price: "₹549",
    priceNumeric: 549,
    rating: 4.9,
    image: img2,
    category: "air-purifying",
    categories: ["all", "indoor", "low-maintenance", "succulents"],
    light: "low",
  },
  {
    id: "peace-lily-2",
    name: "Peace Lily Sensation",
    subtitle: "Purifies indoor air",
    badge: "Flowering",
    badgeBg: "#5D2811",
    originalPrice: "₹899",
    price: "₹699",
    priceNumeric: 699,
    rating: 4.7,
    image: img3,
    category: "flowering",
    categories: ["all", "indoor", "flowering"],
    light: "indirect",
  },
  {
    id: "areca-palm-2",
    name: "Areca Palm",
    subtitle: "Elegant & fresh",
    badge: "Indoor Plants",
    badgeBg: "#06452E",
    originalPrice: "₹1,499",
    price: "₹1,199",
    priceNumeric: 1199,
    rating: 4.7,
    image: img4,
    category: "tropical",
    categories: ["all", "indoor", "outdoor", "air-purifying"],
    light: "bright",
  },
];

const categoryFilters = [
  { id: "all", label: "All Plants" },
  { id: "indoor", label: "Indoor Plants" },
  { id: "outdoor", label: "Outdoor Plants" },
  { id: "flowering", label: "Flowering Plants" },
  { id: "succulents", label: "Succulents" },
  { id: "low-maintenance", label: "Low Maintenance" },
];

const lightFilters = [
  { id: "all", label: "Any Light" },
  { id: "low", label: "Low Light" },
  { id: "indirect", label: "Indirect Light" },
  { id: "bright", label: "Bright Sunlight" },
];

const sortOptions = [
  { id: "featured", label: "Featured & Curated" },
  { id: "best-selling", label: "Best Selling" },
  { id: "price-low", label: "Price: Low to High" },
  { id: "price-high", label: "Price: High to Low" },
  { id: "rating", label: "Customer Rating: High" },
];

export default function Plants() {
  const [catalog, setCatalog] = useState<PlantCatalogItem[]>(verifiedCatalog);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLight, setSelectedLight] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(2500);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(true);

  // Fetch live products from backend database API to display all active plants without artificial limits
  useEffect(() => {
    let isMounted = true;
    getProductsApi()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map(mapBackendProductToCatalogItem);
          setCatalog(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load live products in Plants listing, using verified fallback:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useScrollReveal([selectedCategory, selectedLight, sortBy, maxPrice, catalog]);

  const filteredProducts = useMemo(() => {
    let list = catalog.filter((item) => {
      // Category filter
      if (selectedCategory !== "all") {
        const hasCategory =
          item.categories?.includes(selectedCategory) ||
          item.category === selectedCategory;
        if (!hasCategory) return false;
      }
      // Light filter
      if (selectedLight !== "all" && item.light !== selectedLight) {
        return false;
      }
      // Price range slider filter (when maxPrice < 2500, apply filter; 2500 represents ₹2,500+)
      if (maxPrice < 2500 && item.priceNumeric > maxPrice) {
        return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === "best-selling") {
      list = [...list].sort((a, b) => {
        const aBest = a.badge === "Best Seller" ? 1 : 0;
        const bBest = b.badge === "Best Seller" ? 1 : 0;
        return bBest - aBest;
      });
    } else if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.priceNumeric - b.priceNumeric);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.priceNumeric - a.priceNumeric);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [catalog, selectedCategory, selectedLight, maxPrice, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedLight !== "all" ? 1 : 0) +
    (sortBy !== "featured" ? 1 : 0) +
    (maxPrice < 2500 ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLight("all");
    setSortBy("featured");
    setMaxPrice(2500);
  };

  // Reusable Filter Sidebar Content matching Figma reference exactly
  const renderSidebarContent = () => (
    <div className="space-y-5 rounded-[24px] border border-[#E6EADF] bg-white p-5 shadow-[0_4px_24px_rgba(20,56,38,0.06)]">
      {/* Header with Filters Icon + Clear All */}
      <div className="flex items-center justify-between border-b border-[#F0F3EC] pb-3.5">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-4 w-4 text-[#18382B]"
            aria-hidden="true"
          >
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-[#18382B]">
            Filters
          </span>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer text-[12px] font-medium text-[#C25E38] transition hover:text-[#9E401E] hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* SECTION 1: CATEGORIES */}
      <div className="border-b border-[#F0F3EC] pb-4">
        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4D6354]">
          CATEGORIES
        </h4>
        <div className="space-y-2">
          {categoryFilters.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className="group flex w-full cursor-pointer items-center justify-between py-0.5 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition ${
                      isSelected
                        ? "border-[#06452E] bg-[#06452E] text-white"
                        : "border-[#C5D0C2] bg-white group-hover:border-[#06452E]"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[13px] ${
                      isSelected
                        ? "font-semibold text-[#18382B]"
                        : "text-[#4D6354] group-hover:text-[#18382B]"
                    }`}
                  >
                    {category.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: LIGHT */}
      <div className="border-b border-[#F0F3EC] pb-4">
        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4D6354]">
          LIGHT
        </h4>
        <div className="space-y-2">
          {lightFilters.map((light) => {
            const isSelected = selectedLight === light.id;
            return (
              <button
                key={light.id}
                type="button"
                onClick={() => setSelectedLight(light.id)}
                className="group flex w-full cursor-pointer items-center justify-between py-0.5 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition ${
                      isSelected
                        ? "border-[#06452E] bg-[#06452E] text-white"
                        : "border-[#C5D0C2] bg-white group-hover:border-[#06452E]"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[13px] ${
                      isSelected
                        ? "font-semibold text-[#18382B]"
                        : "text-[#4D6354] group-hover:text-[#18382B]"
                    }`}
                  >
                    {light.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: SORT BY */}
      <div className="border-b border-[#F0F3EC] pb-4">
        <h4 className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[#4D6354]">
          SORT BY
        </h4>
        <div className="space-y-2">
          {sortOptions.map((opt) => {
            const isSelected = sortBy === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortBy(opt.id)}
                className="group flex w-full cursor-pointer items-center justify-between py-0.5 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-[4px] border transition ${
                      isSelected
                        ? "border-[#06452E] bg-[#06452E] text-white"
                        : "border-[#C5D0C2] bg-white group-hover:border-[#06452E]"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3 w-3"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-[13px] ${
                      isSelected
                        ? "font-semibold text-[#18382B]"
                        : "text-[#4D6354] group-hover:text-[#18382B]"
                    }`}
                  >
                    {opt.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: PRICE RANGE */}
      <div className="pt-1">
        <div className="mb-2.5 flex items-center justify-between">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#4D6354]">
            PRICE RANGE
          </h4>
          <span className="text-[12px] font-bold text-[#18382B]">
            ₹499 – ₹{maxPrice.toLocaleString("en-IN")}
          </span>
        </div>
        <input
          type="range"
          min="499"
          max="2500"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#E2E8DC] accent-[#06452E]"
        />
        <div className="mt-2 flex items-center justify-between text-[10.5px] font-medium text-[#7A8C80]">
          <span>Under ₹499</span>
          <span>₹1,000</span>
          <span>₹2,500+</span>
        </div>
      </div>


    </div>
  );

  // Styled White Rounded Product Summary Bar
  const renderSummaryBar = (extraClasses = "") => (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 rounded-[18px] border-0 bg-white px-4 py-2.5 shadow-[0_2px_12px_rgba(20,56,38,0.05)] outline-none sm:px-5 sm:py-3 ${extraClasses}`}
    >
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        <span className="text-[13px] font-semibold text-[#18382B]">
          Showing {filteredProducts.length} of {catalog.length} plants
        </span>

        {/* Active Filter Chips with Individual ✕ Removal */}
        {selectedCategory !== "all" && (
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#F4F7F2] px-2.5 py-1 text-[11.5px] font-medium text-[#18382B] transition hover:bg-[#EAEFE7]"
            title="Remove category filter"
          >
            <span>
              {categoryFilters.find((c) => c.id === selectedCategory)?.label}
            </span>
            <span
              className="text-[13px] leading-none text-[#5E7163] hover:text-[#18382B]"
              aria-hidden="true"
            >
              ✕
            </span>
          </button>
        )}

        {selectedLight !== "all" && (
          <button
            type="button"
            onClick={() => setSelectedLight("all")}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#F4F7F2] px-2.5 py-1 text-[11.5px] font-medium text-[#18382B] transition hover:bg-[#EAEFE7]"
            title="Remove light filter"
          >
            <span>
              {lightFilters.find((l) => l.id === selectedLight)?.label}
            </span>
            <span
              className="text-[13px] leading-none text-[#5E7163] hover:text-[#18382B]"
              aria-hidden="true"
            >
              ✕
            </span>
          </button>
        )}

        {sortBy !== "featured" && (
          <button
            type="button"
            onClick={() => setSortBy("featured")}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#F4F7F2] px-2.5 py-1 text-[11.5px] font-medium text-[#18382B] transition hover:bg-[#EAEFE7]"
            title="Reset sorting to Featured"
          >
            <span>{sortOptions.find((s) => s.id === sortBy)?.label}</span>
            <span
              className="text-[13px] leading-none text-[#5E7163] hover:text-[#18382B]"
              aria-hidden="true"
            >
              ✕
            </span>
          </button>
        )}

        {maxPrice < 2500 && (
          <button
            type="button"
            onClick={() => setMaxPrice(2500)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-[#F4F7F2] px-2.5 py-1 text-[11.5px] font-medium text-[#18382B] transition hover:bg-[#EAEFE7]"
            title="Reset price range"
          >
            <span>Under ₹{maxPrice.toLocaleString("en-IN")}</span>
            <span
              className="text-[13px] leading-none text-[#5E7163] hover:text-[#18382B]"
              aria-hidden="true"
            >
              ✕
            </span>
          </button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer text-[12px] font-semibold text-[#06452E] hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );

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

        /* ── Two-Column Layout Container ── */
        .plants-layout-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          align-items: stretch;
        }

        .plants-layout-container.with-sidebar .plants-sidebar-wrapper {
          display: block;
          width: 100%;
        }

        @media (min-width: 768px) {
          .plants-layout-container.with-sidebar {
            flex-direction: row;
            align-items: flex-start;
            gap: 28px;
          }

          .plants-layout-container.with-sidebar .plants-sidebar-wrapper {
            display: block !important;
            width: 260px;
            min-width: 260px;
            max-width: 260px;
            flex-shrink: 0;
          }

          .plants-layout-container.with-sidebar .plants-content-wrapper {
            flex: 1 1 0%;
            min-width: 0;
            width: calc(100% - 288px);
          }
        }

        @media (min-width: 1200px) {
          .plants-layout-container.with-sidebar {
            gap: 32px;
          }

          .plants-layout-container.with-sidebar .plants-sidebar-wrapper {
            width: 280px;
            min-width: 280px;
            max-width: 280px;
          }

          .plants-layout-container.with-sidebar .plants-content-wrapper {
            width: calc(100% - 312px);
          }
        }

        .plants-layout-container.without-sidebar .plants-sidebar-wrapper {
          display: none !important;
        }

        .plants-layout-container.without-sidebar .plants-content-wrapper {
          width: 100% !important;
          flex: 1 1 100%;
        }

        /* ── Plants Product Grid Layout: 3 desktop, 2 tablet, 1 mobile ── */
        .plants-product-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          justify-items: center;
          width: 100%;
        }
        @media (max-width: 639px) {
          .plants-product-grid > article,
          .plants-product-grid > div,
          .plants-product-grid article {
            max-width: 320px;
            width: 100%;
          }
        }
        @media (min-width: 640px) {
          .plants-product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
            justify-items: stretch;
          }
        }
        @media (min-width: 1024px) {
          .plants-layout-container.with-sidebar .plants-product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }
          .plants-layout-container.without-sidebar .plants-product-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 20px;
          }
        }
        @media (min-width: 1280px) {
          .plants-layout-container.without-sidebar .plants-product-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 20px;
          }
        }

        /* ── Proportional compact card dimensions in Plants 3-col grid ── */
        .plants-product-grid article[data-reveal-card] {
          padding: 10px 10px 14px;
          border-radius: 16px;
          border-color: #E2E8D8;
          box-shadow: 0 4px 16px rgba(20, 56, 38, 0.05);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          animation: kanchanFadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @media (min-width: 640px) {
          .plants-product-grid article[data-reveal-card] {
            padding: 12px 12px 16px;
            border-radius: 18px;
          }
        }
        .plants-product-grid article[data-reveal-card]:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(20, 56, 38, 0.12);
        }

        /* Proportionate image container height (4:3.3 aspect ratio) */
        .plants-product-grid article[data-reveal-card] > div:first-child {
          aspect-ratio: 4 / 3.3 !important;
          border-radius: 12px;
          background-color: #F4F6F0;
        }
        .plants-product-grid article[data-reveal-card] img {
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .plants-product-grid article[data-reveal-card]:hover img {
          transform: scale(1.05);
        }

        /* Balanced typography & spacing */
        .plants-product-grid article[data-reveal-card] h3 {
          font-size: 15px;
          line-height: 1.25;
          margin-top: 6px;
          color: #143826;
        }
        .plants-product-grid article[data-reveal-card] p {
          font-size: 11.5px;
          line-height: 1.4;
          margin-top: 3px;
          color: #5E7163;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 32px;
        }
        .plants-product-grid article[data-reveal-card] .mt-auto {
          padding-top: 10px;
        }
        .plants-product-grid article[data-reveal-card] .mt-auto .flex-col span:last-child {
          font-size: 17px;
          color: #143826;
        }

        /* Plants page Add button: brand green background, white text and icon, darker green hover */
        .plants-product-grid article[data-reveal-card] .plants-add-btn {
          background-color: #06452E;
          color: #ffffff !important;
          border: 1px solid #06452E;
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn span {
          color: #ffffff !important;
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn:hover {
          background-color: #043824;
          border-color: #043824;
          color: #ffffff !important;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 16px rgba(6, 69, 46, 0.25);
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn:active {
          transform: translateY(0) scale(0.97);
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn:hover span {
          color: #ffffff !important;
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn.is-added {
          background-color: #06452E;
          color: #ffffff !important;
        }
        .plants-product-grid article[data-reveal-card] .plants-add-btn.is-added span {
          color: #ffffff !important;
        }
      `}</style>

      {/* SECTION 1: PLANTS HERO BANNER */}
      <HeroBanner plantsHero />

      {/* White section separator */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 2: PRODUCT LISTING WITH 2-COLUMN FILTER SIDEBAR */}
      <section
        id="plants-collection"
        className="relative isolate w-full overflow-hidden bg-[#FCFAF4] py-10 sm:py-14 lg:py-16"
        aria-label="Plant Collection"
      >
        <AboutEdgeLeaves />

        <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
          {/* Centered Heading Section (Preserved) */}
          <div data-scroll-reveal="fade-up" className="mb-6 text-center sm:mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#3B6F45] sm:text-[12px]">
              NURTURED IN OUR GREENHOUSES
            </p>
            <h2 className="font-serif-heading mx-auto mt-2 text-[26px] font-bold tracking-tight text-[#18382B] sm:text-[34px] md:text-[38px]">
              Explore All Plants
            </h2>
            <p className="mx-auto mt-2 text-[13px] text-[#5E7163] sm:text-[14px]">
              Showing{" "}
              <span className="font-semibold text-[#18382B]">
                {filteredProducts.length}
              </span>{" "}
              botanical companion{filteredProducts.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Left-Aligned Filters Control Row (NO horizontal divider line) */}
          <div data-scroll-reveal="fade-up" data-stagger="1" className="mb-6 flex flex-wrap items-center gap-3 sm:mb-8 sm:gap-4">
            {/* Filters Button with Visually Obvious Active State */}
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className={`btn-premium-outline inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold shadow-sm ${
                isFilterOpen
                  ? "border border-[#06452E] bg-[#06452E] text-white"
                  : "border border-[#D0DEC4] bg-white text-[#1B3B2F] hover:bg-[#F2F7ED]"
              }`}
              aria-expanded={isFilterOpen}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isFilterOpen
                      ? "bg-white text-[#06452E]"
                      : "bg-[#06452E] text-white"
                  }`}
                >
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* When sidebar is closed: Summary bar is placed beside Filters button (at red arrow marked position) */}
            {!isFilterOpen && renderSummaryBar("w-full sm:w-auto flex-1 min-w-0")}
          </div>

          {/* ── Main Two-Column Layout Container ── */}
          <div
            className={`plants-layout-container ${
              isFilterOpen ? "with-sidebar" : "without-sidebar"
            }`}
          >
            {/* Main Filter Sidebar */}
            {isFilterOpen && (
              <aside
                data-scroll-reveal="left"
                className="plants-sidebar-wrapper md:sticky md:top-24"
                aria-label="Filter Plants"
              >
                {renderSidebarContent()}
              </aside>
            )}

            {/* Right Column: Top Summary Bar (when sidebar open) + Product Grid */}
            <div className="plants-content-wrapper min-w-0">
              {/* When sidebar is open: Summary bar is aligned above the product grid on the right */}
              {isFilterOpen && renderSummaryBar("mb-6 w-full")}

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div data-scroll-reveal="fade-up" className="flex min-h-[300px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#CCD8C4] bg-white p-8 text-center">
                  <p className="text-[16px] font-bold text-[#18382B]">
                    No plants found matching these filters
                  </p>
                  <p className="mt-1 text-[13px] text-[#637567]">
                    Try clearing one or more active filters to see all available plants.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="btn-premium mt-4 cursor-pointer rounded-full bg-[#06452E] px-5 py-2 text-[13px] font-semibold text-white shadow-sm hover:bg-[#043322]"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="plants-product-grid w-full">
                  {filteredProducts.map((product, idx) => (
                    <div
                      key={product.id}
                      data-scroll-reveal="fade-up"
                      data-stagger={(idx % 6) + 1}
                      className="h-full"
                    >
                      <ProductCard product={product} whiteAddButton />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* White section separator */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 3: WHY CHOOSE KANCHAN */}
      <WhyChooseKanchan aboutEdgeLeaves />

      {/* White section separator */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 4: EMAIL CTA BANNER (Using GreenCommunity as required) */}
      <GreenCommunity />

      {/* White section separator */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <AboutFaq />

      {/* White section separator before global footer */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />
    </div>
  );
}
