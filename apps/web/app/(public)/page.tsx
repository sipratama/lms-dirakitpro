import { FloatingNav } from "@/components/marketing/floating-nav";
import { Hero } from "@/components/marketing/hero";
import { ProcessSection } from "@/components/marketing/process-section";
import { FeaturedCoursesSection } from "@/components/marketing/featured-courses-section";
import { WorkspacePreviewSection } from "@/components/marketing/workspace-preview-section";
import { ProjectShowcaseSection } from "@/components/marketing/project-showcase-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCtaSection } from "@/components/marketing/final-cta-section";
import { getFeaturedCourses } from "@/lib/catalog";
import { getPublicProjectShowcase } from "@/lib/projects";

// Homepage (playbook langkah 14, domain Catalog; direstyle penuh sesuai
// brief "Softly"-inspired redesign, lihat laporan tugas untuk rincian
// keputusan). Satu-satunya `h1` di halaman ini ada di dalam `<Hero>` (§6
// FRONTEND-DESIGN.md, satu h1 per halaman).
//
// `force-dynamic`: halaman query `courses` DAN `projects` langsung dari DB
// (bukan lewat `fetch`), jadi tidak ada cache otomatis untuk dilepas seperti
// request fetch biasa. Tanpa ini, `next build` mencoba prerender halaman ini
// secara statis dan menjalankan query DB saat build -- CI
// (`.github/workflows/ci.yml`) menjalankan `pnpm build` tanpa Postgres yang
// jalan, jadi build akan gagal/hang menunggu koneksi DB.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [featuredCourses, publicProjects] = await Promise.all([
    getFeaturedCourses(),
    getPublicProjectShowcase(),
  ]);

  return (
    <>
      <FloatingNav />
      <Hero />
      <ProcessSection />
      <FeaturedCoursesSection courses={featuredCourses} />
      <WorkspacePreviewSection />
      <ProjectShowcaseSection projects={publicProjects} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
