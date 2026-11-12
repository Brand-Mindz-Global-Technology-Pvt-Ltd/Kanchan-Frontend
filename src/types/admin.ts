export interface Product {
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

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  status?: "Active" | "Inactive";
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  products: OrderProduct[];
  totalAmount: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
}

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalOrders: number;
  totalCustomers: number;
  revenue: number;
}

export type EnquiryStatus = "New" | "Read" | "Replied";

export interface Enquiry {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: EnquiryStatus;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
  createdAt?: string;
}

export interface AdminAuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: {
    token: string;
    admin: AdminUser;
  };
}
