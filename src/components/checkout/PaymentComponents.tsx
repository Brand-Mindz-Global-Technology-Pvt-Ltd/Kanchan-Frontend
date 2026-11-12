import React, { useState } from "react";

// ==========================================
// 1. Interfaces & Types
// ==========================================

export interface DeliveryAddressSummary {
  name: string;
  phone: string;
  addressLines: string;
  routeInfo: string;
}

export interface PaymentMethodOption {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  logos?: string[];
  bankIcon?: boolean;
}

// ==========================================
// 2. Delivery Address Summary Card Component
// ==========================================

interface DeliveryAddressSummaryCardProps {
  address: DeliveryAddressSummary;
  onEditAddress?: () => void;
}

export function DeliveryAddressSummaryCard({
  address,
  onEditAddress,
}: DeliveryAddressSummaryCardProps) {
  return (
    <div className="w-full max-w-full rounded-[20px] border border-[#E6EADF] bg-white p-4 sm:p-5.5 shadow-[0_2px_14px_rgba(20,56,38,0.04)]">
      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-3.5 min-w-0 flex-1">
          {/* Green Delivery Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF4E8] text-[#1B6E32] sm:h-10 sm:w-10">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4.5 w-4.5 sm:h-5 sm:w-5"
            >
              <rect x="1" y="3" width="15" height="13" rx="1" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#718073]">
              CURRENT ADDRESS
            </span>
            <h4 className="mt-0.5 text-[14px] font-bold text-[#18382B] sm:text-[14.5px] break-words">
              {address.name}{" "}
              <span className="font-normal text-[#4E6254]">({address.phone})</span>
            </h4>
            <p className="mt-1 text-[11.5px] leading-relaxed text-[#5E7163] sm:text-[12px] break-words">
              {address.addressLines}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10.5px] font-medium text-[#1B6E32] sm:text-[11px]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{address.routeInfo}</span>
            </div>
          </div>
        </div>

        {/* Edit Address Button */}
        <a
          href="/address"
          onClick={(e) => {
            if (onEditAddress) {
              e.preventDefault();
              onEditAddress();
            }
          }}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full border border-[#D5E1D1] bg-[#F4F9F2] px-3.5 py-1.5 text-[11.5px] font-semibold text-[#1B6E32] transition hover:bg-[#EAF3E7] hover:border-[#BED3B7]"
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
          <span>Edit Address</span>
        </a>
      </div>
    </div>
  );
}

// ==========================================
// 3. Reusable Payment Option Card Component
// ==========================================

interface PaymentOptionCardProps {
  option: PaymentMethodOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  children?: React.ReactNode;
}

export function PaymentOptionCard({
  option,
  isSelected,
  onSelect,
  children,
}: PaymentOptionCardProps) {
  return (
    <div
      onClick={() => onSelect(option.id)}
      className={`cursor-pointer rounded-[18px] border transition-all duration-300 ${
        isSelected
          ? "border-[#2E6B47] bg-[#F8FAF7] shadow-[0_2px_12px_rgba(46,107,71,0.06)] ring-1 ring-[#2E6B47]/20"
          : "border-[#E8EEE3] bg-white hover:border-[#D0DDC8] hover:bg-[#FDFEFC] hover:-translate-y-0.5 hover:shadow-xs"
      } p-3 sm:p-5 w-full max-w-full`}
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        {/* Left Side: Radio Button + Titles */}
        <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0 flex-1">
          {/* Radio Button */}
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors">
            {isSelected ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#06452E] bg-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[#06452E]" />
              </span>
            ) : (
              <span className="h-5 w-5 rounded-full border-2 border-[#C5D2C2] bg-white" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h4 className="text-[13.5px] font-bold text-[#18382B] sm:text-[15px]">
                {option.title}
              </h4>
              {option.badge && (
                <span className="rounded-full bg-[#175C3B] px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-white sm:text-[9px]">
                  {option.badge}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#5E7163] sm:text-[11.5px]">
              {option.subtitle}
            </p>
          </div>
        </div>

        {/* Right Badges / Icons: on mobile, indented and wrapped below */}
        {(option.logos || option.bankIcon) && (
          <div className="flex flex-wrap items-center gap-1.5 pl-[30px] sm:pl-0 sm:shrink-0">
            {option.logos &&
              option.logos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-[6px] border border-[#E2EBE0] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#3E5244] shadow-2xs sm:text-[10.5px] whitespace-nowrap"
                >
                  {logo}
                </span>
              ))}

            {option.bankIcon && (
              <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-[6px] text-[#5E7163]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5 sm:h-5 sm:w-5"
                >
                  <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expanded Accordion Panel for Selected Option */}
      {isSelected && children && (
        <div className="mt-3.5 pt-3.5 border-t border-[#E5EFE2] w-full min-w-0">
          {children}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. UPI Payment Panel (Expanded Content)
// ==========================================

interface UpiPaymentPanelProps {
  amount?: string;
  onVerifyAndPay?: (upiId: string) => void;
}

export function UpiPaymentPanel({
  amount = "₹1,303",
  onVerifyAndPay,
}: UpiPaymentPanelProps) {
  const [upiId, setUpiId] = useState("aditi.botanica@okaxis");
  const [isVerifying, setIsVerifying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const quickHandles = ["@okaxis", "@okhdfcbank", "@ybl", "@paytm"];

  const handleApplyHandle = (handle: string) => {
    const username = upiId.split("@")[0] || "aditi.botanica";
    setUpiId(`${username}${handle}`);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setPaySuccess(true);
      if (onVerifyAndPay) onVerifyAndPay(upiId);
    }, 1200);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="grid grid-cols-1 gap-4 rounded-[16px] bg-[#F7FAF6] p-2.5 sm:p-5 md:grid-cols-12 md:gap-6 border border-[#E2EBE0] w-full max-w-full min-w-0 overflow-hidden"
    >
      {/* Left Column: QR Code Scan Box */}
      <div className="flex flex-col items-center justify-center border-b border-[#E2EBE0] pb-4 md:col-span-5 md:border-b-0 md:border-r md:pr-5 md:pb-0 w-full min-w-0">
        <div className="relative flex flex-col items-center mx-auto">
          {/* QR Code Container */}
          <div className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-[16px] border border-[#D7E2D3] bg-white p-2.5 shadow-sm mx-auto">
            {/* Visual QR Code Pattern */}
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full text-[#143826]"
              fill="currentColor"
            >
              {/* Corner 1 (Top Left) */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="currentColor" />
              <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="13" width="12" height="12" rx="1.5" fill="currentColor" />

              {/* Corner 2 (Top Right) */}
              <rect x="67" y="5" width="28" height="28" rx="4" fill="currentColor" />
              <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="75" y="13" width="12" height="12" rx="1.5" fill="currentColor" />

              {/* Corner 3 (Bottom Left) */}
              <rect x="5" y="67" width="28" height="28" rx="4" fill="currentColor" />
              <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="75" width="12" height="12" rx="1.5" fill="currentColor" />

              {/* Matrix Data Bits */}
              <rect x="38" y="7" width="5" height="5" />
              <rect x="47" y="7" width="5" height="5" />
              <rect x="56" y="7" width="5" height="5" />
              <rect x="38" y="16" width="5" height="5" />
              <rect x="56" y="16" width="5" height="5" />
              <rect x="47" y="25" width="5" height="5" />
              <rect x="38" y="34" width="5" height="5" />
              <rect x="56" y="34" width="5" height="5" />
              <rect x="7" y="38" width="5" height="5" />
              <rect x="16" y="38" width="5" height="5" />
              <rect x="25" y="38" width="5" height="5" />
              <rect x="67" y="38" width="5" height="5" />
              <rect x="76" y="38" width="5" height="5" />
              <rect x="85" y="38" width="5" height="5" />

              {/* Center Botanical Logo Badge */}
              <circle cx="50" cy="50" r="11" fill="white" />
              <circle cx="50" cy="50" r="9" fill="#06452E" />
              <path
                d="M48 53c0-3 3-5 5-5s-2 5-5 5z"
                fill="#84E184"
              />
              <path
                d="M52 47c0 3-3 5-5 5s2-5 5-5z"
                fill="#C6F6D5"
              />

              {/* Bottom Right & Remaining Matrix */}
              <rect x="38" y="67" width="5" height="5" />
              <rect x="47" y="76" width="5" height="5" />
              <rect x="56" y="67" width="5" height="5" />
              <rect x="67" y="67" width="5" height="5" />
              <rect x="76" y="76" width="5" height="5" />
              <rect x="85" y="67" width="5" height="5" />
              <rect x="67" y="85" width="5" height="5" />
              <rect x="85" y="85" width="5" height="5" />
              <rect x="38" y="85" width="5" height="5" />
            </svg>
          </div>

          {/* Amount to Scan */}
          <span className="mt-2 text-[12px] sm:text-[12.5px] font-bold text-[#18382B]">
            Scan &amp; Pay {amount}
          </span>

          {/* Countdown Timer */}
          <div className="mt-1 flex items-center gap-1 text-[10px] sm:text-[10.5px] font-semibold text-[#8B6B23]">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3 text-[#B0892A]"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Expires in 09:41 mins</span>
          </div>
        </div>
      </div>

      {/* Right Column: Enter UPI ID / VPA */}
      <div className="flex flex-col justify-center md:col-span-7 w-full min-w-0">
        <form onSubmit={handlePay} className="space-y-3 w-full min-w-0">
          <div className="w-full min-w-0">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#718073]">
              OR ENTER YOUR UPI ID / VPA
            </label>
            <div className="relative mt-1 w-full min-w-0">
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="Eg: aditi.botanica@okaxis"
                className="w-full min-w-0 max-w-full rounded-[10px] border border-[#CCD8C4] bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 pr-9 text-[12.5px] sm:text-[13px] font-medium text-[#18382B] shadow-2xs outline-none transition focus:border-[#06452E] focus:ring-1 focus:ring-[#06452E] box-border"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 text-[#1B6E32]"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick UPI Handle Chips */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 w-full min-w-0">
            {quickHandles.map((handle) => (
              <button
                type="button"
                key={handle}
                onClick={() => handleApplyHandle(handle)}
                className="cursor-pointer rounded-full border border-[#D5E1D1] bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-[#2D5A3C] shadow-2xs transition hover:border-[#1B6E32] hover:bg-[#EDF7ED]"
              >
                {handle}
              </button>
            ))}
          </div>

          {/* Verify & Pay CTA */}
          <button
            type="submit"
            disabled={isVerifying}
            className="btn-premium flex w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#06452E] py-2.5 px-3 sm:px-4 text-[12.5px] sm:text-[13px] font-bold text-white shadow-sm active:scale-98 disabled:opacity-75"
          >
            {isVerifying ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Verifying UPI...
              </span>
            ) : paySuccess ? (
              <span>&#10003; Collect Request Sent!</span>
            ) : (
              <span>Verify &amp; Pay {amount} via UPI</span>
            )}
          </button>

          <p className="text-center text-[10.5px] sm:text-[11px] text-[#718073]">
            A payment collect request will pop up directly on your UPI app
          </p>
        </form>
      </div>
    </div>
  );
}
