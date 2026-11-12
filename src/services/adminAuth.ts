import type { AdminUser } from "../types/admin";

export const ADMIN_TOKEN_KEY = "kanchan_admin_token";
export const ADMIN_USER_KEY = "kanchan_admin_user";

// Use environment variable if provided, fallback to standard backend port 5000
const API_BASE_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_URL) ||
  "http://localhost:5000"
).replace(/\/+$/, "");

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getStoredAdminUser(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setAdminSession(token: string, admin: AdminUser): void {
  try {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
  } catch (error) {
    console.error("Failed to save admin session:", error);
  }
}

export function clearAdminSession(): void {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_USER_KEY);
  } catch (error) {
    console.error("Failed to clear admin session:", error);
  }
}

export async function loginAdminApi(
  email: string,
  password: string
): Promise<{ token: string; admin: AdminUser }> {
  const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.trim(), password }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success) {
    const errorMessage =
      data?.error || data?.message || "Invalid admin email or password";
    throw new Error(errorMessage);
  }

  if (!data.data?.token || !data.data?.admin) {
    throw new Error("Invalid response received from admin authentication server");
  }

  return data.data;
}

export async function logoutAdminApi(): Promise<void> {
  const token = getAdminToken();
  if (!token) return;

  try {
    await fetch(`${API_BASE_URL}/api/admin/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.warn("Backend logout request failed or network unreachable:", error);
  }
}

export async function getAdminMeApi(token?: string): Promise<AdminUser> {
  const activeToken = token || getAdminToken();
  if (!activeToken) {
    throw new Error("No admin token found in session");
  }

  const response = await fetch(`${API_BASE_URL}/api/admin/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${activeToken}`,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data?.success || !data?.data) {
    const errorMessage =
      data?.error || data?.message || "Invalid or expired admin session";
    throw new Error(errorMessage);
  }

  return data.data as AdminUser;
}

