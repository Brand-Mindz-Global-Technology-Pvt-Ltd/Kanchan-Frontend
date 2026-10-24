import React from "react";

export default function PrivacyPolicyContent() {
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
            Privacy Policy
          </h1>

          <p className="mx-auto mt-3 max-w-[620px] text-[14px] leading-relaxed text-[#6B756C] sm:text-[15px]">
            We value your trust and are dedicated to protecting your privacy while you nurture and grow your green space with Kanchan.
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
            
            {/* 1. Introduction */}
            <article className="border-b border-[#DCE5D8]/80 pb-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  01
                </span>
                <span>Introduction</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Welcome to Kanchan. We are committed to safeguarding your personal privacy and ensuring that your personal data is collected, handled, and stored with high standards of care and transparency.
                </p>
                <p>
                  This Privacy Policy explains how Kanchan collects, uses, protects, and discloses information gathered when you visit our website, explore our nursery collections, or engage with our services. By using our website, you acknowledge the terms outlined in this policy.
                </p>
              </div>
            </article>

            {/* 2. Information We Collect */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  02
                </span>
                <span>Information We Collect</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  To provide you with fresh botanical selections, dependable plant delivery, and responsive customer service, Kanchan may collect the following types of information:
                </p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Personal Contact Information:</strong> Name, email address, phone number, physical delivery address, and billing address provided during order placement or account inquiries.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Order & Transaction Records:</strong> Details regarding plants, seeds, fertilizers, or tools purchased, order history, and payment status (card details are processed via secure certified payment gateways and never stored on our servers).
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Communications & Inquiries:</strong> Messages, plant care questions, and feedback submitted through our contact forms or support interactions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Technical Device Data:</strong> IP address, browser type, operating system, device details, and site navigation paths automatically collected for security and performance optimization.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 3. How We Use Your Information */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  03
                </span>
                <span>How We Use Your Information</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Kanchan uses the collected information strictly for legitimate business and customer service purposes, including:
                </p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Processing, packaging, and delivering plant orders safely to your doorstep.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Sending essential order confirmations, shipping notices, and delivery tracking updates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Responding to customer service inquiries, plant care questions, and replacement requests.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Analyzing website browsing patterns to enhance layout, performance, and botanical offerings.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Preventing fraudulent activity, ensuring data integrity, and maintaining network security.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 4. Cookies & Website Information */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  04
                </span>
                <span>Cookies & Website Information</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Our website uses cookies and similar digital technologies to deliver a smooth and personalized shopping experience:
                </p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Essential Cookies:</strong> Required to keep track of items in your cart, maintain session status, and enable secure checkout.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Performance & Analytics:</strong> Help us understand which plants and categories gardeners visit most, enabling continuous site improvements.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Browser Controls:</strong> You may modify your browser settings to decline or delete cookies at any time. Please note that certain features of the shopping experience may function less effectively if cookies are disabled.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 5. Sharing of Information */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  05
                </span>
                <span>Sharing of Information</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Kanchan values your privacy. We do not sell, rent, license, or trade your personal information to third parties for their independent marketing endeavors.
                </p>
                <p>Information is shared solely under the following limited conditions:</p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Logistics & Delivery Partners:</strong> Sharing recipient name, contact number, and address strictly to fulfill physical package delivery.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Payment Processors:</strong> Secure routing of transaction data through PCI-DSS certified payment gateways.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>
                      <strong className="font-semibold text-[#244B36]">Legal Obligations:</strong> Disclosures mandated by applicable legal processes, subpoenas, or statutory authorities to safeguard lawful rights.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 6. Data Security */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  06
                </span>
                <span>Data Security</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  We implement robust technical, organizational, and physical safeguards designed to protect your personal details against unauthorized access, loss, misuse, or alteration.
                </p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>All web traffic and sensitive data exchanges are secured using standard SSL (Secure Sockets Layer) encryption.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span>Access to order databases is restricted only to authorized personnel who require it to perform specific operational tasks.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 7. Marketing Communication */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  07
                </span>
                <span>Marketing Communication</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  If you opt in to receive updates from Kanchan, we may periodically share seasonal plant care advice, new nursery arrivals, gardening newsletters, and promotional announcements.
                </p>
                <p>
                  Your participation is always voluntary. You can opt out at any time by clicking the &ldquo;unsubscribe&rdquo; link included in any marketing communication, or by contacting our team.
                </p>
              </div>
            </article>

            {/* 8. Your Rights */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  08
                </span>
                <span>Your Rights</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Depending on your jurisdiction and applicable data protection regulations, you hold key rights regarding your personal information:
                </p>
                <ul className="mt-3 space-y-2.5 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span><strong className="font-semibold text-[#244B36]">Right to Access:</strong> Request a summary of the personal details Kanchan holds about you.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span><strong className="font-semibold text-[#244B36]">Right to Rectification:</strong> Request corrections to inaccurate, outdated, or incomplete information.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span><strong className="font-semibold text-[#244B36]">Right to Erasure:</strong> Request the deletion of your personal records, subject to statutory record-keeping and tax requirements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#527A52]" aria-hidden="true" />
                    <span><strong className="font-semibold text-[#244B36]">Right to Withdraw Consent:</strong> Revoke consent previously given for marketing and newsletter communications.</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* 9. Third-Party Links */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  09
                </span>
                <span>Third-Party Links</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Our website may occasionally feature links to third-party platforms, gardening blogs, or partner services. Kanchan does not exercise control over, nor assume responsibility for, the content, security, or privacy practices of external websites.
                </p>
                <p>
                  We encourage you to review the privacy policies of any third-party websites you choose to visit.
                </p>
              </div>
            </article>

            {/* 10. Updates to This Policy */}
            <article className="border-b border-[#DCE5D8]/80 py-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  10
                </span>
                <span>Updates to This Policy</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  Kanchan may update this Privacy Policy from time to time to reflect operational modifications, product additions, or updated regulatory standards.
                </p>
                <p>
                  Any updates will be posted directly to this page with an updated effective date. We recommend checking back periodically to stay informed about how we safeguard your data.
                </p>
              </div>
            </article>

            {/* 11. Contact Us */}
            <article className="pt-8">
              <h2 className="flex items-center gap-2.5 font-serif text-[20px] font-bold text-[#244B36] sm:text-[22px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8EFE4] text-[12px] font-semibold text-[#244B36]">
                  11
                </span>
                <span>Contact Us</span>
              </h2>
              <div className="mt-3.5 space-y-3 text-[14.5px] leading-[1.75] text-[#344238] sm:text-[15px]">
                <p>
                  If you have any questions, comments, or requests regarding this Privacy Policy, or if you would like to exercise any of your privacy rights, please connect with us through our customer support channels.
                </p>

                <div className="mt-6 rounded-[18px] border border-[#DCE5D8] bg-[#FAF8F0]/70 p-6 sm:p-7">
                  <h3 className="font-serif text-[17px] font-bold text-[#244B36]">
                    Customer Care & Privacy Inquiries
                  </h3>
                  <p className="mt-1.5 text-[14px] text-[#6B756C]">
                    You can reach our gardening team through our online contact page or visit our nursery in Bangalore during regular hours.
                  </p>
                  <div className="mt-4">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-[#244B36] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#1a3828] hover:shadow-md"
                    >
                      <span>Visit Contact Page</span>
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
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
}
