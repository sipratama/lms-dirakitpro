import { AppHeader } from "@/components/composite/app-header";

// Nested group khusus halaman publik "app-like" (courses, login, register,
// forgot-password, checkout, payment) -- semua tetap pakai AppHeader biasa.
// Homepage (`(public)/page.tsx`) sengaja DI LUAR group ini: dia punya
// `FloatingNav` sendiri (lihat components/marketing/floating-nav.tsx), dan
// menumpuk AppHeader + FloatingNav di viewport pertama homepage adalah bug
// tampilan, bukan pilihan desain -- makanya dipisah lewat nested route group
// ini alih-alih conditional render di satu layout yang sama.
export default function PublicAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader variant="public" />
      {children}
    </>
  );
}
