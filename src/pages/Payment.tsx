import { useState, useEffect, useCallback } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import {
  AddressStepIndicator,
  OrderSummaryItemCard,
  BotanicalShieldCard,
  SupportHelpCard,
  type SummaryOrderItem,
} from "../components/checkout/AddressComponents";
import {
  DeliveryAddressSummaryCard,
  PaymentOptionCard,
  type DeliveryAddressSummary,
  type PaymentMethodOption,
} from "../components/checkout/PaymentComponents";
import BotanicalLeaf from "../components/about/BotanicalLeaf";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import OrderSuccessModal from "../components/checkout/OrderSuccessModal";
import { getCustomerToken } from "../services/customerAuth";
import { fetchAddressesApi, type CustomerAddress } from "../services/addressApi";
import {
  createOrderApi,
  OrderApiError,
  type CustomerOrder,
} from "../services/orderApi";

// Payment Method Options definition: COD is the primary active method
const paymentMethodOptions: PaymentMethodOption[] = [
  {
    id: "cod",
    title: "Cash on Delivery / Pay at Doorstep",
    badge: "RECOMMENDED & VERIFIED FOR LIVE PLANTS",
    subtitle:
      "Pay securely via Cash or UPI QR scan when your fresh live specimens arrive safely at your doorstep.",
  },
  {
    id: "upi",
    title: "UPI & Instant QR",
    subtitle: "Direct gateway verification temporarily unavailable for this region — please use Cash on Delivery.",
    logos: ["GPay", "PhonePe", "Paytm"],
  },
];

