import Link from "next/link";

import { AppHeader } from "@/components/composite/app-header";

// PublicShell (§7.1 FRONTEND-DESIGN.md): header satu baris + konten + footer
// ringkas (bukan mega-footer, tanpa strip lokasi/cuaca dekoratif — §1.3).
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-shell="public" className="flex min-h-svh flex-col">
      <AppHeader variant="public" />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-sm text-foreground-muted sm:flex-row sm:justify-between sm:px-6">
          <p>DirakitPro</p>
          <Link
            href="/courses"
            className="font-medium text-foreground hover:text-accent"
          >
            Lihat semua kelas
          </Link>
        </div>
      </footer>
    </div>
  );
}
