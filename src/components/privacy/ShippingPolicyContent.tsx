import React from "react";

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
            <span>KANCHAN GARDEN</span>
          </div>

          <h1 className="mt-4 font-serif text-[32px] font-bold tracking-tight text-[#244B36] sm:text-[42px] lg:text-[46px]">
            Shipping &amp; Delivery Policy
          </h1>

          <p className="mx-auto mt-3 max-w-[620px] text-[15px] font-medium italic text-[#527A52] sm:text-[16px]">
            From Our Garden to Your Doorstep – Delivered with Care.
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

            {/* Introduction / Overview Callout */}
            <article className="border-b border-[#DCE5D8]/80 pb-8">
              <div className="rounded-[16px] border border-[#DCE5D8] bg-[#E8EFE4]/50 p-5 sm:p-6">
                <p className="text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                  At Kanchan Garden, we are committed to providing a seamless and reliable shopping experience. Every order is thoughtfully prepared and securely packed to bring quality gardening products closer to you.
                </p>
              </div>
            </article>

            {/* 01 | Order Processing */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  01
                </span>
                <span>Order Processing</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  All orders are processed upon successful payment confirmation. Our team ensures that each product is carefully inspected and packed before dispatch.
                </p>
                <p>
                  Processing times may vary depending on product availability, order volume, seasonal demand and public holidays.
                </p>
              </div>
            </article>

            {/* 02 | Shipping & Delivery Timelines */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  02
                </span>
                <span>Shipping &amp; Delivery Timelines</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  We strive to deliver your orders at the earliest possible time through our logistics partners.
                </p>
                <p>
                  Estimated delivery timelines may vary depending on the destination, product category, weather conditions and courier operations. Delivery dates are indicative and not guaranteed.
                </p>
              </div>
            </article>

            {/* 03 | Shipping Charges */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  03
                </span>
                <span>Shipping Charges</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  We believe in transparent pricing. Applicable shipping charges will be displayed during checkout before payment confirmation.
                </p>
                <p>
                  Complimentary shipping may be available on eligible orders, subject to promotional offers, order value and delivery location.
                </p>
              </div>
            </article>

            {/* 04 | Live Plants & Liquid Fertilizers – Special Shipping Conditions */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-start gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  04
                </span>
                <span>Live Plants &amp; Liquid Fertilizers – Special Shipping Conditions</span>
              </h2>
              <div className="mt-3.5 space-y-3.5 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Live plants and liquid fertilizers require specialised handling and packaging due to their delicate nature.
                </p>
                <p>
                  Although every precaution is taken to ensure secure packaging, certain transit-related risks may occur, including:
                </p>
                <ul className="mt-2 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Plant wilting, leaf shedding or minor damage.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Breakage of branches or stems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Leakage or spillage of liquid fertilizers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Changes in plant appearance due to environmental conditions.</span>
                  </li>
                </ul>
                <p>
                  Kanchan Garden shall not be held responsible for such transit-related damage or deterioration arising from circumstances beyond our reasonable control, subject to applicable consumer protection laws.
                </p>
                <p className="font-medium text-[#244B36]">
                  Customers are requested to acknowledge these special shipping conditions before placing an order.
                </p>
              </div>
            </article>

            {/* 05 | Delivery Information */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  05
                </span>
                <span>Delivery Information</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Customers are responsible for providing accurate and complete delivery details, including their address, contact number and PIN code.
                </p>
                <p>
                  Kanchan Garden shall not be responsible for delays or unsuccessful deliveries resulting from incorrect or incomplete information provided by customers.
                </p>
              </div>
            </article>

            {/* 06 | Transit Damage & Customer Assistance */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  06
                </span>
                <span>Transit Damage &amp; Customer Assistance</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  If an eligible product arrives damaged, customers are requested to contact our support team promptly with their order details and clear photographs of the product and original packaging.
                </p>
                <p>
                  All concerns will be reviewed individually, and appropriate resolutions will be provided in accordance with our shipping policy and applicable consumer rights.
                </p>
              </div>
            </article>

            {/* 07 | Split Shipments */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  07
                </span>
                <span>Split Shipments</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Orders containing multiple product categories may be dispatched separately to ensure appropriate packaging, product safety and efficient delivery.
                </p>
              </div>
            </article>

            {/* 08 | Our Commitment to You */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  08
                </span>
                <span>Our Commitment to You</span>
              </h2>
              <div className="mt-3.5 space-y-3.5 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  At Kanchan Garden, we go beyond delivering products — we deliver the essentials for a greener, healthier and more beautiful lifestyle.
                </p>
                <ul className="mt-2 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Quality-focused product selection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Professional and secure packaging</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Transparent shipping practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Dedicated customer assistance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Commitment to customer satisfaction</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* We're Here to Help & Brand Closing */}
            <article className="pt-8">
              <h2 className="font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                We&apos;re Here to Help
              </h2>
              <div className="mt-3.5 space-y-4 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  For shipping enquiries, order assistance or delivery-related concerns, connect with our customer support team.
                </p>

                {/* Contact Card */}
                <div className="mt-5 rounded-[18px] border border-[#DCE5D8] bg-[#FAF8F0]/80 p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[12px] font-semibold uppercase tracking-wider text-[#527A52]">
                        Customer Support
                      </span>
                      <p className="mt-1 text-[15px] font-bold text-[#244B36] sm:text-[16px]">
                        Contact:{" "}
                        <a
                          href="tel:+918754461144"
                          className="text-[#244B36] underline decoration-[#527A52]/50 underline-offset-4 transition hover:text-[#185338]"
                        >
                          +91 87544 61144
                        </a>
                      </p>
                    </div>
                    <a
                      href="tel:+918754461144"
                      className="inline-flex items-center gap-2 rounded-full bg-[#244B36] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#185338]"
                    >
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span>Call Support</span>
                    </a>
                  </div>
                </div>

                {/* Brand Signature Card */}
                <div className="mt-6 rounded-[18px] border border-[#DCE5D8] bg-[linear-gradient(180deg,#F4F8F1_0%,#EBF3E7_100%)] p-6 text-center sm:p-8">
                  <h3 className="font-serif text-[18px] font-bold tracking-tight text-[#244B36] sm:text-[20px]">
                    KANCHAN GARDEN
                  </h3>
                  <p className="mt-1 text-[13.5px] font-medium text-[#527A52] sm:text-[14px]">
                    Your Trusted One-Stop Garden Solution
                  </p>
                  <div className="mx-auto my-3 h-px w-16 bg-[#DCE5D8]" aria-hidden="true" />
                  <p className="text-[13px] font-semibold uppercase tracking-widest text-[#244B36]">
                    Grow Green &bull; Live Clean
                  </p>
                  <p className="mt-1 font-serif text-[13px] italic text-[#6B756C]">
                    Rooted in Quality. Growing with Trust.
                  </p>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
