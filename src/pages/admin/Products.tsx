import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminTable from "../../components/admin/AdminTable";
import {
  getProductsApi,
  deleteProductApi,
  resolveProductImage,
  ApiError,
  type BackendProduct,
} from "../../services/productApi";
import { getCategoriesApi, type Category } from "../../services/categoryApi";
import type { Product } from "../../types/admin";

interface ProductsProps {
  onNavigate: (path: string) => void;
  products?: Product[];
  onProductsChange?: (products: Product[]) => void;
}

function Products({ onNavigate }: ProductsProps) {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch live products and categories from backend database
  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        getProductsApi(),
        getCategoriesApi().catch(() => []),
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (err: unknown) {
      const isAuthError = err instanceof ApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again to view products."
        : err instanceof Error
        ? err.message
        : "Failed to connect to the backend server. Please verify your connection.";
      setFetchError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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

  const handleDelete = async (productId: string, productName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the product "${productName}"?`
    );
    if (!confirmed) return;

    setDeletingId(productId);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const result = await deleteProductApi(productId);
      setFeedbackMessage(
        result.message || `Product "${productName}" deleted successfully.`
      );
      // Refresh product listing from the database
      await loadProducts();
    } catch (err: unknown) {
      const isAuthError = err instanceof ApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : err instanceof Error
        ? err.message
        : `Failed to delete product "${productName}".`;
      setErrorMessage(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.subtitle && product.subtitle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      filterCategory === "all" ||
      product.category.toLowerCase() === filterCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categoryOptions = [
    "all",
    ...Array.from(
      new Set([
        ...categories.map((c) => c.name),
        ...products.map((p) => p.category),
      ].filter(Boolean))
    ),
  ];

  const columns = [
    {
      key: "name",
      header: "Product",
      render: (_: string, row: BackendProduct) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#E8F0E5] bg-[#F8F9F7] shrink-0">
            <img
              src={resolveProductImage(row.image)}
              alt={row.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/src/assets/products/img-1.png";
              }}
            />
          </div>
          <div>
            <p className="font-semibold text-[#06452E]">{row.name}</p>
            <p className="text-xs text-[#7A8C80] line-clamp-1">
              {row.subtitle || row.category}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (value: string) => (
        <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-[#F8F9F7] text-[#5A6C60] border border-[#E8F0E5]">
          {value}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (_: any, row: BackendProduct) => (
        <div className="text-sm font-semibold text-[#06452E]">
          {row.price?.startsWith("₹") ? row.price : `₹${row.price}`}
          {row.originalPrice && row.originalPrice !== row.price && (
            <span className="text-xs text-[#7A8C80] line-through ml-1.5 font-normal">
              {row.originalPrice.startsWith("₹")
                ? row.originalPrice
                : `₹${row.originalPrice}`}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (value: number) => (
        <span className="font-medium text-sm text-[#5A6C60]">{value ?? 0} units</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (_: any, row: BackendProduct) => {
        const stock = Number(row.stock) || 0;
        return (
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${
              stock > 20
                ? "bg-[#E8F5E9] text-[#1A7D4E]"
                : stock > 0
                ? "bg-[#FFF8E1] text-[#F57C00]"
                : "bg-[#FFEBEE] text-[#C62828]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                stock > 20
                  ? "bg-[#1A7D4E]"
                  : stock > 0
                  ? "bg-[#F57C00]"
                  : "bg-[#C62828]"
              }`}
            />
            {stock > 20 ? "In Stock" : stock > 0 ? "Low Stock" : "Out of Stock"}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (_: any, row: BackendProduct) => {
        const isBeingDeleted = deletingId === row.id;
        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isBeingDeleted}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(`/admin/products/edit/${row.id}`);
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
        title="Products"
        subtitle="Manage your product inventory"
        action={
          <button
            type="button"
            onClick={() => onNavigate("/admin/products/add")}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-[#06452E] text-white rounded-xl font-semibold hover:bg-[#043322] transition-colors shadow-sm text-sm"
          >
            <span className="text-base leading-none">+</span>
            <span>Add Product</span>
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
          <p className="text-sm font-medium text-[#06452E]">Loading products from database...</p>
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
          <h3 className="text-base font-semibold text-[#06452E] mb-1">Failed to load products</h3>
          <p className="text-sm text-[#7A8C80] mb-5 max-w-md mx-auto">{fetchError}</p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadProducts}
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

      {/* Products table card */}
      {!isLoading && !fetchError && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8F0E5]">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by product name or subtitle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div className="sm:w-56">
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Filter Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white text-sm"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#7A8C80] mb-4">
            <span>
              Showing <strong className="text-[#06452E]">{filteredProducts.length}</strong> of{" "}
              {products.length} products
            </span>
          </div>

          {products.length === 0 ? (
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-[#06452E] mb-1">
                No products found in database
              </h4>
              <p className="text-xs text-[#7A8C80] max-w-sm mx-auto mb-4">
                Get started by adding your first plant product to your inventory.
              </p>
              <button
                type="button"
                onClick={() => onNavigate("/admin/products/add")}
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#06452E] text-white rounded-xl font-semibold text-xs hover:bg-[#043322] transition-colors"
              >
                + Add First Product
              </button>
            </div>
          ) : (
            <AdminTable
              columns={columns}
              data={filteredProducts}
              onRowClick={(row) => onNavigate(`/admin/products/edit/${row.id}`)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Products;
