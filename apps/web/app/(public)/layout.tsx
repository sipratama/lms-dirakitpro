import Link from "next/link";

import { GrainOverlay } from "@/components/marketing/grain-overlay";

// PublicShell (§7.1 FRONTEND-DESIGN.md): konten + footer ringkas (bukan
// mega-footer, tanpa strip lokasi/cuaca dekoratif — §1.3).
//
// AppHeader TIDAK dipasang di sini lagi -- dipindah ke
// `(public)/(app)/layout.tsx` supaya cuma dipakai halaman publik "app-like"
// (courses/login/register/checkout/payment). Homepage (`page.tsx`, di luar
// nested group `(app)`) punya `FloatingNav` sendiri; menumpuk AppHeader di
// atasnya adalah bug tampilan, bukan pilihan desain.
//
// `GrainOverlay` dipasang di sini (bukan root layout) supaya scope-nya
// hanya (public) route group -- lesson workspace & admin punya batas
// payload/keterbacaan lebih ketat (§2.1) dan tidak boleh ikut menanggung
// tekstur dekoratif ini.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-shell="public" className="relative flex min-h-svh flex-col">
      <GrainOverlay />
      <main className="relative z-10 flex-1">{children}</main>
      <footer className="relative z-10 border-t border-border">
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
