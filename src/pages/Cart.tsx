import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import CartItemCard from "../components/cart/CartItemCard";
import BotanicalAddons, { type BotanicalAddonItem } from "../components/cart/BotanicalAddons";
import CartOrderSummary from "../components/cart/CartOrderSummary";
import {
  AddressStepIndicator,
  BotanicalShieldCard,
  SupportHelpCard,
} from "../components/checkout/AddressComponents";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import BotanicalLeaf from "../components/about/BotanicalLeaf";

export default function Cart() {
  const {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalSavings,
    isCartLoading,
    cartError,
    reloadCart,
    isCartAuthenticated,
  } = useShop();

  const [addedAddonIds, setAddedAddonIds] = useState<string[]>([]);

  useScrollReveal([cartItems.length]);

  const handleUpdateQuantity = (id: string, delta: number) => {
    updateQuantity(id, delta);
  };

  const handleRemove = (id: string) => {
    removeItem(id);
  };

  const handleSaveForLater = (id: string) => {
    // Toggle or note saved state
    console.log("Saved for later:", id);
  };

  const handleAddAddon = (addon: BotanicalAddonItem) => {
    if (addedAddonIds.includes(addon.id)) return;

    setAddedAddonIds((prev) => [...prev, addon.id]);

    addToCart({
      id: addon.id,
      name: addon.name,
      variant: addon.variant,
      potType: "Care Essential",
      price: addon.price,
      originalPrice: addon.originalPrice,
      quantity: 1,
      image: addon.image,
    });
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#EDF3E6] text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Decorative botanical edge leaves */}
      <AboutEdgeLeaves includeMiddleLeaves />

      {/* Ambient background botanical leaf illustrations */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-35"
        aria-hidden="true"
      >
        <BotanicalLeaf className="top-[10%] left-[4%] h-24 w-24 rotate-45 text-[#86AA86]" />
        <BotanicalLeaf className="top-[38%] right-[5%] h-28 w-28 -rotate-12 text-[#99B899]" />
        <BotanicalLeaf className="bottom-[18%] left-[6%] h-32 w-32 rotate-90 text-[#7DA27D]" />
        <BotanicalLeaf className="bottom-[8%] right-[8%] h-24 w-24 -rotate-45 text-[#91B291]" />
      </div>

      {/* Main Page Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-3.5 py-4 pb-28 sm:px-6 sm:py-6 sm:pb-32 md:pb-6 lg:px-8 w-full max-w-full">
        {/* Breadcrumb Navigation directly on mint background */}
        <nav
          aria-label="Breadcrumb"
          className="mb-3 pl-6 sm:pl-10 md:pl-12 lg:pl-14 text-[11px] sm:text-[12.5px]"
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-[#718073]">
            <li>
              <a href="/" className="transition hover:text-[#06452E]">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/plants" className="transition hover:text-[#06452E]">
                Plants
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/plants" className="transition hover:text-[#06452E]">
                Add To Bag
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#06452E]" aria-current="page">
              Cart Review
            </li>
          </ol>
        </nav>

        {/* 3-Step Checkout Indicator (Floating White Card) */}
        <div className="mb-5 sm:mb-6" data-scroll-reveal="fade-up">
          <AddressStepIndicator currentStep={1} />
        </div>

        {/* Main Two-Column Layout Grid */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Your Garden Cart Card + Add-ons Card (8 cols) */}
          {/* ========================================================= */}
          <div className="space-y-5 lg:col-span-8 animate-fade-in-up" data-scroll-reveal="fade-up">
            {/* Card 1: Your Garden Cart */}
            <div className="rounded-[22px] border border-[#E6EADF] bg-white p-4.5 sm:p-6 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full">
              {/* Card Header: Title + Item Count + CLEAR ALL */}
              <div className="flex items-center justify-between border-b border-[#F0F4EC] pb-3.5 mb-4">
                <div className="flex items-baseline gap-2">
                  <h1 className="font-serif-heading text-[21px] sm:text-[24px] font-bold text-[#18382B]">
                    Your Garden Cart
                  </h1>
                  <span className="text-[12px] sm:text-[13px] font-medium text-[#718073]">
                    ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                  </span>
                </div>

                {cartItems.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="flex cursor-pointer items-center gap-1.5 text-[11px] sm:text-[11.5px] font-bold uppercase tracking-wider text-[#D32F2F] hover:text-[#B71C1C] transition hover:underline"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                    </svg>
                    <span>CLEAR ALL</span>
                  </button>
                )}
              </div>

              {/* Items List inside card */}
              {isCartLoading ? (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                    <svg
                      className="h-6 w-6 animate-spin text-[#06452E]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B]">
                    Loading Your Garden Cart...
                  </h3>
                  <p className="mx-auto mt-1 max-w-[340px] text-[12px] text-[#5E7163]">
                    Retrieving your saved botanical plants and pots from database.
                  </p>
                </div>
              ) : !isCartAuthenticated ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-7 w-7"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="font-serif-heading text-[19px] font-bold text-[#18382B]">
                    Sign In to Access Your Cart
                  </h3>
                  <p className="mx-auto mt-1 max-w-[360px] text-[12.5px] text-[#5E7163]">
                    Please sign in with your customer account to view your saved items, synchronize quantities across devices, and complete checkout.
                  </p>
                  <div className="mt-4.5 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="/login"
                      className="inline-flex items-center justify-center rounded-[10px] bg-[#06452E] px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs transition hover:bg-[#043824]"
                    >
                      Sign In to Account
                    </a>
                    <a
                      href="/plants"
                      className="inline-flex items-center justify-center rounded-[10px] border border-[#CCD8C4] bg-white px-4 py-2 text-[12.5px] font-semibold text-[#18382B] transition hover:bg-[#F4F7F2]"
                    >
                      Explore Plants
                    </a>
                  </div>
                </div>
              ) : cartError ? (
                <div className="py-10 text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEAE5] text-[#C62828]">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B]">
                    Unable to load cart
                  </h3>
                  <p className="mx-auto mt-1 max-w-[340px] text-[12px] text-[#C62828]">
                    {cartError}
                  </p>
                  <button
                    type="button"
                    onClick={reloadCart}
                    className="mt-4 inline-flex items-center justify-center rounded-[10px] bg-[#06452E] px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs transition hover:bg-[#043824] cursor-pointer"
                  >
                    Retry
                  </button>
                </div>
              ) : cartItems.length === 0 ? (
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
                  <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B]">
                    Your cart is currently empty
                  </h3>
                  <p className="mx-auto mt-1 max-w-[340px] text-[12px] text-[#5E7163]">
                    Explore our nursery-grown air-purifying and easy-care plants to revitalize your home.
                  </p>
                  <a
                    href="/plants"
                    className="mt-4 inline-flex items-center justify-center rounded-[10px] bg-[#06452E] px-5 py-2 text-[12.5px] font-semibold text-white shadow-xs transition hover:bg-[#043824]"
                  >
                    Explore Plants &rarr;
                  </a>
                </div>
              ) : (
                <div className="divide-y divide-[#F0F4EC]">
                  {cartItems.map((item) => (
                    <CartItemCard
                      key={`${item.id}-${item.variant}`}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemove}
                      onSaveForLater={handleSaveForLater}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Card 2: Botanical Care Add-ons */}
            <div data-scroll-reveal="fade-up">
              <BotanicalAddons
                onAddAddon={handleAddAddon}
                addedAddonIds={addedAddonIds}
              />
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Order Summary & Trust Shields (4 cols)       */}
          {/* ========================================================= */}
          <div
            className="space-y-4 lg:col-span-4 lg:sticky lg:top-24 w-full max-w-full min-w-0 animate-fade-in-up animation-delay-150"
            data-scroll-reveal="left"
          >
            {/* Card 1: Order Summary */}
            <CartOrderSummary
              subtotal={subtotal}
              totalSavings={totalSavings}
            />

            {/* Card 2: Kanchan Botanical Shield */}
            <BotanicalShieldCard />

            {/* Card 3: Need Plant Selection Help? */}
            <SupportHelpCard />
          </div>
        </div>
      </div>
    </div>
  );
}
