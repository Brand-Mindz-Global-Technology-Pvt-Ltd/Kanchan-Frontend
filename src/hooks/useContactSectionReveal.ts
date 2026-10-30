import { useLayoutEffect, useRef } from "react";

export type ContactSectionType =
  | "channels"
  | "form"
  | "location"
  | "faq"
  | "community";

/**
 * Custom hook delivering REPEATING botanical scroll reveals
 * tailored distinctly to each Contact Us section.
 * Replays when scrolling down AND scrolling up into view.
 */
export function useContactSectionReveal<T extends HTMLElement = HTMLElement>(
  sectionType: ContactSectionType
) {
  const sectionRef = useRef<T>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      typeof IntersectionObserver === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    // Respect accessibility settings
    const motionPref = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPref.matches) {
      return;
    }

    const timeouts: NodeJS.Timeout[] = [];
    const clearPendingTimeouts = () => {
      timeouts.forEach((t) => clearTimeout(t));
      timeouts.length = 0;
    };

    let playAnimation: () => void = () => {};
    let resetAnimation: () => void = () => {};

    switch (sectionType) {
      case "channels": {
        // 1. Contact Channels: Staggered upward reveal + scale
        const heading = section.querySelector<HTMLElement>("[data-contact-reveal-heading]");
        const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-contact-channel-card]"));

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(22px)";
          }
          cards.forEach((card) => {
            card.style.transition = "none";
            card.style.opacity = "0";
            card.style.transform = "translateY(30px) scale(0.95)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0px)";
          }
          cards.forEach((card, idx) => {
            const t = setTimeout(() => {
              card.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0px) scale(1)";
            }, 100 + idx * 110);
            timeouts.push(t);
          });
        };
        break;
      }

      case "form": {
        // 2. Contact Form: Directional reveal and sequential fields
        const header = section.querySelector<HTMLElement>("[data-contact-form-header]");
        const formCard = section.querySelector<HTMLElement>("[data-contact-form-card]");
        const fields = Array.from(section.querySelectorAll<HTMLElement>("[data-contact-form-field]"));
        const sideGuide = section.querySelector<HTMLElement>("[data-contact-form-side]");

        resetAnimation = () => {
          clearPendingTimeouts();
          if (header) {
            header.style.transition = "none";
            header.style.opacity = "0";
            header.style.transform = "translateY(16px)";
          }
          if (formCard) {
            formCard.style.transition = "none";
            formCard.style.opacity = "0";
            formCard.style.transform = "translateX(-24px)";
          }
          if (sideGuide) {
            sideGuide.style.transition = "none";
            sideGuide.style.opacity = "0";
            sideGuide.style.transform = "translateX(24px)";
          }
          fields.forEach((field) => {
            field.style.transition = "none";
            field.style.opacity = "0";
            field.style.transform = "translateY(14px)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (formCard) {
            formCard.style.transition = "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)";
            formCard.style.opacity = "1";
            formCard.style.transform = "translateX(0px)";
          }
          if (sideGuide) {
            sideGuide.style.transition = "opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.12s";
            sideGuide.style.opacity = "1";
            sideGuide.style.transform = "translateX(0px)";
          }

          const t1 = setTimeout(() => {
            if (header) {
              header.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
              header.style.opacity = "1";
              header.style.transform = "translateY(0px)";
            }
          }, 80);
          timeouts.push(t1);

          fields.forEach((field, i) => {
            const t = setTimeout(() => {
              field.style.transition = "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
              field.style.opacity = "1";
              field.style.transform = "translateY(0px)";
            }, 180 + i * 70);
            timeouts.push(t);
          });
        };
        break;
      }

      case "location": {
        // 3. Nursery Location: Smooth scale and clip-path reveal + directional text
        const heading = section.querySelector<HTMLElement>("[data-contact-location-heading]");
        const mapContainer = section.querySelector<HTMLElement>("[data-contact-location-map]");
        const infoBar = section.querySelector<HTMLElement>("[data-contact-location-info]");

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(18px)";
          }
          if (mapContainer) {
            mapContainer.style.transition = "none";
            mapContainer.style.opacity = "0";
            mapContainer.style.transform = "scale(0.97)";
            mapContainer.style.clipPath = "inset(4% 4% 4% 4% round 16px)";
          }
          if (infoBar) {
            infoBar.style.transition = "none";
            infoBar.style.opacity = "0";
            infoBar.style.transform = "translateY(12px)";
          }
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0px)";
          }

          const t1 = setTimeout(() => {
            if (mapContainer) {
              mapContainer.style.transition = "opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), clip-path 0.85s cubic-bezier(0.16, 1, 0.3, 1)";
              mapContainer.style.opacity = "1";
              mapContainer.style.transform = "scale(1)";
              mapContainer.style.clipPath = "inset(0% 0% 0% 0% round 20px)";
            }
            if (infoBar) {
              infoBar.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
              infoBar.style.opacity = "1";
              infoBar.style.transform = "translateY(0px)";
            }
          }, 100);
          timeouts.push(t1);
        };
        break;
      }

      case "faq": {
        // 4. Contact FAQ: Staggered reveal of accordion rows
        const heading = section.querySelector<HTMLElement>("[data-contact-faq-heading]");
        const faqItems = Array.from(section.querySelectorAll<HTMLElement>("[data-contact-faq-item]"));

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(18px)";
          }
          faqItems.forEach((item) => {
            item.style.transition = "none";
            item.style.opacity = "0";
            item.style.transform = "translateY(16px)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0px)";
          }

          faqItems.forEach((item, idx) => {
            const t = setTimeout(() => {
              item.style.transition = "opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
              item.style.opacity = "1";
              item.style.transform = "translateY(0px)";
            }, 120 + idx * 75);
            timeouts.push(t);
          });
        };
        break;
      }

      case "community": {
        // 5. Green Community: Sequential reveal of icon, heading, subtitle, form
        const icon = section.querySelector<HTMLElement>("[data-contact-community-icon]");
        const heading = section.querySelector<HTMLElement>("[data-contact-community-heading]");
        const desc = section.querySelector<HTMLElement>("[data-contact-community-desc]");
        const formBar = section.querySelector<HTMLElement>("[data-contact-community-form]");

        const seq = [icon, heading, desc, formBar].filter((el): el is HTMLElement => Boolean(el));

        resetAnimation = () => {
          clearPendingTimeouts();
          seq.forEach((el) => {
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.transform = "translateY(18px) scale(0.98)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          seq.forEach((el, idx) => {
            const t = setTimeout(() => {
              el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
              el.style.opacity = "1";
              el.style.transform = "translateY(0px) scale(1)";
            }, 70 + idx * 100);
            timeouts.push(t);
          });
        };
        break;
      }
    }

    // Initialize in reset state before intersection
    resetAnimation();

    // IntersectionObserver without disconnecting, listening for enter and leave
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Replay animation on enter (scrolling down or scrolling up)
            playAnimation();
          } else {
            // Reset state when leaving viewport so it's ready to replay seamlessly
            resetAnimation();
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(section);

    return () => {
      clearPendingTimeouts();
      observer.disconnect();
    };
  }, [sectionType]);

  return sectionRef;
}
