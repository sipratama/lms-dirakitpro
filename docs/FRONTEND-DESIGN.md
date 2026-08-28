# DirakitPro — Frontend Design Foundation

> Sumber: `DirakitPro_MVP_PRD_Text_First_V1.4_EN.md` (§4, §7, §8, §12, §14, §15, §18), `docs/DATA-MODEL.md`, `docs/TASTE-SKILL.md`, `docs/IMPECCABLE.md`
> Dibuat: 2026-08-27
> Status: **Sumber kebenaran UI/UX untuk Fase 0–3.** Dokumen ini mengunci kontrak desain yang harus dipatuhi scaffold dan seluruh implementasi halaman. Perubahan setelah Fase 0 harus direvisi di sini dulu, bukan diputuskan diam-diam di komponen.

Dokumen ini adalah pasangan dari `docs/DATA-MODEL.md`: data model menjawab "bagaimana bentuk datanya", dokumen ini menjawab "bagaimana bentuknya di layar, dan kenapa". Setiap keputusan visual yang tidak dijelaskan eksplisit oleh PRD ditandai sebagai keputusan produk di §14, bukan dibiarkan sebagai preferensi implisit developer.

---

## 1. Design Read

### 1.1 Satu baris arah desain

> **Ruang kerja belajar editorial yang tenang — terasa seperti meja perakitan digital, bukan dashboard SaaS atau video course generik.**

### 1.2 Kepribadian produk

DirakitPro bukan platform hiburan belajar (gamified, playful, banyak badge) dan bukan LMS korporat (rapat, birokratis, penuh chrome UI). Personanya:

- **Tenang dan fokus** — halaman lesson terasa seperti membaca dokumentasi teknis yang baik, bukan feed media sosial.
- **Konkret dan berorientasi hasil** — visual menekankan progres bangunan nyata (Progress Rakitan, Build Progress), bukan skor abstrak.
- **Jujur secara teknis** — code block, terminal output, dan struktur file ditampilkan apa adanya, tidak didekorasi berlebihan.
- **Ramah pemula tanpa terasa merendahkan** — bahasa dan visual sederhana, tapi tetap terasa "produk developer sungguhan", karena target audiens (§3.1 PRD) ingin membangun kredibilitas profesional.

### 1.3 Yang harus dihindari (selaras `docs/TASTE-SKILL.md` §"Anti-Slop Ban List")

Ban list berikut **wajib**, bukan saran:

- Gradient ungu/mesh khas AI, glow dekoratif berlebihan. — *Pengecualian tercatat: blob warna blur bernuansa `--accent-muted` diizinkan terbatas, lihat Keputusan #9 §14. Larangan ini tetap penuh untuk gradient ungu, mesh multi-hue, dan glow di sekitar teks/tombol.*
- Baris fitur "tiga kartu sama besar" tanpa hierarki.
- Card generik untuk segala hal (lesson, milestone, testimoni — semua dibungkus card seragam).
- Em-dash/en-dash pada copy Bahasa Indonesia.
- Section-numbering eyebrow ("01 — Kenapa DirakitPro") di atas heading. — *Yang dilarang adalah **penomorannya**, bukan eyebrow-nya. Eyebrow polos tanpa nomor diizinkan, lihat Keputusan #9 §14.*
- Label versi/status dekoratif ("BETA", pill mengambang di atas gambar).
- Ilustrasi SVG hero buatan tangan generik.
- `window.addEventListener('scroll')` manual — animasi memakai pola skeleton baku (§9).
- `border-t`/`border-b` dipakai sebagai pengganti pemisah visual yang seharusnya spacing.
- UI produk palsu (mockup div yang berpura-pura jadi editor code) — jika perlu menunjukkan editor, gunakan komponen nyata dari §10.

---

## 2. Audiens & Prinsip UX

### 2.1 Audiens utama (dari PRD §3.1–§3.3)

Pemula 18–27 tahun di Indonesia, sebagian besar mengakses lewat **koneksi mobile kelas menengah** (§15.1 PRD: "learner workspace remains usable on consumer mobile connections in Indonesia"). Ini adalah batasan desain yang keras, bukan preferensi:

- **Mobile-first wajib**, bukan "desktop lalu diciutkan".
- Payload halaman lesson tidak boleh berat — gambar dioptimasi, tidak ada library animasi berat, font di-subset.
- Perangkat asumsi: layar kecil–menengah, kadang koneksi lambat, kadang paket data terbatas.

### 2.2 Prinsip UX (turunan §4.3 prinsip produk PRD)

| Prinsip | Konsekuensi desain |
|---|---|
| Read → Try → Check → Build | Setiap lesson punya rangkaian visual yang sama: penjelasan → contoh → aksi. Bukan wall of text tanpa jeda aksi. |
| Build Progress > reading % | Build Progress ditampilkan lebih menonjol (warna aksen, posisi lebih atas) daripada persentase lesson terbaca. |
| Text-first, bukan text-only selamanya | Renderer content block (§8) harus cukup generik untuk menambah `video` block di P1 tanpa merombak layout lesson. |
| Beginner friendly | Tidak ada jargon UI tanpa penjelasan; istilah teknis (git, deploy, repository) boleh dipakai karena memang diajarkan, tapi UI chrome (tombol, label sistem) pakai Bahasa Indonesia sederhana. |
| Easy to update (admin, §4.3.6) | Admin authoring UI (§11) diprioritaskan fungsi atas dekorasi — form yang jelas, bukan editor visual mewah. |

### 2.3 Bahasa antarmuka

- **UI chrome** (nav, tombol, label form, pesan error/sukses generik): Bahasa Indonesia.
- **Istilah brand wajib** (§4.2 PRD): **Mulai Merakit**, **Lanjut Merakit**, **Progress Rakitan**, **Hasil Rakitan**, **Rakitanmu jadi!**, **Tunjukkan Karyamu** — dipakai persis seperti didefinisikan PRD, tidak diterjemahkan ulang atau disingkat oleh implementasi UI.
- **Istilah teknis dalam konten lesson** (git, deploy, component, dst): boleh tetap Bahasa Inggris sesuai §9.3 PRD, karena itu memang materi yang diajarkan.
- **Pesan sistem teknis** (log error server, kode HTTP): boleh Inggris di console/log, tapi pesan yang tampil ke learner tetap Bahasa Indonesia.

