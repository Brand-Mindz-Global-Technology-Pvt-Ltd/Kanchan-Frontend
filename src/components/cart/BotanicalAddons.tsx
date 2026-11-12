import imgVermicompost from "../../assets/products/img-4.png";
import imgMister from "../../assets/products/img-3.png";
import imgNeem from "../../assets/products/img-5.png";

export interface BotanicalAddonItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface BotanicalAddonsProps {
  onAddAddon: (addon: BotanicalAddonItem) => void;
  addedAddonIds: string[];
}

const addonProducts: BotanicalAddonItem[] = [
  {
    id: "vermicompost",
    name: "Organic Vermicompost",
    variant: "1 kg Nutrient Bag",
    price: 149,
    originalPrice: 199,
    image: imgVermicompost,
  },
  {
    id: "brass-mister",
    name: "Brass Foliage Mister",
    variant: "Ultra-Fine Spray",
    price: 349,
    originalPrice: 399,
    image: imgMister,
  },
  {
    id: "neem-shield",
    name: "Neem Pest Shield",
    variant: "250ml Pure Extract",
    price: 199,
    originalPrice: 249,
    image: imgNeem,
  },
];

export default function BotanicalAddons({
  onAddAddon,
  addedAddonIds,
}: BotanicalAddonsProps) {
  return (
    <div className="rounded-[22px] border border-[#E6EADF] bg-white p-5 sm:p-6 shadow-[0_2px_14px_rgba(20,56,38,0.04)] w-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif-heading text-[18px] font-bold text-[#18382B] sm:text-[20px]">
            Botanical Care Add-ons
          </h3>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5 text-[#356846]"
            aria-hidden="true"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </div>
        <p className="mt-0.5 text-[11.5px] text-[#718073]">
          Nursery-recommended essentials tailored for your green companions.
        </p>
      </div>

      {/* 3 Add-on Cards Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3.5">
        {addonProducts.map((addon) => {
          const isAdded = addedAddonIds.includes(addon.id);

          return (
            <div
              key={addon.id}
              className="flex flex-col justify-between rounded-[16px] border border-[#E4EBE0] bg-white p-3 shadow-[0_2px_8px_rgba(20,56,38,0.03)] hover:border-[#CCD8C4] hover:shadow-[0_4px_12px_rgba(20,56,38,0.06)] transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[10px] bg-[#F7F7F2] border border-[#EAEFE5]">
                  <img
                    src={addon.image}
                    alt={addon.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-[12px] font-bold text-[#18382B] truncate leading-tight">
                    {addon.name}
                  </h4>
                  <p className="text-[10px] text-[#718073] truncate mt-0.5">
                    {addon.variant}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-[#F2F5ED] pt-2">
                <span className="text-[12.5px] font-bold text-[#18382B]">
                  ₹{addon.price}
                </span>
                <button
                  type="button"
                  onClick={() => onAddAddon(addon)}
                  className={`h-7 rounded-[8px] px-3 text-[11px] font-bold transition active:scale-95 cursor-pointer ${isAdded
                      ? "bg-[#EBF2E6] text-[#06452E]"
                      : "bg-[#06452E] text-white hover:bg-[#043824]"
                    }`}
                >
                  {isAdded ? "Added ✓" : "+ Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