// What Happens Next step items
const whatHappensNextSteps = [
  {
    step: "1",
    title: "Order Confirmed",
    desc: "Your order details are confirmed and reserved in our greenhouse nursery.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="m9 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Carefully Packed",
    desc: "Your live specimens are acclimatized, boxed, and root-moisturized with care.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Delivered to Your Doorstep",
    desc: "Climate-controlled courier delivers to your door. Inspect and pay on arrival.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
      >
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function Payment() {
  const {
    cartItems,
    isCartLoading,
    reloadCart,
    clearCart,
    navigateTo,
    selectedAddressId,
  } = useShop();

  // Selected payment method - COD only
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("cod");

  // Authentication & address states
  const [isGuest, setIsGuest] = useState(false);
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [activeAddress, setActiveAddress] = useState<CustomerAddress | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(true);

  // Order submission state
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<CustomerOrder | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Load customer addresses from database
  const loadAddressData = useCallback(async () => {
    const token = getCustomerToken();
    if (!token) {
      setIsGuest(true);
      setIsLoadingAddress(false);
      return;
    }

    setIsGuest(false);
    setIsLoadingAddress(true);
    try {
      const data = await fetchAddressesApi();
      setAddresses(data);

      if (data.length > 0) {
        // Choose selected address or default address or first address
        const chosen =
          data.find((a) => a.id === selectedAddressId) ||
          data.find((a) => a.isDefault) ||
          data[0];
        setActiveAddress(chosen);
      } else {
        setActiveAddress(null);
      }
    } catch {
      setActiveAddress(null);
    } finally {
      setIsLoadingAddress(false);
    }
  }, [selectedAddressId]);

  useEffect(() => {
    loadAddressData();
  }, [loadAddressData]);

  useScrollReveal([selectedPaymentMethod]);

  // Server-matching calculation
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCost = 0;
  const totalPayable = subtotal;

  // Format delivery address for display
  const currentDeliveryAddress: DeliveryAddressSummary | null = activeAddress
    ? {
        name: activeAddress.name,
        phone: activeAddress.phone,
        addressLines: [
          activeAddress.flatBuilding,
          activeAddress.streetColony,
          activeAddress.landmark ? `Near ${activeAddress.landmark}` : null,
          activeAddress.pincode,
        ]
          .filter(Boolean)
          .join(", "),
        routeInfo:
          activeAddress.tag === "WORK"
            ? "Reception delivery accessible 9 AM – 7 PM (Zone South-1)"
            : "Climate-Controlled Botanical Transit (Zone South-1)",
      }
    : null;

  // Format cart items for order summary card
  const summaryItemsToRender: SummaryOrderItem[] = cartItems.map((ci) => ({
    id: ci.id,
    name: ci.name,
    subtitle: ci.variant || "Live Specimen",
    badge: "Live Specimen",
    price: ci.price,
    originalPrice: ci.originalPrice,
    quantity: ci.quantity,
    image: ci.image,
  }));

  // Handle Cash on Delivery Order Confirmation
  const handleConfirmPayment = async () => {
    // 1. Prevent duplicate submission
    if (isPlacingOrder || placedOrder) return;

    setOrderError(null);

    // 2. Auth check
    const token = getCustomerToken();
    if (!token) {
      setOrderError("Please sign in to your account before placing an order.");
      return;
    }

    // 3. Cart check
    if (cartItems.length === 0) {
      setOrderError("Your shopping bag is empty. Please add plants before checking out.");
      return;
    }

    // 4. Delivery address check
    if (!activeAddress || !activeAddress.id) {
      setOrderError(
        "Please select or add a delivery address on the Address step before placing your order."
      );
      return;
    }

    setIsPlacingOrder(true);

    try {
      // 5. Call real backend API
      const created = await createOrderApi({
        deliveryAddressId: activeAddress.id,
        paymentMethod: "cod",
      });

      setPlacedOrder(created);

      // 6. Clear frontend cart state only after successful creation
      try {
        clearCart();
        if (reloadCart) reloadCart();
      } catch {
        // Ignored
      }

      // 7. Open celebration modal
      setIsSuccessModalOpen(true);
    } catch (err: unknown) {
      if (err instanceof OrderApiError) {
        setOrderError(err.message);
      } else {
        const msg = err instanceof Error ? err.message : "Failed to place order";
        setOrderError(msg);
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#FCFAF4] text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Decorative Leaf Border Arrangement */}
      <AboutEdgeLeaves includeMiddleLeaves />

      {/* Floating Botanical Background Accents */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-35" aria-hidden="true">
        <BotanicalLeaf className="top-[12%] left-[4%] h-24 w-24 rotate-45 text-[#86AA86]" />
        <BotanicalLeaf className="top-[38%] right-[5%] h-28 w-28 -rotate-12 text-[#99B899]" />
        <BotanicalLeaf className="bottom-[18%] left-[7%] h-32 w-32 rotate-90 text-[#7DA27D]" />
        <BotanicalLeaf className="bottom-[8%] right-[8%] h-24 w-24 -rotate-45 text-[#91B291]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-3.5 py-5 sm:px-6 sm:py-8 lg:px-8 w-full max-w-full overflow-hidden">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 text-[11px] sm:text-[13px]">
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
              <a href="/cart" className="transition hover:text-[#06452E]">
                Cart Review
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/address" className="transition hover:text-[#06452E]">
                Address
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#06452E]" aria-current="page">
              Payment &amp; Guarantee
            </li>
          </ol>
        </nav>

        {/* Step Indicator (Step 3 Active) */}
        <div className="mb-6 sm:mb-8 w-full max-w-full animate-fade-in">
          <AddressStepIndicator currentStep={3} />
        </div>

        {/* GUEST WARNING IF NOT SIGNED IN */}
        {isGuest && (
          <div className="mb-6 rounded-[20px] border border-[#E0E6DA] bg-white p-6 shadow-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="mt-3 font-serif-heading text-[18px] font-bold text-[#18382B]">
              Sign In to Place Your Order
            </h3>
            <p className="mt-1 text-[13px] text-[#5E7163] max-w-md mx-auto">
              Please log in to your Kanchan account to proceed with Cash on Delivery checkout and save your plant orders.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="/login?redirect=/payment"
                className="inline-flex items-center justify-center rounded-full bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#053825] transition"
              >
                Customer Sign In
              </a>
              <a
                href="/signup?redirect=/payment"
                className="inline-flex items-center justify-center rounded-full border border-[#06452E] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#06452E] hover:bg-[#F2F7F2] transition"
              >
                Create Account
              </a>
            </div>
          </div>
        )}

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 w-full max-w-full">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Current Address & Payment Methods (7-8 cols)  */}
          {/* ========================================================= */}
          <div className="space-y-5 sm:space-y-6 lg:col-span-7 xl:col-span-8 w-full max-w-full min-w-0 animate-fade-in-up">
            {/* Current Address Card */}
            <div data-scroll-reveal="fade-up">
              {isLoadingAddress ? (
                <div className="h-28 animate-pulse rounded-[20px] border border-[#E6EADF] bg-white p-5" />
              ) : currentDeliveryAddress ? (
                <DeliveryAddressSummaryCard
                  address={currentDeliveryAddress}
                  onEditAddress={() => {
                    window.location.href = "/address";
                  }}
                />
              ) : (
                <div className="rounded-[20px] border border-dashed border-[#D4DDD1] bg-white p-5 text-center">
                  <p className="text-[13px] text-[#617467]">
                    No delivery address selected.
                  </p>
                  <a
                    href="/address"
                    className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#06452E] underline"
                  >
                    Select or Add Delivery Address &rarr;
                  </a>
                </div>
              )}
            </div>

            {/* Payment Method Container */}
            <div data-scroll-reveal="fade-up" className="rounded-[22px] border border-[#E6EADF] bg-white p-3 sm:p-6 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full max-w-full min-w-0">
              {/* Header with Title and Verified Botanical COD Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#F0F4EC] pb-3.5 sm:pb-4">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#EAF4E8] text-[#1B6E32]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 sm:h-4.5 sm:w-4.5"
                    >
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <h3 className="font-serif-heading text-[17px] font-bold text-[#18382B] sm:text-[20px]">
                    Payment Method
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-[#EBF7EE] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-[#1B6E32]">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0">
                    <path
                      fillRule="evenodd"
                      d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>100% Verified Delivery</span>
                </div>
              </div>

              {/* Payment Methods List: COD active */}
              <div className="mt-3.5 sm:mt-4 space-y-3 w-full min-w-0">
                {paymentMethodOptions.map((opt) => {
                  const isSelected = selectedPaymentMethod === opt.id;
                  const isAvailable = opt.id === "cod";

                  return (
                    <div
                      key={opt.id}
                      className={!isAvailable ? "opacity-60 cursor-not-allowed" : ""}
                    >
                      <PaymentOptionCard
                        option={opt}
                        isSelected={isSelected}
                        onSelect={(id) => {
                          if (id === "cod") {
                            setSelectedPaymentMethod("cod");
                          }
                        }}
                      >
                        {opt.id === "cod" && (
                          <div className="rounded-[12px] bg-[#EAF4E8] p-3 text-[12px] text-[#1B6E32] flex items-start gap-2">
                            <span className="text-[14px]">🌿</span>
                            <div>
                              <p className="font-semibold">
                                Pay upon doorstep delivery
                              </p>
                              <p className="mt-0.5 text-[#3C6442]">
                                Inspect your plants upon arrival. Hand cash to our plant courier rider or scan the on-spot UPI QR code.
                              </p>
                            </div>
                          </div>
                        )}
                      </PaymentOptionCard>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* What Happens Next? Section */}
            <div data-scroll-reveal="fade-up" className="rounded-[22px] border border-[#E6EADF] bg-white p-3.5 sm:p-6 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full max-w-full min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#F0F4EC] pb-3 sm:pb-3.5">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-[8px] bg-[#EAF4E8] text-[#1B6E32]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <h4 className="font-serif-heading text-[16px] font-bold text-[#18382B] sm:text-[18px]">
                    What Happens Next?
                  </h4>
                </div>
                <span className="rounded-full bg-[#EDF7ED] px-2.5 py-0.5 text-[10px] sm:text-[10.5px] font-semibold text-[#1B6E32]">
                  Safe &amp; Protected Transit
                </span>
              </div>

              {/* Steps Layout */}
              <div className="relative mt-4 sm:mt-5 w-full min-w-0">
                <div
                  className="pointer-events-none absolute top-5 left-[16%] right-[16%] hidden h-[2px] border-t-2 border-dashed border-[#DCE7D8] md:block"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-3 w-full min-w-0">
                  {whatHappensNextSteps.map((stepItem) => (
                    <div
                      key={stepItem.step}
                      className="relative flex items-start gap-3 rounded-xl p-1.5 sm:p-2 transition md:flex-col md:items-center md:text-center w-full min-w-0"
                    >
                      <div className="relative z-10 flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full border border-[#D5E1D1] bg-[#EAF4E8] text-[#1B6E32] shadow-2xs">
                        {stepItem.icon}
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-4.5 sm:w-4.5 items-center justify-center rounded-full bg-[#06452E] text-[8.5px] sm:text-[9.5px] font-bold text-white shadow-xs">
                          {stepItem.step}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h5 className="text-[13px] sm:text-[13.5px] font-bold text-[#18382B]">
                          {stepItem.title}
                        </h5>
                        <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-[11.5px] leading-relaxed text-[#5E7163]">
                          {stepItem.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Return to Delivery Address Link */}
            <div className="pt-1">
              <a
                href="/address"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#06452E] hover:underline"
              >
                <span>&larr;</span>
                <span>Return to Delivery Address</span>
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Order Summary & Trust Shields (4-5 cols)     */}
          {/* ========================================================= */}
          <div
            className="space-y-4 lg:col-span-5 lg:sticky lg:top-24 xl:col-span-4 w-full max-w-full min-w-0 animate-fade-in-up animation-delay-150"
            data-scroll-reveal="left"
          >
            {/* Order Summary Card */}
            <div
              id="payment-order-summary"
              className="scroll-mt-24 rounded-[20px] border border-[#E6EADF] bg-white p-4 sm:p-5 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full max-w-full min-w-0"
            >
              <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B] sm:text-[20px]">
                Order Summary
              </h3>

              {/* Items List */}
              {isCartLoading ? (
                <div className="py-6 text-center text-[12.5px] text-[#718073]">
                  Loading bag items...
                </div>
              ) : cartItems.length === 0 && !placedOrder ? (
                <div className="py-6 text-center text-[12.5px] text-[#718073]">
                  Your bag is empty.
                  <div className="mt-2">
                    <a
                      href="/plants"
                      className="font-semibold text-[#06452E] underline"
                    >
                      Browse Plants &rarr;
                    </a>
                  </div>
                </div>
              ) : (
                <div className="mt-2.5 divide-y divide-[#F0F4EC] border-b border-[#F0F4EC] pb-2.5">
                  {summaryItemsToRender.map((item) => (
                    <OrderSummaryItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="mt-2.5 space-y-1.5 text-[12px] sm:text-[12.5px]">
                <div className="flex items-center justify-between text-[#5E7163]">
                  <span>
                    Bag Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                  </span>
                  <span className="font-semibold text-[#18382B]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

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

                <div className="flex items-center justify-between text-[#5E7163]">
                  <span>Delivery Cost</span>
                  <span className="font-semibold text-[#1B6E32]">
                    {deliveryCost === 0 ? "FREE" : `₹${deliveryCost}`}
                  </span>
                </div>
              </div>

              {/* Divider & Total Payable */}
              <div className="mt-3 border-t border-[#F0F4EC] pt-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13.5px] sm:text-[14px] font-bold text-[#18382B]">
                    Total Payable
                  </span>
                  <span className="font-serif-heading text-[20px] font-bold text-[#06452E] sm:text-[22px]">
                    ₹{totalPayable.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-0.5 text-[10.5px] text-[#718073]">
                  Cash on Delivery &bull; Inclusive of all taxes
                </p>
              </div>

              {/* ERROR BANNER */}
              {orderError && (
                <div className="mt-3 rounded-[12px] border border-[#F5C2C7] bg-[#FDF2F2] p-3 text-[12px] font-semibold text-[#842029]">
                  ⚠ {orderError}
                </div>
              )}

              {/* Confirm COD Order CTA Button */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={
                  isPlacingOrder ||
                  Boolean(placedOrder) ||
                  cartItems.length === 0 ||
                  !activeAddress
                }
                className="btn-premium mt-3.5 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#06452E] px-5 text-[12.5px] sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-[#043824] active:scale-98 disabled:opacity-60"
              >
                {isPlacingOrder ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Placing COD Order...
                  </span>
                ) : placedOrder ? (
                  <span className="flex items-center gap-2">
                    <span>&#10003;</span>
                    <span>Order Placed Successfully!</span>
                  </span>
                ) : (
                  <>
                    <span>Place COD Order</span>
                    <span className="text-[16px]" aria-hidden="true">
                      &rarr;
                    </span>
                  </>
                )}
              </button>

              {/* Order Confirmation Feedback Card */}
              {placedOrder && (
                <div className="mt-3 rounded-[14px] border border-[#C8E6C9] bg-[#E8F5E9] p-3.5 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#1B6E32]">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Order #{placedOrder.orderNumber} Confirmed!</span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-[#4E6254]">
                    Estimated Delivery: <strong>2–3 Business Days</strong> via Climate-Controlled Transit.
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSuccessModalOpen(true)}
                      className="cursor-pointer inline-flex items-center gap-1 rounded-[10px] bg-[#EAF4E8] border border-[#B6D6BF] px-3 py-1.5 text-[11.5px] font-semibold text-[#06452E] shadow-2xs transition hover:bg-[#D8ECD6]"
                    >
                      <span>🎉 View Celebration</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo("/my-orders")}
                      className="cursor-pointer inline-flex items-center gap-1 rounded-[10px] bg-[#06452E] px-3.5 py-1.5 text-[11.5px] font-semibold text-white shadow-2xs transition hover:bg-[#043322]"
                    >
                      <span>Track in My Orders &rarr;</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kanchan Botanical Shield Card */}
            <BotanicalShieldCard />

            {/* Support / Help Card */}
            <SupportHelpCard />
          </div>
        </div>
      </div>

      {/* Premium Order Confirmation Celebration Popup */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        orderId={placedOrder?.orderNumber || ""}
        onClose={() => setIsSuccessModalOpen(false)}
        onViewOrders={() => {
          setIsSuccessModalOpen(false);
          navigateTo("/my-orders");
        }}
        totalAmount={placedOrder?.totalAmount || totalPayable}
        itemCount={placedOrder?.itemCount || summaryItemsToRender.reduce((s, i) => s + i.quantity, 0)}
      />
    </div>
  );
}