---

## 3. Information Architecture & Route Map

Route berikut **identik** dengan §12 PRD — dokumen ini tidak menambah atau mengubah struktur URL, hanya memetakan tiap route ke shell dan pola halaman.

### 3.1 Route groups Next.js 16 (App Router)

```text
app/
  (public)/                    -- shell: PublicShell (§7.1)
    page.tsx                       /
    courses/
      page.tsx                     /courses
      [slug]/page.tsx               /courses/[slug]
    projects/
      [username]/[slug]/page.tsx    /projects/[username]/[slug]
    login/page.tsx                 /login
    register/page.tsx              /register
    forgot-password/page.tsx       /forgot-password
    checkout/
      course/[courseSlug]/page.tsx  /checkout/course/[courseSlug]
    payment/[orderId]/page.tsx     /payment/[orderId]

  (learner)/                   -- shell: LearnerShell (§7.2), middleware: authenticated
    dashboard/page.tsx             /dashboard
    learn/
      [courseSlug]/
        page.tsx                    /learn/[courseSlug]
        [lessonSlug]/page.tsx       /learn/[courseSlug]/[lessonSlug]
    projects/me/[projectId]/page.tsx  /projects/me/[projectId]
    account/
      page.tsx                     /account
      orders/page.tsx              /account/orders

  (admin)/                     -- shell: AdminShell (§7.3), middleware: authenticated + role=ADMIN
    admin/
      page.tsx                     /admin
      courses/
        page.tsx                   /admin/courses
        new/page.tsx                /admin/courses/new
        [courseId]/
          page.tsx                  /admin/courses/[courseId]
          curriculum/page.tsx       /admin/courses/[courseId]/curriculum
          lessons/[lessonId]/page.tsx  /admin/courses/[courseId]/lessons/[lessonId]
      users/page.tsx                /admin/users
      orders/page.tsx               /admin/orders
      projects/page.tsx             /admin/projects
      feedback/page.tsx             /admin/feedback

  api/
    webhooks/
      clerk/route.ts
      midtrans/route.ts
    media/upload/route.ts (atau server action)
```

**Kontrak scaffold:** tiga route group (`(public)`, `(learner)`, `(admin)`) wajib ada sejak Fase 0, masing-masing dengan `layout.tsx` sendiri yang me-render shell-nya (§7). Ini bukan detail implementasi yang bisa ditunda — struktur folder yang salah di Fase 0 berarti merombak seluruh routing nanti.

### 3.2 Navigasi per shell

| Shell | Item navigasi utama | Pola mobile |
|---|---|---|
| **PublicShell** | Logo, Kelas (`/courses`), Masuk/Daftar atau avatar akun | Nav satu baris ≤ 80px (guardrail Taste Skill §"Hero Discipline"), menu mobile via sheet/drawer sederhana |
| **LearnerShell (dashboard/account)** | Logo, Dashboard, Kelas Saya, Akun | Bottom-safe header, tanpa sidebar persisten di luar workspace lesson |
| **LearnerShell (workspace lesson)** | Kurikulum (sidebar desktop / drawer mobile), progress bar, tombol kembali ke course overview | Lihat §7.2.2 — pola khusus, berbeda dari shell learner umum |
| **AdminShell** | Sidebar: Overview, Courses, Users, Orders, Projects, Feedback | Sidebar collapse jadi top nav/drawer di bawah breakpoint `md` |

---

## 4. User Flows Prioritas

Flow berikut memetakan langsung ke Journey A/B/C (§7.2–7.4 PRD) dan E2E flow (§17.2 PRD). Setiap flow mencantumkan state UI yang wajib dirancang, bukan hanya jalur sukses.

### 4.1 Flow A — Discover → Purchase → First Lesson

```text
/  →  /courses  →  /courses/[slug]  →  [Mulai Merakit]
  → (guest) /login atau /register (redirect back ke course)
  → gratis: enrollment langsung aktif → /learn/[courseSlug]
  → berbayar: /checkout/course/[courseSlug] → Midtrans Snap overlay
      → /payment/[orderId] (status PENDING, polling/redirect)
      → webhook mengaktifkan enrollment → /learn/[courseSlug]/[lessonSlug pertama]
```

State wajib: harga free vs berbayar di course card & detail, tombol CTA disabled saat submit, halaman `/payment/[orderId]` untuk status `PENDING`/`PAID`/`EXPIRED`/`CANCELLED`, pesan "kamu sudah memiliki kelas ini" (COM-007) saat guard server menolak order baru.

### 4.2 Flow B — Text-first Learning

```text
/learn/[courseSlug] (overview)
  → [lesson pertama/terakhir dibuka]
  → /learn/[courseSlug]/[lessonSlug]
      → baca objective → konten (markdown/code/image/callout/resource_link/task)
      → [Tandai Selesai / Lanjut] (CONCEPT/DEMO/DEPLOY)
        atau konfirmasi task wajib (BUILD)
        atau submit checkpoint (CHECKPOINT, lihat §4.3)
      → progress bar & Progress Rakitan update
      → [Lanjut] ke lesson berikutnya (locked jika required lesson sebelumnya belum selesai)
```

State wajib: lesson locked (belum eligible, LRN-007), lesson aktif, lesson completed (checklist di sidebar kurikulum), lesson optional (badge visual berbeda dari required).

### 4.3 Flow C — Checkpoint

```text
Lesson type CHECKPOINT dibuka
  → render soal single/multiple-choice satu per satu atau dalam satu form
  → [Submit]
  → hasil: skor + passed/failed + explanation per soal
  → passed → lesson COMPLETED, [Lanjut] aktif
  → failed → [Coba Lagi] (tanpa batas percobaan, CHK-003)
```

