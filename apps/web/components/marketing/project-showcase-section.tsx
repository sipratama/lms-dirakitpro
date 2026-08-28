import Image from "next/image";

import type { PublicProjectShowcaseItem } from "@/lib/projects";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

// "Hasil Rakitan Mereka" -- query nyata (§ lib/projects.ts), sama prinsip
// kejujuran seperti FeaturedCoursesSection. Belum ada halaman project
// publik yang lengkap (lihat catatan `lib/projects.ts`), jadi card di sini
// bersifat informational, TIDAK ditautkan ke halaman individual.
export function ProjectShowcaseSection({
  projects,
}: {
  projects: PublicProjectShowcaseItem[];
}) {
  return (
    <section
      id="hasil-rakitan"
      className="bg-surface px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Hasil rakitan mereka
          </h2>
          <p className="mt-3 text-foreground-muted">
            Setiap kelas berakhir dengan satu rakitan nyata. Ini beberapa yang
            sudah diselesaikan dan dibagikan learner secara publik.
          </p>
        </ScrollReveal>

        {projects.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                delayMs={index * 80}
                className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface-raised shadow-sm"
              >
                <div className="relative aspect-video shrink-0 bg-accent-muted">
                  {project.screenshotUrl ? (
                    <Image
                      src={project.screenshotUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-3xl font-semibold text-accent">
                        {project.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-base font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    {project.learnerName} &middot; {project.courseTitle}
                  </p>
                  {project.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-foreground-muted">
                      {project.description}
                    </p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal className="mt-8 rounded-3xl border border-border bg-surface-raised p-10 text-center">
            <p className="text-foreground-muted">
              Rakitan pertama dari learner akan tampil di sini begitu ada yang
              menyelesaikan kelas dan membagikannya secara publik.
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
