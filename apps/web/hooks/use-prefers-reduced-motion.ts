"use client";

import { useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Sumber kebenaran bersama untuk `prefers-reduced-motion` (§6 poin 8
 * FRONTEND-DESIGN.md) -- dipakai oleh `useCountUp` dan orkestrasi hero
 * lainnya supaya subscribe boilerplate-nya tidak ditulis ulang di tiap hook
 * (`useScrollReveal` punya salinannya sendiri karena ditulis lebih dulu,
 * sengaja tidak direfactor di sini untuk menjaga scope perubahan tetap
 * hero-only).
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
