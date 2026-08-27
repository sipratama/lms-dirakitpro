import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getUserRoleByClerkId } from "@/lib/auth";

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
  return <div data-shell="admin">{children}</div>;
}
