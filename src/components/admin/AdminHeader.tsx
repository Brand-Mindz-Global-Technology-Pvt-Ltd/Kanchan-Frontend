import type { AdminUser } from "../../types/admin";

interface AdminHeaderProps {
  title: string;
  onLogout?: () => void;
  adminUser?: AdminUser | null;
}

function AdminHeader({ title, onLogout, adminUser }: AdminHeaderProps) {
  const adminName = adminUser?.name || "Admin";
  const adminEmail = adminUser?.email || "admin@kanchan.com";
  const initial = adminName.charAt(0).toUpperCase() || "A";

  return (
    <header className="bg-white border-b border-[#E8F0E5] px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#06452E]">{title}</h1>
          <p className="text-sm text-[#7A8C80] mt-0.5">Welcome back, {adminName}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 pl-10 border border-[#D4E0D4] rounded-lg focus:ring-2 focus:ring-[#06452E] focus:border-transparent outline-none transition-all text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8C80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex items-center gap-3 pl-4 border-l border-[#E8F0E5]">
            <div className="w-9 h-9 bg-[#06452E] rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {initial}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-[#06452E]">{adminName}</p>
              <p className="text-xs text-[#7A8C80]">{adminEmail}</p>
            </div>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-lg transition-colors cursor-pointer"
              title="Logout from admin session"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
