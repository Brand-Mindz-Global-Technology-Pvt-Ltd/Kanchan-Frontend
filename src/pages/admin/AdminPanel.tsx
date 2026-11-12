import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminLogin from "./AdminLogin";
import Dashboard from "./Dashboard";
import Products from "./Products";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import Categories from "./Categories";
import Orders from "./Orders";
import Customers from "./Customers";
import Enquiries from "./Enquiries";
import { mockProducts as initialMockProducts } from "../../data";
import type { AdminUser } from "../../types/admin";
import {
  getAdminToken,
  getStoredAdminUser,
  getAdminMeApi,
  logoutAdminApi,
  clearAdminSession,
} from "../../services/adminAuth";

function AdminPanel() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname.toLowerCase() || "/admin";
  });
  const [mockProducts] = useState(initialMockProducts);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => getStoredAdminUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => Boolean(getAdminToken()));
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  // Validate admin token against backend on mount / page refresh
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const token = getAdminToken();
      if (!token) {
        if (isMounted) {
          setAdminUser(null);
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
          const path = window.location.pathname.toLowerCase();
          if (path !== "/admin/login") {
            window.history.replaceState({}, "", "/admin/login");
            setCurrentPath("/admin/login");
          }
        }
        return;
      }

      try {
        const user = await getAdminMeApi(token);
        if (isMounted) {
          setAdminUser(user);
          setIsAuthenticated(true);
          setIsCheckingAuth(false);
          const path = window.location.pathname.toLowerCase();
          if (path === "/admin/login") {
            window.history.replaceState({}, "", "/admin");
            setCurrentPath("/admin");
          }
        }
      } catch {
        if (isMounted) {
          clearAdminSession();
          setAdminUser(null);
          setIsAuthenticated(false);
          setIsCheckingAuth(false);
          const path = window.location.pathname.toLowerCase();
          if (path !== "/admin/login") {
            window.history.replaceState({}, "", "/admin/login");
            setCurrentPath("/admin/login");
          }
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname.toLowerCase();
      if (newPath.startsWith("/admin")) {
        setCurrentPath(newPath);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Guard routes whenever auth state or path updates
  useEffect(() => {
    if (isCheckingAuth) return;

    if (!isAuthenticated) {
      if (currentPath !== "/admin/login") {
        window.history.replaceState({}, "", "/admin/login");
        setCurrentPath("/admin/login");
      }
    } else {
      if (currentPath === "/admin/login") {
        window.history.replaceState({}, "", "/admin");
        setCurrentPath("/admin");
      }
    }
  }, [isAuthenticated, isCheckingAuth, currentPath]);

  const handleNavigate = (path: string) => {
    if (!isAuthenticated && path !== "/admin/login") {
      window.history.pushState({}, "", "/admin/login");
      setCurrentPath("/admin/login");
      return;
    }
    setCurrentPath(path);
    window.history.pushState({}, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setIsAuthenticated(true);
    window.history.pushState({}, "", "/admin");
    window.dispatchEvent(new PopStateEvent("popstate"));
    setCurrentPath("/admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await logoutAdminApi();
    } catch (err) {
      console.warn("Logout error:", err);
    } finally {
      clearAdminSession();
      setAdminUser(null);
      setIsAuthenticated(false);
      window.history.pushState({}, "", "/admin/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
      setCurrentPath("/admin/login");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // While validating the token on initial page load / refresh
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F4F2]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#06452E] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#06452E]">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // Not authenticated or on /admin/login: render AdminLogin directly
  if (!isAuthenticated || currentPath === "/admin/login") {
    return <AdminLogin onLogin={handleLoginSuccess} />;
  }

  // Route handling for authenticated admin
  const renderContent = () => {
    if (currentPath === "/admin") {
      return <Dashboard products={mockProducts} />;
    } else if (currentPath === "/admin/products") {
      return <Products onNavigate={handleNavigate} />;
    } else if (currentPath === "/admin/products/add") {
      return <AddProduct onNavigate={handleNavigate} />;
    } else if (currentPath.startsWith("/admin/products/edit/")) {
      const productId = currentPath.split("/").pop();
      return (
        <EditProduct
          onNavigate={handleNavigate}
          productId={productId || ""}
        />
      );
    } else if (currentPath === "/admin/categories") {
      return <Categories onNavigate={handleNavigate} />;
    } else if (currentPath === "/admin/orders") {
      return <Orders />;
    } else if (currentPath === "/admin/customers") {
      return <Customers />;
    } else if (currentPath === "/admin/enquiries") {
      return <Enquiries onNavigate={handleNavigate} />;
    }
    return <Dashboard products={mockProducts} />;
  };

  const getPageTitle = () => {
    if (currentPath === "/admin") return "Dashboard";
    if (currentPath === "/admin/products") return "Products";
    if (currentPath === "/admin/products/add") return "Add Product";
    if (currentPath.startsWith("/admin/products/edit/")) return "Edit Product";
    if (currentPath === "/admin/categories") return "Categories";
    if (currentPath === "/admin/orders") return "Orders";
    if (currentPath === "/admin/customers") return "Customers";
    if (currentPath === "/admin/enquiries") return "Enquiries";
    return "Dashboard";
  };

  return (
    <AdminLayout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      title={getPageTitle()}
      onLogout={handleLogout}
      adminUser={adminUser}
    >
      {renderContent()}
    </AdminLayout>
  );
}

export default AdminPanel;
