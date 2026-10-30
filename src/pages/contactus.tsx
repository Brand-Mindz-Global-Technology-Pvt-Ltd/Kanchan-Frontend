import ContactChannels from "../components/contact/ContactChannels";
import ContactFormSection from "../components/contact/ContactFormSection";
import NurseryLocation from "../components/contact/NurseryLocation";
import ContactFaq from "../components/contact/ContactFaq";
import ContactGreenCommunity from "../components/contact/ContactGreenCommunity";

export default function ContactUs() {
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

      {/* SECTION 2 — REACH US DIRECTLY */}
      <ContactChannels />

      {/* White section separator between Section 2 and Section 3 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 3 — SEND US A MESSAGE */}
      <ContactFormSection />

      {/* White section separator between Section 3 and Section 4 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 4: VISIT OUR BANGALORE NURSERY */}
      <NurseryLocation />

      {/* White section separator between Section 4 and Section 5 */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <ContactFaq />

      {/* White section separator between FAQ Section and Green Community Banner */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />

      {/* SECTION 6: GREEN COMMUNITY BANNER */}
      <ContactGreenCommunity />

      {/* White section separator between Green Community Banner and Footer */}
      <div className="w-full bg-white" style={{ height: "10px" }} aria-hidden="true" />
    </div>
  );
}
