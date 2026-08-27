export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-shell="public">{children}</div>;
}
