"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type UseScrollRevealOptions = {
  /** Porsi elemen yang harus terlihat sebelum dianggap "revealed". */
  threshold?: number;
  /** Diteruskan ke `IntersectionObserver` -- majukan/mundurkan titik trigger. */
  rootMargin?: string;
  /** Sekali reveal lalu berhenti mengamati (default `true`) -- section
   * homepage tidak perlu animasi masuk berulang saat discroll bolak-balik. */
  triggerOnce?: boolean;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// `prefersReducedMotion` dibaca lewat `useSyncExternalStore` (bukan
// disinkronkan via `useState` + `setState` di dalam effect) supaya nilainya
// murni derived state dari API browser, tanpa memicu "setState langsung di
// body effect" (react-hooks/set-state-in-effect).
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Satu-satunya implementasi scroll-reveal di produk ini (§9
 * FRONTEND-DESIGN.md "Animation Skeletons" -- dilarang menulis
 * `IntersectionObserver`/scroll-listener manual per komponen).
 *
 * Dipakai deklaratif: pasang `ref` ke elemen yang mau di-reveal, lalu
 * gerbang class animasi lewat `isRevealed`. Menghormati
 * `prefers-reduced-motion` (§6 poin 8) -- kalau user minta reduced motion,
 * elemen langsung dianggap revealed tanpa observer/animasi sama sekali.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const {
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    triggerOnce = true,
  } = options;
  const ref = useRef<T | null>(null);
  const [isIntersected, setIsIntersected] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            if (triggerOnce) observer.unobserve(entry.target);
          } else if (!triggerOnce) {
            setIsIntersected(false);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, prefersReducedMotion]);

  return { ref, isRevealed: prefersReducedMotion || isIntersected };
}
