import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { courses, mediaAssets } from "@/db/schema";

export type FeaturedCourse = {
  slug: string;
  title: string;
  shortOutcome: string;
  level: (typeof courses.$inferSelect)["level"];
  isFree: boolean;
  priceAmount: number;
  currency: string;
  estimatedDurationMinutes: number | null;
  thumbnailUrl: string | null;
};

const FEATURED_COURSES_LIMIT = 6;

// Teaser homepage (§20 MVP DoD: "Guest dapat memahami positioning dan
// melihat minimal satu PUBLISHED course"). Bentuk query cukup generik untuk
// dipakai ulang oleh /courses (katalog penuh) nanti, cukup ganti `.limit()`
// dan menambah filter/pagination di sana, bukan menulis query kedua.
//
// Sengaja menelan error query (bukan melempar ulang): homepage tidak boleh
// crash/nge-500 gara-gara DB blip sesaat (§12 FRONTEND-DESIGN.md "State
// Coverage" -- error state fetch harus dirancang, bukan dibiarkan uncaught).
// Dari sisi guest, "gagal query" dan "belum ada course" terlihat sama:
// section kelas kosong dengan pesan yang jujur, bukan halaman error generik.
export async function getFeaturedCourses(): Promise<FeaturedCourse[]> {
  try {
    const rows = await db
      .select({
        slug: courses.slug,
        title: courses.title,
        shortOutcome: courses.shortOutcome,
        level: courses.level,
        isFree: courses.isFree,
        priceAmount: courses.priceAmount,
        currency: courses.currency,
        estimatedDurationMinutes: courses.estimatedDurationMinutes,
        thumbnailUrl: mediaAssets.publicUrl,
      })
      .from(courses)
      .leftJoin(mediaAssets, eq(mediaAssets.id, courses.thumbnailAssetId))
      .where(and(eq(courses.status, "PUBLISHED"), isNull(courses.deletedAt)))
      .orderBy(desc(courses.publishedAt))
      .limit(FEATURED_COURSES_LIMIT);

    return rows.map((row) => ({
      ...row,
      thumbnailUrl: row.thumbnailUrl ?? null,
    }));
  } catch (error) {
    console.error("getFeaturedCourses: gagal mengambil daftar course", error);
    return [];
  }
}
