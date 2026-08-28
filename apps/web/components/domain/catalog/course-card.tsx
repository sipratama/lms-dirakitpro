import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import type { FeaturedCourse } from "@/lib/catalog";

// CourseCard (§10.3 FRONTEND-DESIGN.md) -- domain component untuk `courses`.
// Dipakai teaser homepage sekarang; bentuk props sengaja generik (bukan
// mengambil query result langsung) supaya katalog /courses nanti bisa pakai
// ulang tanpa refactor, meski filter/pagination katalog belum dibangun di sini.
export type CourseCardData = Pick<
  FeaturedCourse,
  | "slug"
  | "title"
  | "shortOutcome"
  | "level"
  | "isFree"
  | "priceAmount"
  | "currency"
  | "estimatedDurationMinutes"
  | "thumbnailUrl"
>;

const LEVEL_LABEL: Record<CourseCardData["level"], string> = {
  BEGINNER: "Pemula",
  INTERMEDIATE: "Menengah",
  ADVANCED: "Mahir",
};

function formatPrice(
  course: Pick<CourseCardData, "isFree" | "priceAmount" | "currency">,
) {
  if (course.isFree) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: course.currency || "IDR",
    maximumFractionDigits: 0,
  }).format(course.priceAmount);
}

function formatDuration(minutes: number | null) {
  if (!minutes || minutes <= 0) return null;
  if (minutes >= 60) {
    const hours = Math.round(minutes / 60);
    return `~${hours} jam`;
  }
  return `~${minutes} menit`;
}

export function CourseCard({ course }: { course: CourseCardData }) {
  const duration = formatDuration(course.estimatedDurationMinutes);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="relative aspect-video shrink-0 bg-accent-muted">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-semibold text-accent">
              {course.title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-foreground-muted">
          <span className="rounded-full border border-border px-2 py-0.5">
            {LEVEL_LABEL[course.level]}
          </span>
          {duration && (
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {duration}
            </span>
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground group-hover:text-accent">
            {course.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">
            {course.shortOutcome}
          </p>
        </div>

        <p className="text-sm font-semibold text-foreground">
          {formatPrice(course)}
        </p>
      </div>
    </Link>
  );
}
