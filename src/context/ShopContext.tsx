import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import type { Order } from "../types/admin";
import { mockOrders } from "../data/mockOrders";
import {
  fetchCartApi,
  addToCartApi,
  updateCartItemQuantityApi,
  removeCartItemApi,
  clearCartApi,
  CartApiError,
} from "../services/cartApi";
import { getCustomerToken } from "../services/customerAuth";
import { resolveProductImage } from "../services/productApi";
import imgMonstera from "../assets/products/img-1.png";
import imgSnakePlant from "../assets/products/img-2.png";
import imgPeaceLily from "../assets/products/img-3.png";
import imgArecaPalm from "../assets/products/img-4.png";

// Programmatic client navigation helper that triggers popstate for custom router
export function navigateTo(path: string) {
  if (typeof window === "undefined") return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export interface SizeOption {
  id: "small" | "medium" | "large";
  title: string;
  potSize: string;
  price: string;
  priceNumeric: number;
  originalPrice: string;
  tag?: string;
}

export interface DetailedProduct {
  id: string;
  aliases: string[];
  name: string;
  subtitle: string;
  badge: string;
  badgeBg?: string;
  originalPrice: string;
  price: string;
  priceNumeric: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  light: "low" | "indirect" | "bright";
  tag: string;
  sizes: SizeOption[];
}

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

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  addressLines: string;
  pincode: string;
  routeInfo: string;
  tag: string;
  isDefault: boolean;
}

// Canonical products catalogue matching all images and visual references
export const CANONICAL_PRODUCTS: DetailedProduct[] = [
  {
    id: "snake-plant-zeylanica",
    aliases: ["snake-plant-1", "snake-plant-2", "snake-plant", "item-snake-plant"],
    name: "Snake Plant Zeylanica",
    subtitle: "Low maintenance",
    badge: "LOW LIGHT",
    badgeBg: "#06452E",
    originalPrice: "₹649",
    price: "₹549",
    priceNumeric: 549,
    rating: 4.9,
    reviewCount: 1127,
    image: imgSnakePlant,
    description:
      "Known as the mother-in-law's tongue, this hardy succulent features sword-like foliage and filters airborne toxins day and night. Thrives on neglect and drought, making it an ideal companion for beginners or anyone looking for green ambiance with minimal fuss.",
    light: "low",
    tag: "Indestructible Hardy Succulent",
    sizes: [
      {
        id: "small",
        title: "Small",
        potSize: '4" grower pot',
        price: "₹399",
        priceNumeric: 399,
        originalPrice: "₹499",
      },
      {
        id: "medium",
        title: "Medium",
        potSize: '6" grower pot',
        price: "₹549",
        priceNumeric: 549,
        originalPrice: "₹649",
        tag: "BEST VALUE",
      },
      {
        id: "large",
        title: "Large Statement",
        potSize: '8" grower pot',
        price: "₹899",
        priceNumeric: 899,
        originalPrice: "₹1,099",
      },
    ],
  },
  {
    id: "monstera-deliciosa",
    aliases: ["monstera-1", "monstera-2", "monstera", "item-monstera"],
    name: "Monstera Deliciosa",
    subtitle: "A tropical beauty",
    badge: "BEST SELLER",
    badgeBg: "#06452E",
    originalPrice: "₹1,099",
    price: "₹899",
    priceNumeric: 899,
    rating: 4.8,
    reviewCount: 1420,
    image: imgMonstera,
    description:
      "A stunning tropical showpiece famous for its dramatic fenestrated foliage. Purifies indoor air while creating an opulent, serene botanical atmosphere in living rooms and bright spaces.",
    light: "indirect",
    tag: "Air Purifying Tropical Icon",
    sizes: [
      {
        id: "small",
        title: "Small",
        potSize: '5" grower pot',
        price: "₹599",
        priceNumeric: 599,
        originalPrice: "₹699",
      },
      {
        id: "medium",
        title: "Medium",
        potSize: '6" grower pot',
        price: "₹749",
        priceNumeric: 749,
        originalPrice: "₹899",
      },
      {
        id: "large",
        title: "Large Statement",
        potSize: '8" grower pot',
        price: "₹899",
        priceNumeric: 899,
        originalPrice: "₹1,099",
        tag: "BEST VALUE",
      },
    ],
  },
  {
    id: "peace-lily-sensation",
    aliases: ["peace-lily-1", "peace-lily-2", "peace-lily", "item-peace-lily"],
    name: "Peace Lily Sensation",
    subtitle: "Purifies indoor air",
    badge: "FLOWERING",
    badgeBg: "#5D2811",
    originalPrice: "₹899",
    price: "₹699",
    priceNumeric: 699,
    rating: 4.7,
    reviewCount: 890,
    image: imgPeaceLily,
    description:
      "Peace Lily is admired worldwide for its graceful white blooms and broad deep-green leaves. It filters toxins and adds natural humidity, flourishing in medium to indirect light.",
    light: "indirect",
    tag: "Flowering Air Purifier",
    sizes: [
      {
        id: "small",
        title: "Small",
        potSize: '4" grower pot',
        price: "₹449",
        priceNumeric: 449,
        originalPrice: "₹549",
      },
      {
        id: "medium",
        title: "Medium",
        potSize: '6" grower pot',
        price: "₹699",
        priceNumeric: 699,
        originalPrice: "₹899",
        tag: "BEST VALUE",
      },
      {
        id: "large",
        title: "Large Statement",
        potSize: '8" grower pot',
        price: "₹999",
        priceNumeric: 999,
        originalPrice: "₹1,299",
      },
    ],
  },
  {
    id: "areca-palm",
    aliases: ["areca-palm-1", "areca-palm-2", "areca"],
    name: "Areca Palm",
    subtitle: "Elegant & fresh",
    badge: "AIR PURIFYING",
    badgeBg: "#06452E",
    originalPrice: "₹1,499",
    price: "₹1,199",
    priceNumeric: 1199,
    rating: 4.7,
    reviewCount: 650,
    image: imgArecaPalm,
    description:
      "Feathery arching fronds make the Areca Palm an timeless favorite for homes and modern offices. One of NASA's top-rated natural air purifying and humidifying specimens.",
    light: "bright",
    tag: "Natural Living Air Filter",
    sizes: [
      {
        id: "small",
        title: "Small",
        potSize: '6" grower pot',
        price: "₹799",
        priceNumeric: 799,
        originalPrice: "₹999",
      },
      {
        id: "medium",
        title: "Medium",
        potSize: '8" grower pot',
        price: "₹1,199",
        priceNumeric: 1199,
        originalPrice: "₹1,499",
        tag: "BEST VALUE",
      },
      {
        id: "large",
        title: "Large Statement",
        potSize: '10" grower pot',
        price: "₹1,699",
        priceNumeric: 1699,
        originalPrice: "₹2,199",
      },
    ],
  },
];

