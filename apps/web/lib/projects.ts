import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { projects, projectSubmissions } from "@/db/schema/project";
import { users } from "@/db/schema/identity";
import { courses } from "@/db/schema/catalog";
import { mediaAssets } from "@/db/schema/media";

export type PublicProjectShowcaseItem = {
  id: string;
  title: string;
  description: string | null;
  technologies: string[];
  screenshotUrl: string | null;
  learnerName: string;
  courseTitle: string;
};

const SHOWCASE_LIMIT = 6;

// Hasil Rakitan Mereka (homepage §6 brief) -- query nyata ke `projects` +
// `projectSubmissions`, mengikuti prinsip kejujuran yang sama seperti
// `getFeaturedCourses` (§ lib/catalog.ts): tidak ada data learner palsu.
// Hanya project PUBLIC + VISIBLE yang boleh tampil (PRJ-005/006).
//
// Catatan scope: `users` belum punya kolom `username` (lihat
// `db/schema/identity.ts`), jadi rute publik `/projects/[username]/[slug]`
// belum bisa ditautkan dengan aman dari sini -- itu gap skema domain Project
// yang di luar scope homepage ini. Card showcase karena itu bersifat
// informational (tidak clickable ke halaman project individual) sampai
// kolom username ada dan `PublicProjectCard` (§10.3 FRONTEND-DESIGN.md)
// benar-benar dibangun.
//
// Sengaja menelan error query, sama seperti getFeaturedCourses -- homepage
// tidak boleh crash gara-gara DB blip, dan dari sisi guest "gagal query"
// vs "belum ada rakitan publik" terlihat sama: empty state yang jujur.
export async function getPublicProjectShowcase(): Promise<
  PublicProjectShowcaseItem[]
> {
  try {
    const rows = await db
      .select({
        id: projects.id,
        learnerName: users.displayName,
        courseTitle: courses.title,
        title: projectSubmissions.title,
        description: projectSubmissions.description,
        technologies: projectSubmissions.technologies,
        screenshotUrl: mediaAssets.publicUrl,
        submittedAt: projectSubmissions.submittedAt,
      })
      .from(projects)
      .innerJoin(
        projectSubmissions,
        eq(projectSubmissions.projectId, projects.id),
      )
      .innerJoin(users, eq(users.id, projects.userId))
      .innerJoin(courses, eq(courses.id, projects.courseId))
      .leftJoin(
        mediaAssets,
        eq(mediaAssets.id, projectSubmissions.screenshotAssetId),
      )
      .where(
        and(
          eq(projects.visibility, "PUBLIC"),
          eq(projects.moderationStatus, "VISIBLE"),
        ),
      )
      .orderBy(desc(projectSubmissions.submittedAt))
      .limit(SHOWCASE_LIMIT);

    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description ?? null,
      technologies: row.technologies ?? [],
      screenshotUrl: row.screenshotUrl ?? null,
      learnerName: row.learnerName,
      courseTitle: row.courseTitle,
    }));
  } catch (error) {
    console.error(
      "getPublicProjectShowcase: gagal mengambil daftar rakitan publik",
      error,
    );
    return [];
  }
}
