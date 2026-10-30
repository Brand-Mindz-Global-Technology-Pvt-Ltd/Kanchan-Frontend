import { useState, useEffect, useRef, useCallback } from "react";
import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";
import leafTwo from "../../assets/leaves/leaf-2.png";
import leafThree from "../../assets/leaves/leaf-3.png";
import leafFour from "../../assets/leaves/leaf-4.png";
import leafFive from "../../assets/leaves/leaf-5.png";
import HomeEdgeLeaves from "./HomeEdgeLeaves";

const scatteredLeaves = [
  // Zone 1: Top-Left & Upper-Left
  {
    src: leafThree,
    className: "leaf-float",
    position: { top: "4%", left: "4%" },
    width: "clamp(20px, 2.4vw, 36px)",
    opacity: 0.65,
    rotation: "rotate(22deg)",
  },
  {
    src: leafFour,
    className: "leaf-float-alt",
    position: { top: "14%", left: "12%" },
    width: "clamp(18px, 2vw, 28px)",
    opacity: 0.55,
    rotation: "rotate(-35deg)",
  },
  {
    src: leafFive,
    className: "leaf-float gardener-stories__leaf--desktop-only",
    position: { top: "8%", left: "22%" },
    width: "clamp(22px, 2.5vw, 38px)",
    opacity: 0.6,
    rotation: "rotate(48deg)",
  },
  {
    src: leafTwo,
    className: "leaf-float-alt",
    position: { top: "22%", left: "5%" },
    width: "clamp(20px, 2.2vw, 32px)",
    opacity: 0.58,
    rotation: "rotate(-15deg)",
  },

  // Zone 2: Top-Right & Upper-Right
  {
    src: leafFive,
    className: "leaf-float",
    position: { top: "5%", right: "5%" },
    width: "clamp(22px, 2.5vw, 38px)",
    opacity: 0.65,
    rotation: "rotate(-28deg)",
  },
  {
    src: leafThree,
    className: "leaf-float-alt",
    position: { top: "13%", right: "13%" },
    width: "clamp(20px, 2.3vw, 34px)",
    opacity: 0.6,
    rotation: "rotate(32deg)",
  },
  {
    src: leafFour,
    className: "leaf-float gardener-stories__leaf--desktop-only",
    position: { top: "7%", right: "23%" },
    width: "clamp(16px, 1.8vw, 26px)",
    opacity: 0.5,
    rotation: "rotate(-45deg)",
  },
  {
    src: leafTwo,
    className: "leaf-float-alt",
    position: { top: "23%", right: "6%" },
    width: "clamp(22px, 2.4vw, 35px)",
    opacity: 0.55,
    rotation: "rotate(15deg)",
  },

  // Zone 3: Header Area Gaps (subtle accents around heading, desktop-focused)
  {
    src: leafFour,
    className: "leaf-float gardener-stories__leaf--desktop-only",
    position: { top: "9%", left: "34%" },
    width: "clamp(14px, 1.6vw, 24px)",
    opacity: 0.4,
    rotation: "rotate(-20deg)",
  },
  {
    src: leafFive,
    className: "leaf-float-alt gardener-stories__leaf--desktop-only",
    position: { top: "15%", right: "30%" },
    width: "clamp(16px, 1.8vw, 26px)",
    opacity: 0.42,
    rotation: "rotate(40deg)",
  },
  {
    src: leafThree,
    className: "leaf-float gardener-stories__leaf--desktop-only",
    position: { top: "25%", left: "26%" },
    width: "clamp(15px, 1.7vw, 25px)",
    opacity: 0.38,
    rotation: "rotate(-10deg)",
  },

  // Zone 4: Mid Sides (Flanking the testimonial cards)
  {
    src: leafFive,
    className: "leaf-float",
    position: { top: "45%", left: "3%" },
    width: "clamp(24px, 2.6vw, 40px)",
    opacity: 0.68,
    rotation: "rotate(35deg)",
  },
  {
    src: leafThree,
    className: "leaf-float-alt",
    position: { top: "60%", left: "8%" },
    width: "clamp(20px, 2.2vw, 32px)",
    opacity: 0.58,
    rotation: "rotate(-40deg)",
  },
  {
    src: leafTwo,
    className: "leaf-float",
    position: { top: "42%", right: "4%" },
    width: "clamp(22px, 2.5vw, 38px)",
    opacity: 0.62,
    rotation: "rotate(-25deg)",
  },
  {
    src: leafFour,
    className: "leaf-float-alt",
    position: { top: "58%", right: "9%" },
    width: "clamp(18px, 2vw, 30px)",
    opacity: 0.52,
    rotation: "rotate(50deg)",
  },

  // Zone 5: Lower Areas (Bottom corners & lower margins)
  {
    src: leafTwo,
    className: "leaf-float",
    position: { bottom: "5%", left: "4%" },
    width: "clamp(22px, 2.5vw, 38px)",
    opacity: 0.65,
    rotation: "rotate(18deg)",
  },
  {
    src: leafFive,
    className: "leaf-float-alt",
    position: { bottom: "16%", left: "13%" },
    width: "clamp(20px, 2.2vw, 34px)",
    opacity: 0.5,
    rotation: "rotate(-30deg)",
  },
  {
    src: leafThree,
    className: "leaf-float",
    position: { bottom: "4%", right: "5%" },
    width: "clamp(24px, 2.6vw, 40px)",
    opacity: 0.68,
    rotation: "rotate(-18deg)",
  },
  {
    src: leafTwo,
    className: "leaf-float-alt",
    position: { bottom: "17%", right: "14%" },
    width: "clamp(18px, 2vw, 30px)",
    opacity: 0.52,
    rotation: "rotate(42deg)",
  },
  {
    src: leafFour,
    className: "leaf-float gardener-stories__leaf--desktop-only",
    position: { bottom: "3%", left: "48%" },
    width: "clamp(14px, 1.6vw, 22px)",
    opacity: 0.38,
    rotation: "rotate(-15deg)",
  },
];