State wajib: soal belum dijawab (tombol submit disabled), sedang submit, hasil lulus, hasil gagal dengan opsi retry, riwayat percobaan sebelumnya (opsional tampil ringkas).

### 4.4 Flow D — Final Project

```text
Semua required lesson/milestone/checkpoint selesai
  → banner/CTA "Hasil Rakitan siap disubmit" muncul di course overview & workspace
  → /projects/me/[projectId]
      → isi title, description, liveUrl (kondisional per course), repoUrl (kondisional), upload screenshot, technologies
      → [Submit] → status SUBMITTED → enrollment COMPLETED → "Rakitanmu jadi!"
      → pilih visibility PRIVATE/PUBLIC (opsional, boleh diubah setelah submit)
      → jika PUBLIC → tampilkan link shareable /projects/[username]/[slug]
```

State wajib: form sebelum semua syarat terpenuhi (CTA disabled + penjelasan syarat kurang apa), form submission in-progress, project sudah SUBMITTED (read-only + tombol edit terbatas), toggle visibility dengan konfirmasi, halaman publik untuk project HIDDEN oleh admin (§4.5) menampilkan pesan generik, bukan 404 mentah.

### 4.5 Flow E — Admin Authoring

```text
/admin/courses/new → isi metadata dasar → simpan sebagai DRAFT
  → /admin/courses/[courseId]/curriculum → tambah stage → tambah lesson (set type)
  → /admin/courses/[courseId]/lessons/[lessonId] → tambah block (markdown/code/image/callout/link/task)
      → jika CHECKPOINT: konfigurasi soal & passing score
      → [Save Draft] → [Preview as Learner] → [Publish]
  → kembali ke curriculum, ulangi per lesson
  → di course level: [Publish] (butuh ≥1 stage, ≥1 required lesson, syarat §10.6 PRD)
```

State wajib: unsaved changes warning (ADM-005), validasi publish gagal (course belum memenuhi syarat §10.6 — tampilkan checklist alasan, bukan error generik), block editor kosong (empty state "Tambah block pertama"), image upload in-progress/gagal.

---

## 5. Responsive Strategy

### 5.1 Breakpoint

Mengikuti skala Tailwind default agar tidak ada sistem breakpoint custom yang harus dijaga terpisah:

| Token | Lebar min | Peran |
|---|---|---|
| (default) | 0 | Mobile — layout dasar, single column |
| `sm` | 640px | Mobile besar/phablet — penyesuaian spacing minor |
| `md` | 768px | Tablet — sidebar admin mulai muncul, grid katalog 2 kolom |
| `lg` | 1024px | Desktop kecil — sidebar kurikulum lesson workspace persisten |
| `xl` | 1280px | Desktop — max-width konten diberlakukan penuh |

### 5.2 Aturan wajib

- **Desain mobile dulu**, breakpoint menambah kemewahan (sidebar, multi-kolom), bukan mengurangi fungsi di layar kecil.
- Lesson workspace: sidebar kurikulum **collapsible/drawer** di bawah `lg`, **persisten** di `lg` ke atas (selaras LRN-003 PRD).
- Admin sidebar: **drawer/top nav** di bawah `md`, **persisten** di `md` ke atas.
- Tidak ada horizontal scroll yang tidak disengaja pada breakpoint manapun kecuali code block (yang memang butuh scroll horizontal untuk baris panjang).
- Touch target minimum **44×44px** untuk semua elemen interaktif di mobile.

---

## 6. Accessibility Baseline (WCAG 2.2 AA)

Wajib, bukan aspirational — selaras §15.2 PRD:

1. **Struktur heading semantik** — satu `h1` per halaman, hierarki tidak melompat level.
2. **Navigasi keyboard penuh** — semua aksi (termasuk drawer, dialog, tab kurikulum) bisa dijangkau tanpa mouse; focus ring terlihat jelas (lihat token `--ring` §8.2).
3. **Kontras warna** — teks body ≥ 4.5:1, teks besar/UI non-teks ≥ 3:1, diverifikasi terhadap kedua tema (light/dark).
4. **Alt text gambar** — wajib untuk semua `image` block kecuali ditandai dekoratif eksplisit (MED-004); UI upload admin **memaksa** field alt text sebelum simpan.
5. **Code block** — bisa di-scroll dan di-copy dengan keyboard, hasil salin diumumkan lewat live region singkat ("Kode disalin").
6. **Form error** — label terhubung ke input (`aria-describedby`), pesan error spesifik per field, bukan banner generik di atas form.
7. **Status dinamis** — perubahan progress, hasil checkpoint, dan toast notifikasi diumumkan lewat `aria-live="polite"`.
8. **Reduced motion** — semua animasi (§9) menghormati `prefers-reduced-motion: reduce` dengan fallback instan/tanpa transisi.

---

## 7. Layout Shells

### 7.1 PublicShell

```text
┌─────────────────────────────────────┐
│ Header (≤80px, satu baris)          │
├─────────────────────────────────────┤
│                                       │
│           Konten halaman             │
│                                       │
├─────────────────────────────────────┤
│ Footer (ringkas — bukan mega footer) │
└─────────────────────────────────────┘
```

Header: logo kiri, nav tengah/kanan, CTA akun kanan. Tidak ada mega-menu. Footer cukup: brand line, link penting (kelas, kontak), tanpa strip lokasi/cuaca dekoratif (dilarang Taste Skill).

### 7.2 LearnerShell

#### 7.2.1 Dashboard/Account (LRN-001, `/account`)

```text
┌─────────────────────────────────────┐
│ Header ringkas (logo, nav, avatar)   │
├─────────────────────────────────────┤
│  Progress Rakitan ringkasan (top)    │
│  Kelas aktif (list, bukan carousel)  │
│  Kelas selesai (collapsed/secondary) │
└─────────────────────────────────────┘
```

Tidak pakai sidebar persisten di dashboard — ini halaman ringkasan, bukan workspace kerja.

