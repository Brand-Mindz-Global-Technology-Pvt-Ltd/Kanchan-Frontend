import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import catImg1 from "../../assets/categories/img-1.png";
import catImg2 from "../../assets/categories/img-2.png";
import catImg3 from "../../assets/categories/img-3.png";
import catImg4 from "../../assets/categories/img-4.png";
import catImg5 from "../../assets/categories/img-5.png";
import catImg6 from "../../assets/categories/img-6.png";
import {
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  uploadCategoryImageApi,
  CategoryApiError,
  API_BASE_URL,
  type Category,
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "../../services/categoryApi";

interface CategoriesProps {
  onNavigate?: (path: string) => void;
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  "img-1.png": catImg1,
  "img-2.png": catImg2,
  "img-3.png": catImg3,
  "img-4.png": catImg4,
  "img-5.png": catImg5,
  "img-6.png": catImg6,
};

/**
 * Resolves a category image from database value to a displayable URL.
 * Handles backend /uploads/ paths, bundled asset paths, external URLs (http/https), and data/blob URIs.
 */
export function resolveCategoryImage(imagePath?: string): string {
  if (!imagePath) return catImg1;

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:") ||
    imagePath.startsWith("blob:")
  ) {
    return imagePath;
  }

  // Handle uploaded images from backend: /uploads/... or uploads/...
  if (imagePath.startsWith("/uploads/") || imagePath.startsWith("uploads/")) {
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${API_BASE_URL}${cleanPath}`;
  }

  const cleanPath = imagePath.split("?")[0];
  const filename = cleanPath.split("/").pop()?.toLowerCase();
  if (filename && CATEGORY_IMAGE_MAP[filename]) {
    return CATEGORY_IMAGE_MAP[filename];
  }

  for (const [key, assetUrl] of Object.entries(CATEGORY_IMAGE_MAP)) {
    const baseKey = key.replace(".png", "");
    if (imagePath.toLowerCase().includes(baseKey)) {
      return assetUrl;
    }
  }

  return imagePath || catImg1;
}

function Categories({ onNavigate }: CategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    status: "Active" as "Active" | "Inactive",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; image?: string }>({});

  // Fetch categories from backend API
  const loadCategories = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const data = await getCategoriesApi();
      setCategories(data);
    } catch (err: unknown) {
      const isAuthError = err instanceof CategoryApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again to manage categories."
        : err instanceof Error
        ? err.message
        : "Failed to connect to the backend server. Please verify your connection.";
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen && !isSubmitting) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isSubmitting]);

  // Auto-dismiss success feedback message after 4 seconds
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => {
        setFeedbackMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  // Auto-dismiss error message after 6 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      description: "",
      image: "",
      status: "Active",
    });
    setSelectedFile(null);
    setImagePreview("");
    setErrors({});
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      image: category.image || "",
      status: category.status || "Active",
    });
    setSelectedFile(null);
    setImagePreview(resolveCategoryImage(category.image));
    setErrors({});
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (categoryId: string, categoryName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the category "${categoryName}"?`
    );
    if (!confirmed) return;

    setDeletingId(categoryId);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const result = await deleteCategoryApi(categoryId);
      setFeedbackMessage(
        result.message || `Category "${categoryName}" deleted successfully.`
      );
      // Refresh category list from backend after successful deletion
      await loadCategories();
    } catch (err: unknown) {
      const isAuthError = err instanceof CategoryApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : err instanceof Error
        ? err.message
        : `Failed to delete category "${categoryName}".`;
      setErrorMessage(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCloseModal = () => {
    if (isSubmitting) return; // Prevent closing while API operation is in flight
    setIsModalOpen(false);
    setEditingCategory(null);
    setSelectedFile(null);
    setImagePreview("");
    setModalError(null);
    setErrors({});
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image format - backend accepts PNG, JPEG/JPG, and WebP
    const validFormats = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!validFormats.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Please upload a valid image file (PNG, JPG/JPEG, WebP).",
      }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "File size exceeds the 5MB limit.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, image: undefined }));
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview("");
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    const newErrors: { name?: string; image?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is mandatory.";
    } else {
      // Client-side quick check for duplicate category names (case-insensitive)
      const isDuplicate = categories.some(
        (cat) =>
          cat.name.trim().toLowerCase() === formData.name.trim().toLowerCase() &&
          cat.id !== editingCategory?.id
      );
      if (isDuplicate) {
        newErrors.name = "A category with this name already exists.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setModalError(null);

    const fallbackImage = "/src/assets/categories/img-1.png";

    try {
      let finalImageUrl = formData.image;

      // 1. If a new image file was selected, upload raw binary to backend first
      if (selectedFile) {
        try {
          finalImageUrl = await uploadCategoryImageApi(selectedFile);
        } catch (uploadErr: unknown) {
          const uploadMsg =
            uploadErr instanceof Error
              ? uploadErr.message
              : "Failed to upload image to server";
          setModalError(`Image upload failed: ${uploadMsg}`);
          setIsSubmitting(false);
          return;
        }
      }

      if (editingCategory) {
        // Edit existing category via PUT /api/categories/:id
        const updatePayload: UpdateCategoryInput = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          status: formData.status,
        };
        // Preserve existing category image path if no new image was uploaded
        if (finalImageUrl?.trim()) {
          updatePayload.image = finalImageUrl.trim();
        } else if (editingCategory.image) {
          updatePayload.image = editingCategory.image;
        }

        const updated = await updateCategoryApi(editingCategory.id, updatePayload);
        setFeedbackMessage(`Category "${updated.name}" updated successfully!`);
        setErrorMessage(null);
        handleCloseModal();
        await loadCategories();
      } else {
        // Add new category via POST /api/categories
        const createPayload: CreateCategoryInput = {
          name: formData.name.trim(),
          description: formData.description.trim(),
          image: finalImageUrl?.trim() || fallbackImage,
          status: formData.status,
        };

        const created = await createCategoryApi(createPayload);
        setFeedbackMessage(`Category "${created.name}" added successfully!`);
        setErrorMessage(null);
        handleCloseModal();
        await loadCategories();
      }
    } catch (err: unknown) {
      const isAuthError = err instanceof CategoryApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : err instanceof Error
        ? err.message
        : "Failed to save category. Please try again.";
      setModalError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (_: string, row: Category) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E8F0E5] bg-[#F8F9F7] shrink-0">
            <img
              src={resolveCategoryImage(row.image)}
              alt={row.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback image if image path fails
                (e.currentTarget as HTMLImageElement).src = catImg1;
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-[#06452E]">{row.name}</p>
            <p className="text-xs text-[#7A8C80] sm:hidden line-clamp-1">
              {row.description}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (value: string) => (
        <span className="line-clamp-2 max-w-md">{value || "—"}</span>
      ),
    },
    {
      key: "productCount",
      header: "Products",
      render: (value: number) => (
        <span className="font-medium">{value ?? 0} items</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (_: any, row: Category) => {
        const isInactive = row.status === "Inactive";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              isInactive
                ? "bg-[#FFEBEE] text-[#C62828]"
                : "bg-[#E8F5E9] text-[#1A7D4E]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isInactive ? "bg-[#C62828]" : "bg-[#1A7D4E]"
              }`}
            />
            {row.status || "Active"}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: any, row: Category) => {
        const isBeingDeleted = deletingId === row.id;
        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isBeingDeleted}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(row);
              }}
              className="inline-flex cursor-pointer items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#06452E] bg-[#E8F5E9] hover:bg-[#D4E7D0] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              title={`Edit ${row.name}`}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              type="button"
              disabled={isBeingDeleted}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(row.id, row.name);
              }}
              className="inline-flex cursor-pointer items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#C62828] bg-[#FFEBEE] hover:bg-[#FFCDD2] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              title={`Delete ${row.name}`}
            >
              {isBeingDeleted ? (
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
              <span className="hidden sm:inline">
                {isBeingDeleted ? "Deleting..." : "Delete"}
              </span>
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Categories"
        subtitle="Manage product categories and collections"
        action={
          <button
            type="button"
            onClick={handleOpenAdd}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-[#06452E] text-white rounded-xl font-semibold hover:bg-[#043322] transition-colors shadow-sm text-sm"
          >
            <span className="text-base leading-none">+</span>
            <span>Add Category</span>
          </button>
        }
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
          <div className="flex items-center gap-3">
            {errorMessage.includes("admin session") && onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("/admin/login")}
                className="text-xs font-bold underline hover:text-[#B71C1C] cursor-pointer"
              >
                Go to Login
              </button>
            )}
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-[#C62828] hover:text-[#B71C1C] font-bold px-2 py-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E8F0E5] flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 border-4 border-[#06452E] border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm font-medium text-[#06452E]">Loading categories from database...</p>
          <p className="text-xs text-[#7A8C80] mt-1">Please wait a moment</p>
        </div>
      )}

      {/* API Fetch Error state with Retry button */}
      {!isLoading && fetchError && (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-red-200 text-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-[#06452E] mb-1">Failed to load categories</h3>
          <p className="text-sm text-[#7A8C80] mb-5 max-w-md mx-auto">{fetchError}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadCategories}
              className="px-5 py-2.5 bg-[#06452E] text-white rounded-xl text-sm font-semibold hover:bg-[#043322] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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

      {/* Categories table card */}
      {!isLoading && !fetchError && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E5]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Search Categories
              </label>
              <input
                type="text"
                placeholder="Search by category name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="text-xs text-[#7A8C80] self-end sm:self-auto">
              Showing <strong className="text-[#06452E]">{filteredCategories.length}</strong> of{" "}
              {categories.length} categories
            </div>
          </div>

          {categories.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-14 h-14 mx-auto mb-3 text-[#7A8C80] bg-[#F8F9F7] rounded-full flex items-center justify-center border border-[#E8F0E5]">
                <svg className="w-7 h-7 text-[#7A8C80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-[#06452E] mb-1">No categories found in database</h4>
              <p className="text-xs text-[#7A8C80] max-w-sm mx-auto mb-4">
                Get started by creating your first plant category collection.
              </p>
              <button
                type="button"
                onClick={handleOpenAdd}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#06452E] text-white rounded-xl font-semibold text-xs hover:bg-[#043322] transition-colors"
              >
                + Add First Category
              </button>
            </div>
          ) : (
            <AdminTable columns={columns} data={filteredCategories} />
          )}
        </div>
      )}

      {/* ADD / EDIT CATEGORY MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-category-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 backdrop-blur-xs overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isSubmitting) handleCloseModal();
          }}
        >
          <div className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E8F0E5] my-auto animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E8F0E5]">
              <div>
                <h3
                  id="modal-category-title"
                  className="text-lg sm:text-xl font-bold text-[#06452E]"
                >
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </h3>
                <p className="text-xs text-[#7A8C80] mt-0.5">
                  {editingCategory
                    ? "Update category details and status in database"
                    : "Create a new plant category for your database inventory"}
                </p>
              </div>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#7A8C80] hover:text-[#06452E] hover:bg-[#F8F9F7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer text-base"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Error Notice */}
            {modalError && (
              <div className="mb-4 p-3.5 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-xs font-medium flex items-start gap-2">
                <svg
                  className="w-4 h-4 shrink-0 mt-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="flex-1">
                  <span>{modalError}</span>
                  {modalError.includes("admin session") && onNavigate && (
                    <div className="mt-1">
                      <button
                        type="button"
                        onClick={() => onNavigate("/admin/login")}
                        className="underline font-bold hover:text-[#B71C1C] cursor-pointer"
                      >
                        Go to Admin Login
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Field 1: Category Name */}
              <div>
                <label className="block text-sm font-semibold text-[#06452E] mb-1.5">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, name: e.target.value }));
                    if (errors.name) {
                      setErrors((prev) => ({ ...prev, name: undefined }));
                    }
                  }}
                  className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm disabled:bg-gray-50 disabled:cursor-not-allowed ${
                    errors.name
                      ? "border-red-400 bg-red-50/20"
                      : "border-[#D4E0D4]"
                  }`}
                  placeholder="e.g. Tropical, Low Light, Bonsai..."
                  autoFocus
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                    <svg
                      className="w-3.5 h-3.5 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Field 2: Category Image */}
              <div>
                <label className="block text-sm font-semibold text-[#06452E] mb-1.5">
                  Category Image
                </label>
                <div className="relative">
                  <label className={`block ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>
                    <div
                      className={`h-32 sm:h-36 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 transition-all ${
                        imagePreview
                          ? "border-[#06452E] bg-[#F8F9F7]"
                          : errors.image
                          ? "border-red-300 bg-red-50/20"
                          : "border-[#D4E0D4] hover:border-[#06452E] bg-[#F8F9F7]"
                      }`}
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Category preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center p-3">
                          <svg
                            className="w-7 h-7 text-[#7A8C80] mx-auto mb-1.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-xs font-semibold text-[#06452E]">
                            Click to upload image
                          </p>
                          <p className="text-[11px] text-[#7A8C80] mt-0.5">
                            PNG, JPG, WebP (up to 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      disabled={isSubmitting}
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && !isSubmitting && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="cursor-pointer absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-xs"
                      title="Remove image"
                    >
                      ×
                    </button>
                  )}
                </div>
                {errors.image && (
                  <p className="text-xs text-red-600 mt-1.5 font-medium">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Field 3: Category Description */}
              <div>
                <label className="block text-sm font-semibold text-[#06452E] mb-1.5">
                  Category Description
                </label>
                <textarea
                  rows={3}
                  disabled={isSubmitting}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2.5 sm:py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all resize-none text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                  placeholder="Describe the nature of plants and care needs in this collection..."
                />
              </div>

              {/* Field 4: Category Status */}
              <div>
                <label className="block text-sm font-semibold text-[#06452E] mb-1.5">
                  Category Status
                </label>
                <select
                  disabled={isSubmitting}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as "Active" | "Inactive",
                    }))
                  }
                  className="w-full px-4 py-2.5 sm:py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white text-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Form Action Buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer flex-1 bg-[#06452E] text-white py-3 rounded-xl font-semibold hover:bg-[#043322] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm text-sm inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>
                    {isSubmitting
                      ? selectedFile
                        ? "Uploading & Saving..."
                        : "Saving..."
                      : editingCategory
                      ? "Save Changes"
                      : "Save Category"}
                  </span>
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCloseModal}
                  className="cursor-pointer px-6 py-3 border border-[#D4E0D4] rounded-xl font-semibold text-[#5A6C60] hover:bg-[#F8F9F7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Categories;
