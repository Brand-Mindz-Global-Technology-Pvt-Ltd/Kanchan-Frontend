import { useState } from "react";
import leafA from "../../assets/about/Component 16.png";
import leafB from "../../assets/about/Component 17.png";
import leafC from "../../assets/about/Component 18.png";
import leafD from "../../assets/about/Component 19.png";
import leafE from "../../assets/about/Component 20.png";
import ContactEdgeLeaves from "./ContactEdgeLeaves";
import { useContactSectionReveal } from "../../hooks/useContactSectionReveal";

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

export default function ContactFaq() {
  const sectionRef = useContactSectionReveal<HTMLElement>("faq");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="cu-sans"
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#EDF5DC",
        isolation: "isolate",
      }}
    >
      <ContactEdgeLeaves />

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
        <div data-contact-faq-heading style={{ textAlign: "center", marginBottom: "36px" }}>
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
                data-contact-faq-item
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
  );
}

