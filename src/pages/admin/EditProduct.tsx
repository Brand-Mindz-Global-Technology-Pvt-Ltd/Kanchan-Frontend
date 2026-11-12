import { useState, useEffect, useCallback } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import {
  getProductByIdApi,
  updateProductApi,
  uploadProductImageApi,
  resolveProductImage,
  ApiError,
  type UpdateProductInput,
} from "../../services/productApi";
import { getCategoriesApi, type Category } from "../../services/categoryApi";
import type { Product } from "../../types/admin";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface EditProductProps {
  onNavigate: (path: string) => void;
  onUpdate?: (product: Product) => void;
  productId: string;
  products?: Product[];
}

function normalizeLightRequirement(val?: string): string {
  if (!val) return "Indirect Light";
  const clean = val.toLowerCase().trim();
  if (clean.includes("low")) return "Low Light";
  if (clean.includes("bright") || clean.includes("sun")) return "Bright Light";
  if (clean.includes("indirect")) return "Indirect Light";
  return "Indirect Light";
}

function EditProduct({ onNavigate, onUpdate, productId }: EditProductProps) {
  // Support direct route parameter or fallback from current path (/admin/products/edit/:id)
  const effectiveProductId =
    productId ||
    (typeof window !== "undefined"
      ? window.location.pathname.split("/").pop() || ""
      : "");

  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [productError, setProductError] = useState<string | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    subtitle: "",
    originalPrice: "",
    price: "",
    priceNumeric: 0,
    category: "",
    light: "Indirect Light",
    stock: 0,
    description: "",
  });

  // 4 image slots:
  // - existingImages: persistent URLs loaded from database
  // - newImageFiles: newly selected File objects to upload
  // - previewUrls: display URLs for rendering in the slots
  const [existingImages, setExistingImages] = useState<string[]>(["", "", "", ""]);
  const [newImageFiles, setNewImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [previewUrls, setPreviewUrls] = useState<string[]>(["", "", "", ""]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch product details and categories from backend
  const loadProductData = useCallback(async () => {
    if (!effectiveProductId) {
      setProductError("No product ID specified in route.");
      setIsLoadingProduct(false);
      return;
    }

    setIsLoadingProduct(true);
    setProductError(null);

    try {
      const [productData, categoriesData] = await Promise.all([
        getProductByIdApi(effectiveProductId),
        getCategoriesApi({ status: "Active" }).catch((catErr) => {
          setCategoryError(
            catErr instanceof Error ? catErr.message : "Failed to load categories"
          );
          return [];
        }),
      ]);

      setCategories(categoriesData);

      // Populate form data from live database record
      setFormData({
        name: productData.name || "",
        subtitle: productData.subtitle || "",
        originalPrice: productData.originalPrice || "",
        price: productData.price || "",
        priceNumeric: productData.priceNumeric || 0,
        category: productData.category || "",
        light: normalizeLightRequirement(productData.light),
        stock: productData.stock ?? 0,
        description: productData.description || "",
      });

      // Populate image slots from product images
      const initialExisting = ["", "", "", ""];
      if (productData.images && productData.images.length > 0) {
        productData.images.slice(0, 4).forEach((img, idx) => {
          initialExisting[idx] = img;
        });
      } else if (productData.image) {
        initialExisting[0] = productData.image;
      }

      setExistingImages(initialExisting);
      setPreviewUrls(
        initialExisting.map((url) => (url ? resolveProductImage(url) : ""))
      );
      setNewImageFiles([null, null, null, null]);
    } catch (err: unknown) {
      const isAuthError = err instanceof ApiError && err.status === 401;
      const isNotFound = err instanceof ApiError && err.status === 404;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : isNotFound
          ? `Product with ID '${effectiveProductId}' was not found in the database.`
          : err instanceof Error
            ? err.message
            : "Failed to connect to the backend server.";
      setProductError(msg);
    } finally {
      setIsLoadingProduct(false);
    }
  }, [effectiveProductId]);

  useEffect(() => {
    loadProductData();
  }, [loadProductData]);

  // Auto-dismiss error banner after 6 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
      setErrorMessage("Please select a valid image file (PNG, JPG/JPEG, or WebP).");
      return;
    }

    // Validate size (5 MB)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Image file size exceeds the 5MB limit.");
      return;
    }

    setErrorMessage(null);

    // Create temporary preview URL for UI display
    const objectUrl = URL.createObjectURL(file);

    setNewImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    setPreviewUrls((prev) => {
      const updated = [...prev];
      updated[index] = objectUrl;
      return updated;
    });
  };

  const handleRemoveImage = (index: number) => {
    setNewImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setExistingImages((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });

    setPreviewUrls((prev) => {
      const updated = [...prev];
      updated[index] = "";
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage("Product name is required.");
      return;
    }
    if (!formData.subtitle.trim()) {
      setErrorMessage("Product subtitle is required.");
      return;
    }
    if (!formData.category.trim()) {
      setErrorMessage("Please select a product category.");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Product description is required.");
      return;
    }
    if (!formData.priceNumeric || formData.priceNumeric <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }
    if (formData.stock < 0) {
      setErrorMessage("Stock quantity cannot be negative.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload only newly selected files; preserve untouched existing image URLs
      const finalImages: string[] = [];
      for (let i = 0; i < 4; i++) {
        const file = newImageFiles[i];
        if (file) {
          const uploadedUrl = await uploadProductImageApi(file);
          finalImages.push(uploadedUrl);
        } else if (existingImages[i]) {
          finalImages.push(existingImages[i]);
        }
      }

      const fallbackImage = "/src/assets/products/img-1.png";
      const primaryImage = finalImages[0] || fallbackImage;
      const additionalImages = finalImages.length > 0 ? finalImages : undefined;

      // 2. Format prices
      const formattedPrice = formData.price || `₹${formData.priceNumeric}`;
      let formattedOriginalPrice = formData.originalPrice.trim();
      if (formattedOriginalPrice && !formattedOriginalPrice.startsWith("₹")) {
        formattedOriginalPrice = `₹${formattedOriginalPrice}`;
      }

      // 3. Construct update payload
      const payload: UpdateProductInput = {
        name: formData.name.trim(),
        subtitle: formData.subtitle.trim(),
        category: formData.category.trim(),
        light: formData.light,
        description: formData.description.trim(),
        price: formattedPrice,
        priceNumeric: formData.priceNumeric,
        originalPrice: formattedOriginalPrice || formattedPrice,
        stock: Number(formData.stock) || 0,
        image: primaryImage,
        images: additionalImages,
      };

      // 4. Update in database
      const updated = await updateProductApi(effectiveProductId, payload);

      if (onUpdate) {
        onUpdate(updated as unknown as Product);
      }

      // Navigate back to product list after successful persistence
      onNavigate("/admin/products");
    } catch (err: unknown) {
      const isAuthError = err instanceof ApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again."
        : err instanceof Error
          ? err.message
          : "Failed to update product. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoadingProduct) {
    return (
      <div className="bg-white rounded-2xl p-16 shadow-sm border border-[#E8F0E5] flex flex-col items-center justify-center text-center">
        <div className="w-10 h-10 border-4 border-[#06452E] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-[#06452E]">Loading product details from database...</p>
        <p className="text-xs text-[#7A8C80] mt-1">Please wait a moment</p>
      </div>
    );
  }

  // Error state
  if (productError) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-sm border border-red-200 text-center space-y-4">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#06452E]">Unable to load product</h3>
        <p className="text-sm text-[#7A8C80] max-w-md mx-auto">{productError}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={loadProductData}
            className="px-5 py-2.5 bg-[#06452E] text-white rounded-xl text-sm font-semibold hover:bg-[#043322] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Retry</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/admin/products")}
            className="px-5 py-2.5 border border-[#D4E0D4] text-[#06452E] rounded-xl text-sm font-semibold hover:bg-[#F8F9F7] transition-colors cursor-pointer"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Ensure current category is in options even if it was deactivated
  const hasCurrentCategory = categories.some((c) => c.name === formData.category);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit Product"
        subtitle={`Editing ${formData.name || "Product"}`}
      />

      {/* Error notification banner */}
      {errorMessage && (
        <div className="p-4 bg-[#FFEBEE] border border-[#FFCDD2] rounded-xl text-[#C62828] text-sm font-medium flex items-center justify-between shadow-2xs">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8F0E5]">
          <h3 className="text-lg font-bold text-[#06452E] mb-6 pb-4 border-b border-[#E8F0E5]">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Subtitle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                disabled={isSubmitting}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                placeholder="Enter product subtitle"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                required
                disabled={isSubmitting}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
              >
                {!hasCurrentCategory && formData.category && (
                  <option value={formData.category}>{formData.category}</option>
                )}
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categoryError && (
                <p className="text-xs text-red-600 mt-1.5">{categoryError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Light Requirement
              </label>
              <select
                disabled={isSubmitting}
                value={normalizeLightRequirement(formData.light)}
                onChange={(e) => setFormData({ ...formData, light: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
              >
                <option value="Low Light">Low Light</option>
                <option value="Indirect Light">Indirect Light</option>
                <option value="Bright Light">Bright Light</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-semibold text-[#06452E] mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              disabled={isSubmitting}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
              placeholder="Enter product description"
            />
          </div>
        </div>

        {/* Pricing and Inventory Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8F0E5]">
          <h3 className="text-lg font-bold text-[#06452E] mb-6 pb-4 border-b border-[#E8F0E5]">
            Pricing and Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Original Price (₹)
              </label>
              <input
                type="text"
                disabled={isSubmitting}
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                placeholder="₹0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                disabled={isSubmitting}
                value={formData.priceNumeric || ""}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFormData({ ...formData, priceNumeric: value, price: `₹${value}` });
                }}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Stock Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="0"
                disabled={isSubmitting}
                value={formData.stock ?? 0}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Product Images Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E8F0E5]">
          <h3 className="text-lg font-bold text-[#06452E] mb-6 pb-4 border-b border-[#E8F0E5]">
            Product Images (Up to 4)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="relative">
                <label className={`block ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>
                  <div
                    className={`h-32 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${previewUrls[index]
                        ? "border-[#06452E] bg-[#F8F9F7]"
                        : "border-[#E8F0E5] hover:border-[#06452E] bg-[#F8F9F7]"
                      }`}
                  >
                    {previewUrls[index] ? (
                      <img
                        src={previewUrls[index]}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <svg
                          className="w-8 h-8 text-[#7A8C80] mx-auto mb-2"
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
                        <p className="text-xs text-[#7A8C80]">Image {index + 1}</p>
                        <p className="text-[10px] text-[#A0AFA0] mt-0.5">PNG, JPG, WebP</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    disabled={isSubmitting}
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                  />
                </label>
                {previewUrls[index] && !isSubmitting && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-xs cursor-pointer"
                    title="Remove image"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-[#7A8C80] mt-4">
            First image will be used as the primary product image. Max 5 MB per image (JPEG, PNG, WebP).
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#06452E] text-white py-3 rounded-xl font-semibold hover:bg-[#043322] disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-sm cursor-pointer inline-flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            <span>{isSubmitting ? "Updating Product..." : "Update Product"}</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => onNavigate("/admin/products")}
            className="px-8 py-3 border border-[#D4E0D4] rounded-xl font-semibold text-[#5A6C60] hover:bg-[#F8F9F7] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
