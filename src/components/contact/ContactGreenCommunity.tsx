import greenhouse from "../../assets/about/greenhouse.png";
import ContactEdgeLeaves from "./ContactEdgeLeaves";
import { useContactSectionReveal } from "../../hooks/useContactSectionReveal";

export default function ContactGreenCommunity() {
  const sectionRef = useContactSectionReveal<HTMLElement>("community");

  return (
    <section
      ref={sectionRef}
      className="cu-sans"
      style={{ backgroundColor: "#F5F0E8", width: "100%", position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      <ContactEdgeLeaves />
      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "44px 24px", position: "relative", zIndex: 10 }}>
        {/* Greenhouse banner with overlay */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: "24px", minHeight: "280px" }}>
          {/* Background image */}
          <img
            src={greenhouse}
            alt="Greenhouse interior"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(10, 30, 15, 0.52)",
            }}
          />

          {/* Content centered over overlay */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "54px 24px",
              textAlign: "center",
            }}
          >
            {/* Envelope icon in circular outline */}
            <div
              data-contact-community-icon
              style={{
                marginBottom: "16px",
                display: "flex",
                width: 42,
                height: 42,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.55)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 18, height: 18 }}
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            {/* Eyebrow & Heading */}
            <div data-contact-community-heading style={{ textAlign: "center" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  color: "rgba(255,255,255,0.85)",
                  textTransform: "uppercase",
                }}
              >
                JOIN OUR GREEN COMMUNITY
              </span>

              {/* Main heading */}
              <h2
                className="cu-serif"
                style={{
                  margin: "10px auto 0",
                  fontSize: "clamp(26px, 3.2vw, 36px)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                }}
              >
                Let&rsquo;s Grow Something Beautiful
              </h2>
            </div>

            {/* Subtitle */}
            <p
              data-contact-community-desc
              style={{
                margin: "8px auto 0",
                maxWidth: "460px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              Get plant care tips, gardening inspiration, and updates on our latest arrivals.
            </p>

            {/* Email form */}
            <div
              data-contact-community-form
              style={{
                marginTop: "24px",
                display: "flex",
                width: "100%",
                maxWidth: "440px",
                overflow: "hidden",
                borderRadius: "9999px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  padding: "12px 20px",
                  fontSize: "13px",
                  color: "#143826",
                  outline: "none",
                  border: "none",
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                }}
              />
              <button
                type="button"
                style={{
                  display: "flex",
                  flexShrink: 0,
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "#1B4332",
                  padding: "10px 22px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#143326")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1B4332")}
              >
                <span>Send Mail</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 14, height: 14 }}
                  aria-hidden="true"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

