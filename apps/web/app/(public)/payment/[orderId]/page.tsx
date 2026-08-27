export default async function PaymentStatusPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  return <h1>Status Pembayaran: {orderId}</h1>;
}
