import {
  AnimatedHeadingText,
  useDecorativeLeafReveal,
} from "../../hooks/useDecorativeLeafReveal";
import HomeEdgeLeaves from "./HomeEdgeLeaves";

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

export default function GardenerStories() {
  const sectionRef = useDecorativeLeafReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="relative isolate w-full overflow-hidden bg-[#FCFAF4] py-[28px]">
      <HomeEdgeLeaves
        placements={[
          {
            left: { top: "-20%", width: "clamp(100px, 16vw, 220px)", opacity: 0.88 },
            right: { top: "-15%", width: "clamp(110px, 17vw, 230px)", opacity: 0.9 },
          },
          {
            left: { bottom: "-25%", width: "clamp(115px, 18vw, 240px)", opacity: 0.92 },
            right: { bottom: "-20%", width: "clamp(110px, 17vw, 230px)", opacity: 0.9 },
          },
        ]}
        mobileBorderTreatment
      />
      <div className="relative z-10 mx-auto w-[90%] max-w-[826px] min-[1000px]:w-[82%]">
        <div className="text-center">
          <p className="text-[10px] font-bold leading-3 uppercase tracking-[1.2px] text-[#5B944B]">
            GARDENER STORIES
          </p>

          <h2
            aria-label="What Our Happy Gardeners Say"
            className="mt-[7px] font-serif text-[28px] font-bold leading-[1.2] text-[#18382B]"
          >
            <AnimatedHeadingText text="What Our Happy Gardeners Say" />
          </h2>

          <p
            data-reveal-paragraph
            className="mt-1 text-[11px] leading-[14px] text-[#718074]"
          >
            Real experiences from people who made their spaces greener with Kanchan Garden.
          </p>

          <span className="mt-[9px] inline-flex rounded-full bg-[#EDF3E6] px-2 py-[5px] text-[7px] leading-[8px] font-semibold uppercase tracking-[0.08em] text-[#6B8660]">
            SAMPLE TESTIMONIALS
          </span>
        </div>

        <div className="mt-5 flex overflow-x-auto overflow-y-hidden gap-3.5 pb-3 pt-1 snap-x snap-mandatory touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 sm:pt-0 sm:snap-none min-[1000px]:grid-cols-4 min-[1000px]:gap-[14px]">
          {testimonials.map((item) => (
            <article
              key={item.name}
              data-reveal-card
              className="flex min-h-[198px] min-w-0 w-[87%] shrink-0 snap-start flex-col rounded-[15px] border border-[#E8E9DD] bg-white p-[14px_12px] shadow-[0_4px_11px_rgba(35,55,35,0.2)] sm:w-auto sm:shrink sm:snap-align-none min-[640px]:p-[18px_18px_16px]"
            >
              <div className="flex items-center gap-[10px]">
                <img
                  src={item.avatar}
                  alt={`${item.name} testimonial`}
                  className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="text-[13px] leading-4 font-medium text-[#294638]">
                    {item.name}
                  </h3>
                  <div
                    aria-label="5 out of 5 stars"
                    className="mt-[2px] text-[11px] leading-3 tracking-[0.01em] text-[#F2A900]"
                  >
                    ★★★★★
                  </div>
                </div>
              </div>

              <p className="mt-[14px] font-serif text-[12px] leading-[19px] text-[#5D7062]">
                “{item.review}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
