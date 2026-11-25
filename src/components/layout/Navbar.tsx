import { useState } from "react";
import { useShop } from "../../context/ShopContext";
import kanchanLogo from "../../assets/kanchan-logo.png";

type NavbarLink = {
  name: string;
  href: string;
  disabled?: boolean;
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalCount } = useShop();
  const currentPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const links: NavbarLink[] = [
    { name: "Home", href: "/" },
    { name: "Plants", href: "/plants" },
    { name: "Services", href: "/services", disabled: true },
    { name: "Blog", href: "/blog", disabled: true },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 isolate w-full border-b border-green-100 bg-white">
      <style>{`
        .kanchan-mobile-menu-toggle,
        .kanchan-mobile-navigation {
          display: none;
        }

        @media (width < 48rem) {
          .kanchan-mobile-menu-toggle {
            display: flex;
          }

          .kanchan-mobile-navigation {
            display: block;
          }
        }
      `}</style>
      <nav className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between gap-2 px-3 py-2.5 sm:gap-6 sm:px-6 sm:py-3 lg:px-16">
        {/* Logo */}
        <a href="/" aria-label="Kanchan Home" className="transition hover:opacity-90">
          <img
            src={kanchanLogo}
            alt="Kanchan Logo"
            className="h-[40px] sm:h-[50px] w-auto object-contain"
          />
        </a>

        {/* Navigation */}
        <div className="hidden items-center gap-1 rounded-full bg-green-50 p-1 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              aria-disabled={link.disabled ? "true" : undefined}
              tabIndex={link.disabled ? -1 : undefined}
              onClick={(e) => {
                if (link.disabled) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }}
              title={link.disabled ? `${link.name} is temporarily unavailable` : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                link.disabled
                  ? "text-[#859689] opacity-65 cursor-not-allowed select-none"
                  : currentPath === link.href
                  ? "bg-green-900 text-white"
                  : "text-green-950 hover:bg-green-100"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
          <a
            href="/plants"
            className="hidden rounded-full bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-900 sm:inline-flex"
          >
            Shop Plants <span className="ml-2">›</span>
          </a>

          <button type="button" aria-label="Search" className="p-1 sm:p-0 text-green-950 hover:text-green-700 cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5 sm:h-5 sm:w-5">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <a href="/wishlist" aria-label="Wishlist" className="p-1 sm:p-0 text-green-950 hover:text-green-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5 sm:h-5 sm:w-5">
              <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z" />
            </svg>
          </a>

          <a
            href="/cart"
            aria-label="Shopping bag"
            className="relative p-1 sm:p-0 text-green-950 hover:text-green-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4.5 w-4.5 sm:h-5 sm:w-5">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#06452E] px-1 text-[9.5px] font-bold text-white shadow-2xs sm:-top-1.5 sm:-right-2 sm:text-[10px]">
                {totalCount}
              </span>
            )}
          </a>

          <a href="/profile" aria-label="Account Profile" className="hidden text-green-950 hover:text-green-700 sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </a>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            className="kanchan-mobile-menu-toggle h-8.5 w-8.5 sm:h-10 sm:w-10 items-center justify-center rounded-md text-green-950 hover:bg-green-50 hover:text-green-700 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5.5 w-5.5 sm:h-6 sm:w-6" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="kanchan-mobile-navigation mx-auto max-w-[1440px] border-t border-green-100 px-6 py-3 lg:px-16"
        >
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                aria-disabled={link.disabled ? "true" : undefined}
                tabIndex={link.disabled ? -1 : undefined}
                onClick={(e) => {
                  if (link.disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  setIsMobileMenuOpen(false);
                }}
                title={link.disabled ? `${link.name} is temporarily unavailable` : undefined}
                className={`rounded-md px-4 py-3 text-sm font-medium transition ${
                  link.disabled
                    ? "text-[#859689] opacity-65 cursor-not-allowed select-none"
                    : currentPath === link.href
                    ? "bg-green-900 text-white"
                    : "text-green-950 hover:bg-green-100"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-md px-4 py-3 text-sm font-medium text-green-950 hover:bg-green-100"
            >
              <span>Shopping Bag</span>
              {totalCount > 0 && (
                <span className="rounded-full bg-[#06452E] px-2 py-0.5 text-[11px] font-bold text-white">
                  {totalCount}
                </span>
              )}
            </a>
            <a
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-md px-4 py-3 text-sm font-medium text-green-950 hover:bg-green-100"
            >
              My Wishlist
            </a>
            <a
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-md px-4 py-3 text-sm font-medium text-green-950 hover:bg-green-100"
            >
              My Profile
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
