import { useState, useEffect, useCallback } from "react";
import ProductCard, { type Product } from "./ProductCard";
import HomeEdgeLeaves from "./HomeEdgeLeaves";
import { getProductsApi, mapBackendProductToCard } from "../../services/productApi";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";

function GreenCompanions() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Home page requires exactly 4 products displayed in a single row on desktop
  const displayedProducts = products.slice(0, 4);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProductsApi();
      const mapped = data.map(mapBackendProductToCard);
      setProducts(mapped);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to load products from server";
      setError(message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[linear-gradient(180deg,#ebf4dc_0%,#e4f0d3_60%,#ddeccd_100%)] py-14 sm:py-16 lg:py-20"
      aria-labelledby="companions-heading"
    >
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "2%", width: "clamp(110px, 17vw, 230px)", opacity: 0.92 },
            right: { top: "2%", width: "clamp(105px, 16vw, 220px)", opacity: 0.9 },
          },
          {
            left: { bottom: "-10%", width: "clamp(120px, 18vw, 245px)", opacity: 0.92 },
            right: { bottom: "-12%", width: "clamp(115px, 17vw, 235px)", opacity: 0.9 },
          },
        ]}
        mobileBorderTreatment
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
            className="mx-auto mt-2 max-w-[270px] font-serif text-[23px] font-bold leading-tight text-[#1B3B2F] sm:max-w-none sm:text-[34px] lg:text-[40px]"
          >
            <AnimatedHeadingText text="Meet Your New Green Companions" />
          </h2>

          <p
            data-reveal-paragraph
            className="mx-auto mt-2.5 max-w-[270px] text-[12px] leading-relaxed text-[#5E7163] sm:max-w-[620px] sm:text-[14px]"
          >
            Beautiful, handpicked plants ready to bring timeless green, vitality,
            and peace to any garden or home.
          </p>
        </div>

        {/* Loading State: Skeletons (4 cards matching 4-column desktop layout) */}
        {isLoading && (
          <div
            role="status"
            aria-label="Loading products"
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6"
          >
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col rounded-[20px] border border-[#E6E9DF] bg-white/70 p-2.5 shadow-[0px_8px_24px_0px_#1A43240A] animate-pulse sm:p-4"
              >
                <div className="aspect-[4/5] sm:aspect-square w-full rounded-[14px] bg-[#E3E8DE]" />
                <div className="mt-3 flex items-center justify-between">
                  <div className="h-3 w-16 rounded bg-[#E3E8DE]" />
                  <div className="h-3 w-12 rounded bg-[#E3E8DE]" />
                </div>
                <div className="mt-2.5 h-4 w-3/4 rounded bg-[#D6DED0]" />
                <div className="mt-1.5 h-3 w-1/2 rounded bg-[#E3E8DE]" />
                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="h-5 w-16 rounded bg-[#D6DED0]" />
                  <div className="h-8 w-16 rounded-lg bg-[#D6DED0]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div
            role="alert"
            className="mx-auto max-w-lg rounded-2xl border border-[#F3C7C7] bg-[#FFF8F8] p-6 text-center shadow-sm sm:p-8"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FDE8E8] text-[#C62828]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="mt-3 font-serif text-[18px] font-bold text-[#203D2E] sm:text-[20px]">
              Unable to Load Products
            </h3>
            <p className="mt-1.5 text-[13px] text-[#6B7280] leading-relaxed">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchProducts()}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#06452E] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#043322] active:scale-95 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="mx-auto max-w-md rounded-2xl border border-[#D5E1CD] bg-white/80 p-8 text-center backdrop-blur-sm">
            <p className="font-serif text-[18px] font-bold text-[#1B3B2F]">
              No Products Available
            </p>
            <p className="mt-1 text-[13px] text-[#5E7163]">
              Check back soon for fresh additions to our nursery collection.
            </p>
          </div>
        )}

        {/* Dynamic Products Grid: Exactly 4 products in 1 row on desktop */}
        {!isLoading && !error && displayedProducts.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* View All Plants Navigation Button */}
            <div className="mt-10 sm:mt-12 text-center">
              <a
                href="/plants"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState({}, "", "/plants");
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#06452E] px-8 py-3.5 text-[14px] font-semibold text-white shadow-[0_4px_16px_rgba(6,69,46,0.18)] transition-all duration-200 hover:bg-[#043322] hover:shadow-[0_6px_20px_rgba(6,69,46,0.25)] active:scale-[0.98]"
              >
                <span>View All Plants</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default GreenCompanions;
