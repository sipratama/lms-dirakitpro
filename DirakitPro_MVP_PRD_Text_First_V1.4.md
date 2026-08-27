# DirakitPro — MVP Product Requirements Document

> **Version:** V1.4 — Text-First MVP  
> **Status:** Proposed Scope Reset  
> **Date:** 27 August 2026  
> **Market:** Indonesia  
> **Primary segment:** Beginner digital builders, terutama usia 18–27 tahun  
> **Brand philosophy:** **Profesional itu dirakit.**  
> **Beginner promise:** **Mulai dari rakitan pertama.**

---

## 1. Executive Summary

DirakitPro adalah platform pembelajaran online untuk pemula di Indonesia yang berorientasi pada hasil nyata. Learner tidak sekadar mengonsumsi materi, tetapi belajar langkah demi langkah sambil merakit project yang dapat dilihat, digunakan, dan ditunjukkan.

Untuk MVP V1.4, pengalaman belajar dibuat **text-first**. Materi utama disajikan sebagai bacaan terstruktur yang dapat berisi teks/Markdown, code block, gambar, callout, resource link, dan build task. **Video tidak menjadi bagian dari MVP.**

MVP sengaja memprioritaskan alur paling penting:

```text
Discover Course
    ↓
Purchase / Free Enroll
    ↓
Read Structured Lesson
    ↓
Practice / Build
    ↓
Checkpoint
    ↓
Progress Rakitan
    ↓
Final Project Submission
    ↓
Course Completed
    ↓
Optional Public Project Link
```

Inspirasi learning experience diambil dari pola kelas self-paced berbasis modul bacaan: materi dibagi menjadi modul/lesson yang terurut, learner membaca materi, mempraktikkan contoh, mengerjakan checkpoint, dan menyelesaikan submission/project. DirakitPro tidak menyalin fitur atau UI platform lain; pola tersebut diadaptasi ke positioning DirakitPro yang outcome-first.

### MVP value proposition

> **Belajar dengan membaca, mencoba, dan langsung merakit.**  
> Tidak perlu menunggu playlist video selesai untuk mulai membuat sesuatu.

---

## 2. Product Context & Problem

### 2.1 Problem

Banyak platform belajar pemrograman berfokus pada konsumsi konten. Untuk beginner, pola tersebut dapat menciptakan beberapa masalah:

- terlalu lama mengonsumsi materi sebelum memperoleh hasil visual;
- learner merasa sudah belajar karena menonton, tetapi belum mencoba sendiri;
- video membutuhkan biaya produksi dan maintenance lebih tinggi;
- update materi teknis di video lebih mahal dibanding memperbarui teks dan gambar;
- learner sulit melakukan scanning cepat ketika ingin mencari kembali bagian tertentu.

### 2.2 Opportunity

DirakitPro dapat memulai dengan format yang lebih ringan dan mudah diproduksi:

- teks sebagai medium utama;
- code snippet yang dapat dicopy;
- screenshot/diagram sebagai bantuan visual;
- build task langsung setelah penjelasan;
- checkpoint singkat untuk memastikan learner tidak hanya scroll;
- project akhir sebagai bukti bahwa learner benar-benar menghasilkan sesuatu.

### 2.3 Product thesis

> Pemula tidak harus menonton banyak video untuk dapat mulai membangun. Materi yang jelas, terstruktur, visual secukupnya, dan langsung diikuti praktik dapat menjadi pengalaman belajar yang lebih ringan, cepat diproduksi, dan lebih mudah diperbarui.

---

## 3. Target Market & Persona

### 3.1 Primary ICP

Pemula usia sekitar 18–27 tahun di Indonesia yang ingin membuat website atau aplikasi pertama dan membutuhkan panduan langkah demi langkah.

Contoh:

- mahasiswa yang membutuhkan project portfolio;
- fresh graduate yang ingin memiliki bukti kemampuan;
- non-IT beginner yang mulai belajar membuat digital product;
- junior developer yang masih membutuhkan tutorial terstruktur;
- calon freelancer yang ingin membuat project pertama yang layak ditunjukkan.

### 3.2 Core Jobs-To-Be-Done

| JTBD | Desired Outcome |
|---|---|
| Saya ingin belajar coding tanpa bingung mulai dari mana. | Mendapat urutan belajar yang jelas. |
| Saya ingin langsung praktik. | Setiap konsep diikuti tindakan/build task. |
| Saya ingin punya sesuatu yang jadi. | Memiliki project akhir yang berjalan. |
| Saya lupa sintaks atau langkah sebelumnya. | Materi mudah dicari ulang dan discan. |
| Saya ingin tahu progress saya. | Progress lesson dan Progress Rakitan terlihat jelas. |
| Saya ingin menunjukkan hasil belajar. | Memiliki link project/shareable evidence. |

### 3.3 Anti-persona MVP

- senior engineer yang mencari advanced system design;
- corporate LMS buyer;
- instructor marketplace;
- learner yang membutuhkan live bootcamp intensif;
- learner yang mencari video-first course library.

---

## 4. Positioning & Product Principles

### 4.1 Positioning

> DirakitPro adalah platform belajar berbasis karya, tempat pemula belajar dengan membaca, mencoba, dan merakit sesuatu hingga menjadi hasil nyata.

### 4.2 Brand vocabulary

| Generic LMS | DirakitPro |
|---|---|
| Start Course | **Mulai Merakit** |
| Continue Course | **Lanjut Merakit** |
| Course Progress | **Progress Rakitan** |
| Final Project | **Hasil Rakitan** |
| Course Completed | **Rakitanmu jadi!** |
| Publish Project | **Tunjukkan Karyamu** |

### 4.3 Product principles

