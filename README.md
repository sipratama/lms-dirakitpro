# DirakitPro

> **Profesional itu dirakit.** Platform pembelajaran online *text-first* untuk pemula digital builder di Indonesia yang ingin belajar sambil langsung merakit project nyata — bukan sekadar menonton video.

## Status repo

Scaffold aplikasi sudah ada di `apps/web` (monorepo pnpm + Turborepo, Next.js 16 App Router, TypeScript strict, Tailwind CSS + shadcn/ui), dengan struktur route group `(public)`/`(learner)`/`(admin)` dan tiga API route handler sesuai `docs/FRONTEND-DESIGN.md` §3 — semua masih halaman placeholder, belum ada UI/fitur nyata. Tooling dasar (Prettier, husky + lint-staged) dan infra database lokal (docker-compose Postgres + Dockerfile `apps/web`) sudah ada. **Belum ada** wiring Drizzle ORM ke kode, auth (Clerk), maupun payment (Midtrans) — langkah tersebut menyusul, lihat `docs/PROJECT-PLAYBOOK.md` untuk urutan lengkapnya.

## Tentang DirakitPro

DirakitPro adalah platform belajar berbasis karya untuk pemula di Indonesia yang ingin membuat website/aplikasi pertama mereka. Alur belajar intinya:

```text
Discover Course → Purchase/Free Enroll → Read Structured Lesson
  → Practice/Build → Checkpoint → Progress Rakitan
  → Final Project Submission → Course Completed → Optional Public Project Link
```

Untuk MVP (V1.4), materi disajikan **text-first**: bacaan terstruktur berisi blok markdown, code, gambar, callout, resource link, dan build task. Video sengaja tidak menjadi bagian dari MVP.

Referensi lengkap: [DirakitPro_MVP_PRD_Text_First_V1.4.md](DirakitPro_MVP_PRD_Text_First_V1.4.md) (Bahasa Indonesia) / [DirakitPro_MVP_PRD_Text_First_V1.4_EN.md](DirakitPro_MVP_PRD_Text_First_V1.4_EN.md) (English, sumber acuan teknis §8–§18).

## Fitur utama (sesuai cakupan MVP di PRD)

- **Katalog & checkout course** — halaman publik course, enroll gratis, atau beli course berbayar via Midtrans Snap.
- **Lesson berbasis konten blok** — teks/Markdown, code block, gambar, callout, resource link, dan build task per lesson, disusun dalam struktur `Course → CourseStage → Lesson`.
- **Checkpoint & grading otomatis** — soal dengan opsi jawaban, riwayat percobaan learner, dan analitik lesson/checkpoint dengan failure rate tertinggi.
- **Progress Rakitan** — pelacakan progres belajar yang menekankan Build Progress, bukan sekadar persentase halaman terbaca.
- **Final project & submission** — learner menghasilkan project akhir yang dapat disubmit dan (opsional) dipublikasikan lewat link publik (`/projects/[username]/[slug]`).
- **Area admin** — pengelolaan course, kurikulum, lesson, user, order, project, dan feedback tanpa perlu deploy ulang aplikasi untuk perubahan konten.
- **Autentikasi & pembayaran** — Clerk sebagai identity provider, Midtrans untuk pembayaran course berbayar (termasuk webhook dan idempotency).

Detail lengkap perilaku fitur (kode fitur seperti `LRN-005`, `CHK-002`, `COM-003`, dll.) ada di PRD §8–§13.

## Tech stack yang direncanakan

Sesuai §14 PRD ("Technical Architecture & Stack") — arsitektur *Next.js full-stack modular monolith* (satu aplikasi deployable, tanpa microservices):

| Area | Pilihan |
|---|---|
| Bahasa | TypeScript |
| Web framework | Next.js 16 (supported release) |
| UI | React + Tailwind CSS + shadcn/ui + Lucide |
| Form | React Hook Form + Zod |
| Auth | Clerk |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Pembayaran | Midtrans Snap + webhook |
| Penyimpanan gambar | Cloudflare R2 |
| Email | Resend + React Email |
| Analytics | PostHog |
| Monitoring | Sentry |
| Hosting | Vercel atau host lain yang kompatibel Next.js |
| Monorepo | pnpm + Turborepo |
| Testing | Vitest + React Testing Library + Playwright |
| CI | GitHub Actions |

## Struktur repo saat ini