export const INITIAL_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-home",
    name: "Aditi Sharma",
    phone: "+91 98451 23456",
    addressLines:
      "#402, Green Meadows Enclave, 14th Main, HSR Layout Sector 2, Bangalore, Karnataka",
    pincode: "560102",
    routeInfo: "Verified Greenhouse Courier Route (Zone South-1)",
    tag: "HOME",
    isDefault: true,
  },
  {
    id: "addr-work",
    name: "Aditi Sharma (Studio)",
    phone: "+91 98451 23456",
    addressLines:
      "Studio 38, The Greenhouse Hub, Outer Ring Road, Bellandur, Bangalore, Karnataka",
    pincode: "560103",
    routeInfo: "Reception delivery accessible 9 AM – 7 PM",
    tag: "WORK / STUDIO",
    isDefault: false,
  },
];

// Initial cart items (empty by default; populated from database for authenticated customer)
export const INITIAL_CART_ITEMS: CartProductItem[] = [];

interface ShopContextType {
  cartItems: CartProductItem[];
  isCartLoading: boolean;
  cartError: string | null;
  reloadCart: () => Promise<void>;
  isCartAuthenticated: boolean;
  addToCart: (item: {
    id: string;
    name: string;
    variant: string;
    potType?: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    image: string;
  }) => void;
  updateQuantity: (id: string, delta: number, variant?: string) => void;
  removeItem: (id: string, variant?: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalSavings: number;
  totalCount: number;
  freeShippingThreshold: number;
  isFreeShipping: boolean;
  remainingForFree: number;
  shippingProgressPct: number;

  // Selected Product State
  selectedProductId: string;
  setSelectedProductId: (id: string) => void;
  selectedProduct: DetailedProduct;
  selectProductAndNavigate: (productId: string) => void;

  // AddToBag Drawer State
  isBagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;

  // Addresses
  addresses: SavedAddress[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  selectedAddress: SavedAddress;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Navigation
  navigateTo: (path: string) => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

function findProductById(rawId: string): DetailedProduct {
  const normalized = rawId.toLowerCase().trim();
  const found = CANONICAL_PRODUCTS.find(
    (p) =>
      p.id === normalized ||
      p.aliases.some((a) => a.toLowerCase() === normalized) ||
      p.name.toLowerCase().includes(normalized) ||
      normalized.includes(p.id)
  );
  return found || CANONICAL_PRODUCTS[0]; // fallback to Snake Plant
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartProductItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState<boolean>(() => !!getCustomerToken());
  const [cartError, setCartError] = useState<string | null>(null);
  const [isCartAuthenticated, setIsCartAuthenticated] = useState<boolean>(() => !!getCustomerToken());
  const syncSeqRef = useRef<number>(0);

  const syncCart = useCallback(async () => {
    const token = getCustomerToken();
    if (!token) {
      setIsCartAuthenticated(false);
      setCartItems([]);
      setIsCartLoading(false);
      setCartError(null);
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("kanchan_cart");
      }
      return;
    }

    const currentSeq = ++syncSeqRef.current;
    setIsCartAuthenticated(true);
    setIsCartLoading(true);
    setCartError(null);

    try {
      const summary = await fetchCartApi();
      if (currentSeq !== syncSeqRef.current) return;

      const mapped: CartProductItem[] = summary.items.map((item) => ({
        id: item.productId,
        name: item.name,
        variant: item.variant || "Standard",
        potType: item.potType || "Care Essential",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: resolveProductImage(item.image),
        isSaved: false,
      }));
      setCartItems(mapped);
      setIsCartLoading(false);
      setCartError(null);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kanchan_cart", JSON.stringify(mapped));
      }
    } catch (err: unknown) {
      if (currentSeq !== syncSeqRef.current) return;
      setIsCartLoading(false);
      const msg =
        err instanceof Error ? err.message : "Failed to load cart from server";
      setCartError(msg);
      // Only clear cart if token was explicitly invalid/expired (401).
      // Never wipe out saved cart on network errors or initial loading glitch!
      if (err instanceof CartApiError && err.status === 401) {
        setIsCartAuthenticated(false);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    syncCart();

    const handleAuthChange = () => {
      syncCart();
    };

    window.addEventListener("kanchan:auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("kanchan:auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [syncCart]);

  const [selectedProductId, setSelectedProductIdState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      // Check query param e.g. /product-details?id=monstera-1
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get("id");
      if (queryId) return queryId;

      // Check URL path like /product/monstera-1
      const pathParts = window.location.pathname.split("/");
      if (pathParts[1] === "product" && pathParts[2]) {
        return pathParts[2];
      }

      const saved = sessionStorage.getItem("kanchan_selected_product");
      if (saved) return saved;
    }
    return "snake-plant-zeylanica";
  });

  const [isBagOpen, setIsBagOpen] = useState(false);
  const [addresses] = useState<SavedAddress[]>(INITIAL_SAVED_ADDRESSES);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("addr-home");

  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("kanchan_orders");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return [...mockOrders];
  });

  const addOrder = (newOrder: Order) => {
    setOrders((prev) => {
      if (prev.some((o) => o.orderNumber === newOrder.orderNumber || o.id === newOrder.id)) {
        return prev;
      }
      const updated = [newOrder, ...prev];
      if (typeof window !== "undefined") {
        sessionStorage.setItem("kanchan_orders", JSON.stringify(updated));
      }
      return updated;
    });
    if (!mockOrders.some((o) => o.orderNumber === newOrder.orderNumber || o.id === newOrder.id)) {
      mockOrders.unshift(newOrder);
    }
  };

  // Sync selected product from URL changes
  useEffect(() => {
    const handleUrlSync = () => {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get("id");
      if (queryId) {
        setSelectedProductIdState(queryId);
        return;
      }
      const pathParts = window.location.pathname.split("/");
      if (pathParts[1] === "product" && pathParts[2]) {
        setSelectedProductIdState(pathParts[2]);
      }
    };

    window.addEventListener("popstate", handleUrlSync);
    return () => window.removeEventListener("popstate", handleUrlSync);
  }, []);

  const setSelectedProductId = (id: string) => {
    setSelectedProductIdState(id);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kanchan_selected_product", id);
    }
  };

