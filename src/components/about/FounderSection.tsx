import founderImg from "../../assets/about/Founder-img.jpeg";
import { useAboutSectionReveal } from "../../hooks/useAboutSectionReveal";
import leafLeft1 from "../../assets/about/leaf/left-1.png";
import leafLeft2 from "../../assets/about/leaf/left-2.png";
import leafRight1 from "../../assets/about/leaf/right-1.png";
import leafRight2 from "../../assets/about/leaf/right-2.png";

const expertiseItems = [
  {
    line1: "Landscape Design &",
    line2: "Development",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <path d="M12 22V11" /><path d="M12 11c0-4 3.5-7 7.5-7 0 4-3 7.5-7.5 7.5Z" />
        <path d="M12 15c0-3.5-3-6-6.5-6 0 3.5 2.5 6 6.5 6Z" />
      </svg>
    ),
  },
  {
    line1: "Terrace & Balcony",
    line2: "Gardens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
  },
  {
    line1: "Indoor & Outdoor",
    line2: "Plant Styling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    line1: "Vertical & Kitchen",
    line2: "Gardens",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h4" />
      </svg>
    ),
  },
  {
    line1: "Corporate Plant Rentals &",
    line2: "Maintenance",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12.01" y2="12" />
      </svg>
    ),
  },
  {
    line1: "Customized Garden Design",
    line2: "& Green-Space Solutions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
];

const bottomCards = [
  {
    label: "My Vision",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6" />
      </svg>
    ),
    text: "To transform ordinary spaces into extraordinary green environments while promoting sustainable living.",
    isQuote: false,
  },
  {
    label: "My Mission",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    text: "To provide innovative, elegant, and customized landscaping solutions for residential, commercial, and corporate spaces.",
    isQuote: false,
  },
  {
    label: "My Belief",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="fs-exp-icon-svg" aria-hidden="true">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    text: "\"Every space has the potential to become a beautiful green paradise.\"",
    isQuote: true,
  },
];

