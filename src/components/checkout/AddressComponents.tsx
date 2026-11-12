// ==========================================
// 1. Types & Interfaces
// ==========================================

export interface SavedAddressItem {
  id: string;
  name: string;
  phone: string;
  addressLines: string;
  pincode: string;
  routeInfo: string;
  tag: string;
  isDefault?: boolean;
}

export interface SummaryOrderItem {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
}

// ==========================================
// 2. Step Indicator Component
// ==========================================

export function AddressStepIndicator({ currentStep = 2 }: { currentStep?: 1 | 2 | 3 }) {
  const isStep1Done = currentStep >= 2;
  const isStep2Done = currentStep >= 3;
  const isStep1Active = currentStep === 1;
  const isStep2Active = currentStep === 2;
  const isStep3Active = currentStep === 3;

  return (
    <div className="w-full max-w-full rounded-[20px] border border-[#E6EADF] bg-white px-2.5 sm:px-6 py-3 sm:py-4 shadow-[0_2px_14px_rgba(20,56,38,0.04)]">
      <div className="mx-auto flex w-full max-w-[820px] items-center justify-between">
        {/* Step 1: Cart Review */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div
            className={`flex h-6.5 w-6.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-[11px] sm:text-[13px] font-bold transition-colors ${
              isStep1Done
                ? "bg-[#06452E] text-white"
                : isStep1Active
                ? "bg-[#06452E] text-white ring-2 sm:ring-4 ring-[#E2EFE0]"
                : "bg-[#EDF2EA] text-[#718073] border border-[#D5E0D2]"
            }`}
          >
            {isStep1Done ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              "1"
            )}
          </div>
          <div className="min-w-0">
            <span
              className={`block text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider ${
                isStep1Active ? "text-[#06452E]" : "text-[#718073]"
              }`}
            >
              STEP 1
            </span>
            <span
              className={`text-[11.5px] sm:text-[14px] font-bold leading-tight ${
                isStep1Active
                  ? "text-[#06452E]"
                  : isStep1Done
                  ? "text-[#18382B]"
                  : "text-[#718073]"
              }`}
            >
              <span className="hidden sm:inline">Cart Review</span>
              <span className="sm:hidden">Cart</span>
            </span>
          </div>
        </div>

        {/* Connecting Line 1 (Step 1 to Step 2) */}
        <div
          className={`mx-1.5 sm:mx-4 flex-1 h-[2px] transition-colors ${
            isStep1Done ? "bg-[#06452E]" : "bg-[#D4DDD1]"
          }`}
          aria-hidden="true"
        />

        {/* Step 2: Address */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div
            className={`flex h-6.5 w-6.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-[11px] sm:text-[13px] font-bold transition-colors ${
              isStep2Done
                ? "bg-[#06452E] text-white"
                : isStep2Active
                ? "bg-[#06452E] text-white ring-2 sm:ring-4 ring-[#E2EFE0]"
                : "bg-[#EDF2EA] text-[#718073] border border-[#D5E0D2]"
            }`}
          >
            {isStep2Done ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              "2"
            )}
          </div>
          <div className="min-w-0">
            <span
              className={`block text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider ${
                isStep2Active ? "text-[#06452E]" : "text-[#718073]"
              }`}
            >
              STEP 2
            </span>
            <span
              className={`text-[11.5px] sm:text-[14px] font-bold leading-tight ${
                isStep2Active
                  ? "text-[#06452E]"
                  : isStep2Done
                  ? "text-[#18382B]"
                  : "text-[#718073]"
              }`}
            >
              Address
            </span>
          </div>
        </div>

        {/* Connecting Line 2 (Step 2 to Step 3) */}
        <div
          className={`mx-1.5 sm:mx-4 flex-1 h-[2px] transition-colors ${
            isStep2Done ? "bg-[#06452E]" : "bg-[#D4DDD1]"
          }`}
          aria-hidden="true"
        />

        {/* Step 3: Payment & Guarantee */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <div
            className={`flex h-6.5 w-6.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-[11px] sm:text-[13px] font-bold transition-colors ${
              isStep3Active
                ? "bg-[#06452E] text-white ring-2 sm:ring-4 ring-[#E2EFE0]"
                : "bg-[#EDF2EA] text-[#718073] border border-[#D5E0D2]"
            }`}
          >
            3
          </div>
          <div className="min-w-0">
            <span
              className={`block text-[8.5px] sm:text-[10px] font-bold uppercase tracking-wider ${
                isStep3Active ? "text-[#06452E]" : "text-[#718073]"
              }`}
            >
              STEP 3
            </span>
            <span
              className={`text-[11.5px] sm:text-[14px] leading-tight ${
                isStep3Active
                  ? "font-bold text-[#06452E]"
                  : "font-semibold text-[#718073]"
              }`}
            >
              <span className="hidden sm:inline">Payment &amp; Guarantee</span>
              <span className="sm:hidden">Payment</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Reusable Saved Address Card Component
// ==========================================

interface AddressCardProps {
  address: SavedAddressItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function AddressCard({
  address,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={`relative flex cursor-pointer flex-col justify-between rounded-[22px] border p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-5.5 ${
        isSelected
          ? "border-[#06452E] bg-[#F7FAF4] shadow-[0_4px_24px_rgba(6,69,46,0.08)] ring-1 ring-[#06452E]"
          : "border-[#E2E8D8] bg-white shadow-[0_2px_14px_rgba(20,56,38,0.04)] hover:border-[#CCD8C4] hover:shadow-md"
      }`}
    >
      <div>
        {/* Top Badges & Radio Indicator */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-[#E8F3E5] px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#06452E]">
              {address.tag}
            </span>
            {address.isDefault && (
              <span className="rounded-full border border-[#B4D2AF] bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#1B6E32]">
                DEFAULT
              </span>
            )}
          </div>

          {/* Selection Radio Circle */}
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${
              isSelected
                ? "bg-[#06452E] text-white shadow-xs"
                : "border-2 border-[#CCD8C4] bg-white"
            }`}
          >
            {isSelected && (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Recipient Name */}
        <h3 className="mt-3 text-[16px] font-bold text-[#18382B] sm:text-[17px]">
          {address.name}
        </h3>

        {/* Contact Phone */}
        <div className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-[#5E7163]">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-[#2B733E]">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span>{address.phone}</span>
        </div>

        {/* Full Postal Address */}
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#4D6354]">
          {address.addressLines} &ndash;{" "}
          <strong className="font-bold text-[#18382B]">{address.pincode}</strong>
        </p>

        {/* Route / Greenhouse Logistics Verification Badge */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-[#2E6B3E]">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0 text-[#1B6E32]">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="line-clamp-1">{address.routeInfo}</span>
        </div>
      </div>

      {/* Action Row at Bottom */}
      <div className="mt-4 flex items-center justify-between border-t border-[#EAEFE5] pt-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(address.id);
            }}
            className="inline-flex cursor-pointer items-center gap-1 text-[12px] font-semibold text-[#4D6354] transition hover:text-[#06452E]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>{address.tag.includes("HOME") ? "Edit Address" : "Edit"}</span>
          </button>

          {onDelete && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(address.id);
              }}
              className="inline-flex cursor-pointer items-center gap-1 text-[12px] font-semibold text-[#A34B4B] transition hover:text-[#B91C1C]"
              title="Delete Address"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-3.5 w-3.5"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Delete</span>
            </button>
          )}
        </div>

        {isSelected ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#06452E] px-3.5 py-1 text-[11.5px] font-semibold text-white shadow-xs">
            <span>&#10003;</span> Delivering Here
          </span>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(address.id);
            }}
            className="cursor-pointer rounded-full bg-[#EBF2E6] px-3.5 py-1 text-[11.5px] font-semibold text-[#06452E] transition hover:bg-[#DDECD7]"
          >
            Deliver Here
          </button>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. Order Summary Item Component
// ==========================================

export function OrderSummaryItemCard({ item }: { item: SummaryOrderItem }) {
  return (
    <div className="flex items-center justify-between gap-2.5 sm:gap-3 py-2 first:pt-0 w-full min-w-0">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {/* Product Thumbnail with quantity badge */}
        <div className="relative h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-[10px] border border-[#E6EADF] bg-[#F7F7F2]">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
          <span className="absolute bottom-0.5 right-0.5 rounded-sm bg-[#06452E]/85 px-1 py-0.2 text-[8px] sm:text-[8.5px] font-bold text-white shadow-2xs">
            {item.quantity}x
          </span>
        </div>

        {/* Product Titles & Badge */}
        <div className="min-w-0 flex-1">
          <h4 className="text-[12.5px] sm:text-[13px] font-bold text-[#18382B] truncate leading-snug">
            {item.name}
          </h4>
          <p className="text-[10px] sm:text-[10.5px] text-[#718073] truncate">
            {item.subtitle}
          </p>
          <span className="mt-0.5 inline-flex rounded-full bg-[#EDF7ED] px-1.5 py-0.2 text-[8.5px] sm:text-[9px] font-semibold text-[#1B6E32]">
            {item.badge}
          </span>
        </div>
      </div>

      {/* Pricing */}
      <div className="text-right shrink-0">
        <span className="block text-[12.5px] sm:text-[13px] font-bold text-[#06452E]">
          ₹{item.price}
        </span>
        {item.originalPrice && (
          <span className="text-[10px] sm:text-[10.5px] text-[#9EAAA0] line-through">
            ₹{item.originalPrice}
          </span>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. Kanchan Botanical Shield Card Component
// ==========================================

export function BotanicalShieldCard() {
  const shieldFeatures = [
    {
      id: "guarantee",
      title: "7-Day Transit Health Guarantee",
      desc: "Free replacement or full refund if your plant arrives wilted or damaged.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5 text-[#215732]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "boxes",
      title: "Custom Breather Boxes",
      desc: "Eco-crafted ventilated boxes keep leaves hydrated and soil intact in motion.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5 text-[#215732]">
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      ),
    },
    {
      id: "encryption",
      title: "100% Encrypted Transactions",
      desc: "Bank-grade 256-bit SSL secured payments and verified botanist support.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4.5 w-4.5 text-[#215732]">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="rounded-[22px] border border-[#E6EADF] bg-white p-5 shadow-[0_2px_14px_rgba(20,56,38,0.04)] sm:p-5.5">
      <div className="flex items-center gap-2 border-b border-[#F0F4EC] pb-3 text-[11px] font-bold uppercase tracking-wider text-[#3B6F45]">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z"
            clipRule="evenodd"
          />
        </svg>
        <span>KANCHAN BOTANICAL SHIELD</span>
      </div>

      <div className="mt-3.5 space-y-3.5">
        {shieldFeatures.map((feat) => (
          <div key={feat.id} className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#EAF3E7] text-[#215732]">
              {feat.icon}
            </div>
            <div>
              <h5 className="text-[12.5px] font-bold text-[#18382B]">
                {feat.title}
              </h5>
              <p className="mt-0.5 text-[11px] leading-relaxed text-[#5E7163]">
                {feat.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. Support / Help Card Component
// ==========================================

export function SupportHelpCard() {
  return (
    <div className="flex items-center gap-3.5 rounded-[18px] border border-[#CCD8C4] bg-[#EDF7ED]/75 p-3.5 text-[#18382B] shadow-2xs sm:p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#06452E] text-white shadow-xs">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </div>
      <div className="text-[11.5px] leading-relaxed">
        <strong className="block font-bold text-[#06452E]">
          Need Plant Selection Help?
        </strong>
        <p className="text-[#4D6354]">
          Speak directly to our botanic team at{" "}
          <a
            href="tel:+919983443720"
            className="font-semibold text-[#06452E] underline underline-offset-2 hover:text-[#043824]"
          >
            +91 99834 43720
          </a>
          .
        </p>
      </div>
    </div>
  );
}

