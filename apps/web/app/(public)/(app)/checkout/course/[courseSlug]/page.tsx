import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getInternalUserIdByClerkId } from "@/lib/auth";
import { createCheckoutOrder } from "@/lib/checkout";
import { SnapCheckout } from "@/components/snap-checkout";

const SNAP_JS_URL =
  process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";

export default async function CourseCheckoutPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const { userId: clerkUserId } = await auth.protect();
  const userId = await getInternalUserIdByClerkId(clerkUserId);

  if (!userId) {
    return <p>Akun sedang disinkronkan, coba lagi dalam beberapa detik.</p>;
  }

  const result = await createCheckoutOrder(userId, courseSlug);

  if (!result.ok && result.reason === "NOT_FOUND") notFound();
  if (!result.ok && result.reason === "NOT_PURCHASABLE") notFound();

  if (!result.ok && result.reason === "ALREADY_OWNED") {
    return (
      <div>
        <p>Kamu sudah memiliki kelas ini.</p>
        <Link href={`/learn/${courseSlug}`}>Lanjut belajar</Link>
      </div>
    );
  }

  if (result.ok && "existingPending" in result) {
    redirect(`/payment/${result.orderId}`);
  }

  if (result.ok && "snapToken" in result) {
    return (
      <SnapCheckout
        snapToken={result.snapToken}
        orderId={result.orderId}
        clientKey={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY ?? ""}
        snapJsUrl={SNAP_JS_URL}
      />
    );
  }

  notFound();
}
