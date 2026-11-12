import { useState } from "react";
import type { CustomerProfileData } from "../../types/customer";

interface PersonalDetailsCardProps {
  profile: CustomerProfileData;
  onUpdateProfile: (updated: Partial<CustomerProfileData>) => void;
}

export default function PersonalDetailsCard({
  profile,
  onUpdateProfile,
}: PersonalDetailsCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    gender: profile.gender,
  });
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      gender: profile.gender,
    });
    setIsEditing(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF4E8",
        backgroundImage: "linear-gradient(180deg, #FDF8EE 0%, #FAF3E7 100%)",
        borderColor: "#E8DCBE",
        boxShadow: "0 10px 28px -4px rgba(180, 160, 120, 0.16), 0 4px 10px -2px rgba(40, 70, 25, 0.05)",
      }}
      className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border p-3.5 sm:px-5 sm:py-4"
    >
      {/* Header Row: Title & Edit Profile Button */}
      <div style={{ borderColor: "#ECE0CA" }} className="flex items-center justify-between pb-2.5 sm:pb-3 border-b">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Twin green leaves heading icon */}
          <svg
            style={{ color: "#183D1F" }}
            className="w-4.5 h-4.5 sm:w-5 sm:h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
          </svg>
          <h3 style={{ color: "#163B1C" }} className="font-serif-heading text-[16px] sm:text-[18px] font-bold">
            Personal Details
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          style={{
            background: "linear-gradient(135deg, #E2EEB8 0%, #CDE39B 100%)",
            borderColor: "#B8D882",
            color: "#173B1B",
            boxShadow: "0 2px 8px rgba(180, 214, 130, 0.28)",
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-semibold hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>{isEditing ? "Close" : "Edit Profile"}</span>
        </button>
      </div>

      {/* Success feedback alert */}
      {savedFeedback && (
        <div className="mt-2.5 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-1.5 animate-fade-in">
          <span>✓</span>
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Mode 1: Static Read-Only 4-Column Presentation */}
      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 pt-2.5 sm:pt-3">
          {/* 1. Full Name */}
          <div style={{ borderColor: "#EBE0CF" }} className="flex flex-col items-center text-center px-2 lg:border-r">
            <div style={{ backgroundColor: "#DFECCC", color: "#184328" }} className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center mb-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6v1H4v-1Z" />
              </svg>
            </div>
            <span style={{ color: "#647B68" }} className="text-[10px] sm:text-[10.5px] uppercase tracking-wider font-semibold">
              Full Name
            </span>
            <span style={{ color: "#153A1B" }} className="text-[13px] sm:text-[14px] font-bold mt-0.5 truncate max-w-full">
              {profile.fullName}
            </span>
          </div>

          {/* 2. Email Address */}
          <div style={{ borderColor: "#EBE0CF" }} className="flex flex-col items-center text-center px-2 lg:border-r">
            <div style={{ backgroundColor: "#DFECCC", color: "#184328" }} className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center mb-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <span style={{ color: "#647B68" }} className="text-[10px] sm:text-[10.5px] uppercase tracking-wider font-semibold">
              Email Address
            </span>
            <span style={{ color: "#153A1B" }} className="text-[13px] sm:text-[14px] font-bold mt-0.5 truncate max-w-full">
              {profile.email}
            </span>
          </div>

          {/* 3. Mobile Number */}
          <div style={{ borderColor: "#EBE0CF" }} className="flex flex-col items-center text-center px-2 lg:border-r">
            <div style={{ backgroundColor: "#DFECCC", color: "#184328" }} className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center mb-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
              </svg>
            </div>
            <span style={{ color: "#647B68" }} className="text-[10px] sm:text-[10.5px] uppercase tracking-wider font-semibold">
              Mobile Number
            </span>
            <span style={{ color: "#153A1B" }} className="text-[13px] sm:text-[14px] font-bold mt-0.5 truncate max-w-full">
              {profile.phone}
            </span>
          </div>

          {/* 4. Gender */}
          <div className="flex flex-col items-center text-center px-2">
            <div style={{ backgroundColor: "#DFECCC", color: "#184328" }} className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full flex items-center justify-center mb-1.5">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M12 13v8" />
                <path d="M9 18h6" />
              </svg>
            </div>
            <span style={{ color: "#647B68" }} className="text-[10px] sm:text-[10.5px] uppercase tracking-wider font-semibold">
              Gender
            </span>
            <span style={{ color: "#153A1B" }} className="text-[13px] sm:text-[14px] font-bold mt-0.5 truncate max-w-full">
              {profile.gender}
            </span>
          </div>
        </div>
      ) : (
        /* Mode 2: Functional Frontend Edit Form */
        <form onSubmit={handleSave} className="pt-3 space-y-3 animate-scale-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#153A1B] mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D5CABB] bg-white/90 text-[#153A1B] focus:outline-none focus:ring-1 focus:ring-[#6C9736]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#153A1B] mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D5CABB] bg-white/90 text-[#153A1B] focus:outline-none focus:ring-1 focus:ring-[#6C9736]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#153A1B] mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D5CABB] bg-white/90 text-[#153A1B] focus:outline-none focus:ring-1 focus:ring-[#6C9736]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#153A1B] mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as CustomerProfileData["gender"] })}
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-[#D5CABB] bg-white/90 text-[#153A1B] focus:outline-none focus:ring-1 focus:ring-[#6C9736]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-[#ECE0CA]">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-[#566C59] hover:bg-black/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #E2EEB8 0%, #CDE39B 100%)",
                borderColor: "#B8D882",
                color: "#173B1B",
                boxShadow: "0 2px 8px rgba(180, 214, 130, 0.28)",
              }}
              className="px-4 py-1.5 rounded-full border text-xs font-semibold hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
