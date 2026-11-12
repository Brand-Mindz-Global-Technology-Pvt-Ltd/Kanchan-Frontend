import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import {
  getAdminOrdersApi,
  updateAdminOrderStatusApi,
  AdminOrderApiError,
  type AdminOrder,
  type AdminOrderStatus,
} from "../../services/adminOrderApi";
import { resolveProductImage } from "../../services/productApi";

interface OrdersProps {
  onNavigate?: (path: string) => void;
}

function Orders({ onNavigate }: OrdersProps) {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Feedback notifications
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Status updating state (locks duplicate clicks per order)
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // Details modal state
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Fetch live orders from backend database
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await getAdminOrdersApi();
      setOrders(data);
    } catch (err: unknown) {
      const isAuthError = err instanceof AdminOrderApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again to view orders."
        : err instanceof Error
        ? err.message
        : "Failed to connect to the backend server. Please verify your connection.";
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Auto-dismiss success notification
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  // Auto-dismiss error notification
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedOrder(null);
      }
    };
    if (selectedOrder) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedOrder]);

  // Handle live status update via backend PATCH API
  const handleStatusUpdate = async (
    orderId: string,
    newStatus: AdminOrderStatus,
    orderNumber: string
  ) => {
    const existing = orders.find((o) => o.id === orderId);
    if (!existing || existing.orderStatus === newStatus) return;

    if (existing.orderStatus === "cancelled") {
      setErrorMessage(
        `Order ${orderNumber} is already cancelled. Status cannot be modified.`
      );
      return;
    }

    setUpdatingOrderId(orderId);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const updatedOrder = await updateAdminOrderStatusApi(orderId, newStatus);

      // Update state only after backend confirms success
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? updatedOrder : o))
      );

      // Keep details modal synchronized if viewing this order
      setSelectedOrder((prev) =>
        prev && prev.id === orderId ? updatedOrder : prev
      );

      setFeedbackMessage(
        `Order ${orderNumber} status successfully updated to "${newStatus.toUpperCase()}".`
      );
    } catch (err: unknown) {
      const msg =
        err instanceof AdminOrderApiError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Failed to update order status. Please try again.";
      setErrorMessage(`Failed to update ${orderNumber}: ${msg}`);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Filter orders by search term and status
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      order.orderNumber.toLowerCase().includes(term) ||
      order.customerName.toLowerCase().includes(term) ||
      order.customerEmail.toLowerCase().includes(term) ||
      order.customerPhone.toLowerCase().includes(term);

    const matchesStatus =
      filterStatus === "all" ||
      order.orderStatus.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const getPaymentStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-[#E8F5E9] text-[#1A7D4E] border border-[#C8E6C9]";
      case "pending":
        return "bg-[#FFF8E1] text-[#F57C00] border border-[#FFE082]";
      case "failed":
        return "bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]";
      case "refunded":
        return "bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB]";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const getOrderStatusBadgeClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-[#E8F5E9] text-[#1A7D4E] border-[#C8E6C9]";
      case "shipped":
        return "bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD]";
      case "processing":
        return "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]";
      case "pending":
        return "bg-[#FFF8E1] text-[#F57C00] border-[#FFE082]";
      case "cancelled":
        return "bg-[#FFEBEE] text-[#C62828] border-[#FFCDD2]";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getPaymentMethodBadge = (method?: string) => {
    const isOnline = method?.toLowerCase() === "online";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
          isOnline
            ? "bg-purple-50 text-purple-700 border-purple-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isOnline ? "bg-purple-600" : "bg-blue-600"
          }`}
        />
        <span>{isOnline ? "Online (Prepaid)" : "Cash on Delivery"}</span>
      </span>
    );
  };

  const columns = [
    {
      key: "orderNumber",
      header: "Order ID",
      render: (value: string, row: AdminOrder) => (
        <div>
          <span className="font-semibold text-[#06452E] block">{value}</span>
          <span className="text-xs text-[#7A8C80] block sm:hidden">
            {new Date(row.orderDate || row.createdAt || "").toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </span>
        </div>
      ),
    },
    {
      key: "customerName",
      header: "Customer",
      render: (value: string, row: AdminOrder) => (
        <div>
          <span className="font-medium text-[#1E293B] block">{value}</span>
          <span className="text-xs text-[#7A8C80] block">
            {row.customerPhone || row.customerEmail}
          </span>
        </div>
      ),
    },
    {
      key: "totalAmount",
      header: "Total",
      render: (value: number) => (
        <span className="font-bold text-[#06452E]">
          ₹{Number(value || 0).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "paymentMethod",
      header: "Payment Method",
      render: (value?: string) => getPaymentMethodBadge(value),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (value: string) => (
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize inline-block ${getPaymentStatusColor(
            value
          )}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "orderStatus",
      header: "Order Status",
      render: (value: string, row: AdminOrder) => {
        const isUpdating = updatingOrderId === row.id;
        const isCancelled = row.orderStatus === "cancelled";

        return (
          <div
            className="relative inline-block"
            onClick={(e) => e.stopPropagation()}
          >
            <select
              value={value}
              disabled={isUpdating || isCancelled}
              onChange={(e) =>
                handleStatusUpdate(
                  row.id,
                  e.target.value as AdminOrderStatus,
                  row.orderNumber
                )
              }
              className={`px-3 py-1.5 border rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all cursor-pointer bg-white ${
                isUpdating
                  ? "opacity-60 cursor-wait border-gray-300 pr-7"
                  : isCancelled
                  ? "opacity-80 cursor-not-allowed bg-gray-50 border-gray-300 text-gray-500"
                  : "border-[#D4E0D4] hover:border-[#06452E] text-[#06452E]"
              }`}
              title={
                isCancelled
                  ? "Cancelled orders cannot be altered"
                  : "Change order status"
              }
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {isUpdating && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-3.5 h-3.5 border-2 border-[#06452E] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: "orderDate",
      header: "Date",
      render: (value: string, row: AdminOrder) => {
        const dateVal = value || row.createdAt;
        if (!dateVal) return "—";
        return (
          <span className="text-xs text-[#5A6C60]">
            {new Date(dateVal).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Details",
      render: (_: unknown, row: AdminOrder) => (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOrder(row);
          }}
          className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] rounded-lg transition-colors"
          title={`View details for ${row.orderNumber}`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Orders"
        subtitle="Manage customer orders from the live database"
      />

      {/* Success notification banner */}
      {feedbackMessage && (
        <div className="flex items-center justify-between p-4 bg-[#E8F5E9] border border-[#C8E6C9] rounded-xl text-[#1A7D4E] text-sm font-medium animate-fade-in shadow-2xs">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#1A7D4E] shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{feedbackMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-[#1A7D4E] hover:text-[#06452E] font-bold px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error notification banner */}
      {errorMessage && (
        <div className="flex items-center justify-between p-4 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-sm font-medium animate-fade-in shadow-2xs">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#C62828] shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-[#C62828] hover:text-[#B71C1C] font-bold px-2 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8F0E5] flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-[#06452E] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-semibold text-[#06452E]">
            Loading orders from database...
          </p>
          <p className="text-xs text-[#7A8C80] mt-1">Please wait a moment</p>
        </div>
      )}

      {/* Fetch error state with retry */}
      {!isLoading && fetchError && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 text-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#06452E] mb-1">
            Failed to load orders
          </h3>
          <p className="text-sm text-[#7A8C80] mb-5 max-w-md mx-auto">
            {fetchError}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadOrders}
              className="px-5 py-2.5 bg-[#06452E] text-white rounded-xl text-sm font-semibold hover:bg-[#043322] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Retry Loading</span>
            </button>
            {fetchError.includes("admin session") && onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("/admin/login")}
                className="px-5 py-2.5 border border-[#D4E0D4] text-[#06452E] rounded-xl text-sm font-semibold hover:bg-[#F8F9F7] transition-colors cursor-pointer"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      )}

      {/* Orders Table Card */}
      {!isLoading && !fetchError && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E5]">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by order number, customer name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="sm:w-56">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Filter by Order Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#7A8C80] mb-4">
            <span>
              Showing <strong className="text-[#06452E]">{filteredOrders.length}</strong> of{" "}
              {orders.length} orders
            </span>
            <button
              type="button"
              onClick={loadOrders}
              className="text-xs font-semibold text-[#06452E] hover:underline cursor-pointer inline-flex items-center gap-1"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto mb-3 text-[#7A8C80] bg-[#F8F9F7] rounded-full flex items-center justify-center border border-[#E8F0E5]">
                <svg
                  className="w-7 h-7 text-[#7A8C80]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-[#06452E] mb-1">
                No orders found in database
              </h4>
              <p className="text-xs text-[#7A8C80] max-w-sm mx-auto">
                Customer orders will appear here automatically as soon as purchases are placed.
              </p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#06452E] mb-1">
                No orders match your filter criteria
              </p>
              <p className="text-xs text-[#7A8C80] mb-3">
                Try clearing your search or choosing a different status filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <AdminTable
              columns={columns}
              data={filteredOrders}
              onRowClick={(row: AdminOrder) => setSelectedOrder(row)}
            />
          )}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[780px] max-h-[85vh] flex flex-col shadow-2xl border border-[#E8F0E5] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 bg-white border-b border-[#E8F0E5] px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h3 className="text-base sm:text-lg font-bold text-[#06452E]">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize border ${getOrderStatusBadgeClass(
                    selectedOrder.orderStatus
                  )}`}
                >
                  {selectedOrder.orderStatus}
                </span>
                <span className="text-xs text-[#7A8C80] hidden sm:inline">
                  •{" "}
                  {new Date(
                    selectedOrder.orderDate || selectedOrder.createdAt || ""
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold shrink-0"
                title="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Internally Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {/* Order Status & Quick Update Bar */}
              <div className="p-3 bg-[#E8F5E9]/50 rounded-xl border border-[#C8E6C9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#06452E]">Order Status:</span>
                  <span className="text-[#5A6C60]">
                    Placed on{" "}
                    {new Date(
                      selectedOrder.orderDate || selectedOrder.createdAt || ""
                    ).toLocaleDateString("en-IN", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <label className="text-xs font-medium text-[#06452E] sm:sr-only">
                    Change status:
                  </label>
                  <select
                    value={selectedOrder.orderStatus}
                    disabled={
                      updatingOrderId === selectedOrder.id ||
                      selectedOrder.orderStatus === "cancelled"
                    }
                    onChange={(e) =>
                      handleStatusUpdate(
                        selectedOrder.id,
                        e.target.value as AdminOrderStatus,
                        selectedOrder.orderNumber
                      )
                    }
                    className="w-full sm:w-auto px-3 py-1.5 border border-[#D4E0D4] rounded-lg text-xs font-semibold focus:ring-2 focus:ring-[#06452E] outline-none bg-white cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer & Delivery Address Grid (2 columns on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Customer Details */}
                <div className="bg-[#F8F9F7] rounded-xl p-3 sm:p-3.5 border border-[#E8F0E5]">
                  <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-[#06452E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Customer Details</span>
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-[#1E293B]">
                      {selectedOrder.customerName}
                    </p>
                    <p className="text-[#5A6C60] truncate">
                      <span className="text-gray-400 font-medium">Email: </span>
                      <a
                        href={`mailto:${selectedOrder.customerEmail}`}
                        className="text-[#06452E] hover:underline"
                      >
                        {selectedOrder.customerEmail || "—"}
                      </a>
                    </p>
                    <p className="text-[#5A6C60]">
                      <span className="text-gray-400 font-medium">Phone: </span>
                      <a
                        href={`tel:${selectedOrder.customerPhone}`}
                        className="text-[#06452E] hover:underline"
                      >
                        {selectedOrder.customerPhone || "—"}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-[#F8F9F7] rounded-xl p-3 sm:p-3.5 border border-[#E8F0E5]">
                  <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg
                      className="w-3.5 h-3.5 text-[#06452E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Delivery Address</span>
                  </h4>
                  <div className="text-xs text-[#5A6C60] space-y-0.5">
                    {selectedOrder.deliveryAddress ? (
                      <>
                        <div className="flex items-center gap-1.5 font-medium text-[#1E293B]">
                          <span>{selectedOrder.deliveryAddress.name}</span>
                          {selectedOrder.deliveryAddress.addressType && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-gray-200 text-gray-700">
                              {selectedOrder.deliveryAddress.addressType}
                            </span>
                          )}
                        </div>
                        <p className="text-[#5A6C60]">
                          {selectedOrder.deliveryAddress.addressLine1}
                          {selectedOrder.deliveryAddress.addressLine2
                            ? `, ${selectedOrder.deliveryAddress.addressLine2}`
                            : ""}
                        </p>
                        {selectedOrder.deliveryAddress.landmark && (
                          <p className="text-[#7A8C80] text-[11px]">
                            Landmark: {selectedOrder.deliveryAddress.landmark}
                          </p>
                        )}
                        <p className="text-[#1E293B]">
                          {selectedOrder.deliveryAddress.city},{" "}
                          {selectedOrder.deliveryAddress.state} -{" "}
                          <span className="font-semibold">
                            {selectedOrder.deliveryAddress.pincode}
                          </span>
                        </p>
                        <p className="text-[#7A8C80] text-[11px]">
                          Phone: {selectedOrder.deliveryAddress.phone}
                        </p>
                      </>
                    ) : (
                      <p className="text-[#1E293B]">
                        {selectedOrder.customerAddress || "Address not specified"}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Ordered Products */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider">
                    Ordered Products ({selectedOrder.items?.length || selectedOrder.products?.length || 0})
                  </h4>
                </div>
                <div className="border border-[#E8F0E5] rounded-xl divide-y divide-[#E8F0E5] overflow-hidden max-h-56 overflow-y-auto">
                  {selectedOrder.items && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div
                        key={`${item.productId}-${idx}`}
                        className="p-2.5 sm:p-3 flex items-center justify-between gap-3 hover:bg-[#FAFBF9] transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={resolveProductImage(item.image)}
                            alt={item.productName}
                            className="w-10 h-10 object-cover rounded-lg border border-[#E8F0E5] shrink-0 bg-white"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                "/placeholder-plant.png";
                            }}
                          />
                          <div className="min-w-0">
                            <h5 className="font-semibold text-xs text-[#06452E] truncate">
                              {item.productName}
                            </h5>
                            <div className="flex flex-wrap items-center gap-1 text-[11px] text-[#7A8C80] mt-0.5">
                              {item.variant && (
                                <span className="bg-gray-100 text-gray-700 px-1 py-0.2 rounded text-[10px]">
                                  {item.variant}
                                </span>
                              )}
                              {item.potType && (
                                <span className="bg-gray-100 text-gray-700 px-1 py-0.2 rounded text-[10px]">
                                  {item.potType}
                                </span>
                              )}
                              <span>Qty: {item.quantity}</span>
                              <span>× ₹{item.price}</span>
                              {item.originalPrice && item.originalPrice > item.price && (
                                <span className="line-through text-gray-400 text-[10px]">
                                  ₹{item.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#06452E]">
                            ₹{item.totalPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : selectedOrder.products && selectedOrder.products.length > 0 ? (
                    selectedOrder.products.map((prod, idx) => (
                      <div
                        key={`${prod.productId}-${idx}`}
                        className="p-2.5 sm:p-3 flex items-center justify-between gap-3"
                      >
                        <div>
                          <h5 className="font-semibold text-xs text-[#06452E]">
                            {prod.productName}
                          </h5>
                          <p className="text-[11px] text-[#7A8C80]">
                            Qty: {prod.quantity} × ₹{prod.price}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#06452E]">
                            ₹{(prod.price * prod.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-gray-500">
                      No item details recorded for this order.
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Payment Summary Grid (2 columns on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Payment Information */}
                <div className="bg-[#F8F9F7] rounded-xl p-3 sm:p-3.5 border border-[#E8F0E5]">
                  <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2">
                    Payment Information
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5A6C60]">Method:</span>
                      <div>{getPaymentMethodBadge(selectedOrder.paymentMethod)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5A6C60]">Status:</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-semibold capitalize ${getPaymentStatusColor(
                          selectedOrder.paymentStatus
                        )}`}
                      >
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-[#F8F9F7] rounded-xl p-3 sm:p-3.5 border border-[#E8F0E5]">
                  <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2">
                    Price Summary
                  </h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-[#5A6C60]">
                      <span>Subtotal:</span>
                      <span className="font-medium text-[#1E293B]">
                        ₹
                        {Number(
                          selectedOrder.subtotal ?? selectedOrder.totalAmount
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {selectedOrder.totalSavings !== undefined &&
                      selectedOrder.totalSavings > 0 && (
                        <div className="flex justify-between text-[#1A7D4E]">
                          <span>Savings:</span>
                          <span className="font-medium">
                            - ₹{selectedOrder.totalSavings.toLocaleString("en-IN")}
                          </span>
                        </div>
                      )}

                    <div className="flex justify-between text-[#5A6C60]">
                      <span>Delivery:</span>
                      <span className="font-medium text-[#1E293B]">
                        {selectedOrder.deliveryFee === 0 ? (
                          <span className="text-[#1A7D4E]">FREE</span>
                        ) : (
                          `₹${selectedOrder.deliveryFee ?? 0}`
                        )}
                      </span>
                    </div>

                    <div className="pt-1.5 border-t border-[#E8F0E5] flex justify-between text-xs sm:text-sm font-bold text-[#06452E]">
                      <span>Total Amount:</span>
                      <span>
                        ₹{Number(selectedOrder.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 bg-[#F8F9F7] border-t border-[#E8F0E5] px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between">
              <span className="text-xs text-[#7A8C80]">
                Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">Esc</kbd> to close
              </span>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-1.5 bg-[#06452E] text-white rounded-lg text-xs font-semibold hover:bg-[#043322] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
