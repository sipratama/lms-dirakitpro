import { auth } from "@clerk/nextjs/server";

import { AppHeader } from "@/components/composite/app-header";

// LearnerShell dashboard/account (§7.2.1) — tanpa sidebar persisten, itu
// khusus lesson workspace (§7.2.2, di luar scope task ini, §14 poin 3).
export default async function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resource-based auth check (bukan proxy path-matching) — redirect ke sign-in kalau belum login.
  await auth.protect();
  return (
    <div data-shell="learner" className="flex min-h-svh flex-col">
      <AppHeader variant="learner" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
