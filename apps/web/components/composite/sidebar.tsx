import Link from "next/link";
import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Menu,
  MessageSquare,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// Sidebar (§10.2 FRONTEND-DESIGN.md) — dipakai AdminShell saja (§14 poin 3).
// Persisten di md+, drawer di bawah md (§7.3).

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// §3.2 AdminShell: Overview, Courses, Users, Orders, Projects, Feedback.
const ADMIN_NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/feedback", label: "Feedback", icon: MessageSquare },
];

function SidebarNavList({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex flex-col gap-1", className)}
      aria-label="Navigasi admin"
    >
      {ADMIN_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

// Trigger + drawer khusus mobile (<md). Diekspor terpisah supaya AdminShell bisa
// menaruhnya di dalam top bar (satu baris bersama AppHeader), bukan menumpuk di
// atasnya — selaras wireframe §7.3 "Top bar + menu drawer".
export function SidebarMobileTrigger() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            aria-label="Buka menu admin"
            className="size-11 md:hidden"
          />
        }
      >
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Menu Admin</SheetTitle>
        </SheetHeader>
        <SidebarNavList className="p-2" />
      </SheetContent>
    </Sheet>
  );
}

// Aside persisten, hanya tampil di md+.
export function Sidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-16 items-center border-b border-border px-4 text-sm font-semibold text-foreground">
        DirakitPro Admin
      </div>
      <SidebarNavList className="p-2" />
    </aside>
  );
}