1. **Text-first, not text-only forever** — teks adalah medium utama MVP; video dapat ditambahkan setelah demand terbukti.
2. **Outcome before theory** — jelaskan konsep tepat ketika dibutuhkan oleh build.
3. **Short explanation, immediate action** — setiap bagian materi mengarah ke tindakan.
4. **Read → Try → Check → Build** — pola inti lesson.
5. **Build Progress > reading percentage** — progres project tetap lebih penting daripada sekadar halaman yang dibaca.
6. **Easy to update** — content authoring harus memungkinkan admin memperbaiki materi tanpa deploy aplikasi.
7. **Beginner friendly** — bahasa sederhana, contoh konkret, istilah teknis dijelaskan saat pertama muncul.
8. **AI is allowed** — learner boleh menggunakan AI, tetapi checkpoint dan project memastikan learner tetap melakukan validasi hasil.
9. **MVP simplicity** — tidak membangun video hosting, forum, code runner, code review marketplace, atau gamification kompleks pada MVP.

---

## 5. MVP Goals, Non-Goals & Success Metrics

### 5.1 Goals

1. Membuktikan learner mau membeli course text-first karena outcome project yang konkret.
2. Membuktikan learner benar-benar memulai dan melanjutkan materi setelah membeli.
3. Membuktikan struktur Read → Try → Build dapat membawa learner sampai project akhir.
4. Membuat content operation cukup ringan sehingga founder dapat membuat dan memperbarui course sendiri.
5. Mengumpulkan data untuk menentukan apakah video benar-benar dibutuhkan pada fase berikutnya.

### 5.2 Non-goals MVP

- video lesson atau video hosting;
- live class;
- forum/community internal;
- code review oleh reviewer manusia;
- mentor marketplace;
- interactive cloud IDE/code runner;
- certificate;
- subscription;
- promotional bundle `FIXED`/`CHOOSE_N`;
- in-app mentoring booking/payment;
- AI learning assistant;
- mobile native application;
- complex gamification;
- leaderboard;
- microservices.

### 5.3 Primary metrics

| Metric | Definition |
|---|---|
| Purchase Conversion | Course viewers → paid enrollment. |
| Course Start Rate | Buyer yang membuka lesson pertama. |
| Lesson Completion Rate | Started lessons → completed lessons. |
| 50% Build Reach | Learner yang mencapai minimal 50% required build milestones. |
| Course Completion Rate | Enrollment yang menjadi COMPLETED. |
| Project Submission Rate | Enrollment yang mengirim final project. |
| Public Project Rate | Learner yang memilih membagikan project secara public. |

### 5.4 Content validation metrics

| Metric | Why |
|---|---|
| Average lesson completion time | Menemukan lesson terlalu panjang/pendek. |
| Lesson drop-off | Menemukan materi yang membuat learner berhenti. |
| Checkpoint retry rate | Mengukur bagian yang sulit dipahami. |
| Material feedback rate | Menemukan materi yang membingungkan atau outdated. |
| Video demand signal | Feedback eksplisit learner yang meminta demonstrasi video. |

---

## 6. MVP Scope & Priority

### 6.1 P0 — Must Ship

| Domain | P0 Capabilities |
|---|---|
| Marketing | Homepage, value proposition, featured course, CTA. |
| Catalog | Course list dan course detail. |
| Identity | Register, login, logout, Google login, recovery. |
| Commerce | Free enrollment, direct paid course purchase, order/payment. |
| Payment | Midtrans Snap + webhook. |
| Learning | Dashboard, course workspace, stage/module, lesson navigation. |
| Content | Text/Markdown, code block, image, callout, resource link, build task. |
| Image Media | Admin image upload, preview, alt text, caption, delete/replace. |
| Progress | Lesson progress + Build Progress. |
| Checkpoint | Lightweight auto-graded multiple-choice checkpoint. |
| Project | Final project submission + optional public project page. |
| Admin | Course, curriculum, lesson editor, image upload, learner/order/project view. |
| Email | Minimum transactional emails. |
| Analytics | Core purchase → learn → complete funnel. |

### 6.2 P1 — After Learning Demand Validation

- video content block;
- YouTube/Cloudflare Stream integration;
- course certificate;
- human project/code review;
- discussion/forum per lesson;
- learner bookmarks and private notes;
- course search within lesson content;
- curated public project gallery;
- featured projects;
- promo coupon/bundle;
- mentoring flow;
- richer assessment/question types;
- interactive code runner;
- AI learning assistant.

### 6.3 P2

- live cohorts;
- mentor marketplace;
- subscription library;
- organization/corporate LMS;
- mobile native apps;
- advanced gamification;
- production-grade automated code assessment.

---

## 7. User Roles & Core Journeys

### 7.1 Roles

| Role | Capability |
|---|---|
| Guest | Browse course, view public project, register/login, checkout. |
| Learner | Purchase/enroll, learn, complete lesson/checkpoint, submit project. |
| Admin | Create/edit/publish course and material, upload image, inspect learner/order/project. |

### 7.2 Journey A — Purchase to first lesson

1. Guest membuka course detail.
2. Guest melihat outcome, syllabus, requirements, estimasi belajar, harga.
3. Guest klik **Mulai Merakit**.
4. Login/register bila diperlukan.
5. Free course langsung membuat Enrollment ACTIVE; paid course membuat Order.
6. Paid course diselesaikan melalui Midtrans.
7. Webhook menjadi authoritative source payment success.
8. System mengaktifkan Enrollment tepat satu kali.
9. Learner diarahkan ke overview course dan lesson pertama.

### 7.3 Journey B — Text-first learning

1. Learner membuka lesson.
2. Learner membaca tujuan lesson.
3. Learner membaca penjelasan teks.
4. Learner melihat code snippet / screenshot bila dibutuhkan.
5. Learner mencoba langkah di local environment sendiri.
6. Learner mengerjakan Build Task atau checkpoint.
7. Lesson menjadi COMPLETED ketika rule lesson terpenuhi.
8. Progress Rakitan diperbarui.
9. Learner menekan **Lanjut** untuk lesson berikutnya.

