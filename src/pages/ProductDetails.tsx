import { useState, useEffect, useCallback } from "react";
import ProductBreadcrumb from "../components/product/ProductBreadcrumb";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfoBuy from "../components/product/ProductInfoBuy";
import ProductBenefits from "../components/product/ProductBenefits";
import ProductCareGuide from "../components/product/ProductCareGuide";
import ProductBundle from "../components/product/ProductBundle";
import ProductCompanions from "../components/product/ProductCompanions";
import GreenCommunity from "../components/about/GreenCommunity";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import AddToBagDrawer from "../components/product/AddToBagDrawer";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import {
  getProductByIdApi,
  ApiError,
  type BackendProduct,
} from "../services/productApi";

function getQueryProductId(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const idFromParam = params.get("id");
  if (idFromParam && idFromParam.trim()) {
    return idFromParam.trim();
  }
  // Secondary fallback for path /product/:id if ever routed
  const pathParts = window.location.pathname.split("/");
  if (
    (pathParts[1] === "product" || pathParts[1] === "product-details") &&
    pathParts[2]
  ) {
    return decodeURIComponent(pathParts[2].trim());
  }
  return "";
}

export default function ProductDetails() {
  const { addToCart, openBag, setSelectedProductId } = useShop();
  const [productId, setProductId] = useState<string>(() => getQueryProductId());
  const [product, setProduct] = useState<BackendProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isInvalidId, setIsInvalidId] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useScrollReveal(product?.id);

  // When product data finishes loading, immediately reveal above-the-fold hero elements
  useEffect(() => {
    if (product) {
      const timer = setTimeout(() => {
        document.querySelectorAll(".product-hero-anim, [data-scroll-reveal]").forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < (window.innerHeight || 800)) {
            el.classList.add("is-revealed");
          }
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Listen to popstate for client-side navigation (e.g. from Home page card clicks)
  useEffect(() => {
    const handleUrlChange = () => {
      const nextId = getQueryProductId();
      setProductId(nextId);
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const fetchProduct = useCallback(
    async (id: string) => {
      if (!id) {
        setIsInvalidId(true);
        setIsNotFound(false);
        setError(null);
        setProduct(null);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setIsNotFound(false);
        setIsInvalidId(false);

        const data = await getProductByIdApi(id);
        setProduct(data);
        // Sync with ShopContext so global cart/navigation remains aligned
        setSelectedProductId(data.id);
      } catch (err: unknown) {
        setProduct(null);
        if (err instanceof ApiError && err.status === 404) {
          setIsNotFound(true);
        } else if (
          err instanceof Error &&
          (err.message.includes("404") ||
            err.message.toLowerCase().includes("not found"))
        ) {
          setIsNotFound(true);
        } else {
          const message =
            err instanceof Error
              ? err.message
              : "Failed to connect to the backend server";
          setError(message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setSelectedProductId]
  );

  useEffect(() => {
    fetchProduct(productId);
  }, [productId, fetchProduct]);

  const handleAddBundleToBag = (
    items: Array<{
      id: string;
      name: string;
      potSize: string;
      price: number;
      originalPrice?: number;
      image: string;
      quantity: number;
    }>
  ) => {
    for (const item of items) {
      addToCart({
        id: item.id,
        name: item.name,
        variant: item.potSize,
        potType: "Bundle Essential",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: item.image,
      });
    }
    openBag();
  };

  return (
    <div className="w-full bg-[#FCFAF4] text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        @media (max-width: 1023px) {
          .product-hero-anim[data-scroll-reveal="left"],
          .product-hero-anim[data-scroll-reveal="right"] {
            transform: translateY(18px) !important;
          }
          .product-hero-anim[data-scroll-reveal].is-revealed {
            transform: translateY(0) !important;
          }
        }
      `}</style>

      {/* STATE 1: LOADING SKELETON */}
      {isLoading && (
        <div role="status" aria-label="Loading product details">
          {/* Skeleton Breadcrumb */}
          <div className="w-full border-b border-[#F0F3EC] bg-white py-3.5">
            <div className="mx-auto w-[92%] max-w-[1280px]">
              <div className="h-4 w-48 rounded bg-[#E4EADF] animate-pulse" />
            </div>
          </div>

          <section
            aria-label="Loading Product"
            className="relative isolate w-full overflow-hidden pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-12 lg:pb-10"
          >
            <AboutEdgeLeaves />
            <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                {/* Left Column: Gallery Skeleton */}
                <div className="mx-auto w-full max-w-[480px] lg:mx-0 lg:col-span-5">
                  <div className="aspect-[4/4.2] w-full rounded-[24px] bg-[#E3E8DE] animate-pulse" />
                  <div className="mt-4 flex gap-3">
                    <div className="h-20 w-20 rounded-[14px] bg-[#E3E8DE] animate-pulse sm:h-22 sm:w-22" />
                    <div className="h-20 w-20 rounded-[14px] bg-[#E3E8DE] animate-pulse sm:h-22 sm:w-22" />
                  </div>
                </div>

                {/* Right Column: Info Skeleton */}
                <div className="mx-auto w-full max-w-[640px] lg:mx-0 lg:col-span-7 lg:ml-auto">
                  <div className="rounded-[22px] border border-[#E6EADF] bg-white p-6 shadow-[0_4px_20px_rgba(20,56,38,0.06)] animate-pulse space-y-4">
                    <div className="h-5 w-24 rounded-full bg-[#E3E8DE]" />
                    <div className="h-8 w-3/4 rounded bg-[#D6DED0]" />
                    <div className="h-4 w-1/3 rounded bg-[#E3E8DE]" />
                    <div className="h-8 w-40 rounded bg-[#D6DED0]" />
                    <div className="h-12 rounded-xl bg-[#E3E8DE]" />
                    <div className="space-y-2 pt-2">
                      <div className="h-3 w-full rounded bg-[#E3E8DE]" />
                      <div className="h-3 w-5/6 rounded bg-[#E3E8DE]" />
                      <div className="h-3 w-2/3 rounded bg-[#E3E8DE]" />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <div className="h-10 flex-1 rounded-xl bg-[#D6DED0]" />
                      <div className="h-10 flex-1 rounded-xl bg-[#D6DED0]" />
                    </div>
                    <div className="h-10 w-full rounded-[14px] bg-[#E3E8DE]" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* STATE 2: INVALID PRODUCT ID / NO PRODUCT SELECTED */}
      {!isLoading && isInvalidId && (
        <section
          role="region"
          aria-label="No Product Selected"
          className="relative isolate w-full overflow-hidden py-16 sm:py-24"
        >
          <AboutEdgeLeaves />
          <div className="relative z-10 mx-auto w-[92%] max-w-[560px] rounded-[24px] border border-[#E6EADF] bg-white p-8 sm:p-10 text-center shadow-[0_8px_30px_rgba(20,56,38,0.06)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F2F7EE] text-[#06452E]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h2 className="mt-4 font-serif text-[22px] font-bold text-[#143826] sm:text-[26px]">
              No Product Selected
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5E7163]">
              Please select a botanical companion from our fresh selections to
              view its complete specifications, pricing, and care guide.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#06452E] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#043322]"
              >
                Browse Green Companions
              </a>
              <a
                href="/plants"
                className="inline-flex items-center justify-center rounded-xl border border-[#06452E] bg-white px-5 py-3 text-[13px] font-semibold text-[#06452E] transition hover:bg-[#F2F7EE]"
              >
                View All Plants
              </a>
            </div>
          </div>
        </section>
      )}

      {/* STATE 3: PRODUCT NOT FOUND (404) */}
      {!isLoading && !isInvalidId && isNotFound && (
        <section
          role="region"
          aria-label="Product Not Found"
          className="relative isolate w-full overflow-hidden py-16 sm:py-24"
        >
          <AboutEdgeLeaves />
          <div className="relative z-10 mx-auto w-[92%] max-w-[560px] rounded-[24px] border border-[#E6EADF] bg-white p-8 sm:p-10 text-center shadow-[0_8px_30px_rgba(20,56,38,0.06)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEF3C7] text-[#D97706]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="mt-4 font-serif text-[22px] font-bold text-[#143826] sm:text-[26px]">
              Product Not Found
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5E7163]">
              We couldn&apos;t find a botanical specimen matching ID{" "}
              <code className="rounded bg-[#F2F7EE] px-1.5 py-0.5 font-mono text-[12px] text-[#06452E]">
                {productId || "unknown"}
              </code>
              . It may have been relocated, sold out, or removed from our nursery.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#043322]"
              >
                Explore Green Companions
              </a>
              <a
                href="/plants"
                className="inline-flex items-center justify-center rounded-xl border border-[#06452E] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#06452E] transition hover:bg-[#F2F7EE]"
              >
                View All Plants
              </a>
            </div>
          </div>
        </section>
      )}

      {/* STATE 4: API ERROR (NETWORK FAILURE / 500) */}
      {!isLoading && !isInvalidId && !isNotFound && error && (
        <section
          role="alert"
          aria-label="API Error"
          className="relative isolate w-full overflow-hidden py-16 sm:py-24"
        >
          <AboutEdgeLeaves />
          <div className="relative z-10 mx-auto w-[92%] max-w-[560px] rounded-[24px] border border-[#F3C7C7] bg-[#FFF8F8] p-8 sm:p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FDE8E8] text-[#C62828]">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="mt-4 font-serif text-[22px] font-bold text-[#203D2E] sm:text-[26px]">
              Unable to Load Product
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchProduct(productId)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#043322] cursor-pointer"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* STATE 5: SUCCESS STATE - DYNAMIC DATABASE PRODUCT */}
      {!isLoading && !isInvalidId && !isNotFound && !error && product && (
        <>
          {/* SECTION 1: BREADCRUMB */}
          <ProductBreadcrumb product={product} />

          {/* SECTION 2: PRODUCT HERO SHOWCASE & BENEFITS GROUP */}
          <section
            aria-label="Product Showcase and Purchasing"
            className="relative isolate w-full overflow-hidden pt-8 pb-6 sm:pt-10 sm:pb-8 lg:pt-12 lg:pb-10"
          >
            <AboutEdgeLeaves />
            <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
              <div className="flex flex-col gap-6 sm:gap-7">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Left Column: Gallery & Thumbnails */}
                  <div
                    data-scroll-reveal="left"
                    className="product-hero-anim mx-auto w-full max-w-[480px] lg:mx-0 lg:col-span-5"
                  >
                    <ProductGallery product={product} />
                  </div>

                  {/* Right Column: Title, Rating, Price, Options, Pincode & CTAs */}
                  <div
                    data-scroll-reveal="right"
                    className="product-hero-anim mx-auto w-full max-w-[640px] lg:mx-0 lg:col-span-7 lg:ml-auto"
                  >
                    <ProductInfoBuy product={product} />
                  </div>
                </div>

                {/* SECTION 3: 4 TRUST & QUALITY BENEFITS */}
                <div data-scroll-reveal="fade-up" data-stagger="1">
                  <ProductBenefits />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: PLANT CARE & ADVICE GUIDE */}
          <section
            aria-label="Plant Care & Advice Guide"
            data-scroll-reveal="fade-up"
            className="relative isolate w-full overflow-hidden py-6 sm:py-8 lg:py-10"
          >
            <AboutEdgeLeaves />
            <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
              <ProductCareGuide />
            </div>
          </section>

          {/* SECTION 5: FREQUENTLY BOUGHT TOGETHER BUNDLE */}
          <section
            aria-label="Frequently Bought Together"
            data-scroll-reveal="fade-up"
            className="relative isolate w-full overflow-hidden py-6 sm:py-8 lg:py-10"
          >
            <AboutEdgeLeaves />
            <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
              <ProductBundle onAddBundleToBag={handleAddBundleToBag} />
            </div>
          </section>

          {/* SECTION 6: COMPLEMENTARY GREEN COMPANIONS */}
          <section
            aria-label="Complementary Green Companions"
            data-scroll-reveal="fade-up"
            className="relative isolate w-full overflow-hidden py-6 sm:py-8 lg:py-10"
          >
            <AboutEdgeLeaves />
            <div className="relative z-10 mx-auto w-[92%] max-w-[1280px]">
              <ProductCompanions />
            </div>
          </section>

          {/* SECTION 7: NEWSLETTER EMAIL BANNER */}
          <div className="mt-8 sm:mt-12 lg:mt-16">
            <GreenCommunity />
          </div>

          {/* BOTTOM-ALIGNED ADD TO BAG DRAWER MODAL */}
          <AddToBagDrawer />
        </>
      )}
    </div>
  );
}
