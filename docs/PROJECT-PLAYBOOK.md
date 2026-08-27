# Playbook Bootstrap Project

> Dibuat: 2026-08-27
> Tujuan: dokumen ini mencatat urutan langkah dari nol yang dipakai untuk membangun DirakitPro, sekaligus dijadikan **boilerplate checklist** untuk project berikutnya. Kolom "Status di DirakitPro" adalah contoh nyata pemakaian; untuk project baru, salin daftar langkah lalu reset semua status ke Pending.

## Cara pakai dokumen ini

1. Saat mulai project baru, copy isi bagian "Checklist langkah" ke repo baru, reset kolom status.
2. Setiap kali satu langkah selesai, update status dan tambahkan tautan ke file/commit yang jadi bukti langkah itu selesai.
3. Kalau di tengah jalan menemukan langkah baru yang generik (bukan spesifik satu project), tambahkan ke checklist ini juga supaya playbook makin lengkap dari waktu ke waktu.

## Prinsip urutan

- **Dokumen dulu, kode belakangan.** PRD → Data Model → Frontend Design harus selesai (atau minimal stabil sebagai draft-untuk-review) sebelum scaffold aplikasi dimulai, supaya keputusan desain/skema tidak dibuat diam-diam di dalam kode.
- **Git connect di awal, bukan di akhir.** Idealnya `git init` + connect remote dilakukan sesegera folder project dibuat (langkah 0), sebelum PRD/data model/frontend design ditulis, supaya draft dokumen ikut punya riwayat commit. Di DirakitPro langkah git dilakukan belakangan (setelah dokumen selesai) dan itu berhasil, tapi historinya jadi satu commit besar "initialize project" alih-alih riwayat bertahap per dokumen. Untuk project berikutnya, rekomendasi: pindahkan "connect git" ke langkah 0.
- **README dan playbook ini adalah living document.** Update setiap kali status project berubah signifikan (misal scaffold selesai, fitur P0 pertama selesai, dst), jangan ditulis sekali lalu dibiarkan basi.

## Checklist langkah

