import ContactEdgeLeaves from "./ContactEdgeLeaves";
import { useContactSectionReveal } from "../../hooks/useContactSectionReveal";

export default function ContactChannels() {
  const sectionRef = useContactSectionReveal<HTMLElement>("channels");

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: "#FCFAF4", width: "100%", position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      <ContactEdgeLeaves />
      <div className="cu-sec2-wrap" style={{ position: "relative", zIndex: 10 }}>
        {/* heading */}
        <div data-contact-reveal-heading style={{ textAlign: "center", marginBottom: "36px" }}>
          <span
            className="cu-sans"
            style={{
              display: "block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "#4A7A5A",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            QUICK ASSISTANCE
          </span>
          <h2
            className="cu-serif"
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3vw, 38px)",
              fontWeight: 700,
              color: "#143826",
              lineHeight: 1.2,
            }}
          >
            Reach Us Directly
          </h2>
        </div>

        {/* 4 cards */}
        <div className="cu-cards-row">
          {/* Card 1 — Visit Us */}
          <div
            data-contact-channel-card
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "22px 22px 20px",
              boxShadow: "0 4px 20px rgba(20,56,35,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "175px",
            }}
          >
            <div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#E8F3DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#143826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="cu-sans" style={{ fontSize: 15, fontWeight: 700, color: "#143826", marginBottom: 8 }}>Visit Us</div>
              <div className="cu-sans" style={{ fontSize: 12, color: "#587060", lineHeight: 1.55 }}>
                125 Greenery St, Koramangala,<br />Bangalore, KA 560001
              </div>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="cu-sans"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#143826", textDecoration: "none", marginTop: 14 }}
            >
              View on Map
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Card 2 — Call Us */}
          <div
            data-contact-channel-card
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "22px 22px 20px",
              boxShadow: "0 4px 20px rgba(20,56,35,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "175px",
            }}
          >
            <div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#E8F3DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#143826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="cu-sans" style={{ fontSize: 15, fontWeight: 700, color: "#143826", marginBottom: 8 }}>Call Us</div>
              <div className="cu-sans" style={{ fontSize: 12, color: "#587060", lineHeight: 1.55 }}>
                +91 99834 43720<br />+91 80 4123 9980
              </div>
            </div>
            <a
              href="tel:+919983443720"
              className="cu-sans"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#143826", textDecoration: "none", marginTop: 14 }}
            >
              Call Now
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Card 3 — Email Us */}
          <div
            data-contact-channel-card
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "22px 22px 20px",
              boxShadow: "0 4px 20px rgba(20,56,35,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "175px",
            }}
          >
            <div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#E8F3DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#143826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="cu-sans" style={{ fontSize: 15, fontWeight: 700, color: "#143826", marginBottom: 8 }}>Email Us</div>
              <div className="cu-sans" style={{ fontSize: 12, color: "#587060", lineHeight: 1.55 }}>
                info@kanchangarden.com<br />orders@kanchangarden.com
              </div>
            </div>
            <a
              href="mailto:info@kanchangarden.com"
              className="cu-sans"
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#143826", textDecoration: "none", marginTop: 14 }}
            >
              Send Email
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>

          {/* Card 4 — Open Hours */}
          <div
            data-contact-channel-card
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "22px 22px 20px",
              boxShadow: "0 4px 20px rgba(20,56,35,0.07)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "175px",
            }}
          >
            <div>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  background: "#E8F3DF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#143826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className="cu-sans" style={{ fontSize: 15, fontWeight: 700, color: "#143826", marginBottom: 8 }}>Open Hours</div>
              <div className="cu-sans" style={{ fontSize: 12, color: "#587060", lineHeight: 1.55 }}>
                Mon – Sat: 9:00am – 7:30pm<br />Sun: 10:00am – 5:00pm
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 14 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0, display: "inline-block" }} />
              <span className="cu-sans" style={{ fontSize: 12, fontWeight: 600, color: "#143826" }}>Open Today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

