import { useState, useEffect } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import {
  createProductApi,
  uploadProductImageApi,
  ApiError,
  type CreateProductInput,
} from "../../services/productApi";
import { getCategoriesApi, type Category } from "../../services/categoryApi";
import type { Product } from "../../types/admin";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

interface AddProductProps {
  onNavigate: (path: string) => void;
  onAdd?: (product: Product) => void;
}

function AddProduct({ onNavigate, onAdd }: AddProductProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
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

  // 4 image slots: store File objects for upload and preview URLs for UI
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(["", "", "", ""]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch categories dynamically on component mount
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryError(null);
      try {
        const data = await getCategoriesApi({ status: "Active" });
        if (!isMounted) return;
        setCategories(data);
        if (data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: prev.category || data[0].name,
          }));
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Failed to load categories";
        setCategoryError(msg);
      } finally {
        if (isMounted) setIsLoadingCategories(false);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

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

    // Create temporary local preview URL
    const previewUrl = URL.createObjectURL(file);

    setImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = file;
      return updated;
    });

    setImagePreviews((prev) => {
      const updated = [...prev];
      updated[index] = previewUrl;
      return updated;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImageFiles((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });

    setImagePreviews((prev) => {
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
      setErrorMessage("Please select a valid product category.");
      return;
    }
    if (!formData.description.trim()) {
      setErrorMessage("Product description is required.");
      return;
    }
    if (!formData.priceNumeric || formData.priceNumeric <= 0) {
      setErrorMessage("Selling price must be greater than 0.");
      return;
    }
    if (formData.stock < 0) {
      setErrorMessage("Stock quantity cannot be negative.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload selected images sequentially via uploadProductImageApi
      const uploadedUrls: string[] = [];
      for (let i = 0; i < 4; i++) {
        const file = imageFiles[i];
        if (file) {
          const url = await uploadProductImageApi(file);
          uploadedUrls.push(url);
        }
      }

      const fallbackImage = "/src/assets/products/img-1.png";
      const primaryImage = uploadedUrls[0] || fallbackImage;
      const additionalImages = uploadedUrls.length > 0 ? uploadedUrls : undefined;

      // 2. Format prices
      const formattedPrice = formData.price || `₹${formData.priceNumeric}`;
      let formattedOriginalPrice = formData.originalPrice.trim();
      if (formattedOriginalPrice && !formattedOriginalPrice.startsWith("₹")) {
        formattedOriginalPrice = `₹${formattedOriginalPrice}`;
      }

      // 3. Construct backend payload
      const payload: CreateProductInput = {
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
        badge: "New",
        badgeBg: "#06452E",
        rating: 4.5,
      };

      // 4. Call createProductApi (POST /api/products)
      const createdProduct = await createProductApi(payload);

      // Backwards compatibility with AdminPanel state if present
      if (onAdd) {
        onAdd(createdProduct as unknown as Product);
      }

      // Navigate back to product list upon successful database persistence
      onNavigate("/admin/products");
    } catch (err: unknown) {
      const isAuthError = err instanceof ApiError && err.status === 401;
      const msg = isAuthError
        ? "Your admin session has expired. Please log in again to add products."
        : err instanceof Error
        ? err.message
        : "Failed to add product. Please check your connection and try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New Product"
        subtitle="Add a new product to your inventory"
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
                disabled={isSubmitting || isLoadingCategories}
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-[#D4E0D4] rounded-xl focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed text-sm"
              >
                {isLoadingCategories && (
                  <option value="">Loading categories...</option>
                )}
                {!isLoadingCategories && categories.length === 0 && (
                  <option value="">No categories available</option>
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
                value={formData.light}
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
                placeholder="₹999"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#06452E] mb-2">
                Selling Price (₹) <span className="text-red-500">*</span>
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
                placeholder="899"
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
                value={formData.stock}
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
                    className={`h-32 rounded-xl border-2 border-dashed flex items-center justify-center transition-all ${
                      imagePreviews[index]
                        ? "border-[#06452E] bg-[#F8F9F7]"
                        : "border-[#E8F0E5] hover:border-[#06452E] bg-[#F8F9F7]"
                    }`}
                  >
                    {imagePreviews[index] ? (
                      <img
                        src={imagePreviews[index]}
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
                {imagePreviews[index] && !isSubmitting && (
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
            First uploaded image will be used as the primary product image. Max 5 MB per image (JPEG, PNG, WebP).
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
            <span>{isSubmitting ? "Adding Product..." : "Add Product"}</span>
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

export default AddProduct;
