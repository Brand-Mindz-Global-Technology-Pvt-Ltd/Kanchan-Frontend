import { getAdminToken } from "./adminAuth";

// API Base URL - defaults to http://localhost:5000 as specified
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export type CategoryStatus = "Active" | "Inactive";

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  status?: CategoryStatus;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: string;
  productCount?: number;
  status?: CategoryStatus;
}

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export interface CategoryApiResponse {
  success: boolean;
  count?: number;
  data: Category[];
  error?: string;
  message?: string;
}

export interface SingleCategoryApiResponse {
  success: boolean;
  data: Category;
  error?: string;
  message?: string;
}

export interface CategoryActionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: Category;
}

export class CategoryApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "CategoryApiError";
    this.status = status;
  }
}

// Export alias for consistency with productApi error conventions
export { CategoryApiError as ApiError };

/**
 * Fetches all categories from the Kanchan Backend API (GET /api/categories).
 * Supports optional filter parameters for status and search term.
 */
export async function getCategoriesApi(params?: {
  status?: string;
  search?: string;
}): Promise<Category[]> {
  const url = new URL(`${API_BASE_URL}/api/categories`);
  if (params?.status && params.status !== "all") {
    url.searchParams.set("status", params.status);
  }
  if (params?.search && params.search.trim()) {
    url.searchParams.set("search", params.search.trim());
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new CategoryApiError(msg, 0);
  }

  const data: CategoryApiResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Server returned status ${response.status} (${response.statusText})`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  if (!Array.isArray(data.data)) {
    throw new CategoryApiError("Failed to retrieve categories from server", response.status);
  }

  return data.data;
}

/**
 * Fetches a single category by ID from the Kanchan Backend API (GET /api/categories/:id).
 */
export async function getCategoryByIdApi(id: string): Promise<Category> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new CategoryApiError("Category ID is required", 400);
  }

  const url = `${API_BASE_URL}/api/categories/${encodeURIComponent(cleanId)}`;
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
    throw new CategoryApiError(msg, 0);
  }

  const data: SingleCategoryApiResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Category with ID '${cleanId}' not found`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  if (!data.data) {
    throw new CategoryApiError(`Category with ID '${cleanId}' not found`, 404);
  }

  return data.data;
}

/**
 * Creates a new category in the Kanchan database (POST /api/categories).
 * Protected route - requires active admin session token.
 */
export async function createCategoryApi(
  payload: CreateCategoryInput
): Promise<Category> {
  const token = getAdminToken();
  if (!token) {
    throw new CategoryApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/categories`, {
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
    throw new CategoryApiError(msg, 0);
  }

  const data: CategoryActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to create category (Server returned status ${response.status})`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  if (!data.data) {
    throw new CategoryApiError("Server did not return created category data", response.status);
  }

  return data.data;
}

/**
 * Updates an existing category in the Kanchan database (PUT /api/categories/:id).
 * Protected route - requires active admin session token.
 */
export async function updateCategoryApi(
  id: string,
  payload: UpdateCategoryInput
): Promise<Category> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new CategoryApiError("Category ID is required", 400);
  }

  const token = getAdminToken();
  if (!token) {
    throw new CategoryApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/categories/${encodeURIComponent(cleanId)}`, {
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
    throw new CategoryApiError(msg, 0);
  }

  const data: CategoryActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to update category (Server returned status ${response.status})`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  if (!data.data) {
    throw new CategoryApiError("Server did not return updated category data", response.status);
  }

  return data.data;
}

/**
 * Deletes a category from the Kanchan database (DELETE /api/categories/:id).
 * Protected route - requires active admin session token.
 */
export async function deleteCategoryApi(
  id: string
): Promise<{ success: boolean; message: string }> {
  const cleanId = id.trim();
  if (!cleanId) {
    throw new CategoryApiError("Category ID is required", 400);
  }

  const token = getAdminToken();
  if (!token) {
    throw new CategoryApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/categories/${encodeURIComponent(cleanId)}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error ? netErr.message : "Failed to connect to backend server";
    throw new CategoryApiError(msg, 0);
  }

  const data: CategoryActionResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to delete category (Server returned status ${response.status})`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  return {
    success: true,
    message: data.message || `Category with ID '${cleanId}' deleted successfully`,
  };
}

export interface UploadCategoryImageResponse {
  success: boolean;
  data: {
    imageUrl: string;
  };
  error?: string;
  message?: string;
}

/**
 * Uploads raw binary category image directly to the backend (POST /api/admin/uploads/categories).
 * Protected route - requires active admin session token.
 * Sends raw binary data with Content-Type header matching the file's MIME type.
 */
export async function uploadCategoryImageApi(file: File): Promise<string> {
  const token = getAdminToken();
  if (!token) {
    throw new CategoryApiError("Admin authentication required. Please log in.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/admin/uploads/categories`, {
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
    throw new CategoryApiError(msg, 0);
  }

  const data: UploadCategoryImageResponse | null = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to upload category image (Server returned status ${response.status})`;
    throw new CategoryApiError(errorMsg, response.status);
  }

  if (!data.data?.imageUrl) {
    throw new CategoryApiError("Server did not return uploaded image URL", response.status);
  }

  return data.data.imageUrl;
}

