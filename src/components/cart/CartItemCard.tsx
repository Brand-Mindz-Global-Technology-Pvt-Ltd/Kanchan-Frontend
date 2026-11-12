export interface CartProductItem {
  id: string;
  name: string;
  variant: string;
  potType: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  isSaved?: boolean;
}

interface CartItemCardProps {
  item: CartProductItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onSaveForLater: (id: string) => void;
}

export default function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  onSaveForLater,
}: CartItemCardProps) {
  const isMonstera = item.name.toLowerCase().includes("monstera");
  const isSnake = item.name.toLowerCase().includes("snake");

  const subtitle = isMonstera
    ? "A tropical beauty"
    : isSnake
    ? "Low maintenance Air Purifier"
    : item.variant || "Live Nursery Plant";

  const careBadge = isMonstera
    ? "Includes Organic Nursery Soil Mix"
    : isSnake
    ? "Low Light & Drought Tolerant"
    : "Organic Nursery Quality";

  const careIcon = isSnake ? "☼" : "🌿";

  const originalPrice =
    item.originalPrice ||
    (isMonstera ? 999 : isSnake ? 699 : Math.round(item.price * 1.25));

  return (
    <div className="py-4.5 first:pt-0 w-full min-w-0">
      {/* ========================================================= */}
      {/* MOBILE LAYOUT (< 640px): 2-Column Product + Actions Row   */}
      {/* ========================================================= */}
      <div className="flex flex-col gap-3.5 sm:hidden w-full">
        {/* Top: 2-Column Explicit CSS Grid Layout */}
        <div
          className="grid items-start gap-3 w-full"
          style={{
            gridTemplateColumns: "clamp(105px, 30vw, 128px) minmax(0, 1fr)",
          }}
        >
          {/* LEFT COLUMN: Fixed Square Thumbnail (105px-128px) */}
          <div
            className="relative aspect-square overflow-hidden rounded-[16px] border border-[#E6EADF] bg-[#F7F7F2] shadow-2xs self-start"
            style={{ width: "100%", maxWidth: "128px", height: "auto" }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* RIGHT COLUMN: Product Content */}
          <div
            className="flex flex-col justify-start min-w-0"
            style={{ width: "100%", minWidth: 0 }}
          >
            {/* Complete Product Name */}
            <h3 className="font-serif-heading text-[15px] font-bold text-[#18382B] leading-snug break-words">
              {item.name}
            </h3>

            {/* Product Description without clipping */}
            <p className="mt-0.5 text-[11px] text-[#718073] leading-snug break-words">
              {subtitle}
            </p>

            {/* Botanical Benefit & Discount Badges (wrap naturally) */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E2F4E6] px-2 py-0.5 text-[9px] font-semibold text-[#18532F] leading-tight">
                <span aria-hidden="true">{careIcon}</span>
                <span>{careBadge}</span>
              </span>

              <span className="inline-flex items-center rounded-full bg-[#EDF7ED] px-2 py-0.5 text-[9px] font-semibold text-[#216E39] leading-tight">
                25% Seasonal Off
              </span>
            </div>

            {/* Price: Current & Original Strikethrough */}
            <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
              <span className="font-serif-heading text-[17px] font-bold text-[#06452E] leading-tight">
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-[#9EAAA0] line-through">
                ₹{(originalPrice * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom: Actions Row directly underneath both columns across full width */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#F0F4EC] w-full">
          {/* Quantity Stepper */}
          <div className="flex h-7.5 items-center rounded-[8px] border border-[#CCD8C4] bg-white px-1 shadow-2xs">
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded text-[13px] text-[#55695B] hover:bg-[#F0F4EC] transition active:scale-95"
              aria-label="Decrease quantity"
            >
              &minus;
            </button>
            <span className="w-6 text-center text-[11.5px] font-bold text-[#18382B]">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="flex h-5.5 w-5.5 cursor-pointer items-center justify-center rounded text-[13px] text-[#55695B] hover:bg-[#F0F4EC] transition active:scale-95"
              aria-label="Increase quantity"
            >
              &#43;
            </button>
          </div>

          {/* Save for Later */}
          <button
            type="button"
            onClick={() => onSaveForLater(item.id)}
            className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[#718073] hover:text-[#06452E] transition active:scale-95 py-1 px-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill={item.isSaved ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.8"
              className={`h-3.5 w-3.5 ${item.isSaved ? "text-[#E53935]" : "text-[#8A9B8D]"}`}
            >
              <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z" />
            </svg>
            <span>{item.isSaved ? "Saved" : "Save for Later"}</span>
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium text-[#D32F2F] hover:text-[#B71C1C] transition active:scale-95 py-1 px-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-3.5 w-3.5 text-[#D32F2F]"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
            </svg>
            <span>Remove</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP LAYOUT (>= 640px): Unchanged Original Arrangement */}
      {/* ========================================================= */}
      <div className="hidden sm:flex sm:items-start sm:gap-5 w-full">
        {/* Product Image */}
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-[16px] border border-[#E6EADF] bg-[#F7F7F2] self-start shadow-2xs">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Middle: Details & Actions */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <h3 className="font-serif-heading text-[19px] font-bold text-[#18382B]">
              {item.name}
            </h3>
            <p className="mt-0.5 text-[12px] text-[#718073]">
              {subtitle}
            </p>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#E2F4E6] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#18532F]">
                <span aria-hidden="true">{careIcon}</span>
                <span>{careBadge}</span>
              </span>

              <span className="inline-flex items-center rounded-full bg-[#EDF7ED] px-2.5 py-0.5 text-[10.5px] font-semibold text-[#216E39]">
                25% Seasonal Nursery Off
              </span>
            </div>
          </div>

          {/* Stepper + Save for Later + Remove */}
          <div className="mt-3.5 flex flex-wrap items-center gap-6">
            {/* Quantity Stepper */}
            <div className="flex h-8.5 items-center rounded-[8px] border border-[#CCD8C4] bg-white px-1 shadow-2xs">
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, -1)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[13px] text-[#55695B] hover:bg-[#F0F4EC] transition"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="w-7 text-center text-[12px] font-bold text-[#18382B]">
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={() => onUpdateQuantity(item.id, 1)}
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded text-[13px] text-[#55695B] hover:bg-[#F0F4EC] transition"
                aria-label="Increase quantity"
              >
                &#43;
              </button>
            </div>

            {/* Save for Later */}
            <button
              type="button"
              onClick={() => onSaveForLater(item.id)}
              className="inline-flex cursor-pointer items-center gap-1 text-[11.5px] font-medium text-[#718073] hover:text-[#06452E] transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill={item.isSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.8"
                className={`h-3.5 w-3.5 ${item.isSaved ? "text-[#E53935]" : "text-[#8A9B8D]"}`}
              >
                <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z" />
              </svg>
              <span>{item.isSaved ? "Saved" : "Save for Later"}</span>
            </button>

            {/* Remove */}
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="inline-flex cursor-pointer items-center gap-1 text-[11.5px] font-medium text-[#D32F2F] hover:text-[#B71C1C] transition"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-3.5 w-3.5 text-[#D32F2F]"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
              </svg>
              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* Right: Price */}
        <div className="text-right shrink-0 pt-0.5">
          <span className="block font-serif-heading text-[21px] font-bold text-[#06452E]">
            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
          </span>
          <span className="text-[12.5px] text-[#9EAAA0] line-through">
            ₹{(originalPrice * item.quantity).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}
