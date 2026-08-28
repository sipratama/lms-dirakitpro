"use client";

import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  useScrollReveal,
  type UseScrollRevealOptions,
} from "@/hooks/use-scroll-reveal";

type Variant = "up" | "up-md" | "up-sm" | "right" | "assemble";

// Kelas hidden/visible per variant. "up" adalah perilaku asli (translateY
// 24px) dan tetap default -- semua pemakaian ScrollReveal yang sudah ada di
// section homepage lain tidak berubah. Variant lain dipakai hero product
// cluster (§13-14 laporan remediasi hero) yang butuh translateX/scale
// berbeda per kartu, bukan translateY seragam.
const VARIANT_HIDDEN: Record<Variant, string> = {
  up: "translate-y-6 opacity-0",
  "up-md": "translate-y-4 opacity-0",
  "up-sm": "translate-y-2.5 opacity-0",
  right: "translate-x-3 opacity-0",
  assemble: "translate-y-[18px] scale-[0.985] opacity-0",
};

const VARIANT_VISIBLE: Record<Variant, string> = {
  up: "translate-y-0 opacity-100",
  "up-md": "translate-y-0 opacity-100",
  "up-sm": "translate-y-0 opacity-100",
  right: "translate-x-0 opacity-100",
  assemble: "translate-y-0 scale-100 opacity-100",
};

// Easing lebih halus (ease-out-quart) untuk variant baru hero -- "up" default
// tetap `ease-out` bawaan Tailwind supaya section lain tidak ikut berubah.
const VARIANT_EASING: Record<Variant, string> = {
  up: "ease-out",
  "up-md": "[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
  "up-sm": "[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
  right: "[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
  assemble: "[transition-timing-function:cubic-bezier(0.25,1,0.5,1)]",
};

// Wrapper deklaratif di atas `useScrollReveal` (§9 FRONTEND-DESIGN.md) --
// section homepage tinggal membungkus konten, tidak perlu menulis
// observer/ref boilerplate sendiri di tiap tempat.
export function ScrollReveal({
  children,
  as: Component = "div",
  className,
  delayMs = 0,
  variant = "up",
  ...options
}: UseScrollRevealOptions & {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Jeda tampil, dipakai untuk stagger antar-elemen dalam satu section. */
  delayMs?: number;
  /** Arah & bentuk transform saat masuk -- default "up" dipertahankan untuk
   * seluruh pemakaian existing. */
  variant?: Variant;
}) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(options);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 will-change-transform",
        VARIANT_EASING[variant],
        isRevealed ? VARIANT_VISIBLE[variant] : VARIANT_HIDDEN[variant],
        className,
      )}
      style={{ transitionDelay: isRevealed ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}
