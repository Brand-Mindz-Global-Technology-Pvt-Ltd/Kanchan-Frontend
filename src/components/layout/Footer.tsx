import kanchanLogo from "../../assets/kanchan-logo.png";

export default function Footer() {
  return (
    <footer
      className="relative isolate w-full overflow-hidden"
      style={{
        backgroundColor: "#EDF3E2",
        fontFamily: "Inter, 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .footer-cols {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
        }
        @media (min-width: 640px) {
          .footer-cols {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
        @media (min-width: 960px) {
          .footer-cols {
            grid-template-columns: 1.6fr 1fr 1.15fr 1.35fr;
            column-gap: 28px;
            row-gap: 0;
          }
        }
        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
      `}</style>

      {/* Main container */}
      <div className="relative z-10 mx-auto max-w-[1140px] px-6 sm:px-8 lg:px-10" style={{ paddingTop: "38px", paddingBottom: "36px" }}>
        {/* Four Columns */}
        <div className="footer-cols">
          {/* Column 1 — Logo and description */}
          <div className="flex flex-col items-start">
            <img
              src={kanchanLogo}
              alt="Kanchan Garden"
              style={{
                height: "54px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <p
              style={{
                marginTop: "14px",
                maxWidth: "270px",
                fontSize: "12px",
                lineHeight: "1.55",
                color: "#4B584D",
                letterSpacing: "-0.01em",
              }}
            >
              Cultivating serenity and timeless botanicals for beautiful living
              spaces. Dedicated to a world of lush plants, handcrafted care,
              and nature-inspired lifestyles.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col items-start">
            <h4
              style={{
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#143826",
                marginBottom: "14px",
                letterSpacing: "-0.01em",
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "7px",
              }}
            >
              {[
                { name: "Home", href: "/" },
                { name: "Plants", href: "/plants" },
                { name: "Garden Care", href: "/services" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "12px",
                      color: "#4B584D",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#143826")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B584D")}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Customer Support */}
          <div className="flex flex-col items-start">
            <h4
              style={{
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#143826",
                marginBottom: "14px",
                letterSpacing: "-0.01em",
              }}
            >
              Customer Support
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "7px",
              }}
            >
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Shipping Information", href: "#shipping" },
                { name: "Garden Care", href: "/services" },
                { name: "Returns Policy", href: "#returns" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    style={{
                      fontSize: "12px",
                      color: "#4B584D",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#143826")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#4B584D")}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Get In Touch */}
          <div className="flex flex-col items-start">
            <h4
              style={{
                fontSize: "13.5px",
                fontWeight: 700,
                color: "#143826",
                marginBottom: "14px",
                letterSpacing: "-0.01em",
              }}
            >
              Get In Touch
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Phone */}
              <li style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4B584D"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "14px", height: "14px", flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span style={{ fontSize: "12px", color: "#4B584D" }}>
                  +91 99834 43720
                </span>
              </li>

              {/* Email */}
              <li style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4B584D"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "14px", height: "14px", flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span style={{ fontSize: "12px", color: "#4B584D" }}>
                  info@kanchangarden.com
                </span>
              </li>

              {/* Address */}
              <li style={{ display: "flex", alignItems: "flex-start", gap: "9px" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4B584D"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "14px", height: "14px", flexShrink: 0, marginTop: "2px" }}
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{ fontSize: "12px", lineHeight: "1.45", color: "#4B584D" }}>
                  125–Greenery Street, Bangalore,
                  <br />
                  Karnataka 560001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row — seamless, no top divider */}
        <div className="footer-bottom" style={{ marginTop: "36px" }}>
          <span style={{ fontSize: "12px", color: "#4B584D" }}>
            Copyright © 2026 Havona All rights reserved.Made with ❤ by Brand Mindz
.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            {[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms-conditions" },
              { name: "Shipping Policy", href: "/shipping-policy" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontSize: "12px",
                  color: "#4B584D",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#143826")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4B584D")}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
