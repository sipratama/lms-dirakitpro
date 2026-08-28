"use client";

import Link from "next/link";
import { Hammer, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// FloatingNav -- khusus homepage (`/`), lihat catatan scope di laporan akhir
// tugas ini: shell publik (`app/(public)/layout.tsx`) tetap memakai
// `AppHeader` yang sudah ada untuk seluruh halaman publik lain, TIDAK
// diubah di sini. Komponen ini murni tambahan section di dalam
// `app/(public)/page.tsx`, bukan pengganti shell.
//
// Posisi `sticky` (bukan `fixed`) supaya di scroll position 0 dia tetap
// dalam alur dokumen tepat di bawah AppHeader (bukan menimpa/overlap), lalu
// menempel di `top-4` begitu discroll -- AppHeader sendiri statis (bukan
// sticky) jadi akan tergulir keluar layar lebih dulu.
const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Kelas" },
  { href: "#hasil-rakitan", label: "Hasil Rakitan" },
  { href: "#faq", label: "FAQ" },
];

export function FloatingNav() {
  return (
    <div className="sticky top-4 z-40 px-4 sm:px-6">
      <nav
        aria-label="Navigasi homepage"
        className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 rounded-full border border-border bg-surface-raised/80 pr-2 pl-4 shadow-md backdrop-blur-md supports-backdrop-filter:bg-surface-raised/60"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Hammer className="size-3.5" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">
            Dirakit<span className="text-accent">Pro</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            render={<Link href="/register" />}
            className="hidden rounded-full sm:inline-flex"
            size="sm"
          >
            Mulai Merakit
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Buka menu navigasi"
                  className="rounded-full md:hidden"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent className="w-72 p-0">
              <SheetHeader className="border-b border-border">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-1 p-4"
                aria-label="Navigasi mobile"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/register"
                  className="mt-2 flex min-h-11 items-center justify-center rounded-full bg-accent px-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Mulai Merakit
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
