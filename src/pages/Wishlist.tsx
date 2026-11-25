import { useState, useMemo } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import { getCustomerToken } from "../services/customerAuth";
import { resolveProductImage } from "../services/productApi";
import {
  WishlistNotificationBanner,
  WishlistProductRow,
  WishlistEmptyState,
  WishlistBottomActions,
  type WishlistItem,
} from "../components/wishlist/WishlistComponents";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import BotanicalLeaf from "../components/about/BotanicalLeaf";

export default function Wishlist() {
  const {
    wishlistItems,
    isWishlistLoading,
    wishlistError,
    reloadWishlist,
    removeFromWishlist,
    addToCart,
    navigateTo,
  } = useShop();

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isAllAdded, setIsAllAdded] = useState(false);

  const isAuthenticated = !!getCustomerToken();

  // Map backend wishlist items to UI WishlistItem format
  const items: WishlistItem[] = useMemo(() => {
    return wishlistItems.map((item) => ({
      id: item.productId,
      name: item.name,
      badge: item.badge || "FEATURED",
      badgeVariant: item.badgeVariant || "green",
      description: item.description,
      price: item.price,
      originalPrice: item.originalPrice,
      image: resolveProductImage(item.image),
      isFavorite: true,
    }));
  }, [wishlistItems]);

  useScrollReveal([items.length]);

  // Individual Add to Bag handler
  const handleAddToBag = (product: WishlistItem) => {
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    addToCart({
      id: product.id,
      name: product.name,
      variant: 'Medium (6" grower pot)',
      potType: "Nursery Planter",
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: 1,
      image: product.image,
    });
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  // Toggle favorite flag (clicking in wishlist removes the item)
  const handleToggleFavorite = (id: string) => {
    removeFromWishlist(id);
  };

  // Remove individual product
  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  // Add all products to bag
  const handleAddAllToBag = () => {
    setIsAllAdded(true);
    const newAddedState: Record<string, boolean> = {};
    items.forEach((item) => {
      newAddedState[item.id] = true;
      addToCart({
        id: item.id,
        name: item.name,
        variant: 'Medium (6" grower pot)',
        potType: "Nursery Planter",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: 1,
        image: item.image,
      });
    });
    setAddedIds(newAddedState);

    setTimeout(() => {
      setIsAllAdded(false);
      setAddedIds({});
    }, 2500);
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#FCFAF4] text-[#143826]">
      {/* Import serif and sans fonts matching project standard */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Decorative Leaf Borders on both edges */}
      <AboutEdgeLeaves includeMiddleLeaves />

      {/* Subtle Floating Botanical Background SVGs */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30"
        aria-hidden="true"
      >
        <BotanicalLeaf className="top-[15%] left-[5%] h-24 w-24 rotate-45 text-[#86AA86]" />
        <BotanicalLeaf className="top-[45%] right-[5%] h-28 w-28 -rotate-12 text-[#99B899]" />
        <BotanicalLeaf className="bottom-[15%] left-[6%] h-32 w-32 rotate-90 text-[#7DA27D]" />
      </div>

      {/* Main Page Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 text-[12px] sm:text-[13px]">
          <ol className="flex flex-wrap items-center gap-1.5 text-[#718073]">
            <li>
              <a href="/" className="transition hover:text-[#06452E]">
                Home
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a href="/plants" className="transition hover:text-[#06452E]">
                Plants
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-[#06452E]" aria-current="page">
              My Wishlist
            </li>
          </ol>
        </nav>

        {/* Main Wishlist Card */}
        <div
          data-scroll-reveal="fade-up"
          className="rounded-[24px] border border-[#E6EADF] bg-white p-5 sm:p-8 shadow-[0_4px_24px_rgba(20,56,38,0.06)] animate-fade-in-up"
        >
          {/* Wishlist Header */}
          <div className="flex items-center gap-3">
            <h1 className="font-serif-heading text-[24px] font-bold text-[#18382B] sm:text-[30px]">
              My Wishlist
            </h1>
            <span className="rounded-full bg-[#EAF4E8] px-3 py-1 text-[11px] font-bold text-[#1B6E32] sm:text-[12px]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Error Banner */}
          {wishlistError && (
            <div className="mt-4 flex items-center justify-between rounded-[14px] border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-[13px] text-[#991B1B]">
              <span>{wishlistError}</span>
              <button
                type="button"
                onClick={() => reloadWishlist()}
                className="cursor-pointer font-bold text-[#DC2626] underline hover:no-underline ml-3"
              >
                Retry
              </button>
            </div>
          )}

          {/* Unauthenticated State */}
          {!isAuthenticated ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F7EE] text-[#185338]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-8 w-8"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="font-serif-heading text-xl font-bold text-[#18382B]">
                Sign in to view your wishlist
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-[#718073]">
                Your favorite botanical specimens and rare indoor varieties are safely stored in your account.
              </p>
              <button
                type="button"
                onClick={() => navigateTo("/login")}
                className="mt-6 inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#06452E] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#085a3c]"
              >
                Sign In to Account
              </button>
            </div>
          ) : isWishlistLoading && items.length === 0 ? (
            /* Loading State */
            <div className="py-16 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-solid border-[#06452E] border-r-transparent align-[-0.125em]" />
              <p className="mt-3 text-sm text-[#718073]">Loading your botanical wishlist...</p>
            </div>
          ) : items.length > 0 ? (
            <>
              {/* Notification Banner */}
              <div className="mt-4">
                <WishlistNotificationBanner message="Move items to your bag to enjoy complimentary plant-safe transit packing!" />
              </div>

              {/* Product List Table Header (Desktop) */}
              <div className="mt-6 hidden grid-cols-12 border-b border-[#EAEFE5] pb-2.5 text-[10.5px] font-bold uppercase tracking-wider text-[#8A9A8C] sm:grid">
                <div className="col-span-2">ITEM</div>
                <div className="col-span-6">PRODUCT DETAILS</div>
                <div className="col-span-4 text-right pr-1">ACTION</div>
              </div>

              {/* Product Rows List rendered with .map() from array */}
              <div className="divide-y divide-[#EAEFE5]">
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    data-scroll-reveal="fade-up"
                    data-stagger={(idx % 5) + 1}
                  >
                    <WishlistProductRow
                      item={item}
                      onAddToBag={handleAddToBag}
                      onToggleFavorite={handleToggleFavorite}
                      onRemove={handleRemove}
                      isAdded={!!addedIds[item.id]}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <WishlistBottomActions
                itemCount={items.length}
                onAddAllToBag={handleAddAllToBag}
                isAllAdded={isAllAdded}
              />
            </>
          ) : (
            /* Empty State */
            <div className="mt-4">
              <WishlistEmptyState />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
