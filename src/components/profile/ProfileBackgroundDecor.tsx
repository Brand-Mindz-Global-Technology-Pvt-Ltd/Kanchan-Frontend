export default function ProfileBackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none"
    >
      {/* Soft warm radial ambient glows for clean, warm cream backdrop */}
      <div className="absolute -top-32 left-1/2 h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#EBF3DE]/55 via-[#F8F2E4]/40 to-transparent blur-3xl" />
      <div className="absolute top-1/4 -left-40 h-[480px] w-[480px] rounded-full bg-[#E8F1DE]/40 blur-3xl" />
      <div className="absolute top-2/3 right-0 h-[520px] w-[520px] rounded-full bg-[#E5EED8]/40 blur-3xl" />

      {/* Gentle Top-Right Flowing Ribbon Wave Accent */}
      <svg
        className="absolute top-0 right-0 w-[55vw] min-w-[320px] max-w-[850px] h-auto opacity-75 pointer-events-none select-none"
        viewBox="0 0 760 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 0C180 80 420 30 580 90C670 120 730 60 760 35V0H0Z"
          fill="url(#topWaveGradMinimal)"
          opacity="0.85"
        />
        <path
          d="M120 0C280 65 480 35 620 75C700 98 740 50 760 30V0H120Z"
          fill="url(#topWaveGradHighlight)"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="topWaveGradMinimal" x1="0" y1="0" x2="760" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A4C78B" stopOpacity="0.45" />
            <stop offset="0.4" stopColor="#C9DCB5" stopOpacity="0.3" />
            <stop offset="1" stopColor="#EBF4DE" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="topWaveGradHighlight" x1="120" y1="0" x2="760" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E0EECA" stopOpacity="0.6" />
            <stop offset="1" stopColor="#F7FBF1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Botanical Bottom Flowing Layered Ribbon Accent */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[120px] sm:h-[150px] lg:h-[180px] pointer-events-none select-none opacity-90"
        viewBox="0 0 1440 180"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Layer 1: Soft sage under-ribbon */}
        <path
          d="M0 110C240 60 520 140 820 90C1100 45 1300 120 1440 90V180H0V110Z"
          fill="url(#bottomRibbonSoft)"
          opacity="0.5"
        />
        {/* Layer 2: Main organic flowing green ribbon */}
        <path
          d="M0 135C280 80 580 165 900 115C1180 70 1360 130 1440 110V180H0V135Z"
          fill="url(#bottomRibbonMain)"
          opacity="0.85"
        />
        {/* Layer 3: Deep forest green base */}
        <path
          d="M0 155C320 110 640 175 960 135C1220 100 1380 145 1440 130V180H0V155Z"
          fill="url(#bottomRibbonDeep)"
          opacity="0.95"
        />
        <defs>
          <linearGradient id="bottomRibbonSoft" x1="0" y1="60" x2="1440" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D5E4AC" stopOpacity="0.7" />
            <stop offset="0.5" stopColor="#B3CF85" stopOpacity="0.6" />
            <stop offset="1" stopColor="#8DAF5F" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="bottomRibbonMain" x1="0" y1="80" x2="1440" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6C9736" />
            <stop offset="0.4" stopColor="#517E2A" />
            <stop offset="0.8" stopColor="#355E1D" />
            <stop offset="1" stopColor="#254A16" />
          </linearGradient>
          <linearGradient id="bottomRibbonDeep" x1="0" y1="100" x2="1440" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#436B21" />
            <stop offset="0.5" stopColor="#2B5218" />
            <stop offset="1" stopColor="#1B3810" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