### 7.4 Journey C — Final project

1. Learner menyelesaikan seluruh required lesson/checkpoint/milestone.
2. Learner membuka Hasil Rakitan.
3. Learner memasukkan live URL bila course membutuhkan deployment.
4. Learner memasukkan repository URL bila relevan.
5. Learner mengupload screenshot project.
6. Learner menulis catatan singkat tentang hasil project.
7. Submission menjadi SUBMITTED.
8. Enrollment menjadi COMPLETED ketika seluruh completion rule terpenuhi.
9. Learner dapat memilih PRIVATE atau PUBLIC.
10. Jika PUBLIC, learner memperoleh shareable project link.

---

## 8. Functional Requirements

## 8.1 Identity & Access

### IAM-001 Registration [P0]
Guest dapat membuat akun melalui Clerk menggunakan email/password atau Google.

**Acceptance:** setiap authenticated identity memiliki tepat satu internal `User`.

### IAM-002 Login/logout [P0]
Protected learner/admin route wajib memverifikasi session server-side.

### IAM-003 Recovery [P0]
Email verification, forgot password, dan reset password menggunakan capability provider auth.

### IAM-004 Internal user isolation [P0]
Seluruh domain LMS menggunakan internal `users.id`, bukan provider user ID sebagai foreign key utama.

---

## 8.2 Catalog

### CAT-001 Course catalog [P0]
Guest dapat melihat course PUBLISHED dengan:

- thumbnail;
- title;
- short outcome;
- level;
- estimated duration;
- price/free badge;
- primary CTA.

### CAT-002 Course detail [P0]
Course detail minimum berisi:

- hasil akhir yang akan dibuat;
- screenshot/example outcome;
- description;
- target learner;
- prerequisites;
- tools yang diperlukan;
- syllabus/stage list;
- estimated study time;
- project requirement;
- price;
- CTA `Mulai Merakit`.

### CAT-003 Publishing [P0]
Course memiliki state `DRAFT`, `PUBLISHED`, `UNPUBLISHED`.

Course UNPUBLISHED tidak dapat dibeli baru tetapi learner yang sudah enrolled tetap memiliki akses.

### CAT-004 Free course [P0]
Course dapat FREE dan enrollment dapat dibuat tanpa payment gateway.

---

## 8.3 Commerce & Payment

### COM-001 Course as sellable unit [P0]
Satu purchase membuka seluruh course. Tidak ada paywall per stage/lesson.

### COM-002 Direct course order [P0]
Paid course membuat immutable snapshot minimum:

- user;
- course ID;
- title;
- price;
- currency;
- total;
- timestamp.

### COM-003 Midtrans checkout [P0]
Transaction dibuat server-side; credential provider tidak pernah dikirim ke browser.

### COM-004 Authoritative webhook [P0]
Browser redirect tidak boleh membuka akses course. Enrollment diaktifkan berdasarkan verified payment/webhook state.

### COM-005 Idempotent enrollment [P0]
Webhook retry tidak boleh membuat Enrollment ganda.

### COM-006 Duplicate order prevention [P0]
User tidak boleh memiliki lebih dari satu PENDING order untuk course yang sama secara simultan.

### COM-007 Already-owned course block [P0]
Server menolak order baru bila learner sudah memiliki Enrollment `ACTIVE`/`COMPLETED` pada course tersebut.

### COM-008 Order history [P0]
Learner dapat melihat order, nominal, tanggal, course, dan status.

---

## 8.4 Learning Workspace

### LRN-001 Learner dashboard [P0]
Dashboard menampilkan:

- active courses;
- Progress Rakitan;
- lesson terakhir;
- current stage;
- CTA **Lanjut Merakit**;
- completed courses.

### LRN-002 Course overview [P0]
Route awal course menampilkan:

- course outcome;
- current progress;
- stages/modules;
- course-level resources;
- current/next lesson;
- final project requirement.

### LRN-003 Learning workspace [P0]
Workspace minimum memiliki:

- sidebar curriculum;
- current stage;
- lesson title;
- estimated reading/practice time;
- content pane;
- previous/next navigation;
- progress indicator;
- course resources shortcut.

Desktop dapat memakai sidebar fixed/collapsible. Mobile menggunakan drawer atau compact curriculum selector.

### LRN-004 Lesson types [P0]
MVP mendukung:

| Type | Purpose |
|---|---|
| `CONCEPT` | Menjelaskan konsep. |
| `DEMO` | Written walkthrough dengan teks, code, dan gambar. |
| `BUILD` | Learner melakukan implementasi nyata. |
| `CHECKPOINT` | Memastikan pemahaman / evidence sederhana. |
| `DEPLOY` | Mempublikasikan hasil bila course membutuhkan deployment. |

**Catatan:** `DEMO` pada MVP adalah demonstrasi tertulis, bukan video.

### LRN-005 Lesson content blocks [P0]
`Lesson.content` disimpan sebagai ordered block array.

Supported block types:

```text
markdown
code
image
callout
resource_link
task
```

Tidak ada `video` block pada MVP.

#### `markdown`
Untuk paragraph, heading, list, table, quote, inline code, dan emphasis.

#### `code`
Minimum fields:

- language;
- code;
- optional filename;
- optional caption;
- line wrapping preference.

Learner dapat menekan **Copy code**.

#### `image`
Minimum fields:

- storage key / URL;
- alt text;
- optional caption;
- width/height metadata bila tersedia.

#### `callout`
Variant minimum:

- info;
- tip;
- warning;
- important.

#### `resource_link`
Minimum fields:

- label;
- URL;
- optional description.

#### `task`
Menyampaikan tindakan yang harus dilakukan learner.

Minimum fields:

- instruction;
- required/optional;
- optional evidence hint.

### LRN-006 Lesson progress [P0]
State:

```text
NOT_STARTED → STARTED → COMPLETED
```

