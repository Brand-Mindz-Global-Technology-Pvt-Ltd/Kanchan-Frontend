import greenCardBg from "../../assets/profile/green-bg.png";

interface ProfileLeftCardProps {
  fullName: string;
  enthusiastTitle: string;
  membershipBadge: string;
  quote: string;
}

export default function ProfileLeftCard({
  fullName,
  enthusiastTitle,
  membershipBadge,
  quote,
}: ProfileLeftCardProps) {
  return (
    <div className="w-full flex justify-center lg:justify-start items-start">
      {/* Responsive left-margin style: -20px on desktop (20px further left), 0px on mobile */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&family=Caveat:wght@500;600;700&display=swap');
        @media (min-width: 1024px) {
          #profile-left-card-container {
            margin-left: -20px !important;
          }
        }
        @media (max-width: 1023px) {
          #profile-left-card-container {
            margin-left: 0px !important;
          }
        }
      `}</style>

      {/* 
        Container with Width: 350px, Height: 500px.
        Positioned 20px further left on desktop via margin-left: -20px.
        width: min(350px, 100%) prevents horizontal overflow on mobile viewports.
      */}
      <div
        id="profile-left-card-container"
        style={{
          width: "min(350px, 100%)",
          maxWidth: "350px",
          height: "500px",
          flexShrink: 0,
          flexGrow: 0,
        }}
        className="relative select-none"
      >
        <img
          id="profile-green-bg-img"
          src={greenCardBg}
          alt="Profile Background"
          style={{
            width: "100%",
            maxWidth: "350px",
            height: "500px",
            objectFit: "contain",
            objectPosition: "left center",
            display: "block",
            flexShrink: 0,
          }}
          className="select-none pointer-events-none drop-shadow-[0_12px_28px_rgba(7,40,22,0.24)]"
        />

        {/* 
          Overlaid Content:
          Preserved exact internal avatar and text positioning.
        */}
        <div
          className="absolute top-0 left-0 z-10 flex flex-col items-center text-center justify-between pointer-events-none"
          style={{
            padding: "40px 14px 50px 14px",
            width: "min(246px, 100%)",
            height: "500px",
            boxSizing: "border-box",
          }}
        >
          {/* Upper Details Group */}
          <div
            className="flex flex-col items-center w-full"
            style={{ transform: "translateY(25px)" }}
          >
            {/* Circular profile avatar with golden border */}
            <div
              className="relative rounded-full bg-gradient-to-b from-[#F5DE91] via-[#D8AC43] to-[#8D6B1D] shadow-[0_2.5px_10px_rgba(226,190,88,0.3)] flex items-center justify-center shrink-0"
              style={{
                width: "80px",
                height: "80px",
                padding: "1.8px",
              }}
            >
              <div
                className="w-full h-full rounded-full bg-[#0F3722] flex items-center justify-center"
                style={{ padding: "1.8px" }}
              >
                <div className="w-full h-full rounded-full bg-[#FAF7EF] flex items-center justify-center shadow-inner">
                  {/* Silhouette Avatar Icon */}
                  <svg
                    style={{ width: "40px", height: "40px" }}
                    className="text-[#0F3822]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="7.5" r="4" />
                    <path d="M4 19.5c0-4.2 3.6-7.5 8-7.5s8 3.3 8 7.5v.5H4v-.5Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Customer Name */}
            <h2
              className="font-serif-heading font-bold text-white tracking-wide leading-tight"
              style={{
                fontSize: "22px",
                marginTop: "10px",
              }}
            >
              {fullName}
            </h2>

            {/* Green Enthusiast Subtitle */}
            <p
              className="text-[#A5D6B7] tracking-wider font-normal leading-tight"
              style={{
                fontSize: "14px",
                marginTop: "4px",
                fontStyle: "italic",
              }}
            >
              {enthusiastTitle}
            </p>

            {/* Delicate divider rule with diamond center */}
            <div
              className="flex items-center justify-center gap-1"
              style={{
                width: "110px",
                margin: "8px 0",
              }}
            >
              <div className="h-[0.75px] flex-1 bg-gradient-to-r from-transparent via-[#E2BE58]/40 to-[#E2BE58]/70" />
              <span
                className="text-[#E2BE58] leading-none"
                style={{ fontSize: "7px" }}
              >
                ♦
              </span>
              <div className="h-[0.75px] flex-1 bg-gradient-to-l from-transparent via-[#E2BE58]/40 to-[#E2BE58]/70" />
            </div>

            {/* "Green Guardian Member" Badge */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF7EF] shadow-[0_1px_5px_rgba(0,0,0,0.12)] border border-[#EBE4D5]"
              style={{
                padding: "4px 12px",
                maxWidth: "200px",
              }}
            >
              <span
                className="flex items-center justify-center rounded-full bg-[#06452E] text-white shrink-0"
                style={{ width: "16px", height: "16px" }}
              >
                <svg
                  style={{ width: "11px", height: "11px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span
                className="font-semibold text-[#06452E] tracking-tight whitespace-nowrap leading-none"
                style={{ fontSize: "12px" }}
              >
                {membershipBadge}
              </span>
            </div>
          </div>

          {/* Bottom Quote: "Let's grow a greener tomorrow" */}
          <div className="w-full px-2" style={{ marginBottom: "64px" }}>
            <p
              className="font-normal tracking-wide leading-tight text-center"
              style={{
                fontFamily: "'Dancing Script', 'Caveat', 'Playfair Display', Georgia, cursive",
                fontStyle: "italic",
                fontSize: "18.75px",
                color: "#FFFFFF",
                textShadow: "0 1px 3px rgba(0, 0, 0, 0.45)",
                transform: "translateY(-20px)",
                maxWidth: "175px",
                margin: "0 auto",
              }}
            >
              {quote === "Let's grow a greener tomorrow" ? (
                <>
                  Let's grow
                  <br />
                  a greener tomorrow
                </>
              ) : (
                quote
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
