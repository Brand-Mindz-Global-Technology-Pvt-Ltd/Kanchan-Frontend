import { useEffect } from "react";

/**
 * Custom hook for smooth scroll-triggered botanical reveals across Kanchan.
 * Uses IntersectionObserver to reveal elements as they enter the viewport.
 * Automatically unobserves elements once revealed to ensure zero repetitive flickering.
 */
export function useScrollReveal(dependencyKey?: unknown) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Accessibility check: immediately reveal all elements if reduced motion is requested
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPref.matches || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-scroll-reveal]").forEach((el) => {
        el.classList.add("is-revealed");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -30px 0px",
        threshold: 0.08,
      }
    );

    const elements = document.querySelectorAll(
      "[data-scroll-reveal]:not(.is-revealed)"
    );
    elements.forEach((el) => observer.observe(el));

    // Handle any elements added shortly after mount (e.g. dynamic state)
    const timeoutId = setTimeout(() => {
      const remaining = document.querySelectorAll(
        "[data-scroll-reveal]:not(.is-revealed)"
      );
      remaining.forEach((el) => observer.observe(el));
    }, 200);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [dependencyKey]);
}

