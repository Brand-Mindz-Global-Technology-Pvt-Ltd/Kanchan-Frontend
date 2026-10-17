
type NavbarLink = {
  name: string;
  href: string;
};

function Navbar() {
  const currentPath = window.location.pathname;
  const links: NavbarLink[] = [
    { name: "Home", href: "/" },
    { name: "Plants", href: "/plants" },
    { name: "Service", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-3 lg:px-16">
        {/* Logo */}
        
<img
  src="/src/assets/kanchan-logo.png"
  alt="Kanchan Logo"
  style={{ height: "50px", width: "auto", objectFit: "contain" }}
/>


        {/* Navigation */}
        <div className="hidden items-center gap-1 rounded-full bg-green-50 p-1 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                currentPath === link.href
                  ? "bg-green-900 text-white"
                  : "text-green-950 hover:bg-green-100"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-4">
          <a
            href="/plants"
            className="hidden rounded-full bg-green-800 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-900 sm:inline-flex"
          >
            Shop Plants <span className="ml-2">›</span>
          </a>

          <button type="button" aria-label="Search" className="text-green-950 hover:text-green-700">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
              <circle cx="10.8" cy="10.8" r="6.5" />
              <path d="m16 16 4 4" />
            </svg>
          </button>

          <button type="button" aria-label="Wishlist" className="hidden text-green-950 hover:text-green-700 sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
              <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10S3.2 14 3.2 8.8A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 8.8 2.3Z" />
            </svg>
          </button>

          <button type="button" aria-label="Shopping bag" className="hidden text-green-950 hover:text-green-700 sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
          </button>

          <button type="button" aria-label="Account" className="hidden text-green-950 hover:text-green-700 sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
