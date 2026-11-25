import { useState } from "react";

interface SecurityCardProps {
  onLogout?: () => void;
}

export default function SecurityCard({ onLogout }: SecurityCardProps) {
  const [logoutNotice, setLogoutNotice] = useState(false);

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      setLogoutNotice(true);
      setTimeout(() => setLogoutNotice(false), 3000);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FAF4E8",
        backgroundImage: "linear-gradient(180deg, #FDF8EE 0%, #FAF3E7 100%)",
        borderColor: "#E8DCBE",
        boxShadow: "0 10px 28px -4px rgba(180, 160, 120, 0.16), 0 4px 10px -2px rgba(40, 70, 25, 0.05)",
      }}
      className="relative overflow-hidden rounded-[22px] sm:rounded-[26px] border p-3 sm:px-4 sm:py-3.5"
    >
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        {/* Left Section: Shield + Title + Divider */}
        <div className="flex items-center gap-3">
          {/* Green Shield with Padlock */}
          <div
            style={{
              backgroundColor: "#255028",
              boxShadow: "0 2px 8px rgba(37, 80, 40, 0.25)",
            }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-white flex items-center justify-center shrink-0"
          >
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <rect width="8" height="6" x="8" y="11" rx="1" fill="white" stroke="none" />
              <path d="M10 11V9a2 2 0 1 1 4 0v2" stroke="white" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Vertical Separator */}
          <div style={{ backgroundColor: "#E8DECC" }} className="h-7 w-[1px] hidden sm:block" />

          {/* Title & Status */}
          <div>
            <h4 style={{ color: "#163B1C" }} className="font-serif-heading text-[15px] sm:text-[17px] font-bold leading-tight">
              Security
            </h4>
            <p style={{ color: "#566C59" }} className="text-[11px] sm:text-xs mt-0.5 font-normal">
              Your account is safe and secure
            </p>
          </div>
        </div>

        {/* Right Section: Logout Button */}
        <div className="flex items-center justify-end gap-2 w-full sm:w-auto pt-2.5 sm:pt-0 border-t border-[#ECE0CA]/60 sm:border-t-0">
          {logoutNotice && (
            <span style={{ color: "#163B1C" }} className="text-xs font-medium animate-fade-in">
              Session cleared. Redirecting...
            </span>
          )}
          <button
            type="button"
            onClick={handleLogoutClick}
            style={{
              background: "linear-gradient(135deg, #E2EEB8 0%, #CDE39B 100%)",
              borderColor: "#B8D882",
              color: "#173B1B",
              boxShadow: "0 2px 8px rgba(180, 214, 130, 0.28)",
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full border text-xs font-semibold hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