  const selectProductAndNavigate = (productId: string) => {
    setSelectedProductId(productId);
    navigateTo(`/product-details?id=${productId}`);
  };

  const selectedProduct = findProductById(selectedProductId);

  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const addToCart: ShopContextType["addToCart"] = async (newItem) => {
    const token = getCustomerToken();
    if (!token) {
      navigateTo("/login");
      return;
    }

    // Optimistic UI update
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === newItem.id && i.variant === newItem.variant
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          quantity: copy[existingIdx].quantity + newItem.quantity,
        };
        return copy;
      }
      return [
        ...prev,
        {
          id: newItem.id,
          name: newItem.name,
          variant: newItem.variant,
          potType: newItem.potType || "Care Essential",
          price: newItem.price,
          originalPrice: newItem.originalPrice,
          quantity: newItem.quantity,
          image: newItem.image,
          isSaved: false,
        },
      ];
    });

    try {
      const summary = await addToCartApi({
        productId: newItem.id,
        quantity: newItem.quantity,
        variant: newItem.variant,
        potType: newItem.potType,
      });
      const mapped = summary.items.map((item) => ({
        id: item.productId,
        name: item.name,
        variant: item.variant || "Standard",
        potType: item.potType || "Care Essential",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: resolveProductImage(item.image),
        isSaved: false,
      }));
      setCartItems(mapped);
    } catch (err: unknown) {
      console.error("Failed to add to database cart:", err);
      syncCart();
    }
  };

  const updateQuantity = async (id: string, delta: number, variant?: string) => {
    const token = getCustomerToken();
    const targetItem = cartItems.find((i) =>
      variant ? i.id === id && i.variant === variant : i.id === id
    );
    if (!targetItem) return;

    const nextQty = targetItem.quantity + delta;

    // Optimistic UI update
    setCartItems((prev) =>
      prev
        .map((item) => {
          const isMatch = variant
            ? item.id === id && item.variant === variant
            : item.id === id;
          if (isMatch) {
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartProductItem[]
    );

    if (!token) return;

    try {
      const summary = await updateCartItemQuantityApi({
        productId: id,
        quantity: nextQty,
        variant,
        potType: targetItem.potType,
      });
      const mapped = summary.items.map((item) => ({
        id: item.productId,
        name: item.name,
        variant: item.variant || "Standard",
        potType: item.potType || "Care Essential",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: resolveProductImage(item.image),
        isSaved: false,
      }));
      setCartItems(mapped);
    } catch (err: unknown) {
      console.error("Failed to update cart quantity in database:", err);
      syncCart();
    }
  };

  const removeItem = async (id: string, variant?: string) => {
    const token = getCustomerToken();
    const targetItem = cartItems.find((i) =>
      variant ? i.id === id && i.variant === variant : i.id === id
    );

    // Optimistic UI update
    setCartItems((prev) =>
      prev.filter((item) => {
        if (variant) {
          return !(item.id === id && item.variant === variant);
        }
        return item.id !== id;
      })
    );

    if (!token) return;

    try {
      const summary = await removeCartItemApi({
        productId: id,
        variant,
        potType: targetItem?.potType,
      });
      const mapped = summary.items.map((item) => ({
        id: item.productId,
        name: item.name,
        variant: item.variant || "Standard",
        potType: item.potType || "Care Essential",
        price: item.price,
        originalPrice: item.originalPrice,
        quantity: item.quantity,
        image: resolveProductImage(item.image),
        isSaved: false,
      }));
      setCartItems(mapped);
    } catch (err: unknown) {
      console.error("Failed to remove item from database cart:", err);
      syncCart();
    }
  };

  const clearCart = async () => {
    const token = getCustomerToken();
    setCartItems([]);

    if (!token) return;

    try {
      await clearCartApi();
    } catch (err: unknown) {
      console.error("Failed to clear cart in database:", err);
      syncCart();
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const freeShippingThreshold = 799;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const remainingForFree = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgressPct = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const openBag = () => setIsBagOpen(true);
  const closeBag = () => setIsBagOpen(false);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        isCartLoading,
        cartError,
        reloadCart: syncCart,
        isCartAuthenticated,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        totalSavings,
        totalCount,
        freeShippingThreshold,
        isFreeShipping,
        remainingForFree,
        shippingProgressPct,
        selectedProductId,
        setSelectedProductId,
        selectedProduct,
        selectProductAndNavigate,
        isBagOpen,
        openBag,
        closeBag,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        selectedAddress,
        orders,
        addOrder,
        navigateTo,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return ctx;
}

