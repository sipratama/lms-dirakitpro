import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { db } from "@/db/client";
import { authIdentities, users } from "@/db/schema";

// docs/FRONTEND-DESIGN.md §3.1 "Kontrak scaffold": hanya (learner) dan (admin)
// yang butuh middleware; (public) (termasuk checkout/payment) tidak digerbang di sini.
const isLearnerRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/learn(.*)",
  "/projects/me(.*)",
  "/account(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

async function getUserRole(clerkUserId: string) {
  const [row] = await db
    .select({ role: users.role })
    .from(users)
    .innerJoin(authIdentities, eq(authIdentities.userId, users.id))
    .where(
      and(
        eq(authIdentities.provider, "CLERK"),
        eq(authIdentities.providerUserId, clerkUserId),
      ),
    )
    .limit(1);
  return row?.role ?? null;
}

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    const { userId } = await auth.protect();
    const role = await getUserRole(userId);
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return;
  }

  if (isLearnerRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
