import {
  API_BASE_URL,
  getCustomerToken,
  clearCustomerSession,
} from "./customerAuth";
import type { SavedAddressItem } from "../components/checkout/AddressComponents";

export type AddressTag = "HOME" | "WORK";

export interface CustomerAddress {
  id: string;
  customerId: string;
  name: string;
  phone: string;
  pincode: string;
  flatBuilding: string;
  streetColony: string;
  landmark?: string;
  tag: AddressTag;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAddressInput {
  name: string;
  phone: string;
  pincode: string;
  flatBuilding: string;
  streetColony: string;
  landmark?: string;
  tag: AddressTag;
  isDefault?: boolean;
}

export interface UpdateAddressInput {
  name?: string;
  phone?: string;
  pincode?: string;
  flatBuilding?: string;
  streetColony?: string;
  landmark?: string;
  tag?: AddressTag;
  isDefault?: boolean;
}

export class AddressApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "AddressApiError";
    this.status = status;
  }
}

/**
 * Format raw 10-digit phone for Indian display (+91 98451 23456)
 */
export function formatDisplayPhone(phone: string): string {
  const digits = (phone || "").replace(/\D/g, "");
  const last10 = digits.slice(-10);
  if (last10.length === 10) {
    return `+91 ${last10.slice(0, 5)} ${last10.slice(5)}`;
  }
  return phone || "";
}

/**
 * Convert backend CustomerAddress to frontend SavedAddressItem
 */
export function toSavedAddressItem(addr: CustomerAddress): SavedAddressItem {
  const addressParts = [addr.flatBuilding, addr.streetColony].filter(Boolean);
  if (addr.landmark && addr.landmark.trim()) {
    const cleanLandmark = addr.landmark.trim();
    const prefix = cleanLandmark.toLowerCase().startsWith("near ") ? "" : "Near ";
    addressParts.push(`${prefix}${cleanLandmark}`);
  }
  const addressLines = addressParts.join(", ");

  const routeZone = addr.pincode ? `Zone ${addr.pincode.slice(0, 3)}` : "Zone South-1";
  const routeInfo =
    addr.tag === "WORK"
      ? `Reception delivery accessible 9 AM – 7 PM (${routeZone})`
      : `Verified Greenhouse Courier Route (${routeZone})`;

  return {
    id: addr.id,
    name: addr.name,
    phone: formatDisplayPhone(addr.phone),
    addressLines,
    pincode: addr.pincode,
    routeInfo,
    tag: addr.tag === "WORK" ? "WORK / STUDIO" : "HOME",
    isDefault: Boolean(addr.isDefault),
  };
}

/**
 * Fetches all saved addresses for the authenticated customer.
 */
export async function fetchAddressesApi(): Promise<CustomerAddress[]> {
  const token = getCustomerToken();
  if (!token) {
    throw new AddressApiError("Please sign in to view your delivery addresses.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/customer/addresses`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new AddressApiError(`Unable to connect to address server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AddressApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AddressApiError(
      errData?.error || `Failed to fetch addresses (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !Array.isArray(json.data)) {
    throw new AddressApiError("Unexpected response format from address server");
  }

  return json.data as CustomerAddress[];
}

/**
 * Creates a new address for the authenticated customer.
 */
export async function createAddressApi(
  input: CreateAddressInput
): Promise<CustomerAddress> {
  const token = getCustomerToken();
  if (!token) {
    throw new AddressApiError("Please sign in to add a delivery address.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/customer/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new AddressApiError(`Unable to connect to address server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AddressApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AddressApiError(
      errData?.error || `Failed to save address (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !json.data) {
    throw new AddressApiError("Failed to parse created address response");
  }

  return json.data as CustomerAddress;
}

/**
 * Updates an existing address for the authenticated customer.
 */
export async function updateAddressApi(
  id: string,
  input: UpdateAddressInput
): Promise<CustomerAddress> {
  const token = getCustomerToken();
  if (!token) {
    throw new AddressApiError("Please sign in to update this delivery address.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/customer/addresses/${encodeURIComponent(id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new AddressApiError(`Unable to connect to address server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AddressApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AddressApiError(
      errData?.error || `Failed to update address (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !json.data) {
    throw new AddressApiError("Failed to parse updated address response");
  }

  return json.data as CustomerAddress;
}

/**
 * Deletes an existing address.
 */
export async function deleteAddressApi(id: string): Promise<void> {
  const token = getCustomerToken();
  if (!token) {
    throw new AddressApiError("Please sign in to delete this delivery address.", 401);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/customer/addresses/${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new AddressApiError(`Unable to connect to address server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AddressApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AddressApiError(
      errData?.error || `Failed to delete address (HTTP ${response.status})`,
      response.status
    );
  }
}

/**
 * Sets an address as default.
 */
export async function setDefaultAddressApi(id: string): Promise<CustomerAddress> {
  const token = getCustomerToken();
  if (!token) {
    throw new AddressApiError("Please sign in to update default address.", 401);
  }

  let response: Response;
  try {
    response = await fetch(
      `${API_BASE_URL}/api/customer/addresses/${encodeURIComponent(id)}/default`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new AddressApiError(`Unable to connect to address server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new AddressApiError("Session expired. Please sign in again.", 401);
    }
    const errData = await response.json().catch(() => null);
    throw new AddressApiError(
      errData?.error || `Failed to set default address (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !json.data) {
    throw new AddressApiError("Failed to parse default address response");
  }

  return json.data as CustomerAddress;
}
