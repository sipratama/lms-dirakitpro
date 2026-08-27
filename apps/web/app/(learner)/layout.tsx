import { auth } from "@clerk/nextjs/server";

export default async function LearnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Resource-based auth check (bukan proxy path-matching) — redirect ke sign-in kalau belum login.
  await auth.protect();
  return <div data-shell="learner">{children}</div>;
}
