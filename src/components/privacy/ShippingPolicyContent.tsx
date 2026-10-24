export default function ShippingPolicyContent() {
  return (
    <div className="w-full bg-[#FAF8F0] text-[#344238]">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-[#DCE5D8] bg-[linear-gradient(180deg,#EDF3E7_0%,#FAF8F0_100%)] pb-12 pt-16 sm:pb-16 sm:pt-20">
        <div className="relative z-10 mx-auto w-[90%] max-w-[880px] text-center">
          {/* Subtle Botanical Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE5D8] bg-white/80 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#527A52] shadow-sm backdrop-blur-sm">
            <svg
              className="h-3.5 w-3.5 text-[#527A52]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span>Kanchan Delivery & Care</span>
          </div>

          <h1 className="mt-4 font-serif text-[32px] font-bold tracking-tight text-[#244B36] sm:text-[42px] lg:text-[46px]">
            Shipping Policy
          </h1>

          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-relaxed text-[#6B756C] sm:text-[15px]">
            Safe packaging, delivery timelines, and transit care to support your gardening journey with Kanchan.
          </p>

          <p className="mt-3 text-[12px] font-medium text-[#7D887E]">
            Effective Date: October 2026
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-[90%] max-w-[880px]">
          <div className="rounded-[24px] border border-[#DCE5D8] bg-white p-6 shadow-[0px_4px_24px_0px_rgba(36,75,54,0.03)] sm:p-10 lg:p-14">

            {/* Introduction / Overview */}
            <article className="border-b border-[#DCE5D8]/80 pb-8">
              <div className="rounded-[16px] border border-[#DCE5D8] bg-[#E8EFE4]/50 p-5 sm:p-6">
                <p className="text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                  At Kanchan, we take care to ensure your garden essentials reach you safely and in good condition.
                </p>
              </div>
            </article>

            {/* 1. Order Processing */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  01
                </span>
                <span>Order Processing</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Orders are processed after successful confirmation of payment. We aim to prepare and dispatch orders as quickly as possible.
                </p>
                <p>
                  Processing times may vary depending on product availability, order volume, holidays, or seasonal demand.
                </p>
              </div>
            </article>

            {/* 2. Shipping Time */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  02
                </span>
                <span>Shipping Time</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Delivery timelines may vary depending on your location and the type of products ordered.
                </p>
                <p>
                  Estimated delivery times shown during checkout are approximate and may be affected by courier delays, weather conditions, public holidays, or other circumstances beyond our control.
                </p>
              </div>
            </article>

            {/* 3. Shipping Charges */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  03
                </span>
                <span>Shipping Charges</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Shipping charges, if applicable, will be displayed clearly during checkout before payment is completed.
                </p>
                <p>
                  Certain orders may qualify for free shipping depending on current offers, order value, or delivery location.
                </p>
              </div>
            </article>

            {/* 4. Plants & Live Products */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  04
                </span>
                <span>Plants & Live Products</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Live plants and nursery products are carefully selected, packed, and handled to help maintain their quality during transportation.
                </p>
                <p>
                  As plants are natural living products, minor variations in size, colour, shape, or appearance may occur.
                </p>
              </div>
            </article>

            {/* 5. Delivery Address */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  05
                </span>
                <span>Delivery Address</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Customers are responsible for providing a complete and accurate delivery address, including the correct phone number and postal code.
                </p>
                <p>
                  We cannot be held responsible for delays or failed deliveries caused by incorrect or incomplete information provided during checkout.
                </p>
              </div>
            </article>

            {/* 6. Damaged During Transit */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  06
                </span>
                <span>Damaged During Transit</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  If your order arrives damaged, please contact us as soon as possible with your order details and clear photographs of the product and packaging.
                </p>
                <p>
                  Our team will review the concern and provide an appropriate solution wherever applicable.
                </p>
              </div>
            </article>

            {/* 7. Multiple Shipments */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  07
                </span>
                <span>Multiple Shipments</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Some orders containing different product categories may be shipped separately depending on availability and packaging requirements.
                </p>
              </div>
            </article>

            {/* 8. Kanchan Promise */}
            <article className="pt-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  08
                </span>
                <span>Kanchan Promise</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  We make every effort to carefully pack and deliver your products so you can continue creating healthier plants and greener spaces with confidence.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
