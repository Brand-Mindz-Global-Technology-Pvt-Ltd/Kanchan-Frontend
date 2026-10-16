import React, { useState } from "react";
import BangaloreNurseryMap from "../components/BangaloreNurseryMap";
import leafA from "../assets/about/Component 16.png";
import leafB from "../assets/about/Component 17.png";
import leafC from "../assets/about/Component 18.png";
import leafD from "../assets/about/Component 19.png";
import leafE from "../assets/about/Component 20.png";
import greenhouse from "../assets/about/greenhouse.png";

// Botanical outline leaf SVG — matches the Figma green leaf outlines in the section background
function BotanicalLeaf({
  style,
  width = 90,
  opacity = 1,
  rotate = 0,
}: {
  style?: React.CSSProperties;
  width?: number;
  opacity?: number;
  rotate?: number;
}) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        userSelect: "none",
        width: `${width}px`,
        height: `${Math.round(width * 1.35)}px`,
        opacity,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* stem */}
      <path
        d="M60 148 L60 18"
        stroke="#BECFAA"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* leaf outline */}
      <path
        d="M60 138 C18 98 14 38 60 18 C106 38 102 98 60 138 Z"
        stroke="#BECFAA"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* mid-vein */}
      <path
        d="M60 138 L60 40"
        stroke="#BECFAA"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export default function ContactUs() {
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: "What types of plants are available at Kanchan Garden?",
      a: "We curate a wide selection of indoor air-purifying foliage, flowering ornamentals, rare exotic succulents, table bonsai, and outdoor landscape varieties—all ethically cultivated in our Bangalore greenhouses.",
    },
    {
      q: "How do I choose the right plant for my home?",
      a: "Start by evaluating your available sunlight (direct, bright indirect, or low light) and your typical watering routine. Each plant on our site features clear light and water tags, and our nursery specialists are always happy to recommend options suited to your space.",
    },
    {
      q: "How should I care for my newly purchased plants?",
      a: "Give your plant 3 to 5 days to acclimate to its new environment before repotting. Keep it away from AC draft vents or extreme afternoon heat, and follow the included botanical care guide for watering instructions.",
    },
    {
      q: "Do you provide gardening supplies and organic fertilizers?",
      a: "Yes! We formulate our own nutrient-rich organic potting mixes, vermicompost, slow-release bio-fertilizers, neem cake, and offer handcrafted terracotta pots and precision pruning tools.",
    },
    {
      q: "How can I track my order?",
      a: "As soon as your plant companion is carefully packaged in our eco-friendly, shock-proof containers and leaves our nursery, you will receive a tracking link via SMS and email with live delivery updates.",
    },
    {
      q: "What should I do if my plant arrives damaged?",
      a: "We back every order with our 7-Day Transit Guarantee. If your plant arrives stressed, damaged, or unhealthy, simply snap a picture and reach out within 48 hours—we will replace it promptly with zero hassle.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: "100%", color: "#143826" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .cu-serif { font-family: 'Playfair Display', Georgia, serif; }
        .cu-sans  { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }

        /* ── Section 2 container ── */
        .cu-sec2-wrap {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 52px 32px 56px;
        }
        .cu-cards-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .cu-cards-row { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 960px) {
          .cu-cards-row { grid-template-columns: repeat(4, 1fr); gap: 18px; }
        }

        /* ── Section 3 container ── */
        .cu-sec3-wrap {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 32px 56px;
        }
        .cu-sec3-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: stretch;
        }
        @media (min-width: 960px) {
          .cu-sec3-grid {
            grid-template-columns: 1.42fr 1fr;
            gap: 40px;
            align-items: stretch;
          }
        }

        /* ── Form inputs ── */
        .cu-input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          border: 1.5px solid #D2DEC9;
          border-radius: 10px;
          background: #fff;
          padding: 10px 14px;
          font-size: 13px;
          color: #143826;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          outline: none;
          transition: border-color 0.15s;
        }
        .cu-input::placeholder { color: #A8BBA4; }
        .cu-input:focus { border-color: #143826; }
        .cu-label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #143826;
          margin-bottom: 6px;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        .cu-field { margin-bottom: 16px; }

        /* ── Instant Answers guide rows ── */
        .cu-guide-row {
          display: block;
          width: 100%;
          box-sizing: border-box;
          padding: 13px 18px;
          border: 1.5px solid #DDE9D4;
          border-radius: 10px;
          background: #fff;
          font-size: 13px;
          font-weight: 600;
          color: #143826;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          text-decoration: none;
          transition: background 0.12s;
          cursor: pointer;
        }
        .cu-guide-row:hover { background: #F4F9EE; }
      `}</style>

      {/* White section separator before Section 2 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2 — REACH US DIRECTLY
          ═══════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#FCFAF4", width: "100%" }}>
        <div className="cu-sec2-wrap">
          {/* heading */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
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

      {/* White section separator between Section 2 and Section 3 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — SEND US A MESSAGE
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          backgroundColor: "#EDF5DC",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
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

        <div className="cu-sec3-wrap">
          <div className="cu-sec3-grid">

            {/* ────────────────────────────────────────
                LEFT: Contact Form Card
                ──────────────────────────────────────── */}
            <div
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "36px 36px 32px",
                boxShadow: "0 6px 30px rgba(20,56,35,0.07)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* GET IN TOUCH label */}
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
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
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
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
                  <div style={{ marginBottom: "16px" }}>
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
                  <div style={{ marginBottom: "18px" }}>
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
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "22px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", zIndex: 1, height: "100%" }}>

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

      {/* White section separator between Section 3 and Section 4 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: VISIT OUR BANGALORE NURSERY
          Exact Figma Layout & Dimensions
          ═══════════════════════════════════════════════════════ */}
      <section
        className="w-full font-body-copy"
        style={{ backgroundColor: "#FCFAF4" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 py-9 sm:px-8 sm:py-10">
          {/* Centered Heading Group */}
          <div style={{ textAlign: "center", marginBottom: "22px" }}>
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

      {/* White section separator between Section 4 and Section 5 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: FREQUENTLY ASKED QUESTIONS
          Exact Figma Layout & Dimensions with Interactive Accordion
          ═══════════════════════════════════════════════════════ */}
      <section
        className="cu-sans"
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#EDF5DC",
          isolation: "isolate",
        }}
      >
        {/* Decorative leaf images — behind all content */}
        <img
          src={leafA}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", pointerEvents: "none", userSelect: "none", width: 72, top: "6%", left: 20, opacity: 1 }}
        />
        <img
          src={leafE}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", pointerEvents: "none", userSelect: "none", width: 84, top: "4%", right: 16, opacity: 1 }}
        />
        <img
          src={leafC}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", pointerEvents: "none", userSelect: "none", width: 92, top: "38%", right: -14, opacity: 1 }}
        />
        <img
          src={leafD}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", pointerEvents: "none", userSelect: "none", width: 76, bottom: "10%", left: 14, opacity: 1 }}
        />
        <img
          src={leafB}
          alt=""
          aria-hidden="true"
          style={{ position: "absolute", pointerEvents: "none", userSelect: "none", width: 66, top: "44%", left: -10, opacity: 1 }}
        />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "720px", margin: "0 auto", padding: "48px 24px 56px" }}>
          {/* Centered Heading Group */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#3d6d4a",
                textTransform: "uppercase",
              }}
            >
              PLANT CARE, MADE SIMPLE
            </span>
            <h2
              className="cu-serif"
              style={{
                margin: "8px auto 0",
                fontSize: "clamp(26px, 3.2vw, 36px)",
                fontWeight: 700,
                lineHeight: 1.2,
                color: "#143826",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              style={{
                margin: "8px auto 0",
                maxWidth: "500px",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#4a5d4e",
              }}
            >
              Everything you need to know about choosing and caring for your plants.
            </p>
          </div>

          {/* FAQ Accordion Container */}
          <div
            style={{
              overflow: "hidden",
              borderRadius: "16px",
              backgroundColor: "#FFFFFF",
              boxShadow: "0 4px 24px rgba(20,56,35,0.07)",
            }}
          >
            {faqItems.map((item, i, arr) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  style={{
                    borderBottom:
                      i < arr.length - 1 ? "1px solid #EDF5E8" : "none",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "18px 26px",
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      outline: "none",
                      transition: "background-color 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FBFDF8")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    aria-expanded={isOpen}
                  >
                    <span
                      style={{
                        paddingRight: "16px",
                        fontSize: "13.5px",
                        fontWeight: 600,
                        color: "#143826",
                      }}
                    >
                      {item.q}
                    </span>
                    {/* Outlined leaf icon on the right with smooth rotate animation */}
                    <img
                      src={leafD}
                      alt=""
                      aria-hidden="true"
                      style={{
                        width: 20,
                        height: 20,
                        flexShrink: 0,
                        opacity: isOpen ? 1 : 0.6,
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                    />
                  </button>

                  {/* Expandable answer panel */}
                  <div
                    style={{
                      maxHeight: isOpen ? "350px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "0 26px 20px",
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "#4a5d4e",
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* White section separator between FAQ Section and Green Community Banner */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: GREEN COMMUNITY BANNER
          Exact Figma Layout & Dimensions
          ═══════════════════════════════════════════════════════ */}
      <section
        className="cu-sans"
        style={{ backgroundColor: "#F5F0E8", width: "100%" }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "44px 24px" }}>
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

              {/* Eyebrow */}
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

              {/* Subtitle */}
              <p
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

      {/* White section separator between Green Community Banner and Footer */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />
    </div>
  );
}