```text
.
├── DirakitPro_MVP_PRD_Text_First_V1.4.md      # PRD (Bahasa Indonesia)
├── DirakitPro_MVP_PRD_Text_First_V1.4_EN.md   # PRD (English, acuan teknis §8–§18)
├── docs/
│   ├── DATA-MODEL.md         # Draft skema database (Drizzle ORM/PostgreSQL) — belum ada migration file
│   ├── FRONTEND-DESIGN.md    # Kontrak desain UI/UX (route map, IA, prinsip visual) untuk Fase 0–3
│   ├── PROJECT-PLAYBOOK.md   # Checklist langkah bootstrap project dari nol + status tiap langkah
│   ├── IMPECCABLE.md         # Ringkasan tool desain "Impeccable" yang dipakai agent AI di project ini
│   └── TASTE-SKILL.md        # Ringkasan ruleset "Taste Skill" untuk menghindari output desain generik AI
├── apps/
│   └── web/                  # Aplikasi Next.js 16 (App Router, TS strict, Tailwind, shadcn/ui)
│       └── app/
│           ├── (public)/     # Shell publik: home, courses, login/register, checkout, payment
│           ├── (learner)/    # Shell learner: dashboard, learn/[courseSlug]/[lessonSlug], account
│           ├── (admin)/      # Shell admin: courses, users, orders, projects, feedback
│           ├── api/          # Route handler: webhooks Clerk/Midtrans, media upload (masih stub 501)
│           └── Dockerfile    # Standalone production build image (bukan untuk dev sehari-hari)
├── docker-compose.yml         # Postgres lokal untuk dev (`docker compose up -d db`)
├── .env.example               # Template env — copy jadi .env, jangan pernah commit .env
├── pnpm-workspace.yaml, turbo.json, package.json  # Konfigurasi monorepo pnpm + Turborepo
├── .agents/skills/design-taste-frontend/  # Skill agent terkait taste/desain frontend
├── .claude/, .codex/       # Konfigurasi harness AI coding agent (Claude Code, Codex)
└── skills-lock.json
```

### Desain data & UI yang sudah dirancang

- [docs/DATA-MODEL.md](docs/DATA-MODEL.md) — draft skema Drizzle/PostgreSQL: strategi ID (UUID v4), soft delete untuk `courses`/`lessons`/`media_assets`, konvensi timestamp dengan trigger `updated_at`, serta ERD hubungan `users`, `courses`, `enrollments`, `orders`, `checkpoint_*`, `projects`, dll. Berstatus **draft untuk review**, belum ada scaffold project maupun migration file nyata.
- [docs/FRONTEND-DESIGN.md](docs/FRONTEND-DESIGN.md) — arah desain ("ruang kerja belajar editorial yang tenang"), prinsip UX mobile-first, daftar larangan visual ala "AI slop", serta route map Next.js App Router untuk tiga shell: publik, learner (`(learner)/`), dan admin (`(admin)/`).

## Instalasi & menjalankan project

Prasyarat: Node.js 22+, pnpm (`corepack enable` lalu pnpm mengikuti versi di `package.json`), dan Docker (untuk database lokal).

```bash
cp .env.example .env   # isi kredensial lokal (default di .env.example sudah cukup untuk dev)
pnpm install            # install semua dependency workspace (root + apps/web)
docker compose up -d db # jalankan Postgres lokal (baca env dari .env otomatis)

pnpm dev            # jalankan Next.js dev server (apps/web) via Turborepo
pnpm build          # production build
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit (TypeScript strict)
pnpm format         # Prettier --write
pnpm format:check   # Prettier --check
```

`apps/web` belum benar-benar membaca `DATABASE_URL` (belum ada Drizzle ORM, menyusul di langkah 8) — `docker compose up -d db` saat ini murni menyiapkan Postgres-nya saja. `apps/web/Dockerfile` adalah build produksi standalone untuk deploy/staging nanti, bukan dipakai untuk dev sehari-hari.

Git hook (husky) sudah aktif otomatis setelah `pnpm install` (lewat script `prepare`): `pre-commit` menjalankan Prettier/ESLint hanya pada file yang di-stage, `pre-push` menjalankan `typecheck` + `lint` penuh.

## Catatan lain

- Bahasa antarmuka: UI chrome (nav, tombol, label) dalam Bahasa Indonesia; istilah brand wajib seperti **Mulai Merakit**, **Progress Rakitan**, **Hasil Rakitan**, **Rakitanmu jadi!** dipakai persis seperti didefinisikan PRD §4.2, tidak diterjemahkan ulang.
- Non-goals MVP secara eksplisit: tidak ada video hosting, forum, code runner, code review marketplace, atau gamifikasi kompleks.
- `docs/IMPECCABLE.md` dan `docs/TASTE-SKILL.md` bukan bagian dari produk DirakitPro — keduanya adalah ringkasan tool eksternal yang dipakai untuk membantu AI coding agent menghasilkan UI yang tidak generik saat implementasi nanti.
