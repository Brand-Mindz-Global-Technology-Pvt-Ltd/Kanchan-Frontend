import {
  API_BASE_URL,
  getCustomerToken,
  clearCustomerSession,
} from "./customerAuth";
import { resolveProductImage } from "./productApi";

export interface BackendWishlistItem {
  productId: string;
  name: string;
  badge?: string;
  badgeVariant?: "green" | "amber" | "sage";
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  isFavorite: boolean;
  addedAt: string;
}

export interface BackendCustomerWishlist {
  customerId: string;
  items: BackendWishlistItem[];
  count: number;
  updatedAt: string;
}

export class WishlistApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "WishlistApiError";
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

  // Areca Palm
  if (norm.includes("areca")) {
    return "areca-palm-1";
  }

  // Monstera Deliciosa
  if (norm.includes("monstera")) {
    return "monstera-1";
  }

  // Snake Plant Zeylanica
  if (norm.includes("snake")) {
    return "snake-plant-1";
  }

  // Peace Lily Sensation
  if (norm.includes("peace")) {
    return "peace-lily-1";
  }

  // Golden Pothos
  if (norm.includes("pothos")) {
    return "pothos-1";
  }

  // Ficus Lyrata
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
 * Fetches the currently authenticated customer's wishlist from MySQL backend.
 */
export async function fetchWishlistApi(): Promise<BackendCustomerWishlist> {
  const token = getCustomerToken();
  if (!token) {
    throw new WishlistApiError("Please sign in to view your wishlist.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/wishlist`, {
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
        : "Failed to connect to wishlist server";
    throw new WishlistApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new WishlistApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new WishlistApiError(
      errData?.error || `Failed to fetch wishlist (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new WishlistApiError("Invalid wishlist data received from server.");
  }

  return data.data as BackendCustomerWishlist;
}

/**
 * Adds an item to the authenticated customer's wishlist in MySQL backend.
 */
export async function addToWishlistApi(
  productId: string
): Promise<BackendCustomerWishlist> {
  const token = getCustomerToken();
  if (!token) {
    throw new WishlistApiError("Please sign in to add items to your wishlist.", 401);
  }

  const resolvedId = resolveCanonicalProductId(productId);

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: resolvedId,
      }),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to wishlist server";
    throw new WishlistApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new WishlistApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    // If already in wishlist, treat as success or return current error
    if (response.status === 400 && errData?.error?.includes("already in your wishlist")) {
      return await fetchWishlistApi();
    }
    throw new WishlistApiError(
      errData?.error || `Failed to add product to wishlist (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new WishlistApiError("Invalid response received from server.");
  }

  return data.data as BackendCustomerWishlist;
}

/**
 * Removes an item from the authenticated customer's wishlist in MySQL backend.
 */
export async function removeFromWishlistApi(
  productId: string
): Promise<BackendCustomerWishlist> {
  const token = getCustomerToken();
  if (!token) {
    throw new WishlistApiError("Please sign in to remove items from your wishlist.", 401);
  }

  const resolvedId = resolveCanonicalProductId(productId);

  let response: Response;
  try {
    response = await fetch(
      `${API_BASE_URL}/api/wishlist?productId=${encodeURIComponent(resolvedId)}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to wishlist server";
    throw new WishlistApiError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new WishlistApiError("Session expired. Please sign in again.", 401);
    }
    if (response.status === 404) {
      // If item is already not in wishlist, fetch current wishlist to stay in sync
      return await fetchWishlistApi();
    }
    const errData = await response.json().catch(() => null);
    throw new WishlistApiError(
      errData?.error || `Failed to remove product from wishlist (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new WishlistApiError("Invalid response received from server.");
  }

  return data.data as BackendCustomerWishlist;
}