Lesson `CONCEPT`, `DEMO`, dan `DEPLOY` dapat diselesaikan melalui explicit learner action **Tandai Selesai / Lanjut** setelah lesson telah dibuka.

Lesson `BUILD` dapat mensyaratkan required task confirmation.

Lesson `CHECKPOINT` mengikuti rule checkpoint di 8.6.

### LRN-007 Sequential progression [P0]
Course dapat dikonfigurasi sequential.

Default MVP:

- required lesson sebelumnya harus selesai sebelum required lesson berikutnya dianggap eligible;
- optional lesson tidak memblokir progression;
- admin dapat melihat urutan lesson tanpa branching dependency graph kompleks.

### LRN-008 Course-level resources [P0]
Course memiliki resources yang persisten di seluruh workspace:

- repository/starter code;
- asset files;
- documentation links;
- reference links;
- tooling links.

---

## 8.5 Image Upload & Media

### MED-001 Admin image upload [P0]
Admin dapat mengupload gambar langsung saat membuat/edit materi.

Supported baseline:

- PNG;
- JPEG/JPG;
- WebP.

SVG hanya diizinkan bila implementasi sanitization dinilai aman; jika tidak, defer dari MVP.

### MED-002 Image validation [P0]
Server memvalidasi:

- MIME/type;
- extension consistency;
- maximum file size;
- image dimensions bila relevan;
- ownership/upload context.

Recommended MVP max size: **5 MB per image**.

### MED-003 Object storage [P0]
Binary image disimpan di object storage (Cloudflare R2 baseline), bukan PostgreSQL.

Database/content block hanya menyimpan reference metadata.

### MED-004 Image accessibility [P0]
Alt text wajib untuk image content kecuali image ditandai dekoratif.

### MED-005 Replace/delete image [P0]
Admin dapat mengganti image pada content block. Penghapusan object storage harus aman terhadap image yang masih direferensikan lesson lain.

### MED-006 Project screenshot upload [P0]
Karena upload infrastructure sudah dibutuhkan untuk materi course, learner juga dapat mengupload screenshot final project menggunakan pipeline yang sama dengan ownership scope berbeda.

---

## 8.6 Checkpoint & Knowledge Validation

### CHK-001 Checkpoint lesson [P0]
`CHECKPOINT` dapat memiliki lightweight quiz.

Question types MVP:

- single-choice;
- multiple-choice.

### CHK-002 Auto grading [P0]
System menghitung jawaban benar secara otomatis.

Admin menentukan:

- questions;
- correct answer(s);
- explanation setelah submit;
- passing score.

### CHK-003 Retry [P0]
Learner boleh retry checkpoint tanpa hard attempt limit.

Attempt history minimum menyimpan:

- learner;
- checkpoint;
- score;
- passed/failed;
- timestamp.

### CHK-004 Completion [P0]
Checkpoint lesson menjadi `COMPLETED` ketika learner mencapai passing score.

### CHK-005 No high-stakes exam [P0]
MVP tidak memiliki proctoring, randomized question bank kompleks, anti-cheat, atau certification exam.

---

## 8.7 Build Progress

### BLD-001 Build milestones [P0]
Course dapat memiliki required build milestones, misalnya:

- Project Setup;
- First Screen;
- Interactivity;
- Data Persistence;
- Authentication;
- Deployment.

### BLD-002 Milestone mapping [P0]
Satu atau lebih required lesson/checkpoint dapat dipetakan ke BuildMilestone.

### BLD-003 Milestone completion [P0]
Milestone otomatis complete ketika seluruh required lesson yang dipetakan ke milestone telah COMPLETED.

### BLD-004 Build Progress [P0]

```text
completed required milestones / total required milestones × 100
```

Build Progress harus lebih menonjol daripada raw lesson completion percentage.

---

## 8.8 Final Project & Showcase

### PRJ-001 Project auto-create [P0]
Satu Project DRAFT dibuat saat Enrollment ACTIVE.

### PRJ-002 Final submission [P0]
Learner dapat mengisi:

- project title;
- description/notes;
- live URL bila required;
- repository URL bila relevan;
- screenshot upload;
- optional technology list.

### PRJ-003 Validation [P0]
URL harus `http(s)` dan well-formed.

Required fields dapat dikonfigurasi per course karena tidak semua course wajib menghasilkan deployed website.

### PRJ-004 Visibility [P0]
Project default `PRIVATE`.

Learner dapat memilih `PUBLIC` secara opt-in.

### PRJ-005 Shareable public page [P0]
PUBLIC project memiliki route shareable yang menampilkan minimum:

- project title;
- learner display name;
- screenshot;
- description;
- technology list;
- live URL bila tersedia;
- repository URL bila learner mengizinkan;
- course attribution.

### PRJ-006 Safety moderation [P0]
Untuk menjaga scope kecil, MVP tidak memiliki approval workflow/featured gallery kompleks.

Admin hanya membutuhkan capability minimum:

```text
VISIBLE
HIDDEN
```

Admin dapat HIDE project public yang tidak layak tampil.

### PRJ-007 Curated gallery deferred [P1]
`/projects` gallery, APPROVED/FEATURED workflow, dan project curation dipindahkan ke P1.

---

## 8.9 Admin & Content Authoring

### ADM-001 Admin authorization [P0]
Semua admin route dan mutation membutuhkan server-side admin authorization.

### ADM-002 Course CRUD [P0]
Admin dapat:

- create course;
- edit metadata;
- set FREE/paid price;
- publish/unpublish;
- set thumbnail;
- define prerequisites/tools;
- define estimated duration.

### ADM-003 Curriculum management [P0]
Admin dapat:

- create/reorder stage;
- create/reorder lesson;
- set lesson type;
- set required/optional;
- map lesson ke milestone;
- preview curriculum.

Drag-and-drop tidak wajib; numeric ordering/up-down control cukup untuk MVP.

### ADM-004 Lesson editor [P0]
Admin dapat membuat material tanpa mengubah source code aplikasi.

