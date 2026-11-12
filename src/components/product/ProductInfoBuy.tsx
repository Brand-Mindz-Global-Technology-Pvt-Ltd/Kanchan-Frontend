import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import { resolveProductImage, type BackendProduct } from "../../services/productApi";

export interface BagItemData {
  id: string;
  name: string;
  potSize?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

export interface ProductInfoBuyProps {
  product?: BackendProduct;
  onAddToBag?: (item: BagItemData) => void;
  onBuyNow?: (item: BagItemData) => void;
}

export default function ProductInfoBuy({
  product,
  onAddToBag,
  onBuyNow,
}: ProductInfoBuyProps = {}) {
  const { selectedProduct, addToCart, openBag, navigateTo } = useShop();

  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Active product fields directly from database product
  const currentId = product ? product.id : selectedProduct.id;
  const currentName = product ? product.name : selectedProduct.name;
  const currentBadge = product ? product.badge : selectedProduct.badge;
  const currentBadgeBg = (product ? product.badgeBg : selectedProduct.badgeBg) || "#06452E";
  const currentCategory = product ? product.category : selectedProduct.tag;
  const currentDescription = product ? product.description : selectedProduct.description;
  const currentImage = product ? resolveProductImage(product.image) : selectedProduct.image;

  // Actual database selling price directly from API - no pot size logic, no offers
  const sellingPriceNumeric =
    product && typeof product.priceNumeric === "number" && !isNaN(product.priceNumeric)
      ? product.priceNumeric
      : product && product.price
      ? parseFloat(String(product.price).replace(/[^\d.]/g, "")) || 0
      : selectedProduct.priceNumeric || 549;

  const displayPrice =
    product && product.price
      ? product.price.startsWith("₹")
        ? product.price
        : `₹${product.price}`
      : `₹${sellingPriceNumeric}`;

  // Actual stock quantity directly from API - no hardcoded stock
  const stockCount =
    product && typeof product.stock === "number"
      ? product.stock
      : typeof selectedProduct.stock === "number"
      ? selectedProduct.stock
      : 0;

  const isOutOfStock = stockCount <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    const itemData: BagItemData = {
      id: currentId,
      name: currentName,
      potSize: "Standard",
      price: sellingPriceNumeric,
      quantity,
      image: currentImage,
    };

    addToCart({
      id: itemData.id,
      name: itemData.name,
      variant: "Standard",
      potType: "Nursery Planter",
      price: itemData.price,
      quantity: itemData.quantity,
      image: itemData.image,
    });

    onAddToBag?.(itemData);
    openBag();
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    const itemData: BagItemData = {
      id: currentId,
      name: currentName,
      potSize: "Standard",
      price: sellingPriceNumeric,
      quantity,
      image: currentImage,
    };

    addToCart({
      id: itemData.id,
      name: itemData.name,
      variant: "Standard",
      potType: "Nursery Planter",
      price: itemData.price,
      quantity: itemData.quantity,
      image: itemData.image,
    });

    onBuyNow?.(itemData);
    navigateTo("/cart");
  };

