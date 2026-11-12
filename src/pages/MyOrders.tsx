import { useState, useEffect, useMemo, useCallback } from "react";
import { useShop, CANONICAL_PRODUCTS } from "../context/ShopContext";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import { getCustomerToken } from "../services/customerAuth";
import {
  fetchCustomerOrdersApi,
  type CustomerOrder,
  type OrderStatus,
} from "../services/orderApi";
import imgMonstera from "../assets/products/img-1.png";

// Helper to look up canonical product thumbnail
function getProductThumbnail(productId: string, productName: string, itemImage?: string): string {
  if (itemImage && (itemImage.startsWith("http") || itemImage.startsWith("/assets") || itemImage.startsWith("data:"))) {
    return itemImage;
  }

  const normId = (productId || "").toLowerCase();
  const normName = (productName || "").toLowerCase();

  const found = CANONICAL_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === normId ||
      p.aliases.some((a) => a.toLowerCase() === normId) ||
      normName.includes(p.name.toLowerCase()) ||
      p.name.toLowerCase().includes(normName)
  );

  return found ? found.image : imgMonstera;
}

// Helper for date formatting
function formatOrderDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

// Compact Status Stepper
function CompactStatusTracker({ status }: { status: OrderStatus }) {
  const stages = [
    { key: "confirmed", label: "Confirmed" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
  ];

  const activeIndex =
    status === "delivered"
      ? 3
      : status === "shipped"
      ? 2
      : status === "processing"
      ? 1
      : status === "cancelled"
      ? -1
      : 0;

  if (status === "cancelled") {
    return (
      <div className="rounded-[10px] bg-[#FDF2F2] border border-[#F8B4B4] px-3 py-2 text-[12px] font-medium text-[#9B1C1C]">
        This order has been cancelled.
      </div>
    );
  }

  return (
    <div className="w-full py-1">
      <div className="flex items-center w-full">
        {stages.map((stage, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={stage.key} className="contents">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[9px] sm:text-[10px] font-bold ${
                    isCompleted || isCurrent
                      ? "bg-[#06452E] text-white"
                      : "bg-[#F3F5F1] border border-[#D5DDD2] text-[#8C9E91]"
                  }`}
                >
                  {isCompleted ? "✓" : isCurrent ? "●" : idx + 1}
                </div>
                <span
                  className={`mt-1 text-[10px] sm:text-[11px] whitespace-nowrap ${
                    isCurrent
                      ? "font-bold text-[#06452E]"
                      : isCompleted
                      ? "font-medium text-[#185E28]"
                      : "text-[#8C9E91]"
                  }`}
                >
                  {stage.label}
                </span>
              </div>

              {idx < stages.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-1.5 -mt-3.5 sm:-mt-4 ${
                    idx < activeIndex ? "bg-[#06452E]" : "bg-[#E2E8DE]"
                  }`}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function MyOrders() {
  const { navigateTo } = useShop();

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Load orders for authenticated customer
  const loadOrders = useCallback(async () => {
    const token = getCustomerToken();
    if (!token) {
      setIsGuest(true);
      setIsLoading(false);
      return;
    }

    setIsGuest(false);
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchCustomerOrdersApi();
      setOrders(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load orders";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const filteredOrders = useMemo(() => {
    if (selectedStatusTab === "all") return orders;
    return orders.filter((o) => o.orderStatus === selectedStatusTab);
  }, [orders, selectedStatusTab]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return (
          <span className="inline-flex items-center rounded-full bg-[#FEF5E7] border border-[#F6DEB5] px-2.5 py-0.5 text-[11px] font-semibold text-[#8A5E08]">
            Processing
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center rounded-full bg-[#EDF7ED] border border-[#C3E6CB] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E7E34]">
            Shipped
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center rounded-full bg-[#EAF4E8] border border-[#BBD7B9] px-2.5 py-0.5 text-[11px] font-semibold text-[#06452E]">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center rounded-full bg-[#FDF2F2] border border-[#F8B4B4] px-2.5 py-0.5 text-[11px] font-semibold text-[#9B1C1C]">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-[#F3F4F6] border border-[#E5E7EB] px-2.5 py-0.5 text-[11px] font-semibold text-[#4B5563]">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="relative isolate min-h-screen w-full bg-[#FAF7F0] text-[#143826] overflow-x-hidden">
      {/* Font styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* About Us side border leaves */}
      <AboutEdgeLeaves includeMiddleLeaves />

      {/* Main Content Container */}
      <div className="relative z-10 font-body mx-auto max-w-[1080px] px-4 py-5 sm:px-6 lg:px-8 sm:py-7 w-full">
        {/* Simple Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-3 text-[12px] text-[#718073]">
          <ol className="flex items-center gap-1.5">
            <li>
              <button
                type="button"
                onClick={() => navigateTo("/")}
                className="hover:text-[#06452E] transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li aria-hidden="true" className="text-[#A4B5A8]">/</li>
            <li>
              <button
                type="button"
                onClick={() => navigateTo("/profile")}
                className="hover:text-[#06452E] transition-colors cursor-pointer"
              >
                My Account
              </button>
            </li>
            <li aria-hidden="true" className="text-[#A4B5A8]">/</li>
            <li className="font-semibold text-[#06452E]" aria-current="page">
              My Orders
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-4 pb-3 border-b border-[#E8E4DA] flex items-baseline justify-between">
          <div>
            <h1 className="font-serif-heading text-[24px] sm:text-[28px] font-bold text-[#06452E]">
              My Orders
            </h1>
            <p className="mt-1 text-[13px] text-[#55695A]">
              Track, view details, and manage your recent botanical orders
            </p>
          </div>
          <span className="text-[12.5px] font-medium text-[#718073] shrink-0">
            {isLoading ? "Loading..." : `${orders.length} ${orders.length === 1 ? "order" : "orders"}`}
          </span>
        </div>

        {/* GUEST BANNER */}
        {isGuest && (
          <div className="rounded-[16px] border border-[#E0E6DA] bg-white p-8 text-center shadow-xs">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4E8] text-[#06452E]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="mt-3 font-serif-heading text-[18px] font-bold text-[#18382B]">
              Sign in to view your orders
            </h3>
            <p className="mt-1 text-[13px] text-[#55695A] max-w-sm mx-auto">
              Please log in to your Kanchan account to track and manage your plant purchases.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <a
                href="/login?redirect=/my-orders"
                className="inline-flex items-center justify-center rounded-full bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-xs hover:bg-[#043322]"
              >
                Sign In
              </a>
            </div>
          </div>
        )}

        {/* ERROR BANNER */}
        {loadError && (
          <div className="mb-4 flex items-center justify-between rounded-[14px] border border-[#F5C2C7] bg-[#FDF2F2] p-4 text-[13px] text-[#842029]">
            <span>{loadError}</span>
            <button
              type="button"
              onClick={loadOrders}
              className="rounded-full bg-[#842029] px-3.5 py-1 text-[11px] font-semibold text-white hover:bg-[#681820]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filter Tabs */}
        {!isGuest && (
          <div className="mb-5 flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Orders" },
              { id: "processing", label: "Processing" },
              { id: "shipped", label: "Shipped" },
              { id: "delivered", label: "Delivered" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatusTab(tab.id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[12px] transition-all ${
                  selectedStatusTab === tab.id
                    ? "bg-[#06452E] text-white font-semibold shadow-xs"
                    : "bg-white border border-[#E0DCD2] text-[#55695A] hover:bg-[#F2EFE8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* LOADING SKELETON */}
        {isLoading && !isGuest && (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-[16px] border border-[#E8E4DA] bg-white p-5 space-y-4"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-36 rounded bg-[#EAF2E7]" />
                  <div className="h-5 w-20 rounded bg-[#EAF2E7]" />
                </div>
                <div className="flex gap-4">
                  <div className="h-16 w-16 rounded-[10px] bg-[#EAF2E7]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-[#EAF2E7]" />
                    <div className="h-3 w-1/4 rounded bg-[#EAF2E7]" />
                  </div>
                </div>
                <div className="h-8 w-full rounded bg-[#F4F7F2]" />
              </div>
            ))}
          </div>
        )}

        {/* Orders List */}
        {!isLoading && !isGuest && (
          <>
            {filteredOrders.length === 0 ? (
              <div className="rounded-[16px] border border-[#E8E4DA] bg-white p-8 text-center shadow-xs">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EAF4E8] text-[#06452E]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="mt-3 font-serif-heading text-[17px] font-bold text-[#18382B]">
                  No Orders Found
                </h3>
                <p className="mt-1 text-[13px] text-[#637C6A]">
                  {selectedStatusTab === "all"
                    ? "You haven't placed any orders yet. Discover our climate-acclimatized plants to begin your indoor garden!"
                    : `No orders found in the ${selectedStatusTab} category.`}
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo("/plants")}
                  className="mt-4 cursor-pointer inline-flex items-center gap-1.5 rounded-[8px] bg-[#06452E] px-4 py-2 text-[12.5px] font-semibold text-white shadow-xs hover:bg-[#043322]"
                >
                  Browse Plants &rarr;
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;

                  // Render items from order.items or order.products
                  const orderItemsList =
                    order.items && order.items.length > 0
                      ? order.items
                      : (order.products || []).map((p) => ({
                          productId: p.productId,
                          productName: p.productName,
                          quantity: p.quantity,
                          price: p.price,
                          totalPrice: p.price * p.quantity,
                          discountPerUnit: 0,
                          totalSavings: 0,
                          image: "",
                        }));

                  return (
                    <div
                      key={order.id}
                      className="rounded-[16px] border border-[#E8E4DA] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.03)] hover:border-[#D5D0C5] transition-all overflow-hidden"
                    >
                      {/* 1. Header: Order ID, Date, Payment Method on left, Status on right */}
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#F2EFE8] text-[12.5px] bg-[#FAF8F3]/40">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono font-bold text-[#06452E]">
                            #{order.orderNumber}
                          </span>
                          <span className="text-[#C4C9BF]">•</span>
                          <span className="text-[#718073]">
                            {formatOrderDate(order.orderDate)}
                          </span>
                          <span className="text-[#C4C9BF]">•</span>
                          <span className="rounded-full bg-[#EAF4E8] px-2 py-0.5 text-[10.5px] font-semibold text-[#185E28]">
                            {order.paymentMethod === "cod"
                              ? "Cash on Delivery"
                              : "Online Paid"}
                          </span>
                        </div>

                        <div>{getStatusBadge(order.orderStatus)}</div>
                      </div>

                      {/* 2. Product Section: neatly aligned rows with consistent images */}
                      <div className="px-4 py-3.5 sm:px-5 sm:py-4 space-y-3">
                        {orderItemsList.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3.5 sm:gap-4">
                            {/* Consistent product thumbnail */}
                            <img
                              src={getProductThumbnail(
                                item.productId,
                                item.productName,
                                (item as any).image
                              )}
                              alt={item.productName}
                              className="h-14 w-14 sm:h-16 sm:w-16 rounded-[10px] bg-[#FAF8F3] border border-[#EBE7DF] object-contain p-1 shrink-0"
                            />

                            {/* Product details */}
                            <div className="min-w-0 flex-1">
                              <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#18382B] truncate leading-snug">
                                {item.productName}
                              </h3>
                              <p className="mt-1 text-[12px] text-[#718073]">
                                Qty: <span className="font-medium text-[#18382B]">{item.quantity}</span>
                                <span className="mx-2 text-[#C4C9BF]">|</span>
                                <span>₹{item.price.toLocaleString("en-IN")} each</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 3. Bottom Footer Row: TOTAL amount left, View Details right */}
                      <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-t border-[#F2EFE8] bg-[#FAF8F3]/60">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-[12px] text-[#718073]">Order Total:</span>
                          <span className="font-serif-heading font-bold text-[16px] sm:text-[17px] text-[#06452E]">
                            ₹{order.totalAmount.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* View Details action */}
                        <button
                          type="button"
                          onClick={() => toggleDetails(order.id)}
                          className="cursor-pointer text-[12px] font-semibold text-[#06452E] hover:underline flex items-center gap-1"
                        >
                          <span>{isExpanded ? "Hide Details" : "View Details"}</span>
                          <span className="text-[9px]">{isExpanded ? "▲" : "▼"}</span>
                        </button>
                      </div>

                      {/* 4. Collapsible Details: Tracking and Delivery Address */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-3 sm:px-5 sm:pb-5 border-t border-[#F2EFE8] bg-[#FAF8F3]/20 space-y-3 animate-fadeIn">
                          <div className="rounded-[10px] bg-white border border-[#E8E4DA] p-3 sm:p-4 shadow-xs">
                            <CompactStatusTracker status={order.orderStatus} />
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-[12px]">
                            {order.customerAddress && (
                              <div className="rounded-[10px] bg-white border border-[#E8E4DA] p-3">
                                <span className="font-semibold text-[#18382B] block mb-1">
                                  Delivery Address
                                </span>
                                <p className="text-[#5E7163] leading-relaxed">
                                  {order.customerAddress}
                                </p>
                              </div>
                            )}

                            <div className="rounded-[10px] bg-white border border-[#E8E4DA] p-3">
                              <span className="font-semibold text-[#18382B] block mb-1">
                                Payment Details
                              </span>
                              <div className="space-y-1 text-[#5E7163]">
                                <div className="flex justify-between">
                                  <span>Payment Method:</span>
                                  <span className="font-semibold text-[#18382B]">
                                    {order.paymentMethod === "cod" ? "Cash on Delivery (COD)" : "Online"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment Status:</span>
                                  <span className="font-semibold text-[#18382B] uppercase text-[11px]">
                                    {order.paymentStatus === "pending" ? "Pay on Delivery" : order.paymentStatus}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Delivery Fee:</span>
                                  <span className="font-semibold text-[#185E28]">
                                    {order.deliveryFee === 0 ? "FREE" : `₹${order.deliveryFee}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
