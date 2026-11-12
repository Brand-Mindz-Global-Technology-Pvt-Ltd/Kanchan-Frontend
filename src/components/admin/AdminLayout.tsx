import type { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import type { AdminUser } from "../../types/admin";

interface AdminLayoutProps {
  children: ReactNode;
  currentPath: string;
  onNavigate: (path: string) => void;
  title: string;
  onLogout?: () => void;
  adminUser?: AdminUser | null;
}

function AdminLayout({
  children,
  currentPath,
  onNavigate,
  title,
  onLogout,
  adminUser,
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#F5F4F2]">
      <AdminSidebar currentPath={currentPath} onNavigate={onNavigate} onLogout={onLogout} />
      <div className="flex-1 flex flex-col lg:ml-64">
        <AdminHeader title={title} onLogout={onLogout} adminUser={adminUser} />
        <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
