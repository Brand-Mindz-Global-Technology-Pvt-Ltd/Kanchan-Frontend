import heroImage from "../assets/hero-image.png";
import leafOne from "../assets/leaves/leaf-1.png";
import leafTwo from "../assets/leaves/leaf-2.png";
import leafThree from "../assets/leaves/leaf-3.png";
import leafFour from "../assets/leaves/leaf-4.png";
import leafFive from "../assets/leaves/leaf-5.png";

const leaves = [
  {
    src: leafOne,
    className:
      "left-[5%] top-[8%] w-[8%] max-xl:left-[3%] max-xl:top-[5%] max-xl:w-[6%]",
  },
  {
    src: leafTwo,
    className:
      "left-[8%] top-[30%] w-[6%] max-xl:left-[5%] max-xl:top-[25%] max-xl:w-[5%]",
  },
  {
    src: leafThree,
    className:
      "bottom-[10%] left-[5%] w-[10%] max-xl:bottom-[8%] max-xl:left-[3%] max-xl:w-[8%]",
  },
  {
    src: leafFour,
    className:
      "right-[15%] top-[5%] w-[8%] max-xl:right-[10%] max-xl:top-[3%] max-xl:w-[6%]",
  },
  {
    src: leafFive,
    className:
      "bottom-[5%] right-[12%] w-[15%] max-xl:bottom-[3%] max-xl:right-[8%] max-xl:w-[10%]",
  },
];

const features = [
  {
    title: "Quality Plants",
    detail: "Strong Wellness",
    icon: "shield",
  },
  {
    title: "Organic Inputs",
    detail: "Chemical-Free Care",
    icon: "leaf",
  },
  {
    title: "Total Solution",
    detail: "Everything you need",
    icon: "bag",
  },
] as const;

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(105deg,#fcfbf7_0%,#f9f7ef_58%,#f0f5e5_100%)]">
      {leaves.map((leaf) => (
        <img
          key={leaf.src}
          src={leaf.src}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute z-20 h-auto max-w-none ${leaf.className}`}
        />
      ))}
      <div className="relative z-10 mx-auto w-[90%] max-w-[1280px] py-9 sm:w-[86%] xl:min-h-[560px] xl:py-0">
        <div className="relative z-10 min-w-0 xl:ml-[60px] xl:w-[500px] xl:pt-[80px]">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#edf4df] px-2.5 py-1 text-[9px] font-semibold tracking-[0.01em] text-[#315f38] xl:mb-8 xl:gap-2 xl:px-3 xl:py-1.5 xl:text-[13px]">
            <img
              src={leafTwo}
              alt=""
              aria-hidden="true"
              className="h-3 w-3 xl:h-4 xl:w-4"
            />
            Natural · Sustainable · Healthier Homes
          </div>

          <h1 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[0.94] tracking-[-0.035em] text-[#18382b] xl:text-[60px] xl:leading-[0.87]">
            <span className="block">Bring Home the</span>
            <span className="block italic text-[#0b633b]">
              Beauty of Nature
            </span>
          </h1>

          <p className="mt-3 max-w-[330px] text-[13px] leading-[1.3] text-[#68766a] xl:mt-8 xl:max-w-[510px] xl:text-[19px]">
            Everything you need to grow, nurture, and create your own serene
            sanctuary. From rare tropical foliage to seeds and organic
            nourishment.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 xl:mt-6 xl:gap-3">
            <a
              href="/plants"
              className="inline-flex min-h-[34px] items-center justify-center rounded-full bg-green-800 px-4 py-2 text-[10px] font-semibold text-white shadow-md transition hover:bg-green-900 xl:min-h-[50px] xl:px-7 xl:py-3 xl:text-[15px]"
            >
              Shop Plants <span className="ml-2">›</span>
            </a>
            <a
              href="/services"
              className="inline-flex min-h-[34px] items-center justify-center rounded-full border border-[#d9dfd0] bg-white/80 px-4 py-2 text-[10px] font-semibold text-[#254233] transition hover:bg-white xl:min-h-[50px] xl:px-7 xl:py-3 xl:text-[15px]"
            >
              Explore Our Services
            </a>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 xl:mt-9 xl:w-full xl:gap-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex min-w-0 items-center gap-1.5 rounded-xl border border-[#e7e8df] bg-white/90 px-2 py-2 shadow-[0_2px_5px_rgba(25,48,31,0.12)] xl:gap-2 xl:px-3 xl:py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e2f1da] text-[#267445] xl:h-9 xl:w-9">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-4 w-4 xl:h-5 xl:w-5"
                    aria-hidden="true"
                  >
                    {feature.icon === "shield" && (
                      <path d="M12 3 19 6v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
                    )}
                    {feature.icon === "leaf" && (
                      <>
                        <path d="M20 4c-8 0-14 3.2-14 9a6 6 0 0 0 6 6c5.8 0 8-7.2 8-15Z" />
                        <path d="M4 21c3-5 6.5-8.5 11-11" />
                      </>
                    )}
                    {feature.icon === "bag" && (
                      <>
                        <path d="M5 8h14l1 13H4L5 8Z" />
                        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
                      </>
                    )}
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[8px] font-bold leading-tight text-[#263c2d] xl:text-[10px]">
                    {feature.title}
                  </span>
                  <span className="mt-0.5 block truncate text-[7px] leading-tight text-[#859084] xl:text-[9px]">
                    {feature.detail}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-8 aspect-[500/458] w-full max-w-[500px] xl:absolute xl:right-[40px] xl:top-[50px] xl:mt-0 xl:aspect-auto xl:h-[458px] xl:w-[500px] xl:max-w-none">
          <div
            className="relative h-full w-full overflow-hidden bg-[#ffffff01]"
            style={{
              borderRadius: "38px 16px 38px 27.5px",
              boxShadow: "0px 28px 70px 0px #16462233",
            }}
          >
            <img
              src={heroImage}
              alt="A warm living room filled with healthy green plants"
              className="h-full w-full scale-[0.92] object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