Editor harus mendukung:

- title;
- slug;
- lesson type;
- learning objective;
- estimated time;
- ordered content blocks;
- Markdown preview;
- code block preview;
- image upload + alt/caption;
- callout;
- link;
- task;
- checkpoint configuration bila lesson type CHECKPOINT;
- preview as learner;
- draft/save/publish behavior.

### ADM-005 Autosave not required [MVP decision]
Autosave collaborative editor tidak wajib. Explicit **Save Draft** sudah cukup.

System harus memberi dirty-state warning sebelum user meninggalkan editor dengan perubahan yang belum tersimpan bila implementasinya ringan.

### ADM-006 Image library [P0-lite]
Admin dapat melihat image yang diupload dalam konteks course yang sedang diedit dan memilih kembali image tersebut.

Tidak perlu membangun full Digital Asset Management system.

### ADM-007 Learner view [P0]
Admin dapat melihat learner dan enrollment dasar.

### ADM-008 Order/payment view [P0]
Admin dapat melihat order dan normalized payment state.

### ADM-009 Project moderation [P0]
Admin dapat melihat public project dan mengubah visibility moderation menjadi `HIDDEN` bila perlu.

### ADM-010 Audit log [P0]
Mutation sensitif minimum dicatat:

- course publish/unpublish;
- price change;
- material publish;
- order/payment manual action bila ada;
- project hide/unhide.

Dedicated audit-log UI tidak wajib.

---

## 8.10 Feedback & Content Quality

### FDB-001 Material feedback [P0]
Learner dapat memberi feedback sederhana pada lesson:

- `Mudah dipahami`;
- `Membingungkan`;
- optional comment singkat.

### FDB-002 Report material issue [P0]
Learner dapat melaporkan:

- typo;
- broken link;
- outdated instruction;
- code tidak berjalan;
- gambar bermasalah;
- other.

### FDB-003 Admin visibility [P0-lite]
Feedback dapat diperiksa admin melalui simple list atau database-backed admin table. Workflow ticketing kompleks tidak wajib.

---

## 8.11 Email & Notification

### NTF-001 Transactional email [P0]
Minimum:

- auth/provider verification where applicable;
- payment success;
- enrollment activation;
- course completion.

### NTF-002 Failure resilience [P0]
Kegagalan email tidak boleh rollback successful payment/enrollment.

### NTF-003 Project publication email deferred [P1]
Tidak wajib untuk MVP.

---

## 9. Learning & Content Model

### 9.1 Hierarchy

```text
Course
  └── Stage
       └── Lesson
            ├── Content Blocks
            ├── Optional Checkpoint Config
            └── Progress
```

Course juga memiliki:

- BuildMilestones;
- CourseResources;
- Final Project requirement.

### 9.2 Recommended lesson structure

Setiap lesson sebaiknya mengikuti pola:

```text
1. Tujuan
2. Kenapa ini diperlukan
3. Konsep singkat
4. Contoh
5. Code / screenshot bila perlu
6. Coba sendiri
7. Build task / checkpoint
8. Ringkasan
9. Lanjut
```

### 9.3 Recommended content style

- paragraph pendek;
- satu konsep utama per section;
- heading jelas;
- screenshot hanya ketika benar-benar membantu;
- code snippet kecil dan fokus;
- hindari dump file source code sangat panjang;
- gunakan callout untuk warning/tip;
- jelaskan expected result setelah langkah penting;
- gunakan bahasa Indonesia natural, tetapi istilah teknis boleh English.

### 9.4 Lesson length guideline

Pedoman, bukan hard rule:

- 5–15 menit membaca untuk concept lesson;
- 10–30 menit untuk written demo;
- 20–90 menit untuk build lesson;
- checkpoint 3–10 menit.

Lesson panjang harus dipecah bila memiliki lebih dari satu hasil utama.

### 9.5 Initial course lineup

Tetap menggunakan tiga ide course awal sebagai product ladder, tetapi launch boleh dimulai **satu course terlebih dahulu**:

1. **Rakitan Pertama — Personal Website** — launch candidate.
2. Rakit Aplikasi Keuangan Pribadi — setelah flow learning tervalidasi.
3. Rakit Sistem Booking Bisnis — setelah content operation stabil.

Ini mengurangi biaya membuat tiga course sebelum mengetahui apakah learning experience dan purchase funnel bekerja.

---

## 10. Business Rules & States

### 10.1 Order

```text
PENDING → PAID
PENDING → EXPIRED
PENDING → CANCELLED
PAID → REFUNDED
```

### 10.2 Enrollment

```text
ACTIVE → COMPLETED
ACTIVE → REVOKED
```

### 10.3 Lesson progress

```text
NOT_STARTED → STARTED → COMPLETED
```

### 10.4 Project

```text
DRAFT → SUBMITTED
```

Visibility:

```text
PRIVATE | PUBLIC
```

Moderation:

```text
VISIBLE | HIDDEN
```

### 10.5 Course completion

Enrollment menjadi `COMPLETED` ketika:

1. seluruh REQUIRED lesson selesai;
2. seluruh required BuildMilestone complete;
3. seluruh REQUIRED checkpoint passed;
4. final Project berstatus `SUBMITTED`.

Project tidak wajib PUBLIC.

### 10.6 Content publishing rule

Course hanya dapat PUBLISHED jika minimum:

- title dan slug valid;
- description/outcome tersedia;
- minimal satu stage;
- minimal satu required lesson;
- course outcome/final requirement didefinisikan;
- price valid bila paid.

Lesson hanya dianggap learner-facing bila curriculum parent course PUBLISHED dan lesson tidak berstatus draft/unpublished menurut implementation state yang dipilih.

---

## 11. Data & Domain Model

### 11.1 Core entities

