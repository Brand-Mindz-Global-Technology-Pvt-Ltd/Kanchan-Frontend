import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar.tsx";
import Footer from "./components/layout/Footer.tsx";
import HeroBanner from "./ui/HeroBanner.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import ContactUs from "./pages/contactus.tsx";

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
        if (path === "/contact" || path === "/contactus" || path === "/about" || path === "/") {
          e.preventDefault();
          window.history.pushState({}, "", target.href);
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

  const isContactPage =
    currentPath === "/contact" || currentPath === "/contactus";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        {isContactPage ? (
          <ContactUs />
        ) : (
          <>
            <HeroBanner />
            <AboutUs />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
