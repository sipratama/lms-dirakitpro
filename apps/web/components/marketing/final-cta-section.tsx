import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BackgroundBlobs } from "@/components/marketing/background-blobs";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

export function FinalCtaSection() {
  return (
    <section className="px-4 py-16 sm:px-6 md:py-24">
      <ScrollReveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-accent px-6 py-14 text-center shadow-md sm:px-12 sm:py-20">
        <BackgroundBlobs className="opacity-70" />

        <div className="relative">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-accent-foreground sm:text-4xl md:text-5xl">
            Rakitan pertamamu bisa dimulai hari ini.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-accent-foreground/80">
            Tidak perlu menunggu merasa “siap”. Mulai dari lesson pertama, ikuti
            langkah-langkahnya, dan lihat sendiri hasilnya.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="w-full rounded-full bg-surface-raised text-accent hover:bg-surface-raised/90 sm:w-auto"
              render={<Link href="/register" />}
            >
              Mulai Merakit
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-full border-accent-foreground/30 bg-transparent text-accent-foreground hover:bg-accent-foreground/10 sm:w-auto"
              render={<Link href="/courses" />}
            >
              Lihat Kelas
            </Button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