| # | Langkah | Deskripsi / rekomendasi | Output/artifact | Status di DirakitPro |
|---|---|---|---|---|
| 0 | Buat repo kosong + connect git | Buat folder project, `git init`, buat repo remote (GitHub) kosong, `git remote add origin`, lakukan commit pertama sesegera mungkin. Lakukan ini **sebelum** menulis dokumen, bukan setelahnya. | Repo lokal + remote terhubung | Selesai — remote `github.com/sipratama/lms-dirakitpro` terhubung, riwayat berupa 1 commit `initialize project` (dilakukan belakangan setelah dokumen, bukan di awal) |
| 1 | Install skill AI coding agent untuk desain frontend | Install tool/skill yang memberi AI coding agent pedoman desain supaya UI yang nanti dihasilkan tidak "generik AI" (gradient ungu khas AI, card seragam, dst). Untuk DirakitPro dipakai dua: **Impeccable** (`npx impeccable install` lalu `/impeccable init`) dan **Taste Skill** (`npx skills add <repo> --skill "<nama-skill>"`). | `docs/IMPECCABLE.md`, `docs/TASTE-SKILL.md`, folder skill di `.agents/skills/` | Selesai |
| 2 | Bikin PRD | Tulis Product Requirements Document: executive summary, problem & opportunity, target market/persona, positioning & brand vocabulary, goals/non-goals/success metrics, feature spec per modul (beri kode fitur seperti `LRN-005`, `CHK-002` supaya mudah dirujuk lintas dokumen), non-functional requirements, dan rekomendasi tech stack. Buat versi Bahasa Indonesia untuk konteks bisnis + versi English sebagai acuan teknis kalau tim/AI agent butuh presisi istilah. | `DirakitPro_MVP_PRD_Text_First_V1.4.md` (+ `_EN.md`) | Selesai (V1.4) |
| 3 | Bikin Data Model | Turunkan skema database dari PRD: daftar entity & ERD, strategi ID, konvensi naming/timestamp, kebijakan soft delete, dan tandai eksplisit bagian mana yang masih asumsi/keputusan terbuka. Belum perlu migration file nyata di tahap ini, cukup draft untuk direview. | `docs/DATA-MODEL.md` | Selesai (status draft untuk review, belum ada migration file) |
| 4 | Bikin Frontend Design | Turunkan arah desain dari PRD + data model + skill desain (langkah 1): satu kalimat arah desain, kepribadian produk, daftar larangan visual ("anti-slop ban list"), prinsip UX, information architecture/route map, dan bahasa antarmuka. Dokumen ini jadi kontrak yang wajib dipatuhi saat implementasi UI nanti. | `docs/FRONTEND-DESIGN.md` | Selesai |
| 5 | Bikin README | Tulis README yang mendeskripsikan project secara akurat berdasarkan kode/dokumen yang benar-benar ada (bukan aspirasi) — termasuk secara eksplisit menyatakan status repo kalau belum ada kode aplikasi. Update lagi begitu scaffold project mulai dibuat. | `README.md` | Selesai (perlu direvisi ulang begitu scaffold aplikasi mulai ada) |
| 6 | Scaffold project | Inisialisasi aplikasi sesuai stack di PRD §14: pnpm + Turborepo, Next.js (App Router) + TypeScript strict, Tailwind CSS + shadcn/ui, struktur folder route group sesuai `docs/FRONTEND-DESIGN.md` §3. | `package.json`, `app/`, konfigurasi build | Selesai — dikerjakan di branch `feat/scaffold-project`. Monorepo `apps/web` (Next.js 16, TS strict, Tailwind, shadcn/ui) dibuat via `create-next-app` + `shadcn init`; seluruh 25 halaman + 3 route handler di `docs/FRONTEND-DESIGN.md` §3.1 dibuat sebagai placeholder (bukan UI final) dengan `layout.tsx` per shell (`(public)`/`(learner)`/`(admin)`); `pnpm build`, `pnpm lint`, `pnpm typecheck` semua lolos. Belum: shell nyata sesuai §7 PRD, database, auth, payment — menyusul di langkah 7 dst |
| 7 | Setup tooling dasar | ESLint + Prettier, TypeScript strict config, `.env.example` untuk semua secret/variabel (Clerk, Midtrans, R2, Resend, PostHog, Sentry, database URL), husky/lint-staged kalau dipakai. | Config file di root | Pending |
| 8 | Setup database | Init Drizzle ORM, generate migration awal dari `docs/DATA-MODEL.md`, jalankan migration ke PostgreSQL (lokal/dev), setup trigger `updated_at` sesuai keputusan di data model. | Folder `drizzle/`, koneksi DB dev jalan | Pending |
| 9 | Setup auth | Integrasi Clerk, buat mapping `users` ↔ `auth_identities` sesuai data model, middleware role-based (`LEARNER`/`ADMIN`) untuk route group learner/admin. | Middleware auth jalan di 3 shell (public/learner/admin) | Pending |
| 10 | Setup pembayaran | Integrasi Midtrans Snap (sandbox dulu) + endpoint webhook, pastikan idempotency sesuai PRD §COM-003. | Flow checkout sandbox berhasil | Pending |
| 11 | Setup layanan pendukung | Cloudflare R2 (image storage), Resend + React Email (transactional email), PostHog (analytics), Sentry (monitoring) — boleh dicicil sesuai fitur mana yang sedang dikerjakan, tidak harus sekaligus di awal. | Env terkonfigurasi, smoke test tiap layanan | Pending |
| 12 | Setup CI | GitHub Actions untuk lint, typecheck, dan test otomatis di setiap PR/push. | `.github/workflows/*.yml` | Pending |
| 13 | Setup testing | Vitest + React Testing Library (unit/komponen), Playwright (E2E) untuk alur inti (`Discover → Enroll/Purchase → Lesson → Checkpoint → Submission`). | Test suite awal + script `test` di `package.json` | Pending |
| 14 | Bangun fitur MVP | Implementasi fitur berdasarkan prioritas P0 di PRD, satu fitur/modul per iterasi: implement → review (pakai skill code-review) → test → commit. Jangan mulai fitur P1 sebelum semua P0 selesai. | Fitur berjalan sesuai acceptance criteria PRD | Pending |
| 15 | Deploy staging | Deploy ke Vercel (atau host lain yang kompatibel) di environment staging, pakai kredensial sandbox (Midtrans sandbox, dst) sebelum production. | URL staging bisa diakses | Pending |
| 16 | Review terhadap success metrics | Setelah staging/production jalan, cek balik ke goals & success metrics di PRD §5 — apakah data yang terkumpul (funnel purchase → complete, failure rate checkpoint, dst) bisa diukur sesuai rencana. | Dashboard/report metrics | Pending |

## Catatan perbaikan untuk siklus berikutnya

- Pindahkan langkah **connect git** ke paling awal (langkah 0), bukan setelah semua dokumen selesai, supaya riwayat commit mencerminkan proses berpikir per dokumen (PRD → data model → frontend design), bukan satu commit besar di akhir.
- Pertimbangkan commit terpisah per dokumen besar (PRD, data model, frontend design, README) alih-alih satu commit gabungan, supaya `git log` bisa dipakai sebagai timeline proses desain.
- Tandai versi setiap dokumen besar (PRD sudah pakai versi `V1.4`) supaya perubahan scope bisa dilacak; pertimbangkan pola sama untuk `docs/DATA-MODEL.md` dan `docs/FRONTEND-DESIGN.md` kalau nanti direvisi setelah Fase 0.
