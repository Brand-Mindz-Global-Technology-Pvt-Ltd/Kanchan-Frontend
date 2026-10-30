import greenhouse from "../../assets/about/greenhouse.png";
import AboutEdgeLeaves from "./AboutEdgeLeaves";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";

export default function GreenCommunity() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("community");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{ backgroundColor: "#F5F0E8" }}
    >
      <AboutEdgeLeaves />

      <div className="relative z-10 mx-auto max-w-[1140px] px-6 py-10 sm:px-8 sm:py-11 lg:px-10 lg:py-12">
        {/* Greenhouse banner with overlay */}
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: 280 }}
        >
          {/* Background image */}
          <img
            src={greenhouse}
            alt="Greenhouse interior"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10, 30, 15, 0.52)" }}
          />

          {/* Content centered over overlay */}
          <div className="relative z-10 flex flex-col items-center justify-center px-6 py-14 text-center sm:px-12 sm:py-16">
            {/* Envelope icon in circular outline */}
            <div
              data-about-community-icon
              className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ border: "1.5px solid rgba(255,255,255,0.55)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4.5 w-4.5"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            {/* Eyebrow & Heading */}
            <div data-about-community-heading className="text-center">
              <span className="block text-[11px] font-bold tracking-[0.22em] text-white/80 uppercase sm:text-xs">
                JOIN OUR GREEN COMMUNITY
              </span>

              {/* Main heading */}
              <h2 className="font-serif-heading mx-auto mt-3 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px] md:text-[36px]">
                Let&rsquo;s Grow Something Beautiful
              </h2>
            </div>

            {/* Subtitle */}
            <p data-about-community-desc className="mx-auto mt-2 max-w-[460px] text-[12.5px] leading-relaxed text-white/75 sm:text-[13px]">
              Get plant care tips, gardening inspiration, and updates on our
              latest arrivals.
            </p>

            {/* Email form */}
            <div data-about-community-form className="mt-6 flex w-full max-w-[440px] overflow-hidden rounded-full bg-white shadow-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-5 py-3 text-[12.5px] text-[#143826] placeholder:text-[#9aab9e] outline-none sm:text-[13px]"
              />
              <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#1B4332] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#143326] sm:px-6 sm:text-[12.5px]"
              >
                Send Mail
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