| Entity | Responsibility |
|---|---|
| `User` | Internal application identity. |
| `AuthIdentity` | Mapping Clerk identity → User. |
| `Course` | Catalog metadata, price, state, resources, final project config. |
| `CourseStage` | Ordered module/stage. |
| `Lesson` | Ordered text-first learning unit. |
| `LessonProgress` | Learner lesson state/timestamps. |
| `BuildMilestone` | Product-oriented milestone. |
| `CheckpointAttempt` | Score/result attempt untuk CHECKPOINT lesson. |
| `Enrollment` | Access learner ke satu course. |
| `Order` | Immutable purchase snapshot. |
| `Payment` | Midtrans transaction state. |
| `Project` | Hasil akhir per Enrollment. |
| `ProjectSubmission` | URL, notes, screenshot ref, submission state. |
| `MediaAsset` | Object storage metadata untuk image upload. |
| `LessonFeedback` | Feedback/report lesson. |
| `AdminAuditLog` | Sensitive admin mutation audit. |

### 11.2 Lesson content JSON example

```json
[
  {
    "type": "markdown",
    "markdown": "## Membuat struktur halaman\nKita mulai dari..."
  },
  {
    "type": "code",
    "language": "tsx",
    "filename": "app/page.tsx",
    "code": "export default function Page() { ... }"
  },
  {
    "type": "image",
    "assetId": "asset_123",
    "alt": "Preview hasil hero section",
    "caption": "Target hasil setelah langkah ini."
  },
  {
    "type": "callout",
    "variant": "tip",
    "text": "Jalankan aplikasi sebelum lanjut ke langkah berikutnya."
  },
  {
    "type": "task",
    "required": true,
    "instruction": "Ubah headline dengan nama kamu sendiri."
  }
]
```

### 11.3 MediaAsset

Minimum fields:

- `id`;
- `ownerScope` (`ADMIN_CONTENT` / `LEARNER_PROJECT`);
- `storageProvider`;
- `storageKey`;
- `publicUrl` atau delivery URL strategy;
- `mimeType`;
- `fileSize`;
- `width`;
- `height`;
- `originalFilename` sanitized;
- `createdByUserId`;
- timestamps.

### 11.4 Why no video schema in MVP

Tidak ada:

- `videoProviderId`;
- `videoUrl`;
- `video` content block;
- signed playback logic;
- video processing state.

Video ditambahkan nanti sebagai additive content block ketika ada evidence demand.

---

## 12. Information Architecture & Routes

### 12.1 Public

| Route | Purpose |
|---|---|
| `/` | Homepage. |
| `/courses` | Course catalog. |
| `/courses/[slug]` | Course detail. |
| `/projects/[username]/[slug]` | Optional public project page. |
| `/login` | Login. |
| `/register` | Registration. |
| `/forgot-password` | Recovery. |

### 12.2 Learner

| Route | Purpose |
|---|---|
| `/dashboard` | Active/completed course. |
| `/learn/[courseSlug]` | Course overview. |
| `/learn/[courseSlug]/[lessonSlug]` | Text-first learning workspace. |
| `/projects/me/[projectId]` | Final submission/edit/publication. |
| `/account` | Account. |
| `/account/orders` | Order history. |

### 12.3 Commerce/API

| Route | Purpose |
|---|---|
| `/checkout/course/[courseSlug]` | Checkout. |
| `/payment/[orderId]` | Payment state. |
| `/api/payments/midtrans/webhook` | Payment webhook. |
| `/api/media/upload` or equivalent server action | Signed/controlled upload flow. |

### 12.4 Admin

| Route | Purpose |
|---|---|
| `/admin` | Summary. |
| `/admin/courses` | Course list. |
| `/admin/courses/new` | Create course. |
| `/admin/courses/[courseId]` | Course configuration. |
| `/admin/courses/[courseId]/curriculum` | Stage/lesson management. |
| `/admin/courses/[courseId]/lessons/[lessonId]` | Lesson editor. |
| `/admin/users` | Learners/enrollments. |
| `/admin/orders` | Orders/payments. |
| `/admin/projects` | Project hide/unhide. |
| `/admin/feedback` | Lesson feedback/issues. |

---

## 13. Analytics

### 13.1 Required events

```text
home_viewed
course_viewed
checkout_started
order_created
payment_completed
enrollment_activated
course_started
lesson_started
lesson_completed
checkpoint_attempted
checkpoint_passed
build_milestone_completed
course_completed
project_submitted
project_published
lesson_feedback_submitted
```

### 13.2 Primary funnel

```text
Course Viewed
→ Checkout Started
→ Payment Completed
→ Course Started
→ 50% Build Reached
→ Course Completed
→ Project Submitted
→ Optional Project Published
```

### 13.3 Learning diagnostics

Dashboard internal minimum harus dapat menjawab:

- lesson mana paling banyak menyebabkan drop-off;
- checkpoint mana paling banyak gagal;
- learner rata-rata berhenti di stage mana;
- berapa banyak buyer yang tidak pernah mulai;
- berapa banyak learner meminta video melalui feedback;
- berapa banyak learner mencapai hasil akhir.

---

## 14. Technical Architecture & Stack

### 14.1 Architecture

```text
Next.js full-stack modular monolith
+ PostgreSQL
+ Cloudflare R2 for images
```

Satu deployable application; tidak menggunakan microservices.

### 14.2 Recommended stack

| Area | Decision |
|---|---|
| Language | TypeScript |
| Web | Next.js 16 supported release |
| UI | React + Tailwind CSS + shadcn/ui + Lucide |
| Forms | React Hook Form + Zod |
| Auth | Clerk |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Payment | Midtrans Snap + webhook |
| Image storage | Cloudflare R2 |
| Email | Resend + React Email |
| Analytics | PostHog |
| Monitoring | Sentry |
| Hosting | Vercel or equivalent Next.js-compatible host |
| Monorepo | pnpm + Turborepo |
| Test | Vitest + RTL + Playwright |
| CI | GitHub Actions |

