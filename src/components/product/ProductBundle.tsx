import { useState } from "react";
import imgSnakePlant from "../../assets/products/img-2.png";
import imgZZPlant from "../../assets/products/img-1.png";
import imgPlantFood from "../../assets/products/img-3.png";

export interface ProductBundleProps {
  onAddBundleToBag?: (
    items: {
      id: string;
      name: string;
      potSize: string;
      price: number;
      quantity: number;
      image: string;
    }[]
  ) => void;
}

export default function ProductBundle({ onAddBundleToBag }: ProductBundleProps = {}) {
  const [isAdded, setIsAdded] = useState(false);

  const bundleItems = [
    {
      id: "snake-plant",
      name: "Snake Plant Zeylanica",
      pot: "Medium 6\"",
      price: "₹549",
      image: imgSnakePlant,
    },
    {
      id: "zz-plant",
      name: "ZZ Plant (Zamioculcas)",
      pot: "Medium 6\"",
      price: "₹649",
      image: imgZZPlant,
    },
    {
      id: "organic-tonic",
      name: "Organic Leaf Tonic & Spray",
      pot: "250ml spray",
      price: "₹199",
      image: imgPlantFood,
    },
  ];

  const handleBuyBundle = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);

    onAddBundleToBag?.(
      bundleItems.map((item) => ({
        id: item.id,
        name: item.name,
        potSize: item.pot,
        price: parseInt(item.price.replace(/[^\d]/g, ""), 10),
        quantity: 1,
        image: item.image,
      }))
    );
  };

  return (
    <section
      aria-label="Frequently Bought Together"
      className="w-full rounded-[24px] border border-[#E6EADF] bg-white p-5 shadow-[0_4px_20px_rgba(20,56,38,0.06)] sm:p-7"
    >
      <div className="mb-5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#3B6F45]">
          FREQUENTLY BOUGHT TOGETHER
        </span>
        <h2 className="font-serif-heading mt-1 text-[22px] font-bold text-[#18382B] sm:text-[26px]">
          Complete Your Green Corner
        </h2>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* 3 Bundled Items in a Single Horizontal Row */}
        <div className="flex w-full items-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3 lg:w-auto lg:flex-nowrap lg:overflow-visible lg:pb-0">
          {bundleItems.map((item, idx) => (
            <div key={item.id} className="flex shrink-0 items-center gap-2 sm:gap-3">
              <div className="flex min-w-[175px] max-w-[220px] items-center gap-2.5 rounded-[16px] border border-[#E2E8D8] bg-[#FAFBF8] p-2.5 shadow-[0_2px_10px_rgba(20,56,38,0.04)] sm:min-w-[195px] sm:px-3 sm:py-2.5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-[#F4F6F0] sm:h-13 sm:w-13">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-[12px] font-bold leading-tight text-[#18382B] sm:text-[12.5px]">
                    {item.name}
                  </h3>
                  <p className="mt-0.5 text-[10.5px] text-[#718073]">{item.pot}</p>
                  <p className="mt-0.5 text-[11.5px] font-bold text-[#06452E]">
                    {item.price}
                  </p>
                </div>
              </div>

              {idx < bundleItems.length - 1 && (
                <span className="shrink-0 text-[16px] font-bold text-[#8EA091]" aria-hidden="true">
                  &#43;
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Bundle Summary & CTA (Right Side) */}
        <div className="flex shrink-0 flex-col gap-2 rounded-[18px] border border-[#D9E6D3] bg-[#F4F8F1] p-3.5 shadow-[0_2px_12px_rgba(20,56,38,0.05)] sm:flex-row sm:items-center sm:justify-between sm:p-4 lg:w-68 lg:flex-col lg:items-stretch xl:w-72">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[20px] font-bold text-[#18382B] sm:text-[22px]">₹1,199</span>
              <span className="text-[12.5px] text-[#8EA091] line-through sm:text-[13px]">₹1,397</span>
            </div>
            <p className="text-[11px] font-semibold text-[#216E39]">
              Save ₹198 when purchased together!
            </p>
          </div>

          <button
            type="button"
            onClick={handleBuyBundle}
            className="flex h-9.5 cursor-pointer items-center justify-center rounded-[11px] bg-[#06452E] px-4 text-[12.5px] font-semibold text-white shadow-sm transition hover:bg-[#043824] active:scale-98 sm:h-10 sm:text-[13px]"
          >
            {isAdded ? "Bundle Added ✓" : "Buy All 3 Items"}
          </button>
        </div>
      </div>
    </section>
  );
}

