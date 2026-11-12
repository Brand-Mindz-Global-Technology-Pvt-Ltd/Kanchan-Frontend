import { useEffect } from "react";
import { useShop, navigateTo } from "../../context/ShopContext";

export interface BagItem {
  id: string;
  name: string;
  potSize: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

export interface AddToBagDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: BagItem[];
  onUpdateQuantity?: (id: string, potSize: string, delta: number) => void;
  onRemoveItem?: (id: string, potSize: string) => void;
}

export default function AddToBagDrawer({
  isOpen: propIsOpen,
  onClose: propOnClose,
  items: propItems,
  onUpdateQuantity: propOnUpdateQuantity,
  onRemoveItem: propOnRemoveItem,
}: AddToBagDrawerProps) {
  const shop = useShop();

  const isOpen = propIsOpen !== undefined ? propIsOpen : shop.isBagOpen;
  const onClose = propOnClose || shop.closeBag;

  // Derive bag items from props or fallback to shop.cartItems
  const items: BagItem[] =
    propItems !== undefined
      ? propItems
      : shop.cartItems.map((ci) => ({
          id: ci.id,
          name: ci.name,
          potSize: ci.variant,
          price: ci.price,
          originalPrice: ci.originalPrice,
          image: ci.image,
          quantity: ci.quantity,
        }));

  const handleUpdateQuantity = (id: string, potSize: string, delta: number) => {
    if (propOnUpdateQuantity) {
      propOnUpdateQuantity(id, potSize, delta);
    } else {
      shop.updateQuantity(id, delta, potSize);
    }
  };

  const handleRemoveItem = (id: string, potSize: string) => {
    if (propOnRemoveItem) {
      propOnRemoveItem(id, potSize);
    } else {
      shop.removeItem(id, potSize);
    }
  };

  const handleViewCart = () => {
    onClose();
    navigateTo("/cart");
  };

  // Lock background scroll and bind Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = 799;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Semi-transparent dark overlay */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom-Aligned Drawer Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-drawer-heading"
        className="relative z-10 flex max-h-[88vh] w-full max-w-[680px] flex-col rounded-t-[28px] border-t border-x border-[#E6EADF] bg-[#FCFAF4] shadow-[0_-12px_40px_rgba(20,56,38,0.18)] transition-transform duration-300 sm:rounded-t-[32px]"
      >
        {/* Mobile drag handle indicator */}
        <div className="pt-3 pb-1 sm:hidden">
          <div className="mx-auto h-1.5 w-12 rounded-full bg-[#D4DDD0]" aria-hidden="true" />
        </div>

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#EAEFE5] px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex items-baseline gap-2.5">
            <h2
              id="bag-drawer-heading"
              className="font-serif-heading text-[20px] font-bold tracking-tight text-[#18382B] sm:text-[23px]"
            >
              Add To Bag
            </h2>
            <span className="rounded-full bg-[#EBF2E6] px-2.5 py-0.5 text-[12px] font-bold text-[#06452E]">
              {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag drawer"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#EAEFE5] text-[#18382B] transition hover:bg-[#DDE5D6] hover:text-[#06452E]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4.5 w-4.5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Milestone Alert */}
        <div className="border-b border-[#EAEFE5] bg-[#F4F8F1] px-5 py-3 sm:px-7">
          <div className="flex items-center justify-between text-[11.5px] font-medium text-[#18382B] sm:text-[12px]">
            {isFreeShipping ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#1B6E32]">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Congratulations! You qualify for <strong>FREE Delivery</strong>!
              </span>
            ) : (
              <span>
                Add <strong className="font-bold text-[#06452E]">₹{remainingForFreeShipping}</strong> more to unlock <strong>FREE Shipping</strong>!
              </span>
            )}
            <span className="font-bold text-[#06452E]">{shippingProgressPct}%</span>
          </div>

          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#DDE6D8]">
            <div
              className="h-full rounded-full bg-[#06452E] transition-all duration-300"
              style={{ width: `${shippingProgressPct}%` }}
            />
          </div>
        </div>

        {/* Scrollable Cart Items List */}
        <div className="max-h-[46vh] flex-1 overflow-y-auto px-5 py-3 sm:px-7 sm:py-4">
          {items.length === 0 ? (
            <div className="py-10 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-7 w-7"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="font-serif-heading text-[17px] font-bold text-[#18382B]">
                Your bag is currently empty
              </p>
              <p className="mt-1 text-[12.5px] text-[#718073]">
                Add your favorite lush greens to start growing your indoor sanctuary!
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#EAEFE5]">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.potSize}`}
                  className="flex items-center gap-3.5 py-3.5 sm:gap-4 sm:py-4"
                >
                  {/* Product Image */}
                  <div className="h-18 w-18 shrink-0 overflow-hidden rounded-[14px] border border-[#E6EADF] bg-[#F4F6F0] sm:h-20 sm:w-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[13.5px] font-bold text-[#18382B] sm:text-[14.5px]">
                      {item.name}
                    </h3>
                    <p className="text-[11.5px] text-[#718073] sm:text-[12px]">
                      {item.potSize}
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-[#06452E] sm:text-[14px]">
                      ₹{item.price}
                      {item.originalPrice && (
                        <span className="ml-1.5 text-[11px] font-normal text-[#9EAAA0] line-through">
                          ₹{item.originalPrice}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {/* Stepper */}
                    <div className="flex h-8 items-center rounded-[9px] border border-[#D0DEC4] bg-white px-1 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, item.potSize, -1)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[14px] text-[#4D6354] transition hover:bg-[#F0F4EC] hover:text-[#18382B]"
                        aria-label="Decrease quantity"
                      >
                        &minus;
                      </button>
                      <span className="w-6 text-center text-[12.5px] font-bold text-[#18382B]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleUpdateQuantity(item.id, item.potSize, 1)}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[14px] text-[#4D6354] transition hover:bg-[#F0F4EC] hover:text-[#18382B]"
                        aria-label="Increase quantity"
                      >
                        &#43;
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id, item.potSize)}
                      className="cursor-pointer text-[11px] font-medium text-[#8EA091] underline decoration-[#CCD8C4] underline-offset-2 transition hover:text-[#C25E38]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Subtotal & CTAs */}
        <div className="border-t border-[#EAEFE5] bg-[#FAF8F2] px-5 py-4 sm:px-7 sm:py-5">
          {/* Subtotal Row */}
          <div className="mb-3.5">
            <div className="flex items-baseline justify-between">
              <span className="text-[13.5px] font-semibold text-[#4D6354]">
                Subtotal
              </span>
              <span className="font-serif-heading text-[20px] font-bold text-[#18382B] sm:text-[22px]">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] text-[#718073]">
              Taxes included. Standard shipping calculated at checkout.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {/* View Cart & Checkout Button */}
            <button
              type="button"
              onClick={handleViewCart}
              className="btn-premium flex h-11.5 w-full cursor-pointer items-center justify-center rounded-[12px] bg-[#06452E] px-6 text-[13.5px] font-semibold text-white shadow-sm active:scale-98 sm:h-12 sm:text-[14px]"
            >
              <span>View Cart &amp; Checkout</span>
              <span className="ml-2" aria-hidden="true">&rarr;</span>
            </button>

            {/* Continue Shopping Button (Dismisses drawer) */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-10.5 w-full cursor-pointer items-center justify-center rounded-[12px] border border-[#CCD8C4] bg-white px-6 text-[13px] font-semibold text-[#18382B] shadow-2xs transition hover:bg-[#F2F7EE] hover:text-[#06452E] sm:h-11"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
