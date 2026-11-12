import { getAdminToken } from "./adminAuth";

// API Base URL - defaults to http://localhost:5000 as configured across services
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export type EnquiryStatus = "New" | "Read" | "Replied";

export const ENQUIRY_STATUSES: readonly EnquiryStatus[] = [
  "New",
  "Read",
  "Replied",
] as const;

export interface Enquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEnquiryPayload {
  fullName?: string;
  customerName?: string;
  email: string;
  phone: string;
  city?: string;
  state?: string;
  subject?: string;
  message: string;
}

export interface SubmitEnquiryApiResponse {
  success: boolean;
  message?: string;
  data: Enquiry;
  error?: string;
}

export interface AdminEnquiriesApiResponse {
  success: boolean;
  count?: number;
  data: Enquiry[];
  error?: string;
  message?: string;
}

export interface UpdateAdminEnquiryStatusResponse {
  success: boolean;
  message?: string;
  data: Enquiry;
  error?: string;
}

export interface DeleteAdminEnquiryResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export class EnquiryApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "EnquiryApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Normalizes input status string to valid EnquiryStatus ("New" | "Read" | "Replied").
 */
export function normalizeEnquiryStatus(
  statusStr?: string
): EnquiryStatus | null {
  if (!statusStr || typeof statusStr !== "string") return null;
  const lower = statusStr.trim().toLowerCase();
  if (lower === "new") return "New";
  if (lower === "read") return "Read";
  if (lower === "replied") return "Replied";
  return null;
}

/**
 * Submits a customer enquiry (Public endpoint; no authentication required).
 * POST /api/enquiries
 */
export async function submitEnquiryApi(
  payload: CreateEnquiryPayload
): Promise<SubmitEnquiryApiResponse> {
  const customerName = (payload.fullName || payload.customerName || "").trim();
  if (!customerName) {
    throw new EnquiryApiError(
      "Full name is required to submit an enquiry.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const email = (payload.email || "").trim();
  if (!email) {
    throw new EnquiryApiError(
      "Email address is required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const phone = (payload.phone || "").trim();
  if (!phone) {
    throw new EnquiryApiError(
      "Phone number is required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const message = (payload.message || "").trim();
  if (!message) {
    throw new EnquiryApiError(
      "Message content is required.",
      400,
      "VALIDATION_ERROR"
    );
  }

  const bodyData = {
    customerName,
    fullName: customerName,
    email: email.toLowerCase(),
    phone,
    city: payload.city?.trim() || undefined,
    state: payload.state?.trim() || undefined,
    subject: payload.subject?.trim() || "General Enquiry",
    message,
  };

  const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  const data = (await response.json().catch(
    () => null
  )) as SubmitEnquiryApiResponse | null;

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to submit enquiry (${response.status})`;
    throw new EnquiryApiError(errorMsg, response.status);
  }

  return data;
}

/**
 * Fetches enquiries for admin view with optional status and search filters.
 * GET /api/admin/enquiries
 */
export async function getAdminEnquiriesApi(
  status?: EnquiryStatus | string,
  search?: string
): Promise<Enquiry[]> {
  const token = getAdminToken();
  if (!token) {
    throw new EnquiryApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  const queryParams = new URLSearchParams();
  if (status && status !== "all") {
    const normalized = normalizeEnquiryStatus(status);
    if (normalized) {
      queryParams.set("status", normalized);
    }
  }

  if (search && search.trim()) {
    queryParams.set("search", search.trim());
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/admin/enquiries${
    queryString ? `?${queryString}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  const data = (await response.json().catch(
    () => null
  )) as AdminEnquiriesApiResponse | null;

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to fetch enquiries (${response.status})`;
    throw new EnquiryApiError(errorMsg, response.status);
  }

  if (!Array.isArray(data.data)) {
    throw new EnquiryApiError(
      "Invalid response format received from admin enquiries server",
      response.status
    );
  }

  return data.data;
}

/**
 * Updates the status of an enquiry ("New" | "Read" | "Replied").
 * PATCH /api/admin/enquiries/:id/status
 */
export async function updateAdminEnquiryStatusApi(
  id: string,
  status: EnquiryStatus | string
): Promise<Enquiry> {
  const token = getAdminToken();
  if (!token) {
    throw new EnquiryApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  if (!id || !id.trim()) {
    throw new EnquiryApiError(
      "Enquiry ID is required to update status.",
      400,
      "BAD_REQUEST"
    );
  }

  const normalized = normalizeEnquiryStatus(status);
  if (!normalized) {
    throw new EnquiryApiError(
      `Validation failed: Invalid status '${status}'. Valid statuses are: ${ENQUIRY_STATUSES.join(
        ", "
      )}`,
      400,
      "VALIDATION_ERROR"
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/admin/enquiries/${encodeURIComponent(
      id.trim()
    )}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ status: normalized }),
    }
  );

  const data = (await response.json().catch(
    () => null
  )) as UpdateAdminEnquiryStatusResponse | null;

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to update enquiry status (${response.status})`;
    throw new EnquiryApiError(errorMsg, response.status);
  }

  if (!data.data || typeof data.data !== "object") {
    throw new EnquiryApiError(
      "Invalid response format received from server upon status update",
      response.status
    );
  }

  return data.data;
}

/**
 * Deletes an enquiry record by ID.
 * DELETE /api/admin/enquiries/:id
 */
export async function deleteAdminEnquiryApi(
  id: string
): Promise<DeleteAdminEnquiryResponse> {
  const token = getAdminToken();
  if (!token) {
    throw new EnquiryApiError(
      "Admin authentication required. Please sign in.",
      401,
      "UNAUTHORIZED"
    );
  }

  if (!id || !id.trim()) {
    throw new EnquiryApiError(
      "Enquiry ID is required to delete an enquiry.",
      400,
      "BAD_REQUEST"
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/api/admin/enquiries/${encodeURIComponent(id.trim())}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  const data = (await response.json().catch(
    () => null
  )) as DeleteAdminEnquiryResponse | null;

  if (!response.ok || !data?.success) {
    const errorMsg =
      data?.error ||
      data?.message ||
      `Failed to delete enquiry (${response.status})`;
    throw new EnquiryApiError(errorMsg, response.status);
  }

  return data;
}

