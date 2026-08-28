"use client";

import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  useScrollReveal,
  type UseScrollRevealOptions,
} from "@/hooks/use-scroll-reveal";

// Wrapper deklaratif di atas `useScrollReveal` (§9 FRONTEND-DESIGN.md) --
// section homepage tinggal membungkus konten, tidak perlu menulis
// observer/ref boilerplate sendiri di tiap tempat.
export function ScrollReveal({
  children,
  as: Component = "div",
  className,
  delayMs = 0,
  ...options
}: UseScrollRevealOptions & {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Jeda tampil, dipakai untuk stagger antar-elemen dalam satu section. */
  delayMs?: number;
}) {
  const { ref, isRevealed } = useScrollReveal<HTMLDivElement>(options);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        isRevealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
      style={{ transitionDelay: isRevealed ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </Component>
  );
}
