import { useLayoutEffect, useRef } from "react";

type RevealTarget = {
  element: HTMLElement;
  opacity: string;
  transform: string;
  inlineOpacity: string;
  inlineOpacityPriority: string;
  inlineTransform: string;
  inlineTransformPriority: string;
  inlineTransition: string;
  inlineTransitionPriority: string;
};

type OriginalRevealStyles = Omit<RevealTarget, "element">;

const originalRevealStyles = new WeakMap<HTMLElement, OriginalRevealStyles>();

const revealSelector = [
  "[data-decorative-leaf]",
  "[data-reveal-letter]",
  "[data-reveal-paragraph]",
  "[data-reveal-card]",
].join(", ");

function restoreTargets(targets: RevealTarget[]) {
  targets.forEach((target) => {
    target.element.style.setProperty("transition", "none");

    if (target.inlineOpacity) {
      target.element.style.setProperty(
        "opacity",
        target.inlineOpacity,
        target.inlineOpacityPriority,
      );
    } else {
      target.element.style.removeProperty("opacity");
    }

    if (target.inlineTransform) {
      target.element.style.setProperty(
        "transform",
        target.inlineTransform,
        target.inlineTransformPriority,
      );
    } else {
      target.element.style.removeProperty("transform");
    }

    if (target.inlineTransition) {
      target.element.style.setProperty(
        "transition",
        target.inlineTransition,
        target.inlineTransitionPriority,
      );
    } else {
      target.element.style.removeProperty("transition");
    }
  });
}

export function AnimatedHeadingText({ text }: { text: string }) {
  const words = text.split(/(\s+)/u);

  return (
    <span aria-hidden="true" data-reveal-heading>
      {words.map((word, wordIndex) =>
        /^\s+$/u.test(word) ? (
          word
        ) : (
          <span key={wordIndex} style={{ whiteSpace: "nowrap" }}>
            {Array.from(word).map((letter, letterIndex) => (
              <span
                key={`${wordIndex}-${letterIndex}`}
                data-reveal-letter
                style={{ display: "inline-block" }}
              >
                {letter}
              </span>
            ))}
          </span>
        ),
      )}
    </span>
  );
}

export function useDecorativeLeafReveal<T extends HTMLElement>() {
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

    let observer: IntersectionObserver | undefined;
    let targets: RevealTarget[] = [];
    const animations: Animation[] = [];
    let motionPreference: MediaQueryList | undefined;
    let handleMotionPreferenceChange:
      | ((event: MediaQueryListEvent) => void)
      | undefined;

    const restore = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.length = 0;
      restoreTargets(targets);
      targets = [];
    };

    try {
      motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (motionPreference.matches) {
        return;
      }

      const elements = Array.from(
        section.querySelectorAll<HTMLElement>(revealSelector),
      );

      if (
        elements.length === 0 ||
        elements.some((element) => typeof element.animate !== "function")
      ) {
        return;
      }

      targets = elements.map((element) => {
        const original = originalRevealStyles.get(element);

        if (original) {
          return { element, ...original };
        }

        const styles = window.getComputedStyle(element);
        const initialStyles = {
          opacity: styles.opacity,
          transform: styles.transform,
          inlineOpacity: element.style.getPropertyValue("opacity"),
          inlineOpacityPriority: element.style.getPropertyPriority("opacity"),
          inlineTransform: element.style.getPropertyValue("transform"),
          inlineTransformPriority:
            element.style.getPropertyPriority("transform"),
          inlineTransition: element.style.getPropertyValue("transition"),
          inlineTransitionPriority:
            element.style.getPropertyPriority("transition"),
        };

        originalRevealStyles.set(element, initialStyles);
        return { element, ...initialStyles };
      });

      targets.forEach((target) => {
        const offsetTransform =
          target.transform === "none"
            ? "translateY(16px)"
            : `translateY(16px) ${target.transform}`;
        target.element.style.transition = "none";
        target.element.style.opacity = "0";
        target.element.style.transform = offsetTransform;
      });

      const leafTargets = targets.filter((target) =>
        target.element.hasAttribute("data-decorative-leaf"),
      );
      const letterTargets = targets.filter((target) =>
        target.element.hasAttribute("data-reveal-letter"),
      );
      const paragraphTargets = targets.filter((target) =>
        target.element.hasAttribute("data-reveal-paragraph"),
      );
      const cardTargets = targets.filter((target) =>
        target.element.hasAttribute("data-reveal-card"),
      );

      handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
        if (event.matches) {
          restore();
        }
      };

      motionPreference.addEventListener(
        "change",
        handleMotionPreferenceChange,
      );

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) {
            return;
          }

          observer?.disconnect();

          if (motionPreference?.matches) {
            restore();
            return;
          }

          try {
            const animateTarget = (
              target: RevealTarget,
              delay: number,
              duration: number,
              distance: number,
            ) => {
              const transform =
                target.transform === "none"
                  ? "translateY(0px)"
                  : target.transform;
              const animation = target.element.animate(
                [
                  {
                    opacity: 0,
                    transform:
                      target.transform === "none"
                        ? `translateY(${distance}px)`
                        : `translateY(${distance}px) ${target.transform}`,
                  },
                  { opacity: target.opacity, transform },
                ],
                {
                  duration,
                  delay,
                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                  fill: "both",
                },
              );
              animations.push(animation);
            };

            leafTargets.forEach((target, index) =>
              animateTarget(target, index * 100, 800, 16),
            );
            letterTargets.forEach((target, index) =>
              animateTarget(target, index * 12, 580, 8),
            );
            paragraphTargets.forEach((target) =>
              animateTarget(target, 150, 600, 14),
            );
            cardTargets.forEach((target, index) =>
              animateTarget(target, 200 + index * 100, 600, 14),
            );
            restoreTargets(targets);
          } catch (error) {
            restore();
            console.error("Unable to animate homepage content.", error);
          }
        },
        { threshold: 0.08 },
      );

      observer.observe(section);
    } catch (error) {
      restore();
      console.error("Unable to prepare homepage animations.", error);
    }

    return () => {
      if (motionPreference && handleMotionPreferenceChange) {
        motionPreference.removeEventListener(
          "change",
          handleMotionPreferenceChange,
        );
      }
      restore();
    };
  }, []);

  return sectionRef;
}
