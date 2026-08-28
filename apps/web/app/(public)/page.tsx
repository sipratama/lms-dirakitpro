import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Hammer,
  PencilLine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/domain/catalog/course-card";
import { getFeaturedCourses } from "@/lib/catalog";

// Homepage (playbook langkah 14, domain Catalog) -- satu-satunya `h1` di
// halaman ini ada di hero (§6 FRONTEND-DESIGN.md, satu h1 per halaman).
//
// `force-dynamic`: halaman query `courses` langsung dari DB (bukan lewat
// `fetch`), jadi tidak ada cache otomatis untuk dilepas seperti request
// fetch biasa. Tanpa ini, `next build` mencoba prerender halaman ini secara
// statis dan menjalankan query DB saat build -- CI (`.github/workflows/ci.yml`)
// menjalankan `pnpm build` tanpa Postgres yang jalan, jadi build akan gagal/
// hang menunggu koneksi DB. Konsekuensinya wajar: daftar kelas memang harus
// selalu terbaru per-request, bukan kandidat static/ISR.
export const dynamic = "force-dynamic";

const STEPS = [
  {
    icon: BookOpen,
    title: "Baca",
    description:
      "Konsep dijelaskan secukupnya, langsung ke intinya. Tidak ada teori panjang sebelum kamu mulai praktik.",
  },
  {
    icon: PencilLine,
    title: "Coba",
    description:
      "Ikuti contoh dan tulis sendiri kodenya. Kamu belajar dengan tangan, bukan cuma menonton orang lain mengerjakan.",
  },
  {
    icon: CheckCircle2,
    title: "Cek",
    description:
      "Checkpoint singkat memastikan kamu benar-benar paham, bukan sekadar scroll sampai bawah halaman.",
  },
] as const;

export default async function HomePage() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
          Belajar dengan membaca, mencoba, dan langsung merakit.
        </h1>
        <p className="mt-4 text-lg text-foreground-muted text-balance">
          Tidak perlu menunggu playlist video selesai untuk mulai membuat
          sesuatu.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-sm text-foreground-muted">
          DirakitPro adalah platform belajar berbasis karya, tempat pemula
          belajar dengan membaca, mencoba, dan merakit sesuatu hingga menjadi
          hasil nyata.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" render={<Link href="/register" />}>
            Mulai Merakit
          </Button>
          <Link
            href="/courses"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
          >
            Lihat kelas yang tersedia
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Cara belajarnya */}
      <section className="bg-surface px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Setiap lesson mengikuti pola yang sama
          </h2>
          <p className="mt-3 max-w-2xl text-foreground-muted">
            Materi dipecah jadi langkah kecil yang langsung bisa dipraktikkan,
            supaya progres yang kamu lihat adalah rakitan yang benar-benar jadi,
            bukan sekadar halaman yang sudah dibaca.
          </p>

          <ol className="mt-10 flex flex-col gap-6">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="flex gap-4">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-background text-foreground-muted">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border" />
                    )}
                  </div>
                  <div className="pb-2">
                    <h3 className="font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}

            <li className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Hammer className="size-5" aria-hidden="true" />
              </div>
              <div className="rounded-lg bg-accent-muted p-4">
                <h3 className="text-lg font-semibold text-foreground">Rakit</h3>
                <p className="mt-1 text-sm text-foreground-muted">
                  Semua lesson bermuara ke satu hal: Progress Rakitan yang bisa
                  kamu tunjukkan sebagai hasil nyata. Ini yang paling utama,
                  lebih penting daripada sekadar persentase materi yang sudah
                  dibaca.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Kelas unggulan */}
      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Kelas yang bisa langsung diikuti
              </h2>
              <p className="mt-2 max-w-xl text-foreground-muted">
                Pilih kelas, mulai dari lesson pertama, dan bangun hasil nyata
                sampai selesai.
              </p>
            </div>
            {featuredCourses.length > 0 && (
              <Link
                href="/courses"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
              >
                Lihat semua kelas
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {featuredCourses.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-lg border border-border bg-surface p-8 text-center">
              <p className="text-foreground-muted">
                Kelas pertama sedang dirakit. Pantau halaman ini, kelas akan
                segera terbit.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