#### 7.2.2 Lesson Workspace (LRN-003, `/learn/[courseSlug]/[lessonSlug]`) — pola khusus

```text
Desktop (≥lg):
┌──────────┬──────────────────────────┐
│ Sidebar  │ Header lesson (judul,     │
│ kurikulum│ estimasi waktu, progress) │
│ (fixed/  ├──────────────────────────┤
│ collaps- │                          │
│ ible)    │   Content pane           │
│          │   (max-width 65–72ch)    │
│          │                          │
│          ├──────────────────────────┤
│          │ Nav prev/next            │
└──────────┴──────────────────────────┘

Mobile (<lg):
┌─────────────────────────┐
│ Header + tombol kurikulum │  ← buka drawer
│ (compact selector)       │
├─────────────────────────┤
│ Progress bar             │
├─────────────────────────┤
│ Content pane (full width)│
├─────────────────────────┤
│ Nav prev/next (sticky)   │
└─────────────────────────┘
```

Ini adalah **satu-satunya tempat** di seluruh produk yang boleh punya sidebar fixed di desktop — jangan meniru pola ini di dashboard atau halaman publik.

### 7.3 AdminShell

```text
Desktop (≥md):
┌──────────┬──────────────────────────┐
│ Sidebar  │ Konten admin             │
│ (fixed)  │ (tabel, form, editor)    │
└──────────┴──────────────────────────┘

Mobile (<md):
┌─────────────────────────┐
│ Top bar + menu drawer    │
├─────────────────────────┤
│ Konten admin (stack)     │
└─────────────────────────┘
```

Prioritas admin adalah kejelasan fungsi (tabel data, form panjang) — bukan estetika marketing. Boleh terasa lebih "utilitarian" daripada shell learner/publik, tapi tetap memakai token yang sama (§8).

---

## 8. Visual Direction & Design Tokens

### 8.1 Arah visual

- **Latar bernuansa, bukan `#FFFFFF`/`#000000` murni** (wajib, sesuai Taste Skill §8 Dark Mode Protocol). Aturan ini berlaku untuk *ground* halaman (`--background`): light mode `#E3F2FD`, dark mode `#0D1526`. Putih murni tetap boleh dipakai untuk satu peran spesifik, yaitu lapisan paling terangkat (`--surface-raised`: dialog/dropdown/popover), karena di sana putih berfungsi sebagai kontras elevasi terhadap ground biru, bukan sebagai warna halaman.
- **Satu warna aksen** dipakai konsisten di seluruh produk (Color Consistency Lock, Taste Skill §4) — **biru DirakitPro `#2196F3`**. Mood yang dituju: tenang, modern, optimistis, ramah pemula, sedikit premium — "bengkel digital yang lembut", bukan aplikasi wellness/meditasi. Secara eksplisit **bukan** pink/coral/peach/merah sebagai warna dominan, dan bukan ungu-mesh generik AI.
- **Satu sistem radius** (Shape Consistency Lock) — radius kecil–menengah konsisten (kartu, tombol, input berbagi skala radius yang sama, tidak dicampur pill button dengan card siku tajam).
- **Tipografi teknis, sangat terbaca** — satu typeface UI (sans, humanist/grotesk netral) + satu typeface monospace untuk code block. Bukan display font dekoratif di heading.
- **Elevation minimal** — shadow halus untuk membedakan lapisan (dialog, dropdown), bukan efek glassmorphism/neumorphism.

### 8.2 Token semantik (CSS custom properties, light-first)

Implementasi otoritatif ada di `apps/web/app/globals.css`. Nama token adalah kontrak — komponen bergantung padanya, jadi **nama tidak boleh berubah tanpa merevisi dokumen ini dulu**; nilai boleh berubah saat rebrand.

