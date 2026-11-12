import img1 from "../assets/products/img-1.png";
import img2 from "../assets/products/img-2.png";
import img3 from "../assets/products/img-3.png";
import img4 from "../assets/products/img-4.png";
import img5 from "../assets/products/img-5.png";
import { getAdminToken } from "./adminAuth";

// API Base URL - defaults to http://localhost:5000 as specified
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export interface BackendProduct {
  id: string;
  name: string;
  subtitle: string;
  badge?: string;
  badgeBg?: string;
  originalPrice: string;
  price: string;
  priceNumeric: number;
  rating: number;
  image: string;
  images?: string[];
  category: string;
  light: string;
  stock: number;
  description: string;
}

export interface ProductsApiResponse {
  success: boolean;
  count?: number;
  data: BackendProduct[];
  error?: string;
}

/**
 * Maps a backend product object to the Product format expected by ProductCard.
 */
export function mapBackendProductToCard(p: BackendProduct): BackendProduct & { image: string } {
  return {
    ...p,
    image: resolveProductImage(p.image),
  };
}

const BUNDLED_PRODUCT_IMAGES: Record<string, string> = {
  "img-1.png": img1,
  "img-2.png": img2,
  "img-3.png": img3,
  "img-4.png": img4,
  "img-5.png": img5,
};

/**
 * Resolves a product image from database representation to a displayable URL.
 * Handles backend /uploads/ paths, bundled asset paths (like /src/assets/products/img-1.png),
 * external/hosted URLs (http/https), and data/blob URIs.
 */
export function resolveProductImage(imagePath?: string): string {
  if (!imagePath) return img1;

  // Remote URLs, data URIs, or temporary preview blob URLs are used directly
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  // Handle uploaded images from backend: /uploads/... or uploads/...
  if (imagePath.startsWith("/uploads/") || imagePath.startsWith("uploads/")) {
    const cleanUploadPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanUploadPath}`;
  }

  // Extract base filename e.g. "img-1.png"
  const cleanPath = imagePath.split("?")[0];
  const filename = cleanPath.split("/").pop()?.toLowerCase();
  if (filename && BUNDLED_PRODUCT_IMAGES[filename]) {
    return BUNDLED_PRODUCT_IMAGES[filename];
  }

  // Fallback to substring matching e.g. "img-4" in path
  for (const [key, assetUrl] of Object.entries(BUNDLED_PRODUCT_IMAGES)) {
    const baseKey = key.replace(".png", "");
    if (imagePath.toLowerCase().includes(baseKey)) {
      return assetUrl;
    }
  }

  return imagePath;
}

/**
 * Fetches all products from the Kanchan Backend API (GET /api/products).
 */
export async function getProductsApi(category?: string): Promise<BackendProduct[]> {
  const url = new URL(`${API_BASE_URL}/api/products`);
  if (category && category !== "all") {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let errorMsg = `Server returned status ${response.status} (${response.statusText})`;
    try {
      const errJson = await response.json();
      if (errJson && errJson.error) {
        errorMsg = errJson.error;
      }
    } catch {
      // response is not JSON
    }
    throw new Error(errorMsg);
  }

  const data: ProductsApiResponse = await response.json();
  if (!data.success || !Array.isArray(data.data)) {
    throw new Error(data.error || "Failed to retrieve products from server");
  }

  return data.data;
}

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface SingleProductApiResponse {
  success: boolean;
  data: BackendProduct;
  error?: string;
}

/**
 * Fetches a single product by ID from the Kanchan Backend API (GET /api/products/:id).
 */
export async function getProductByIdApi(id: string): Promise<BackendProduct> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new ApiError("Product ID is required", 400);
  }

  const url = `${API_BASE_URL}/api/products/${encodeURIComponent(cleanId)}`;
  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new ApiError(msg, 0);
  }

  if (!response.ok) {
    let errorMsg = `Server returned status ${response.status} (${response.statusText})`;
    try {
      const errJson = await response.json();
      if (errJson && errJson.error) {
        errorMsg = errJson.error;
      }
    } catch {
      // response is not JSON
    }
    throw new ApiError(errorMsg, response.status);
  }

  const data: SingleProductApiResponse = await response.json();
  if (!data.success || !data.data) {
    throw new ApiError(data.error || `Product with ID '${cleanId}' not found`, 404);
  }

  return data.data;
}

export interface CreateProductInput {
  name: string;
  subtitle?: string;
  badge?: string;
  badgeBg?: string;
  originalPrice?: string;
  price: string;
  priceNumeric?: number;
  rating?: number;
  image?: string;
  images?: string[];
  category: string;
  light?: string;
  stock?: number;
  description?: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;

export interface ProductActionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: BackendProduct;
}

/**
 * Creates a new product in the Kanchan database (POST /api/products).
 * Protected route - requires active admin session token.
 */
export async function createProductApi(
  payload: CreateProductInput
): Promise<BackendProduct> {
  const token = getAdminToken();
  if (!token) {
    throw new ApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new ApiError(msg, 0);
  }

  const data: ProductActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to create product (Server returned status ${response.status})`;
    throw new ApiError(errorMsg, response.status);
  }

  if (!data.data) {
    throw new ApiError("Server did not return created product data", response.status);
  }

  return data.data;
}

