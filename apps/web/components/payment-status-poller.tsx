"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const POLL_INTERVAL_MS = 3000;

// Server component (app/(public)/payment/[orderId]/page.tsx) hanya merender komponen ini
// selagi order.status === 'PENDING'; begitu webhook mengubah status, refresh berikutnya
// akan berhenti me-render poller ini karena kondisinya dicek ulang tiap render server.
export function PaymentStatusPoller() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => router.refresh(), POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [router]);

  return null;
}