Sistem warna aktif adalah **biru DirakitPro** (keputusan product owner, produk-wide — lihat Keputusan #8 §14). Nilai ditulis `oklch()` di CSS agar `color-mix(in oklch, …)` yang dipakai primitive shadcn berperilaku benar; hex di tabel adalah sumber brief.

#### Peta peran warna (light)

| Token | Hex sumber | Peran |
|---|---|---|
| `--background` | `#E3F2FD` | Ground halaman, nada dominan di seluruh produk |
| `--surface` | `#F4F9FE` | Card/panel — satu anak tangga di atas ground, mendekati putih |
| `--surface-raised` | `#FFFFFF` | Dialog, dropdown, popover — lapisan paling terangkat |
| `--foreground` | `#0F172A` | Teks utama |
| `--foreground-muted` | `#475569` | Teks sekunder, caption, hint |
| `--foreground-subtle` | `#64748B` | Placeholder, disabled text (turunan; brief hanya memberi dua tingkat) |
| `--accent` | `#2196F3` | CTA primer, progress, active state, aksen fokal kecil |
| `--accent-foreground` | `#0F172A` | Teks/ikon di atas `--accent` (**gelap, bukan putih** — lihat Keputusan #10 §14) |
| `--accent-muted` | `#90CAF9` | Surface sekunder lembut: pill, badge, highlight, hover fill, blob latar |
| `--border` | `rgba(15,23,42,0.08)` | Hairline default |
| `--border-strong` | `rgba(15,23,42,0.18)` | Border yang perlu lebih terlihat (input, pemisah tabel) |
| `--ring` | `#1E293B` | Focus ring — slate gelap, **sengaja bukan** `--accent` (biru di atas ground biru cuma 2.74:1) |
| `--shadow-md` | `0 8px 30px rgba(15,23,42,0.08)` | Shadow brief; dipakai untuk lapisan floating |
| `--shadow-sm` | `0 1px 2px rgba(15,23,42,0.06)` | Turunan untuk lapisan raised (§8.4 tetap 2 tingkat) |

**Tiga warna inti brief dipetakan ke tiga peran berbeda, bukan ditumpuk:** `#E3F2FD` jadi ground, `#90CAF9` jadi surface sekunder/highlight (`--accent-muted`), `#2196F3` jadi aksen tunggal. Brief menyebut `#90CAF9` untuk "cards" — di level produk itu diterjemahkan jadi `--accent-muted` (pill/highlight/blob), **bukan** `--surface`, karena card sebagai wadah teks panjang (lesson reader, tabel admin) butuh field netral; `#90CAF9` sebagai background semua card akan melanggar "tetap lembut, tidak over-saturated" dari brief yang sama.

#### Status semantik

`--success` / `--warning` / `--danger` / `--info` semuanya bernilai **gelap dengan foreground putih**, satu pola konsisten, supaya lolos AA baik dipakai sebagai teks di atas surface terang maupun sebagai fill. `--info` memakai biru yang lebih dalam (`#1565C0`) daripada `--accent` — sekeluarga hue, tapi jelas bukan CTA. Merah tetap dipakai untuk `--danger` karena itu peran fungsional, bukan "dominansi visual merah" yang dilarang brief.

#### Dark mode

Brief hanya menetapkan nilai light. Dark mode adalah **inversi terkontrol dari sistem yang sama**, bukan palet kedua (Keputusan #11 §14): hue biru-slate dipertahankan, lightness dibalik, chroma surface dijaga rendah. `--foreground` dark memakai persis `#E3F2FD` (warna ground light mode) supaya kedua tema terbaca sebagai satu sistem. `--accent` naik ke `#42A5F5` agar tetap hidup di atas latar gelap sambil tetap dikenali sebagai biru yang sama. Mekanismenya `@media (prefers-color-scheme: dark)`, **bukan** `[data-theme="dark"]` maupun class `.dark` — lihat Keputusan #1 §14.

#### Aturan pakai

- Komponen **tidak pernah** memakai nilai warna literal (`bg-blue-500`) langsung di JSX untuk elemen brand/semantic. Selalu lewat token semantik (`bg-accent`, `text-danger`). Ini mencegah drift warna saat rebrand dan memenuhi Color Consistency Lock.
- Di atas `--accent-muted`, pakai `text-foreground` — **jangan** `text-foreground-muted` (4.33:1, borderline gagal AA untuk teks kecil).
- Variable internal shadcn (`--primary`, `--card`, `--popover`, `--muted`, `--destructive`, `--sidebar-*`, `--chart-*`) **dipetakan** ke token di atas di `globals.css`, tidak didefinisikan sendiri — satu sumber kebenaran.

### 8.3 Tipografi

| Peran | Font | Ukuran dasar |
|---|---|---|
| UI & body | **Outfit** (geometric sans, variable) | 16px dasar, type scale modular (1.125–1.25 ratio) |
| Code/monospace | **Geist Mono**, ligature off | Match line-height dengan body untuk keselarasan visual di lesson |
| Heading/display | Sama dengan UI sans (Outfit), dibedakan lewat weight, size, dan tracking — **bukan** typeface terpisah | Display hero 48–96px (clamp responsif), tracking rapat (`tracking-tight`/`-0.02em`) |

- **Loading**: Outfit di-load lewat `next/font/google` di `app/layout.tsx` sebagai variable font, subset `latin` saja, diekspos sebagai `--font-outfit` lalu dipetakan `--font-sans: var(--font-outfit)` di `globals.css`. Satu file variable menutup seluruh rentang weight, lebih hemat daripada 3–4 file statis — konsisten batasan bandwidth §2.1 dan Implementation Contract §15 poin 6. **Jangan** menamai variabel sumbernya `--font-sans`: itu menghasilkan `--font-sans: var(--font-sans)` yang sirkular dan membuat font diam-diam jatuh ke fallback (regresi yang pernah terjadi di repo ini).
- **Case**: sentence case di seluruh UI dan heading. Tanpa ALL-CAPS dekoratif kecuali label sistem sangat kecil (mis. badge status) bila memang perlu.
- **Kontras lembut**: body memakai `--foreground-muted` untuk teks pendukung, bukan menurunkan opacity `--foreground`.

Content lesson (`markdown` block) memakai **content width 65–72ch** (§frontend brief awal, konsisten prinsip keterbacaan editorial) — diberlakukan lewat `max-width` pada content pane, bukan pada seluruh halaman.

### 8.4 Shape, elevation, motion

- **Radius**: satu skala (mis. `sm`/`md`/`lg` mengikuti rasio tetap), dipakai konsisten button/input/card/dialog.
- **Elevation**: 2 tingkat cukup (raised untuk card/panel, floating untuk dialog/dropdown) — jangan menciptakan 5 tingkat shadow berbeda.
- **Motion**: durasi pendek (150–250ms) untuk micro-interaction (hover, toggle), transisi halaman minimal. Semua animasi lewat CSS transition/Tailwind, **bukan** JS scroll handler custom (dilarang Taste Skill §9) — pola scroll-reveal (jika dipakai di homepage) memakai animation skeleton baku Impeccable, bukan `IntersectionObserver` yang ditulis manual per halaman.

---

## 9. Animation Skeletons yang Diizinkan

Sesuai guardrail Taste Skill §5, animasi hanya lewat pola berikut, tidak ada scroll handler custom:

| Pola | Kapan dipakai | Implementasi |
|---|---|---|
| Fade/slide-in on mount | Toast, dialog, drawer masuk/keluar | CSS transition + state boolean, atau primitif animasi dari library komponen (§10.1) |
| Progress bar fill | Update Progress Rakitan/Build Progress | CSS `width`/`transform` transition saat value berubah |
| Skeleton loading | Data fetch (course list, lesson content, admin table) | Komponen `Skeleton` statis dengan shimmer CSS, bukan animasi JS |
| Scroll-reveal (opsional, homepage saja) | Section homepage muncul saat discroll | Native CSS `@scroll-timeline`/`IntersectionObserver` yang dibungkus **satu** hook reusable (`useScrollReveal`), dipakai deklaratif — tidak menulis listener baru per komponen |

Lesson reader **tidak** memakai scroll-reveal — teks harus langsung terbaca penuh tanpa animasi masuk per paragraf (ini akan mengganggu membaca panjang).

---

## 10. Component Taxonomy

### 10.1 Primitive (fondasi, tanpa pengetahuan domain)

Button, IconButton, Link, Input, Textarea, Select, Checkbox, Radio, Switch, Label, FieldHint, FieldError, Dialog, Drawer/Sheet, Toast, Tabs, Breadcrumb, Pagination, Avatar, Badge, Tooltip, Skeleton, EmptyState, Divider.

Sumber implementasi: shadcn/ui (§14.2 PRD) sebagai basis, distyle ulang lewat token §8.2 — bukan dipakai dengan warna default shadcn.

### 10.2 Composite (gabungan primitive, masih domain-agnostic)

- **AppHeader** (varian per shell — public/learner/admin)
- **Sidebar** (varian kurikulum vs admin nav)
- **ProgressBar** (dipakai untuk lesson progress & Build Progress, beda warna aksen intensitas)
- **StatusBadge** (mapping generik dari enum status → warna semantik, dipetakan per domain di §10.3)
- **FormField** (Label + Input/Select/dst + FieldHint/FieldError terpadu)
- **FileUpload** (dipakai untuk image lesson, thumbnail course, screenshot project — satu komponen, beda `ownerScope`)
- **CodeBlock** (syntax highlight + tombol Copy + optional filename/caption)
- **ConfirmDialog** (konfirmasi aksi destruktif — hide project, revoke enrollment, delete image)

### 10.3 Domain (spesifik konsep DirakitPro)

| Komponen | Peta ke data model |
|---|---|
| `CourseCard` | `courses` (katalog listing) |
| `CourseDetailHeader` | `courses` + `courseResources` |
| `CurriculumSidebar` | `courseStages` + `lessons` + `lessonProgress` |
| `LessonContentRenderer` | `lessons.content` (block array — lihat §8 di bawah) |
| `LessonNav` (prev/next) | `lessons.order` + `lessonProgress` |
| `CheckpointQuiz` | `checkpointConfigs` + `checkpointQuestions` + `checkpointQuestionOptions` |
| `CheckpointResult` | `checkpointAttempts` |
| `BuildProgressMeter` | `buildMilestones` + `lessonMilestoneMap` (lebih menonjol dari `LessonProgressBar`, §2.2) |
| `ProjectSubmissionForm` | `projects` + `projectSubmissions` |
| `PublicProjectCard`/`PublicProjectPage` | `projects` (visibility=PUBLIC, moderation=VISIBLE) |
| `PaymentStatusPanel` | `orders` + `payments` |
| `OrderHistoryTable` | `orders` |
| `AdminLessonBlockEditor` | `lessons.content` (authoring side) |
| `AdminCurriculumEditor` | `courseStages` + `lessons` (reorder via up/down, ADM-003) |
| `LessonFeedbackWidget` | `lessonFeedback` |

---

## 11. Content Block Rendering (LRN-005)

`LessonContentRenderer` menerima array block dan me-render satu komponen per tipe, **tidak** ada fallback yang mengeksekusi HTML mentah (§16 PRD):

| Block type | Komponen render | Catatan |
|---|---|---|
| `markdown` | `MarkdownBlock` | Sanitasi wajib (mis. lewat `rehype-sanitize`), heading di dalam markdown lesson dimulai dari `h2` (karena `h1` halaman dipegang judul lesson) |
| `code` | `CodeBlock` | Syntax highlight server-side jika memungkinkan (§14.3 PRD), tombol Copy, filename optional di atas block |
| `image` | `ImageBlock` | `next/image` dengan lazy load, alt wajib, caption optional di bawah gambar |
| `callout` | `CalloutBlock` | 4 varian (info/tip/warning/important) dibedakan lewat token warna semantik + ikon, bukan warna bebas |
| `resource_link` | `ResourceLinkBlock` | Tampil sebagai link card ringkas (label + deskripsi), bukan raw `<a>` di tengah paragraf |
| `task` | `TaskBlock` | Instruksi + indikator required/optional; jika required dan lesson type BUILD, task ini terhubung ke gate penyelesaian lesson |

Renderer ini **wajib generik terhadap tipe block baru** — menambah `video` block di P1 hanya menambah satu `case` baru di switch renderer, tanpa mengubah struktur `LessonContentRenderer` atau layout workspace.

---

## 12. State Coverage (wajib per halaman/komponen data-driven)

Setiap halaman yang mengambil data wajib punya rancangan untuk state berikut sebelum dianggap selesai — bukan ditambahkan belakangan:

| State | Contoh wajib dirancang |
|---|---|
| **Loading** | Skeleton course card, skeleton lesson content, skeleton admin table |
| **Empty** | Belum ada kelas aktif (dashboard), curriculum belum ada stage (admin), belum ada order (riwayat) |
| **Error** | Gagal fetch course detail, gagal submit checkpoint, gagal upload gambar |
| **Locked/Forbidden** | Lesson belum eligible (LRN-007), admin route diakses non-admin, course UNPUBLISHED diakses guest |
| **Payment states** | `PENDING` (menunggu pembayaran), `PAID`, `EXPIRED`, `CANCELLED` — masing-masing di `/payment/[orderId]` |
| **Already-owned** | Guest mencoba beli course yang sudah dimiliki (COM-007) |
| **Checkpoint pass/fail** | Hasil lulus vs gagal, dengan CTA berbeda |
| **Project visibility toggle** | Konfirmasi sebelum PUBLIC (karena akan membuat link publik) |
| **Moderation hidden** | Halaman publik project yang di-HIDDEN admin — pesan netral, bukan error 404/500 |
| **Unsaved changes** | Admin lesson editor meninggalkan halaman dengan draft belum disimpan (ADM-005) |

---

## 13. Forms & Validation

- **React Hook Form + Zod** (§14.2 PRD) untuk semua form — schema Zod didefinisikan sekali, dipakai di client (validasi langsung) dan server action/route handler (validasi ulang, karena §15.3 PRD: business logic tidak boleh hanya di client).
- Error muncul **inline per field** (`FieldError` di bawah input terkait), bukan hanya toast/banner ringkasan di atas form.
- Tombol submit disabled saat form invalid **atau** sedang submitting — dengan label berubah ("Menyimpan...") agar learner/admin tahu aksi sedang berjalan.
- Field wajib ditandai konsisten (mis. asterisk + `aria-required`), bukan hanya warna.

---

## 14. Keputusan Desain (Produk, Bukan Sekadar Estetika)

| # | Keputusan | Alasan |
|---|---|---|
| 1 | **Tidak ada theme switcher di MVP.** Dual-theme token tetap disiapkan sejak scaffold (§8.2), tapi tema mengikuti `prefers-color-scheme` sistem, bukan toggle UI. | PRD tidak menyebut kebutuhan dark mode sebagai fitur learner-facing eksplisit; menyiapkan token sejak awal murah, menambah toggle + persistensi preferensi adalah scope tambahan yang belum diminta (selaras §5.2 non-goals "MVP simplicity"). |
| 2 | **Satu warna aksen tunggal** untuk seluruh produk (bukan aksen berbeda per shell publik/learner/admin). | Color Consistency Lock (Taste Skill §4) — mencegah produk terasa seperti 3 aplikasi berbeda. |
| 3 | **Lesson workspace adalah satu-satunya layout dengan sidebar fixed desktop.** Dashboard/account tidak pakai sidebar. | Sidebar hanya dibutuhkan saat learner aktif bernavigasi antar-lesson dalam satu course; di luar itu sidebar jadi chrome tanpa fungsi. |
| 4 | **Drag-and-drop tidak dibangun untuk reorder kurikulum admin** — pakai kontrol naik/turun. | Eksplisit dari ADM-003/§14.4 PRD ("Drag-and-drop is not required"). |
| 5 | **Tidak ada animasi masuk per paragraf di lesson reader.** | Mengganggu keterbacaan materi panjang; bertentangan dengan prinsip "text-first" dan aksesibilitas motion. |
| 6 | **Admin shell boleh terasa lebih utilitarian** (kepadatan tabel lebih tinggi, dekorasi lebih minim) dibanding shell publik/learner, tapi **tetap satu sistem token**. | Prioritas admin adalah efisiensi kerja founder mengelola konten (§4.3.6 PRD "easy to update"), bukan showcase visual. |
| 7 | **Content width lesson dikunci 65–72ch**, tidak mengikuti lebar penuh container di desktop besar. | Keterbacaan teks panjang; standar tipografi editorial, konsisten dengan positioning "text-first". |
| 8 | **Sistem warna & tipografi produk diganti total ke biru DirakitPro + Outfit**, menggantikan oksida jingga + Geist Sans. Berlaku **produk-wide** (public/learner/admin), bukan hanya homepage. | Keputusan eksplisit product owner (2026-08-28), diambil setelah ditanya apakah perubahan ini homepage-only atau produk-wide; jawabannya "ganti total token produk". Diterapkan sebagai perubahan **nilai** token, bukan perubahan nama token, sehingga Keputusan #2 (aksen tunggal) dan seluruh komponen yang sudah ada tetap berlaku tanpa perubahan API. Mood target: tenang, modern, optimistis, ramah pemula, sedikit premium — "bengkel digital yang lembut". |
| 9 | **Dua item ban list §1.3 dilonggarkan secara terbatas dan sadar** untuk arah visual baru: (a) **blob warna blur** sebagai elemen latar diizinkan, terbatas pada nuansa `--accent-muted`/`--accent` dengan opacity rendah, satu sistem hue biru; (b) **eyebrow polos tanpa nomor** di atas heading hero diizinkan. | Keduanya bukan pelanggaran ban list yang sebenarnya, melainkan pembacaan yang lebih tepat atas ban list itu: larangan §1.3 baris 1 menyasar *gradient ungu/mesh multi-hue khas AI dan glow dekoratif*, bukan semua bidang warna blur; larangan baris 5 menyasar *penomoran section* ("01 — "), bukan eyebrow sebagai pola. Kedua elemen diminta eksplisit oleh product owner sebagai keputusan produk, bukan muncul sebagai kebiasaan default generator. **Batas yang tetap berlaku:** tidak ada gradient ungu, tidak ada mesh multi-hue, tidak ada glow di sekitar teks/tombol, tidak ada penomoran section, blob tidak boleh menurunkan kontras teks di atasnya di bawah ambang §6 poin 3. |
| 10 | **`--accent-foreground` adalah slate gelap `#0F172A`, bukan putih**, meski konvensi umum menaruh teks putih di atas tombol biru. | Putih di atas `#2196F3` hanya 3.12:1 — gagal baseline AA §6 poin 3 (≥4.5:1) tepat di elemen paling penting produk (setiap CTA primer). `#0F172A` di atas `#2196F3` memberi 5.71:1. Ini juga mengikuti spesifikasi Material sendiri untuk Blue 500. Alternatif yang ditolak: menggelapkan `--accent` ke `#1565C0` agar putih lolos (5.75:1) — ditolak karena `#2196F3` adalah hex yang ditetapkan eksplisit oleh product owner. Kalau tim lebih memilih CTA teks putih, yang harus diubah adalah nilai `--accent`, **bukan** menaikkan `--accent-foreground` ke putih di atas `#2196F3`. |
| 11 | **Dark mode diturunkan sendiri sebagai inversi terkontrol** dari sistem light, karena brief produk tidak menetapkan nilai dark. | Token dark adalah dependensi fondasi yang diblokir banyak pekerjaan lain; menunggu spesifikasi lebih mahal daripada memilih default yang wajar dan bisa direvisi. Aturannya: hue biru-slate yang sama dipertahankan, lightness dibalik, chroma surface dijaga rendah, `--foreground` dark = `#E3F2FD` (ground light mode) supaya kedua tema jelas satu sistem. Semua pasangan diverifikasi ≥4.5:1 untuk teks. Murah dibalik (hanya nilai di satu blok `@media`). |

---

## 15. Implementation Contracts untuk Fase 0

Berikut yang **harus** benar sejak scaffold pertama, karena mahal diubah setelah banyak halaman dibangun:

1. **Tiga route group** (`(public)`, `(learner)`, `(admin)`) dengan `layout.tsx` masing-masing merender shell §7 — bukan satu `layout.tsx` root yang bercabang secara kondisional.
2. **Token CSS semantik** (§8.2) didefinisikan di `app/globals.css` sebelum komponen pertama ditulis — komponen tidak boleh mendahului token.
3. **Middleware Clerk** memisahkan route publik vs terproteksi (`(learner)`, `(admin)`) sesuai IAM-002; route `(admin)` tambahan cek `role=ADMIN` di server (ADM-001), bukan hanya menyembunyikan link di UI.
4. **`LessonContentRenderer`** dan tipe `LessonContentBlock` (referensi `docs/DATA-MODEL.md` §3.3 catatan implementasi) dibangun sebagai modul bersama sejak awal — dipakai baik oleh workspace learner maupun preview admin, satu sumber kebenaran render.
5. **Struktur folder komponen** mengikuti taksonomi §10:
   ```text
   components/
     ui/            -- primitive (§10.1, umumnya hasil shadcn generate)
     composite/      -- §10.2
     domain/         -- §10.3, boleh dipecah lagi per domain (learning/, commerce/, admin/)
   ```
6. **Font** di-load lewat `next/font` (self-hosted/subset), bukan `<link>` ke Google Fonts CDN langsung — konsisten §15.1 PRD (performa mobile Indonesia).
7. **Image** lesson & thumbnail selalu lewat `next/image`, tidak ada `<img>` mentah, agar lazy-load & responsive sizing (§14.3 PRD) otomatis konsisten.
8. **Server Component default** — Client Component (`'use client'`) hanya untuk elemen interaktif spesifik (form, dialog, checkpoint quiz, editor block), sejalan §15.1 PRD (first paint cepat) dan §15.3 (logic kritikal tidak hanya di client).

---

## 16. Design QA Workflow (Taste Skill + Impeccable)

Kedua tool saling melengkapi, dipakai di titik berbeda:

1. **`/impeccable init`** dijalankan di awal Fase 0 (setelah scaffold Tailwind ada) untuk menghasilkan `PRODUCT.md` + `DESIGN.md` — isi token §8.2 dokumen ini menjadi input `DESIGN.md`, bukan dirancang ulang dari nol oleh Impeccable.
2. **`/impeccable shape`** dipakai saat merancang halaman baru yang belum ada wireframe eksplisit di §7 — hasilnya harus tetap konsisten dengan Locks §14 Taste Skill dan token §8.2 dokumen ini.
3. **Taste Skill `SKILL.md`** tetap aktif pasif di setiap sesi coding UI — guardrail anti-slop §1.3 dokumen ini adalah ringkasan yang harus konsisten dengan `SKILL.md` sumber.
4. **`/impeccable audit` / `critique`** dijalankan sebelum halaman dianggap selesai — bukan hanya mengandalkan hook otomatis.
5. **Hook otomatis** (`.claude/settings.local.json`, `.codex/hooks.json`) sudah aktif untuk Edit/Write pada file UI — deep pass jalan otomatis saat `Stop`. Dokumen ini adalah rubrik yang dipakai hook/reviewer manusia untuk menilai "sesuai" atau "tidak", bukan pengganti hook.

---

## 17. Traceability Matrix (ringkas)

| Requirement ID (PRD) | Ditangani di dokumen ini |
|---|---|
| CAT-001/002/003/004 | §4.1, §7.1, §14 |
| COM-001–008 | §4.1, §12 (payment states, already-owned) |
| LRN-001–008 | §4.1–4.2, §7.2, §10.3, §11 |
| MED-001–006 | §10.2 (FileUpload), §11 (ImageBlock), §6 poin 4 |
| CHK-001–005 | §4.3, §10.3 |
| BLD-001–004 | §2.2, §10.3 (BuildProgressMeter) |
| PRJ-001–007 | §4.4, §10.3, §12 |
| ADM-001–010 | §4.5, §7.3, §10.3, §14 poin 4/6 |
| FDB-001–003 | §10.3 (LessonFeedbackWidget) |
| §15.1 Performance | §2.1, §15 poin 6/7/8 |
| §15.2 Accessibility | §6 |
| §16 Security (no raw HTML) | §11 |

---

## 18. Belum Ada Keputusan Terbuka

Tidak ada open question yang genuinely belum terjawab di dokumen ini — semua keputusan visual yang tidak eksplisit di PRD sudah diputuskan dan didokumentasikan di §14 sebagai keputusan produk, mengikuti pola yang sama seperti `docs/DATA-MODEL.md` §5. Jika implementasi menemukan ambiguitas baru saat scaffold, catat di sini sebagai pertanyaan baru sebelum melanjutkan — jangan diputuskan diam-diam di level komponen.

---

## 19. Langkah Selanjutnya

1. **Fase 0 — Scaffold**: inisialisasi Next.js 16 + Tailwind + shadcn/ui sesuai §14.2 PRD, terapkan struktur route group & token (§15 poin 1–2) sejak commit pertama.
2. **`/impeccable init`**: hasilkan `PRODUCT.md`/`DESIGN.md` dari token §8.2 dokumen ini.
3. **Bangun primitive + composite** (§10.1–10.2) sebelum domain component — domain component menyusun primitive, bukan sebaliknya.
4. **Implementasi shell** (§7) tiga-tiganya sekaligus di awal, meski halaman di dalamnya masih placeholder — supaya struktur routing final dari awal.
5. **Lanjut ke urutan build per domain** (Identity → Catalog → Commerce → Learning → Checkpoint/Build → Project → Admin) mengikuti prioritas P0 §6.1 PRD, dengan tiap halaman dicek terhadap wireframe §7 dan state coverage §12 sebelum dianggap selesai.