### 14.3 Content rendering

Lesson content block renderer harus:

- sanitize/escape unsafe HTML;
- support server rendering bila praktis;
- syntax highlight code;
- lazy-load images;
- preserve responsive layout;
- never execute arbitrary admin-supplied script.

Raw arbitrary HTML/JS content block tidak didukung pada MVP.

### 14.4 Editor implementation principle

Jangan membuat Notion clone.

MVP lesson editor cukup berupa block list dengan:

```text
Add Text
Add Code
Add Image
Add Callout
Add Link
Add Task
```

Block dapat diedit, dihapus, dan diurutkan. Reordering menggunakan tombol up/down sudah acceptable sebelum drag-and-drop.

---

## 15. Non-Functional Requirements

### 15.1 Performance

- public course pages SEO-friendly;
- text content first paint cepat;
- images menggunakan optimized responsive rendering;
- code highlighting tidak menyebabkan page freeze;
- learner workspace usable pada consumer mobile connection Indonesia.

### 15.2 Accessibility

- semantic heading hierarchy;
- keyboard navigation;
- sufficient color contrast;
- image alt text;
- code blocks dapat discroll/copy;
- form errors memiliki label yang jelas.

### 15.3 Maintainability

- content changes tidak membutuhkan code deployment;
- media storage provider diisolasi dari domain;
- strict TypeScript;
- Zod validation pada write boundaries;
- critical business logic tidak hidup hanya di client.

### 15.4 Reliability

- webhook idempotent;
- upload failure tidak meninggalkan broken lesson state;
- email/analytics failure tidak merusak core transaction;
- versioned DB migrations.

### 15.5 Observability

Sentry minimum menangkap:

- server exceptions;
- payment webhook failure;
- media upload failure;
- content rendering failure;
- authorization failure yang relevan.

---

## 16. Security Baseline

- protected routes diverifikasi server-side;
- admin authorization server-side;
- all mutations schema validated;
- Midtrans server credential hanya server-side;
- webhook signature/verification wajib;
- media upload memvalidasi ownership, MIME, size, extension, object key;
- file name user tidak digunakan langsung sebagai storage key;
- arbitrary executable HTML/JS tidak diterima sebagai lesson content;
- project edit hanya oleh owner;
- public project hanya menampilkan data yang learner pilih public;
- secrets tidak committed ke repository;
- rate limiting untuk mutation publik yang berisiko.

---

## 17. Testing & Release Gates

### 17.1 Critical automated tests

- paid/free enrollment;
- duplicate order prevention;
- already-owned purchase block;
- Midtrans state mapping + webhook idempotency;
- course access authorization;
- sequential lesson progression;
- lesson completion;
- checkpoint scoring/retry;
- Build Progress calculation;
- course completion rule;
- image upload validation;
- admin course publish authorization;
- project ownership/publication;
- hidden project not publicly accessible.

### 17.2 Required E2E

**Flow 1 — Paid learner**

```text
Register/Login
→ Open Course
→ Checkout
→ Sandbox Payment Success
→ Enrollment
→ Open Lesson
```

**Flow 2 — Text learning**

```text
Open Lesson
→ Read text/code/image
→ Complete Build Task
→ Pass Checkpoint
→ Next Lesson
→ Progress updates
```

**Flow 3 — Admin authoring**

```text
Admin Create Course
→ Create Stage
→ Create Lesson
→ Add Markdown
→ Upload Image
→ Add Code
→ Preview
→ Publish
→ Learner can render correctly
```

**Flow 4 — Completion**

```text
Complete Required Lessons
→ Required Milestones Complete
→ Submit Final Project + Screenshot
→ Enrollment COMPLETED
→ Optional PUBLIC share link
```

### 17.3 CI quality gates

```text
install
→ lint
→ typecheck
→ unit/integration tests
→ build
→ critical E2E smoke
```

---

## 18. MVP Product Decisions

| Decision | V1.4 |
|---|---|
| Primary learning medium | **Text-first**. |
| Video | **Removed from MVP; P1 only.** |
| Course hierarchy | Course → Stage → Lesson. |
| Lesson blocks | markdown, code, image, callout, resource_link, task. |
| Image handling | **Direct file upload to Cloudflare R2.** |
| Project screenshot | File upload using same media pipeline. |
| Assessment | Lightweight auto-graded checkpoint. |
| Course sell model | Individual course purchase; FREE supported. |
| Bundle | **Deferred from P0 to P1.** |
| Subscription | Out of MVP. |
| Mentoring CTA/engine | Deferred to P1; not part of learning MVP. |
| Public gallery | Deferred to P1. |
| Public project direct link | P0, learner opt-in. |
| Project moderation | Minimal VISIBLE/HIDDEN. |
| Certificate | P1. |
| Human code review | P1. |
| Forum | P1. |
| Initial content launch | Prefer **1 flagship course first**, then expand. |

---

## 19. Post-MVP Roadmap

### Phase 1 — Validate Learning

Text + code + image + checkpoint + project.

### Phase 2 — Improve Understanding

Potential:

- targeted video blocks for lessons with high confusion;
- richer quiz;
- bookmarks/notes;
- lesson search;
- certificate.

### Phase 3 — Improve Quality Evidence

Potential:

- human reviewer;
- submission rubric;
- code review;
- verified project badge;
- curated public gallery.

### Phase 4 — Growth & Monetization

Potential:

- bundle campaign;
- coupon;
- referral;
- mentoring;
- cohort/community programs.

### Phase 5 — Advanced Learning

Understand → Engineer → Production → Scale.

---

## 20. MVP Definition of Done

DirakitPro Text-First MVP dianggap siap public beta apabila:

