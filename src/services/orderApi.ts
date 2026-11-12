import {
  API_BASE_URL,
  getCustomerToken,
  clearCustomerSession,
} from "./customerAuth";
import type { CustomerAddress } from "./addressApi";

export type PaymentMethod = "cod" | "online";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
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

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  deliveryAddress: CustomerAddress;
  items: OrderItem[];
  products: OrderProduct[];
  itemCount: number;
  subtotal: number;
  totalSavings: number;
  deliveryFee: number;
  freeShippingThreshold: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  deliveryAddressId: string;
  paymentMethod?: PaymentMethod;
  items?: Array<{
    productId: string;
    quantity?: number;
    variant?: string;
    potType?: string;
  }>;
  buyNowItem?: {
    productId: string;
    quantity?: number;
    variant?: string;
    potType?: string;
  };
  isBuyNow?: boolean;
}

export class OrderApiError extends Error {
  status?: number;
  code?: string;
  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "OrderApiError";
    this.status = status;
    this.code = code;
  }
}

/**
 * Creates a new order for the authenticated customer in MySQL.
 */
export async function createOrderApi(
  input: CreateOrderInput
): Promise<CustomerOrder> {
  const token = getCustomerToken();
  if (!token) {
    throw new OrderApiError("Please sign in to place your order.", 401, "UNAUTHORIZED");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        deliveryAddressId: input.deliveryAddressId,
        paymentMethod: input.paymentMethod || "cod",
        ...(input.items ? { items: input.items } : {}),
        ...(input.buyNowItem ? { buyNowItem: input.buyNowItem } : {}),
        ...(input.isBuyNow !== undefined ? { isBuyNow: input.isBuyNow } : {}),
      }),
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new OrderApiError(`Unable to connect to order server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new OrderApiError("Session expired. Please sign in again.", 401, "UNAUTHORIZED");
    }
    const errData = await response.json().catch(() => null);
    const rawError: string = errData?.message || errData?.error || `Failed to create order (HTTP ${response.status})`;

    // Clean up backend prefix tags e.g. INSUFFICIENT_STOCK: ...
    let code: string | undefined;
    let cleanMessage = rawError;
    const match = rawError.match(/^([A-Z_]+):\s*(.+)$/);
    if (match) {
      code = match[1];
      cleanMessage = match[2];
    }

    throw new OrderApiError(cleanMessage, response.status, code);
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !json.data) {
    throw new OrderApiError("Failed to parse created order response");
  }

  return json.data as CustomerOrder;
}

/**
 * Fetches all orders for the currently authenticated customer from MySQL.
 */
export async function fetchCustomerOrdersApi(): Promise<CustomerOrder[]> {
  const token = getCustomerToken();
  if (!token) {
    throw new OrderApiError("Please sign in to view your orders.", 401, "UNAUTHORIZED");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new OrderApiError(`Unable to connect to orders server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new OrderApiError("Session expired. Please sign in again.", 401, "UNAUTHORIZED");
    }
    const errData = await response.json().catch(() => null);
    throw new OrderApiError(
      errData?.error || `Failed to fetch orders (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !Array.isArray(json.data)) {
    throw new OrderApiError("Unexpected response format from order server");
  }

  return json.data as CustomerOrder[];
}

/**
 * Fetches details of a single order.
 */
export async function fetchOrderDetailsApi(orderId: string): Promise<CustomerOrder> {
  const token = getCustomerToken();
  if (!token) {
    throw new OrderApiError("Please sign in to view this order.", 401, "UNAUTHORIZED");
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/orders/${encodeURIComponent(orderId)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (netErr: unknown) {
    const msg = netErr instanceof Error ? netErr.message : "Network error";
    throw new OrderApiError(`Unable to connect to order server: ${msg}`);
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearCustomerSession();
      throw new OrderApiError("Session expired. Please sign in again.", 401, "UNAUTHORIZED");
    }
    const errData = await response.json().catch(() => null);
    throw new OrderApiError(
      errData?.error || `Failed to fetch order details (HTTP ${response.status})`,
      response.status
    );
  }

  const json = await response.json().catch(() => null);
  if (!json || !json.success || !json.data) {
    throw new OrderApiError("Failed to parse order details response");
  }

  return json.data as CustomerOrder;
}

