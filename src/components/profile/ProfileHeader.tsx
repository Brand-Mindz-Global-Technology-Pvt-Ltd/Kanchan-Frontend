interface ProfileHeaderProps {
  fullName: string;
}

export default function ProfileHeader({ fullName }: ProfileHeaderProps) {
  const firstName = fullName.trim().split(" ")[0] || fullName;

  return (
    <div className="relative mb-2.5 sm:mb-3 flex flex-col md:flex-row md:items-start md:justify-between gap-2.5 sm:gap-3">
      {/* Left: Welcome Title & Subtitle */}
      <div>
        {/* Two green sprout leaves */}
        <div className="flex items-center gap-1 mb-1">
          <svg
            style={{ color: "#163B1C" }}
            className="w-5 h-5 sm:w-5.5 sm:h-5.5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2C8.5 2 6 5 6 9c0 4.5 4 8 6 13 2-5 6-8.5 6-13 0-4-2.5-7-6-7Zm-1 8c-1.5 0-2.5-1.5-2.5-3 1.5 0 2.5 1.5 2.5 3Zm4-1c0 1.5-1 2.5-2.5 2.5 0-1.5 1-2.5 2.5-2.5Z" />
          </svg>
        </div>

        <h1
          style={{ color: "#163B1C" }}
          className="font-serif-heading text-[26px] sm:text-[30px] lg:text-[33px] font-bold tracking-tight leading-tight"
        >
          Welcome Back, {firstName}!
        </h1>
        <p
          style={{ color: "#526A56" }}
          className="font-body-copy text-xs sm:text-[13.5px] mt-0.5"
        >
          Manage your account details and garden activities.
        </p>

        {/* Delicate curved horizontal branch line */}
        <div className="mt-1.5 flex items-center">
          <svg
            style={{ color: "#7FA868" }}
            className="w-40 sm:w-48 h-2 opacity-80"
            viewBox="0 0 240 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5C60 1 180 1 239 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="120" cy="4" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Right: "Green Living Starts Here..." Script */}
      <div className="self-end md:self-start text-right select-none pr-1 sm:pr-2">
        <div className="inline-block relative">
          <span
            className="block text-[23px] sm:text-[26px] lg:text-[28px] font-normal leading-none"
            style={{ fontFamily: "'Playfair Display', Georgia, cursive", fontStyle: "italic", color: "#183D1F" }}
          >
            Green Living
          </span>
          <span
            className="block text-[17px] sm:text-[19px] lg:text-[20px] font-normal tracking-wide mt-0.5"
            style={{ fontFamily: "'Playfair Display', Georgia, cursive", fontStyle: "italic", color: "#1E4D28" }}
          >
            Starts Here...
          </span>

          {/* Underline Flourish */}
          <div className="flex justify-end items-center -mt-0.5">
            <svg
              style={{ color: "#477838" }}
              className="w-24 sm:w-28 h-3.5"
              viewBox="0 0 140 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8C40 2 95 3 125 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M125 10C130 6 136 7 138 10C135 12 129 13 125 10Z"
                fill="currentColor"
              />
              <path
                d="M121 7C124 3 129 3 131 6C128 7 124 8 121 7Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
