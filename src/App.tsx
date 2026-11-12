import { useState, useEffect } from "react";
import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import HeroBanner from "./components/ui/HeroBanner.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ContactUs from "./pages/contactus.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import ShippingPolicy from "./pages/ShippingPolicy.tsx";
import Home from "./pages/Home";
import Plants from "./pages/Plants.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import Cart from "./pages/Cart.tsx";
import Address from "./pages/Address.tsx";
import Payment from "./pages/Payment.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Login, { ForgotPassword, ResetPassword } from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Profile from "./pages/Profile.tsx";
import MyOrders from "./pages/MyOrders.tsx";
import AdminPanel from "./pages/admin/AdminPanel";

function App() {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname.toLowerCase() : "/"
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };

    window.addEventListener("popstate", handleLocationChange);

    // Intercept clicks on links that point to internal routes like /contact or /about
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (
        target &&
        target.href &&
        target.origin === window.location.origin &&
        !target.getAttribute("target") &&
        !target.getAttribute("download")
      ) {
        const path = target.pathname.toLowerCase();
        if (
          path === "/plants" ||
          path === "/product" ||
          path === "/product-details" ||
          path.startsWith("/product/") ||
          path === "/cart" ||
          path === "/view-cart" ||
          path === "/cart-review" ||
          path === "/address" ||
          path === "/checkout/address" ||
          path === "/checkout-address" ||
          path === "/payment" ||
          path === "/checkout/payment" ||
          path === "/checkout-payment" ||
          path === "/payment-guarantee" ||
          path === "/wishlist" ||
          path === "/my-wishlist" ||
          path === "/profile" ||
          path === "/account" ||
          path === "/orders" ||
          path === "/my-orders" ||
          path === "/login" ||
          path === "/signin" ||
          path === "/forgot-password" ||
          path === "/reset-password" ||
          path === "/signup" ||
          path === "/register" ||
          path === "/contact" ||
          path === "/contactus" ||
          path === "/about" ||
          path === "/" ||
          path === "/privacy-policy" ||
          path === "/terms-conditions" ||
          path === "/shipping-policy" ||
          path.startsWith("/admin")
        ) {
          e.preventDefault();
          window.history.pushState({}, "", target.href);
          window.dispatchEvent(new PopStateEvent("popstate"));
          setCurrentPath(path);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleLinkClick);
    };
  }, []);

  const isAdminPage = currentPath.startsWith("/admin");
  const isShippingPolicyPage = currentPath === "/shipping-policy";
  const isTermsConditionsPage = currentPath === "/terms-conditions";
  const isPrivacyPolicyPage = currentPath === "/privacy-policy";
  const isPlantsPage = currentPath === "/plants";
  const isProductDetailsPage =
    currentPath === "/product" ||
    currentPath === "/product-details" ||
    currentPath.startsWith("/product/");
  const isCartPage =
    currentPath === "/cart" ||
    currentPath === "/view-cart" ||
    currentPath === "/cart-review";
  const isAddressPage =
    currentPath === "/address" ||
    currentPath === "/checkout/address" ||
    currentPath === "/checkout-address";
  const isPaymentPage =
    currentPath === "/payment" ||
    currentPath === "/checkout/payment" ||
    currentPath === "/checkout-payment" ||
    currentPath === "/payment-guarantee";
  const isWishlistPage =
    currentPath === "/wishlist" ||
    currentPath === "/my-wishlist";
  const isMyOrdersPage =
    currentPath === "/my-orders" ||
    currentPath === "/orders";
  const isProfilePage =
    currentPath === "/profile" ||
    currentPath === "/account";
  const isLoginPage =
    currentPath === "/login" || currentPath === "/signin";
  const isForgotPasswordPage = currentPath === "/forgot-password";
  const isResetPasswordPage = currentPath === "/reset-password";
  const isSignUpPage =
    currentPath === "/signup" || currentPath === "/register";
  const isContactPage =
    currentPath === "/contact" || currentPath === "/contactus";
  const isHomePage = currentPath === "/";

  return (
    <ShopProvider>
      <div className="min-h-screen bg-white">
        {isAdminPage ? (
          <AdminPanel />
        ) : isLoginPage ? (
          <Login />
        ) : isForgotPasswordPage ? (
          <ForgotPassword />
        ) : isResetPasswordPage ? (
          <ResetPassword />
        ) : isSignUpPage ? (
          <SignUp />
        ) : (
          <>
            <Navbar />

            {isHomePage ? (
              <Home />
            ) : (
              <>
                <main>
                  {isMyOrdersPage ? (
                    <MyOrders />
                  ) : isProfilePage ? (
                    <Profile />
                  ) : isShippingPolicyPage ? (
                    <ShippingPolicy />
                  ) : isTermsConditionsPage ? (
                    <TermsConditions />
                  ) : isPrivacyPolicyPage ? (
                    <PrivacyPolicy />
                  ) : isProductDetailsPage ? (
                    <ProductDetails />
                  ) : isPlantsPage ? (
                    <Plants />
                  ) : isCartPage ? (
                    <Cart />
                  ) : isAddressPage ? (
                    <Address />
                  ) : isPaymentPage ? (
                    <Payment />
                  ) : isWishlistPage ? (
                    <Wishlist />
                  ) : isContactPage ? (
                    <ContactUs />
                  ) : (
                    <>
                      <HeroBanner />
                      <AboutUs />
                    </>
                  )}
                </main>
                {!isProfilePage && <Footer />}
              </>
            )}
          </>
        )}
      </div>
    </ShopProvider>
  );
}

export default App;