- [ ] Guest dapat memahami positioning dan melihat minimal satu PUBLISHED course.
- [ ] User dapat register/login melalui Google dan email/password.
- [ ] Admin dapat membuat course tanpa mengubah source code aplikasi.
- [ ] Admin dapat membuat stage dan lesson.
- [ ] Admin dapat membuat materi menggunakan Markdown/text.
- [ ] Admin dapat menambahkan code block dengan syntax highlighting.
- [ ] Admin dapat upload gambar, mengisi alt text/caption, dan melihat preview.
- [ ] Materi learner dapat merender text, code, image, callout, link, dan task secara benar.
- [ ] Learner dapat berpindah previous/next lesson dan melihat curriculum.
- [ ] Lesson progress tersimpan.
- [ ] Required sequential progression bekerja.
- [ ] Checkpoint single/multiple choice dapat dinilai otomatis dan retry.
- [ ] Build Progress dihitung dari required milestones.
- [ ] Free enrollment bekerja.
- [ ] Paid course dapat dibeli melalui Midtrans sandbox/production sesuai environment.
- [ ] Payment webhook idempotent mengaktifkan tepat satu Enrollment.
- [ ] Learner dapat submit final project dengan screenshot upload.
- [ ] Course completion mengikuti required lessons + milestones + checkpoint + project submission.
- [ ] Learner dapat memilih project PRIVATE atau PUBLIC.
- [ ] PUBLIC project memiliki shareable link.
- [ ] Admin dapat HIDE public project bermasalah.
- [ ] Admin dapat melihat learner dan order/payment dasar.
- [ ] Funnel Course → Purchase → Learn → Complete → Submit terekam.
- [ ] Lesson feedback/report dapat dikirim.
- [ ] Critical tests dan CI quality gates hijau.
- [ ] Tidak ada video infrastructure atau video field yang dibangun sebagai bagian MVP.

---

## Appendix A — Feature Cut from Previous PRD

Fitur berikut dipindahkan keluar dari P0 untuk menjaga MVP benar-benar fokus pada validasi course text-first:

| Previous P0 | V1.4 |
|---|---|
| Video content block / provider concern | P1 |
| FIXED bundle | P1 |
| CHOOSE_N bundle | P1 |
| Bundle catalog/detail/checkout | P1 |
| Bundle analytics/grant complexity | P1 |
| Mentoring static CTA | P1 |
| Curated `/projects` gallery | P1 |
| APPROVED/REJECTED/FEATURED moderation workflow | P1 |
| Project OG automation sophistication | P1 enhancement; basic metadata enough for MVP |
| Project publication email | P1 |

The purpose of this cut is not to reject those features permanently, but to ensure the first release validates the core question:

> **Apakah beginner Indonesia mau membeli dan menyelesaikan course DirakitPro jika pengalaman belajarnya berbasis teks, gambar, code, praktik, checkpoint, dan project nyata?**

---

## Appendix B — V1.3 → V1.4 Product Scope Change Log

**Date:** 27 August 2026  
**Trigger:** founder decision to launch a lower-cost, easier-to-maintain learning MVP inspired by structured text-based self-paced learning. Founder explicitly requested that material creation focus on text and uploaded images first, with no video.

| Decision | V1.3 | V1.4 Text-First MVP |
|---|---|---|
| Lesson media | `markdown`, `code`, `image`, `video`, `resource_link`, `task` | **No `video`.** Adds `callout`; keeps text/code/image/link/task. |
| Image content | Supported as block but upload mechanism not central to lesson authoring | **Direct admin image upload is a core P0 capability.** |
| Video hosting | YouTube unlisted baseline | **Removed entirely from MVP infrastructure.** |
| Project screenshot | Learner enters external screenshot URL | **Learner uploads screenshot using shared media pipeline.** |
| Learning validation | Build checkpoint model | Adds lightweight auto-graded CHECKPOINT quiz. |
| Admin content operation | Curriculum management generally specified | **Lesson authoring editor explicitly becomes a first-class P0 feature.** |
| Bundle campaign | P0 FIXED + CHOOSE_N | **Deferred to P1.** |
| Mentoring CTA | P0 | **Deferred to P1.** |
| Curated gallery/moderation | P0 complex moderation + featured gallery | **P1. P0 keeps direct public project + admin HIDE.** |
| Initial course launch | Three courses used as initial lineup | **One flagship course may launch first; remaining courses follow after validation.** |

### Why this change

The previous PRD correctly described the long-term DirakitPro experience, but P0 combined learning, commerce expansion, campaign mechanics, mentoring, moderation, and social discovery. For a solo/self-funded MVP, that scope makes it harder to validate the most important uncertainty: **will learners pay for and finish the actual learning experience?**

V1.4 therefore treats content authoring and text-first classroom quality as the center of the MVP. Growth mechanics can be reintroduced after the learning loop has evidence.

---

## Appendix C — Recommended First Course Authoring Template

Use this template for each stage/lesson of **Rakitan Pertama — Personal Website**.

### Stage

```text
Stage title
Outcome stage
Build milestone
Estimated total time
```

### Lesson

```text
Lesson title
Type
Objective
Estimated time

[Context]
Apa yang akan dibuat dan kenapa.

[Concept]
Penjelasan singkat.

[Example]
Code / image.

[Try It]
Langkah learner.

[Expected Result]
Screenshot atau penjelasan hasil.

[Build Task]
Perubahan yang harus learner lakukan pada project.

[Checkpoint]
Pertanyaan singkat bila perlu.

[Summary]
3–5 poin yang baru dipelajari.

[Next]
Apa yang akan dirakit selanjutnya.
```

### Content authoring rule

Jika sebuah konsep memerlukan lebih dari sekitar 10–15 menit membaca sebelum learner melakukan sesuatu, pecah menjadi lesson yang lebih kecil.

---

## Final MVP Product Statement

> **DirakitPro MVP bukan platform video course.**  
> Ia adalah learning workspace berbasis teks, gambar, code, praktik, checkpoint, dan project yang membawa beginner dari “belum tahu mulai dari mana” menjadi “saya sudah merakit sesuatu yang nyata”.
