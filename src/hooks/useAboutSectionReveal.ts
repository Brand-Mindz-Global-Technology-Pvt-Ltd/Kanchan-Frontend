import { useLayoutEffect, useRef } from "react";

export type AboutSectionType =
  | "story"
  | "commitment"
  | "sanctuary"
  | "caretakers"
  | "benefits"
  | "faq"
  | "community";

/**
 * Custom hook delivering REPEATING botanical scroll reveals
 * tailored distinctly to each About Us section.
 * Replays when scrolling down AND scrolling up into view.
 */
export function useAboutSectionReveal<T extends HTMLElement = HTMLElement>(
  sectionType: AboutSectionType
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
      case "story": {
        // 1. AboutStory: Heading and content reveal with subtle directional movement (images left, narrative right)
        const heading = section.querySelector<HTMLElement>("[data-about-story-heading]");
        const collage = section.querySelector<HTMLElement>("[data-about-story-collage]");
        const narrative = section.querySelector<HTMLElement>("[data-about-story-narrative]");

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(20px)";
          }
          if (collage) {
            collage.style.transition = "none";
            collage.style.opacity = "0";
            collage.style.transform = "translateX(-24px) scale(0.97)";
          }
          if (narrative) {
            narrative.style.transition = "none";
            narrative.style.opacity = "0";
            narrative.style.transform = "translateX(24px)";
          }
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0px)";
          }

          const t1 = setTimeout(() => {
            if (collage) {
              collage.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
              collage.style.opacity = "1";
              collage.style.transform = "translateX(0px) scale(1)";
            }
            if (narrative) {
              narrative.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s";
              narrative.style.opacity = "1";
              narrative.style.transform = "translateX(0px)";
            }
          }, 100);
          timeouts.push(t1);
        };
        break;
      }

      case "commitment": {
        // 2. BotanicalCommitment: Content and cards reveal with staggered movement
        const heading = section.querySelector<HTMLElement>("[data-about-commitment-heading]");
        const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-about-commitment-card]"));

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(18px)";
          }
          cards.forEach((card) => {
            card.style.transition = "none";
            card.style.opacity = "0";
            card.style.transform = "translateY(24px) scale(0.97)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
            heading.style.opacity = "1";
            heading.style.transform = "translateY(0px)";
          }

          cards.forEach((card, idx) => {
            const t = setTimeout(() => {
              card.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0px) scale(1)";
            }, 100 + idx * 90);
            timeouts.push(t);
          });
        };
        break;
      }

      case "sanctuary": {
        // 3. BotanicalSanctuary: Image and text reveal in sequence
        const header = section.querySelector<HTMLElement>("[data-about-sanctuary-header]");
        const zoneCards = Array.from(section.querySelectorAll<HTMLElement>("[data-about-sanctuary-card]"));
        const infoBar = section.querySelector<HTMLElement>("[data-about-sanctuary-info]");

        resetAnimation = () => {
          clearPendingTimeouts();
          if (header) {
            header.style.transition = "none";
            header.style.opacity = "0";
            header.style.transform = "translateY(18px)";
          }
          zoneCards.forEach((c) => {
            c.style.transition = "none";
            c.style.opacity = "0";
            c.style.transform = "translateY(22px) scale(0.96)";
          });
          if (infoBar) {
            infoBar.style.transition = "none";
            infoBar.style.opacity = "0";
            infoBar.style.transform = "translateY(14px)";
          }
        };

        playAnimation = () => {
          clearPendingTimeouts();
          if (header) {
            header.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
            header.style.opacity = "1";
            header.style.transform = "translateY(0px)";
          }

          zoneCards.forEach((c, idx) => {
            const t = setTimeout(() => {
              c.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
              c.style.opacity = "1";
              c.style.transform = "translateY(0px) scale(1)";
            }, 110 + idx * 80);
            timeouts.push(t);
          });

          const t2 = setTimeout(() => {
            if (infoBar) {
              infoBar.style.transition = "opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
              infoBar.style.opacity = "1";
              infoBar.style.transform = "translateY(0px)";
            }
          }, 110 + zoneCards.length * 80);
          timeouts.push(t2);
        };
        break;
      }

      case "caretakers": {
        // 4. Caretakers: Cards reveal one after another with subtle scale and upward movement
        const heading = section.querySelector<HTMLElement>("[data-about-caretakers-heading]");
        const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-about-caretakers-card]"));

        resetAnimation = () => {
          clearPendingTimeouts();
          if (heading) {
            heading.style.transition = "none";
            heading.style.opacity = "0";
            heading.style.transform = "translateY(20px)";
          }
          cards.forEach((card) => {
            card.style.transition = "none";
            card.style.opacity = "0";
            card.style.transform = "translateY(28px) scale(0.95)";
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

      case "benefits": {
        // 5. BotanicalBenefits: Benefit items reveal with staggered timing
        const items = Array.from(section.querySelectorAll<HTMLElement>("[data-about-benefit-item]"));

        resetAnimation = () => {
          clearPendingTimeouts();
          items.forEach((item) => {
            item.style.transition = "none";
            item.style.opacity = "0";
            item.style.transform = "translateY(18px) scale(0.96)";
          });
        };

        playAnimation = () => {
          clearPendingTimeouts();
          items.forEach((item, idx) => {
            const t = setTimeout(() => {
              item.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
              item.style.opacity = "1";
              item.style.transform = "translateY(0px) scale(1)";
            }, 70 + idx * 95);
            timeouts.push(t);
          });
        };
        break;
      }

      case "faq": {
        // 6. AboutFaq: FAQ rows reveal one by one
        const heading = section.querySelector<HTMLElement>("[data-about-faq-heading]");
        const faqItems = Array.from(section.querySelectorAll<HTMLElement>("[data-about-faq-item]"));

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
        // 7. GreenCommunity: Icon, heading, description and button reveal sequentially
        const icon = section.querySelector<HTMLElement>("[data-about-community-icon]");
        const heading = section.querySelector<HTMLElement>("[data-about-community-heading]");
        const desc = section.querySelector<HTMLElement>("[data-about-community-desc]");
        const formBar = section.querySelector<HTMLElement>("[data-about-community-form]");

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
            playAnimation();
          } else {
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

