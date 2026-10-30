import BangaloreNurseryMap from "../BangaloreNurseryMap";
import ContactEdgeLeaves from "./ContactEdgeLeaves";
import { useContactSectionReveal } from "../../hooks/useContactSectionReveal";

export default function NurseryLocation() {
  const sectionRef = useContactSectionReveal<HTMLElement>("location");

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden font-body-copy"
      style={{ backgroundColor: "#FCFAF4" }}
    >
      <ContactEdgeLeaves />
      <div className="relative z-10 mx-auto max-w-[1100px] px-6 py-9 sm:px-8 sm:py-10">
        {/* Centered Heading Group */}
        <div data-contact-location-heading style={{ textAlign: "center", marginBottom: "22px" }}>
          <span
            className="cu-sans"
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#3d6d4a",
              textTransform: "uppercase",
            }}
          >
            BOTANICAL SANCTUARY
          </span>
          <h2
            className="cu-serif"
            style={{
              margin: "6px auto 0",
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#143826",
            }}
          >
            Visit Our Bangalore Nursery
          </h2>
          <p
            className="cu-sans"
            style={{
              margin: "6px auto 0",
              maxWidth: "600px",
              fontSize: "13px",
              lineHeight: 1.55,
              color: "#4a5d4e",
            }}
          >
            Walk through our greenhouse pavilions, experience exotic foliage in real lighting, and speak directly with head gardeners.
          </p>
        </div>

        {/* Rounded White Container with flush map on top and info bar on bottom */}
        <div
          data-contact-location-map
          style={{
            overflow: "hidden",
            borderRadius: "20px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 24px rgba(20,56,35,0.06)",
            border: "1px solid #E5ECE0",
          }}
        >
          {/* Map Frame — flush with card edges */}
          <div
            style={{
              position: "relative",
              height: "350px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <BangaloreNurseryMap className="h-full w-full" />
          </div>

          {/* White Information Bar directly attached below map */}
          <div
            data-contact-location-info
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              padding: "16px 26px 18px",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <svg
                style={{ width: 17, height: 17, color: "#143826", marginTop: "2px", flexShrink: 0 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <span
                  className="cu-sans"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#143826",
                    marginBottom: "1px",
                  }}
                >
                  Address
                </span>
                <span
                  className="cu-sans"
                  style={{
                    fontSize: "12.5px",
                    color: "#4a5d4e",
                    lineHeight: 1.4,
                  }}
                >
                  125 Greenery Street, Koramangala, Bangalore 560001
                </span>
              </div>
            </div>

            {/* Visiting Hours */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <svg
                style={{ width: 17, height: 17, color: "#143826", marginTop: "2px", flexShrink: 0 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <span
                  className="cu-sans"
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#143826",
                    marginBottom: "1px",
                  }}
                >
                  Visiting Hours
                </span>
                <span
                  className="cu-sans"
                  style={{
                    fontSize: "12.5px",
                    color: "#4a5d4e",
                    lineHeight: 1.4,
                  }}
                >
                  Monday to Sunday: 9:00 AM – 7:30 PM
                </span>
              </div>
            </div>

            {/* Get Directions Button */}
            <div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=12.9345,77.6350"
                target="_blank"
                rel="noopener noreferrer"
                className="cu-sans"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "#143826",
                  padding: "10px 22px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(20,56,35,0.2)",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f5238")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#143826")}
              >
                <span>Get Directions</span>
                {/* Diamond navigation icon matching Figma screenshot */}
                <svg style={{ width: 13, height: 13 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
                  <circle cx="12" cy="12" r="2.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

