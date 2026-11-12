import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import {
  getAdminEnquiriesApi,
  updateAdminEnquiryStatusApi,
  deleteAdminEnquiryApi,
  EnquiryApiError,
  type Enquiry,
  type EnquiryStatus,
} from "../../services/enquiryApi";

interface EnquiriesProps {
  onNavigate?: (path: string) => void;
}

function Enquiries({ onNavigate }: EnquiriesProps) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Notification banners
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Operation locks to prevent duplicate requests
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Debounce search input by 300ms to avoid unnecessary API requests
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Load enquiries from the backend database with supported status and search filters
  const loadEnquiries = useCallback(
    async (status?: string, search?: string) => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const data = await getAdminEnquiriesApi(status, search);
        setEnquiries(data);
      } catch (err: unknown) {
        const isAuthError =
          err instanceof EnquiryApiError && err.status === 401;
        const msg = isAuthError
          ? "Your admin session has expired. Please log in again to view enquiries."
          : err instanceof Error
          ? err.message
          : "Failed to connect to the backend server. Please verify your connection.";
        setFetchError(msg);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Trigger fetch when statusFilter or debouncedSearch changes
  useEffect(() => {
    loadEnquiries(statusFilter, debouncedSearch);
  }, [statusFilter, debouncedSearch, loadEnquiries]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  // Auto-dismiss feedback message after 3.5 seconds
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  // Auto-dismiss error message after 5 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleView = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  // Connect live status update API
  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    if (updatingId || deletingId) return;

    setUpdatingId(id);
    setErrorMessage(null);

    try {
      const updated = await updateAdminEnquiryStatusApi(id, newStatus);

      // Update local state only after backend confirms success
      setEnquiries((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );

      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(updated);
      }

      setFeedbackMessage(`Enquiry marked as "${newStatus}".`);
    } catch (err: unknown) {
      const msg =
        err instanceof EnquiryApiError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Failed to update enquiry status. Please try again.";
      setErrorMessage(msg);
    } finally {
      setUpdatingId(null);
    }
  };

  // Connect live delete API
  const handleDelete = async (id: string, customerName: string) => {
    if (deletingId || updatingId) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete the enquiry from "${customerName}"?`
    );
    if (!confirmed) return;

    setDeletingId(id);
    setErrorMessage(null);

    try {
      await deleteAdminEnquiryApi(id);

      // Remove from state only after backend confirms success
      setEnquiries((prev) => prev.filter((item) => item.id !== id));

      if (selectedEnquiry && selectedEnquiry.id === id) {
        handleCloseModal();
      }

      setFeedbackMessage(`Enquiry from "${customerName}" deleted.`);
    } catch (err: unknown) {
      const msg =
        err instanceof EnquiryApiError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Failed to delete enquiry. Please try again.";
      setErrorMessage(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case "New":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E3F2FD] text-[#1565C0] border border-[#BBDEFB]">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#1565C0]" />
            New
          </span>
        );
      case "Read":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF8E1] text-[#B78103] border border-[#FFE082]">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#B78103]" />
            Read
          </span>
        );
      case "Replied":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F5E9] text-[#1A7D4E] border border-[#C8E6C9]">
            <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-[#1A7D4E]" />
            Replied
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            {status}
          </span>
        );
    }
  };

  const columns = [
    {
      key: "customerName",
      header: "Customer",
      render: (_: string, row: Enquiry) => (
        <div>
          <p className="font-semibold text-[#06452E]">{row.customerName}</p>
          <p className="text-xs text-[#7A8C80] sm:hidden">{row.email}</p>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value: string) => (
        <a
          href={`mailto:${value}`}
          className="text-sm text-[#06452E] hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {value}
        </a>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) => (
        <a
          href={`tel:${value}`}
          className="text-sm text-[#5A6C60] hover:text-[#06452E] whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          {value}
        </a>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (value: string) => (
        <span className="line-clamp-1 max-w-xs text-sm font-medium text-[#18382B]">
          {value}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (value: string) => (
        <span className="text-xs text-[#7A8C80] whitespace-nowrap">{value}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (_: unknown, row: Enquiry) => getStatusBadge(row.status),
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: unknown, row: Enquiry) => {
        const isUpdating = updatingId === row.id;
        const isDeleting = deletingId === row.id;

        return (
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            {/* View Button */}
            <button
              type="button"
              disabled={isUpdating || isDeleting}
              onClick={(e) => {
                e.stopPropagation();
                handleView(row);
              }}
              className="cursor-pointer inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] disabled:opacity-50 rounded-lg transition-colors"
              title="View complete message"
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>View</span>
            </button>

            {/* Quick Status Toggle */}
            {row.status === "New" && (
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateStatus(row.id, "Read");
                }}
                className="cursor-pointer inline-flex items-center px-2 py-1.5 text-xs font-medium text-[#B78103] bg-[#FFF8E1] hover:bg-[#FFECB3] disabled:opacity-50 rounded-lg transition-colors"
                title="Mark as Read"
              >
                {isUpdating ? (
                  <div className="w-3 h-3 border-2 border-[#B78103] border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Mark Read"
                )}
              </button>
            )}

            {row.status !== "Replied" && (
              <button
                type="button"
                disabled={isUpdating || isDeleting}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateStatus(row.id, "Replied");
                }}
                className="cursor-pointer inline-flex items-center px-2 py-1.5 text-xs font-medium text-[#1A7D4E] bg-[#E8F5E9] hover:bg-[#D4E7D0] disabled:opacity-50 rounded-lg transition-colors"
                title="Mark as Replied"
              >
                {isUpdating ? (
                  <div className="w-3 h-3 border-2 border-[#1A7D4E] border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Mark Replied"
                )}
              </button>
            )}

            {/* Delete Button */}
            <button
              type="button"
              disabled={isDeleting || isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id, row.customerName);
              }}
              className="cursor-pointer inline-flex items-center p-1.5 text-xs font-semibold text-[#C62828] bg-[#FFEBEE] hover:bg-[#FFCDD2] disabled:opacity-50 rounded-lg transition-colors"
              title={`Delete enquiry from ${row.customerName}`}
            >
              {isDeleting ? (
                <div className="w-3.5 h-3.5 border-2 border-[#C62828] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                </svg>
              )}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Enquiries"
        subtitle="Manage customer questions, plant doctor queries, and corporate requests"
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
            Loading enquiries from database...
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
            Failed to load enquiries
          </h3>
          <p className="text-sm text-[#7A8C80] mb-5 max-w-md mx-auto">
            {fetchError}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loadEnquiries(statusFilter, debouncedSearch)}
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

      {/* Main Table Card */}
      {!isLoading && !fetchError && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E5]">
          {/* Search & Filter Header Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:items-end justify-between">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Search Enquiries
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by customer, email, phone, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
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

            <div className="flex flex-wrap items-center gap-3">
              <div className="w-40 sm:w-44">
                <label className="block text-sm font-semibold text-[#06452E] mb-2">
                  Status Filter
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2.5 sm:py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white text-sm cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => loadEnquiries(statusFilter, debouncedSearch)}
                className="text-xs font-semibold text-[#06452E] hover:underline cursor-pointer inline-flex items-center gap-1.5 px-3 py-2.5 sm:py-3 bg-[#F8F9F7] hover:bg-[#E8F0E5] rounded-xl border border-[#E8F0E5] transition-colors self-end mb-0.5"
                title="Refresh enquiries"
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
              Showing <strong className="text-[#06452E]">{enquiries.length}</strong>{" "}
              {enquiries.length === 1 ? "enquiry" : "enquiries"}
              {debouncedSearch && ` matching "${debouncedSearch}"`}
            </span>
          </div>

          {/* Table / Empty State */}
          {enquiries.length > 0 ? (
            <AdminTable
              columns={columns}
              data={enquiries}
              onRowClick={handleView}
            />
          ) : (
            <div className="py-12 px-4 text-center border-2 border-dashed border-[#E8F0E5] rounded-xl">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                <span className="text-xl">💬</span>
              </div>
              <h4 className="font-bold text-[#18382B] text-base mb-1">
                No enquiries found
              </h4>
              <p className="text-xs text-[#7A8C80] max-w-sm mx-auto">
                {debouncedSearch || statusFilter !== "all"
                  ? "No customer enquiries match your search filter criteria. Try resetting filters."
                  : "No customer enquiries are currently registered."}
              </p>
              {(debouncedSearch || statusFilter !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] rounded-lg transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW ENQUIRY DETAILS MODAL */}
      {isModalOpen && selectedEnquiry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-enquiry-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="relative w-full max-w-2xl bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E8F0E5] my-auto animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 mb-5 border-b border-[#E8F0E5]">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3
                    id="modal-enquiry-title"
                    className="text-lg sm:text-xl font-bold text-[#06452E]"
                  >
                    Enquiry Details
                  </h3>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <p className="text-xs text-[#7A8C80] mt-1">
                  Received on {selectedEnquiry.date} • ID: {selectedEnquiry.id}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#7A8C80] hover:text-[#06452E] hover:bg-[#F8F9F7] transition-colors cursor-pointer text-base"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Customer Information & Message */}
            <div className="space-y-4">
              {/* Customer Contact Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 bg-[#F8F9F7] border border-[#E8F0E5] rounded-xl p-4">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#7A8C80]">
                    Customer
                  </span>
                  <span className="text-sm font-semibold text-[#06452E]">
                    {selectedEnquiry.customerName}
                  </span>
                  {(selectedEnquiry.city || selectedEnquiry.state) && (
                    <span className="block text-xs text-[#7A8C80]">
                      {[selectedEnquiry.city, selectedEnquiry.state]
                        .filter(Boolean)
                        .join(", ")}
                    </span>
                  )}
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#7A8C80]">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-sm font-medium text-[#06452E] hover:underline break-all"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#7A8C80]">
                    Phone
                  </span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="text-sm font-medium text-[#06452E] hover:underline"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8C80] mb-1">
                  Subject
                </label>
                <div className="p-3 bg-white border border-[#D4E0D4] rounded-xl text-sm font-semibold text-[#18382B]">
                  {selectedEnquiry.subject}
                </div>
              </div>

              {/* Complete Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#7A8C80] mb-1">
                  Message Content
                </label>
                <div className="p-4 bg-[#F8F9F7] border border-[#D4E0D4] rounded-xl text-sm text-[#243328] leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E8F0E5]">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedEnquiry.status !== "Replied" && (
                    <button
                      type="button"
                      disabled={Boolean(updatingId || deletingId)}
                      onClick={() =>
                        handleUpdateStatus(selectedEnquiry.id, "Replied")
                      }
                      className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#06452E] text-white rounded-xl text-xs font-semibold hover:bg-[#043322] disabled:opacity-50 transition-colors shadow-sm"
                    >
                      {updatingId === selectedEnquiry.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                      <span>Mark as Replied</span>
                    </button>
                  )}

                  {selectedEnquiry.status === "New" && (
                    <button
                      type="button"
                      disabled={Boolean(updatingId || deletingId)}
                      onClick={() =>
                        handleUpdateStatus(selectedEnquiry.id, "Read")
                      }
                      className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#FFF8E1] text-[#9A6B00] border border-[#FFE082] rounded-xl text-xs font-semibold hover:bg-[#FFECB3] disabled:opacity-50 transition-colors"
                    >
                      {updatingId === selectedEnquiry.id ? (
                        <div className="w-3.5 h-3.5 border-2 border-[#9A6B00] border-t-transparent rounded-full animate-spin" />
                      ) : null}
                      <span>Mark as Read</span>
                    </button>
                  )}

                  <a
                    href={`mailto:${
                      selectedEnquiry.email
                    }?subject=Re: ${encodeURIComponent(selectedEnquiry.subject)}`}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 border border-[#06452E] text-[#06452E] rounded-xl text-xs font-semibold hover:bg-[#E8F5E9] transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Reply via Email</span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={Boolean(deletingId || updatingId)}
                    onClick={() =>
                      handleDelete(
                        selectedEnquiry.id,
                        selectedEnquiry.customerName
                      )
                    }
                    className="cursor-pointer px-4 py-2.5 bg-[#FFEBEE] text-[#C62828] hover:bg-[#FFCDD2] disabled:opacity-50 rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                  >
                    {deletingId === selectedEnquiry.id && (
                      <div className="w-3 h-3 border-2 border-[#C62828] border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>Delete</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="cursor-pointer px-4 py-2.5 border border-[#D4E0D4] text-[#5A6C60] hover:bg-[#F8F9F7] rounded-xl text-xs font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Enquiries;
