import { cn } from "@/lib/utils";

// Blob latar blur bernuansa --accent-muted (Keputusan #9 §14
// FRONTEND-DESIGN.md) -- dipakai di hero & final CTA. Murni dekoratif
// (aria-hidden), tidak boleh menurunkan kontras teks di atasnya (opacity
// rendah + `blur` besar + `-z-10` supaya selalu di belakang konten).
export function BackgroundBlobs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="animate-float-blob absolute top-0 -left-24 size-72 rounded-full bg-accent-muted opacity-40 blur-3xl sm:size-96" />
      <div className="animate-float-blob-slow animate-float-blob-delay absolute -bottom-16 right-[-4rem] size-80 rounded-full bg-accent opacity-20 blur-3xl sm:size-[28rem]" />
    </div>
  );
}
