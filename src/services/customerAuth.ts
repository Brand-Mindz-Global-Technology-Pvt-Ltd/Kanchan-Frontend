export const CUSTOMER_TOKEN_KEY = "kanchan_customer_token";
export const CUSTOMER_USER_KEY = "kanchan_customer_user";

// Use environment variable if provided, fallback to standard backend port 5000
export const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export interface SafeCustomer {
  id: string;
  fullName: string;
  email: string;
  mobileNumber?: string;
  gender?: string;
  address?: string;
  createdAt: string;
}

export interface RegisterCustomerInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  mobileNumber?: string;
  gender?: string;
  address?: string;
}

export interface LoginCustomerInput {
  email: string;
  password: string;
}

export interface AuthResponseData {
  token: string;
  customer: SafeCustomer;
}

export class AuthError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

/**
 * Retrieves the stored customer authentication token from localStorage or sessionStorage.
 */
export function getCustomerToken(): string | null {
  try {
    const raw =
      localStorage.getItem(CUSTOMER_TOKEN_KEY) ||
      sessionStorage.getItem(CUSTOMER_TOKEN_KEY);
    if (!raw || raw === "undefined" || raw === "null" || raw.trim() === "") {
      return null;
    }
    return raw.trim();
  } catch {
    return null;
  }
}

/**
 * Retrieves the cached customer profile from localStorage or sessionStorage.
 */
export function getStoredCustomer(): SafeCustomer | null {
  try {
    const raw =
      localStorage.getItem(CUSTOMER_USER_KEY) ||
      sessionStorage.getItem(CUSTOMER_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SafeCustomer;
  } catch {
    return null;
  }
}

/**
 * Stores the customer token and profile into localStorage (if rememberMe) or sessionStorage.
 */
export function setCustomerSession(
  token: string,
  customer: SafeCustomer,
  remember: boolean = true
): void {
  try {
    if (remember) {
      localStorage.setItem(CUSTOMER_TOKEN_KEY, token);
      localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(customer));
      sessionStorage.removeItem(CUSTOMER_TOKEN_KEY);
      sessionStorage.removeItem(CUSTOMER_USER_KEY);
    } else {
      sessionStorage.setItem(CUSTOMER_TOKEN_KEY, token);
      sessionStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(customer));
      localStorage.removeItem(CUSTOMER_TOKEN_KEY);
      localStorage.removeItem(CUSTOMER_USER_KEY);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("kanchan:auth-change", { detail: { customer, token } })
      );
    }
  } catch (error) {
    console.error("Failed to save customer session:", error);
  }
}

/**
 * Clears the customer token and cached profile from both localStorage and sessionStorage.
 */
export function clearCustomerSession(): void {
  try {
    localStorage.removeItem(CUSTOMER_TOKEN_KEY);
    localStorage.removeItem(CUSTOMER_USER_KEY);
    sessionStorage.removeItem(CUSTOMER_TOKEN_KEY);
    sessionStorage.removeItem(CUSTOMER_USER_KEY);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("kanchan:auth-change", { detail: null })
      );
    }
  } catch (error) {
    console.error("Failed to clear customer session:", error);
  }
}

/**
 * Connects to POST /api/auth/register on Kanchan Backend.
 */
export async function registerCustomerApi(
  input: RegisterCustomerInput
): Promise<SafeCustomer> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to authentication server";
    throw new AuthError(msg, 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    let errorMsg =
      data?.error || `Registration failed with status ${response.status}`;
    if (errorMsg.includes("EMAIL_ALREADY_EXISTS")) {
      errorMsg = errorMsg.replace(/^EMAIL_ALREADY_EXISTS:\s*/i, "");
    }
    throw new AuthError(errorMsg, response.status);
  }

  return data.data;
}

/**
 * Connects to POST /api/auth/login on Kanchan Backend.
 */
export async function loginCustomerApi(
  input: LoginCustomerInput
): Promise<AuthResponseData> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to authentication server";
    throw new AuthError(msg, 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success || !data.data?.token) {
    let errorMsg = data?.error || `Login failed with status ${response.status}`;
    if (errorMsg.includes("INVALID_CREDENTIALS")) {
      errorMsg = "Invalid email or password";
    }
    throw new AuthError(errorMsg, response.status);
  }

  return data.data;
}

/**
 * Connects to POST /api/auth/logout on Kanchan Backend and clears local storage.
 */
export async function logoutCustomerApi(): Promise<boolean> {
  const token = getCustomerToken();
  if (!token) {
    clearCustomerSession();
    return true;
  }

  try {
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.warn("Logout request failed:", err);
  } finally {
    clearCustomerSession();
  }
  return true;
}

/**
 * Validates the current session token with GET /api/auth/me on Kanchan Backend.
 * Automatically clears the session if expired or invalid.
 */
export async function validateSessionApi(): Promise<SafeCustomer | null> {
  const token = getCustomerToken();
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        clearCustomerSession();
      }
      return null;
    }

    const data = await response.json().catch(() => null);
    if (!data?.success || !data?.data) {
      clearCustomerSession();
      return null;
    }

    return data.data as SafeCustomer;
  } catch (err) {
    console.warn("Session validation failed:", err);
    return null;
  }
}

/**
 * Fetches the currently authenticated customer profile directly via GET /api/auth/me.
 * Throws AuthError on failure or 401 session expiration.
 */
export async function fetchCustomerProfileApi(): Promise<SafeCustomer> {
  const token = getCustomerToken();
  if (!token) {
    throw new AuthError("Please sign in to view your profile.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/me`, {
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
        : "Failed to connect to authentication server";
    throw new AuthError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AuthError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AuthError(
      errData?.error || `Failed to fetch customer profile (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new AuthError("Invalid profile data received from server.");
  }

  try {
    if (localStorage.getItem(CUSTOMER_TOKEN_KEY)) {
      localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(data.data));
    } else if (sessionStorage.getItem(CUSTOMER_TOKEN_KEY)) {
      sessionStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(data.data));
    }
  } catch {
    // ignore storage write errors
  }

  return data.data as SafeCustomer;
}

/**
 * Updates the authenticated customer profile via PUT /api/auth/profile.
 */
export async function updateCustomerProfileApi(
  updates: Partial<SafeCustomer>
): Promise<SafeCustomer> {
  const token = getCustomerToken();
  if (!token) {
    throw new AuthError("Please sign in to update your profile.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  } catch (netErr: unknown) {
    const msg =
      netErr instanceof Error
        ? netErr.message
        : "Failed to connect to authentication server";
    throw new AuthError(`Network error: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AuthError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AuthError(
      errData?.error || `Failed to update profile (HTTP ${response.status})`,
      response.status
    );
  }

  const data = await response.json().catch(() => null);
  if (!data?.success || !data?.data) {
    throw new AuthError(data?.error || "Failed to update profile.");
  }

  try {
    if (localStorage.getItem(CUSTOMER_TOKEN_KEY)) {
      localStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(data.data));
    } else if (sessionStorage.getItem(CUSTOMER_TOKEN_KEY)) {
      sessionStorage.setItem(CUSTOMER_USER_KEY, JSON.stringify(data.data));
    }
  } catch {
    // ignore storage write errors
  }

  return data.data as SafeCustomer;
}


