import { CheckCircle2, ImageIcon, Info } from "lucide-react";

import { CodeBlock } from "@/components/composite/code-block";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

const SNIPPET = `function Button({ children }) {
  return (
    <button className="rounded-full bg-accent px-4 py-2">
      {children}
    </button>
  );
}`;

// Learning Experience -- ilustrasi rasa memakai produk (belum ada konten
// lesson sungguhan karena domain Learning belum dibangun, lihat catatan di
// laporan akhir). Ini representasi generik yang jujur: judul lesson contoh
// dan potongan kode contoh boleh dipakai untuk marketing, TAPI tidak
// mengaku sebagai testimoni/hasil pengguna sungguhan.
export function WorkspacePreviewSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Belajar dengan alur yang jelas, bukan hanya tumpukan materi
            pembelajaran
          </h2>
          <p className="mt-3 text-foreground-muted">
            Materi text-first, contoh kode nyata, dan progres yang selalu
            kelihatan supaya kamu tahu persis sudah sampai mana.
          </p>
        </ScrollReveal>

        <ScrollReveal
          delayMs={150}
          className="relative mt-12 lg:grid lg:grid-cols-[1fr_320px] lg:gap-6"
        >
          <div className="overflow-hidden rounded-[2rem] border border-border bg-surface-raised shadow-md">
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-border-strong" />
                <span className="size-2.5 rounded-full bg-border-strong" />
              </div>
              <p className="text-xs font-medium text-foreground-muted">
                Modul 2 &middot; Membuat komponen tombol
              </p>
            </div>

            <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Komponen bisa dipakai ulang
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                    Daripada menulis tombol yang sama berulang kali, kita
                    bungkus jadi satu komponen. Setiap perubahan gaya cukup
                    dilakukan di satu tempat.
                  </p>
                </div>

                <div className="flex gap-2.5 rounded-2xl bg-info/10 p-3.5 text-sm text-foreground">
                  <Info
                    className="mt-0.5 size-4 shrink-0 text-info"
                    aria-hidden="true"
                  />
                  <p>
                    Konsep ini juga dipakai di hampir semua framework modern,
                    jadi worth dipahami betul dari awal.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-dashed border-border-strong bg-surface p-3.5 text-xs text-foreground-muted">
                  <ImageIcon className="size-8 shrink-0" aria-hidden="true" />
                  <span>
                    Ilustrasi: screenshot hasil tombol setelah dijalankan
                    (contoh tampilan block gambar pada lesson)
                  </span>
                </div>
              </div>

              <CodeBlock
                code={SNIPPET}
                language="tsx"
                filename="Button.tsx"
                caption="Contoh potongan kode lesson"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-4 overflow-x-auto pb-1 lg:mt-0 lg:flex-col lg:overflow-visible">
            <div className="w-56 shrink-0 rounded-3xl border border-border bg-surface-raised p-4 shadow-sm lg:w-auto">
              <p className="text-xs font-medium text-foreground-muted">
                Progress Rakitan
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-accent-muted">
                <div className="h-full w-3/5 rounded-full bg-accent" />
              </div>
              <p className="mt-2 text-xs text-foreground-muted">
                3 dari 5 modul
              </p>
            </div>

            <div className="flex w-56 shrink-0 items-center gap-2.5 rounded-3xl border border-border bg-surface-raised p-4 shadow-sm lg:w-auto">
              <CheckCircle2 className="size-5 text-accent" aria-hidden="true" />
              <div>
                <p className="text-xs font-medium text-foreground-muted">
                  Checkpoint
                </p>
                <p className="text-sm font-semibold text-foreground">Lulus</p>
              </div>
            </div>

            <div className="w-56 shrink-0 rounded-3xl bg-accent-muted p-4 lg:w-auto">
              <p className="text-xs font-medium text-foreground">
                Build milestone
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                Tombol siap dipakai
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
