import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserRoleByClerkId } from "@/lib/auth";

import { AppHeader } from "@/components/composite/app-header";
import { Sidebar, SidebarMobileTrigger } from "@/components/composite/sidebar";

// AdminShell (§7.3): sidebar fixed di md+ / drawer di bawahnya, top bar minimal
// karena navigasi utama sudah dibawa Sidebar (§14 poin 6 — boleh lebih
// utilitarian daripada shell publik/learner, tetap satu sistem token).
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resource-based auth check: redirect ke sign-in kalau belum login (bawaan auth.protect()),
  // lalu 404 kalau login tapi bukan ADMIN — mengikuti tabel perilaku resmi auth.protect() di Clerk.
  const { userId } = await auth.protect();
  const role = await getUserRoleByClerkId(userId);
  if (role !== "ADMIN") {
    notFound();
  }
  return (
    <div data-shell="admin" className="flex min-h-svh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader variant="admin" leadingSlot={<SidebarMobileTrigger />} />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
