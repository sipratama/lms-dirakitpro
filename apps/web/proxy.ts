import { clerkMiddleware } from "@clerk/nextjs/server";

// Cuma menyalakan konteks auth Clerk (auth()/currentUser()) di seluruh app.
// Proteksi route SENGAJA tidak dilakukan di sini lewat path-matching (createRouteMatcher) —
// Clerk sendiri menandai pola itu deprecated karena bisa "diverge" dari routing Next.js yang
// sebenarnya. Proteksi dipindah ke resource-based auth check langsung di tiap layout yang
// butuh: app/(learner)/layout.tsx dan app/(admin)/layout.tsx (auth.protect() di situ).
// https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
