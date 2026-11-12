import { getAdminToken } from "./adminAuth";

// API Base URL - defaults to http://localhost:5000 as configured
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export type AdminOrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export const ADMIN_ORDER_STATUSES: readonly AdminOrderStatus[] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export type AdminPaymentMethod = "online" | "cod";
export type AdminPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface AdminOrderItem {
  productId: string;
  productName: string;
  variant?: string;
  potType?: string;
  price: number;
  originalPrice?: number;
  discountPerUnit: number;
  quantity: number;
  totalPrice: number;
  totalSavings: number;
  image: string;
}

export interface AdminOrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface AdminDeliveryAddress {
  id?: string;
  customerId?: string;
  name: string;
  phone: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  addressType?: "home" | "work" | "other";
  isDefault?: boolean;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  deliveryAddress?: AdminDeliveryAddress;
  items?: AdminOrderItem[];
  products: AdminOrderProduct[];
  itemCount?: number;
  subtotal?: number;
  totalSavings?: number;
  deliveryFee?: number;
  freeShippingThreshold?: number;
  totalAmount: number;
  paymentMethod?: AdminPaymentMethod;
  paymentStatus: AdminPaymentStatus;
  orderStatus: AdminOrderStatus;
  orderDate: string;
  stockRestored?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminOrdersApiResponse {
  success: boolean;
  count?: number;
  data: AdminOrder[];
  error?: string;
  message?: string;
}

export interface UpdateAdminOrderStatusResponse {
  success: boolean;
  message?: string;
  data: AdminOrder;
  error?: string;
}

export class AdminOrderApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "AdminOrderApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Fetches orders for admin view from the backend database.
 * Supports optional status filtering (e.g., 'pending', 'processing', 'shipped', 'delivered', 'cancelled').
 */
export async function getAdminOrdersApi(
  status?: AdminOrderStatus | string
): Promise<AdminOrder[]> {
  const token = getAdminToken();
  if (!token) {
    throw new AdminOrderApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  let url = `${API_BASE_URL}/api/admin/orders`;
  if (status && status !== "all") {
    const normalized = status.trim().toLowerCase();
    url += `?status=${encodeURIComponent(normalized)}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as AdminOrdersApiResponse | null;

  if (!response.ok || !data?.success) {
    const errorMessage =
      data?.error || data?.message || `Failed to fetch orders (${response.status})`;
    throw new AdminOrderApiError(errorMessage, response.status);
  }

  if (!Array.isArray(data.data)) {
    throw new AdminOrderApiError(
      "Invalid response format received from admin orders server",
      response.status
    );
  }

  return data.data;
}

/**
 * Updates the order status of an existing order by admin.
 * Sends PATCH /api/admin/orders/:id/status with { status: normalizedStatus }
 */
export async function updateAdminOrderStatusApi(
  orderId: string,
  status: AdminOrderStatus | string
): Promise<AdminOrder> {
  const token = getAdminToken();
  if (!token) {
    throw new AdminOrderApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  if (!orderId || !orderId.trim()) {
    throw new AdminOrderApiError(
      "Order ID is required to update order status.",
      400,
      "BAD_REQUEST"
    );
  }

  const normalizedStatus = status?.trim().toLowerCase() as AdminOrderStatus;
  if (!ADMIN_ORDER_STATUSES.includes(normalizedStatus)) {
    throw new AdminOrderApiError(
      `Validation failed: Invalid status '${status}'. Valid statuses are: ${ADMIN_ORDER_STATUSES.join(", ")}`,
      400,
      "VALIDATION_ERROR"
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/admin/orders/${encodeURIComponent(orderId.trim())}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ status: normalizedStatus }),
    }
  );

  const data = (await response.json().catch(() => null)) as UpdateAdminOrderStatusResponse | null;

  if (!response.ok || !data?.success) {
    const errorMessage =
      data?.error || data?.message || `Failed to update order status (${response.status})`;
    throw new AdminOrderApiError(errorMessage, response.status);
  }

  if (!data.data || typeof data.data !== "object") {
    throw new AdminOrderApiError(
      "Invalid response format received from server upon status update",
      response.status
    );
  }

  return data.data;
}