/**
 * Updates an existing product in the Kanchan database (PUT /api/products/:id).
 * Protected route - requires active admin session token.
 */
export async function updateProductApi(
  id: string,
  payload: UpdateProductInput
): Promise<BackendProduct> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new ApiError("Product ID is required", 400);
  }

  const token = getAdminToken();
  if (!token) {
    throw new ApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(cleanId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new ApiError(msg, 0);
  }

  const data: ProductActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to update product (Server returned status ${response.status})`;
    throw new ApiError(errorMsg, response.status);
  }

  if (!data.data) {
    throw new ApiError("Server did not return updated product data", response.status);
  }

  return data.data;
}

/**
 * Deletes a product from the Kanchan database (DELETE /api/products/:id).
 * Protected route - requires active admin session token.
 */
export async function deleteProductApi(
  id: string
): Promise<{ success: boolean; message: string }> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new ApiError("Product ID is required", 400);
  }

  const token = getAdminToken();
  if (!token) {
    throw new ApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(cleanId)}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new ApiError(msg, 0);
  }

  const data: ProductActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to delete product (Server returned status ${response.status})`;
    throw new ApiError(errorMsg, response.status);
  }

  return {
    success: true,
    message: data.message || `Product with ID '${cleanId}' deleted successfully`,
  };
}

export interface UploadProductImageResponse {
  success: boolean;
  data?: {
    imageUrl: string;
  };
  imageUrl?: string;
  error?: string;
  message?: string;
}

const MAX_PRODUCT_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_PRODUCT_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

/**
 * Uploads a raw binary product image to the backend (POST /api/admin/uploads/products).
 * Protected route - requires active admin session token.
 * Validates format (JPEG, PNG, WebP) and size (<= 5MB).
 * Sends raw File binary as request body with Content-Type header matching file.type.
 */
export async function uploadProductImageApi(file: File): Promise<string> {
  // 1. Client-side format validation (JPEG, PNG, WebP only)
  const mimeType = file.type?.toLowerCase();
  if (!mimeType || !ALLOWED_PRODUCT_IMAGE_TYPES.includes(mimeType)) {
    throw new ApiError(
      "Only JPEG, PNG, and WebP images are allowed for product uploads",
      400
    );
  }

  // 2. Client-side size validation (max 5 MB)
  if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
    throw new ApiError(
      `File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(2)} MB)`,
      400
    );
  }

  // 3. Admin authentication token validation
  const token = getAdminToken();
  if (!token) {
    throw new ApiError("Admin authentication required. Please log in.", 401);
  }

  // 4. Send raw binary directly in body (no FormData, Base64, or JSON)
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/admin/uploads/products`, {
      method: "POST",
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        Authorization: `Bearer ${token}`,
      },
      body: file,
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new ApiError(msg, 0);
  }

  const data: UploadProductImageResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to upload product image (Server returned status ${response.status})`;
    throw new ApiError(errorMsg, response.status);
  }

  const imageUrl = data.data?.imageUrl || data.imageUrl;
  if (!imageUrl) {
    throw new ApiError("Server did not return uploaded product image URL", response.status);
  }

  return imageUrl;
}
