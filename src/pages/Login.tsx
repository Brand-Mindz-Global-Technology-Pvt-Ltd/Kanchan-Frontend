import { useState, useEffect, type FormEvent } from "react";
import loginImg from "../assets/auth/login-img.png";
import resetImg from "../assets/auth/forgot-img.png";
import {
  LoginBenefitCard,
  AuthInput,
  GoogleSignInButton,
  AuthBackgroundBorders,
  AuthLeafDecors,
  type BenefitCardData,
} from "../components/auth/LoginComponents";
import BotanicalLeaf from "../components/about/BotanicalLeaf";
import {
  loginCustomerApi,
  logoutCustomerApi,
  validateSessionApi,
  setCustomerSession,
  getStoredCustomer,
  type SafeCustomer,
} from "../services/customerAuth";

// Benefit cards rendered dynamically via .map()
const benefitCards: BenefitCardData[] = [
  {
    id: "benefit-grow-naturally",
    title: "Grow Naturally, Live Beautifully.",
    subtitle: "Handpicked premium plants delivered fresh to your doorstep.",
    iconType: "check",
  },
  {
    id: "benefit-happy-gardeners",
    title: "50,000+ Happy Gardeners",
    subtitle: "Growing green homes across India",
    iconType: "avatars",
  },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signedInFeedback, setSignedInFeedback] = useState<string | null>(null);

  const [activeCustomer, setActiveCustomer] = useState<SafeCustomer | null>(() =>
    getStoredCustomer()
  );
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;
    validateSessionApi().then((cust) => {
      if (isMounted) {
        setActiveCustomer(cust);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutCustomerApi();
      setActiveCustomer(null);
      setEmail("");
      setPassword("");
      setErrorMessage(null);
      setSignedInFeedback("You have been signed out successfully.");
      setTimeout(() => {
        setSignedInFeedback(null);
      }, 3000);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setErrorMessage(null);
    setSignedInFeedback(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setErrorMessage("Please enter both your email address and password.");
      return;
    }

    try {
      setIsLoading(true);
      const authData = await loginCustomerApi({
        email: cleanEmail,
        password,
      });

      setCustomerSession(authData.token, authData.customer, rememberMe);
      setActiveCustomer(authData.customer);
      setSignedInFeedback(
        `Welcome back, ${authData.customer.fullName}! Signing you in...`
      );

      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.history.pushState({}, "", "/");
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 1200);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Invalid email or password";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F4F7F2] px-4 py-4 text-[#143826] sm:px-6 lg:min-h-[100dvh] lg:h-auto lg:py-3.5 lg:px-8">
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

      {/* MAIN LOGIN CARD */}
      <div className="relative z-10 grid w-full max-w-[980px] grid-cols-1 overflow-hidden rounded-[24px] border border-[#E0E9DD] bg-white shadow-[0_16px_40px_rgba(20,56,38,0.07)] sm:rounded-[28px] lg:grid-cols-12 animate-scale-in">
        {/* ========================================================
            LEFT SECTION — Image Panel
           ======================================================== */}
        <div className="relative flex flex-col justify-between overflow-hidden p-5 sm:p-7 lg:col-span-6 lg:p-7 xl:p-8">
          {/* Greenhouse photograph covering entire panel */}
          <img
            src={loginImg}
            alt="Kanchan Botanical Greenhouse"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

          {/* Top badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-0.5 text-[10.5px] font-medium tracking-wide text-white backdrop-blur-md sm:text-[11px]">
              <span aria-hidden="true">🌿</span>
              <span>Natural • Sustainable • Healthier Homes</span>
            </span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 my-auto py-3 sm:py-4 lg:py-3">
            <h2 className="font-serif-heading text-[24px] font-bold leading-[1.18] text-white sm:text-[28px] lg:text-[30px] xl:text-[32px]">
              Bring Home the{" "}
              <span className="block font-normal italic text-white/95">
                Beauty of Nature.
              </span>
            </h2>
            <p className="mt-2 max-w-[380px] text-[11.5px] leading-relaxed text-white/90 sm:text-[12px]">
              Everything you need to grow, nurture, and create your own serene
              green sanctuary. Sign in to track orders, manage care routines, and
              explore organic plants.
            </p>
          </div>

          {/* Translucent benefit cards near bottom */}
          <div className="relative z-10 space-y-2 sm:space-y-2.5">
            {benefitCards.map((card) => (
              <LoginBenefitCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* ========================================================
            RIGHT SECTION — Login Form
           ======================================================== */}
        <div className="relative flex flex-col justify-center bg-white p-5 sm:p-8 lg:col-span-6 lg:p-7 xl:p-9">
          {/* Corner botanical outline leaf watermark */}
          <BotanicalLeaf
            className="absolute right-4 top-4 w-12 opacity-25 sm:w-16"
            style={{ transform: "rotate(25deg)" }}
          />

          {/* Form Header */}
          <div className="relative z-10">
            <h1 className="font-serif-heading text-[24px] font-bold tracking-tight text-[#18382B] sm:text-[28px] lg:text-[30px]">
              Welcome Back !
            </h1>
            <p className="mt-1 text-[12px] leading-relaxed text-[#5E7163] sm:text-[12.5px]">
              Sign in to access your orders, curated plant wishlist, and
              personalized care reminders.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div
              role="alert"
              className="relative z-10 mt-3 flex items-center gap-2 rounded-[10px] border border-[#F3C7C7] bg-[#FFF5F5] px-3 py-2 text-[12px] font-semibold text-[#C62828] shadow-2xs"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 shrink-0 text-[#C62828]"
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

          {/* Success / Feedback banner */}
          {signedInFeedback && (
            <div
              role="status"
              className="relative z-10 mt-3 flex items-center gap-2 rounded-[10px] border border-[#CDE5D2] bg-[#E8F5E9] px-3 py-2 text-[12px] font-semibold text-[#1B6E32] shadow-2xs"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 shrink-0 text-[#1B6E32]"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{signedInFeedback}</span>
            </div>
          )}

          {/* If already signed in, show clean active session card */}
          {activeCustomer ? (
            <div className="relative z-10 mt-5 rounded-[16px] border border-[#CCD8C4] bg-[#F7F9F5] p-5 text-center shadow-xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F5E9] text-[#1B6E32]">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="mt-3 font-serif-heading text-[18px] font-bold text-[#18382B]">
                Active Customer Session
              </h3>
              <p className="mt-1 text-[12.5px] text-[#55695B]">
                Signed in as <strong className="text-[#18382B]">{activeCustomer.fullName}</strong>
                <span className="block text-[11.5px] text-[#718576]">{activeCustomer.email}</span>
              </p>
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <a
                  href="/"
                  className="inline-flex h-9 w-full sm:w-auto items-center justify-center rounded-[10px] bg-[#06452E] px-4.5 text-[12.5px] font-semibold text-white shadow-xs transition hover:bg-[#043623]"
                >
                  Continue Shopping
                </a>
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="inline-flex h-9 w-full sm:w-auto items-center justify-center rounded-[10px] border border-[#C62828] bg-white px-4 text-[12.5px] font-semibold text-[#C62828] transition hover:bg-[#FFF5F5] cursor-pointer disabled:opacity-50"
                >
                  {isLoggingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </div>
          ) : (
            /* Form Fields */
            <form
              onSubmit={handleSubmit}
              className="relative z-10 mt-4 space-y-3 sm:space-y-3.5"
            >
              {/* Email Address */}
              <AuthInput
                id="login-email"
                label="EMAIL ADDRESS"
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                }
              />

              {/* Password */}
              <AuthInput
                id="login-password"
                label="PASSWORD"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                headerAction={
                  <a
                    href="/forgot-password"
                    className="text-[11.5px] font-semibold text-[#06452E] hover:underline"
                  >
                    Forgot password?
                  </a>
                }
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4.5 w-4.5"
                    aria-hidden="true"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer text-[#88998D] transition hover:text-[#18382B]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4.5 w-4.5"
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
                        className="h-4.5 w-4.5"
                        aria-hidden="true"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                }
              />

              {/* Remember Me Checkbox */}
              <div className="flex items-center pt-0.5">
                <label className="flex cursor-pointer select-none items-center gap-2 text-[12.5px] text-[#4E6253]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 cursor-pointer rounded-[4px] border-[#BDCDBD] text-[#06452E] accent-[#06452E] focus:ring-[#06452E]"
                  />
                  <span className="font-medium">Remember Me</span>
                </label>
              </div>

              {/* Primary CTA: Sign in to Account */}
              <button
                type="submit"
                disabled={isLoading}
                className={`flex h-10.5 w-full items-center justify-center gap-2 rounded-[12px] text-[14px] font-semibold text-white shadow-xs transition-all duration-200 sm:h-10.5 ${
                  isLoading
                    ? "bg-[#6C8576] cursor-not-allowed opacity-90"
                    : "bg-[#06452E] cursor-pointer hover:bg-[#043623] hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
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
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign in to Account</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider: OR CONTINUE WITH */}
              <div className="relative my-1 flex items-center justify-center py-0.5">
                <div className="w-full border-t border-[#E3E9DF]" />
                <span className="absolute bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-[#8A9B8E]">
                  OR CONTINUE WITH
                </span>
              </div>

              {/* Google Sign In */}
              <GoogleSignInButton
                onClick={() => {
                  alert("Google sign-in is visual-only in this demo.");
                }}
              />

              {/* Create account prompt */}
              <p className="pt-0.5 text-center text-[12px] text-[#55695B]">
                Don&apos;t have an account yet?{" "}
                <a
                  href="/signup"
                  className="font-bold text-[#06452E] underline underline-offset-2 transition hover:text-[#043522]"
                >
                  Create an account
                </a>
              </p>

              {/* Terms and Privacy policy disclaimer */}
              <p className="pt-1 text-center text-[10.5px] leading-relaxed text-[#76887B]">
                By signing in, you agree to Kanchan Garden&apos;s{" "}
                <a
                  href="/terms-conditions"
                  className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
                >
                  Terms &amp; Conditions
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Forgot Password View (Exported from existing file)
// ==========================================

const forgotPasswordBenefitCards: BenefitCardData[] = [
  {
    id: "benefit-journey-matters",
    title: "Your Garden Journey Matters",
    subtitle: "You saved plants & care logs are safe and waiting.",
    iconType: "check",
  },
  {
    id: "benefit-happy-gardeners",
    title: "50,000+ Happy Gardeners",
    subtitle: "Growing green homes across India",
    iconType: "avatars",
  },
];

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
    window.history.pushState({}, "", "/reset-password");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F4F7F2] px-4 py-4 text-[#143826] sm:px-6 lg:min-h-[100dvh] lg:h-auto lg:py-3.5 lg:px-8">
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

      {/* MAIN FORGOT PASSWORD CARD */}
      <div className="relative z-10 grid w-full max-w-[960px] grid-cols-1 overflow-hidden rounded-[24px] border border-[#E0E9DD] bg-white shadow-[0_16px_40px_rgba(20,56,38,0.07)] sm:rounded-[28px] lg:grid-cols-12 xl:max-w-[980px] animate-scale-in">
        {/* ========================================================
            LEFT SECTION — Image Panel
           ======================================================== */}
        <div className="relative flex flex-col justify-between overflow-hidden p-5 sm:p-7 lg:col-span-6 lg:p-7 xl:p-8">
          {/* Greenhouse photograph covering entire panel */}
          <img
            src={loginImg}
            alt="Kanchan Botanical Greenhouse"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

          {/* Top badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-0.5 text-[10.5px] font-medium tracking-wide text-white backdrop-blur-md sm:text-[11px]">
              <span aria-hidden="true">🌿</span>
              <span>Natural • Sustainable • Healthier Homes</span>
            </span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 my-auto py-3 sm:py-4 lg:py-3">
            <h2 className="font-serif-heading text-[24px] font-bold leading-[1.18] text-white sm:text-[28px] lg:text-[30px] xl:text-[32px]">
              Let&apos;s Get You{" "}
              <span className="block font-normal italic text-white/95">
                Back to Growing.
              </span>
            </h2>
            <p className="mt-2 max-w-[380px] text-[11.5px] leading-relaxed text-white/90 sm:text-[12px]">
              Forgot your password? Don&apos;t worry, it happens. We&apos;ll help you get
              back to your serene sanctuary in just a few simple steps.
            </p>
          </div>

          {/* Translucent benefit cards near bottom */}
          <div className="relative z-10 space-y-2 sm:space-y-2.5">
            {forgotPasswordBenefitCards.map((card) => (
              <LoginBenefitCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* ========================================================
            RIGHT SECTION — Forgot Password Form
           ======================================================== */}
        <div className="relative flex flex-col justify-center bg-white p-5 sm:p-8 lg:col-span-6 lg:p-7 xl:p-9">
          {/* Corner botanical outline leaf watermark */}
          <BotanicalLeaf
            className="absolute right-4 top-4 w-12 opacity-25 sm:w-16"
            style={{ transform: "rotate(25deg)" }}
          />

          {/* Form Header */}
          <div className="relative z-10">
            <h1 className="font-serif-heading text-[24px] font-bold tracking-tight text-[#18382B] sm:text-[28px] lg:text-[30px]">
              Forgot Password ?
            </h1>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#5E7163] sm:text-[12.5px]">
              Enter the email address associated with your Kanchan Garden account,
              and we&apos;ll send you an instant link to reset your password.
            </p>
          </div>

          {/* Feedback banner */}
          {submittedFeedback && (
            <div className="relative z-10 mt-3 flex items-center gap-2 rounded-[10px] bg-[#E8F5E9] px-3 py-2 text-[12px] font-semibold text-[#1B6E32] shadow-2xs">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Reset link sent! Please check your inbox.</span>
            </div>
          )}

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 mt-4 space-y-3 sm:space-y-3.5"
          >
            {/* Email Address */}
            <AuthInput
              id="forgot-email"
              label="EMAIL ADDRESS"
              type="email"
              placeholder="Enter Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5"
                  aria-hidden="true"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              }
            />

            {/* Primary CTA: Send Code */}
            <button
              type="submit"
              className="flex h-10.5 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#06452E] text-[14px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#043623] hover:shadow-md active:scale-[0.98]"
            >
              <span>Send Code</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Divider: OR CONTINUE WITH */}
            <div className="relative my-1 flex items-center justify-center py-0.5">
              <div className="w-full border-t border-[#E3E9DF]" />
              <span className="absolute bg-white px-2.5 text-[10px] font-bold uppercase tracking-wider text-[#8A9B8E]">
                OR CONTINUE WITH
              </span>
            </div>

            {/* Google Sign In */}
            <GoogleSignInButton
              onClick={() => {
                alert("Google sign-in is visual-only in this demo.");
              }}
            />

            {/* Remember your Password? Sign in prompt */}
            <p className="pt-0.5 text-center text-[12px] text-[#55695B]">
              Remember your Password?{" "}
              <a
                href="/login"
                className="font-bold text-[#06452E] underline underline-offset-2 transition hover:text-[#043522]"
              >
                Sign in
              </a>
            </p>

            {/* Terms and Privacy policy disclaimer */}
            <p className="pt-1 text-center text-[10.5px] leading-relaxed text-[#76887B]">
              By signing in, you agree to Kanchan Garden&apos;s{" "}
              <a
                href="/terms-conditions"
                className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
              >
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// Reset Password View (Exported from existing file)
// ==========================================

const resetPasswordBenefitCards: BenefitCardData[] = [
  {
    id: "benefit-reset-journey",
    title: "Your Garden Journey Matters",
    subtitle: "You saved plants & care logs are safe and waiting.",
    iconType: "check",
  },
  {
    id: "benefit-happy-gardeners",
    title: "50,000+ Happy Gardeners",
    subtitle: "Growing green homes across India",
    iconType: "avatars",
  },
];

export function ResetPassword() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
    setTimeout(() => {
      window.history.pushState({}, "", "/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }, 2000);
  };

  return (
    <div className="relative isolate flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden bg-[#F4F7F2] px-4 py-4 text-[#143826] sm:px-6 lg:min-h-[100dvh] lg:h-auto lg:py-3.5 lg:px-8">
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

      {/* MAIN RESET PASSWORD CARD */}
      <div className="relative z-10 grid w-full max-w-[960px] grid-cols-1 overflow-hidden rounded-[24px] border border-[#E0E9DD] bg-white shadow-[0_16px_40px_rgba(20,56,38,0.07)] sm:rounded-[28px] lg:grid-cols-12 xl:max-w-[980px] animate-scale-in">
        {/* ========================================================
            LEFT SECTION — Image Panel
           ======================================================== */}
        <div className="relative flex flex-col justify-between overflow-hidden p-5 sm:p-7 lg:col-span-6 lg:p-7 xl:p-8">
          {/* Greenhouse photograph covering entire panel */}
          <img
            src={resetImg}
            alt="Kanchan Botanical Greenhouse"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark gradient overlay for typography readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

          {/* Top badge */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-0.5 text-[10.5px] font-medium tracking-wide text-white backdrop-blur-md sm:text-[11px]">
              <span aria-hidden="true">🌿</span>
              <span>Natural • Sustainable • Healthier Homes</span>
            </span>
          </div>

          {/* Center copy */}
          <div className="relative z-10 my-auto py-3 sm:py-4 lg:py-3">
            <h2 className="font-serif-heading text-[24px] font-bold leading-[1.18] text-white sm:text-[28px] lg:text-[30px] xl:text-[32px]">
              Almost Back to{" "}
              <span className="block font-normal italic text-white/95">
                Your Green World.
              </span>
            </h2>
            <p className="mt-2 max-w-[380px] text-[11.5px] leading-relaxed text-white/90 sm:text-[12px]">
              Just one more step! Verify your code and create a new password to get back to
              your serene sanctuary and thriving plants.
            </p>
          </div>

          {/* Translucent benefit cards near bottom */}
          <div className="relative z-10 space-y-2 sm:space-y-2.5">
            {resetPasswordBenefitCards.map((card) => (
              <LoginBenefitCard key={card.id} card={card} />
            ))}
          </div>
        </div>

        {/* ========================================================
            RIGHT SECTION — Reset Password Form
           ======================================================== */}
        <div className="relative flex flex-col justify-center bg-white p-5 sm:p-8 lg:col-span-6 lg:p-7 xl:p-9">
          {/* Corner botanical outline leaf watermark */}
          <BotanicalLeaf
            className="absolute right-4 top-4 w-12 opacity-25 sm:w-16"
            style={{ transform: "rotate(25deg)" }}
          />

          {/* Form Header */}
          <div className="relative z-10">
            <h1 className="font-serif-heading text-[24px] font-bold tracking-tight text-[#18382B] sm:text-[28px] lg:text-[30px]">
              Verify &amp; Reset Password !
            </h1>
            <p className="mt-1.5 text-[12px] leading-relaxed text-[#5E7163] sm:text-[12.5px]">
              Enter the 6-digit verification code sent to your email and create a new
              secure password for your account.
            </p>
          </div>

          {/* Feedback banner */}
          {resetSuccess && (
            <div className="relative z-10 mt-3 flex items-center gap-2 rounded-[10px] bg-[#E8F5E9] px-3 py-2 text-[12px] font-semibold text-[#1B6E32] shadow-2xs">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Password reset successful! Redirecting to sign in...</span>
            </div>
          )}

          {/* Form Fields: 3 fields in exact order */}
          <form
            onSubmit={handleSubmit}
            className="relative z-10 mt-4 space-y-3 sm:space-y-3.5"
          >
            {/* 1. VERIFICATION CODE */}
            <div>
              <AuthInput
                id="reset-code"
                label="VERIFICATION CODE"
                type="text"
                placeholder="Enter 6-digit Code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4.5 w-4.5 text-[#88998D]"
                    aria-hidden="true"
                  >
                    <circle cx="7.5" cy="15.5" r="4.5" />
                    <path d="m21 2-9.6 9.6" />
                    <path d="m15.5 7.5 3 3" />
                    <path d="m18.5 4.5 3 3" />
                  </svg>
                }
                rightElement={
                  <button
                    type="button"
                    onClick={() => alert("Verification code resent to your email.")}
                    className="cursor-pointer rounded-[8px] border border-[#06452E]/30 bg-[#EBF4E9] px-2.5 py-1 text-[11px] font-semibold text-[#06452E] transition hover:bg-[#DEEED9] active:scale-95"
                  >
                    Resend Code
                  </button>
                }
              />
              <div className="mt-1 flex items-center justify-between text-[11px] text-[#5E7163]">
                <span>Code expires in 01:59 minutes</span>
                <a
                  href="/forgot-password"
                  className="font-semibold text-[#06452E] hover:underline"
                >
                  Didn&apos;t get code?
                </a>
              </div>
            </div>

            {/* 2. NEW PASSWORD */}
            <AuthInput
              id="reset-newpassword"
              label="NEW PASSWORD"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5 text-[#88998D]"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="cursor-pointer text-[#88998D] transition hover:text-[#18382B]"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4.5 w-4.5"
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
                      className="h-4.5 w-4.5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              }
            />

            {/* 3. CONFIRM NEW PASSWORD */}
            <AuthInput
              id="reset-confirmnewpassword"
              label="CONFIRM NEW PASSWORD"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Enter Your Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5 text-[#88998D]"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              }
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmNewPassword(!showConfirmNewPassword)
                  }
                  className="cursor-pointer text-[#88998D] transition hover:text-[#18382B]"
                  aria-label={
                    showConfirmNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmNewPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4.5 w-4.5"
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
                      className="h-4.5 w-4.5"
                      aria-hidden="true"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              }
            />

            {/* Primary CTA: Reset Password */}
            <button
              type="submit"
              className="mt-1 flex h-10.5 w-full cursor-pointer items-center justify-center gap-2 rounded-[12px] bg-[#06452E] text-[14px] font-semibold text-white shadow-xs transition-all duration-200 hover:bg-[#043623] hover:shadow-md active:scale-[0.98]"
            >
              <span>Reset Password</span>
              <span aria-hidden="true">→</span>
            </button>

            {/* Back to Sign in link */}
            <p className="pt-0.5 text-center text-[12px] text-[#55695B]">
              Back to{" "}
              <a
                href="/login"
                className="font-bold text-[#06452E] underline underline-offset-2 transition hover:text-[#043522]"
              >
                Sign in
              </a>
            </p>

            {/* Terms and Privacy policy disclaimer */}
            <p className="pt-1 text-center text-[10.5px] leading-relaxed text-[#76887B]">
              By signing in, you agree to Kanchan Garden&apos;s{" "}
              <a
                href="/terms-conditions"
                className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
              >
                Terms &amp; Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy-policy"
                className="font-semibold text-[#4A6353] underline underline-offset-2 transition hover:text-[#06452E]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

