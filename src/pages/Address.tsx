import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useShop } from "../context/ShopContext";
import {
  AddressStepIndicator,
  AddressCard,
  OrderSummaryItemCard,
  BotanicalShieldCard,
  SupportHelpCard,
  type SavedAddressItem,
  type SummaryOrderItem,
} from "../components/checkout/AddressComponents";
import BotanicalLeaf from "../components/about/BotanicalLeaf";
import AboutEdgeLeaves from "../components/about/AboutEdgeLeaves";
import { getCustomerToken } from "../services/customerAuth";
import {
  fetchAddressesApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
  toSavedAddressItem,
  type CustomerAddress,
} from "../services/addressApi";
import imgMonstera from "../assets/products/img-1.png";
import imgSnakePlant from "../assets/products/img-2.png";

// Sample summary items for preview when cart is empty
const orderSummaryItems: SummaryOrderItem[] = [
  {
    id: "item-monstera",
    name: "Monstera Deliciosa",
    subtitle: "Artisanal Terracotta • Large",
    badge: "Air Purifying",
    price: 899,
    originalPrice: 1199,
    quantity: 1,
    image: imgMonstera,
  },
  {
    id: "item-snake-plant",
    name: "Snake Plant Zeylanica",
    subtitle: "Glazed Ceramic • Medium",
    badge: "Low Light Star",
    price: 549,
    originalPrice: 649,
    quantity: 1,
    image: imgSnakePlant,
  },
];