const testimonials = [
  {
    name: "Jason",
    avatar: "https://i.pravatar.cc/150?img=12",
    review:
      "The plants arrived fresh and carefully packed. I also appreciated the simple care guidance—it made settling them into my home much easier.",
  },
  {
    name: "Kayal",
    avatar: "https://i.pravatar.cc/150?img=47",
    review:
      "Beautiful plant quality and thoughtful packaging. My order was easy to receive, and every plant looked healthy and well cared for.",
  },
  {
    name: "Raja",
    avatar: "https://i.pravatar.cc/150?img=11",
    review:
      "I found everything I needed for my balcony garden in one place. The plants and gardening supplies have been a lovely addition to my space.",
  },
  {
    name: "Aliya",
    avatar: "https://i.pravatar.cc/150?img=44",
    review:
      "Ordering plants online can be risky, but this shop completely won me over! Every single leaf was intact, and the soil was perfectly moist.",
  },
];

// Group testimonials into pairs of 2 for desktop
const pairs = [
  [testimonials[0], testimonials[1]],
  [testimonials[2], testimonials[3]],
];
// Append clone of pair 0 for seamless infinite looping
const extendedPairs = [...pairs, pairs[0]];

export default function GardenerStories() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setWithTransition(true);
    setCurrentSlide((prev) => prev + 1);
  }, []);

  // When reaching the cloned slide (index 2), seamlessly snap back to index 0 after transition completes
  useEffect(() => {
    if (currentSlide === extendedPairs.length - 1) {
      transitionTimeoutRef.current = setTimeout(() => {
        setWithTransition(false);
        setCurrentSlide(0);
      }, 700);
    }
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [currentSlide]);

  // Automatic looping interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const activePairIndex = currentSlide % pairs.length;

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden bg-[#FCFAF4] pt-10 pb-10 sm:pt-12 sm:pb-12"
    >
      <HomeEdgeLeaves
        placements={[
          {
            left: { bottom: "-25%", width: "clamp(115px, 18vw, 240px)", opacity: 0.92 },
            right: { bottom: "-20%", width: "clamp(110px, 17vw, 230px)", opacity: 0.9 },
          },
        ]}
        mobileBorderTreatment
      />

      <style>{`
        /* ── Leaf float animations matching HeroBanner ── */
        @keyframes gs-leaf-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }

        @keyframes gs-leaf-float-alt {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(7px); }
        }

        .gs-leaf-float {
          animation: gs-leaf-float 5s ease-in-out infinite;
        }
        .gs-leaf-float-alt {
          animation: gs-leaf-float-alt 6.5s ease-in-out infinite;
          animation-delay: -2.5s;
        }

        @media (max-width: 640px) {
          .gardener-stories__leaf--desktop-only {
            display: none !important;
          }
          .gardener-stories__leaves span {
            opacity: 0.45 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-leaf-float,
          .gs-leaf-float-alt {
            animation: none !important;
          }
        }
      `}</style>

      {/* Scattered background leaf decorations matching HeroBanner style */}
      <div
        aria-hidden="true"
        className="gardener-stories__leaves pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {scatteredLeaves.map((leaf, index) => (
          <span
            key={index}
            className={`pointer-events-none absolute ${
              leaf.className.includes("leaf-float-alt")
                ? "gs-leaf-float-alt"
                : "gs-leaf-float"
            } ${leaf.className.includes("gardener-stories__leaf--desktop-only") ? "gardener-stories__leaf--desktop-only" : ""}`}
            style={{
              ...leaf.position,
              width: leaf.width,
              opacity: leaf.opacity,
            }}
          >
            <img
              src={leaf.src}
              alt=""
              className="pointer-events-none h-auto w-full select-none"
              style={{
                transform: leaf.rotation,
              }}
            />
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-[92%] max-w-[760px]">
        {/* Header */}
        <div className="mx-auto max-w-[280px] text-center sm:max-w-none">
          <p className="text-[10px] font-bold leading-3 uppercase tracking-[1.2px] text-[#5B944B] sm:text-[11px]">
            GARDENER STORIES
          </p>

          <h2
            aria-label="What Our Happy Gardeners Say"
            className="mt-1 font-serif text-[22px] font-bold leading-tight text-[#18382B] sm:text-[26px]"
          >
            <AnimatedHeadingText text="What Our Happy Gardeners Say" />
          </h2>

          <p
            data-reveal-paragraph
            className="mt-1 text-[12px] leading-[1.4] text-[#718074] sm:text-[13px]"
          >
            Real experiences from people who made their spaces greener with Kanchan Garden.
          </p>

          <span className="mt-1.5 inline-flex rounded-full bg-[#EDF3E6] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#6B8660]">
            SAMPLE TESTIMONIALS
          </span>
        </div>

        {/* Desktop: Smooth, infinitely looping 2-card carousel */}
        <div
          className="hidden sm:block mt-4 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: withTransition
                ? "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
          >
            {extendedPairs.map((pair, pairIdx) => (
              <div
                key={pairIdx}
                className="w-full shrink-0 grid grid-cols-2 gap-3.5 sm:gap-4 px-1"
              >
                {pair.map((item, itemIdx) => (
                  <article
                    key={`${pairIdx}-${itemIdx}-${item.name}`}
                    data-reveal-card
                    className="flex flex-col justify-between rounded-[14px] border border-[#E8E9DD] bg-white p-3.5 sm:p-4 shadow-[0_3px_10px_rgba(35,55,35,0.06)] transition-shadow duration-200 hover:shadow-[0_4px_14px_rgba(35,55,35,0.1)]"
                  >
                    <div>
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.avatar}
                          alt={`${item.name} testimonial`}
                          className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="text-[14px] sm:text-[15px] font-semibold leading-tight text-[#294638]">
                            {item.name}
                          </h3>
                          <div
                            aria-label="5 out of 5 stars"
                            className="mt-0.5 text-[11px] sm:text-[12px] leading-none tracking-[0.02em] text-[#F2A900]"
                          >
                            ★★★★★
                          </div>
                        </div>
                      </div>

                      <p className="mt-2.5 font-serif text-[13px] sm:text-[13.5px] leading-[20px] text-[#5D7062]">
                        “{item.review}”
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* Desktop Pagination / Loop indicators */}
          <div className="flex justify-center items-center gap-1.5 mt-3">
            {pairs.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setWithTransition(true);
                  setCurrentSlide(idx);
                }}
                aria-label={`Go to testimonial pair ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  activePairIndex === idx
                    ? "w-5 bg-[#315F38]"
                    : "w-1.5 bg-[#D1DCD0] hover:bg-[#A3B8A1]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal snap-scroll layout (1 card at a time) */}
        <div className="sm:hidden mt-3.5 flex overflow-x-auto overflow-y-hidden gap-3 pb-2 pt-0.5 snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-reveal-card
              className="flex min-w-0 w-full shrink-0 snap-start flex-col rounded-[14px] border border-[#E8E9DD] bg-white p-3.5 shadow-[0_3px_10px_rgba(35,55,35,0.06)]"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={item.avatar}
                  alt={`${item.name} testimonial`}
                  className="h-9 w-9 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold leading-tight text-[#294638]">
                    {item.name}
                  </h3>
                  <div
                    aria-label="5 out of 5 stars"
                    className="mt-0.5 text-[12px] leading-none tracking-[0.02em] text-[#F2A900]"
                  >
                    ★★★★★
                  </div>
                </div>
              </div>

              <p className="mt-2.5 font-serif text-[13px] leading-[19px] text-[#5D7062]">
                “{item.review}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
