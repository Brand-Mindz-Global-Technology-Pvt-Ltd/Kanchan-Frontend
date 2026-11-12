import { useState, type FormEvent } from "react";
import regImg from "../assets/auth/reg-img.png";
import {
  LoginBenefitCard,
  AuthInput,
  GoogleSignInButton,
  AuthBackgroundBorders,
  AuthLeafDecors,
  type BenefitCardData,
} from "../components/auth/LoginComponents";
import BotanicalLeaf from "../components/about/BotanicalLeaf";
import { registerCustomerApi } from "../services/customerAuth";

// Benefit cards rendered dynamically via .map()
const signUpBenefitCards: BenefitCardData[] = [
  {
    id: "benefit-exclusive-perks",
    title: "Exclusive Welcome Perks",
    subtitle:
      "Enjoy flat 10% off your first organic plant order + complimentary plant doctor support.",
    iconType: "check",
  },
  {
    id: "benefit-happy-gardeners",
    title: "50,000+ Happy Gardeners",
    subtitle: "Growing green homes across India",
    iconType: "avatars",
  },
];

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    // Client-side validations
    const cleanName = fullName.trim();
    const cleanEmail = email.trim();
    const cleanMobile = mobileNumber.trim();

    if (!cleanName) {
      setErrorMessage("Please enter your full name");
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!confirmPassword) {
      setErrorMessage("Please enter a password");
      return;
    }

    if (confirmPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }

    if (confirmPassword !== reEnterPassword) {
      setErrorMessage("Passwords do not match. Please re-enter carefully.");
      return;
    }

    try {
      setIsLoading(true);
      await registerCustomerApi({
        fullName: cleanName,
        email: cleanEmail,
        password: confirmPassword,
        confirmPassword: reEnterPassword,
        mobileNumber: cleanMobile || undefined,
      });

      setSuccessMessage("Account created successfully! Redirecting to sign in...");
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.history.pushState({}, "", "/login");
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F4F7F2] px-3 py-3 text-[#143826] sm:px-4 sm:py-4 lg:min-h-[100dvh] lg:h-auto lg:py-2.5 lg:px-6">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* Decorative full-height border images along left and right edges */}
      <AuthBackgroundBorders />

      {/* Ambient background botanical leaf illustrations */}
      <AuthLeafDecors />

      {/* MAIN SIGN UP CARD - Vertically centered, compact width & height */}
      <div className="relative z-10 grid w-full max-w-[900px] grid-cols-1 overflow-hidden rounded-[20px] border border-[#E0E9DD] bg-white shadow-[0_14px_36px_rgba(20,56,38,0.06)] sm:rounded-[24px] lg:grid-cols-12 xl:max-w-[920px] animate-scale-in">
        {/* ========================================================
            LEFT SECTION — Image Panel
           ======================================================== */}
        <div className="relative flex flex-col justify-between overflow-hidden p-4.5 sm:p-5.5 lg:col-span-6 lg:px-5 lg:py-5 xl:px-6 xl:py-5.5">
          {/* Greenhouse registration photograph covering entire panel */}
          <img
            src={regImg}
            alt="Kanchan Greenhouse Registration"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

          {/* Top badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-2.5 py-0.5 text-[9.5px] font-medium tracking-wide text-white backdrop-blur-md sm:text-[10px]">
              <span aria-hidden="true">🌿</span>
              <span>Natural • Sustainable • Healthier Homes</span>
            </span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 my-auto py-2.5 sm:py-3 lg:py-2.5">
            <h2 className="font-serif-heading text-[19px] font-bold leading-[1.16] text-white sm:text-[21px] lg:text-[22px]">
              Start Your Green{" "}
              <span className="block font-normal italic text-white/95">
                Sanctuary Journey.
              </span>
            </h2>
            <p className="mt-1.5 max-w-[340px] text-[10.5px] leading-relaxed text-white/90 sm:text-[11px]">
              Join thousands of plant enthusiasts. Get hand picked nursery
              plants, expert botanical guidance, and care reminders delivered to
              your inbox.
            </p>
          </div>

          {/* Translucent benefit cards near bottom - slightly more comfortable spacing */}
          <div className="relative z-10 space-y-2.5 sm:space-y-3">
            {signUpBenefitCards.map((card) => (
              <LoginBenefitCard key={card.id} card={card} compact />
            ))}
          </div>
        </div>

        {/* ========================================================
            RIGHT SECTION — Sign Up Form
           ======================================================== */}
        <div className="relative flex flex-col justify-center bg-white p-4.5 sm:p-5.5 lg:col-span-6 lg:px-5 lg:py-5 xl:px-6 xl:py-5.5">
          {/* Corner botanical outline leaf watermark */}
          <BotanicalLeaf
            className="absolute right-3.5 top-3 w-10 opacity-20 sm:w-12"
            style={{ transform: "rotate(25deg)" }}
          />

          {/* Form Header */}
          <div className="relative z-10">
            <h1 className="font-serif-heading text-[20px] font-bold tracking-tight text-[#18382B] sm:text-[22px]">
              Create Account
            </h1>
            <p className="mt-1 text-[11px] leading-tight text-[#5E7163]">
              Set up your profile to receive curated plants, track deliveries,
              and save favorite varieties.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              role="alert"
              className="relative z-10 mt-2 flex items-center gap-2 rounded-[8px] border border-[#F3C7C7] bg-[#FFF5F5] px-2.5 py-1.5 text-[11px] font-semibold text-[#C62828] shadow-2xs"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 shrink-0 text-[#C62828]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMessage && (
            <div
              role="status"
              className="relative z-10 mt-2 flex items-center gap-2 rounded-[8px] border border-[#CDE5D2] bg-[#E8F5E9] px-2.5 py-1.5 text-[11px] font-semibold text-[#1B6E32] shadow-2xs"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-3.5 w-3.5 shrink-0 text-[#1B6E32]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form Fields: 5 Fields in exact order */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 mt-2.5 space-y-1.5 sm:space-y-2"
          >
            {/* 1. FULL NAME */}
            <AuthInput
              id="signup-fullname"
              label="FULL NAME"
              type="text"
              placeholder="Enter Your Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              containerClassName="space-y-0.5"
              labelClassName="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#355240]"
              inputClassName="h-7.5 sm:h-8 text-[12px] rounded-[10px]"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {/* 2. EMAIL ADDRESS */}
            <AuthInput
              id="signup-email"
              label="EMAIL ADDRESS"
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              containerClassName="space-y-0.5"
              labelClassName="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#355240]"
              inputClassName="h-7.5 sm:h-8 text-[12px] rounded-[10px]"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            />

            {/* 3. MOBILE NUMBER */}
            <AuthInput
              id="signup-mobile"
              label="MOBILE NUMBER"
              type="tel"
              placeholder="Enter Your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              containerClassName="space-y-0.5"
              labelClassName="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#355240]"
              inputClassName="h-7.5 sm:h-8 text-[12px] rounded-[10px]"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              }
            />

            {/* 4. CONFIRM PASSWORD */}
            <AuthInput
              id="signup-confirmpassword"
              label="CONFIRM PASSWORD"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Your Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              containerClassName="space-y-0.5"
              labelClassName="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#355240]"
              inputClassName="h-7.5 sm:h-8 text-[12px] rounded-[10px]"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer text-[#88998D] transition hover:text-[#18382B]"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              }
            />

            {/* 5. RE-ENTER PASSWORD */}
            <AuthInput
              id="signup-reenterpassword"
              label="RE-ENTER PASSWORD"
              type={showReEnterPassword ? "text" : "password"}
              placeholder="Enter Your Re-Enter Password"
              value={reEnterPassword}
              onChange={(e) => setReEnterPassword(e.target.value)}
              required
              containerClassName="space-y-0.5"
              labelClassName="text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider text-[#355240]"
              inputClassName="h-7.5 sm:h-8 text-[12px] rounded-[10px]"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-3.5 w-3.5"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowReEnterPassword(!showReEnterPassword)}
                  className="cursor-pointer text-[#88998D] transition hover:text-[#18382B]"
                  aria-label={
                    showReEnterPassword ? "Hide password" : "Show password"
                  }
                >
                  {showReEnterPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              }
            />

            {/* Primary CTA: Create My Account */}
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-1 flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] text-[13px] font-semibold text-white shadow-xs transition-all duration-200 sm:h-9.5 ${
                isLoading
                  ? "bg-[#6C8576] cursor-not-allowed opacity-90"
                  : "bg-[#06452E] cursor-pointer hover:bg-[#043623] hover:shadow-md active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="h-3.5 w-3.5 animate-spin text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create My Account</span>
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            {/* Divider: OR CONTINUE WITH */}
            <div className="relative my-0.5 flex items-center justify-center py-0.5">
              <div className="w-full border-t border-[#E3E9DF]" />
              <span className="absolute bg-white px-2 text-[9px] font-bold uppercase tracking-wider text-[#8A9B8E]">
                OR CONTINUE WITH
              </span>
            </div>

            {/* Google Sign In */}
            <GoogleSignInButton
              className="h-8.5 text-[12.5px] rounded-[10px] sm:h-9"
              onClick={() => {
                alert("Google sign-in is visual-only in this demo.");
              }}
            />

            {/* Already have an account link - fully visible */}
            <p className="pt-1 text-center text-[11px] text-[#55695B] sm:text-[11.5px]">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-bold text-[#06452E] underline underline-offset-2 transition hover:text-[#043522]"
              >
                Sign in to your account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
