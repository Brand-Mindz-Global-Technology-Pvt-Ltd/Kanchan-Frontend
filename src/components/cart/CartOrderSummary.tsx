import { useState } from "react";
import { createPortal } from "react-dom";
import { useShop } from "../../context/ShopContext";

interface CartOrderSummaryProps {
  subtotal: number;
  totalSavings: number;
}

export default function CartOrderSummary({
  subtotal,
  totalSavings,
}: CartOrderSummaryProps) {
  const { cartItems, totalCount } = useShop();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Delivery Cost is always FREE for now regardless of subtotal
  const deliveryFee = 0;
  // Total Payable equals Bag Subtotal only (minus promo discount if applied)
  const totalPayable = Math.max(0, subtotal - discount);
  const itemCount = totalCount;

  const handleScrollToSummary = () => {
    const el = document.getElementById("cart-order-summary");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === "KANCHAN10" || code === "GROWGREEN" || code === "WELCOME") {
      const discountVal = Math.round(subtotal * 0.1); // 10% off
      setDiscount(discountVal);
      setPromoMessage(`Promo "${code}" applied! ₹${discountVal} saved.`);
    } else {
      setPromoMessage("Invalid promo code. Try KANCHAN10");
    }
  };

  return (
    <>
      <div
        id="cart-order-summary"
        className="scroll-mt-24 rounded-[20px] border border-[#E6EADF] bg-white p-4.5 sm:p-5.5 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full max-w-full min-w-0"
      >
        {/* Title */}
        <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B] sm:text-[20px]">
          Order Summary
        </h3>

      {/* Financial Breakdown Rows */}
      <div className="mt-3.5 space-y-2 text-[12px] sm:text-[12.5px]">
        {/* Bag Subtotal */}
        <div className="flex items-center justify-between text-[#5E7163]">
          <span>
            Bag Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-[#18382B]">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Plant Transit Insurance */}
        <div className="flex items-center justify-between text-[#5E7163]">
          <span className="flex items-center gap-1">
            Plant Transit Insurance
            <span
              className="cursor-help text-[#9EAAA0]"
              title="Full protection against transit shocks"
            >
              ℹ
            </span>
          </span>
          <span className="font-semibold text-[#1B6E32]">FREE</span>
        </div>

        {/* Delivery Cost */}
        <div className="flex items-center justify-between text-[#5E7163]">
          <span>Delivery Cost</span>
          <span className="font-semibold text-[#1B6E32]">FREE</span>
        </div>

        {/* Promo Discount if applied */}
        {discount > 0 && (
          <div className="flex items-center justify-between text-[#1B6E32]">
            <span>Promo Discount</span>
            <span className="font-semibold">- ₹{discount}</span>
          </div>
        )}
      </div>

      {/* Total Payable Row */}
      <div className="mt-3.5 border-t border-[#F0F4EC] pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] sm:text-[14px] font-bold text-[#18382B]">
            Total Payable
          </span>
          <span className="font-serif-heading text-[20px] font-bold text-[#06452E] sm:text-[22px]">
            ₹{totalPayable.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="mt-0.5 text-[10.5px] text-[#718073]">
          Inclusive of all greenhouse taxes
        </p>

        {/* Total Savings Pill (if any savings) */}
        {totalSavings > 0 && (
          <div className="mt-2 flex items-center justify-between rounded-[8px] bg-[#EDF7ED] px-2.5 py-1 text-[11px] font-semibold text-[#1B6E32]">
            <span>Total Savings On This Order</span>
            <span>₹{(totalSavings + discount).toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      {/* Primary CTA: Proceed to Secure Checkout (Desktop and Tablet — on mobile <768px, the sticky bar acts as the primary action) */}
      <a
        href="/address"
        className="btn-premium mt-3.5 hidden md:flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#06452E] px-5 text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#043824] active:scale-98"
      >
        <span>Proceed to Secure Checkout</span>
        <span className="text-[15px]" aria-hidden="true">
          &rarr;
        </span>
      </a>

      {/* Subtle Compact Promo Code Toggle */}
      <div className="mt-3 border-t border-[#F0F4EC] pt-2">
        {!showPromoInput && discount === 0 ? (
          <button
            type="button"
            onClick={() => setShowPromoInput(true)}
            className="flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-[#06452E] hover:underline"
          >
            <span>+ Have a promo code?</span>
          </button>
        ) : (
          <form onSubmit={handleApplyPromo} className="space-y-1">
            <div className="flex gap-1.5">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Try KANCHAN10"
                className="h-8 flex-1 rounded-[8px] border border-[#CCD8C4] bg-[#FCFAF4] px-2.5 text-[11px] uppercase text-[#18382B] placeholder:normal-case placeholder:text-[#9EAAA0] focus:border-[#06452E] focus:outline-none"
              />
              <button
                type="submit"
                className="h-8 cursor-pointer rounded-[8px] bg-[#06452E] px-3 text-[11px] font-semibold text-white transition hover:bg-[#043824]"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p
                className={`text-[10.5px] ${
                  discount > 0
                    ? "font-semibold text-[#1B6E32]"
                    : "text-[#C25E38]"
                }`}
              >
                {promoMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>

    {/* Mobile Sticky Bottom Checkout Bar (Mobile Only: md:hidden) — Portaled to document.body to prevent parent container transforms/overflow from interfering */}
    {cartItems.length > 0 &&
      typeof document !== "undefined" &&
      createPortal(
        <div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FCFAF4] border-t border-[#DDE5D6] shadow-[0_-4px_25px_rgba(20,56,38,0.12)] px-3.5 sm:px-5 py-2.5"
          style={{
            paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0.625rem))",
          }}
        >
          <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
            {/* Left Side: TOTAL PAYABLE + Dynamic Amount (Sans-Serif) + View Details */}
            <div className="flex flex-col justify-center shrink-0 min-w-0 pr-1 font-sans">
              <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5E7163] leading-none">
                TOTAL PAYABLE
              </span>
              <span className="mt-0.5 font-sans text-[17px] sm:text-[18.5px] font-bold tracking-tight text-[#06452E] leading-tight whitespace-nowrap">
                ₹{totalPayable.toLocaleString("en-IN")}
              </span>
              <button
                type="button"
                onClick={handleScrollToSummary}
                className="mt-0.5 text-left font-sans text-[10px] sm:text-[10.5px] font-semibold text-[#06452E] underline underline-offset-2 transition hover:text-[#043824] cursor-pointer"
              >
                View Details
              </button>
            </div>

            {/* Right Side: Primary Checkout Action */}
            <a
              href="/address"
              className="flex h-10.5 sm:h-11 shrink-0 items-center justify-center gap-1.5 rounded-[12px] bg-[#06452E] px-3.5 sm:px-5 text-[11px] sm:text-[12.5px] font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#043824] active:scale-95 whitespace-nowrap font-sans"
            >
              <span>PROCEED TO CHECKOUT</span>
              <span className="text-[13px] sm:text-[14px]" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>
        </div>,
        document.body
      )}
  </>
);
}
