import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CourseCard } from "@/components/domain/catalog/course-card";
import type { FeaturedCourse } from "@/lib/catalog";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

// Restyle shell dari draft awal homepage -- data-fetching & empty-state
// logic TIDAK berubah (§ lib/catalog.ts#getFeaturedCourses, sudah menangani
// error/empty dengan jujur). Hanya visual + copy yang disesuaikan brief ini.
export function FeaturedCoursesSection({
  courses,
}: {
  courses: FeaturedCourse[];
}) {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Kelas yang bisa langsung diikuti
            </h2>
            <p className="mt-2 max-w-xl text-foreground-muted">
              Pilih satu rakitan, mulai dari lesson pertama, dan bangun hasil
              nyata sampai selesai.
            </p>
          </div>
          {courses.length > 0 && (
            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              Lihat semua kelas
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          )}
        </ScrollReveal>

        {courses.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course, index) => (
              <ScrollReveal key={course.slug} delayMs={index * 80}>
                <CourseCard course={course} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal className="mt-8 rounded-3xl border border-border bg-surface p-10 text-center">
            <p className="text-foreground-muted">
              Kelas pertama sedang dirakit. Pantau halaman ini, kelas akan
              segera terbit.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
