export default function TermsConditionsContent() {
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
            <span>Kanchan Legal & Trust</span>
          </div>

          <h1 className="mt-4 font-serif text-[32px] font-bold tracking-tight text-[#244B36] sm:text-[42px] lg:text-[46px]">
            Terms & Conditions
          </h1>

          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-relaxed text-[#6B756C] sm:text-[15px]">
            Customer satisfaction, plant quality, and order terms to support your gardening journey with Kanchan.
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
              <div className="rounded-[16px] bg-[#E8EFE4]/50 border border-[#DCE5D8] p-5 sm:p-6">
                <p className="text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                  At Kanchan, customer satisfaction and product quality are important to us. We carefully select and pack our garden essentials before dispatch. Because some of our products include live plants and natural garden materials, return eligibility may vary depending on the product type.
                </p>
              </div>
            </article>

            {/* 1. Returns */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  01
                </span>
                <span>Returns</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>Returns may be considered for eligible products if:</p>
                <ul className="mt-2.5 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>You receive the wrong product.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>The product is damaged during delivery.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>The product has a significant defect when received.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>The delivered product does not match the confirmed order.</span>
                  </li>
                </ul>
                <p className="pt-2">
                  To request a return, please contact us within the applicable return period mentioned on the product or order details.
                </p>
              </div>
            </article>

            {/* 2. Live Plants & Nursery Products */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  02
                </span>
                <span>Live Plants & Nursery Products</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Live plants are natural and may vary slightly in height, shape, colour, leaf pattern, or overall appearance. These natural variations are not considered defects.
                </p>
                <p>
                  Returns for live plants may only be accepted in cases of significant damage during transit, incorrect products, or other verified quality concerns.
                </p>
              </div>
            </article>

            {/* 3. Damaged Products */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  03
                </span>
                <span>Damaged Products</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>If you receive a damaged product, please share:</p>
                <ul className="mt-2.5 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Your order number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Clear photographs of the damaged product</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Photographs of the outer packaging</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>A brief description of the issue</span>
                  </li>
                </ul>
                <p className="pt-2">This helps our team review the concern quickly.</p>
              </div>
            </article>

            {/* 4. Non-Returnable Products */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  04
                </span>
                <span>Non-Returnable Products</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>Certain products may not be eligible for return due to their nature, including:</p>
                <ul className="mt-2.5 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Used or opened gardening products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Products damaged after delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Live plants affected due to improper care after delivery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Customised or specially prepared products</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Products returned without their original packaging where applicable</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Refunds */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  05
                </span>
                <span>Refunds</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Once an eligible return or refund request is reviewed and approved, the refund will be processed through the applicable payment method. The time required for the amount to reflect may depend on your bank, card provider, payment gateway, or financial institution.
                </p>
              </div>
            </article>

            {/* 6. Order Cancellation */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  06
                </span>
                <span>Order Cancellation</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Orders may be cancelled before they are packed or dispatched, subject to the current status of the order. Once an order has been dispatched, cancellation may not be possible.
                </p>
              </div>
            </article>

            {/* 7. Our Commitment */}
            <article className="pt-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  07
                </span>
                <span>Our Commitment</span>
              </h2>
              <div className="mt-3.5 space-y-4 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  We want every order to support your gardening journey. If there is a genuine issue with your purchase, our team will make every reasonable effort to help resolve it fairly.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
