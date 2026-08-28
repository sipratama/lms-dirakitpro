import Link from "next/link";
import { CheckCircle2, CircleDot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/composite/code-block";
import { BackgroundBlobs } from "@/components/marketing/background-blobs";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

const SNIPPET = `export function BuildProgress({ percent }: { percent: number }) {
  return (
    <div className="h-2 rounded-full bg-accent-muted">
      <div style={{ width: \`\${percent}%\` }} />
    </div>
  );
}`;

function HeroWorkspacePreview() {
  return (
    <div className="relative mx-auto mt-4 flex max-w-md flex-col gap-4 lg:mt-0 lg:h-[420px] lg:max-w-none">
      <div className="rounded-3xl border border-border bg-surface-raised p-5 shadow-md lg:absolute lg:top-0 lg:left-0 lg:w-[300px] lg:-rotate-2">
        <p className="text-xs font-medium text-foreground-muted">
          Progress Rakitan
        </p>
        <p className="mt-1 text-2xl font-semibold text-foreground">68%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-accent-muted">
          <div className="h-full w-[68%] rounded-full bg-accent" />
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground-muted">
          <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />3
          dari 5 modul selesai
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface-raised p-5 shadow-md lg:absolute lg:top-[150px] lg:right-0 lg:w-[260px] lg:rotate-2">
        <p className="text-xs font-medium text-foreground-muted">Modul aktif</p>
        <p className="mt-1 text-sm font-semibold text-foreground">
          Komponen &amp; props di React
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-accent">
          <CircleDot className="size-3.5" aria-hidden="true" />
          Sedang dikerjakan
        </div>
      </div>

      <div className="lg:absolute lg:bottom-0 lg:left-10 lg:w-[320px] lg:rotate-1">
        <CodeBlock
          code={SNIPPET}
          filename="BuildProgress.tsx"
          className="shadow-md"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-16 md:pt-20 md:pb-24">
      <BackgroundBlobs />

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal className="text-center lg:text-left">
          <p className="text-xs font-semibold tracking-widest text-accent">
            MULAI DARI RAKITAN PERTAMA
          </p>

          <h1 className="mt-4 text-4xl leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl md:text-6xl">
            Belajar bikin produk digital, lalu{" "}
            <span className="text-accent">rakit sampai jadi</span>.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg text-foreground-muted text-balance lg:mx-0">
            DirakitPro membantu pemula membangun website, aplikasi, dan produk
            digital lain lewat langkah-langkah praktis dan terstruktur -- bukan
            sekadar teori, tapi rakitan yang benar-benar jadi.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              size="lg"
              className="w-full rounded-full sm:w-auto"
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

        <ScrollReveal delayMs={150}>
          <HeroWorkspacePreview />
        </ScrollReveal>
      </div>
    </section>
  );
}
