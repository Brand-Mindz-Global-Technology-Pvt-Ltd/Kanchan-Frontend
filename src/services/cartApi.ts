import {
  API_BASE_URL,
  getCustomerToken,
  clearCustomerSession,
} from "./customerAuth";

export interface BackendCartItem {
  productId: string;
  name: string;
  variant?: string;
  potType?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  itemSubtotal: number;
  itemSavings: number;
}

export interface BackendCartSummary {
  customerId: string;
  items: BackendCartItem[];
  itemCount: number;
  subtotal: number;
  totalSavings: number;
  deliveryFee: number;
  isFreeShipping: boolean;
  freeShippingThreshold: number;
  totalPayable: number;
  updatedAt: string;
}

export class CartApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "CartApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Normalizes frontend alias IDs to database canonical IDs.
 * Handles duplicate numbers (-2), slugs, abbreviations, and UI keys.
 */
export function resolveCanonicalProductId(rawId: string): string {
  const norm = (rawId || "").trim().toLowerCase();
  if (!norm) return "";

  // Exact database IDs
  if (
    norm === "areca-palm-1" ||
    norm === "monstera-1" ||
    norm === "snake-plant-1" ||
    norm === "peace-lily-1" ||
    norm === "pothos-1" ||
    norm === "ficus-1" ||
    norm === "brass-mister" ||
    norm === "neem-shield" ||
    norm === "vermicompost"
  ) {
    return norm;
  }

  // Areca Palm (areca-palm, areca-palm-2, areca, arecapalm, item-areca-palm)
  if (norm.includes("areca")) {
    return "areca-palm-1";
  }

  // Monstera Deliciosa (monstera, monstera-2, monstera-deliciosa, item-monstera)
  if (norm.includes("monstera")) {
    return "monstera-1";
  }

  // Snake Plant Zeylanica (snake-plant, snake-plant-2, snake-plant-zeylanica, item-snake-plant, snake)
  if (norm.includes("snake")) {
    return "snake-plant-1";
  }

  // Peace Lily Sensation (peace-lily, peace-lily-2, peace-lily-sensation, item-peace-lily, peace)
  if (norm.includes("peace")) {
    return "peace-lily-1";
  }

  // Golden Pothos (pothos, pothos-2, golden-pothos, item-pothos)
  if (norm.includes("pothos")) {
    return "pothos-1";
  }

  // Ficus Lyrata (ficus, ficus-2, ficus-lyrata, item-ficus)
  if (norm.includes("ficus")) {
    return "ficus-1";
  }

  // Care Add-ons
  if (norm.includes("brass") || norm.includes("mister")) {
    return "brass-mister";
  }
  if (norm.includes("neem") || norm.includes("shield")) {
    return "neem-shield";
  }
  if (norm.includes("vermi") || norm.includes("compost")) {
    return "vermicompost";
  }

  return norm;
}

/**
 * Fetches the currently authenticated customer's cart summary from MySQL backend.
 */
export async function fetchCartApi(): Promise<BackendCartSummary> {
  const token = getCustomerToken();
  if (!token) {
    throw new CartApiError("Please sign in to access your garden cart.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to cart server";
    throw new CartApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new CartApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new CartApiError(
      errData?.error || `Failed to fetch cart (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new CartApiError("Invalid cart data received from server.");
  }

  return data.data as BackendCartSummary;
}

/**
 * Adds an item to the authenticated customer's cart in MySQL backend.
 */
export async function addToCartApi(input: {
  productId: string;
  quantity?: number;
  variant?: string;
  potType?: string;
}): Promise<BackendCartSummary> {
  const token = getCustomerToken();
  if (!token) {
    throw new CartApiError("Please sign in to add items to your cart.", 401);
  }

  const resolvedId = resolveCanonicalProductId(input.productId);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: resolvedId,
        quantity: input.quantity ?? 1,
        variant: input.variant,
        potType: input.potType,
      }),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to cart server";
    throw new CartApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new CartApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new CartApiError(
      errData?.error || errData?.message || `Failed to add product to cart (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new CartApiError("Invalid response from cart API.");
  }

  return data.data as BackendCartSummary;
}

/**
 * Updates an item's quantity in the authenticated customer's cart in MySQL backend.
 */
export async function updateCartItemQuantityApi(input: {
  productId: string;
  quantity: number;
  variant?: string;
  potType?: string;
}): Promise<BackendCartSummary> {
  const token = getCustomerToken();
  if (!token) {
    throw new CartApiError("Please sign in to update your cart.", 401);
  }

  const resolvedId = resolveCanonicalProductId(input.productId);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: resolvedId,
        quantity: input.quantity,
        variant: input.variant,
        potType: input.potType,
      }),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to cart server";
    throw new CartApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new CartApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new CartApiError(
      errData?.error || errData?.message || `Failed to update cart item (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new CartApiError("Invalid response from cart API.");
  }

  return data.data as BackendCartSummary;
}

/**
 * Removes an item from the authenticated customer's cart in MySQL backend.
 */
export async function removeCartItemApi(input: {
  productId: string;
  variant?: string;
  potType?: string;
}): Promise<BackendCartSummary> {
  const token = getCustomerToken();
  if (!token) {
    throw new CartApiError("Please sign in to remove items from your cart.", 401);
  }

  const resolvedId = resolveCanonicalProductId(input.productId);

  const params = new URLSearchParams();
  params.set("productId", resolvedId);
  if (input.variant) params.set("variant", input.variant);
  if (input.potType) params.set("potType", input.potType);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/cart?${params.toString()}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to cart server";
    throw new CartApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new CartApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new CartApiError(
      errData?.error || errData?.message || `Failed to remove cart item (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new CartApiError("Invalid response from cart API.");
  }

  return data.data as BackendCartSummary;
}

/**
 * Clears the entire cart for the authenticated customer in MySQL backend.
 */
export async function clearCartApi(): Promise<BackendCartSummary> {
  const token = getCustomerToken();
  if (!token) {
    throw new CartApiError("Please sign in to clear your cart.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/cart/clear`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to cart server";
    throw new CartApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new CartApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new CartApiError(
      errData?.error || `Failed to clear cart (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new CartApiError("Invalid response from cart API.");
  }

  return data.data as BackendCartSummary;
}

