import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Priya Deshmukh",
    isVerified: true,
    rating: 5,
    date: "2 days ago",
    comment:
      "Arrived in impeccable shape! Roots were moist and healthy, no broken leaves. After 3 weeks on my desk it's already putting out new growth. Couldn't be happier!",
  },
  {
    id: 2,
    name: "Dr. Siddharth Verma",
    isVerified: true,
    rating: 5,
    date: "1 week ago",
    comment:
      "I kill most plants, but this one survives everything. Perfect for my clinic reception with low natural light. Kanchan packaging is top notch.",
  },
  {
    id: 3,
    name: "Shweta Nair",
    isVerified: true,
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Very handsome specimen and truly pest-free. The ceramic pot matches my Scandinavian aesthetic perfectly. Highly recommend!",
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 92 },
  { stars: 4, pct: 6 },
  { stars: 3, pct: 1.5 },
  { stars: 2, pct: 0.3 },
  { stars: 1, pct: 0.2 },
];

export default function ProductReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);

  return (
    <section aria-label="Customer Feedback" className="w-full">
      {/* 2-Column Open Layout matching Figma (No outer card border or panel) */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* Left Column: Overall Rating Summary Card */}
        <div className="w-full lg:col-span-4">
          <div className="rounded-[22px] border border-[#E8EDE2] bg-[#FAF8F2] p-6 text-center shadow-[0_4px_20px_rgba(20,56,38,0.06)] sm:p-7">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#4D6354]">
              Customer Feedback
            </h3>

            {/* Score */}
            <div className="mt-2 text-[48px] font-bold leading-none tracking-tight text-[#18382B]">
              4.9
            </div>

            {/* Stars */}
            <div className="mt-2.5 flex justify-center gap-1 text-[#F59E0B]">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4.5 w-4.5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>

            <p className="mt-2 text-[11.5px] font-medium text-[#718073]">
              Based on 1,127 verified buyers
            </p>

            {/* Rating Breakdown Bars */}
            <div className="mt-5 space-y-2.5 text-left text-[11px]">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-2.5">
                  <span className="w-5 font-bold text-[#18382B]">
                    {row.stars}★
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E3E9DC]">
                    <div
                      className="h-full rounded-full bg-[#06452E]"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-9 text-right font-medium text-[#718073]">
                    {row.pct}%
                  </span>
                </div>
              ))}
            </div>

            {/* Write a Review Button */}
            <button
              type="button"
              onClick={() => setShowReviewForm((prev) => !prev)}
              className="mt-6 w-full cursor-pointer rounded-full border border-[#CCD8C4] bg-white py-2.5 text-[12.5px] font-semibold text-[#18382B] shadow-2xs transition-all hover:border-[#06452E] hover:bg-[#F2F7ED] hover:text-[#06452E]"
            >
              Write a Review
            </button>

            {showReviewForm && (
              <div className="mt-3.5 rounded-[16px] border border-[#D0DEC4] bg-white p-3.5 text-left shadow-xs">
                {submittedReview ? (
                  <p className="text-[12px] font-semibold text-[#1B6E32]">
                    Thank you! Your review has been submitted for verification.
                  </p>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmittedReview(true);
                    }}
                    className="space-y-2.5 text-[12px]"
                  >
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full rounded-[10px] border border-[#D0DEC4] p-2 text-[#18382B] focus:border-[#06452E] focus:outline-none"
                    />
                    <textarea
                      required
                      placeholder="Your review..."
                      className="w-full rounded-[10px] border border-[#D0DEC4] p-2 text-[#18382B] focus:border-[#06452E] focus:outline-none"
                      rows={2}
                    />
                    <button
                      type="submit"
                      className="w-full cursor-pointer rounded-[10px] bg-[#06452E] py-2 font-semibold text-white transition hover:bg-[#043824]"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Individual Verified Reviews with clean subtle divider lines */}
        <div className="w-full lg:col-span-8">
          {reviews.map((rev, idx) => (
            <article
              key={rev.id}
              className={`py-6 first:pt-1 ${
                idx !== reviews.length - 1 ? "border-b border-[#EAEFE5]" : ""
              }`}
            >
              {/* Reviewer Name, Verified Badge & Date Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[14.5px] font-bold text-[#18382B]">
                    {rev.name}
                  </span>
                  {rev.isVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF3E7] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E6532]">
                      <svg
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-2.5 w-2.5"
                        aria-hidden="true"
                      >
                        <path
                          d="m2.5 6 2.5 2.5 5-5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[12px] font-medium text-[#8EA091]">
                  {rev.date}
                </span>
              </div>

              {/* Rating Stars */}
              <div className="mt-2 flex items-center gap-0.5 text-[#F59E0B]">
                {[...Array(rev.rating)].map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="mt-2.5 text-[13.5px] leading-[1.65] text-[#55695C]">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
