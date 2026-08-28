"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Animasi angka 0 -> target sekali saat `startWhen` jadi true (dipakai kartu
 * Progress Rakitan di hero, §17 laporan remediasi hero) -- bukan loop,
 * berhenti tepat di nilai akhir begitu durasi habis. Menghormati
 * `prefers-reduced-motion`: langsung lompat ke `target` tanpa rAF loop.
 */
export function useCountUp(
  target: number,
  startWhen: boolean,
  durationMs = 1000,
  startDelayMs = 0,
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen || prefersReducedMotion) return;

    let frame: number;

    function animate() {
      const start = performance.now();

      function tick(now: number) {
        const progress = Math.min((now - start) / durationMs, 1);
        setValue(Math.round(target * easeOutQuart(progress)));
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        }
      }

      frame = requestAnimationFrame(tick);
    }

    const timeout = window.setTimeout(animate, startDelayMs);
    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [startWhen, prefersReducedMotion, target, durationMs, startDelayMs]);

  return prefersReducedMotion ? target : value;
}
