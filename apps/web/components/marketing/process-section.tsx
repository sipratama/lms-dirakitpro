import { ClipboardCheck, ListChecks, Sparkles, Trophy } from "lucide-react";

import { ScrollReveal } from "@/components/composite/scroll-reveal";

// "Belajar Sambil Merakit" -- 4 langkah, sengaja BUKAN 4 kartu seragam
// (§1.3 FRONTEND-DESIGN.md ban list "tiga/empat kartu sama besar tanpa
// hierarki"). Tiga langkah pertama duduk di rail sebagai step biasa;
// langkah ke-4 ("Tunjukkan Hasilnya") adalah payoff -- kartu lebih besar,
// warna aksen penuh, elevasi lebih tinggi, jadi hierarki datang dari bobot
// visual, bukan cuma jumlah kolom.
const STEPS = [
  {
    icon: ListChecks,
    title: "Pilih Rakitan",
    description: "Pilih kelas sesuai hasil yang mau kamu bangun.",
  },
  {
    icon: Sparkles,
    title: "Ikuti Materi",
    description: "Baca konsep singkat, langsung ke inti, tanpa basa-basi.",
  },
  {
    icon: ClipboardCheck,
    title: "Kerjakan Checkpoint",
    description: "Uji pemahamanmu sebelum lanjut ke bagian berikutnya.",
  },
] as const;

export function ProcessSection() {
  return (
    <section className="bg-surface px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Belajar sambil merakit
          </h2>
          <p className="mt-3 max-w-2xl text-foreground-muted">
            Bukan sekadar membaca lalu lupa. Empat langkah ini mengarahkan kamu
            dari niat belajar sampai punya sesuatu yang bisa ditunjukkan.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-[1fr_1fr_1fr_1.3fr] lg:gap-5 lg:overflow-visible lg:pb-0">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.title}
                delayMs={index * 100}
                className="w-[75%] shrink-0 snap-start lg:w-auto"
              >
                <div className="relative flex h-full flex-col gap-4 rounded-3xl border border-border bg-surface-raised p-6 shadow-sm">
                  <span className="absolute top-6 right-6 font-mono text-xs text-foreground-subtle">
                    {index + 1}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-accent-muted text-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute top-1/2 -right-4 hidden h-px w-4 bg-border-strong lg:block"
                    />
                  )}
                </div>
              </ScrollReveal>
            );
          })}

          <ScrollReveal
            delayMs={STEPS.length * 100}
            className="w-[80%] shrink-0 snap-start lg:w-auto"
          >
            <div className="flex h-full flex-col justify-between gap-6 rounded-3xl bg-accent p-7 text-accent-foreground shadow-md">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-foreground/10">
                <Trophy className="size-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Tunjukkan Hasilnya</h3>
                <p className="mt-2 text-sm text-accent-foreground/80">
                  Setiap kelas berakhir dengan satu rakitan nyata yang bisa kamu
                  tunjukkan sebagai bukti kemampuan -- bukan sekadar sertifikat.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
