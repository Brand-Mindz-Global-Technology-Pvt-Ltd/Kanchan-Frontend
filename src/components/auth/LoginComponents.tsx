import type { ChangeEvent, ReactNode } from "react";
import leftBorder from "../../assets/auth/left-boder.png";
import rightBorder from "../../assets/auth/right-boder.png";
import BotanicalLeaf from "../about/BotanicalLeaf";

// ==========================================
// 1. Types & Interfaces
// ==========================================

export interface BenefitCardData {
  id: string;
  title: string;
  subtitle: string;
  iconType: "check" | "avatars";
}

export interface AuthInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: ReactNode;
  rightElement?: ReactNode;
  headerAction?: ReactNode;
  inputClassName?: string;
  containerClassName?: string;
  labelClassName?: string;
}

// ==========================================
// 2. Reusable Benefit Card (Left Image Panel)
// ==========================================

export function LoginBenefitCard({
  card,
  compact = false,
  className = "",
}: {
  card: BenefitCardData;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center border border-white/25 bg-black/25 backdrop-blur-md transition-all duration-200 hover:bg-black/30 ${
        compact
          ? "gap-2.5 rounded-[14px] p-2 sm:p-2.5"
          : "gap-3.5 rounded-[18px] p-3.5 sm:p-4"
      } ${className}`}
    >
      {/* Icon Branch */}
      {card.iconType === "check" ? (
        <div
          className={`flex shrink-0 items-center justify-center rounded-full bg-[#205139]/80 text-[#7BE495] shadow-inner ring-1 ring-white/30 ${
            compact ? "h-7 w-7" : "h-10 w-10"
          }`}
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={compact ? "h-4 w-4" : "h-5 w-5"}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <div className={`flex shrink-0 ${compact ? "-space-x-1.5" : "-space-x-2"}`}>
          {/* Avatar 1: Sprout */}
          <div
            className={`flex items-center justify-center rounded-full bg-[#E8F5E9] shadow-xs ring-2 ring-white/60 ${
              compact ? "h-6.5 w-6.5 text-[11px]" : "h-8 w-8 text-[13px]"
            }`}
          >
            🌱
          </div>
          {/* Avatar 2: Leaf */}
          <div
            className={`flex items-center justify-center rounded-full bg-[#C8E6C9] shadow-xs ring-2 ring-white/60 ${
              compact ? "h-6.5 w-6.5 text-[11px]" : "h-8 w-8 text-[13px]"
            }`}
          >
            🌿
          </div>
          {/* Avatar 3: Flower */}
          <div
            className={`flex items-center justify-center rounded-full bg-[#FFE0B2] shadow-xs ring-2 ring-white/60 ${
              compact ? "h-6.5 w-6.5 text-[11px]" : "h-8 w-8 text-[13px]"
            }`}
          >
            🌸
          </div>
        </div>
      )}

      {/* Copy */}
      <div className="min-w-0 flex-1">
        <h3
          className={`font-bold text-white ${
            compact
              ? "text-[12px] leading-tight sm:text-[12.5px]"
              : "text-[13.5px] sm:text-[14px]"
          }`}
        >
          {card.title}
        </h3>
        <p
          className={`mt-0.5 leading-snug text-white/80 ${
            compact
              ? "text-[10px] sm:text-[10.5px]"
              : "text-[11.5px] sm:text-[12px]"
          }`}
        >
          {card.subtitle}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 3. Reusable Form Input Field
// ==========================================

export function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  icon,
  rightElement,
  headerAction,
  inputClassName = "h-11",
  containerClassName = "space-y-1.5",
  labelClassName = "text-[11px] font-bold uppercase tracking-wider text-[#355240]",
}: AuthInputProps) {
  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={labelClassName}
        >
          {label} {required && <span className="text-[#D32F2F]">*</span>}
        </label>
        {headerAction}
      </div>

      <div className="relative flex items-center">
        {icon && (
          <div className="pointer-events-none absolute left-3.5 flex items-center text-[#88998D]">
            {icon}
          </div>
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-[12px] border border-[#D5E0D5] bg-white text-[13.5px] text-[#18382B] shadow-2xs transition placeholder:text-[#9FB1A3] focus:border-[#06452E] focus:outline-hidden focus:ring-2 focus:ring-[#06452E]/15 ${inputClassName} ${
            icon ? "pl-10" : "pl-3.5"
          } ${rightElement ? "pr-11" : "pr-3.5"}`}
        />

        {rightElement && (
          <div className="absolute right-3.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. Google Sign In Button
// ==========================================

export function GoogleSignInButton({
  onClick,
  className = "h-11",
}: {
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-[12px] border border-[#D5E0D5] bg-white text-[13.5px] font-semibold text-[#18382B] shadow-2xs transition-all duration-200 hover:bg-[#F9FAF8] hover:shadow-xs active:scale-[0.98] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
      <span>Continue with Google</span>
    </button>
  );
}

// ==========================================
// 5. Auth Background Decorative Borders
// ==========================================

export function AuthBackgroundBorders() {
  return (
    <>
      {/* LEFT BORDER IMAGE */}
      <img
        src={leftBorder}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-0 hidden h-full w-auto max-w-[20vw] select-none object-cover object-left md:block lg:max-w-[240px] xl:max-w-[288px]"
        aria-hidden="true"
      />

      {/* RIGHT BORDER IMAGE */}
      <img
        src={rightBorder}
        alt=""
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-0 hidden h-full w-auto max-w-[20vw] select-none object-cover object-right md:block lg:max-w-[240px] xl:max-w-[307px]"
        aria-hidden="true"
      />
    </>
  );
}

// ==========================================
// 6. Floating Botanical Outline Leaves
// ==========================================

export function AuthLeafDecors() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Top Left Leaf */}
      <BotanicalLeaf
        className="w-16 opacity-35 sm:w-20"
        style={{ top: "3%", left: "18%", transform: "rotate(-25deg)" }}
      />
      {/* Top Middle Leaf */}
      <BotanicalLeaf
        className="w-14 opacity-30 sm:w-18"
        style={{ top: "4%", left: "54%", transform: "rotate(30deg)" }}
      />
      {/* Top Right Leaf */}
      <BotanicalLeaf
        className="w-16 opacity-35 sm:w-22"
        style={{ top: "6%", right: "20%", transform: "rotate(15deg)" }}
      />
      {/* Middle Left Leaf */}
      <BotanicalLeaf
        className="w-18 opacity-25 sm:w-24"
        style={{ top: "45%", left: "12%", transform: "rotate(-40deg)" }}
      />
      {/* Middle Right Leaf (Inside/Near card corner watermark) */}
      <BotanicalLeaf
        className="w-16 opacity-30 sm:w-20"
        style={{ top: "25%", right: "12%", transform: "rotate(25deg)" }}
      />
      {/* Bottom Center Leaf */}
      <BotanicalLeaf
        className="w-16 opacity-35 sm:w-22"
        style={{ bottom: "2%", left: "48%", transform: "rotate(-15deg)" }}
      />
    </div>
  );
}

