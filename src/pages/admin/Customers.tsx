import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import {
  getAdminCustomersApi,
  getAdminCustomerDetailsApi,
  AdminCustomerApiError,
  type AdminCustomer,
  type AdminCustomerDetails,
} from "../../services/adminCustomerApi";

interface CustomersProps {
  onNavigate?: (path: string) => void;
}

function Customers({ onNavigate }: CustomersProps) {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Customer Details modal state
  const [selectedCustomer, setSelectedCustomer] =
    useState<AdminCustomerDetails | null>(null);
  const [loadingCustomerId, setLoadingCustomerId] = useState<string | null>(
    null
  );
  const [actionError, setActionError] = useState<string | null>(null);

  // Debounce search input by 300ms to avoid unnecessary API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch customers from backend database
  const loadCustomers = useCallback(async (searchQuery?: string) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await getAdminCustomersApi(searchQuery);
      setCustomers(data);
    } catch (err: unknown) {
      const isAuthError =
        err instanceof AdminCustomerApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again to view customers."
        : err instanceof Error
        ? err.message
        : "Failed to connect to the backend server. Please verify your connection.";
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Trigger fetch when debounced search value changes
  useEffect(() => {
    loadCustomers(debouncedSearch);
  }, [debouncedSearch, loadCustomers]);

  // Auto-dismiss action error notification
  useEffect(() => {
    if (actionError) {
      const timer = setTimeout(() => {
        setActionError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [actionError]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCustomer(null);
      }
    };
    if (selectedCustomer) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedCustomer]);

  // Fetch comprehensive customer details on demand when "View Details" is clicked
  const handleViewDetails = async (customerId: string) => {
    if (loadingCustomerId) return; // Prevent duplicate requests

    setLoadingCustomerId(customerId);
    setActionError(null);

    try {
      const details = await getAdminCustomerDetailsApi(customerId);
      setSelectedCustomer(details);
    } catch (err: unknown) {
      const isAuthError =
        err instanceof AdminCustomerApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : err instanceof Error
        ? err.message
        : "Failed to fetch customer details. Please try again.";
      setActionError(msg);
    } finally {
      setLoadingCustomerId(null);
    }
  };

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
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
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
        <span>{isOnline ? "Online" : "COD"}</span>
      </span>
    );
  };

  const columns = [
    {
      key: "fullName",
      header: "Name",
      render: (value: string, row: AdminCustomer) => (
        <div>
          <span className="font-semibold text-[#06452E] block">{value}</span>
          {row.gender && (
            <span className="text-[11px] text-[#7A8C80] capitalize">
              {row.gender}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value: string) => (
        <a
          href={`mailto:${value}`}
          className="text-[#06452E] hover:underline text-sm font-medium"
        >
          {value}
        </a>
      ),
    },
    {
      key: "mobileNumber",
      header: "Phone",
      render: (value?: string | null) =>
        value ? (
          <a
            href={`tel:${value}`}
            className="text-[#5A6C60] hover:text-[#06452E] text-sm"
          >
            {value}
          </a>
        ) : (
          <span className="text-gray-400 text-xs italic">Not provided</span>
        ),
    },
    {
      key: "address",
      header: "Address",
      render: (value?: string | null) => (
        <span
          className="text-[#5A6C60] text-xs line-clamp-2 max-w-xs block"
          title={value || "No address provided"}
        >
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </span>
      ),
    },
    {
      key: "totalOrders",
      header: "Orders",
      render: (value: number) => (
        <span className="font-semibold text-[#1E293B] px-2.5 py-1 rounded-full text-xs bg-[#F8F9F7] border border-[#E8F0E5] inline-block text-center min-w-8">
          {value ?? 0}
        </span>
      ),
    },
    {
      key: "totalSpent",
      header: "Total Spent",
      render: (value: number) => (
        <span className="font-bold text-[#06452E]">
          ₹
          {Number(value || 0).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Join Date",
      render: (value: string) => {
        if (!value) return "—";
        return (
          <span className="text-xs text-[#7A8C80]">
            {new Date(value).toLocaleDateString("en-IN", {
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
      render: (_: unknown, row: AdminCustomer) => {
        const isFetching = loadingCustomerId === row.id;
        return (
          <button
            type="button"
            disabled={Boolean(loadingCustomerId)}
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row.id);
            }}
            className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] disabled:opacity-60 disabled:cursor-wait rounded-lg transition-colors"
            title={`View details for ${row.fullName}`}
          >
            {isFetching ? (
              <div className="w-3.5 h-3.5 border-2 border-[#06452E] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span>{isFetching ? "Loading..." : "View"}</span>
          </button>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Customers"
        subtitle="Manage customer information and order statistics"
      />

      {/* Action error notification banner */}
      {actionError && (
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
            <span>{actionError}</span>
          </div>
          <button
            type="button"
            onClick={() => setActionError(null)}
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
            Loading customers from database...
          </p>
          <p className="text-xs text-[#7A8C80] mt-1">Please wait a moment</p>
        </div>
      )}

      {/* API Fetch Error state with Retry button */}
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
            Failed to load customers
          </h3>
          <p className="text-sm text-[#7A8C80] mb-5 max-w-md mx-auto">
            {fetchError}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loadCustomers(debouncedSearch)}
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

      {/* Main Customers Table Card */}
      {!isLoading && !fetchError && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E5]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Search Customers
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold px-1.5 py-0.5 rounded cursor-pointer"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 sm:self-end">
              <button
                type="button"
                onClick={() => loadCustomers(debouncedSearch)}
                className="text-xs font-semibold text-[#06452E] hover:underline cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F9F7] hover:bg-[#E8F0E5] rounded-xl border border-[#E8F0E5] transition-colors"
                title="Refresh customer list"
              >
                <svg
                  className="w-3.5 h-3.5"
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
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#7A8C80] mb-4">
            <span>
              Showing{" "}
              <strong className="text-[#06452E]">{customers.length}</strong>{" "}
              {customers.length === 1 ? "customer" : "customers"}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </span>
          </div>

          {customers.length === 0 ? (
            debouncedSearch ? (
              <div className="py-12 text-center">
                <div className="w-12 h-12 mx-auto mb-2 text-gray-400 bg-gray-50 rounded-full flex items-center justify-center">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-[#06452E] mb-1">
                  No customers found matching &quot;{debouncedSearch}&quot;
                </p>
                <p className="text-xs text-[#7A8C80] mb-4">
                  Check for typos or try searching by email or phone number.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="px-4 py-2 bg-[#E8F5E9] text-[#06452E] text-xs font-semibold rounded-xl hover:bg-[#D4E7D0] transition-colors cursor-pointer"
                >
                  Clear Search
                </button>
              </div>
            ) : (
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-[#06452E] mb-1">
                  No registered customers yet
                </h4>
                <p className="text-xs text-[#7A8C80] max-w-sm mx-auto">
                  Registered customer accounts and their purchase statistics will
                  appear here automatically.
                </p>
              </div>
            )
          ) : (
            <AdminTable
              columns={columns}
              data={customers}
              onRowClick={(row: AdminCustomer) => handleViewDetails(row.id)}
            />
          )}
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[780px] max-h-[85vh] flex flex-col shadow-2xl border border-[#E8F0E5] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="shrink-0 bg-white border-b border-[#E8F0E5] px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#06452E] flex items-center justify-center font-bold text-sm shrink-0">
                  {selectedCustomer.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#06452E]">
                    {selectedCustomer.fullName}
                  </h3>
                  <p className="text-xs text-[#7A8C80]">
                    Registered on{" "}
                    {new Date(selectedCustomer.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors cursor-pointer text-sm font-bold shrink-0"
                title="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Internally Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Profile Overview (2 Columns on Desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Contact Information */}
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
                    <span>Contact Information</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-[#5A6C60]">
                      <span className="text-gray-400 font-medium">Email: </span>
                      <a
                        href={`mailto:${selectedCustomer.email}`}
                        className="text-[#06452E] hover:underline font-medium"
                      >
                        {selectedCustomer.email}
                      </a>
                    </p>
                    <p className="text-[#5A6C60]">
                      <span className="text-gray-400 font-medium">Phone: </span>
                      {selectedCustomer.mobileNumber ? (
                        <a
                          href={`tel:${selectedCustomer.mobileNumber}`}
                          className="text-[#06452E] hover:underline"
                        >
                          {selectedCustomer.mobileNumber}
                        </a>
                      ) : (
                        <span className="text-gray-400 italic">Not provided</span>
                      )}
                    </p>
                    <p className="text-[#5A6C60]">
                      <span className="text-gray-400 font-medium">Gender: </span>
                      <span className="capitalize">
                        {selectedCustomer.gender || "Not specified"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Account & Purchase Stats */}
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span>Order Statistics</span>
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center text-[#5A6C60]">
                      <span>Total Orders:</span>
                      <span className="font-semibold text-[#1E293B] px-2 py-0.5 rounded-full bg-white border border-[#E8F0E5]">
                        {selectedCustomer.totalOrders}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[#5A6C60]">
                      <span>Total Spent:</span>
                      <span className="font-bold text-[#06452E]">
                        ₹
                        {Number(selectedCustomer.totalSpent || 0).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }
                        )}
                      </span>
                    </div>
                    {selectedCustomer.address && (
                      <p className="text-[#5A6C60] pt-1 text-[11px] truncate">
                        <span className="text-gray-400 font-medium">
                          Primary:{" "}
                        </span>
                        {selectedCustomer.address}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Saved Addresses Section */}
              <div>
                <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>
                    Saved Addresses ({selectedCustomer.addresses?.length || 0})
                  </span>
                </h4>
                {selectedCustomer.addresses &&
                selectedCustomer.addresses.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedCustomer.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-3 rounded-xl border text-xs transition-colors ${
                          addr.isDefault
                            ? "bg-[#E8F5E9]/30 border-[#A5D6A7]"
                            : "bg-[#F8F9F7] border-[#E8F0E5]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-[#1E293B]">
                            {addr.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {addr.isDefault && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-[#E8F5E9] text-[#1A7D4E] border border-[#C8E6C9]">
                                Default
                              </span>
                            )}
                            {addr.addressType && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-gray-200 text-gray-700">
                                {addr.addressType}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-[#5A6C60]">
                          {addr.addressLine1}
                          {addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                        </p>
                        {addr.landmark && (
                          <p className="text-[#7A8C80] text-[11px]">
                            Landmark: {addr.landmark}
                          </p>
                        )}
                        <p className="text-[#1E293B] font-medium mt-0.5">
                          {addr.city}, {addr.state} -{" "}
                          <span className="font-semibold">{addr.pincode}</span>
                        </p>
                        <p className="text-[#7A8C80] text-[11px] mt-0.5">
                          Phone: {addr.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#F8F9F7] rounded-xl border border-[#E8F0E5] text-center text-xs text-[#7A8C80]">
                    No saved delivery addresses found for this customer.
                  </div>
                )}
              </div>

              {/* Order History Section */}
              <div>
                <h4 className="text-xs font-bold text-[#06452E] uppercase tracking-wider mb-2.5">
                  Order History ({selectedCustomer.orders?.length || 0})
                </h4>
                {selectedCustomer.orders &&
                selectedCustomer.orders.length > 0 ? (
                  <div className="border border-[#E8F0E5] rounded-xl divide-y divide-[#E8F0E5] overflow-hidden max-h-64 overflow-y-auto">
                    {selectedCustomer.orders.map((order) => (
                      <div
                        key={order.id}
                        className="p-3 hover:bg-[#FAFBF9] transition-colors space-y-2 text-xs"
                      >
                        {/* Order Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#06452E]">
                              #{order.orderNumber}
                            </span>
                            <span className="text-[#7A8C80] text-[11px]">
                              {new Date(
                                order.orderDate || order.createdAt || ""
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <div>{getPaymentMethodBadge(order.paymentMethod)}</div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize border ${getOrderStatusBadgeClass(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${getPaymentStatusColor(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-[#F8F9F7] rounded-lg p-2 divide-y divide-gray-200">
                          {order.items && order.items.length > 0 ? (
                            order.items.map((item, idx) => (
                              <div
                                key={`${item.productId}-${idx}`}
                                className="py-1 first:pt-0 last:pb-0 flex items-center justify-between gap-2"
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="text-gray-400 font-mono text-[11px]">
                                    {item.quantity}×
                                  </span>
                                  <span className="font-medium text-[#1E293B] truncate">
                                    {item.productName}
                                  </span>
                                  {item.variant && (
                                    <span className="text-[10px] bg-gray-200 text-gray-700 px-1 py-0.2 rounded">
                                      {item.variant}
                                    </span>
                                  )}
                                  {item.potType && (
                                    <span className="text-[10px] bg-gray-200 text-gray-700 px-1 py-0.2 rounded">
                                      {item.potType}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right shrink-0 font-semibold text-[#06452E]">
                                  ₹{item.totalPrice.toLocaleString("en-IN")}
                                </div>
                              </div>
                            ))
                          ) : order.products && order.products.length > 0 ? (
                            order.products.map((prod, idx) => (
                              <div
                                key={`${prod.productId}-${idx}`}
                                className="py-1 first:pt-0 last:pb-0 flex items-center justify-between gap-2"
                              >
                                <span className="text-[#1E293B]">
                                  {prod.quantity}× {prod.productName}
                                </span>
                                <span className="font-semibold text-[#06452E]">
                                  ₹
                                  {(prod.price * prod.quantity).toLocaleString(
                                    "en-IN"
                                  )}
                                </span>
                              </div>
                            ))
                          ) : (
                            <span className="text-[#7A8C80] text-[11px]">
                              Order items recorded without breakdown
                            </span>
                          )}
                        </div>

                        {/* Order Total */}
                        <div className="flex justify-between items-center pt-1 text-xs">
                          <span className="text-[#7A8C80]">
                            {order.itemCount
                              ? `${order.itemCount} items`
                              : "Order Total"}
                          </span>
                          <span className="font-bold text-[#06452E]">
                            Total: ₹
                            {Number(order.totalAmount || 0).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#F8F9F7] rounded-xl border border-[#E8F0E5] text-center text-xs text-[#7A8C80]">
                    This customer has not placed any orders yet.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="shrink-0 bg-[#F8F9F7] border-t border-[#E8F0E5] px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between">
              <span className="text-xs text-[#7A8C80]">
                Press{" "}
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">
                  Esc
                </kbd>{" "}
                to close
              </span>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
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

export default Customers;
