import { useEffect, useRef } from "react";

/** Event-driven depth: no idle animation loop, no motion when reduced-motion is set. */
export function useParallax<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let visible = false;
    let frame = 0;
    let pointerX = 0;
    function update() {
      frame = 0;
      if (reduced.matches || !visible) return;
      const box = element!.getBoundingClientRect();
      const limit = coarse.matches ? 12 : 28;
      const offset = Math.max(
        -limit,
        Math.min(limit, (innerHeight * 0.4 - box.top - box.height / 2) * 0.1),
      );
      element!.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      element!.style.setProperty("--pointer-x", `${pointerX.toFixed(2)}px`);
    }
    function request() {
      if (!reduced.matches && visible && !frame) frame = requestAnimationFrame(update);
    }
    function pointer(event: PointerEvent) {
      if (coarse.matches || reduced.matches) return;
      const box = element!.getBoundingClientRect();
      pointerX = ((event.clientX - box.left) / box.width - 0.5) * 10;
      request();
    }
    function resetPointer() {
      pointerX = 0;
      request();
    }
    function preference() {
      if (reduced.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        element!.style.removeProperty("--parallax-y");
        element!.style.removeProperty("--pointer-x");
      } else request();
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        window.removeEventListener("scroll", request);
        if (visible) {
          window.addEventListener("scroll", request, { passive: true });
          request();
        }
      },
      { rootMargin: "40px" },
    );
    observer.observe(element);
    window.addEventListener("resize", request, { passive: true });
    element.addEventListener("pointermove", pointer, { passive: true });
    element.addEventListener("pointerleave", resetPointer);
    reduced.addEventListener("change", preference);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      element.removeEventListener("pointermove", pointer);
      element.removeEventListener("pointerleave", resetPointer);
      reduced.removeEventListener("change", preference);
    };
  }, []);
  return ref;
}
