import { useState, useEffect, useCallback } from "react";
import { useShop } from "../context/ShopContext";
import type { CustomerProfileData } from "../types/customer";
import {
  getCustomerToken,
  fetchCustomerProfileApi,
  updateCustomerProfileApi,
  logoutCustomerApi,
  clearCustomerSession,
  type SafeCustomer,
} from "../services/customerAuth";
import ProfileBackgroundDecor from "../components/profile/ProfileBackgroundDecor";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileLeftCard from "../components/profile/ProfileLeftCard";
import PersonalDetailsCard from "../components/profile/PersonalDetailsCard";
import ProfileStatCard from "../components/profile/ProfileStatCard";
import SecurityCard from "../components/profile/SecurityCard";
import topLeafImg from "../assets/profile/top-leaf.png";

export default function Profile() {
  const { orders } = useShop();

  const [customer, setCustomer] = useState<SafeCustomer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    const token = getCustomerToken();
    if (!token) {
      setCustomer(null);
      setIsLoading(false);
      setErrorMessage("Please sign in to view your profile details.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchCustomerProfileApi();
      setCustomer(data);
      setIsLoading(false);
    } catch (err: unknown) {
      setCustomer(null);
      setIsLoading(false);
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to load customer profile details";
      setErrorMessage(msg);
    }
  }, []);

  useEffect(() => {
    loadProfile();

    const handleAuthChange = () => {
      loadProfile();
    };

    window.addEventListener("kanchan:auth-change", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("kanchan:auth-change", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [loadProfile]);

  const handleUpdateProfile = async (updated: Partial<CustomerProfileData>) => {
    if (!customer) return;

    const apiPayload: Partial<SafeCustomer> = {};
    if (updated.fullName) apiPayload.fullName = updated.fullName;
    if (updated.email) apiPayload.email = updated.email;
    if (updated.phone) apiPayload.mobileNumber = updated.phone;
    if (updated.gender) apiPayload.gender = updated.gender;

    try {
      const updatedCustomer = await updateCustomerProfileApi(apiPayload);
      setCustomer(updatedCustomer);
    } catch (err: unknown) {
      console.error("Failed to update profile:", err);
      // Optimistic local fallback if offline
      setCustomer((prev) =>
        prev
          ? {
              ...prev,
              fullName: updated.fullName ?? prev.fullName,
              email: updated.email ?? prev.email,
              mobileNumber: updated.phone ?? prev.mobileNumber,
              gender: updated.gender ?? prev.gender,
            }
          : null
      );
    }
  };

  const handleNavigate = (path: string) => {
    if (typeof window === "undefined") return;
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await logoutCustomerApi();
    } catch (err) {
      console.warn("Logout error:", err);
    }
    clearCustomerSession();
    setCustomer(null);
    setTimeout(() => {
      handleNavigate("/login");
    }, 300);
  };

  // Construct view-model from real database customer data
  const profile: CustomerProfileData | null = customer
    ? {
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.mobileNumber || "Not Provided",
        gender: customer.gender || "Not Specified",
        enthusiastTitle: "Green Enthusiast",
        membershipBadge: "Green Guardian Member",
        quote: "Let's grow a greener tomorrow",
        ordersCount: orders.length,
        wishlistCount: 0,
        addressesCount: customer.address ? 1 : 0,
      }
    : null;

  return (
    <div
      style={{ backgroundColor: "#FAF4E8" }}
      className="relative isolate w-full min-h-[calc(100vh-70px)] overflow-x-hidden px-3.5 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 text-[#163B1C]"
    >
      {/* Import Serif and Sans fonts + Dedicated Palette Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        @media (min-width: 1024px) {
          .profile-right-column {
            transform: translateX(-100px);
          }
        }
        @media (max-width: 1023px) {
          .profile-right-column {
            transform: none;
          }
        }

        /* Profile Card Palette matching Figma */
        .profile-card-surface {
          background-color: #FAF4E8 !important;
          background-image: linear-gradient(180deg, #FDF8EE 0%, #FAF3E7 100%) !important;
          border: 1px solid #E8DCBE !important;
          border-radius: 24px !important;
          box-shadow: 0 10px 28px -4px rgba(180, 160, 120, 0.16), 0 4px 10px -2px rgba(40, 70, 25, 0.05) !important;
        }
        .profile-heading-green {
          color: #163B1C !important;
        }
        .profile-subtext-green {
          color: #526A56 !important;
        }
        .profile-btn-green {
          background: linear-gradient(135deg, #E2EEB8 0%, #CDE39B 100%) !important;
          border: 1px solid #B8D882 !important;
          color: #173B1B !important;
          box-shadow: 0 2px 8px rgba(180, 214, 130, 0.28) !important;
        }
        .profile-icon-badge {
          background: radial-gradient(circle, #E6F0C0 0%, #D6E6A7 100%) !important;
          border: 1px solid rgba(190, 215, 140, 0.4) !important;
          color: #1B381A !important;
          box-shadow: 0 2px 6px rgba(160, 190, 110, 0.18) !important;
        }
        .profile-arrow-btn {
          background-color: #3E6B24 !important;
          color: #ffffff !important;
          box-shadow: 0 2px 6px rgba(62, 107, 36, 0.35) !important;
        }

        /* Top-Left Corner Leaf Decoration */
        .profile-top-leaf-container {
          position: absolute;
          top: -16px;
          left: -20px;
          z-index: 0;
          pointer-events: none;
          user-select: none;
        }
        .profile-top-leaf-img {
          width: 260px;
          max-width: none;
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          filter: drop-shadow(0 8px 16px rgba(20, 61, 34, 0.08));
        }
        @media (min-width: 640px) {
          .profile-top-leaf-container {
            top: -24px;
            left: -32px;
          }
          .profile-top-leaf-img {
            width: 360px;
          }
        }
        @media (min-width: 1024px) {
          .profile-top-leaf-container {
            top: -30px;
            left: -40px;
          }
          .profile-top-leaf-img {
            width: 480px;
          }
        }
        @media (min-width: 1280px) {
          .profile-top-leaf-container {
            top: -36px;
            left: -48px;
          }
          .profile-top-leaf-img {
            width: 520px;
          }
        }
      `}</style>

      {/* Ambient Botanical Tone */}
      <ProfileBackgroundDecor />

      {/* Top-Left Corner Leaf Accent (extends from corner, behind cards) */}
      <div aria-hidden="true" className="profile-top-leaf-container">
        <img
          src={topLeafImg}
          alt=""
          className="profile-top-leaf-img"
          loading="eager"
        />
      </div>

      {/* Main Centered Content Container */}
      <div className="relative z-10 mx-auto max-w-[1240px] xl:max-w-[1280px]">
        {isLoading ? (
          /* Loading State: Botanical Spinner matching palette */
          <div className="flex min-h-[460px] w-full flex-col items-center justify-center rounded-[24px] border border-[#E8DCBE] bg-[#FDF8EE]/90 p-8 text-center shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E2EEB8] text-[#163B1C] shadow-inner">
              <svg
                className="h-7 w-7 animate-spin text-[#163B1C]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif-heading text-[20px] sm:text-[22px] font-bold text-[#163B1C]">
              Loading Botanical Profile...
            </h3>
            <p className="mt-1 text-[13px] text-[#526A56]">
              Retrieving your customer details from Kanchan Garden.
            </p>
          </div>
        ) : errorMessage || !customer || !profile ? (
          /* Error State: Clear feedback with Sign In or Retry */
          <div className="flex min-h-[460px] w-full flex-col items-center justify-center rounded-[24px] border border-[#E8DCBE] bg-[#FDF8EE] p-8 text-center shadow-xs">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFEAE5] text-[#C62828] shadow-inner">
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif-heading text-[22px] font-bold text-[#163B1C]">
              {errorMessage?.includes("sign in")
                ? "Sign In Required"
                : "Unable to Load Profile"}
            </h3>
            <p className="mt-1.5 max-w-[420px] text-[13.5px] leading-relaxed text-[#526A56]">
              {errorMessage ||
                "Unable to retrieve your customer account details. Please sign in or try again."}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => handleNavigate("/login")}
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#163B1C] px-5 text-[13px] font-semibold text-white shadow-xs transition hover:bg-[#0E2813] cursor-pointer"
              >
                Sign In to Account
              </button>
              <button
                type="button"
                onClick={() => loadProfile()}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[#B8D882] bg-[#E2EEB8] px-5 text-[13px] font-semibold text-[#163B1C] shadow-xs transition hover:bg-[#D5E5A5] cursor-pointer"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          /* Responsive Grid: Left Profile Card + Right Cards Section */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4.5 sm:gap-5 lg:gap-6 items-start">
            {/* LEFT: Arched Dark Green Profile Card */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-start">
              <ProfileLeftCard
                fullName={profile.fullName}
                enthusiastTitle={profile.enthusiastTitle}
                membershipBadge={profile.membershipBadge}
                quote={profile.quote}
              />
            </div>

            {/* RIGHT: Header + Stacked Details, Stats, and Security Cards */}
            <div className="profile-right-column lg:col-span-8 xl:col-span-8 flex flex-col gap-2.5 sm:gap-3">
              {/* Welcome Header */}
              <ProfileHeader fullName={profile.fullName} />

              {/* 1. Personal Details Card */}
              <PersonalDetailsCard
                key={customer.id || customer.email}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
              />

              {/* 2. Three Statistic Cards (Orders, Wishlist, Addresses) */}
              <ProfileStatCard
                ordersCount={orders.length || profile.ordersCount}
                wishlistCount={profile.wishlistCount}
                addressesCount={profile.addressesCount}
                onNavigate={handleNavigate}
              />

              {/* 3. Security Section with Logout Button */}
              <SecurityCard onLogout={handleLogout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
