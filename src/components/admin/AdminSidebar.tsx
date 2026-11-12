interface SidebarItem {
  name: string;
  path: string;
  icon: string;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Products", path: "/admin/products", icon: "🌿" },
  { name: "Categories", path: "/admin/categories", icon: "📁" },
  { name: "Orders", path: "/admin/orders", icon: "📦" },
  { name: "Customers", path: "/admin/customers", icon: "👥" },
  { name: "Enquiries", path: "/admin/enquiries", icon: "💬" },
];

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onLogout?: () => void;
}

function AdminSidebar({ currentPath, onNavigate, onLogout }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 w-64 h-screen bg-[#06452E] shadow-xl flex flex-col">
      <div className="p-6 border-b border-[#1A5D40]">
        <h1 className="text-xl font-bold text-white">Kanchan</h1>
        <p className="text-sm text-[#A8D5BA] mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white text-[#06452E] font-semibold"
                  : "text-[#D4E9D9] hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-[#1A5D40] space-y-1">
        <button
          onClick={() => onNavigate("/")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#D4E9D9] hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <span className="text-lg">🏠</span>
          <span className="text-sm">Back to Website</span>
        </button>
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-all duration-200"
          >
            <span className="text-lg">🚪</span>
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </aside>
  );
}

export default AdminSidebar;
