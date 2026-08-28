import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BackgroundBlobs } from "@/components/marketing/background-blobs";
import { HeroWorkspace } from "@/components/marketing/hero-workspace";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

// Hero remediasi (laporan tugas 2026-08-29) -- konten kolom kiri di sini,
// visual "Living Product Cluster" dipisah ke `HeroWorkspace` (§28 brief:
// "Separate: hero content, hero visualization, motion configuration").
// Entrance stagger pakai `ScrollReveal` yang sudah ada (bukan komponen
// animasi baru) -- untuk konten above-the-fold, IntersectionObserver-nya
// pada praktiknya trigger di frame pertama, jadi berfungsi sebagai
// "reveal on mount" dengan delay per elemen (§13 brief).
export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-14 pb-16 sm:px-6 sm:pt-16 md:pt-20 md:pb-24">
      <div
        aria-hidden="true"
        className="bg-blueprint-grid pointer-events-none absolute inset-0 -z-20"
      />
      <BackgroundBlobs />

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[47%_53%] lg:gap-10">
        <div className="text-center lg:text-left">
          <ScrollReveal variant="up-md" delayMs={100}>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">
              MULAI DARI RAKITAN PERTAMA
            </p>
          </ScrollReveal>

          <ScrollReveal variant="up-md" delayMs={180}>
            <h1 className="mt-4 text-[clamp(2.75rem,11vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance text-foreground lg:text-[clamp(3.5rem,3.9vw,5.5rem)]">
              Belajar bikin produk digital.
              <br />
              <span className="text-accent lg:whitespace-nowrap">
                Rakit sampai jadi.
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="up-md" delayMs={300}>
            <p className="mx-auto mt-6 max-w-md text-base text-balance text-foreground-muted sm:text-lg lg:mx-0">
              Ikuti materi yang terarah, kerjakan checkpoint, dan bangun project
              nyata langkah demi langkah tanpa harus jago dulu untuk mulai.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="up-md" delayMs={420}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full rounded-full transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-md active:translate-y-0 active:scale-[0.985] sm:w-auto"
                render={<Link href="/register" />}
              >
                Mulai Merakit
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full sm:w-auto"
                render={<Link href="/courses" />}
              >
                Lihat Kelas
              </Button>
            </div>
          </ScrollReveal>
        </div>

        <HeroWorkspace />
      </div>
    </section>
  );
}
