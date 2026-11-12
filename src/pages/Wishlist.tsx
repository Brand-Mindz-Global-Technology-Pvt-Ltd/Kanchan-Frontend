import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import {
  WishlistNotificationBanner,
  WishlistProductRow,
  WishlistEmptyState,
  WishlistBottomActions,
  type WishlistItem,
} from "../components/wishlist/WishlistComponents";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import BotanicalLeaf from "../components/about/BotanicalLeaf";
import imgMonstera from "../assets/products/img-1.png";
import imgSnakePlant from "../assets/products/img-2.png";
import imgPeaceLily from "../assets/products/img-3.png";

// Sample initial wishlist items matching the screenshot reference
const initialWishlistItems: WishlistItem[] = [
  {
    id: "item-monstera",
    name: "Monstera Deliciosa",
    badge: "BEST SELLER",
    badgeVariant: "green",
    description: "A tropical beauty · Air purifying",
    price: 899,
    originalPrice: 999,
    image: imgMonstera,
    isFavorite: true,
  },
  {
    id: "item-snake-plant",
    name: "Snake Plant Zeylanica",
    badge: "LOW LIGHT",
    badgeVariant: "green",
    description: "Low maintenance · Drought tolerant",
    price: 549,
    originalPrice: 699,
    image: imgSnakePlant,
    isFavorite: true,
  },
  {
    id: "item-peace-lily",
    name: "Peace Lily Sensation",
    badge: "FLOWERING",
    badgeVariant: "amber",
    description: "Purifies indoor air · Humidity lover",
    price: 699,
    originalPrice: 899,
    image: imgPeaceLily,
    isFavorite: true,
  },
];

export default function Wishlist() {
  const { addToCart } = useShop();
  const [items, setItems] = useState<WishlistItem[]>(initialWishlistItems);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [isAllAdded, setIsAllAdded] = useState(false);

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

  // Toggle favorite flag
  const handleToggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Remove individual product
  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
        <div data-scroll-reveal="fade-up" className="rounded-[24px] border border-[#E6EADF] bg-white p-5 sm:p-8 shadow-[0_4px_24px_rgba(20,56,38,0.06)] animate-fade-in-up">
          {/* Wishlist Header */}
          <div className="flex items-center gap-3">
            <h1 className="font-serif-heading text-[24px] font-bold text-[#18382B] sm:text-[30px]">
              My Wishlist
            </h1>
            <span className="rounded-full bg-[#EAF4E8] px-3 py-1 text-[11px] font-bold text-[#1B6E32] sm:text-[12px]">
              {items.length} {items.length === 1 ? "item" : "items"}
            </span>
          </div>

          {/* Notification Banner */}
          <div className="mt-4">
            <WishlistNotificationBanner message="Move items to your bag to enjoy complimentary plant-safe transit packing!" />
          </div>

          {items.length > 0 ? (
            <>
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
            <WishlistEmptyState />
          )}
        </div>
      </div>
    </div>
  );
}

