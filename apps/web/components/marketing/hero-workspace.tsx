"use client";

import { CheckCircle2, CircleDot } from "lucide-react";

import { ScrollReveal } from "@/components/composite/scroll-reveal";
import { useCountUp } from "@/hooks/use-count-up";

// "Living Product Cluster" (§7-11, §14 brief remediasi hero) -- satu
// workspace utama (anchor) + 3 kartu state pendukung, dihubungkan connector
// SVG tipis. Bukan tiga kartu SaaS lepas: workspace adalah pusat cerita
// "belajar -> bangun -> checkpoint -> progress", kartu lain menopangnya.
//
// Baris kode & konten kartu di bawah ini ilustrasi produk (storytelling),
// BUKAN kode produksi yang harus akurat -- sesuai batas §8 brief ("purpose
// is product storytelling, not showing readable production code").
const CODE_LINES: {
  className: string;
  segments: { text: string; keyword?: boolean }[];
}[] = [
  {
    className: "animate-hero-line-1",
    segments: [
      { text: "function", keyword: true },
      { text: " BuildProgress() {" },
    ],
  },
  {
    className: "animate-hero-line-2",
    segments: [
      { text: "  return", keyword: true },
      { text: " <Bar value={68} />;" },
    ],
  },
  {
    className: "animate-hero-line-3",
    segments: [{ text: "}" }],
  },
];

const CONNECTOR_MODULE_PATH = "M226,258 C188,286 150,296 112,326";

function WorkspaceCard() {
  return (
    <div className="relative w-[300px] overflow-hidden rounded-3xl border border-border bg-foreground shadow-md sm:w-[340px]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="truncate font-mono text-xs text-white/70">
          BuildProgress.tsx
        </span>
      </div>

      <div className="px-4 py-4">
        <p className="text-[11px] font-medium tracking-wide text-white/40 uppercase">
          Materi
        </p>
        <p className="mt-1 text-sm font-semibold text-white">
          Merakit Progress Component
        </p>

        <pre className="mt-3 overflow-x-auto rounded-xl bg-white/5 px-3 py-2.5">
          <code className="grid gap-0.5 font-mono text-[12.5px] leading-relaxed text-white/80">
            {CODE_LINES.map((line, index) => (
              <span key={line.className} className={line.className}>
                {line.segments.map((segment, segmentIndex) => (
                  <span
                    key={segmentIndex}
                    className={
                      segment.keyword ? "text-accent font-medium" : undefined
                    }
                  >
                    {segment.text}
                  </span>
                ))}
                {index === CODE_LINES.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="animate-hero-cursor ml-1 inline-block h-3 w-[2px] translate-y-0.5 bg-accent align-middle"
                  />
                )}
              </span>
            ))}
          </code>
        </pre>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-white/70">
          <CircleDot className="size-3.5 text-accent" aria-hidden="true" />
          Hubungkan progress dengan milestone
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] text-white/40">
          Checkpoint 03
        </span>
        <span className="text-[11px] font-medium text-accent">
          Sedang dikerjakan
        </span>
      </div>
    </div>
  );
}

function ProgressCard() {
  const value = useCountUp(68, true, 1000, 950);

  return (
    <div className="w-[220px] rotate-[-2deg] rounded-3xl border border-border bg-surface-raised p-5 shadow-md">
      <p className="text-xs font-medium text-foreground-muted">
        Progress Rakitan
      </p>
      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground tabular-nums">
        {value}%
      </p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-accent-muted">
        <div className="animate-hero-progress-fill h-full rounded-full bg-accent" />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-foreground-muted">
        <CheckCircle2 className="size-3.5 text-accent" aria-hidden="true" />3
        dari 5 modul selesai
      </p>
    </div>
  );
}

function ModuleCard() {
  return (
    <div className="w-[230px] rotate-[-1deg] rounded-3xl border border-border bg-surface-raised p-5 shadow-md">
      <p className="text-xs font-medium text-foreground-muted">Modul aktif</p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        Komponen &amp; props di React
      </p>
      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-accent">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Sedang dikerjakan
      </div>
    </div>
  );
}

function CheckpointCard() {
  return (
    <div className="w-[190px] rotate-[2deg] rounded-3xl border border-border bg-surface-raised p-5 shadow-md">
      <p className="text-xs font-medium text-foreground-muted">Checkpoint</p>
      <p className="mt-1 text-sm font-semibold text-foreground">
        Component berhasil dirender
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-accent">
        <CheckCircle2 className="size-3.5" aria-hidden="true" />
        Selesai
      </div>
    </div>
  );
}

// Connector tipis antar-kartu (§18 brief, opsional tapi dipakai di sini
// karena posisi kartu sudah tetap/diketahui) -- murni dekoratif, satu titik
// biru berjalan sekali di sepanjang SATU connector (workspace -> modul) buat
// menyiratkan "dirakit" tanpa jadi diagram jaringan. Koordinat mengikuti
// posisi absolute kartu di `HeroWorkspace` di bawah -- kalau posisi kartu
// berubah, path ini perlu disesuaikan bareng.
function HeroConnectors() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 460 520"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
    >
      <path
        d="M96,110 C132,142 152,164 182,190"
        stroke="rgba(33,150,243,0.15)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d={CONNECTOR_MODULE_PATH}
        stroke="rgba(33,150,243,0.15)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M266,258 C304,286 336,304 366,332"
        stroke="rgba(33,150,243,0.15)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle
        r="3.5"
        fill="var(--accent)"
        className="animate-hero-connector-dot"
        style={{ offsetPath: `path('${CONNECTOR_MODULE_PATH}')` }}
      />
    </svg>
  );
}

export function HeroWorkspace() {
  return (
    <div className="relative mx-auto flex max-w-md flex-col items-center gap-5 lg:h-[500px] lg:max-w-none lg:items-stretch lg:gap-0">
      <HeroConnectors />

      <ScrollReveal
        variant="up-md"
        delayMs={250}
        className="animate-hero-float-progress lg:absolute lg:top-2 lg:left-[6%]"
      >
        <ProgressCard />
      </ScrollReveal>

      <ScrollReveal
        variant="assemble"
        delayMs={380}
        className="animate-hero-float-workspace lg:absolute lg:top-[110px] lg:left-1/2 lg:-translate-x-1/2"
      >
        <WorkspaceCard />
      </ScrollReveal>

      <ScrollReveal
        variant="right"
        delayMs={520}
        className="animate-hero-float-module lg:absolute lg:bottom-6 lg:left-0"
      >
        <ModuleCard />
      </ScrollReveal>

      <ScrollReveal
        variant="up-sm"
        delayMs={650}
        className="hidden lg:absolute lg:right-[2%] lg:bottom-0 lg:block"
      >
        <CheckpointCard />
      </ScrollReveal>
    </div>
  );
}
