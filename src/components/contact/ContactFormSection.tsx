import { useState } from "react";
import type { FormEvent } from "react";
import BotanicalLeaf from "./BotanicalLeaf";
import ContactEdgeLeaves from "./ContactEdgeLeaves";
import { useContactSectionReveal } from "../../hooks/useContactSectionReveal";

export default function ContactFormSection() {
  const sectionRef = useContactSectionReveal<HTMLElement>("form");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    message: "",
    consent: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#EDF5DC",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <ContactEdgeLeaves />
      {/* ── Decorative leaf graphics matching Image 2 positions ── */}
      {/* Left edge leaves */}
      <BotanicalLeaf style={{ top: "4%",  left: "-24px" }} width={82}  rotate={-20} opacity={0.85} />
      <BotanicalLeaf style={{ top: "38%", left: "-20px" }} width={72}  rotate={22}  opacity={0.75} />
      <BotanicalLeaf style={{ bottom: "6%", left: "-18px" }} width={78} rotate={38}  opacity={0.8}  />
      {/* Right edge leaves */}
      <BotanicalLeaf style={{ top: "3%",    right: "-20px" }} width={80}  rotate={15}  opacity={0.8}  />
      <BotanicalLeaf style={{ top: "40%",   right: "-16px" }} width={70}  rotate={-18} opacity={0.7}  />
      <BotanicalLeaf style={{ bottom: "5%", right: "-20px" }} width={82}  rotate={-32} opacity={0.8}  />
      {/* Bottom centre leaf */}
      <BotanicalLeaf style={{ bottom: "-22px", left: "46%" }} width={75} rotate={-78} opacity={0.7} />

      <div className="cu-sec3-wrap" style={{ position: "relative", zIndex: 10 }}>
        <div className="cu-sec3-grid">

          {/* ────────────────────────────────────────
              LEFT: Contact Form Card
              ──────────────────────────────────────── */}
          <div
            data-contact-form-card
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "36px 36px 32px",
              boxShadow: "0 6px 30px rgba(20,56,35,0.07)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* GET IN TOUCH label & headings */}
            <div data-contact-form-header>
              <span
                className="cu-sans"
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.17em",
                  color: "#4A7A5A",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                GET IN TOUCH
              </span>

              {/* Heading */}
              <h2
                className="cu-serif"
                style={{
                  margin: "0 0 10px",
                  fontSize: "clamp(26px, 3vw, 33px)",
                  fontWeight: 700,
                  color: "#143826",
                  lineHeight: 1.2,
                }}
              >
                Send Us a Message
              </h2>

              {/* Subtext */}
              <p
                className="cu-sans"
                style={{
                  margin: "0 0 26px",
                  fontSize: "13px",
                  color: "#587060",
                  lineHeight: 1.5,
                }}
              >
                Tell us how we can help, and we&rsquo;ll get back to you as soon as possible.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: "#EDF5DC",
                  borderRadius: "14px",
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "#143826",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="cu-sans" style={{ fontSize: 15, fontWeight: 700, color: "#143826", marginBottom: 6 }}>
                  Thank you for reaching out!
                </div>
                <div className="cu-sans" style={{ fontSize: 12, color: "#587060" }}>
                  Our botanical care team will get back to you shortly.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Row 1: Full Name & Email */}
                <div data-contact-form-field style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label htmlFor="cu-fullName" className="cu-label">
                      Full Name <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      id="cu-fullName"
                      type="text"
                      required
                      className="cu-input"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="cu-email" className="cu-label">
                      Email Address <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      id="cu-email"
                      type="email"
                      required
                      className="cu-input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Phone & City */}
                <div data-contact-form-field style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label htmlFor="cu-phone" className="cu-label">
                      Phone Number <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      id="cu-phone"
                      type="tel"
                      required
                      className="cu-input"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="cu-city" className="cu-label">
                      City <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      id="cu-city"
                      type="text"
                      required
                      className="cu-input"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 3: State (full width) */}
                <div data-contact-form-field style={{ marginBottom: "16px" }}>
                  <label htmlFor="cu-state" className="cu-label">
                    State <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    id="cu-state"
                    type="text"
                    required
                    className="cu-input"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                {/* Row 4: Message (full width, tall textarea) */}
                <div data-contact-form-field style={{ marginBottom: "18px" }}>
                  <label htmlFor="cu-message" className="cu-label">
                    Message <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <textarea
                    id="cu-message"
                    required
                    className="cu-input"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ height: "104px", resize: "none" }}
                  />
                </div>

                {/* Row 5: Consent checkbox */}
                <div data-contact-form-field style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "22px" }}>
                  <input
                    id="cu-consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    style={{
                      width: 15,
                      height: 15,
                      marginTop: 2,
                      accentColor: "#143826",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                  />
                  <label
                    htmlFor="cu-consent"
                    className="cu-sans"
                    style={{ fontSize: 11.5, color: "#587060", lineHeight: 1.5, cursor: "pointer" }}
                  >
                    I agree to the{" "}
                    <a
                      href="#privacy"
                      style={{ color: "#143826", fontWeight: 600, textDecoration: "underline" }}
                    >
                      Privacy Policy
                    </a>{" "}
                    and consent to Kanchan Garden using my information to respond to this request.
                  </label>
                </div>

                {/* Row 6: Submit Button */}
                <button
                  type="submit"
                  className="cu-sans"
                  style={{
                    width: "100%",
                    background: "#143826",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50px",
                    padding: "14px 24px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#0d2419")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#143826")}
                >
                  Send Message
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* ────────────────────────────────────────
              RIGHT: Promise Card + Instant Answers Card
              ──────────────────────────────────────── */}
          <div data-contact-form-side style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 1, height: "100%" }}>

            {/* ── OUR PROMISE card (dark green) ── */}
            <div
              style={{
                background: "#183828",
                borderRadius: "16px",
                padding: "26px 26px 28px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(20,56,35,0.18)",
                color: "#fff",
                flex: 1,
                minHeight: 0,
              }}
            >
              {/* Watermark leaf top-right */}
              <svg
                viewBox="0 0 120 160"
                fill="none"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 64,
                  height: 86,
                  opacity: 0.18,
                  transform: "rotate(22deg)",
                  pointerEvents: "none",
                }}
              >
                <path d="M60 148 L60 18" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
                <path d="M60 138 C18 98 14 38 60 18 C106 38 102 98 60 138 Z" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              {/* OUR PROMISE label */}
              <span
                className="cu-sans"
                style={{
                  display: "block",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "#8DC68A",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                OUR PROMISE
              </span>

              {/* Heading */}
              <h3
                className="cu-sans"
                style={{
                  margin: "0 0 20px",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                Why Reach Out to Us?
              </h3>

              {/* Feature 1 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "18px" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8DC68A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M12 22v-9" />
                    <path d="M12 13c0-4.5 3.5-7 8-7 0 4.5-2.5 8-8 7Z" />
                    <path d="M12 17c0-3.5-2.5-5.5-6-5.5 0 3.5 2 6 6 5.5Z" />
                  </svg>
                </div>
                <div>
                  <div className="cu-sans" style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                    Personalized Plant Care
                  </div>
                  <div className="cu-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                    Tailored light, watering, and soil guidance matched to your specific room temperature and window orientations.
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "18px" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8DC68A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                    <path d="M15 18h2a1 1 0 0 0 1-1v-3.5a1 1 0 0 0-.29-.71l-2.5-2.5A1 1 0 0 0 14.5 10H14" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="17" cy="18" r="2" />
                  </svg>
                </div>
                <div>
                  <div className="cu-sans" style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                    7-Day Transit Guarantee
                  </div>
                  <div className="cu-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                    Safe arrival protection for every delivered plant companion. If a plant arrives stressed, we replace it promptly.
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#8DC68A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                  </svg>
                </div>
                <div>
                  <div className="cu-sans" style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                    Organic Growing Media
                  </div>
                  <div className="cu-sans" style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", lineHeight: 1.5 }}>
                    100% chemical-free soil mixes and nutrient fortifiers formulated directly in our Bangalore nursery facility.
                  </div>
                </div>
              </div>
            </div>

            {/* ── NEED INSTANT ANSWERS? card (white) ── */}
            <div
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "24px 24px 22px",
                boxShadow: "0 4px 20px rgba(20,56,35,0.07)",
              }}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: "#E8F3DF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="#143826" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <h3
                  className="cu-sans"
                  style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#143826" }}
                >
                  Need Instant Answers?
                </h3>
              </div>

              <p
                className="cu-sans"
                style={{
                  margin: "0 0 18px",
                  fontSize: "12.5px",
                  color: "#587060",
                  lineHeight: 1.55,
                }}
              >
                Before sending a message, browse our self-service guides for immediate resolution on orders, shipping zones, and plant health.
              </p>

              {/* Guide rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Shipping & Dispatch Timeframes",
                  "7-Day Plant Guarantee Policy",
                  "Botanical Care Index & Watering Guides",
                ].map((guide) => (
                  <a key={guide} href="#help" className="cu-guide-row">
                    {guide}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