export default function FounderSection() {
  const sectionRef = useAboutSectionReveal<HTMLElement>("founder");

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden font-body-copy"
      style={{ backgroundColor: "#F5F0E0" }}
    >
      <style>{`
        /* ── Icon size ── */
        .fs-exp-icon-svg { width: 18px; height: 18px; }

        /* ── Desktop-only corner leaves (matches other About Us sections) ── */
        .fs-desk-leaves {
          display: none;          /* hidden on mobile + tablet */
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;             /* must be above fs-bottom-zone(2) so bottom leaves show */
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .fs-desk-leaves { display: block; }
        }
        .fs-desk-leaf {
          position: absolute;
          width: clamp(70px, 10vw, 160px); /* identical to AboutEdgeLeaves default */
          height: auto;
          opacity: 0.88;                   /* identical to AboutEdgeLeaves default */
          pointer-events: none;
          user-select: none;
          object-fit: contain;
        }
        /* Same -40px bleed as AboutEdgeLeaves */
        .fs-desk-leaf-tl { top: 0;    left:  -40px; }
        .fs-desk-leaf-tr { top: 0;    right: -40px; }
        .fs-desk-leaf-bl { bottom: 0; left:  -40px; }
        .fs-desk-leaf-br { bottom: 0; right: -40px; }

        /* ── Outer wrapper ── */
        .fs-wrap {
          position: relative;
          z-index: 4;             /* above leaf layer (3) so portrait + content stay on top */
          max-width: 1140px;
          margin: 0 auto;
          padding: 40px 20px 0;
        }
        @media (min-width: 640px)  { .fs-wrap { padding: 48px 32px 0; } }
        @media (min-width: 1024px) { .fs-wrap { padding: 56px 48px 0; } }

        /* ── Two-column hero row ── */
        .fs-hero {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: flex-start;
        }
        @media (min-width: 860px) {
          .fs-hero {
            flex-direction: row;
            align-items: flex-start;
            gap: 40px;
          }
        }

        /* ────────────────────────────────────────
           LEFT: Portrait card with nameplate overlay
           ──────────────────────────────────────── */
        .fs-portrait-wrap {
          position: relative;      /* ← nameplate is absolute inside this */
          flex-shrink: 0;
          width: 100%;
          max-width: 300px;
          margin: 0 auto;
          border-radius: 28px;
          /* overflow:hidden removed — floating pill nameplate must NOT be clipped */
          background: #B5C9A0;
          box-shadow: 0 16px 48px rgba(20,56,38,0.20);
        }
        @media (min-width: 860px) {
          .fs-portrait-wrap {
            width: 300px;
            max-width: 300px;
            margin: 0;
          }
        }
        @media (min-width: 1060px) {
          .fs-portrait-wrap {
            width: 330px;
            max-width: 330px;
          }
        }

        /* Portrait image — tall aspect ratio matching reference */
        .fs-portrait-img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: top center;
          border-radius: 28px; /* clip image corners since wrapper has no overflow:hidden */
        }

        /* Floating pill nameplate — overlaps the LOWER portion of the portrait image */
        .fs-nameplate {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          width: 88%;
          background: rgba(252, 248, 240, 0.93);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 11px 18px 13px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(20,56,38,0.18), 0 1px 4px rgba(20,56,38,0.10);
          border: 1px solid rgba(181, 201, 160, 0.55);
        }
        .fs-nameplate-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px;
          font-weight: 700;
          font-style: italic;
          color: #143826;
          line-height: 1.2;
          margin: 0;
        }
        .fs-nameplate-role {
          margin-top: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #4a7c5e;
          line-height: 1.35;
          margin-bottom: 0;
        }

        /* ────────────────────────────────────────
           RIGHT: Content column
           ──────────────────────────────────────── */
        .fs-content {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* "Our Founder" badge pill */
        .fs-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #143826;
          color: #fff;
          border-radius: 999px;
          padding: 5px 18px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        /* Name heading */
        .fs-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(30px, 4.5vw, 54px);
          font-weight: 800;
          color: #143826;
          line-height: 1.05;
          margin: 0 0 6px;
        }

        /* Italic designation */
        .fs-designation {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(12.5px, 1.3vw, 15.5px);
          font-style: italic;
          font-weight: 600;
          color: #143826;
          margin-bottom: 12px;
          line-height: 1.4;
        }

        /* Thin divider below designation */
        .fs-divider {
          width: 100%;
          max-width: 520px;
          height: 1px;
          background: #C8DEB4;
          margin: 0 auto 12px;
          border-radius: 1px;
        }

        /* Description paragraphs */
        .fs-desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: #2E4A3A;
          max-width: 520px;
          margin: 0 auto 6px;
          text-align: center;
        }

        /* Pull-quote box */
        .fs-quote-box {
          position: relative;
          margin: 12px auto 0;
          max-width: 500px;
          width: 100%;
          background: #DFF0D0;
          border-radius: 14px;
          padding: 12px 20px 12px 46px;
          text-align: left;
        }
        .fs-ql {
          position: absolute;
          left: 10px;
          top: 4px;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 38px;
          font-weight: 900;
          color: #4a7c5e;
          line-height: 1;
          opacity: 0.85;
        }
        .fs-qr {
          display: inline-block;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 900;
          color: #4a7c5e;
          line-height: 1;
          opacity: 0.85;
          vertical-align: bottom;
          margin-left: 2px;
        }
        .fs-quote-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 13.5px;
          font-weight: 600;
          color: #1A4A2E;
          line-height: 1.6;
        }

        /* My Expertise heading with flanking lines */
        .fs-exp-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 520px;
          margin: 16px auto 10px;
        }
        .fs-exp-heading::before,
        .fs-exp-heading::after {
          content: "";
          flex: 1;
          height: 1.5px;
          background: #B5C9A0;
          border-radius: 2px;
        }
        .fs-exp-label {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 15.5px;
          font-weight: 700;
          color: #143826;
          white-space: nowrap;
        }

        /* 3×2 expertise grid — lives inside right column */
        .fs-exp-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 7px;
          width: 100%;
          max-width: 520px;
          margin: 0 auto;
          /* equal row heights across all 6 cards */
          grid-auto-rows: 1fr;
        }
        @media (min-width: 480px) {
          .fs-exp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 860px) {
          .fs-exp-grid { grid-template-columns: repeat(3, 1fr); gap: 7px; }
        }

        .fs-exp-card {
          display: flex;
          align-items: center;     /* icon and text block centred vertically */
          gap: 7px;
          background: #fff;
          border: 1px solid #D4E6C3;
          border-radius: 10px;
          padding: 8px 10px;
          text-align: left;
          transition: box-shadow 0.18s, transform 0.18s;
          /* stretch to fill grid row so all cards share the same height */
          height: 100%;
          box-sizing: border-box;
        }
        .fs-exp-card:hover {
          box-shadow: 0 5px 18px rgba(26,67,36,0.10);
          transform: translateY(-2px);
        }
        .fs-exp-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          min-width: 30px;   /* prevent shrink */
          border-radius: 7px;
          background: #D8EDCB;
          color: #267445;
          flex-shrink: 0;
        }
        .fs-exp-text {
          font-size: 11.5px;
          font-weight: 600;
          color: #1A3D2B;
          line-height: 1.38;
          /* lock to exactly 2 rendered lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          /* respect intentional <br /> breaks without allowing soft wraps to add more lines */
          word-break: break-word;
          overflow-wrap: break-word;
        }

        /* ────────────────────────────────────────
           BOTTOM: Vision / Mission / Belief
           ──────────────────────────────────────── */
        .fs-bottom-zone {
          position: relative;
          z-index: 4;             /* above leaf layer (3); content stays on top */
          background: #EBE6D5;
          margin-top: 3px;
          padding: 22px 20px 0;
        }
        @media (min-width: 640px)  { .fs-bottom-zone { padding: 24px 32px 0; } }
        @media (min-width: 1024px) { .fs-bottom-zone { padding: 28px 48px 0; } }

        .fs-bottom-grid {
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }
        @media (min-width: 640px) {
          .fs-bottom-grid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }

        .fs-bottom-card {
          background: #F5F0E0;
          border: 1px solid #C8DEB4;
          border-radius: 14px;
          padding: 16px 18px 18px;
          text-align: left;
          transition: box-shadow 0.18s, transform 0.18s;
        }
        .fs-bottom-card:hover {
          box-shadow: 0 6px 22px rgba(26,67,36,0.10);
          transform: translateY(-2px);
        }
        .fs-bottom-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .fs-bottom-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #D8EDCB;
          color: #267445;
          flex-shrink: 0;
        }
        .fs-bottom-card-label {
          font-size: 14.5px;
          font-weight: 800;
          color: #143826;
        }
        .fs-bottom-card-text {
          font-size: 13px;
          line-height: 1.68;
          color: #2E4A3A;
        }
        .fs-bottom-card-text.is-quote {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 600;
          color: #1A4A2E;
        }

        /* ── Brand strip ── */
        .fs-brand-strip {
          position: relative;
          z-index: 4;             /* above leaf layer (3); content stays on top */
          background: #EBE6D5;
          padding: 16px 24px 24px;
          text-align: center;
        }
        @media (min-width: 640px) { .fs-brand-strip { padding: 18px 32px 28px; } }

        .fs-brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #143826;
          border-radius: 999px;
          padding: 9px 26px;
          margin-bottom: 10px;
        }
        .fs-brand-pill-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
        }
        .fs-brand-pill-sep {
          color: rgba(255,255,255,0.4);
          font-size: 16px;
          font-weight: 300;
        }
        .fs-brand-pill-tagline {
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.04em;
        }
        .fs-brand-est {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          font-size: 11.5px;
          font-weight: 500;
          color: #4a7c5e;
        }
        .fs-brand-est::before,
        .fs-brand-est::after {
          content: "";
          display: block;
          width: 56px;
          height: 1px;
          background: #B5C9A0;
          border-radius: 1px;
        }
      `}</style>

      {/* ── Desktop-only corner leaf decorations (hidden on mobile + tablet) ── */}
      <div className="fs-desk-leaves" aria-hidden="true">
        {/* Top-left */}
        <img src={leafLeft1} alt="" className="fs-desk-leaf fs-desk-leaf-tl" />
        {/* Top-right */}
        <img src={leafRight1} alt="" className="fs-desk-leaf fs-desk-leaf-tr" />
        {/* Bottom-left */}
        <img src={leafLeft2} alt="" className="fs-desk-leaf fs-desk-leaf-bl" />
        {/* Bottom-right */}
        <img src={leafRight2} alt="" className="fs-desk-leaf fs-desk-leaf-br" />
      </div>

      {/* ── Upper zone: cream background ── */}
      <div className="fs-wrap">
        <div className="fs-hero">

          {/* ── LEFT: Portrait with nameplate absolutely overlaid at bottom ── */}
          <div data-founder-image className="fs-portrait-wrap">
            <img
              src={founderImg}
              alt="S. Kanchana — Founder of Kanchan Garden Boutique"
              className="fs-portrait-img"
            />
            {/* Floating pill nameplate — position:absolute bottom:16px, overlaps lower part of image */}
            <div className="fs-nameplate">
              <p className="fs-nameplate-name">S. Kanchana</p>
              <p className="fs-nameplate-role">Founder &amp; Garden Design Consultant</p>
            </div>
          </div>

          {/* ── RIGHT: Badge, name, designation, description, quote, expertise ── */}
          <div data-founder-details className="fs-content">

            {/* "Our Founder" badge */}
            <div className="fs-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }} aria-hidden="true">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6" />
              </svg>
              Our Founder
            </div>

            {/* Name */}
            <h2 className="fs-name">S. Kanchana</h2>

            {/* Designation */}
            <p className="fs-designation">
              Passionate Entrepreneur&nbsp;•&nbsp;Garden Enthusiast&nbsp;•&nbsp;Design Consultant
            </p>

            {/* Thin divider */}
            <div className="fs-divider" aria-hidden="true" />

            {/* Description */}
            <p className="fs-desc">
              I am S. Kanchana, a passionate Woman Entrepreneur, Gardening Enthusiast,
              Landscape Designer, and Garden Design Consultant based in Chennai.
            </p>
            <p className="fs-desc" style={{ marginTop: "6px" }}>
              I am the proud Founder of Kanchan Garden Boutique, established in 2014,
              with over a decade of experience in landscaping and gardening solutions.
            </p>

            {/* Pull quote */}
            <div className="fs-quote-box">
              <span className="fs-ql">&ldquo;</span>
              <p className="fs-quote-text">
                Every space&nbsp;&nbsp;has the potential
                <br />to become a beautiful green paradise.
                <span className="fs-qr">&rdquo;</span>
              </p>
            </div>

            {/* My Expertise — inside right column */}
            <div className="fs-exp-heading">
              <span className="fs-exp-label">My Expertise</span>
            </div>

            <div data-founder-expertise className="fs-exp-grid">
              {expertiseItems.map((item) => (
                <div key={item.line1} className="fs-exp-card">
                  <span className="fs-exp-icon">{item.icon}</span>
                  <span className="fs-exp-text">
                    {item.line1}<br />{item.line2}
                  </span>
                </div>
              ))}
            </div>

          </div>{/* end fs-content */}
        </div>{/* end fs-hero */}
      </div>{/* end fs-wrap */}

      {/* ── Bottom zone: Vision / Mission / Belief + brand strip ── */}
      <div className="fs-bottom-zone">
        <div data-founder-cards className="fs-bottom-grid">
          {bottomCards.map((card) => (
            <div key={card.label} className="fs-bottom-card">
              <div className="fs-bottom-card-header">
                <span className="fs-bottom-card-icon">{card.icon}</span>
                <span className="fs-bottom-card-label">{card.label}</span>
              </div>
              <p className={`fs-bottom-card-text${card.isQuote ? " is-quote" : ""}`}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div data-founder-strip className="fs-brand-strip">
        <div className="fs-brand-pill">
          <span className="fs-brand-pill-name">Kanchan Garden Boutique</span>
          <span className="fs-brand-pill-sep">|</span>
          <span className="fs-brand-pill-tagline">Grow Green • Live Clean</span>
        </div>
        <div className="fs-brand-est">
          Established in 2014&nbsp;|&nbsp;12 Years of Entrepreneurial Excellence
        </div>
      </div>

    </section>
  );
}
