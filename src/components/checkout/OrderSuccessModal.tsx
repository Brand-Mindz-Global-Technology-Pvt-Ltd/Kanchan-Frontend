import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import potMascot from "../../assets/succuss/pot-img.png";

export interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
  onViewOrders?: () => void;
  totalAmount?: number;
  itemCount?: number;
  isViewOrderDisabled?: boolean;
}

interface Particle {
  id: number;
  type: "ribbon" | "circle" | "sparkle" | "leaf";
  color: string;
  left: number;
  top: number;
  tx: number;
  ty: number;
  rot: number;
  size: number;
  delay: number;
  dur: number;
}

export default function OrderSuccessModal({
  isOpen,
  orderId,
  onClose,
  onViewOrders,
  totalAmount,
  itemCount,
  isViewOrderDisabled = true,
}: OrderSuccessModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key and lock background body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while modal is open and prevent layout jump
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, onClose]);

  // Generate lightweight deterministic confetti particles
  const particles = useMemo<Particle[]>(() => {
    const colors = [
      "#06452E", // Kanchan Deep Forest Green
      "#1E824C", // Emerald
      "#E2C044", // Warm Golden
      "#F39C12", // Amber
      "#F28482", // Blossom Coral
      "#84A98C", // Sage Green
      "#D4E79E", // Fresh Sprout
      "#FFFFFF", // Pure Sparkle
    ];

    const types: Particle["type"][] = ["ribbon", "circle", "sparkle", "leaf"];

    const list: Particle[] = [];
    for (let i = 0; i < 36; i++) {
      const angle = (i / 36) * 2 * Math.PI + Math.sin(i * 1.5) * 0.3;
      const distance = 90 + (i % 5) * 35;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 30;

      list.push({
        id: i,
        type: types[i % types.length],
        color: colors[i % colors.length],
        left: 50,
        top: 26,
        tx,
        ty,
        rot: (i * 47) % 360,
        size: 7 + (i % 5) * 2,
        delay: (i % 6) * 0.05,
        dur: 1.1 + (i % 4) * 0.25,
      });
    }
    return list;
  }, []);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  const modalNode = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-congratulations-title"
      className="fixed inset-0 flex items-center justify-center p-3.5 sm:p-5 overflow-x-hidden overflow-y-auto"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        minHeight: "100vh",
        minHeight: "100dvh",
      }}
    >
      {/* Scoped CSS animations */}
      <style>{`
        @keyframes modalOverlayFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes modalCardPop {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          70% {
            opacity: 1;
            transform: scale(1.01) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes mascotJoyBounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-6px) rotate(-1.5deg);
          }
          75% {
            transform: translateY(-3px) rotate(1.5deg);
          }
        }
        @keyframes confettiShoot {
          0% {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(0.4) rotate(0deg);
          }
          75% {
            opacity: 0.95;
          }
          100% {
            opacity: 0;
            transform: translate3d(var(--tx), var(--ty), 0) scale(1) rotate(var(--rot));
          }
        }
        @keyframes sparklePulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.25); opacity: 1; }
        }
        .animate-modal-pop {
          animation: modalCardPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-mascot-joy {
          animation: mascotJoyBounce 3.2s ease-in-out infinite;
        }
        .animate-sparkle-pulse {
          animation: sparklePulse 2s ease-in-out infinite;
        }
        .modal-custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .modal-custom-scroll::-webkit-scrollbar-track {
          background: #FAF4E8;
          border-radius: 9999px;
        }
        .modal-custom-scroll::-webkit-scrollbar-thumb {
          background: #C4D7C4;
          border-radius: 9999px;
        }
        .modal-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #06452E;
        }
      `}</style>

      {/* 2, 3. Full-Screen Dark Translucent Backdrop with Blur */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundColor: "rgba(6, 36, 23, 0.82)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          animation: "modalOverlayFade 0.3s ease-out forwards",
        }}
        className="fixed inset-0 cursor-pointer"
        aria-hidden="true"
      />

      {/* 4, 6. Main Centered Modal Card */}
      <div
        className="animate-modal-pop relative z-10 w-full max-w-[460px] my-auto flex flex-col rounded-[24px] border-[2px] border-[#3D7856] text-center select-none shadow-[0_20px_50px_-10px_rgba(20,65,40,0.34),0_10px_25px_-5px_rgba(35,80,52,0.22),0_0_20px_rgba(61,120,86,0.16)] bg-[#FAF4E8]"
        style={{
          maxHeight: "calc(100vh - 32px)",
          backgroundImage: "radial-gradient(ellipse at 50% 0%, #FFFDF8 0%, #FAF3E6 100%)",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Inner Cream/Golden Border Effect */}
        <div
          className="pointer-events-none absolute inset-[3px] rounded-[21px] border border-[#DFCA95]/65 shadow-[inset_0_0_6px_rgba(223,202,149,0.22)] z-20"
          aria-hidden="true"
        />

        {/* Tiny Decorative Leaf Accents Near Corners */}
        {/* Top-Left Corner Leaf Accent */}
        <div className="pointer-events-none absolute top-2.5 left-2.5 z-30 text-[#3D7856] opacity-75" aria-hidden="true">
          <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
          </svg>
        </div>

        {/* Top-Right Accent (next to close button) */}
        <div className="pointer-events-none absolute top-2.5 right-13 sm:right-14 z-30 text-[#3D7856] opacity-70" aria-hidden="true">
          <svg className="w-3.5 h-3.5 rotate-45" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
          </svg>
        </div>

        {/* Bottom-Left Corner Leaf Accent */}
        <div className="pointer-events-none absolute bottom-2.5 left-2.5 z-30 text-[#3D7856] opacity-75" aria-hidden="true">
          <svg className="w-4 h-4 -rotate-135" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
          </svg>
        </div>

        {/* Bottom-Right Corner Leaf Accent */}
        <div className="pointer-events-none absolute bottom-2.5 right-2.5 z-30 text-[#3D7856] opacity-75" aria-hidden="true">
          <svg className="w-4 h-4 rotate-135" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
          </svg>
        </div>

        {/* 6. Clearly visible circular Close (X) button at Top-Right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close celebration popup"
          className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-50 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#FAF4E8] hover:bg-[#EAF4E8] text-[#06452E] border-[1.5px] border-[#3D7856] shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
        >
          <svg
            className="h-4 w-4 pointer-events-none"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Interior Container */}
        <div className="modal-custom-scroll relative z-10 flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 overscroll-contain">
          {/* Confetti Explosion Layer */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {particles.map((p) => {
              const style: React.CSSProperties = {
                position: "absolute",
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size}px`,
                height: p.type === "ribbon" ? `${p.size * 1.8}px` : `${p.size}px`,
                backgroundColor: p.type === "sparkle" ? "transparent" : p.color,
                borderRadius:
                  p.type === "circle"
                    ? "50%"
                    : p.type === "leaf"
                    ? "0 70% 0 70%"
                    : p.type === "ribbon"
                    ? "2px"
                    : "0",
                ["--tx" as any]: `${p.tx}px`,
                ["--ty" as any]: `${p.ty}px`,
                ["--rot" as any]: `${p.rot}deg`,
                animation: `confettiShoot ${p.dur}s cubic-bezier(0.12, 0.8, 0.32, 1) ${p.delay}s forwards`,
              };

              return (
                <span key={p.id} style={style} aria-hidden="true">
                  {p.type === "sparkle" && (
                    <span
                      style={{ color: p.color, fontSize: `${p.size * 1.2}px`, lineHeight: 1 }}
                      className="block"
                    >
                      ✦
                    </span>
                  )}
                </span>
              );
            })}
          </div>

          {/* Botanical Top Flourish Ornament */}
          <div className="pointer-events-none flex items-center justify-center gap-1.5 mb-1 opacity-80" aria-hidden="true">
            <svg className="w-4 h-4 text-[#356B22]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
            </svg>
            <span className="text-[#6C8D65] text-[11px] sm:text-xs font-serif italic tracking-wide">
              Kanchan Garden Nursery
            </span>
            <svg className="w-4 h-4 text-[#356B22] -scale-x-100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8Z" />
            </svg>
          </div>

          {/* Central Flower Pot Mascot with Radiant Botanical Halo */}
          <div className="relative mx-auto my-1 sm:my-2 flex items-center justify-center">
            {/* Luminous Warm Botanical Halo */}
            <div
              className="absolute h-32 w-32 sm:h-40 sm:w-40 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(214, 235, 185, 0.75) 0%, rgba(240, 248, 230, 0.3) 55%, transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Sparkle Badges Floating Around Mascot */}
            <span
              className="animate-sparkle-pulse absolute -top-1 left-8 sm:left-12 text-[#E2B734] text-base select-none pointer-events-none"
              aria-hidden="true"
            >
              ✨
            </span>
            <span
              className="animate-sparkle-pulse absolute top-5 right-8 sm:right-12 text-[#E2B734] text-sm select-none pointer-events-none"
              style={{ animationDelay: "0.7s" }}
              aria-hidden="true"
            >
              ✨
            </span>
            <span
              className="absolute bottom-1 left-10 text-sm select-none pointer-events-none"
              aria-hidden="true"
            >
              🌱
            </span>

            {/* Flower Pot Mascot Image */}
            <img
              src={potMascot}
              alt="Celebration Flower Pot Mascot"
              className="animate-mascot-joy relative z-10 h-28 w-auto sm:h-36 object-contain drop-shadow-[0_10px_16px_rgba(6,69,46,0.18)]"
            />
          </div>

          {/* Text Group */}
          <div className="relative z-10 mt-1">
            {/* Heading */}
            <h2
              id="modal-congratulations-title"
              className="font-serif-heading text-[25px] sm:text-[30px] font-bold text-[#06452E] tracking-tight leading-tight"
            >
              Congratulations!
            </h2>

            {/* Order Success Title */}
            <p className="mt-1 text-[14px] sm:text-[16px] font-bold text-[#143826] leading-snug">
              Your Order Has Been Placed Successfully!
            </p>

            {/* Subtitle */}
            <p
              className="mt-1 text-[12.5px] sm:text-[13.5px] text-[#526E58] font-medium italic"
              style={{ fontFamily: "'Playfair Display', Georgia, cursive" }}
            >
              A little happiness is growing your way!
            </p>
          </div>

          {/* Order Details Reference Box */}
          <div className="relative z-10 mt-3.5 sm:mt-4 rounded-[16px] sm:rounded-[18px] bg-[#F5EEDC] border border-[#DFCFAE] p-3 sm:px-4 sm:py-3 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#667E6B] block">
                  Order Reference Number
                </span>
                <span className="font-mono text-[14px] sm:text-[15.5px] font-bold text-[#06452E] tracking-wide mt-0.5 block">
                  #{orderId}
                </span>
              </div>

              {/* Live Confirmed Status Pill */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F2DE] border border-[#B9DCAC] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10.5px] sm:text-[11px] font-semibold text-[#185E28]">
                <span className="h-2 w-2 rounded-full bg-[#2E9B48] animate-pulse" />
                <span>Confirmed • Growing</span>
              </div>
            </div>

            {(totalAmount !== undefined || itemCount !== undefined) && (
              <div className="mt-2 pt-2 border-t border-[#E8DDCA] flex items-center justify-between text-[11px] sm:text-[11.5px] text-[#4F6A57]">
                <span>
                  {itemCount ? `${itemCount} Botanical Item${itemCount > 1 ? "s" : ""}` : "Live Specimens"}
                </span>
                {totalAmount !== undefined && (
                  <span className="font-bold text-[#06452E] text-[12.5px] sm:text-[13px]">
                    Total: ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 mt-4 sm:mt-5 flex flex-col gap-2">
            {/* Primary Action: View Order (Temporarily Disabled) */}
            <button
              type="button"
              disabled={isViewOrderDisabled}
              aria-disabled={isViewOrderDisabled ? "true" : undefined}
              tabIndex={isViewOrderDisabled ? -1 : 0}
              onClick={(e) => {
                if (isViewOrderDisabled) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                onViewOrders?.();
              }}
              title={isViewOrderDisabled ? "Order viewing is temporarily unavailable" : "View Order"}
              className={`flex h-11 sm:h-12 w-full items-center justify-center gap-2 rounded-[14px] px-5 text-[13px] sm:text-[14px] font-bold transition-all ${
                isViewOrderDisabled
                  ? "bg-[#06452E]/60 text-white/75 cursor-not-allowed select-none shadow-none"
                  : "bg-[#06452E] text-white cursor-pointer shadow-[0_4px_16px_rgba(6,69,46,0.3)] hover:bg-[#043623] hover:shadow-[0_6px_20px_rgba(6,69,46,0.38)] active:scale-[0.98]"
              }`}
            >
              <span>View Order</span>
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            {/* Secondary Close / Continue Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-full py-1 text-center text-[12px] sm:text-[13px] font-semibold text-[#526E58] hover:text-[#06452E] transition-colors cursor-pointer"
            >
              Continue Browsing Plants &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // 1. Render using React createPortal directly into document.body
  return createPortal(modalNode, document.body);
}
