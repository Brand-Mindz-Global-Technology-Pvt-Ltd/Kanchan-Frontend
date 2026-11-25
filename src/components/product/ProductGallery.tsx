import { useState, useEffect, useMemo } from "react";
import { useShop } from "../../context/ShopContext";
import { getCustomerToken } from "../../services/customerAuth";
import { resolveProductImage, type BackendProduct } from "../../services/productApi";

export interface ProductGalleryProps {
  product?: BackendProduct;
}

export default function ProductGallery({ product }: ProductGalleryProps = {}) {
  const { selectedProduct, isProductWishlisted, toggleWishlist, navigateTo } = useShop();
  const productName = product ? product.name : selectedProduct.name;
  const productBadge = product ? product.badge : selectedProduct.badge;
  const productBadgeBg = (product ? product.badgeBg : selectedProduct.badgeBg) || "#06452E";

  const currentProductId = product?.id || selectedProduct.id;
  const isWishlisted = isProductWishlisted(currentProductId);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const token = getCustomerToken();
    if (!token) {
      navigateTo("/login");
      return;
    }
    const targetProduct = product || selectedProduct;
    await toggleWishlist(targetProduct);
  };

  // Derive all unique, valid image URLs from product (supporting 1, 2, 4, etc. uploaded images)
  const galleryImages: string[] = useMemo(() => {
    const list: string[] = [];

    // Parse product.images if present (array of strings, or stringified JSON)
    let rawImages: unknown = product?.images;
    if (typeof rawImages === "string") {
      try {
        rawImages = JSON.parse(rawImages);
      } catch {
        rawImages = undefined;
      }
    }

    if (Array.isArray(rawImages)) {
      for (const item of rawImages) {
        if (typeof item === "string" && item.trim()) {
          list.push(item.trim());
        }
      }
    }

    // Ensure primary product.image is included as primary if not already in list
    if (product?.image && typeof product.image === "string" && product.image.trim()) {
      const primary = product.image.trim();
      if (!list.includes(primary)) {
        list.unshift(primary);
      }
    }

    // If still no images from product, fallback to selectedProduct or default
    if (list.length === 0) {
      if (selectedProduct.image) {
        list.push(selectedProduct.image);
      } else {
        list.push("");
      }
    }

    // Resolve URLs and deduplicate while preserving original order
    const resolved: string[] = [];
    const seen = new Set<string>();

    for (const raw of list) {
      const resolvedUrl = resolveProductImage(raw);
      if (resolvedUrl && !seen.has(resolvedUrl)) {
        seen.add(resolvedUrl);
        resolved.push(resolvedUrl);
      }
    }

    return resolved;
  }, [product?.id, product?.image, product?.images, selectedProduct.image]);

  const primaryImage = galleryImages[0] || resolveProductImage("");

  const [activeImage, setActiveImage] = useState<string>(primaryImage);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  // When switching products or when gallery images change, reset to primary image and reset zoom
  useEffect(() => {
    setActiveImage(primaryImage);
    setIsZoomed(false);
  }, [product?.id, primaryImage]);

  // Thumbnails: exactly matches available images (1 for 1, 2 for 2, 4 for 4, etc. No duplicates)
  const thumbnails = galleryImages.map((src, idx) => ({
    id: `thumb-${product?.id || "prod"}-${idx}-${src}`,
    src,
    label: `${productName} - View ${idx + 1}`,
  }));

  return (
    <div className="flex w-full max-w-[480px] flex-col gap-4">
      {/* Main Image Container */}
      <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-[24px] border border-[#E6EADF] bg-[#F7F7F2] shadow-[0_4px_20px_rgba(20,56,38,0.06)]">
        {/* Main Product Image */}
        <img
          src={activeImage}
          alt={`${productName} in nursery pot`}
          className={`h-full w-full object-cover object-center transition-transform duration-300 ${
            isZoomed ? "scale-125 cursor-zoom-out" : "hover:scale-105 cursor-zoom-in"
          }`}
          onClick={() => setIsZoomed((prev) => !prev)}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = resolveProductImage("");
          }}
        />

        {/* Product Badge (top-left) */}
        {productBadge && (
          <span
            className="absolute left-3.5 top-3.5 z-10 inline-flex items-center rounded-full px-3.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm sm:left-4 sm:top-4 sm:text-[12px]"
            style={{ backgroundColor: productBadgeBg }}
          >
            {productBadge}
          </span>
        )}

        {/* Wishlist Button (top-right) */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3.5 top-3.5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-110 active:scale-90 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#D94F4F" : "none"}
            stroke={isWishlisted ? "#D94F4F" : "#D94F4F"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 sm:h-4.5 sm:w-4.5"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Zoom Indicator (bottom-right) */}
        <button
          type="button"
          onClick={() => setIsZoomed((prev) => !prev)}
          className="absolute bottom-3.5 right-3.5 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#18382B] shadow-sm backdrop-blur-xs transition hover:bg-white"
          title={isZoomed ? "Zoom out" : "Zoom in"}
          aria-label="Toggle zoom"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail Switchers: Exactly matches available product images (1, 2, 4, etc.) */}
      {thumbnails.length > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {thumbnails.map((thumb) => {
            const isSelected = activeImage === thumb.src;
            return (
              <button
                key={thumb.id}
                type="button"
                onClick={() => setActiveImage(thumb.src)}
                className={`relative h-20 w-20 cursor-pointer overflow-hidden rounded-[14px] border-2 bg-[#F7F7F2] transition-all sm:h-22 sm:w-22 ${
                  isSelected
                    ? "border-[#06452E] shadow-sm ring-2 ring-[#06452E]/25"
                    : "border-[#E6EADF] opacity-75 hover:opacity-100 hover:border-[#CCD8C4]"
                }`}
                aria-label={thumb.label}
              >
                <img
                  src={thumb.src}
                  alt={thumb.label}
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = resolveProductImage("");
                  }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
