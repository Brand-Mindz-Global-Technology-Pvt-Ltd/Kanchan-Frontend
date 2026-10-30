import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  originalPrice: string;
  price: string;
  rating: number;
  badge: string;
  badgeBg?: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product, isWishlisted: boolean) => void;
};

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !isWishlisted;
    setIsWishlisted(next);
    onToggleWishlist?.(product, next);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdded(true);
    onAddToCart?.(product);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <article data-reveal-card className="group relative flex h-full min-w-0 flex-col rounded-[20px] border border-[#E6E9DF] bg-white p-2.5 shadow-[0px_8px_24px_0px_#1A432412] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_14px_32px_0px_#1A43241A] sm:p-4">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden rounded-[14px] bg-[#F7F7F2]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        <span
          className="absolute left-2.5 top-2.5 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white shadow-sm sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]"
          style={{ backgroundColor: product.badgeBg || "#06452E" }}
        >
          {product.badge}
        </span>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-110 active:scale-90 sm:right-3 sm:top-3 sm:h-8 sm:w-8 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#D94F4F" : "none"}
            stroke={isWishlisted ? "#D94F4F" : "#D94F4F"}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-colors duration-200"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col pt-3">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center text-[#FBBF24]">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <span className="text-[12px] font-medium text-[#6B7280]">
            ({product.rating.toFixed(1)})
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-1.5 text-[15px] font-bold leading-snug text-[#1B3B2F] sm:text-[16px]">
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="mt-0.5 text-[12px] leading-normal text-[#6B7280]">
          {product.subtitle}
        </p>

        {/* Price & Add Button Row */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3.5">
          <div className="flex flex-col">
          <span className="text-[11px] text-[#9CA3AF] line-through leading-none sm:text-[12px]">
              {product.originalPrice}
            </span>
          <span className="mt-1 text-[16px] font-bold leading-tight text-[#1B3B2F] sm:text-[19px]">
              {product.price}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center gap-1 rounded-[10px] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all duration-200 active:scale-95 cursor-pointer sm:gap-1.5 sm:px-3.5 sm:text-[12px] ${
              isAdded ? "bg-[#183B2B]" : "bg-[#06452E] hover:bg-[#043322]"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>{isAdded ? "Added" : "Add"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
