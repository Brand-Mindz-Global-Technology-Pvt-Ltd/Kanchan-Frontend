import React from "react";

// ==========================================
// 1. Interfaces & Types
// ==========================================

export interface WishlistItem {
  id: string;
  name: string;
  badge: string;
  badgeVariant?: "green" | "amber" | "sage";
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  isFavorite?: boolean;
}

// ==========================================
// 2. Notification Banner Component
// ==========================================

export function WishlistNotificationBanner({
  message = "Move items to your bag to enjoy complimentary plant-safe transit packing!",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-[14px] border border-[#DCEDD9] bg-[#F0F7EE] px-4 py-3 text-[12px] font-medium text-[#1B6E32] sm:text-[13px] shadow-2xs">
      <span className="text-[16px] shrink-0" role="img" aria-label="sprout">
        🌿
      </span>
      <p className="leading-relaxed">{message}</p>
    </div>
  );
}

// ==========================================
// 3. Reusable Wishlist Product Row Component
// ==========================================

interface WishlistProductRowProps {
  item: WishlistItem;
  onAddToBag: (item: WishlistItem) => void;
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
  isAdded?: boolean;
}

export function WishlistProductRow({
  item,
  onAddToBag,
  onToggleFavorite,
  onRemove,
  isAdded = false,
}: WishlistProductRowProps) {
  // Badge styling matching reference
  const badgeClasses =
    item.badgeVariant === "amber" || item.badge.toUpperCase() === "FLOWERING"
      ? "bg-[#FFF4E5] text-[#A66E1D] border-[#FFE2BD]"
      : "bg-[#EDF7ED] text-[#1B6E32] border-[#D4ECD2]";

  return (
    <div className="group py-4 sm:py-5 transition-all duration-300 hover:bg-[#FAFDF9] rounded-xl px-2 -mx-2">
      {/* Desktop & Tablet Layout (>= sm) */}
      <div className="hidden sm:grid sm:grid-cols-12 sm:items-center sm:gap-4">
        {/* ITEM: Thumbnail */}
        <div className="sm:col-span-2">
          <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-[16px] border border-[#E8ECE4] bg-[#F6F7F2] p-1.5 shadow-2xs">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="sm:col-span-6 min-w-0 pr-2">
          <span
            className={`inline-block rounded-md border px-2 py-0.5 text-[9.5px] font-bold tracking-wider uppercase ${badgeClasses}`}
          >
            {item.badge}
          </span>
          <h4 className="mt-1 text-[15px] font-bold text-[#18382B] truncate sm:text-[16px]">
            {item.name}
          </h4>
          <p className="mt-0.5 text-[11.5px] text-[#718073] truncate sm:text-[12px]">
            {item.description}
          </p>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-[#18382B] sm:text-[16px]">
              ₹{item.price}
            </span>
            {item.originalPrice && (
              <span className="text-[12px] font-medium text-[#9EAAA0] line-through">
                ₹{item.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* ACTION: Buttons & Icons */}
        <div className="sm:col-span-4 flex flex-col items-end gap-2.5">
          <button
            type="button"
            onClick={() => onAddToBag(item)}
            className={`btn-premium inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-4 py-2 text-[12.5px] font-semibold text-white shadow-xs active:scale-98 ${
              isAdded
                ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                : "bg-[#185338] hover:bg-[#12422C]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>{isAdded ? "Added to Bag ✓" : "Add to Bag"}</span>
          </button>

          <div className="flex items-center gap-3 pr-1">
            {/* Heart Icon (Toggle Wishlist Favorite) */}
            <button
              type="button"
              aria-label={item.isFavorite ? "Favorited" : "Mark as favorite"}
              onClick={() => onToggleFavorite(item.id)}
              className="cursor-pointer text-[#E04F66] transition hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill={item.isFavorite ? "currentColor" : "currentColor"}
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4.5 w-4.5"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

            {/* Trash / Remove Icon */}
            <button
              type="button"
              aria-label="Remove item from wishlist"
              onClick={() => onRemove(item.id)}
              className="cursor-pointer text-[#718073] transition hover:text-[#DC2626] hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4.5 w-4.5"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Stacked Layout (< sm) */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex items-start gap-3">
          {/* Thumbnail */}
          <div className="relative flex h-18 w-18 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border border-[#E8ECE4] bg-[#F6F7F2] p-1 shadow-2xs">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <span
              className={`inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${badgeClasses}`}
            >
              {item.badge}
            </span>
            <h4 className="mt-0.5 text-[14px] font-bold text-[#18382B] truncate">
              {item.name}
            </h4>
            <p className="text-[11px] text-[#718073] truncate">
              {item.description}
            </p>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-[14.5px] font-bold text-[#18382B]">
                ₹{item.price}
              </span>
              {item.originalPrice && (
                <span className="text-[11px] font-medium text-[#9EAAA0] line-through">
                  ₹{item.originalPrice}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Row on Mobile */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#F0F4EC]">
          <button
            type="button"
            onClick={() => onAddToBag(item)}
            className={`btn-premium flex-1 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-[10px] py-2 px-3 text-[12px] font-semibold text-white shadow-xs active:scale-98 ${
              isAdded
                ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                : "bg-[#185338] hover:bg-[#12422C]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span>{isAdded ? "Added to Bag ✓" : "Add to Bag"}</span>
          </button>

          <div className="flex items-center gap-2.5 px-2">
            <button
              type="button"
              aria-label="Favorite"
              onClick={() => onToggleFavorite(item.id)}
              className="cursor-pointer text-[#E04F66] p-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4.5 w-4.5"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Remove item"
              onClick={() => onRemove(item.id)}
              className="cursor-pointer text-[#718073] hover:text-[#DC2626] p-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4.5 w-4.5"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. Wishlist Empty State Component
// ==========================================

export function WishlistEmptyState() {
  return (
    <div className="py-12 sm:py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4E8] text-[#1B6E32] shadow-sm mb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-8 w-8"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
      <h3 className="font-serif-heading text-[18px] sm:text-[20px] font-bold text-[#18382B]">
        Your Wishlist is Empty
      </h3>
      <p className="mt-1 text-[12.5px] text-[#5E7163] max-w-sm mx-auto">
        Explore our curated greenhouse collection and save botanical specimens for your personal sanctuary.
      </p>
      <a
        href="/plants"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#06452E] px-6 py-3 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#043824] active:scale-98"
      >
        <span>Explore Plants</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
}

// ==========================================
// 5. Wishlist Bottom Actions Component
// ==========================================

interface WishlistBottomActionsProps {
  itemCount: number;
  onAddAllToBag: () => void;
  isAllAdded?: boolean;
}

export function WishlistBottomActions({
  itemCount,
  onAddAllToBag,
  isAllAdded = false,
}: WishlistBottomActionsProps) {
  return (
    <div className="pt-6 border-t border-[#EAEFE5] text-center">
      <p className="text-[12px] sm:text-[12.5px] text-[#718073]">
        {itemCount} botanical {itemCount === 1 ? "specimen" : "specimens"} saved in your personal garden wishlist
      </p>

      {/* Add All to Bag Button */}
      <button
        type="button"
        onClick={onAddAllToBag}
        className="btn-premium mt-3.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#185338] hover:bg-[#12422C] py-3.5 px-6 text-[13px] font-bold uppercase tracking-wider text-white shadow-md active:scale-98"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span>{isAllAdded ? "All Items Added to Bag ✓" : "ADD ALL TO BAG"}</span>
      </button>

      {/* Continue Shopping Link */}
      <a
        href="/plants"
        className="mt-3.5 inline-block text-[11px] sm:text-[11.5px] font-bold uppercase tracking-widest text-[#718073] hover:text-[#18382B] transition"
      >
        OR CONTINUE SHOPPING
      </a>
    </div>
  );
}