export default function Address() {
  const {
    selectedAddressId,
    setSelectedAddressId,
    cartItems,
    subtotal,
  } = useShop();

  // Backend addresses state
  const [customerAddresses, setCustomerAddresses] = useState<CustomerAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  // Form State
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [postalPincode, setPostalPincode] = useState("");
  const [flatBuilding, setFlatBuilding] = useState("");
  const [streetColony, setStreetColony] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressTag, setAddressTag] = useState<"HOME" | "WORK">("HOME");
  const [isDefaultAddress, setIsDefaultAddress] = useState(true);

  // Form interaction state
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Load addresses from backend
  const loadAddresses = useCallback(async () => {
    const token = getCustomerToken();
    if (!token) {
      setIsGuest(true);
      setIsLoading(false);
      return;
    }
    setIsGuest(false);
    setIsLoading(true);
    setLoadError(null);
    try {
      const data = await fetchAddressesApi();
      setCustomerAddresses(data);
      if (data.length > 0) {
        // If current selectedAddressId isn't valid, select default or first
        const hasCurrent = data.some((a) => a.id === selectedAddressId);
        if (!hasCurrent) {
          const defaultAddr = data.find((a) => a.isDefault);
          setSelectedAddressId(defaultAddr ? defaultAddr.id : data[0].id);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load addresses";
      setLoadError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [selectedAddressId, setSelectedAddressId]);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  useScrollReveal([customerAddresses.length]);

  const deliveryCost = 0;
  const totalPayable = subtotal;

  const summaryItemsToRender: SummaryOrderItem[] =
    cartItems.length > 0
      ? cartItems.map((ci) => ({
          id: ci.id,
          name: ci.name,
          subtitle: ci.variant,
          badge: "Live Specimen",
          price: ci.price,
          originalPrice: ci.originalPrice,
          quantity: ci.quantity,
          image: ci.image,
        }))
      : orderSummaryItems;

  // Clear form
  const resetForm = () => {
    setEditingAddressId(null);
    setFullName("");
    setMobileNumber("");
    setPostalPincode("");
    setFlatBuilding("");
    setStreetColony("");
    setLandmark("");
    setAddressTag("HOME");
    setIsDefaultAddress(customerAddresses.length === 0);
    setActionError(null);
  };

  // Start edit address
  const handleStartEdit = (id: string) => {
    const addr = customerAddresses.find((a) => a.id === id);
    if (!addr) return;
    setEditingAddressId(addr.id);
    setFullName(addr.name);
    setMobileNumber(addr.phone.replace(/\D/g, "").slice(-10));
    setPostalPincode(addr.pincode);
    setFlatBuilding(addr.flatBuilding);
    setStreetColony(addr.streetColony);
    setLandmark(addr.landmark || "");
    setAddressTag(addr.tag);
    setIsDefaultAddress(addr.isDefault);
    setActionError(null);

    const formElement = document.getElementById("add-address-form-section");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  // Delete address
  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this delivery address?")) {
      return;
    }
    setActionError(null);
    try {
      await deleteAddressApi(id);
      const remaining = customerAddresses.filter((a) => a.id !== id);
      setCustomerAddresses(remaining);
      if (selectedAddressId === id) {
        const next = remaining.find((a) => a.isDefault) || remaining[0];
        if (next) {
          setSelectedAddressId(next.id);
        } else {
          setSelectedAddressId("");
        }
      }
      if (editingAddressId === id) {
        resetForm();
      }
      setFeedbackMessage("Address removed successfully.");
      setTimeout(() => setFeedbackMessage(null), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete address";
      setActionError(msg);
    }
  };

  // Handle Save Form (Add or Edit)
  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);

    const token = getCustomerToken();
    if (!token) {
      setActionError("Please sign in to save your delivery address.");
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setActionError("Please enter a valid 10-digit mobile number.");
      return;
    }

    const cleanPin = postalPincode.replace(/\D/g, "");
    if (cleanPin.length !== 6) {
      setActionError("Please enter a valid 6-digit postal pincode.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingAddressId) {
        // Edit mode
        const updated = await updateAddressApi(editingAddressId, {
          name: fullName.trim(),
          phone: cleanPhone,
          pincode: cleanPin,
          flatBuilding: flatBuilding.trim(),
          streetColony: streetColony.trim(),
          landmark: landmark.trim() || undefined,
          tag: addressTag,
          isDefault: isDefaultAddress,
        });

        setCustomerAddresses((prev) =>
          prev.map((a) => {
            if (a.id === updated.id) {
              return updated;
            }
            if (updated.isDefault) {
              return { ...a, isDefault: false };
            }
            return a;
          })
        );
        setFeedbackMessage("Address updated successfully in your account.");
        resetForm();
      } else {
        // Create mode
        const created = await createAddressApi({
          name: fullName.trim(),
          phone: cleanPhone,
          pincode: cleanPin,
          flatBuilding: flatBuilding.trim(),
          streetColony: streetColony.trim(),
          landmark: landmark.trim() || undefined,
          tag: addressTag,
          isDefault: isDefaultAddress,
        });

        setCustomerAddresses((prev) => {
          const list = created.isDefault
            ? prev.map((a) => ({ ...a, isDefault: false }))
            : [...prev];
          return [...list, created];
        });
        setSelectedAddressId(created.id);
        setFeedbackMessage("New delivery address saved successfully.");
        resetForm();
      }
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save address";
      setActionError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const savedAddressItems: SavedAddressItem[] = customerAddresses.map(toSavedAddressItem);

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#FCFAF4] text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Decorative Leaf Border Arrangement */}
      <AboutEdgeLeaves includeMiddleLeaves />

      {/* Decorative Subtle Botanical Leaf Background Accents matching screenshot */}
      <BotanicalLeaf
        className="w-20 opacity-40 sm:w-28"
        style={{ top: "4%", right: "3%", transform: "rotate(35deg)" }}
      />
      <BotanicalLeaf
        className="w-18 opacity-35 sm:w-24"
        style={{ top: "12%", left: "-20px", transform: "rotate(-25deg)" }}
      />
      <BotanicalLeaf
        className="w-22 opacity-35 sm:w-32"
        style={{ top: "35%", right: "-30px", transform: "rotate(15deg)" }}
      />
      <BotanicalLeaf
        className="w-20 opacity-30 sm:w-28"
        style={{ top: "48%", left: "-15px", transform: "rotate(-10deg)" }}
      />
      <BotanicalLeaf
        className="w-18 opacity-35 sm:w-26"
        style={{ bottom: "8%", left: "1%", transform: "rotate(40deg)" }}
      />
      <BotanicalLeaf
        className="w-20 opacity-30 sm:w-30"
        style={{ bottom: "5%", right: "2%", transform: "rotate(-30deg)" }}
      />

      <div className="relative z-10 mx-auto w-[92%] max-w-[1280px] py-6 pb-28 sm:py-8 sm:pb-32 md:pb-8 lg:py-10 lg:pb-10">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-[#718073] sm:text-[12.5px]">
            <li>
              <a href="/" className="transition hover:text-[#06452E]">
                Home
              </a>
            </li>
            <li className="text-[#A2B1A5]" aria-hidden="true">/</li>
            <li>
              <a href="/plants" className="transition hover:text-[#06452E]">
                Plants
              </a>
            </li>
            <li className="text-[#A2B1A5]" aria-hidden="true">/</li>
            <li className="text-[#718073]">Add To Bag</li>
            <li className="text-[#A2B1A5]" aria-hidden="true">/</li>
            <li>
              <a href="/cart" className="transition hover:text-[#06452E]">
                Cart Review
              </a>
            </li>
            <li className="text-[#A2B1A5]" aria-hidden="true">/</li>
            <li className="font-bold text-[#06452E]" aria-current="page">
              Address
            </li>
          </ol>
        </nav>

        {/* 3-STEP CHECKOUT PROGRESS INDICATOR */}
        <div className="mb-8 sm:mb-10 animate-fade-in">
          <AddressStepIndicator currentStep={2} />
        </div>

        {/* MAIN TWO-COLUMN CHECKOUT GRID */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Saved Addresses & New Address Form (7-8 cols) */}
          {/* ========================================================= */}
          <div className="space-y-6 sm:space-y-7 lg:col-span-7 xl:col-span-8 animate-fade-in-up">
            {/* Header Card: Select Delivery Address & Add Button */}
            <div
              className="flex flex-col gap-3 rounded-[22px] border border-[#E6EADF] bg-white p-3.5 shadow-[0_2px_14px_rgba(20,56,38,0.04)] sm:flex-row sm:items-center sm:justify-between sm:p-5"
              data-scroll-reveal="fade-up"
            >
              <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-serif-heading text-[17px] font-bold text-[#18382B] sm:text-[20px]">
                      Select Delivery Address
                    </h2>
                    <span className="rounded-full bg-[#EBF2E6] px-2 py-0.5 text-[11px] font-bold text-[#06452E]">
                      {isLoading ? "loading..." : `${savedAddressItems.length} saved`}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11.5px] text-[#5E7163]">
                    Specimens will be acclimatized and packed according to regional transit routes.
                  </p>
                </div>
              </div>

              {/* Add New Address Button */}
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  const formElement = document.getElementById("add-address-form-section");
                  formElement?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex self-start sm:self-auto shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-[#E8F5E9] px-4 py-2 text-[12px] font-semibold text-[#06452E] transition hover:bg-[#D8ECD7]"
              >
                <span>+</span>
                <span>Add New Address</span>
              </button>
            </div>

            {/* UN采AUTHENTICATED GUEST BANNER */}
            {isGuest && (
              <div className="rounded-[20px] border border-[#E0E6DA] bg-white p-6 shadow-sm text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <h3 className="mt-3 font-serif-heading text-[18px] font-bold text-[#18382B]">
                  Sign in to Access Saved Addresses
                </h3>
                <p className="mt-1 text-[13px] text-[#5E7163] max-w-md mx-auto">
                  Please log in to your Kanchan account to view, add, or edit your delivery addresses for seamless checkout.
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <a
                    href="/login?redirect=/address"
                    className="inline-flex items-center justify-center rounded-full bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#053825] transition"
                  >
                    Customer Sign In
                  </a>
                  <a
                    href="/signup?redirect=/address"
                    className="inline-flex items-center justify-center rounded-full border border-[#06452E] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#06452E] hover:bg-[#F2F7F2] transition"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            )}

            {/* ERROR BANNER */}
            {loadError && (
              <div className="flex items-center justify-between rounded-[16px] border border-[#F5C2C7] bg-[#FDF2F2] p-4 text-[13px] text-[#842029]">
                <span>{loadError}</span>
                <button
                  type="button"
                  onClick={loadAddresses}
                  className="rounded-full bg-[#842029] px-3.5 py-1 text-[11px] font-semibold text-white hover:bg-[#681820]"
                >
                  Retry
                </button>
              </div>
            )}

            {/* LOADING STATE */}
            {isLoading && !isGuest && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="animate-pulse rounded-[22px] border border-[#E6EADF] bg-white p-5 space-y-3"
                  >
                    <div className="h-4 w-20 rounded bg-[#EAF2E7]" />
                    <div className="h-5 w-3/4 rounded bg-[#EAF2E7]" />
                    <div className="h-3 w-1/2 rounded bg-[#EAF2E7]" />
                    <div className="h-10 w-full rounded bg-[#F4F7F2]" />
                    <div className="h-4 w-2/3 rounded bg-[#EAF2E7]" />
                  </div>
                ))}
              </div>
            )}

            {/* SAVED ADDRESSES GRID */}
            {!isLoading && !isGuest && (
              <>
                {savedAddressItems.length === 0 ? (
                  <div className="rounded-[22px] border border-dashed border-[#CCD8C4] bg-[#F9FBF8] p-8 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h3 className="mt-3 font-serif-heading text-[16px] font-bold text-[#18382B]">
                      No Delivery Addresses Saved Yet
                    </h3>
                    <p className="mt-1 text-[12.5px] text-[#5E7163]">
                      Add your primary botanical delivery address below to proceed with order packing.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5" data-scroll-reveal="fade-up">
                    {savedAddressItems.map((addr) => (
                      <AddressCard
                        key={addr.id}
                        address={addr}
                        isSelected={selectedAddressId === addr.id}
                        onSelect={(id) => setSelectedAddressId(id)}
                        onEdit={handleStartEdit}
                        onDelete={handleDeleteAddress}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* "Add New / Edit Delivery Address" Form Card */}
            <div
              id="add-address-form-section"
              data-scroll-reveal="fade-up"
              className="rounded-[22px] border border-[#E6EADF] bg-white p-5 shadow-[0_2px_16px_rgba(20,56,38,0.04)] sm:p-6"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EBF2E6] text-[#06452E]">
                    <span className="text-[14px] font-bold leading-none">
                      {editingAddressId ? "✎" : "+"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif-heading text-[17px] font-bold text-[#18382B] sm:text-[19px]">
                      {editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}
                    </h3>
                    {editingAddressId && (
                      <p className="text-[11px] text-[#2E6B3E] font-medium">
                        Updating existing saved address
                      </p>
                    )}
                  </div>
                </div>

                {editingAddressId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="cursor-pointer rounded-full border border-[#D4E0D2] bg-[#F7FAF4] px-3 py-1 text-[11.5px] font-semibold text-[#5E7163] hover:bg-[#EBF2E6] hover:text-[#18382B]"
                  >
                    ✕ Cancel Edit
                  </button>
                )}
              </div>

              {/* ACTION SUCCESS MESSAGE */}
              {feedbackMessage && (
                <div className="mb-4 rounded-[12px] bg-[#EDF7ED] p-3 text-[12px] font-semibold text-[#1B6E32] flex items-center gap-1.5">
                  <span>✓</span>
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* ACTION ERROR MESSAGE */}
              {actionError && (
                <div className="mb-4 rounded-[12px] bg-[#FDF2F2] p-3 text-[12px] font-semibold text-[#842029]">
                  ⚠ {actionError}
                </div>
              )}

              <form onSubmit={handleSaveForm} className="space-y-4">
                {/* Row 1: Full Name & 10-Digit Mobile */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      Full Name *
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#2E6B3E]">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter Your Full Name"
                        className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-9 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      10-Digit Mobile Number *
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[12px] font-bold text-[#2E6B3E]">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="98451 23456"
                        className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-11 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Postal Pincode & Flat/House/Villa/Building */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      Postal Pincode *
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#2E6B3E]">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        value={postalPincode}
                        onChange={(e) => setPostalPincode(e.target.value)}
                        placeholder="Enter Your Pin Code"
                        className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-9 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      Flat / House No. / Villa / Building *
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#2E6B3E]">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <input
                        type="text"
                        required
                        value={flatBuilding}
                        onChange={(e) => setFlatBuilding(e.target.value)}
                        placeholder="E.g., Flat 402, Green Meadows Enclave"
                        className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-9 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Street, Road, Colony or Sector * (Full width) */}
                <div>
                  <label className="block text-[11px] font-bold text-[#4D6354]">
                    Street, Road, Colony or Sector *
                  </label>
                  <div className="relative mt-1">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#2E6B3E]">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      required
                      value={streetColony}
                      onChange={(e) => setStreetColony(e.target.value)}
                      placeholder="E.g., 14th Main, HSR Layout Sector 2"
                      className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-9 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Row 4: Landmark & Address Tag */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      Landmark (Helps Plant Courier Rider)
                    </label>
                    <div className="relative mt-1">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#2E6B3E]">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="E.g., Near BDA Complex or Behind Nilgiris"
                        className="h-10 w-full rounded-[10px] border border-[#D4E7D0] bg-[#EAF5E9]/60 pl-9 pr-3 text-[12.5px] text-[#18382B] placeholder:text-[#7A9180] focus:border-[#06452E] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#4D6354]">
                      Address Tag *
                    </label>
                    <div className="mt-1 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setAddressTag("HOME")}
                        className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border text-[11.5px] font-semibold transition-all ${
                          addressTag === "HOME"
                            ? "border-[#06452E] bg-[#EAF5E9] text-[#06452E] shadow-2xs"
                            : "border-[#D4E7D0] bg-white text-[#5E7163] hover:border-[#B4D2AF]"
                        }`}
                      >
                        <span className="text-[13px]">&#127968;</span>
                        <span>Home (All Day)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setAddressTag("WORK")}
                        className={`flex h-10 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border text-[11.5px] font-semibold transition-all ${
                          addressTag === "WORK"
                            ? "border-[#06452E] bg-[#EAF5E9] text-[#06452E] shadow-2xs"
                            : "border-[#D4E7D0] bg-white text-[#5E7163] hover:border-[#B4D2AF]"
                        }`}
                      >
                        <span className="text-[13px]">&#128188;</span>
                        <span>Work (10 AM - 6 PM)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Default Checkbox & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F0F4EC] pt-4">
                  <label className="flex cursor-pointer items-center gap-2 text-[12px] font-medium text-[#4D6354]">
                    <input
                      type="checkbox"
                      checked={isDefaultAddress}
                      onChange={(e) => setIsDefaultAddress(e.target.checked)}
                      className="h-4 w-4 rounded border-[#CCD8C4] text-[#06452E] accent-[#06452E]"
                    />
                    <span>Set as default botanical delivery address</span>
                  </label>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer text-[12.5px] font-semibold text-[#718073] hover:text-[#18382B]"
                    >
                      {editingAddressId ? "Cancel Edit" : "Clear"}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-premium cursor-pointer rounded-[12px] bg-[#06452E] px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm active:scale-98 disabled:opacity-60"
                    >
                      {isSubmitting
                        ? "Saving..."
                        : editingAddressId
                        ? "Update Address"
                        : "Save Address"}
                    </button>
                  </div>
                </div>
              </form>

              {/* Back to Cart Review Link */}
              <div className="mt-4 pt-3 border-t border-[#F0F4EC]">
                <a
                  href="/cart"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#06452E] hover:underline"
                >
                  <span>&larr;</span>
                  <span>Return to Cart Review</span>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Order Summary & Trust Shields (4-5 cols)     */}
          {/* ========================================================= */}
          <div
            className="space-y-5 lg:col-span-5 lg:sticky lg:top-24 xl:col-span-4 animate-fade-in-up animation-delay-150"
            data-scroll-reveal="left"
          >
            {/* Order Summary Card */}
            <div
              id="address-order-summary"
              className="scroll-mt-24 rounded-[22px] border border-[#E6EADF] bg-white p-5 shadow-[0_4px_20px_rgba(20,56,38,0.06)] sm:p-6"
            >
              <h3 className="font-serif-heading text-[19px] font-bold text-[#18382B] sm:text-[21px]">
                Order Summary
              </h3>

              {/* Items List: Rendered from array with .map() using shared OrderSummaryItemCard */}
              <div className="mt-3 divide-y divide-[#F0F4EC] border-b border-[#F0F4EC] pb-3">
                {summaryItemsToRender.map((item) => (
                  <OrderSummaryItemCard key={item.id} item={item} />
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-3 space-y-2 text-[12.5px]">
                <div className="flex items-center justify-between text-[#5E7163]">
                  <span>Bag Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</span>
                  <span className="font-semibold text-[#18382B]">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#5E7163]">
                  <span className="flex items-center gap-1">
                    Plant Transit Insurance
                    <span className="cursor-help text-[#9EAAA0]" title="Full protection against transit shocks">ℹ</span>
                  </span>
                  <span className="font-semibold text-[#1B6E32]">FREE</span>
                </div>

                <div className="flex items-center justify-between text-[#5E7163]">
                  <span>Delivery Cost</span>
                  <span className="font-semibold text-[#1B6E32]">
                    {deliveryCost === 0 ? "FREE" : `₹${deliveryCost}`}
                  </span>
                </div>
              </div>

              {/* Divider & Total Payable */}
              <div className="mt-4 border-t border-[#F0F4EC] pt-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[14px] font-bold text-[#18382B]">
                    Total Payable
                  </span>
                  <span className="font-serif-heading text-[22px] font-bold text-[#06452E] sm:text-[24px]">
                    ₹{totalPayable.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-[#718073]">
                  Inclusive of all greenhouse taxes
                </p>
              </div>

              {/* Proceed to Secure Checkout Button */}
              <a
                href="/payment"
                className="btn-premium mt-4 hidden md:flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#06452E] px-6 text-[13px] font-bold uppercase tracking-wider text-white shadow-sm active:scale-98"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <span className="text-[16px]" aria-hidden="true">&rarr;</span>
              </a>
            </div>

            {/* Kanchan Botanical Shield Card */}
            <BotanicalShieldCard />

            {/* Support / Help Card */}
            <SupportHelpCard />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Checkout Bar (Mobile Only: md:hidden) */}
      {cartItems.length > 0 &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#FCFAF4] border-t border-[#DDE5D6] shadow-[0_-4px_25px_rgba(20,56,38,0.12)] px-3.5 sm:px-5 py-2.5"
            style={{
              paddingBottom: "max(0.625rem, env(safe-area-inset-bottom, 0.625rem))",
            }}
          >
            <div className="mx-auto flex max-w-lg items-center justify-between gap-2">
              {/* Left Side: TOTAL PAYABLE + Dynamic Amount (Sans-Serif) + View Details */}
              <div className="flex flex-col justify-center shrink-0 min-w-0 pr-1 font-sans">
                <span className="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#5E7163] leading-none">
                  TOTAL PAYABLE
                </span>
                <span className="mt-0.5 font-sans text-[17px] sm:text-[18.5px] font-bold tracking-tight text-[#06452E] leading-tight whitespace-nowrap">
                  ₹{totalPayable.toLocaleString("en-IN")}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("address-order-summary");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="mt-0.5 text-left font-sans text-[10px] sm:text-[10.5px] font-semibold text-[#06452E] underline underline-offset-2 transition hover:text-[#043824] cursor-pointer"
                >
                  View Details
                </button>
              </div>

              {/* Right Side: Primary Payment Action */}
              <a
                href="/payment"
                className="flex h-10.5 sm:h-11 shrink-0 items-center justify-center gap-1.5 rounded-[12px] bg-[#06452E] px-3.5 sm:px-5 text-[11px] sm:text-[12.5px] font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#043824] active:scale-95 whitespace-nowrap font-sans"
              >
                <span>PROCEED TO PAYMENT</span>
                <span className="text-[13px] sm:text-[14px]" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
