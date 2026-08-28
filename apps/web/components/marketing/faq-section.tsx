import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/composite/scroll-reveal";

// Jawaban konsisten dengan positioning PRD (§4.1 "platform belajar berbasis
// karya", MVP text-first tanpa video, hasil berupa project nyata) --
// bukan filler generik.
const FAQS = [
  {
    question: "Apakah cocok untuk pemula yang belum pernah belajar coding?",
    answer:
      "Cocok. Materi disusun dari dasar dan langsung dipraktikkan sedikit demi sedikit. Kamu tidak harus jago dulu untuk mulai -- yang penting mau mengikuti langkah-langkahnya sampai selesai.",
  },
  {
    question: "Apakah saya harus sudah bisa coding sebelum daftar?",
    answer:
      "Tidak. Setiap kelas menjelaskan konsep yang dibutuhkan sebelum kamu diminta praktik. Istilah teknis memang dipakai apa adanya karena itu memang yang sedang diajarkan, tapi penjelasannya disiapkan untuk pemula.",
  },
  {
    question: "Apakah saya akan membuat project sungguhan, bukan cuma latihan?",
    answer:
      "Ya. Setiap kelas diarahkan menuju satu rakitan nyata yang kamu kerjakan dan selesaikan sendiri, bukan sekadar contoh kode yang ditonton.",
  },
  {
    question: "Apakah materinya berupa video?",
    answer:
      "Untuk saat ini materi berbentuk teks terstruktur (text-first) lengkap dengan contoh kode dan gambar penjelas, bukan video. Format ini dipilih supaya kamu bisa belajar dengan kecepatan sendiri dan mudah diulang bagian mana pun.",
  },
  {
    question:
      "Apakah hasil belajar saya bisa ditunjukkan ke orang lain setelah selesai?",
    answer:
      "Bisa. Setelah menyelesaikan syarat kelas, kamu submit rakitanmu sebagai project, dan bisa memilih untuk membagikannya lewat halaman publik supaya bisa ditunjukkan sebagai bukti hasil belajar.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="mt-3 text-foreground-muted">
            Kalau masih ada yang mengganjal, jawabannya mungkin ada di sini.
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={150} className="mt-10">
          <Accordion>
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
