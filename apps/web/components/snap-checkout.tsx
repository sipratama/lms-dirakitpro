"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: Record<string, () => void>) => void;
    };
  }
}

type SnapCheckoutProps = {
  snapToken: string;
  snapJsUrl: string;
  clientKey: string;
  orderId: string;
};

export function SnapCheckout({
  snapToken,
  snapJsUrl,
  clientKey,
  orderId,
}: SnapCheckoutProps) {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = snapJsUrl;
    script.setAttribute("data-client-key", clientKey);

    const goToStatus = () => router.push(`/payment/${orderId}`);

    script.onload = () => {
      window.snap?.pay(snapToken, {
        onSuccess: goToStatus,
        onPending: goToStatus,
        onError: goToStatus,
        onClose: goToStatus,
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [snapToken, snapJsUrl, clientKey, orderId, router]);

  return (
    <div>
      <h1>Pembayaran</h1>
      <p>Membuka pembayaran…</p>
    </div>
  );
}