  return (
    <div className="flex w-full flex-col space-y-3.5 sm:space-y-4 rounded-[22px] border border-[#E6EADF] bg-white p-5 sm:p-6 lg:p-6.5 shadow-[0_4px_20px_rgba(20,56,38,0.06)]">
      {/* Category Tag & Badges */}
      <div className="flex flex-wrap items-center gap-2">
        {currentBadge && (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: currentBadgeBg }}
          >
            {currentBadge}
          </span>
        )}
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#3B6F45]">
          {currentCategory}
        </span>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="font-serif-heading text-[26px] font-bold tracking-tight text-[#18382B] sm:text-[30px] lg:text-[32px]">
          {currentName}
        </h1>

        {/* Real Stock Status - actual database stock quantity without reviews/ratings */}
        <div className="mt-2 flex items-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
              isOutOfStock
                ? "bg-[#FEE2E2] text-[#B91C1C]"
                : "bg-[#EDF7ED] text-[#1B6E32]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isOutOfStock ? "bg-[#DC2626]" : "bg-[#1B6E32]"
              }`}
            />
            {isOutOfStock ? "Out of Stock" : "In Stock"}
          </span>
        </div>
      </div>

      {/* Pricing Row: Actual database selling price only - No MRP, No discounts, No SAVE TODAY badge */}
      <div className="flex flex-wrap items-baseline gap-2.5 border-y border-[#F0F3EC] py-2.5">
        <span className="text-[24px] font-bold text-[#18382B] sm:text-[28px]">
          {displayPrice}
        </span>
        <span className="ml-auto text-[11px] text-[#718073]">
          Inclusive of all taxes
        </span>
      </div>

      {/* Stock & Fast Delivery Notice */}
      <div className="flex items-center gap-2 rounded-[12px] bg-[#F2F7EE] px-3.5 py-2 text-[11.5px] font-medium text-[#18382B] shadow-[0_2px_8px_rgba(20,56,38,0.03)]">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5 shrink-0 text-[#2B733E]"
          aria-hidden="true"
        >
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-3v4h4.68l-1.68-4z" />
        </svg>
        <span>
          {isOutOfStock ? (
            <strong className="font-semibold text-[#B91C1C]">Currently Out of Stock &ndash; Restocking soon</strong>
          ) : (
            <>
              <strong className="font-semibold text-[#06452E]">In Stock</strong> &ndash; Ordered today, arrives in 2 to 3 days (Free delivery above ₹799)
            </>
          )}
        </span>
      </div>

      {/* Botanical Description */}
      <p className="text-[12.5px] leading-relaxed text-[#5E7163] sm:text-[13px]">
        {currentDescription}
      </p>

      {/* Quantity & Actions Group */}
      <div className="flex flex-wrap items-center gap-2.5 pt-2">
        {/* Compact Quantity Stepper */}
        <div className="flex h-10 items-center rounded-[10px] border border-[#CCD8C4] bg-white px-1.5 shadow-2xs">
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-md text-[15px] text-[#4D6354] transition hover:bg-[#F0F4EC] hover:text-[#18382B] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className="w-7 text-center text-[12.5px] font-bold text-[#18382B]">
            {quantity}
          </span>
          <button
            type="button"
            disabled={isOutOfStock}
            onClick={() => setQuantity((prev) => prev + 1)}
            className="flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-md text-[15px] text-[#4D6354] transition hover:bg-[#F0F4EC] hover:text-[#18382B] disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            &#43;
          </button>
        </div>

        {/* Buy Now Primary Button */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className={`btn-premium flex h-10 flex-1 min-w-[130px] items-center justify-center rounded-[10px] px-5 text-[13px] font-semibold text-white shadow-sm transition-all ${
            isOutOfStock
              ? "bg-[#D1D5DB] text-[#9CA3AF] cursor-not-allowed"
              : "bg-[#06452E] hover:bg-[#043322] cursor-pointer active:scale-98"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : "Buy Now"}
        </button>

        {/* Add to Bag Secondary Button */}
        <button
          type="button"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`flex h-10 items-center justify-center rounded-[10px] border px-4.5 text-[12.5px] font-semibold transition-all ${
            isOutOfStock
              ? "border-[#D1D5DB] bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
              : isAdded
              ? "border-[#06452E] bg-[#06452E] text-white cursor-pointer"
              : "btn-premium-outline border-[#06452E] bg-white text-[#06452E] hover:bg-[#F2F7EE] cursor-pointer active:scale-98"
          }`}
        >
          {isOutOfStock ? "Sold Out" : isAdded ? "Added to Bag ✓" : "Add To Bag"}
        </button>
      </div>

      {/* 30-Day Happiness Guarantee & Rewards Strip */}
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 rounded-[14px] border border-[#E9EFE4] bg-[#F7F9F5] px-3.5 py-2.5 text-[11.5px] font-medium text-[#4D6354] shadow-[0_2px_8px_rgba(20,56,38,0.03)] sm:px-4">
        <div className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-[#3B6F45]"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>30-Day Happiness Guarantee &amp; Free Returns</span>
        </div>
        <div className="flex items-center gap-1 text-[#06452E] font-semibold">
          <span>Earn 54 Kanchan Points</span>
          <span aria-hidden="true">&gt;</span>
        </div>
      </div>
    </div>
  );
}
