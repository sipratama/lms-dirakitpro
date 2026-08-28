import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// AppHeader (§10.2 FRONTEND-DESIGN.md) — satu komponen, varian per shell
// (public/learner/admin), bukan tiga header terpisah.
export type AppHeaderVariant = "public" | "learner" | "admin";

interface NavItem {
  href: string;
  label: string;
}

// §3.2: nav publik cuma "Kelas" — satu baris, tanpa mega-menu.
const PUBLIC_NAV: NavItem[] = [{ href: "/courses", label: "Kelas" }];

// §3.2 menyebut "Dashboard, Kelas Saya, Akun" untuk LearnerShell, tapi route map
// (§3.1) hanya punya /dashboard dan /account(/orders) — tidak ada route "kelas
// saya" terpisah, dan /dashboard sendiri memang halaman ringkasan "kelas
// aktif/selesai" (§7.2.1). Judgment call: dua link nyata ke dua halaman nyata
// ("Kelas Saya" -> /dashboard, "Akun" -> /account) dipilih daripada dua nav item
// berlabel beda yang mengarah ke URL identik (antipattern IA yang membingungkan).
const LEARNER_NAV: NavItem[] = [
  { href: "/dashboard", label: "Kelas Saya" },
  { href: "/account", label: "Akun" },
];

function Wordmark() {
  return (
    <Link
      href="/"
      className="shrink-0 text-base font-semibold tracking-tight text-foreground"
    >
      Dirakit<span className="text-accent">Pro</span>
    </Link>
  );
}

function DesktopNav({ items }: { items: NavItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav
      className="hidden items-center gap-6 md:flex"
      aria-label="Navigasi utama"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav({
  items,
  showAuthLinks,
}: {
  items: NavItem[];
  showAuthLinks: boolean;
}) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Buka menu navigasi"
            className="size-11 md:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent className="w-72 p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Navigasi mobile">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
            >
              {item.label}
            </Link>
          ))}
          {showAuthLinks && (
            <Show when="signed-out">
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                <Link
                  href="/login"
                  className="flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="flex min-h-11 items-center justify-center rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                >
                  Daftar
                </Link>
              </div>
            </Show>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function PublicAuthCta() {
  return (
    // UserButton tetap tampil di semua breakpoint (bukan hanya desktop) —
    // pengguna yang sudah masuk butuh akses akun dari mobile juga, dan
    // MobileNav sheet tidak menduplikasi UserButton Clerk. Masuk/Daftar sudah
    // ada duplikatnya di dalam MobileNav sheet, jadi fallback ini cukup
    // ditampilkan di desktop.
    <Show
      when="signed-in"
      fallback={
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" render={<Link href="/login" />}>
            Masuk
          </Button>
          <Button size="sm" render={<Link href="/register" />}>
            Daftar
          </Button>
        </div>
      }
    >
      <UserButton />
    </Show>
  );
}

export function AppHeader({
  variant,
  leadingSlot,
}: {
  variant: AppHeaderVariant;
  /** Admin only: trigger drawer Sidebar mobile, dirender satu baris dengan top bar (§7.3). */
  leadingSlot?: React.ReactNode;
}) {
  if (variant === "admin") {
    // AdminShell menaruh navigasi utama di Sidebar (§7.3) — top bar cuma
    // trigger drawer mobile (md ke bawah) + brand + akun, minimal.
    return (
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-2 md:h-16 md:px-6">
        <div className="flex items-center gap-2">
          {leadingSlot}
          <Wordmark />
        </div>
        <UserButton />
      </header>
    );
  }

  const navItems = variant === "learner" ? LEARNER_NAV : PUBLIC_NAV;

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 md:px-6">
      <div className="flex items-center gap-8">
        <Wordmark />
        <DesktopNav items={navItems} />
      </div>

      <div className="flex items-center gap-2">
        {variant === "learner" ? <UserButton /> : <PublicAuthCta />}
        <MobileNav items={navItems} showAuthLinks={variant === "public"} />
      </div>
    </header>
  );
}
