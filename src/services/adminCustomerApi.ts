import { getAdminToken } from "./adminAuth";
import type { AdminOrder, AdminOrderItem } from "./adminOrderApi";
import type { CustomerAddress } from "./addressApi";

// API Base URL - defaults to http://localhost:5000 as configured across admin services
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export type { AdminOrder, AdminOrderItem } from "./adminOrderApi";
export type { CustomerAddress } from "./addressApi";

export interface AdminCustomer {
  id: string;
  fullName: string;
  email: string;
  mobileNumber?: string | null;
  gender?: string | null;
  address?: string | null;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface AdminCustomerDetails extends AdminCustomer {
  addresses: CustomerAddress[];
  orders: AdminOrder[];
}

export interface AdminCustomersApiResponse {
  success: boolean;
  count?: number;
  data: AdminCustomer[];
  error?: string;
  message?: string;
}

export interface AdminCustomerDetailsApiResponse {
  success: boolean;
  data: AdminCustomerDetails;
  error?: string;
  message?: string;
}

export class AdminCustomerApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "AdminCustomerApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Fetches all registered customers with aggregate order statistics for admin view from the backend database.
 * Supports optional search filtering (matches customer name, email, or mobile number).
 */
export async function getAdminCustomersApi(
  search?: string
): Promise<AdminCustomer[]> {
  const token = getAdminToken();
  if (!token) {
    throw new AdminCustomerApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  let url = `${API_BASE_URL}/api/admin/customers`;
  if (search && search.trim()) {
    url += `?search=${encodeURIComponent(search.trim())}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = (await response.json().catch(() => null)) as AdminCustomersApiResponse | null;

  if (!response.ok || !data?.success) {
    const errorMessage =
      data?.error || data?.message || `Failed to fetch customers (${response.status})`;
    throw new AdminCustomerApiError(errorMessage, response.status);
  }

  if (!Array.isArray(data.data)) {
    throw new AdminCustomerApiError(
      "Invalid response format received from admin customers server",
      response.status
    );
  }

  return data.data;
}

/**
 * Fetches comprehensive customer details for admin view from the backend database.
 * Includes customer profile information, saved delivery addresses, and full order history with items.
 */
export async function getAdminCustomerDetailsApi(
  customerId: string
): Promise<AdminCustomerDetails> {
  const token = getAdminToken();
  if (!token) {
    throw new AdminCustomerApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  if (!customerId || !customerId.trim()) {
    throw new AdminCustomerApiError(
      "Customer ID is required.",
      400,
      "BAD_REQUEST"
    );
  }

  const url = `${API_BASE_URL}/api/admin/customers/${encodeURIComponent(
    customerId.trim()
  )}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = (await response.json().catch(
    () => null
  )) as AdminCustomerDetailsApiResponse | null;

  if (!response.ok || !data?.success) {
    const errorMessage =
      data?.error ||
      data?.message ||
      `Failed to fetch customer details (${response.status})`;
    throw new AdminCustomerApiError(errorMessage, response.status);
  }

  if (!data.data || typeof data.data !== "object") {
    throw new AdminCustomerApiError(
      "Invalid customer details response received from server",
      response.status
    );
  }

  return data.data;
}
