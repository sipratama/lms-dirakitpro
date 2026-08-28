// Overlay grain/noise halus (brief "Softly"-inspired redesign). Sengaja
// dipasang lewat komponen terpisah yang HANYA dipakai di
// `app/(public)/layout.tsx` -- bukan root layout -- supaya lesson workspace
// & admin (batas payload/keterbacaan lebih ketat, §2.1 FRONTEND-DESIGN.md)
// tidak ikut menanggung overlay ini. Opacity rendah (~0.25) supaya elegan,
// bukan kotor; `pointer-events: none` + `aria-hidden` karena murni dekoratif.
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="bg-grain pointer-events-none fixed inset-0 z-0 opacity-[0.25] mix-blend-overlay"
    />
  );
}
